import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT, SCHEDULE, SOCIAL_LINKS } from "@/lib/info";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Star } from "lucide-react";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const infoItems = [
    {
      icon: Phone,
      label: dict.contact.info.phone,
      value: CONTACT.phone,
      href: `tel:${CONTACT.phoneE164}`,
    },
    {
      icon: Mail,
      label: dict.contact.info.email,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: MapPin,
      label: dict.contact.info.location,
      value: CONTACT.location,
    },
    {
      icon: Clock,
      label: dict.contact.info.departures,
      value: `${dict.contact.info.daily} · ${SCHEDULE.departures.join(" · ")}`,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Image
          src={IMAGES.gallery[2]}
          alt="Contact JYS"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            {dict.contact.badge}
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            {dict.contact.titleA}
            <br />
            <span className="text-gradient-fire">{dict.contact.titleB}</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/70 md:text-lg">
            {dict.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 to-night-950 p-5 sm:p-8">
                <h2 className="font-display text-[clamp(1.75rem,7vw,2.75rem)] leading-tight tracking-wide text-white [overflow-wrap:anywhere] md:text-5xl">
                  {dict.contact.cardTitle}{" "}
                  <span className="text-gradient-fire">
                    {dict.contact.cardTitleHighlight}
                  </span>
                </h2>
                <p className="mt-3 text-white/60">{dict.contact.cardSubtitle}</p>

                <div className="mt-8 space-y-5">
                  {infoItems.map((c, i) => {
                    const Wrapper: React.ElementType = c.href ? "a" : "div";
                    return (
                      <Wrapper
                        key={i}
                        {...(c.href ? { href: c.href } : {})}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-lava-400/50 sm:gap-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
                          <c.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                            {c.label}
                          </div>
                          <div className="mt-1 break-all text-white">{c.value}</div>
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>

                <div className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                  {dict.contact.flexibleNote}
                </div>

                <div className="mt-8 flex gap-3">
                  {[
                    { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                    { Icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                    { Icon: Star, href: SOCIAL_LINKS.tripadvisor, label: "TripAdvisor" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-lava-400 hover:bg-lava-500/20 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={IMAGES.gallery[5]}
                  alt="JYS base camp"
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-display text-3xl tracking-wide text-white">
                    {dict.contact.baseCamp}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    {dict.contact.pacificCoast}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 to-night-950 p-4 sm:p-6 md:p-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
                    {dict.contact.formBadge}
                  </span>
                  <h2 className="mt-5 font-display text-[clamp(1.75rem,7vw,2.75rem)] leading-tight tracking-wide text-white [overflow-wrap:anywhere] md:text-5xl md:leading-none">
                    {dict.contact.formTitle}{" "}
                    <span className="text-gradient-fire">
                      {dict.contact.formTitleHighlight}
                    </span>
                  </h2>
                  <p className="mt-3 max-w-md text-white/60">
                    {dict.contact.formSubtitle}
                  </p>
                </div>
                <div className="mt-8">
                  <ContactForm locale={locale} dict={dict} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
