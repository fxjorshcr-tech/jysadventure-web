import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SectionHeader } from "@/components/SectionHeader";
import { TourCard } from "@/components/TourCard";
import { Gallery } from "@/components/Gallery";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { TOURS } from "@/lib/tours";
import { IMAGES } from "@/lib/images";
import {
  ShieldCheck,
  Compass,
  HeartHandshake,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const featured = TOURS.slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />

      {/* Featured tours */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              kicker="Signature Rides"
              title={
                <>
                  Pick your <span className="text-gradient-fire">poison</span>
                </>
              }
              subtitle="From family cruisers to extreme volcano ascents, every JYS ride is built to wake up your inner adventurer."
            />
            <Link href="/tours" className="btn-ghost whitespace-nowrap">
              All Tours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />
        <div className="absolute inset-0 bg-hero-radial opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={IMAGES.heroAlt}
                  alt="ATV rider Costa Rica"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-8 -right-6 hidden rounded-3xl border border-lava-500/50 bg-lava-500/20 p-6 backdrop-blur md:block">
                <div className="font-display text-6xl text-white">100%</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-100">
                  Adrenaline guaranteed
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                kicker="Why ride with us"
                title={
                  <>
                    Built for those who <span className="text-gradient-fire">don&apos;t settle</span>
                  </>
                }
                subtitle="We live and breathe Guanacaste's backcountry. Our guides are locals, our machines are beasts, and every trail has been hand-picked to deliver the kind of story you&apos;ll tell at every dinner party for years."
              />

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Safety first",
                    text: "Modern ATVs, premium helmets and bilingual pro guides.",
                  },
                  {
                    icon: Compass,
                    title: "Hidden trails",
                    text: "Locations you won't find on any map or Instagram feed.",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Small groups",
                    text: "Max 10 riders per guide for a truly personal ride.",
                  },
                  {
                    icon: Zap,
                    title: "Full adrenaline",
                    text: "Designed for thrill. From mild to extreme, you pick.",
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-lava-400/50 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 font-display text-2xl tracking-wide text-white">
                      {f.title}
                    </div>
                    <p className="mt-1 text-sm text-white/60">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            align="center"
            kicker="From the trails"
            title={
              <>
                Real riders.{" "}
                <span className="text-gradient-fire">Real adventure.</span>
              </>
            }
            subtitle="Candid shots from our latest tours across Guanacaste."
          />
          <div className="mt-16">
            <Gallery />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            align="center"
            kicker="The hype"
            title={
              <>
                What riders <span className="text-gradient-fire">say</span>
              </>
            }
          />
          <div className="mt-16">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Final CTA banner */}
      <section className="relative overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.gallery[6]}
            alt="Adventure"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/80 to-night-950" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-5 sm:py-28 lg:px-8">
          <h2 className="font-display text-[clamp(2.75rem,12vw,5rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:tracking-wider md:text-8xl md:leading-none">
            YOUR STORY
            <br />
            <span className="text-gradient-fire">STARTS TODAY</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Don&apos;t let your trip to Costa Rica be just another vacation. Make
            it the story you&apos;ll never stop telling.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/tours" className="btn-primary">
              Choose My Ride <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Talk To Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
