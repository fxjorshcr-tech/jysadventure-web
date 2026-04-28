import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, MapPin, Star } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { CONTACT, SOCIAL_LINKS } from "@/lib/info";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-radial opacity-60"
      />
      <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 lg:px-8">
        {/* Bottom grid */}
        <div className="grid gap-10 pt-4 md:grid-cols-4">
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

            <div className="mt-6 space-y-2 text-sm text-white/70">
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-lava-400" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-lava-400" />
                <span className="break-all">{CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-lava-400" />
                {CONTACT.location}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                { Icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                { Icon: Star, href: SOCIAL_LINKS.tripadvisor, label: "TripAdvisor" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-lava-400 hover:bg-lava-500/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
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
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/faqs" className="hover:text-white">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg tracking-widest text-white">Rides</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link href="/tours/atv-tour-guanacaste" className="hover:text-white">ATV Adventure</Link></li>
              <li><Link href="/tours/utv-tour-guanacaste" className="hover:text-white">UTV Side by Side</Link></li>
              <li><Link href="/tours/atv-horseback-tour-guanacaste" className="hover:text-white">ATV + Cabalgata</Link></li>
              <li><Link href="/tours/atv-canopy-zipline-tour-guanacaste" className="hover:text-white">ATV + Canopy</Link></li>
              <li><Link href="/tours/utv-horseback-tour-guanacaste" className="hover:text-white">UTV + Cabalgata</Link></li>
              <li><Link href="/tours/utv-canopy-zipline-tour-guanacaste" className="hover:text-white">UTV + Canopy</Link></li>
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
