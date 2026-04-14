import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-night-950 font-sans text-white antialiased">
        <Header />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
