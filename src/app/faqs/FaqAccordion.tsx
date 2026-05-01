"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="mt-8 space-y-3">
      {items.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition ${
        open
          ? "border-lava-400/60 bg-white/[0.04]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:gap-6 sm:px-6"
        aria-expanded={open}
      >
        <span className="font-display text-base leading-snug tracking-wide text-white sm:text-lg">
          {q}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-5 text-sm leading-relaxed text-white/70 sm:px-6 sm:pb-6">
          {a}
        </div>
      )}
    </div>
  );
}
