import Image from "next/image";
import { localizeTours } from "@/lib/tours";
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
  Clock,
  Plus,
} from "lucide-react";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";
import { t } from "@/i18n/text";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.tours.metaTitle,
    description: dict.tours.metaDescription,
  };
}

export default async function ToursPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const tours = localizeTours(locale);
  const baseTours = tours.filter((t) => t.category === "base");
  const atvCombos = tours.filter((t) => t.category === "combo" && t.vehicle === "ATV");
  const utvCombos = tours.filter((t) => t.category === "combo" && t.vehicle === "UTV");
  const transportSubtitle = dict.tours.transport.subtitle.replace(
    "{count}",
    String(TRANSPORT_INFO.includedPassengers),
  );
  const ridersHeader = dict.tours.transport.ridersHeader.replace(
    "{count}",
    String(TRANSPORT_INFO.includedPassengers),
  );
  const ridersInline = dict.tours.transport.ridersInline.replace(
    "{count}",
    String(TRANSPORT_INFO.includedPassengers),
  );

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
            {dict.tours.badge}
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            {dict.tours.titleA}
            <br />
            <span className="text-gradient-fire">{dict.tours.titleB}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            {dict.tours.subtitle}
          </p>
        </div>
      </section>

      <Marquee dict={dict} />

      {/* Base tours */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker={dict.tours.base.kicker}
            title={
              <>
                {dict.tours.base.title}{" "}
                <span className="text-gradient-fire">
                  {dict.tours.base.titleHighlight}
                </span>
              </>
            }
            subtitle={dict.tours.base.subtitle}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {baseTours.map((t, i) => (
              <FeaturedTourCard key={t.slug} tour={t} index={i} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* Combos */}
      <section className="relative bg-night-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker={dict.tours.combos.kicker}
            title={
              <>
                {dict.tours.combos.title}{" "}
                <span className="text-gradient-fire">
                  {dict.tours.combos.titleHighlight}
                </span>
              </>
            }
            subtitle={dict.tours.combos.subtitle}
          />

          <div className="mt-14 space-y-14">
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    {dict.tours.combos.atvLabel}
                  </div>
                  <h3 className="mt-2 font-display text-3xl tracking-wide text-white md:text-4xl">
                    {dict.tours.combos.atvTitle}{" "}
                    <span className="text-gradient-fire">
                      {dict.tours.combos.atvTitleHighlight}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {atvCombos.map((t, i) => (
                  <ComboTourCard key={t.slug} tour={t} index={i} dict={dict} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    {dict.tours.combos.utvLabel}
                  </div>
                  <h3 className="mt-2 font-display text-3xl tracking-wide text-white md:text-4xl">
                    {dict.tours.combos.utvTitle}{" "}
                    <span className="text-gradient-fire">
                      {dict.tours.combos.utvTitleHighlight}
                    </span>{" "}
                    {dict.tours.combos.utvTitleEnd}
                  </h3>
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {utvCombos.map((t, i) => (
                  <ComboTourCard key={t.slug} tour={t} index={i} dict={dict} />
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
            kicker={dict.tours.plan.kicker}
            title={
              <>
                {dict.tours.plan.title}{" "}
                <span className="text-gradient-fire">
                  {dict.tours.plan.titleHighlight}
                </span>
              </>
            }
            subtitle={dict.tours.plan.subtitle}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl tracking-wide text-white">
                  {dict.tours.plan.dailyTitle}
                </h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {SCHEDULE.departures.map((time) => (
                  <span
                    key={time}
                    className="rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-2 font-display text-lg tracking-wide text-white"
                  >
                    {time}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/65">
                {t(SCHEDULE.note, locale)}
              </p>
            </div>

            <div className="grid gap-4">
              {SEASONAL_ROUTES.map((r) => (
                <div
                  key={r.season}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jungle-500/20 text-jungle-500 ring-1 ring-jungle-500/40">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                        {t(r.months, locale)}
                      </div>
                    </div>
                  </div>
                  <h4 className="mt-5 font-display text-xl tracking-wide text-white">
                    {t(r.title, locale)}
                  </h4>
                  <p className="mt-2 text-sm text-white/65">
                    {t(r.description, locale)}
                  </p>
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
            kicker={dict.tours.transport.kicker}
            title={
              <>
                {dict.tours.transport.title}{" "}
                <span className="text-gradient-fire">
                  {dict.tours.transport.titleHighlight}
                </span>
              </>
            }
            subtitle={transportSubtitle}
          />

          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-night-950/60 backdrop-blur">
            <div className="hidden grid-cols-[2fr_1fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 sm:grid">
              <div>{dict.common.zone}</div>
              <div className="text-right">{ridersHeader}</div>
              <div className="text-right">{dict.tours.transport.extraRider}</div>
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
                    <div className="mt-1 text-xs text-white/55">
                      {t(z.note, locale)}
                    </div>
                  )}
                </div>
                <div className="text-right sm:text-right">
                  <div className="font-display text-lg text-lava-400">
                    {z.basePrice === 0 ? dict.common.free : `$${z.basePrice}`}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/45 sm:hidden">
                    {ridersInline}
                  </div>
                </div>
                <div className="col-span-2 text-right text-sm text-white/65 sm:col-span-1">
                  {z.extraPerPerson > 0 ? (
                    <>
                      <span className="font-display text-base text-white">
                        +${z.extraPerPerson}
                      </span>
                      <span className="ml-1 text-xs text-white/50 sm:hidden">
                        {dict.tours.transport.perExtraRider}
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
            kicker={dict.tours.addons.kicker}
            title={
              <>
                {dict.tours.addons.title}
                <span className="text-gradient-fire">
                  {dict.tours.addons.titleHighlight}
                </span>
              </>
            }
            subtitle={dict.tours.addons.subtitle}
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
                      {t(a.name, locale)}
                    </h3>
                    <div className="shrink-0 font-display text-xl text-lava-400">
                      +${a.price}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white/65">
                    {t(a.description, locale)}
                  </p>
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
            kicker={dict.tours.requirements.kicker}
            title={
              <>
                {dict.tours.requirements.title}{" "}
                <span className="text-gradient-fire">
                  {dict.tours.requirements.titleHighlight}
                </span>
              </>
            }
            subtitle={dict.tours.requirements.subtitle}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <RequirementCard
              icon={IdCard}
              title={dict.tours.requirements.cards.license.title}
              text={dict.tours.requirements.cards.license.text}
            />
            <RequirementCard
              icon={Users}
              title={dict.tours.requirements.cards.atv.title}
              text={dict.tours.requirements.cards.atv.text}
            />
            <RequirementCard
              icon={Baby}
              title={dict.tours.requirements.cards.utv.title}
              text={dict.tours.requirements.cards.utv.text}
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
