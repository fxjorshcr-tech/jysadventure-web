import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOURS, getTour } from "@/lib/tours";
import { BookingForm } from "@/components/BookingForm";
import { SectionHeader } from "@/components/SectionHeader";
import { TourCard } from "@/components/TourCard";
import {
  Clock,
  Gauge,
  Users,
  Check,
  Flame,
  Baby,
  IdCard,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

type Params = { slug: string };

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return { title: "Tour not found — JYS Adventure Tour" };
  return {
    title: `${tour.title} — JYS Adventure Tour`,
    description: tour.tagline,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const others = TOURS.filter((t) => t.slug !== tour.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
              {tour.category === "combo" ? "Combo tour" : "Signature ride"}
            </span>
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              {tour.vehicle}
            </span>
            {tour.addon && (
              <span className="rounded-full border border-jungle-500/40 bg-jungle-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-jungle-500 backdrop-blur-sm">
                + {tour.addon}
              </span>
            )}
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,11vw,5.5rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:leading-[0.85] sm:tracking-wider md:text-[7.5rem]">
            {tour.title}
          </h1>
          <p className="mt-6 max-w-2xl text-white/75 md:text-lg">
            {tour.tagline}
          </p>
        </div>
      </section>

      {/* Details + booking */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* Left: content */}
            <div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat icon={Clock} label="Duration" value={tour.duration} />
                  <Stat icon={Gauge} label="Level" value={tour.difficulty} />
                  <Stat
                    icon={Users}
                    label="Driver age"
                    value={`${tour.minAge}+`}
                  />
                  <Stat
                    icon={Baby}
                    label="Passenger"
                    value={
                      tour.minPassengerAge !== null
                        ? `${tour.minPassengerAge}+`
                        : "Solo"
                    }
                  />
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-display text-3xl tracking-wide text-white md:text-4xl">
                  The <span className="text-gradient-fire">ride</span>
                </h2>
                <p className="mt-4 text-white/70">{tour.description}</p>
              </div>

              {/* Variants (ATV only) */}
              {tour.variants && (
                <div className="mt-10">
                  <h3 className="font-display text-xl tracking-wide text-white">
                    Pick your setup
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {tour.variants.map((v) => (
                      <div
                        key={v.type}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-display text-lg tracking-wide text-white">
                              {v.label}
                            </div>
                            <div className="mt-1 text-[11px] uppercase tracking-widest text-white/50">
                              {v.seats === 1 ? "1 rider" : "2 riders"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-display text-2xl text-lava-400">
                              ${v.price}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-white/50">
                              per quad
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-white/65">
                          {v.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-white/50">
                    Mix Singles and Doubles in the same group — choose how many
                    of each in the booking form.
                  </p>
                </div>
              )}

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl tracking-wide text-white">
                    Highlights
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {tour.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-white/75"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-jungle-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wide text-white">
                    What&apos;s included
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {tour.includes.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-white/75"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-jungle-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-10 rounded-3xl border border-lava-500/30 bg-lava-500/5 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-lava-400" />
                  <h3 className="font-display text-xl tracking-wide text-white">
                    Safety & requirements
                  </h3>
                </div>
                <ul className="mt-5 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <IdCard className="mt-0.5 h-4 w-4 shrink-0 text-lava-400" />
                    Driver must hold a valid driver&apos;s license (any country).
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-lava-400" />
                    Minimum driver age: {tour.minAge}+.
                  </li>
                  {tour.minPassengerAge !== null && (
                    <li className="flex items-start gap-2">
                      <Baby className="mt-0.5 h-4 w-4 shrink-0 text-lava-400" />
                      Passengers from {tour.minPassengerAge}+ years allowed.
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lava-400" />
                    Closed-toe shoes and comfortable clothing recommended.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: booking card */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 to-night-950 p-6 sm:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                      From
                    </div>
                    <div className="font-display text-5xl text-lava-400">
                      ${tour.price}
                      <span className="ml-1 text-sm text-white/50">
                        / person
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full border border-lava-500/40 bg-lava-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lava-400">
                    <Flame className="mr-1 inline h-3 w-3" />
                    Book now
                  </span>
                </div>
                <p className="mt-4 text-sm text-white/60">
                  Reserve your spot. We confirm availability within the hour.
                </p>
                <div className="mt-6">
                  <BookingForm preselectedSlug={tour.slug} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other tours */}
      <section className="relative bg-night-900 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Keep exploring"
            title={
              <>
                More <span className="text-gradient-fire">rides</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/tours" className="btn-ghost">
              See all tours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <Icon className="h-4 w-4 text-lava-400" />
      <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </div>
      <div className="font-display text-2xl text-white">{value}</div>
    </div>
  );
}
