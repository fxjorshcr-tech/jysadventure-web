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
  email: "reservation@jysadventuretour.com",
  location: "Sardinal, Guanacaste · Costa Rica",
};

export const SCHEDULE = {
  departures: ["8:00 AM", "11:00 AM", "2:00 PM"],
  note: "Flexible scheduling — ask us about other start times.",
};

export type TransportZone = {
  slug: string;
  name: string;
  basePrice: number;
  extraPerPerson: number;
  note?: string;
};

export const TRANSPORT_ZONES: TransportZone[] = [
  {
    slug: "riu",
    name: "Hotel RIU",
    basePrice: 0,
    extraPerPerson: 0,
    note: "Complimentary round-trip transport.",
  },
  { slug: "el-coco", name: "El Coco", basePrice: 60, extraPerPerson: 10 },
  { slug: "playa-hermosa", name: "Playa Hermosa", basePrice: 60, extraPerPerson: 10 },
  { slug: "playa-panama", name: "Playa Panamá", basePrice: 60, extraPerPerson: 10 },
  { slug: "andaz", name: "Andaz Papagayo", basePrice: 130, extraPerPerson: 15 },
  { slug: "planet-hollywood", name: "Planet Hollywood", basePrice: 130, extraPerPerson: 15 },
  { slug: "four-seasons", name: "Four Seasons", basePrice: 150, extraPerPerson: 15 },
  { slug: "ritz", name: "Hotel Ritz", basePrice: 150, extraPerPerson: 15 },
];

export const TRANSPORT_INFO = {
  includedPassengers: 5,
  pricesIncludeTax: true,
};

export type SeasonalRoute = {
  season: "Winter" | "Summer";
  months: string;
  title: string;
  description: string;
};

export const SEASONAL_ROUTES: SeasonalRoute[] = [
  {
    season: "Winter",
    months: "May — November",
    title: "Las Pilas waterfall & local villages",
    description:
      "Green-season route through jungle trails to the Las Pilas waterfall, with stops in Guanacaste villages.",
  },
  {
    season: "Summer",
    months: "December — April",
    title: "Rivers & local villages",
    description:
      "Dry-season route across riverbeds and through authentic Guanacaste villages for a full cultural ride.",
  },
];

export type AddOn = {
  slug: string;
  name: string;
  price: number;
  description: string;
};

export const ADD_ONS: AddOn[] = [
  {
    slug: "bandana",
    name: "Bandana",
    price: 10,
    description: "Add a JYS bandana for dust protection and a souvenir to take home.",
  },
];

export const INCLUSIONS = {
  safety: ["Helmet", "Goggles", "Bottled water"],
  accessibility: [
    "Baby seats available on request.",
    "Wheelchair accessible — riders with mobility needs can travel in the rear of the UTV (max 2–3 passengers in this configuration).",
  ],
};
