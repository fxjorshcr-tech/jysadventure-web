"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { GoogleBadge } from "./GoogleBadge";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative min-h-[100svh] w-full max-w-full overflow-hidden bg-night-950">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="ATV tour in Costa Rica jungle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/40 via-night-950/60 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />
      </div>

      <div className="absolute inset-0 bg-grid-dark bg-[size:56px_56px] opacity-15" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between px-4 pb-12 pt-24 sm:px-5 sm:pt-36 sm:pb-14 lg:px-8 lg:pt-44">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lava-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lava-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-lava-100">
              {dict.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem] lg:text-[11rem]"
          >
            {dict.hero.titleA}
            <br />
            {dict.hero.titleB}{" "}
            <span className="text-gradient-fire">{dict.hero.titleC}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-xl text-base text-white/80 md:text-lg"
          >
            {dict.hero.subtitle}{" "}
            <span className="font-semibold text-white">
              {dict.hero.subtitleHighlight}
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link href="/tours" className="btn-primary group w-full sm:w-auto">
              {dict.common.explore}{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8"
          >
            <GoogleBadge />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-950" />
    </section>
  );
}
