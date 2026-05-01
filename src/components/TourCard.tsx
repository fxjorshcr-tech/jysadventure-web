"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Gauge,
  ArrowUpRight,
  Mountain,
  Trees,
  Sparkles,
} from "lucide-react";
import type { LocalizedTour } from "@/lib/tours";
import type { Dictionary } from "@/i18n/dictionaries";

const difficultyColor: Record<LocalizedTour["difficulty"], string> = {
  Easy: "bg-jungle-500/20 text-jungle-500 border-jungle-500/40",
  Moderate: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
  Extreme: "bg-lava-500/20 text-lava-400 border-lava-500/50",
};

function difficultyLabel(d: LocalizedTour["difficulty"], dict: Dictionary): string {
  // Show difficulty in current language
  const map: Record<string, Record<LocalizedTour["difficulty"], string>> = {
    en: { Easy: "Easy", Moderate: "Moderate", Extreme: "Extreme" },
    es: { Easy: "Fácil", Moderate: "Moderado", Extreme: "Extremo" },
  };
  const lang = dict.nav.home === "Inicio" ? "es" : "en";
  return map[lang][d];
}

function PriceDisplay({
  tour,
  dict,
}: {
  tour: LocalizedTour;
  dict: Dictionary;
}) {
  const lang = dict.nav.home === "Inicio" ? "es" : "en";
  const unit =
    tour.pricingMode === "flat-vehicle"
      ? lang === "es"
        ? "/ UTV"
        : "/ UTV"
      : tour.pricingMode === "flat-plus-per-person"
        ? lang === "es"
          ? "+ por persona"
          : "+ per person"
        : lang === "es"
          ? "/ persona"
          : "/ person";
  const fromLabel = lang === "es" ? "Desde" : "From";
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
        {fromLabel}
      </div>
      <div className="font-display text-2xl text-lava-400 sm:text-3xl">
        ${tour.price}
        <span className="ml-1 text-xs text-white/50">{unit}</span>
      </div>
    </div>
  );
}

export function TourCard({
  tour,
  index = 0,
  dict,
}: {
  tour: LocalizedTour;
  index?: number;
  dict: Dictionary;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-night-900"
    >
      <Link href={`/tours/${tour.slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />

          <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${difficultyColor[tour.difficulty]}`}
            >
              {difficultyLabel(tour.difficulty, dict)}
            </span>
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              {tour.vehicle}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {tour.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {tour.minAge}+
              </span>
              <span className="flex items-center gap-1">
                <Gauge className="h-3 w-3" /> 4x4
              </span>
            </div>
            <h3 className="font-display text-3xl leading-none tracking-wide text-white sm:text-4xl">
              {tour.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/70">{tour.tagline}</p>

            <div className="mt-5 flex items-end justify-between gap-3">
              <PriceDisplay tour={tour} dict={dict} />
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition group-hover:border-lava-400 group-hover:bg-lava-500">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedTourCard({
  tour,
  index = 0,
  dict,
}: {
  tour: LocalizedTour;
  index?: number;
  dict: Dictionary;
}) {
  const lang = dict.nav.home === "Inicio" ? "es" : "en";
  const passengerLabel = (n: number | null) =>
    n === null
      ? lang === "es"
        ? "Solo"
        : "Solo"
      : lang === "es"
        ? `${n}+ pasajero`
        : `${n}+ passenger`;
  const seeDetails = lang === "es" ? "Ver detalles" : "See details";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-night-900 transition hover:border-lava-400/50"
    >
      <Link href={`/tours/${tour.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/30 to-transparent" />

          <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${difficultyColor[tour.difficulty]}`}
            >
              {difficultyLabel(tour.difficulty, dict)}
            </span>
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              {tour.vehicle}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="font-display text-3xl leading-none tracking-wide text-white sm:text-4xl">
              {tour.title}
            </h3>
            <p className="mt-2 text-sm text-white/75">{tour.tagline}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="grid grid-cols-3 gap-2">
            <Stat icon={Clock} label={tour.duration} />
            <Stat icon={Gauge} label={difficultyLabel(tour.difficulty, dict)} />
            <Stat icon={Users} label={passengerLabel(tour.minPassengerAge)} />
          </div>

          <ul className="space-y-1.5 text-sm text-white/75">
            {tour.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lava-400" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-5">
            <PriceDisplay tour={tour} dict={dict} />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition group-hover:border-lava-400 group-hover:bg-lava-500/20">
              {seeDetails} <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ComboTourCard({
  tour,
  index = 0,
  dict,
}: {
  tour: LocalizedTour;
  index?: number;
  dict: Dictionary;
}) {
  const lang = dict.nav.home === "Inicio" ? "es" : "en";
  const seeDetails = lang === "es" ? "Ver detalles" : "See details";
  const addonIcon =
    tour.addon === "Cabalgata"
      ? Mountain
      : tour.addon === "Canopy"
        ? Trees
        : Sparkles;
  const AddonIcon = addonIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-night-900 transition hover:border-lava-400/50"
    >
      <Link href={`/tours/${tour.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />

          <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Combo
            </span>
            <span className="rounded-full border border-jungle-500/40 bg-jungle-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-jungle-500 backdrop-blur-sm">
              {tour.vehicle} + {tour.addon}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
              {tour.vehicle}
            </span>
            <span className="text-white/40">+</span>
            <span className="flex items-center gap-1.5 rounded-full border border-jungle-500/40 bg-jungle-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-jungle-500">
              <AddonIcon className="h-3 w-3" /> {tour.addon}
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl leading-tight tracking-wide text-white sm:text-3xl">
              {tour.title}
            </h3>
            <p className="mt-2 text-sm text-white/70">{tour.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] uppercase tracking-widest text-white/55">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-lava-400" /> {tour.duration}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-lava-400" />{" "}
              {difficultyLabel(tour.difficulty, dict)}
            </span>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-5">
            <PriceDisplay tour={tour} dict={dict} />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition group-hover:border-lava-400 group-hover:bg-lava-500/20">
              {seeDetails} <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Stat({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[10px] uppercase tracking-widest text-white/70">
      <Icon className="h-3 w-3 shrink-0 text-lava-400" />
      <span className="truncate">{label}</span>
    </div>
  );
}
