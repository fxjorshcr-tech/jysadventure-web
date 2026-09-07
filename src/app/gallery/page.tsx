import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IMAGES, PHOTOS } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbNode, CRUMB_LABELS } from "@/lib/schema";
import { SITE_URL } from "@/lib/info";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";
import { t } from "@/i18n/text";
import { PhotoGrid } from "./PhotoGrid";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.gallery.metaTitle,
    description: dict.gallery.metaDescription,
    alternates: { canonical: `${SITE_URL}/gallery` },
    openGraph: {
      title: dict.gallery.metaTitle,
      description: dict.gallery.metaDescription,
      images: [IMAGES.utvRiver],
    },
  };
}

export default async function GalleryPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const photos = PHOTOS.map((p) => ({
    src: p.src,
    alt: t(p.alt, locale),
    category: p.category,
    w: p.w,
    h: p.h,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbNode([
        { name: t(CRUMB_LABELS.home, locale), url: `${SITE_URL}/` },
        { name: t(CRUMB_LABELS.gallery, locale), url: `${SITE_URL}/gallery` },
      ]),
      {
        "@type": "ImageGallery",
        name: dict.gallery.metaTitle,
        description: dict.gallery.metaDescription,
        url: `${SITE_URL}/gallery`,
        image: photos.map((p) => ({
          "@type": "ImageObject",
          contentUrl: p.src,
          description: p.alt,
          width: p.w,
          height: p.h,
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="relative flex min-h-[55svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Image
          src={IMAGES.atvPinkRoad}
          alt={dict.gallery.badge}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_60%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            {dict.gallery.badge}
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            {dict.gallery.title}
            <br />
            <span className="text-gradient-fire">{dict.gallery.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            {dict.gallery.subtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="relative bg-night-950 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <PhotoGrid photos={photos} dict={dict} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-night-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />
        <div className="absolute inset-0 bg-hero-radial opacity-70" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-5 lg:px-8">
          <h2 className="font-display text-[clamp(2rem,9vw,3rem)] leading-[0.95] tracking-wide text-white sm:tracking-wider md:text-6xl">
            {dict.gallery.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/70 md:text-lg">
            {dict.gallery.cta.subtitle}
          </p>
          <Link href="/tours" className="btn-primary mt-10">
            {dict.gallery.cta.button} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
