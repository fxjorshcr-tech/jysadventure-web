import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/SectionHeader";
import { Gallery } from "@/components/Gallery";
import { Marquee } from "@/components/Marquee";
import { Mountain, Leaf, Users, Heart, ArrowRight } from "lucide-react";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const values = [
    { icon: Mountain, ...dict.about.values.cards.adventure },
    { icon: Leaf, ...dict.about.values.cards.respect },
    { icon: Users, ...dict.about.values.cards.crew },
    { icon: Heart, ...dict.about.values.cards.pura },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Image
          src={IMAGES.gallery[4]}
          alt="JYS crew"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            {dict.about.badge}
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.25rem,9vw,4.5rem)] leading-[0.95] tracking-wide text-white sm:text-7xl sm:leading-[0.9] sm:tracking-wider md:text-[6.5rem]">
            {dict.about.titleA}
            <br />
            <span className="text-gradient-fire">{dict.about.titleB}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            {dict.about.intro}
          </p>
        </div>
      </section>

      <Marquee dict={dict} />

      {/* Story */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
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
                <div className="font-display text-5xl text-white">
                  {locale === "es" ? "PURA VIDA" : "PURA VIDA"}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-100">
                  {dict.about.estLabel}
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                kicker={dict.about.story.kicker}
                title={
                  <>
                    {dict.about.story.title} <br />
                    <span className="text-gradient-fire">
                      {dict.about.story.titleHighlight}
                    </span>
                  </>
                }
              />
              <div className="mt-8 space-y-5 text-white/70">
                <p>{dict.about.story.p1}</p>
                <p>{dict.about.story.p2}</p>
                <p>{dict.about.story.p3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-hero-radial opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            align="center"
            kicker={dict.about.values.kicker}
            title={
              <>
                {dict.about.values.title}{" "}
                <span className="text-gradient-fire">
                  {dict.about.values.titleHighlight}
                </span>
              </>
            }
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
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

      {/* Gallery */}
      <section className="relative bg-night-900 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            align="center"
            kicker={dict.about.gallerySection.kicker}
            title={
              <>
                {dict.about.gallerySection.title}{" "}
                <span className="text-gradient-fire">
                  {dict.about.gallerySection.titleHighlight}
                </span>
              </>
            }
          />
          <div className="mt-16">
            <Gallery />
          </div>

          <div className="mt-16 text-center">
            <Link href="/tours" className="btn-primary">
              {dict.common.seeOurTours} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
