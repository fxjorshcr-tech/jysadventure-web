"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOCALES, type Locale } from "@/i18n/config";

const FLAGS: Record<Locale, { code: string; label: string; emoji: string }> = {
  en: { code: "EN", label: "English", emoji: "🇺🇸" },
  es: { code: "ES", label: "Español", emoji: "🇨🇷" },
};

export function LocaleSwitcher({
  locale,
  variant = "header",
}: {
  locale: Locale;
  variant?: "header" | "mobile";
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<Locale | null>(null);

  const change = async (next: Locale) => {
    if (next === locale || busy) return;
    setBusy(next);
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  if (variant === "mobile") {
    return (
      <div className="mt-6 flex items-center justify-center gap-2" translate="no">
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <button
              key={l}
              type="button"
              onClick={() => change(l)}
              aria-label={FLAGS[l].label}
              aria-pressed={active}
              className={`flex h-10 items-center gap-2 rounded-full border px-3 text-xs font-bold uppercase tracking-widest transition ${
                active
                  ? "border-lava-400 bg-lava-500/20 text-white"
                  : "border-white/15 bg-white/5 text-white/70 hover:border-lava-400 hover:text-white"
              }`}
            >
              <span aria-hidden className="text-base leading-none">
                {FLAGS[l].emoji}
              </span>
              <span>{FLAGS[l].code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 border-r border-white/15 pr-3"
      translate="no"
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => change(l)}
            aria-label={FLAGS[l].label}
            aria-pressed={active}
            title={FLAGS[l].label}
            className={`flex h-9 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-bold uppercase tracking-widest transition ${
              active
                ? "border-lava-400 bg-lava-500/20 text-white"
                : "border-white/10 bg-white/5 text-white/70 hover:border-lava-400 hover:text-white"
            }`}
          >
            <span aria-hidden className="text-sm leading-none">
              {FLAGS[l].emoji}
            </span>
            <span>{FLAGS[l].code}</span>
          </button>
        );
      })}
    </div>
  );
}
