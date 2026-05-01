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
  const [busy, setBusy] = useState(false);

  // Click toggles to the other locale.
  const next: Locale = LOCALES.find((l) => l !== locale) ?? "en";
  const current = FLAGS[locale];
  const target = FLAGS[next];

  const change = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={change}
        aria-label={`${target.label}`}
        title={`${target.label}`}
        translate="no"
        className="mt-6 mx-auto flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-xs font-bold uppercase tracking-widest text-white/80 transition hover:border-lava-400 hover:text-white"
      >
        <span aria-hidden className="text-lg leading-none">
          {current.emoji}
        </span>
        <span>{current.code}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={change}
      aria-label={`${target.label}`}
      title={`${target.label}`}
      translate="no"
      className="flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 text-[11px] font-bold uppercase tracking-widest text-white/80 transition hover:border-lava-400 hover:text-white"
    >
      <span aria-hidden className="text-base leading-none">
        {current.emoji}
      </span>
      <span>{current.code}</span>
    </button>
  );
}
