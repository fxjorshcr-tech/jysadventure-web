"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

export function Gallery() {
  const imgs = IMAGES.gallery;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {imgs.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
          className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
            i % 5 === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
          }`}
        >
          <Image
            src={src}
            alt="JYS Adventure Tour gallery"
            fill
            sizes="(min-width:1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent opacity-60 transition group-hover:opacity-20" />
        </motion.div>
      ))}
    </div>
  );
}
