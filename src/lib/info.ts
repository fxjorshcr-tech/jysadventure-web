import type { Bilingual } from "@/i18n/text";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jysadventuretour.com";

export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-JP9HL4ZB7P";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/jysadventuretour/",
  facebook: "https://www.facebook.com/profile.php?id=61570254192510",
  tripadvisor: "https://www.tripadvisor.com/Profile/JYSAdventuretours",
  google: "https://share.google/7LIO8qkavRpwe1nXn",
  whatsapp: "#",
};

export const CONTACT = {
  phone: "+506 8575-7272",
  phoneE164: "+50685757272",
  email: "reservations@jysadventuretour.com",
  location: "Sardinal, Guanacaste · Costa Rica",
};

export const SCHEDULE = {
  departures: ["8:00 AM", "11:00 AM", "2:00 PM"],
  note: {
    en: "Flexible scheduling — ask us about other start times.",
    es: "Horarios flexibles — pregúntanos por otros horarios.",
  } satisfies Bilingual,
};

export type TransportZone = {
  slug: string;
  name: string;
  basePrice: number;
  extraPerPerson: number;
  note?: Bilingual;
};

/**
 * IVA: tour prices already include tax. Transport rates below ARE FINAL —
 * the 13% IVA has been baked into both basePrice and extraPerPerson, so the
 * booking total can simply add transportSubtotal without further math.
 */
export const TRANSPORT_ZONES: TransportZone[] = [
  {
    slug: "riu",
    name: "Hotel RIU",
    basePrice: 0,
    extraPerPerson: 0,
    note: {
      en: "Complimentary round-trip transport.",
      es: "Transporte ida y vuelta cortesía.",
    },
  },
  // 60 + 13% = 67.80 → 68; 10 + 13% = 11.30 → 11
  { slug: "el-coco", name: "El Coco", basePrice: 68, extraPerPerson: 11 },
  { slug: "playa-hermosa", name: "Playa Hermosa", basePrice: 68, extraPerPerson: 11 },
  { slug: "playa-panama", name: "Playa Panamá", basePrice: 68, extraPerPerson: 11 },
  // 130 + 13% = 146.90 → 147; 15 + 13% = 16.95 → 17
  { slug: "andaz", name: "Andaz Papagayo", basePrice: 147, extraPerPerson: 17 },
  { slug: "planet-hollywood", name: "Planet Hollywood", basePrice: 147, extraPerPerson: 17 },
  // 150 + 13% = 169.50 → 170
  { slug: "four-seasons", name: "Four Seasons", basePrice: 170, extraPerPerson: 17 },
  { slug: "ritz", name: "Hotel Ritz", basePrice: 170, extraPerPerson: 17 },
];

export const TRANSPORT_INFO = {
  includedPassengers: 5,
  /**
   * Whether the listed transport prices already include the 13% IVA.
   * Tour prices include tax; transport rates above were updated to bake the
   * 13% in so the same is now true for transport. The UI uses this to label
   * the price breakdown ("13% IVA included") instead of adding it on top.
   */
  transportTaxIncluded: true,
};

export type SeasonalRoute = {
  season: "Year-round";
  months: Bilingual;
  title: Bilingual;
  description: Bilingual;
};

/**
 * One single route, adapted by the guides depending on the season's terrain
 * and weather. Kept as an array so existing UI that maps over it still works.
 */
export const SEASONAL_ROUTES: SeasonalRoute[] = [
  {
    season: "Year-round",
    months: { en: "Year-round", es: "Todo el año" },
    title: {
      en: "Our Guanacaste route",
      es: "Nuestra ruta por Guanacaste",
    },
    description: {
      en: "A single route through the trails, rivers and villages of Guanacaste — adapted by our guides depending on the season's terrain and weather.",
      es: "Una ruta única por los caminos, ríos y pueblos de Guanacaste — adaptada por nuestros guías según el terreno y clima de la temporada.",
    },
  },
];

export type AddOn = {
  slug: string;
  name: Bilingual;
  price: number;
  description: Bilingual;
};

export const ADD_ONS: AddOn[] = [
  {
    slug: "bandana",
    name: { en: "Bandana", es: "Bandana" },
    price: 10,
    description: {
      en: "Add a JYS bandana for dust protection and a souvenir to take home.",
      es: "Agrega una bandana JYS para protección contra el polvo y un recuerdo del tour.",
    },
  },
];

export const INCLUSIONS: {
  safety: Bilingual[];
  accessibility: Bilingual[];
} = {
  safety: [
    { en: "Helmet", es: "Casco" },
    { en: "Goggles", es: "Goggles" },
    { en: "Bottled water", es: "Agua embotellada" },
  ],
  accessibility: [
    {
      en: "Baby seats available on request.",
      es: "Sillas de bebé disponibles bajo pedido.",
    },
    {
      en: "Riders with mobility needs are welcome — they can travel either in the front or in the rear of the UTV. Contact us before booking so we can arrange the best setup for the group.",
      es: "Personas con movilidad reducida son bienvenidas — pueden ir adelante o atrás en el UTV. Contáctennos antes de reservar para coordinar la mejor opción del grupo.",
    },
  ],
};
