"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the animation features the site uses (animate, exit,
 * whileInView…) instead of the full framer-motion runtime. Components must
 * use `m.*` instead of `motion.*`; `strict` throws if one slips through.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
