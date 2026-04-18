import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialRail } from "@/components/SocialRail";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JYS Adventure Tour — ATV & UTV Tours in Guanacaste, Costa Rica",
  description:
    "Unleash the wild side of Guanacaste with JYS Adventure Tour. Off-road ATV and UTV tours through jungle trails, volcanoes, rivers and Pacific beaches in Costa Rica.",
  keywords: [
    "ATV tour Costa Rica",
    "UTV tour Guanacaste",
    "off-road Costa Rica",
    "JYS Adventure",
    "Rincón de la Vieja tours",
  ],
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
