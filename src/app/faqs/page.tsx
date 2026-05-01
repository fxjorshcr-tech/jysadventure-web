import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/SectionHeader";
import { localizeFaqs } from "@/lib/faqs";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";
import { FaqAccordion } from "./FaqAccordion";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.faqs.metaTitle,
    description: dict.faqs.metaDescription,
  };
}

export default async function FAQsPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const groups = localizeFaqs(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[55svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Image
          src={IMAGES.gallery[7]}
          alt="FAQs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            {dict.faqs.badge}
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            {dict.faqs.title}
            <span className="text-gradient-fire">{dict.faqs.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            {dict.faqs.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-5 lg:px-8">
          {groups.map((group, gi) => (
            <div key={group.title} className={gi === 0 ? "" : "mt-16"}>
              <SectionHeader
                kicker={`${dict.faqs.sectionLabel} 0${gi + 1}`}
                title={<>{group.title}</>}
              />
              <FaqAccordion items={group.items} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
