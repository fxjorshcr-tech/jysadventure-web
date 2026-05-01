"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOCALES, type Locale } from "@/i18n/config";

function FlagUS({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 7 5"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="7" height="5" fill="#B22234" />
      <g fill="#FFFFFF">
        <rect y="0.385" width="7" height="0.385" />
        <rect y="1.155" width="7" height="0.385" />
        <rect y="1.925" width="7" height="0.385" />
        <rect y="2.695" width="7" height="0.385" />
        <rect y="3.465" width="7" height="0.385" />
        <rect y="4.235" width="7" height="0.385" />
      </g>
      <rect width="3" height="2.695" fill="#3C3B6E" />
    </svg>
  );
}

function FlagCR({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 6 4"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="6" height="4" fill="#002B7F" />
      <rect y="0.667" width="6" height="2.667" fill="#FFFFFF" />
      <rect y="1.333" width="6" height="1.333" fill="#CE1126" />
    </svg>
  );
}

const FLAGS: Record<
  Locale,
  { code: string; label: string; Flag: (p: { className?: string }) => React.ReactElement }
> = {
  en: { code: "EN", label: "English", Flag: FlagUS },
  es: { code: "ES", label: "Español", Flag: FlagCR },
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

  const next: Locale = LOCALES.find((l) => l !== locale) ?? "en";
  const current = FLAGS[locale];
  const target = FLAGS[next];
  const CurrentFlag = current.Flag;

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
        aria-label={target.label}
        title={target.label}
        translate="no"
        className="mt-6 mx-auto flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-xs font-bold uppercase tracking-widest text-white/80 transition hover:border-lava-400 hover:text-white"
      >
        <CurrentFlag className="h-4 w-6 rounded-sm shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" />
        <span>{current.code}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={change}
      aria-label={target.label}
      title={target.label}
      translate="no"
      className="flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 text-[11px] font-bold uppercase tracking-widest text-white/80 transition hover:border-lava-400 hover:text-white"
    >
      <CurrentFlag className="h-4 w-6 rounded-sm shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" />
      <span>{current.code}</span>
    </button>
  );
}
