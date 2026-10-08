/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Photos live in Supabase storage as full-size JPEG/PNG served with
    // `cache-control: no-cache`. Letting Next/Vercel optimize them resizes
    // each one to the rendered width, converts to AVIF/WebP and caches the
    // result for a year — roughly 5 MB → <1 MB on the home page.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Fewer breakpoints = fewer transformations on Vercel's quota.
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [96, 192, 256, 384],
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mmlbslwljvmscbgsqkkq.supabase.co",
        pathname: "/storage/v1/object/public/jys/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Pages are rendered per request (locale cookie), so Next marks them
        // `no-store`, which blocks the browser back/forward cache. `no-cache`
        // keeps the same freshness guarantee without disabling bfcache.
        source: "/((?!api/|_next/).*)",
        headers: [
          { key: "Cache-Control", value: "private, no-cache, max-age=0, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
