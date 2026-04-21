"use client";

import { Instagram, Facebook, Star, MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/info";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: Facebook, label: "Facebook", href: SOCIAL_LINKS.facebook },
  { icon: Star, label: "TripAdvisor", href: SOCIAL_LINKS.tripadvisor },
  { icon: MessageCircle, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
];

export function SocialRail() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-40 hidden flex-col items-center gap-3 lg:flex">
      <div className="pointer-events-auto flex flex-col gap-2 rounded-full border border-white/10 bg-night-950/80 p-2 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)]">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-lava-400 hover:bg-lava-500 hover:text-white hover:scale-110"
          >
            <s.icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <div className="pointer-events-auto rotate-180 [writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
        Follow the ride
      </div>
    </div>
  );
}

export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-lava-400 hover:bg-lava-500/20 hover:text-white"
        >
          <s.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
