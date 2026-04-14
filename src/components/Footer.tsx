import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, MapPin, Youtube } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BookingForm } from "./BookingForm";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-radial opacity-60"
      />
      <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {/* CTA form block */}
        <div className="mb-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 via-night-950 to-night-900 p-6 shadow-[0_40px_100px_-30px_rgba(249,115,22,0.35)] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
                Ready to ride?
              </span>
              <h2 className="mt-5 font-display text-5xl leading-none tracking-wider text-white md:text-6xl">
                Let&apos;s <span className="text-gradient-fire">launch your</span>
                <br />
                adventure
              </h2>
              <p className="mt-5 max-w-md text-white/70">
                Tell us when you want to ride and we&apos;ll build the perfect
                Guanacaste experience for your crew. Expect a reply within 1
                hour during office time.
              </p>

              <div className="mt-8 space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-lava-400" />
                  +506 0000 0000
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-lava-400" />
                  info@jysadventuretour.com
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-lava-400" />
                  Guanacaste, Costa Rica
                </div>
              </div>
            </div>

            <BookingForm />
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-16 w-52">
                <Image
                  src={IMAGES.logo}
                  alt="JYS Adventure Tour"
                  fill
                  sizes="208px"
                  className="object-contain object-left drop-shadow-[0_4px_20px_rgba(249,115,22,0.4)]"
                />
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm text-white/60">
              Born from a pure love for the wild trails of Guanacaste. We turn
              Costa Rica&apos;s backcountry into the ride of your life.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-lava-400 hover:bg-lava-500/20 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg tracking-widest text-white">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/tours" className="hover:text-white">Tours</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg tracking-widest text-white">Rides</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link href="/tours/jungle-rush" className="hover:text-white">Jungle Rush</Link></li>
              <li><Link href="/tours/volcano-storm" className="hover:text-white">Volcano Storm</Link></li>
              <li><Link href="/tours/sunset-beach-blast" className="hover:text-white">Sunset Beach Blast</Link></li>
              <li><Link href="/tours/canyon-breaker" className="hover:text-white">Canyon Breaker</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} JYS Adventure Tour. All rights reserved.</p>
          <p className="font-display tracking-widest">PURA VIDA · ATV · UTV · COSTA RICA</p>
        </div>
      </div>
    </footer>
  );
}
