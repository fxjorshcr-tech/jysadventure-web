"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, Gauge, ArrowUpRight } from "lucide-react";
import type { Tour } from "@/lib/tours";

const difficultyColor: Record<Tour["difficulty"], string> = {
  Easy: "bg-jungle-500/20 text-jungle-500 border-jungle-500/40",
  Moderate: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
  Extreme: "bg-lava-500/20 text-lava-400 border-lava-500/50",
};

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

          {/* Top tags */}
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

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/60">
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
            <h3 className="font-display text-4xl leading-none tracking-wide text-white">
              {tour.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/70">{tour.tagline}</p>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                  From
                </div>
                <div className="font-display text-3xl text-lava-400">
                  ${tour.price}
                  <span className="ml-1 text-xs text-white/50">/ person</span>
                </div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition group-hover:border-lava-400 group-hover:bg-lava-500">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
