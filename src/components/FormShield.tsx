"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Client half of the anti-bot layer (see src/lib/antispam.ts):
 *  - a honeypot input that stays invisible to humans,
 *  - the timestamp of when the form was mounted,
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
};

export function useFormShield() {
  const startedAtRef = useRef<number>(0);
  const [token, setToken] = useState<string>("");
  const [widgetId, setWidgetId] = useState<string | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const values = useCallback(
    (): ShieldValues => ({
      website: "",
      startedAt: startedAtRef.current || Date.now(),
      turnstileToken: token || undefined,
    }),
    [token],
  );

  const reset = useCallback(() => {
    startedAtRef.current = Date.now();
    setToken("");
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, [widgetId]);

  /** True when Turnstile is on and the visitor has not passed it yet. */
  const blocked = Boolean(TURNSTILE_SITE_KEY) && !token;

  return { values, reset, blocked, setToken, widgetId, setWidgetId };
}

export function FormShield({
  shield,
  locale,
  honeypotProps,
}: {
  shield: ReturnType<typeof useFormShield>;
  locale?: string;
  /** Spread the result of react-hook-form's register("website") here. */
  honeypotProps: UseFormRegisterReturn;
}) {
  const { setToken, setWidgetId } = shield;
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
