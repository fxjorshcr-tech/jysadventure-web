import Image from "next/image";
import { BASE_TOURS, COMBO_TOURS } from "@/lib/tours";
import {
  TRANSPORT_ZONES,
  TRANSPORT_INFO,
  SEASONAL_ROUTES,
  ADD_ONS,
  SCHEDULE,
} from "@/lib/info";
import { IMAGES } from "@/lib/images";
import { FeaturedTourCard, ComboTourCard } from "@/components/TourCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Marquee } from "@/components/Marquee";
import {
  IdCard,
  Users,
  Baby,
  Bus,
  Leaf,
  Sun,
  Clock,
  Plus,
} from "lucide-react";

const ATV_COMBOS = COMBO_TOURS.filter((t) => t.vehicle === "ATV");
const UTV_COMBOS = COMBO_TOURS.filter((t) => t.vehicle === "UTV");

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
            subtitle="Three core off-road experiences in Guanacaste. Ride them on their own or pair with Cabalgata or Canopy for a full half-day."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BASE_TOURS.map((t, i) => (
              <FeaturedTourCard key={t.slug} tour={t} index={i} />
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
            subtitle="Pair any ride with a horseback Cabalgata or a zipline Canopy. Canopy combos let you pick between Congo Trail and Skyline depending on where you're staying."
          />

          <div className="mt-14 space-y-14">
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    ATV combos
                  </div>
                  <h3 className="mt-2 font-display text-3xl tracking-wide text-white md:text-4xl">
                    Ride solo or 2-up, then <span className="text-gradient-fire">level up</span>
                  </h3>
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {ATV_COMBOS.map((t, i) => (
                  <ComboTourCard key={t.slug} tour={t} index={i} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    UTV combos
                  </div>
                  <h3 className="mt-2 font-display text-3xl tracking-wide text-white md:text-4xl">
                    Up to 5 in the UTV, <span className="text-gradient-fire">plus</span> the extra
                  </h3>
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {UTV_COMBOS.map((t, i) => (
                  <ComboTourCard key={t.slug} tour={t} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Schedule & seasonal routes */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Plan your ride"
            title={
              <>
                Departures & <span className="text-gradient-fire">routes</span>
              </>
            }
            subtitle="Daily tour departures and the route you'll ride depend on the season."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl tracking-wide text-white">
                  Daily departures
                </h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {SCHEDULE.departures.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-2 font-display text-lg tracking-wide text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/65">{SCHEDULE.note}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SEASONAL_ROUTES.map((r) => (
                <div
                  key={r.season}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jungle-500/20 text-jungle-500 ring-1 ring-jungle-500/40">
                      {r.season === "Winter" ? (
                        <Leaf className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                        {r.season}
                      </div>
                      <div className="text-xs text-white/70">{r.months}</div>
                    </div>
                  </div>
                  <h4 className="mt-5 font-display text-xl tracking-wide text-white">
                    {r.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/65">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="relative bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Round-trip transport"
            title={
              <>
                Hotel pickup <span className="text-gradient-fire">zones</span>
              </>
            }
            subtitle={`Pickup and drop-off rates for groups of 1–${TRANSPORT_INFO.includedPassengers}. Extra riders add to the base rate. All prices include tax.`}
          />

          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-night-950/60 backdrop-blur">
            <div className="hidden grid-cols-[2fr_1fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 sm:grid">
              <div>Zone</div>
              <div className="text-right">
                1–{TRANSPORT_INFO.includedPassengers} riders
              </div>
              <div className="text-right">Extra rider</div>
            </div>
            {TRANSPORT_ZONES.map((z) => (
              <div
                key={z.slug}
                className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-b border-white/5 px-5 py-4 last:border-0 sm:grid-cols-[2fr_1fr_1fr] sm:px-6"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-display text-base tracking-wide text-white">
                    <Bus className="h-4 w-4 shrink-0 text-lava-400" />
                    {z.name}
                  </div>
                  {z.note && (
                    <div className="mt-1 text-xs text-white/55">{z.note}</div>
                  )}
                </div>
                <div className="text-right sm:text-right">
                  <div className="font-display text-lg text-lava-400">
                    {z.basePrice === 0 ? "Free" : `$${z.basePrice}`}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/45 sm:hidden">
                    1–{TRANSPORT_INFO.includedPassengers} riders
                  </div>
                </div>
                <div className="col-span-2 text-right text-sm text-white/65 sm:col-span-1">
                  {z.extraPerPerson > 0 ? (
                    <>
                      <span className="font-display text-base text-white">
                        +${z.extraPerPerson}
                      </span>
                      <span className="ml-1 text-xs text-white/50 sm:hidden">
                        per extra rider
                      </span>
                    </>
                  ) : (
                    <span className="text-white/50">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Extras"
            title={
              <>
                Add-<span className="text-gradient-fire">ons</span>
              </>
            }
            subtitle="Small upgrades you can add to any tour during booking."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {ADD_ONS.map((a) => (
              <div
                key={a.slug}
                className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
                  <Plus className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl tracking-wide text-white">
                      {a.name}
                    </h3>
                    <div className="shrink-0 font-display text-xl text-lava-400">
                      +${a.price}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white/65">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="relative bg-night-900 py-24 md:py-32">
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

