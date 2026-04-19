import Image from "next/image";
import { BASE_TOURS, COMBO_TOURS } from "@/lib/tours";
import { IMAGES } from "@/lib/images";
import { TourCard } from "@/components/TourCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Marquee } from "@/components/Marquee";
import { IdCard, Users, Baby } from "lucide-react";

export const metadata = {
  title: "Tours — JYS Adventure Tour",
  description:
    "Discover every off-road ATV and UTV tour — plus Cabalgata and Canopy combos — offered by JYS Adventure in Guanacaste, Costa Rica.",
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
          className="object-cover object-[center_25%] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            All tours
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            PICK YOUR
            <br />
            <span className="text-gradient-fire">ADVENTURE</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            Three signature off-road rides — ATV Single, ATV Double and UTV —
            plus six combos that pair them with Cabalgata or Canopy for a full
            day of Pura Vida.
          </p>
        </div>
      </section>

      <Marquee />

      {/* Base tours */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Signature rides"
            title={
              <>
                Base <span className="text-gradient-fire">tours</span>
              </>
            }
            subtitle="Our three core off-road experiences in Guanacaste. Perfect on their own or as the foundation for a combo."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BASE_TOURS.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Combos */}
      <section className="relative bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Double the adventure"
            title={
              <>
                Combo <span className="text-gradient-fire">tours</span>
              </>
            }
            subtitle="Mix any of our off-road rides with a horseback Cabalgata or a zipline Canopy for an unforgettable half-day."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COMBO_TOURS.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Before you ride"
            title={
              <>
                Age & license <span className="text-gradient-fire">basics</span>
              </>
            }
            subtitle="A quick rundown of who can ride what. Full details on each tour page."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <RequirementCard
              icon={IdCard}
              title="Driver's license"
              text="Required for every ATV and UTV driver — any country, any language. Passengers do not need one."
            />
            <RequirementCard
              icon={Users}
              title="ATV — from 5+"
              text="Drivers 18+ with license. Kids from 5+ can ride as passengers on the ATV Double."
            />
            <RequirementCard
              icon={Baby}
              title="UTV — from 2+"
              text="Drivers 18+ with license. Children from 2+ years old are welcome on the UTV with seatbelts."
            />
          </div>

        </div>
      </section>
    </>
  );
}

function RequirementCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-lava-400/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-wide text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/65">{text}</p>
    </div>
  );
}

