/**
 * Server-issued arithmetic challenge ("What is 3 + 4?") for the public forms.
 *
 * The question is generated here, signed with an HMAC and handed to the
 * browser as an opaque token. The browser never learns the expected answer:
 * it sends back the token plus whatever the visitor typed, and we recompute
 * the signature and compare. Tokens expire and are single-use (best effort,
 * per server instance), so a solved token cannot be replayed in bulk.
 */

import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const TTL_MS = 2 * 60 * 60 * 1000; // 2h: long-open tabs still work
const SIG_LEN = 32; // hex chars of the HMAC-SHA256 we keep (128 bits)

export type Challenge = { a: number; b: number; token: string };

export type ChallengeVerdict =
  | { ok: true }
  | { ok: false; reason: "missing" | "malformed" | "expired" | "replayed" | "wrong" };

let fallbackSecret: string | null = null;

function secret(): string {
  const configured =
    process.env.FORM_CHALLENGE_SECRET || process.env.RESEND_API_KEY;
  if (configured) return configured;
  if (!fallbackSecret) {
    fallbackSecret = randomBytes(32).toString("hex");
    console.warn(
      "[challenge] FORM_CHALLENGE_SECRET is not set; using a per-instance random secret. " +
        "Set it in the environment so tokens verify across server instances.",
    );
  }
  return fallbackSecret;
}

function sign(payload: string): string {
  return createHmac("sha256", secret())
    .update(payload)
    .digest("hex")
    .slice(0, SIG_LEN);
}

function randomInt(min: number, max: number): number {
  return min + (randomBytes(1)[0] % (max - min + 1));
}

export function createChallenge(now = Date.now()): Challenge {
  const a = randomInt(1, 9);
  const b = randomInt(1, 9);
  const exp = now + TTL_MS;
  const nonce = randomBytes(8).toString("hex");
  const payload = `${a}.${b}.${exp}.${nonce}`;
  return { a, b, token: `${payload}.${sign(payload)}` };
}

// Single-use tracking: nonce → expiry. Best effort, lives per instance.
const used = new Map<string, number>();

function markUsed(nonce: string, exp: number, now: number): boolean {
  if (used.has(nonce)) return false;
  used.set(nonce, exp);
  if (used.size > 5000) {
    for (const [k, e] of used) if (e <= now) used.delete(k);
  }
  return true;
}

export function parseAnswer(value: string | number | undefined): number | null {
  if (typeof value === "number") return Number.isInteger(value) ? value : null;
  if (typeof value !== "string") return null;
  const s = value.trim();
  if (!/^\d{1,3}$/.test(s)) return null;
  return Number(s);
}

export function verifyChallenge(
  token: string | undefined,
  answer: string | number | undefined,
  now = Date.now(),
): ChallengeVerdict {
  if (!token) return { ok: false, reason: "missing" };

  const parts = token.split(".");
  if (parts.length !== 5) return { ok: false, reason: "malformed" };
  const [aStr, bStr, expStr, nonce, sig] = parts;
  const a = Number(aStr);
  const b = Number(bStr);
  const exp = Number(expStr);
  if (
    !Number.isInteger(a) ||
    !Number.isInteger(b) ||
    !Number.isFinite(exp) ||
    !/^[0-9a-f]{16}$/.test(nonce) ||
    sig.length !== SIG_LEN
  ) {
    return { ok: false, reason: "malformed" };
  }

  const expected = sign(`${a}.${b}.${exp}.${nonce}`);
  const sigBuf = Buffer.from(sig, "utf8");
  const expBuf = Buffer.from(expected, "utf8");
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return { ok: false, reason: "malformed" };
  }

  if (exp <= now) return { ok: false, reason: "expired" };

  const given = parseAnswer(answer);
  if (given === null || given !== a + b) return { ok: false, reason: "wrong" };

  // Only burn the nonce on a correct answer so a typo does not force a reload
  // of the question; a wrong answer still has to pass the rate limit.
  if (!markUsed(nonce, exp, now)) return { ok: false, reason: "replayed" };

  return { ok: true };
}
