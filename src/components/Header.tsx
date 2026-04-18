"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Flame, Instagram, Facebook, Youtube } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Always keep the same border + bg alpha so the header never shifts
        // layout when the scroll state changes (was causing a visible jump
        // right after ~10–16px of scroll on iPhone).
        "fixed inset-x-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "border-white/10 bg-night-950/85 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]"
          : "border-white/10 bg-night-950/40"
      )}
    >
      <div
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:px-8"
        style={{
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <Link href="/" className="group flex min-w-0 flex-1 items-center gap-3">
          <div className="relative h-11 w-36 shrink-0 transition group-hover:scale-[1.02] sm:h-14 sm:w-48">
            <Image
              src={IMAGES.logo}
              alt="JYS Adventure Tour"
              fill
              sizes="(max-width: 640px) 144px, 192px"
              className="object-contain object-left drop-shadow-[0_4px_20px_rgba(249,115,22,0.35)]"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white/80 transition hover:text-white"
            >
              <span className="relative z-10">{n.label}</span>
              <span className="absolute inset-0 rounded-full bg-white/0 transition hover:bg-white/10" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1.5 border-r border-white/15 pr-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-lava-400 hover:bg-lava-500/20 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <Link href="/contact" className="btn-primary">
            <Flame className="h-4 w-4" /> Book Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="w-full border-t border-white/10 bg-night-950/95 backdrop-blur-xl lg:hidden">
          <div
            className="mx-auto flex w-full max-w-7xl flex-col px-4 py-5 sm:px-5"
            style={{
              paddingLeft: "max(1rem, env(safe-area-inset-left))",
              paddingRight: "max(1rem, env(safe-area-inset-right))",
            }}
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 font-display text-2xl tracking-wider text-white/90 hover:text-lava-400"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-5 w-full"
            >
              <Flame className="h-4 w-4" /> Book Now
            </Link>
            <div className="mt-6 flex items-center justify-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-lava-400 hover:bg-lava-500/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
