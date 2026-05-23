/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mmlbslwljvmscbgsqkkq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
