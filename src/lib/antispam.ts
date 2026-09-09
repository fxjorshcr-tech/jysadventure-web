/**
 * Shared anti-bot defenses for the public form endpoints (/api/contact and
 * /api/booking). Layered, cheapest checks first:
 *
 *  1. Same-origin check      — the request must come from our own pages.
 *  2. Honeypot field         — a hidden input humans never fill in.
 *  3. Minimum fill time      — bots submit in milliseconds, humans do not.
 *  4. Gibberish filter       — random-letter names/messages ("mKJYfGFTLrpp…").
 *  5. Per-IP rate limit      — best-effort, in-memory per server instance.
 *  6. Cloudflare Turnstile   — optional, enabled when TURNSTILE_SECRET_KEY is set.
 *
 * Silent rejections return { ok: true } to the caller so bots learn nothing.
 */

import { z } from "zod";

export type SpamVerdict =
  | { spam: false }
  | { spam: true; reason: string; silent: boolean; status: number };

const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 1000 * 60 * 60 * 6; // 6h: stale tab, treat as fresh
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_HITS = 5;

// ---------------------------------------------------------------------------
// Payload envelope shared by both forms
// ---------------------------------------------------------------------------

export const antispamFieldsSchema = z.object({
  /** Honeypot: must be empty. Named to look attractive to auto-fillers. */
  website: z.string().optional(),
  /** Epoch ms captured when the form mounted on the client. */
  startedAt: z.number().optional(),
  /** Cloudflare Turnstile response token (when the widget is enabled). */
  turnstileToken: z.string().optional(),
});

export type AntispamFields = z.infer<typeof antispamFieldsSchema>;

// ---------------------------------------------------------------------------
// 1. Same-origin
// ---------------------------------------------------------------------------

function hostOf(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
}

export function isSameOrigin(req: Request): boolean {
  const host = (
    req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? ""
  )
    .split(",")[0]
    .trim()
    .toLowerCase();
  if (!host) return false;

  const origin = hostOf(req.headers.get("origin"));
  if (origin) return origin === host;

  // Some older browsers omit Origin on same-origin POSTs; fall back to Referer.
  const referer = hostOf(req.headers.get("referer"));
  if (referer) return referer === host;

  // Browsers always send at least one of them on fetch() POSTs; curl/bots don't.
  return false;
}

// ---------------------------------------------------------------------------
// 4. Gibberish detection
// ---------------------------------------------------------------------------

/**
 * True for strings like "mKJYfGFTLrppTlxnEZcMXXpW" — one long token with no
 * spaces, random letter case and very few vowels. Real names and sentences
 * never look like this; "McDonald-Smith" or "Ana" are untouched.
 */
export function looksLikeGibberish(value: string): boolean {
  const s = value.trim();
  if (s.length < 8) return false;
  if (/\s/.test(s)) return false;
  if (!/^[A-Za-z0-9]+$/.test(s)) return false;

  let transitions = 0;
  for (let i = 1; i < s.length; i++) {
    const a = s[i - 1];
    const b = s[i];
    const aUpper = a >= "A" && a <= "Z";
    const bUpper = b >= "A" && b <= "Z";
    const aLetter = /[A-Za-z]/.test(a);
    const bLetter = /[A-Za-z]/.test(b);
    if (aLetter && bLetter && aUpper !== bUpper) transitions++;
  }

  const letters = s.replace(/[^A-Za-z]/g, "");
  const vowels = (letters.match(/[aeiouAEIOU]/g) ?? []).length;
  const vowelRatio = letters.length ? vowels / letters.length : 0;
  const digitRatio = (s.length - letters.length) / s.length;

  // "mKJYfGFTLrpp" → many case flips. Real words (McDonald, iPhone,
  // DeAndre) have at most 2-3; we allow a little slack on short strings.
  if (transitions >= 5) return true;
  if (transitions >= 4 && s.length >= 12) return true;
  // "KTIWmdoiSrICsrmPs" → almost no vowels. Threshold sits below Polish /
  // Czech surnames (Strzelczyk = 0.10 but only 10 letters; Przemyslaw = 0.20).
  if (letters.length >= 12 && vowelRatio < 0.15) return true;
  if (digitRatio > 0.4 && letters.length >= 4) return true; // "a8f3k9x2p1"
  return false;
}

