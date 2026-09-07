"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PhotoCategory } from "@/lib/images";
import type { Dictionary } from "@/i18n/dictionaries";

export type GridPhoto = {
  src: string;
  alt: string;
  category: PhotoCategory;
  w: number;
  h: number;
};

type Filter = "all" | PhotoCategory;

const FILTERS: Filter[] = ["all", "atv", "utv", "wildlife", "basecamp"];

export function PhotoGrid({
  photos,
  dict,
}: {
  photos: GridPhoto[];
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [photos, filter]
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => {
        if (i === null) return i;
        return (i + dir + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  // Keyboard navigation + scroll lock while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close, step]);

  const count = visible.length;
  const countLabel = `${count} ${
    count === 1 ? dict.gallery.countSingular : dict.gallery.countPlural
  }`;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              setActive(null);
            }}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition",
              filter === f
                ? "border-lava-500 bg-lava-500/20 text-white"
                : "border-white/15 bg-white/5 text-white/70 hover:border-lava-400/60 hover:text-white"
            )}
          >
            {dict.gallery.filters[f]}
          </button>
        ))}
        <span className="ml-auto text-xs uppercase tracking-[0.2em] text-white/40">
          {countLabel}
        </span>
      </div>

      {/* Masonry grid */}
      <div className="mt-8 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {visible.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i, 12) * 0.03 }}
            onClick={() => setActive(i)}
            aria-label={`${dict.gallery.lightbox.open}: ${p.alt}`}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-night-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lava-400 md:mb-4"
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-xs font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              {p.alt}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && visible[active] && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={visible[active].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-night-950/95 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label={dict.gallery.lightbox.close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={dict.gallery.lightbox.prev}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={dict.gallery.lightbox.next}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={visible[active].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92svh] w-full max-w-6xl flex-col items-center px-14 sm:px-20"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-white/10"
                style={{
                  aspectRatio: `${visible[active].w} / ${visible[active].h}`,
                  maxHeight: "80svh",
                  maxWidth: `calc(80svh * ${visible[active].w} / ${visible[active].h})`,
                }}
              >
                <Image
                  src={visible[active].src}
                  alt={visible[active].alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-4 text-center text-sm text-white/80">
                <span>{visible[active].alt}</span>
                <span className="text-xs tracking-[0.2em] text-white/40">
                  {active + 1} / {visible.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
