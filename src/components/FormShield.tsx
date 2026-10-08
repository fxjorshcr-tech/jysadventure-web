"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Client half of the anti-bot layer (see src/lib/antispam.ts):
 *  - a honeypot input that stays invisible to humans,
 *  - the timestamp of when the form was mounted,
 *  - a small arithmetic question issued by GET /api/challenge and verified
 *    on the server (the browser never knows the expected answer),
 *  - the optional Cloudflare Turnstile widget (renders only when
 *    NEXT_PUBLIC_TURNSTILE_SITE_KEY is set).
 */

export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      language?: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type ShieldValues = {
  website: string;
  startedAt: number;
  turnstileToken?: string;
  challengeToken?: string;
  challengeAnswer?: string;
};

export type ShieldLabels = {
  question: string;
  placeholder: string;
  loading: string;
  reload: string;
  wrong: string;
  required: string;
  unavailable: string;
};

type Challenge = { a: number; b: number; token: string };

/** Code the API returns when the challenge answer was wrong or expired. */
export const CHALLENGE_ERROR_CODE = "challenge";

export function useFormShield() {
  const startedAtRef = useRef<number>(0);
  const [token, setToken] = useState<string>("");
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [challengeFailed, setChallengeFailed] = useState(false);
  const [answer, setAnswer] = useState("");
  const [challengeError, setChallengeError] = useState<
    "wrong" | "required" | null
  >(null);

  const loadChallenge = useCallback(async () => {
    setChallenge(null);
    setChallengeFailed(false);
    setAnswer("");
    try {
      const res = await fetch("/api/challenge", { cache: "no-store" });
      const data = (await res.json()) as Partial<Challenge> & { ok?: boolean };
      if (!res.ok || !data.ok || typeof data.token !== "string") {
        throw new Error("challenge unavailable");
      }
      setChallenge({ a: data.a as number, b: data.b as number, token: data.token });
    } catch (err) {
      console.error("Could not load form challenge", err);
      setChallengeFailed(true);
    }
  }, []);

  useEffect(() => {
    startedAtRef.current = Date.now();
    void loadChallenge();
  }, [loadChallenge]);

  const values = useCallback(
    (): ShieldValues => ({
      website: "",
      startedAt: startedAtRef.current || Date.now(),
      turnstileToken: token || undefined,
      challengeToken: challenge?.token,
      challengeAnswer: answer.trim() || undefined,
    }),
    [token, challenge, answer],
  );

  /**
   * Call before submitting. Returns false (and shows the inline error) when
   * the visitor has not answered the question yet.
   */
  const validate = useCallback((): boolean => {
    if (!answer.trim()) {
      setChallengeError("required");
      return false;
    }
    setChallengeError(null);
    return true;
  }, [answer]);

  /** Call when the API answered with code "challenge": new question + error. */
  const rejected = useCallback(() => {
    setChallengeError("wrong");
    void loadChallenge();
  }, [loadChallenge]);

  const reset = useCallback(() => {
    startedAtRef.current = Date.now();
    setToken("");
    setChallengeError(null);
    void loadChallenge();
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, [widgetId, loadChallenge]);

  /** True when Turnstile is on and the visitor has not passed it yet. */
  const blocked = Boolean(TURNSTILE_SITE_KEY) && !token;

  return {
    values,
    reset,
    blocked,
    validate,
    rejected,
    setToken,
    widgetId,
    setWidgetId,
    challenge,
    challengeFailed,
    answer,
    setAnswer,
    challengeError,
    setChallengeError,
    loadChallenge,
  };
}

export function FormShield({
  shield,
  locale,
  labels,
  honeypotProps,
}: {
  shield: ReturnType<typeof useFormShield>;
  locale?: string;
  labels: ShieldLabels;
  /** Spread the result of react-hook-form's register("website") here. */
  honeypotProps: UseFormRegisterReturn;
}) {
  const {
    setToken,
    setWidgetId,
    challenge,
    challengeFailed,
    answer,
    setAnswer,
    challengeError,
    setChallengeError,
    loadChallenge,
  } = shield;
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  const renderWidget = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || renderedRef.current) return;
    const el = containerRef.current;
    const api = window.turnstile;
    if (!el || !api) return;
    renderedRef.current = true;
    const id = api.render(el, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      language: locale,
      callback: (t) => setToken(t),
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
    setWidgetId(id);
  }, [locale, setToken, setWidgetId]);

  useEffect(() => {
    // Script may already be loaded (client-side navigation between pages).
    renderWidget();
  }, [renderWidget]);

  return (
    <>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="website-field">Website</label>
        <input
          id="website-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...honeypotProps}
        />
      </div>

      {/* Arithmetic challenge — verified server-side. */}
      <div className="mt-4">
        <label
          htmlFor="challenge-answer"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-white/60"
        >
          {challenge
            ? labels.question
                .replace("{a}", String(challenge.a))
                .replace("{b}", String(challenge.b))
            : challengeFailed
              ? labels.unavailable
              : labels.loading}
        </label>
        <div className="flex items-center gap-3">
          <input
            id="challenge-answer"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={3}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value.replace(/[^0-9]/g, ""));
              if (challengeError) setChallengeError(null);
            }}
            placeholder={labels.placeholder}
            disabled={!challenge}
            aria-invalid={challengeError ? true : undefined}
            className="w-32 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-sm transition focus:border-lava-400 focus:bg-white/[0.06] focus:ring-2 focus:ring-lava-500/30 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => void loadChallenge()}
            className="text-xs text-white/60 underline-offset-2 hover:text-white hover:underline"
          >
            {labels.reload}
          </button>
        </div>
        {challengeError && (
          <p className="mt-1 text-xs text-lava-400">
            {challengeError === "wrong" ? labels.wrong : labels.required}
          </p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={renderWidget}
          />
          <div ref={containerRef} className="mt-4 min-h-[65px]" />
        </>
      )}
    </>
  );
}
