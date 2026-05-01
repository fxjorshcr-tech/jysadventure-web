import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, GA_ID } from "@/lib/info";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";

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
    "ATV and UTV off-road adventures through the trails, rivers and Pacific beaches of Guanacaste, Costa Rica with JYS Adventure Tour.",
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
      "Off-road ATV and UTV tours through the trails, rivers and Pacific beaches of Guanacaste, Costa Rica.",
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
  other: {
    google: "notranslate",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0f0a",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return (
    <html
      lang={locale}
      translate="no"
      className={`${lexend.variable} notranslate`}
    >
      <head>
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content={locale} />
      </head>
      <body className="min-h-[100dvh] w-full overflow-x-hidden bg-night-950 font-sans text-white antialiased">
        <Header locale={locale} dict={dict} />
        <main className="relative w-full overflow-x-hidden">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
