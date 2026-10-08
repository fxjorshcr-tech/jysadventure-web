/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Image optimization stays OFF on purpose: photos are served straight
    // from Supabase so they do not count against Vercel's image/bandwidth
    // usage. Do not re-enable without checking the Vercel plan first.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mmlbslwljvmscbgsqkkq.supabase.co",
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
