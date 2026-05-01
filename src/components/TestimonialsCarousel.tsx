"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Review = {
  name: string;
  from: string;
  avatar: string;
  text: { en: string; es: string };
};

const REVIEWS: Review[] = [
  {
    name: "Eva María Chamorro Rivero",
    from: "Local Guide · 16 reviews",
    avatar: "EM",
    text: {
      en: "If you come to Costa Rica, you can't miss this unique and super fun experience. Our guide was very professional and attentive — he took us through incredible, hidden spots in Costa Rica. A ten out of ten for this team!",
      es: "Si vienes a Costa Rica no te puedes perder esta experiencia única y super divertida. El guía que nos tocó muy profesional y atento con nosotros, nos llevó por lugares increíbles y escondidos de Costa Rica… ¡Un diez para este pedazo de equipo!",
    },
  },
  {
    name: "Amanda M.",
    from: "3 reviews",
    avatar: "AM",
    text: {
      en: "Our tour guide Adrian was fantastic and we had a blast through the country of Costa Rica and enjoying the waterfall!",
      es: "Nuestro guía Adrián fue fantástico, ¡la pasamos increíble recorriendo Costa Rica y disfrutando la cascada!",
    },
  },
  {
    name: "Eric",
    from: "2 reviews",
    avatar: "ER",
    text: {
      en: "Adrian was an excellent tour guide, highly recommend this tour company for any family looking for a great adventure!",
      es: "Adrián fue un excelente guía, ¡recomiendo mucho esta compañía para cualquier familia que busque una gran aventura!",
    },
  },
];

export function TestimonialsCarousel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % REVIEWS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const review = REVIEWS[index];

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 via-night-950 to-night-900 p-6 sm:p-8 md:p-14">
          <Quote className="absolute -right-2 -top-2 h-20 w-20 text-lava-500/10 sm:-right-4 sm:-top-4 sm:h-28 sm:w-28 md:h-40 md:w-40" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <div className="flex gap-0.5 text-lava-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-lava-400" />
                ))}
              </div>

              <p className="mt-5 font-display text-xl leading-snug tracking-wide text-white sm:mt-6 sm:text-2xl md:text-4xl">
                &ldquo;{review.text[locale]}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 sm:mt-8 sm:gap-4 sm:pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lava-500 to-lava-700 font-display text-base tracking-wider text-white sm:h-14 sm:w-14 sm:text-xl">
                  {review.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-lg tracking-wide text-white sm:text-2xl">
                    {review.name}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                    {review.from}
                  </div>
                </div>
                <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 md:inline-flex">
                  {dict.home.testimonials.verifiedRider}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label={dict.home.testimonials.previousReview}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-lava-400 hover:bg-lava-500/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={dict.home.testimonials.goToReview.replace(
                  "{n}",
                  String(i + 1),
                )}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-10 bg-lava-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label={dict.home.testimonials.nextReview}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-lava-400 hover:bg-lava-500/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
