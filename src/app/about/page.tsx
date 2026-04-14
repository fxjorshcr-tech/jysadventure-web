import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/SectionHeader";
import { Gallery } from "@/components/Gallery";
import { Marquee } from "@/components/Marquee";
import { Mountain, Leaf, Users, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About — JYS Adventure Tour",
  description:
    "Get to know the crew behind JYS Adventure Tour. Born in Guanacaste, built for riders.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-night-950 pb-20 pt-40">
        <Image
          src={IMAGES.gallery[4]}
          alt="JYS crew"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            Our story
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[14vw] leading-[0.85] tracking-wider text-white sm:text-8xl md:text-[9rem]">
            BORN IN THE
            <br />
            <span className="text-gradient-fire">JUNGLE</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            JYS Adventure Tour is more than a company — it&apos;s a family of
            Guanacaste locals obsessed with showing the world what Costa Rica
            feels like from behind the handlebars.
          </p>
        </div>
      </section>

      <Marquee />

      {/* Story */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={IMAGES.hero}
                  alt="JYS"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -right-6 -top-6 hidden rounded-3xl border border-lava-500/50 bg-lava-500/20 p-6 backdrop-blur lg:block">
                <div className="font-display text-5xl text-white">EST. 2016</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-100">
                  Guanacaste roots
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                kicker="Who we are"
                title={
                  <>
                    A family of riders, <br />
                    <span className="text-gradient-fire">not tourists</span>
                  </>
                }
              />
              <div className="mt-8 space-y-5 text-white/70">
                <p>
                  It all started with a beat-up ATV, a dirt trail behind the
                  family finca, and one wild idea: what if we could show
                  visitors the <em>real</em> Guanacaste — the one only locals
                  know?
                </p>
                <p>
                  Years later, JYS Adventure has grown into one of Costa
                  Rica&apos;s most loved off-road experiences, with a crew of
                  trained bilingual guides, a fleet of brand-new vehicles, and a
                  collection of secret trails that stretch from the volcanic
                  ridges of Rincón de la Vieja all the way to the Pacific coast.
                </p>
                <p>
                  Our mission is simple: give every rider the kind of day they
                  can&apos;t stop talking about.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-hero-radial opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            align="center"
            kicker="Our values"
            title={
              <>
                What we <span className="text-gradient-fire">stand for</span>
              </>
            }
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Mountain,
                title: "Adventure first",
                text: "Every trail is scouted to deliver raw, unforgettable moments.",
              },
              {
                icon: Leaf,
                title: "Respect nature",
                text: "We ride light. Local ecosystems are our #1 teammate.",
              },
              {
                icon: Users,
                title: "Local crew",
                text: "Born and raised in Guanacaste. We share our home with you.",
              },
              {
                icon: Heart,
                title: "Pura vida soul",
                text: "We treat every rider like an old friend from day one.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:border-lava-400/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl tracking-wide text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 to-night-950 p-10 md:grid-cols-4 md:p-14">
            {[
              { k: "8+", v: "Years of rides" },
              { k: "12k+", v: "Happy riders" },
              { k: "25+", v: "Signature trails" },
              { k: "4.9★", v: "Average review" },
            ].map((s, i) => (
              <div key={i} className="border-b border-white/10 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6 md:last:border-r-0">
                <div className="font-display text-6xl tracking-wide text-white">
                  {s.k}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative bg-night-900 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            align="center"
            kicker="Behind the wheel"
            title={
              <>
                Moments from <span className="text-gradient-fire">the trail</span>
              </>
            }
          />
          <div className="mt-16">
            <Gallery />
          </div>

          <div className="mt-16 text-center">
            <Link href="/tours" className="btn-primary">
              See our tours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
