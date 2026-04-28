import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialRail } from "@/components/SocialRail";
import { SITE_URL } from "@/lib/info";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JYS Adventure Tour — ATV & UTV Tours in Guanacaste, Costa Rica",
    template: "%s — JYS Adventure Tour",
  },
  description:
    "Unleash the wild side of Guanacaste with JYS Adventure Tour. Off-road ATV and UTV tours through jungle trails, volcanoes, rivers and Pacific beaches in Costa Rica.",
  keywords: [
    "ATV tour Costa Rica",
    "ATV tour Guanacaste",
    "UTV tour Guanacaste",
    "UTV side by side Costa Rica",
    "off-road Costa Rica",
    "ATV canopy zipline Guanacaste",
    "ATV horseback Guanacaste",
    "JYS Adventure",
  ],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JYS Adventure Tour — ATV & UTV Tours in Guanacaste, Costa Rica",
    description:
      "Off-road ATV and UTV tours through jungle trails, volcanoes, rivers and Pacific beaches in Guanacaste, Costa Rica.",
    type: "website",
    locale: "en_US",
    siteName: "JYS Adventure Tour",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "JYS Adventure Tour — ATV & UTV Tours in Guanacaste, Costa Rica",
    description:
      "Off-road ATV and UTV tours through Guanacaste, Costa Rica.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0f0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="min-h-[100dvh] w-full overflow-x-hidden bg-night-950 font-sans text-white antialiased">
        <Header />
        <main className="relative w-full overflow-x-hidden">{children}</main>
        <SocialRail />
        <Footer />
      </body>
    </html>
  );
}
