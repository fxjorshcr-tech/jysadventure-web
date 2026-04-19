"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

type Review = {
  name: string;
  from: string;
  tour: string;
  avatar: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Sarah Kennedy",
    from: "Toronto, Canada",
    tour: "Jungle Rush",
    avatar: "SK",
    text: "Hands down the best day of our entire Costa Rica trip. The jungle trail, the river crossing, the waterfall stop — it felt like a scene out of a movie. Our guide Javier was a rockstar. Already planning to come back next year with more friends!",
  },
  {
    name: "Marcus Thiemann",
    from: "Berlin, Germany",
    tour: "Volcano Storm",
    avatar: "MT",
    text: "I've done ATV tours in four countries. Nothing comes close to this. Brand new machines, zero corporate vibes, just pure passion for the trails. The volcano ridge ride was next-level. Five stars doesn't do it justice.",
  },
  {
    name: "Luis & Marta R.",
    from: "Austin, USA",
    tour: "Family Expedition",
    avatar: "LR",
    text: "We brought our 9-year-old daughter. I was nervous at first but the JYS crew made her feel like a little champion. She hasn't stopped talking about it since. Safe, fun, beautiful — and the photos the guide took are incredible.",
  },
  {
    name: "Chloé Dubois",
    from: "Lyon, France",
    tour: "Sunset Beach Blast",
    avatar: "CD",
    text: "Riding a UTV straight onto a deserted Pacific beach as the sun was setting? Absolutely unreal. My boyfriend proposed on this tour and the JYS team made the moment magical. Forever grateful to these guys.",
  },
  {
    name: "Jake Morrison",
    from: "Melbourne, Australia",
    tour: "Canyon Breaker",
    avatar: "JM",
    text: "If you want adrenaline, this is THE tour. The canyon descent had me laughing and screaming the whole time. Super professional safety briefing but zero handholding once you're on the trail. Exactly what I wanted.",
  },
  {
    name: "Priya Nair",
    from: "London, UK",
    tour: "Night Predator",
    avatar: "PN",
    text: "The night ride blew my mind. Howler monkeys in the distance, headlights carving through the jungle, and a hot chocolate stop under the stars. A completely different side of Costa Rica that most tourists never see.",
  },
  {
    name: "Diego Fernández",
    from: "Madrid, Spain",
    tour: "Jungle Rush",
    avatar: "DF",
    text: "Organización impecable (you'd say 'flawless'). English-speaking guides, everything on time, and the route was spectacular. Coming from someone who travels a lot, JYS is the real deal. Highly recommended.",
  },
  {
    name: "Emily & Jordan",
    from: "Denver, USA",
    tour: "Volcano Storm",
    avatar: "EJ",
    text: "Booked a private tour for our honeymoon and it was the highlight of the whole trip. The owners treat you like family and the trails are unreal. We left with muddy faces, full hearts and a camera full of memories.",
  },
];

export function TestimonialsCarousel() {
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
      {/* Card */}
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
                &ldquo;{review.text}&rdquo;
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
                    {review.from} · rode {review.tour}
                  </div>
                </div>
                <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 md:inline-flex">
                  Verified Rider
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous review"
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
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-10 bg-lava-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next review"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-lava-400 hover:bg-lava-500/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
