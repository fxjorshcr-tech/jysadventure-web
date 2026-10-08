"use client";

import manifest from "./photos.manifest.json";

/**
 * next/image loader for the pre-optimized photos in public/photos.
 *
 * `src` is the URL from photo(key) (…/photos/<key>-<largest>.webp). For a
 * requested width we return the smallest generated variant that is at
 * least that wide, as a same-origin path so dev and preview deployments
 * load their own copy. Unknown sources are returned untouched.
 */
const PHOTO_RE = /\/photos\/([A-Za-z0-9_]+)-\d+\.webp$/;

export default function photoLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const match = PHOTO_RE.exec(src);
  if (!match) return src;
  const key = match[1] as keyof typeof manifest;
  const entry = manifest[key];
  if (!entry) return src;
  const w = entry.widths.find((v) => v >= width) ?? entry.w;
  return `/photos/${key}-${w}.webp`;
}
