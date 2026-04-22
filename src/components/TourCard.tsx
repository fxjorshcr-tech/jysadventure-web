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
  Flame,
} from "lucide-react";
import type { Tour } from "@/lib/tours";

const difficultyColor: Record<Tour["difficulty"], string> = {
  Easy: "bg-jungle-500/20 text-jungle-500 border-jungle-500/40",
  Moderate: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
  Extreme: "bg-lava-500/20 text-lava-400 border-lava-500/50",
};

function PriceDisplay({ tour }: { tour: Tour }) {
  const unit =
    tour.pricingMode === "flat-vehicle"
      ? "/ UTV"
      : tour.pricingMode === "flat-plus-per-person"
        ? "+ per person"
        : "/ person";
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
        From
      </div>
      <div className="font-display text-2xl text-lava-400 sm:text-3xl">
        ${tour.price}
        <span className="ml-1 text-xs text-white/50">{unit}</span>
      </div>
    </div>
  );
}

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
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
              {tour.difficulty}
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
              <PriceDisplay tour={tour} />
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

/**
 * Larger, richer card used in the Base tours grid on /tours.
 * Full-bleed image with description and two CTAs (Details + Book).
 */
export function FeaturedTourCard({
  tour,
  index = 0,
}: {
  tour: Tour;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-night-900"
    >
      <Link
        href={`/tours/${tour.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden"
      >
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
            {tour.difficulty}
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
      </Link>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-2">
          <Stat icon={Clock} label={tour.duration} />
          <Stat icon={Gauge} label={tour.difficulty} />
          <Stat
            icon={Users}
            label={
              tour.minPassengerAge !== null
                ? `${tour.minPassengerAge}+ passenger`
                : "Solo"
            }
          />
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
          <PriceDisplay tour={tour} />
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link
              href={`/tours/${tour.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:border-lava-400"
            >
              Details
            </Link>
            <Link
              href={`/tours/${tour.slug}/book`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lava-500 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-lava-400"
            >
              <Flame className="h-3.5 w-3.5" /> Book
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Combo card: shows the combo ingredients as two icons + plus sign.
 */
export function ComboTourCard({
  tour,
  index = 0,
}: {
  tour: Tour;
  index?: number;
}) {
  const addonIcon =
    tour.addon === "Cabalgata" ? Mountain : tour.addon === "Canopy" ? Trees : Sparkles;
  const AddonIcon = addonIcon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-night-900"
    >
      <Link
        href={`/tours/${tour.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden"
      >
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
      </Link>

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
            <Gauge className="h-3 w-3 text-lava-400" /> {tour.difficulty}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-5">
          <PriceDisplay tour={tour} />
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link
              href={`/tours/${tour.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:border-lava-400"
            >
              Details
            </Link>
            <Link
              href={`/tours/${tour.slug}/book`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lava-500 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-lava-400"
            >
              <Flame className="h-3.5 w-3.5" /> Book
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
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