const URL_RE = /https?:\/\/|www\./gi;

export function looksLikeSpamContent(fields: {
  name?: string;
  subject?: string;
  message?: string;
  email?: string;
}): string | null {
  const { name = "", subject = "", message = "", email = "" } = fields;

  if (looksLikeGibberish(name)) return "gibberish-name";
  if (looksLikeGibberish(subject)) return "gibberish-subject";
  if (looksLikeGibberish(message)) return "gibberish-message";

  // A "message" that is a single long token with no spaces is never real.
  const trimmed = message.trim();
  if (trimmed.length >= 20 && !/\s/.test(trimmed)) return "single-token-message";

  // Link spam: 3+ links in a contact message.
  if ((message.match(URL_RE) ?? []).length >= 3) return "link-spam";

  // Local part of the email that is itself random, e.g. "xkqjzhfwp@…".
  const local = email.split("@")[0] ?? "";
  if (local.length >= 14 && looksLikeGibberish(local)) return "gibberish-email";

  return null;
}

// ---------------------------------------------------------------------------
// 5. Rate limiting (best effort; state lives per serverless instance)
// ---------------------------------------------------------------------------

const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function isRateLimited(key: string, now = Date.now()): boolean {
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map never grows unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => t > windowStart)) hits.delete(k);
    }
  }

  return recent.length > RATE_MAX_HITS;
}

// ---------------------------------------------------------------------------
// 6. Cloudflare Turnstile (optional)
// ---------------------------------------------------------------------------

export function turnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → skip
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[antispam] Turnstile verify failed", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

export async function checkForSpam(
  req: Request,
  route: string,
  fields: AntispamFields & {
    name?: string;
    subject?: string;
    message?: string;
    email?: string;
  },
): Promise<SpamVerdict> {
  const ip = clientIp(req);

  if (!isSameOrigin(req)) {
    return { spam: true, reason: "cross-origin", silent: false, status: 403 };
  }

  if (isRateLimited(`${route}:${ip}`)) {
    return { spam: true, reason: "rate-limited", silent: false, status: 429 };
  }

  if (fields.website && fields.website.trim() !== "") {
    return { spam: true, reason: "honeypot", silent: true, status: 200 };
  }

  if (typeof fields.startedAt === "number") {
    const elapsed = Date.now() - fields.startedAt;
    // Negative or absurdly old values are forged/stale: ignore the signal
    // rather than punishing a real visitor with a long-open tab.
    const plausible = elapsed >= 0 && elapsed <= MAX_FILL_MS;
    if (plausible && elapsed < MIN_FILL_MS) {
      return { spam: true, reason: "too-fast", silent: true, status: 200 };
    }
  } else {
    // Our forms always send startedAt; a missing value means a direct API hit.
    return { spam: true, reason: "missing-timing", silent: true, status: 200 };
  }

  const contentReason = looksLikeSpamContent(fields);
  if (contentReason) {
    return { spam: true, reason: contentReason, silent: true, status: 200 };
  }

  if (turnstileEnabled()) {
    const ok = await verifyTurnstile(fields.turnstileToken, ip);
    if (!ok) {
      return { spam: true, reason: "turnstile", silent: false, status: 403 };
    }
  }

  return { spam: false };
}

export function spamResponseBody(verdict: Extract<SpamVerdict, { spam: true }>) {
  if (verdict.silent) return { ok: true };
  if (verdict.status === 429) {
    return { ok: false, error: "Too many requests. Please try again later." };
  }
  return { ok: false, error: "Request rejected" };
}
