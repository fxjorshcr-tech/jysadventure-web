import Image from "next/image";
import Link from "next/link";
import { TOURS } from "@/lib/tours";
import { IMAGES } from "@/lib/images";
import { TourCard } from "@/components/TourCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Marquee } from "@/components/Marquee";
import {
  Clock,
  Gauge,
  Users,
  Check,
  ArrowRight,
  Flame,
} from "lucide-react";

export const metadata = {
  title: "Tours — JYS Adventure Tour",
  description:
    "Discover every off-road ATV and UTV tour offered by JYS Adventure in Guanacaste, Costa Rica.",
};

export default function ToursPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Image
          src={IMAGES.heroAlt}
          alt="Tours"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            All tours
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,13vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            PICK YOUR
            <br />
            <span className="text-gradient-fire">ADVENTURE</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            Six signature tours across the most mind-blowing terrain in
            Guanacaste. From chill family rides to extreme volcano missions —
            each one engineered to steal your breath.
          </p>
        </div>
      </section>

      <Marquee />

      {/* Tours grid */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOURS.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tour details list */}
      <section className="relative bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="The details"
            title={
              <>
                Everything you need <br />
                <span className="text-gradient-fire">to know</span>
              </>
            }
            subtitle="Full breakdown of each tour — duration, price, difficulty and what you'll actually do out there."
          />

          <div className="mt-16 space-y-24">
            {TOURS.map((t, i) => (
              <div
                key={t.slug}
                id={t.slug}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                    {t.vehicle}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
                    Tour 0{i + 1}
                  </div>
                  <h3 className="mt-3 font-display text-[clamp(2.25rem,10vw,3.75rem)] leading-[0.95] tracking-wide text-white [overflow-wrap:anywhere] md:text-7xl md:leading-none">
                    {t.title}
                  </h3>
                  <p className="mt-4 text-lg text-white/70">{t.tagline}</p>
                  <p className="mt-5 text-white/60">{t.description}</p>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <Clock className="h-4 w-4 text-lava-400" />
                      <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50">
                        Duration
                      </div>
                      <div className="font-display text-2xl text-white">{t.duration}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <Gauge className="h-4 w-4 text-lava-400" />
                      <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50">
                        Level
                      </div>
                      <div className="font-display text-2xl text-white">{t.difficulty}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <Users className="h-4 w-4 text-lava-400" />
                      <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50">
                        Min age
                      </div>
                      <div className="font-display text-2xl text-white">{t.minAge}+</div>
                    </div>
                  </div>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {t.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-sm text-white/70"
                      >
                        <Check className="h-4 w-4 text-jungle-500" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <div className="rounded-2xl border border-lava-500/40 bg-lava-500/10 px-5 py-3">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                        From
                      </div>
                      <div className="font-display text-3xl text-lava-400">
                        ${t.price}{" "}
                        <span className="text-xs text-white/50">/ person</span>
                      </div>
                    </div>
                    <Link href="/contact" className="btn-primary">
                      <Flame className="h-4 w-4" /> Book this ride
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 to-night-950 p-6 text-center sm:p-10">
            <h3 className="font-display text-[clamp(1.75rem,7vw,2.5rem)] leading-tight tracking-wide text-white [overflow-wrap:anywhere] md:text-6xl">
              Still not sure <span className="text-gradient-fire">which ride</span> fits you?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              We&apos;ll help you choose based on your crew, experience level and
              how much adrenaline you can handle.
            </p>
            <Link href="/contact" className="btn-primary mt-8 inline-flex">
              Chat with a guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
