import { SITE_URL, CONTACT, SOCIAL_LINKS } from "@/lib/info";
import { IMAGES } from "@/lib/images";
import { REVIEWS, REVIEW_STATS } from "@/lib/reviews";
import type { LocalizedTour } from "@/lib/tours";
import type { LocalizedBlogPost } from "@/lib/blog";
import type { LocalizedFaqGroup } from "@/lib/faqs";
import type { Locale } from "@/i18n/config";
import type { Bilingual } from "@/i18n/text";
import { t } from "@/i18n/text";

/**
 * Stable @id anchors so nodes across the site (and across pages) can reference
 * the same Organization / WebSite without duplicating their full definition.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Approximate coordinates of the base in Sardinal, Carrillo, Guanacaste. */
const GEO = { latitude: 10.5163, longitude: -85.6389 };

const ORG_DESCRIPTION: Bilingual = {
  en: "Family-run ATV and UTV off-road tour operator based in Sardinal, Guanacaste, Costa Rica. Guided rides through jungle trails, river crossings and Pacific-coast farmland, plus combo tours with horseback (cabalgata) and zipline canopy.",
  es: "Operador familiar de tours todoterreno en ATV y UTV con base en Sardinal, Guanacaste, Costa Rica. Recorridos guiados por rutas selváticas, cruces de río y fincas de la costa Pacífica, más combos con cabalgata y canopy.",
};

const AREA_SERVED = [
  "Guanacaste",
  "Sardinal",
  "Playa Hermosa",
  "Playas del Coco",
  "Playa Panamá",
  "Papagayo",
  "Tamarindo",
  "Flamingo",
  "Playa Conchal",
  "Costa Rica",
];

const DAYS = [
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
  "https://schema.org/Saturday",
  "https://schema.org/Sunday",
];

function inLanguage(locale: Locale): string {
  return locale === "es" ? "es-CR" : "en-US";
}

function sameAs(): string[] {
  return [
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.tripadvisor,
    SOCIAL_LINKS.google,
  ].filter((u) => u && u !== "#");
}

/** LocalBusiness / TravelAgency node — the site's primary entity. */
export function organizationNode(locale: Locale) {
  return {
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": ORG_ID,
    name: "JYS Adventure Tour",
    alternateName: "JYS Adventure Tours",
    url: SITE_URL,
    description: t(ORG_DESCRIPTION, locale),
    logo: { "@type": "ImageObject", url: IMAGES.logo },
    image: [IMAGES.hero, IMAGES.heroAlt],
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sardinal",
      addressRegion: "Guanacaste",
      addressCountry: "CR",
    },
    geo: { "@type": "GeoCoordinates", ...GEO },
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Place", name })),
    sameAs: sameAs(),
    priceRange: "$$",
    currenciesAccepted: "USD, CRC",
    paymentAccepted: "Cash, Visa, Mastercard",
    knowsLanguage: ["en", "es"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS,
        opens: "08:00",
        closes: "16:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEW_STATS.ratingValue,
      bestRating: REVIEW_STATS.bestRating,
      worstRating: REVIEW_STATS.worstRating,
      reviewCount: REVIEW_STATS.reviewCount,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t(r.text, locale),
    })),
  };
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "JYS Adventure Tour",
    description: t(ORG_DESCRIPTION, locale),
    inLanguage: inLanguage(locale),
    publisher: { "@id": ORG_ID },
  };
}

/** Organization + WebSite — emitted site-wide from the root layout. */
export function siteGraph(locale: Locale) {
  return [organizationNode(locale), websiteNode(locale)];
}

type Crumb = { name: string; url: string };

export function breadcrumbNode(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Product node for a single tour, with price/offer data. */
export function tourProductNode(tour: LocalizedTour) {
  const prices = tour.variants?.length
    ? tour.variants.map((v) => v.price)
    : [tour.price];
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const bookUrl = `${SITE_URL}/tours/${tour.slug}/book`;

  const offers =
    low === high
      ? {
          "@type": "Offer",
          price: low,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: bookUrl,
          seller: { "@id": ORG_ID },
        }
      : {
          "@type": "AggregateOffer",
          lowPrice: low,
          highPrice: high,
          priceCurrency: "USD",
          offerCount: prices.length,
          availability: "https://schema.org/InStock",
          url: bookUrl,
          seller: { "@id": ORG_ID },
        };

  return {
    "@type": "Product",
    "@id": `${SITE_URL}/tours/${tour.slug}#product`,
    name: tour.title,
    description: tour.metaDescription,
    image: [tour.image],
    url: `${SITE_URL}/tours/${tour.slug}`,
    brand: { "@id": ORG_ID },
    category: tour.category === "combo" ? "Combo Adventure Tour" : "Adventure Tour",
    additionalType: "https://schema.org/TouristTrip",
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: tour.minPassengerAge ?? tour.minAge,
    },
    offers,
  };
}

export function faqPageNode(groups: LocalizedFaqGroup[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faqs#faq`,
    mainEntity: groups
      .flatMap((g) => g.items)
      .map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
  };
}

export function blogPostingNode(post: LocalizedBlogPost, locale: Locale) {
  const body = [
    post.intro,
    ...post.sections.map((s) => (s.heading ? `${s.heading}. ${s.body}` : s.body)),
    post.closing,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: inLanguage(locale),
    keywords: post.keywords.join(", "),
    articleSection: post.tag,
    articleBody: body,
  };
}

export function tourListNode(tours: LocalizedTour[], name: string) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/tours#tours`,
    name,
    numberOfItems: tours.length,
    itemListElement: tours.map((tr, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/tours/${tr.slug}`,
      name: tr.title,
    })),
  };
}

/** Localized breadcrumb labels for the top-level sections. */
export const CRUMB_LABELS = {
  home: { en: "Home", es: "Inicio" },
  tours: { en: "Tours", es: "Tours" },
  blog: { en: "Blog", es: "Blog" },
  faqs: { en: "FAQs", es: "Preguntas frecuentes" },
  about: { en: "About", es: "Nosotros" },
  contact: { en: "Contact", es: "Contacto" },
} satisfies Record<string, Bilingual>;
