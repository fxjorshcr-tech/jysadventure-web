"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "left",
}: {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {kicker && (
        <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
          {kicker}
        </span>
      )}
      <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-wider text-white md:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base text-white/70 md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
