"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-night-950/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-lava-500/60 transition group-hover:ring-lava-400">
            <Image
              src={IMAGES.logo}
              alt="JYS Adventure Tour"
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wider text-white">
              JYS <span className="text-lava-500">ADVENTURE</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
              Guanacaste · Costa Rica
            </span>
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

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-primary">
            <Flame className="h-4 w-4" /> Book Now
          </Link>
        </div>

        <button
          className="rounded-full border border-white/20 bg-white/5 p-2.5 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-night-950/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col p-5">
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
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-5 w-full">
              <Flame className="h-4 w-4" /> Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
