import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SectionHeader } from "@/components/SectionHeader";
import { TourCard } from "@/components/TourCard";
import { Gallery } from "@/components/Gallery";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { localizeTours } from "@/lib/tours";
import { IMAGES } from "@/lib/images";
import {
  ShieldCheck,
  Compass,
  HeartHandshake,
  Zap,
  ArrowRight,
} from "lucide-react";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const tours = localizeTours(locale);
  const featured = tours.slice(0, 3);
  const cards = [
    { icon: ShieldCheck, ...dict.home.why.cards.safety },
    { icon: Compass, ...dict.home.why.cards.hidden },
    { icon: HeartHandshake, ...dict.home.why.cards.small },
    { icon: Zap, ...dict.home.why.cards.full },
  ];

  return (
    <>
      <Hero dict={dict} />
      <Marquee dict={dict} />

      {/* Featured tours */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              kicker={dict.home.signature.kicker}
              title={
                <>
                  {dict.home.signature.title}{" "}
                  <span className="text-gradient-fire">
                    {dict.home.signature.titleHighlight}
                  </span>
                </>
              }
              subtitle={dict.home.signature.subtitle}
            />
            <Link href="/tours" className="btn-ghost whitespace-nowrap">
              {dict.common.allTours} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} dict={dict} />
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
                  {dict.home.why.adrenaline}
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                kicker={dict.home.why.kicker}
                title={
                  <>
                    {dict.home.why.title}{" "}
                    <span className="text-gradient-fire">
                      {dict.home.why.titleHighlight}
                    </span>
                  </>
                }
                subtitle={dict.home.why.subtitle}
              />

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {cards.map((f, i) => (
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
            kicker={dict.home.gallery.kicker}
            title={
              <>
                {dict.home.gallery.title}{" "}
                <span className="text-gradient-fire">
                  {dict.home.gallery.titleHighlight}
                </span>
              </>
            }
            subtitle={dict.home.gallery.subtitle}
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
            kicker={dict.home.testimonials.kicker}
            title={
              <>
                {dict.home.testimonials.title}{" "}
                <span className="text-gradient-fire">
                  {dict.home.testimonials.titleHighlight}
                </span>
              </>
            }
          />
          <div className="mt-16">
            <TestimonialsCarousel locale={locale} dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
