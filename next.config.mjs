/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel image optimization stays OFF on purpose (plan usage). Photos are
    // pre-resized once by `npm run optimize-images` into public/photos and
    // served as static files; the loader picks the right width per device.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 960, 1440],
    imageSizes: [192, 384],
  },
  async headers() {
    return [
      {
        // Pre-optimized photos never change under the same name (a replaced
        // photo gets a new key), so browsers and the CDN may keep them a year.
        source: "/photos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Pages are rendered per request (locale cookie), so Next marks them
        // `no-store`, which blocks the browser back/forward cache. `no-cache`
        // keeps the same freshness guarantee without disabling bfcache.
        source: "/((?!api/|_next/|photos/).*)",
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
