import type { Bilingual } from "@/i18n/text";

export type Review = {
  name: string;
  from: string;
  avatar: string;
  text: Bilingual;
};

/**
 * Real guest reviews shown in the testimonials carousel on the home page.
 * These are the same reviews surfaced to structured data (schema.org Review +
 * AggregateRating) so the rating we mark up is always backed by content that is
 * actually visible on the site.
 */
export const REVIEWS: Review[] = [
  {
    name: "Eva María Chamorro Rivero",
    from: "Local Guide · 16 reviews",
    avatar: "EM",
    text: {
      en: "If you come to Costa Rica, you can't miss this unique and super fun experience. Our guide was very professional and attentive — he took us through incredible, hidden spots in Costa Rica. A ten out of ten for this team!",
      es: "Si vienes a Costa Rica no te puedes perder esta experiencia única y super divertida. El guía que nos tocó muy profesional y atento con nosotros, nos llevó por lugares increíbles y escondidos de Costa Rica… ¡Un diez para este pedazo de equipo!",
    },
  },
  {
    name: "Amanda M.",
    from: "3 reviews",
    avatar: "AM",
    text: {
      en: "Our tour guide Adrian was fantastic and we had a blast through the country of Costa Rica and enjoying the waterfall!",
      es: "Nuestro guía Adrián fue fantástico, ¡la pasamos increíble recorriendo Costa Rica y disfrutando la cascada!",
    },
  },
  {
    name: "Eric",
    from: "2 reviews",
    avatar: "ER",
    text: {
      en: "Adrian was an excellent tour guide, highly recommend this tour company for any family looking for a great adventure!",
      es: "Adrián fue un excelente guía, ¡recomiendo mucho esta compañía para cualquier familia que busque una gran aventura!",
    },
  },
];

export const REVIEW_STATS = {
  ratingValue: 5,
  bestRating: 5,
  worstRating: 1,
  reviewCount: REVIEWS.length,
};
