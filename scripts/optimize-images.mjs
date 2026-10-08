/**
 * One-off photo optimizer. Downloads every original listed in
 * scripts/photo-sources.mjs and writes resized WebP variants to
 * public/photos so the site serves small images from the CDN as static
 * files, with no image transformations on Vercel.
 *
 *   npm run optimize-images
 *
 * For each key it writes public/photos/<key>-<w>.webp, one per width in
 * WIDTHS (≤ original width), and src/lib/photos.manifest.json with the
 * widths available per key. photo(key) in src/lib/images.ts points at the
 * largest one and src/lib/image-loader.ts picks smaller ones for srcset.
 *
 * Re-running only builds keys whose files are missing; pass --force to
 * rebuild everything. The files are served with a 1-year immutable cache,
 * so to replace a photo give it a NEW key rather than reusing the old one.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { PHOTO_SOURCES } from "./photo-sources.mjs";

// Width ladder. 1440 covers a 2x phone at full width and a 50vw hero on a
// 2x desktop; the hero itself is behind dark gradients so upscaling a bit on
// very large screens is invisible, while a 1920 step doubles the payload.
const WIDTHS = [480, 960, 1440];
// Portrait photos are tall: cap the long side so a "1440" portrait is not
// 1440x2560. The file keeps the step name; the loader only cares about it.
const MAX_HEIGHT = 1800;
const QUALITY = 72;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "photos");
const manifestPath = path.join(root, "src", "lib", "photos.manifest.json");
const force = process.argv.includes("--force");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function main() {
  await mkdir(outDir, { recursive: true });
  const manifest = {};
  let before = 0;
  let after = 0;

  for (const [key, url] of Object.entries(PHOTO_SOURCES)) {
    const input = await download(url);
    before += input.length;

    const image = sharp(input, { failOn: "none" }).rotate(); // honor EXIF
    const meta = await image.metadata();
    const srcW = meta.width ?? 0;
    const srcH = meta.height ?? 0;

    // Widths to produce: every ladder step below the original, plus the
    // original width itself when it is smaller than the top step.
    const widths = WIDTHS.filter((w) => w < srcW);
    widths.push(Math.min(srcW, WIDTHS[WIDTHS.length - 1]));
    const unique = [...new Set(widths)].sort((a, b) => a - b);

    const largestFile = path.join(outDir, `${key}-${unique[unique.length - 1]}.webp`);
    const skip = !force && (await exists(largestFile));
    let keyBytes = 0;
    let mobileBytes = 0;
    for (const w of unique) {
      const file = path.join(outDir, `${key}-${w}.webp`);
      if (!skip || !(await exists(file))) {
        const buf = await image
          .clone()
          .resize({
            width: w,
            height: MAX_HEIGHT,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: QUALITY, effort: 5 })
          .toBuffer();
        await writeFile(file, buf);
        keyBytes += buf.length;
        if (w === (unique.find((v) => v >= 960) ?? unique[unique.length - 1])) {
          mobileBytes = buf.length;
        }
      }
    }
    after += mobileBytes;

    const largest = unique[unique.length - 1];
    const largestMeta = await sharp(largestFile).metadata();
    manifest[key] = {
      widths: unique,
      w: largestMeta.width ?? largest,
      h: largestMeta.height ?? Math.round((srcH * largest) / srcW),
    };
    console.log(
      `${key.padEnd(16)} ${String(srcW).padStart(5)}x${String(srcH).padEnd(5)} ` +
        `${kb(input.length).padStart(8)} → ${unique.join("/")}px` +
        (skip ? "  (kept)" : `  all ${kb(keyBytes)}, 960px ${kb(mobileBytes)}`),
    );
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nOriginals ${kb(before)} → 960px variants ${kb(after)} (what a phone downloads)`);
  console.log(`Manifest: ${path.relative(root, manifestPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
