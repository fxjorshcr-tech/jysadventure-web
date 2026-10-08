"use client";

import Script from "next/script";

/**
 * Google Analytics 4, loaded after the page is interactive so it never
 * competes with the hero image or hydration. Google Signals and ad
 * personalization are off: that is what pulls doubleclick.net into the
 * page and sets dozens of third-party cookies.
 */
export function Analytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        id="ga-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('set', 'allow_google_signals', false);
gtag('set', 'allow_ad_personalization_signals', false);
gtag('config', '${gaId}', { anonymize_ip: true });`,
        }}
      />
      <Script
        id="ga-src"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  );
}
