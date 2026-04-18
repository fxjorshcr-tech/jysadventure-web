import { IMAGES } from "./images";

export type TourCategory = "base" | "combo";

export type TourVariant = {
  type: "single" | "double";
  label: string;
  price: number;
  seats: number;
  description: string;
};

export type Tour = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Extreme";
  price: number;
  minAge: number;
  minPassengerAge: number | null;
  licenseRequired: boolean;
  vehicle: "ATV" | "UTV";
  category: TourCategory;
  addon: "Cabalgata" | "Canopy" | null;
  variants?: TourVariant[];
  highlights: string[];
  includes: string[];
  image: string;
};

export const TOURS: Tour[] = [
  {
    slug: "atv",
    title: "ATV Adventure",
    tagline: "Solo rider or 2-up. You pick.",
    description:
      "Our flagship off-road ride through Guanacaste rainforest, river crossings and hidden trails. Available as Single (one pilot per quad, for pure solo control) or Double (driver + one passenger from 5+ years old, for couples, parents with a teen or friends who want to ride together).",
    duration: "2 hours",
    difficulty: "Moderate",
    price: 95,
    minAge: 18,
    minPassengerAge: 5,
    licenseRequired: true,
    vehicle: "ATV",
    category: "base",
    addon: null,
    variants: [
      {
        type: "single",
        label: "ATV Single",
        price: 95,
        seats: 1,
        description: "One rider, one quad. Full control, full throttle.",
      },
      {
        type: "double",
        label: "ATV Double",
        price: 120,
        seats: 2,
        description: "Driver + one passenger (5+ years). Shared thrill.",
      },
    ],
    highlights: ["Jungle trails", "River crossing", "Viewpoint stop", "Mix singles & doubles in one group"],
    includes: ["Helmet & gloves", "Bilingual guide", "Fuel", "Bottled water"],
    image: IMAGES.gallery[0],
  },
  {
    slug: "utv",
    title: "UTV Side by Side",
    tagline: "The whole family in one beast.",
    description:
      "Our most family-friendly ride. Up to 4 seats in a roofed UTV with seatbelts and roll cage. Tackle the same wild trails in total comfort — ideal for small kids (2+), grandparents and anyone who wants the view without holding on.",
    duration: "2 hours",
    difficulty: "Easy",
    price: 180,
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "base",
    addon: null,
    highlights: ["Up to 4 riders", "Roll cage & seatbelts", "Family friendly", "Finca visit"],
    includes: ["Helmets for all", "Bilingual guide", "Fuel", "Bottled water"],
    image: IMAGES.gallery[4],
  },
  {
    slug: "atv-cabalgata",
    title: "ATV + Cabalgata",
    tagline: "Off-road ride paired with a horseback finca tour.",
    description:
      "Double the adventure. Start on an ATV — Single or Double — carving through the jungle, then trade handlebars for reins on a guided horseback ride across our family finca. Two classic Costa Rican experiences in a single half-day.",
    duration: "4 hours",
    difficulty: "Moderate",
    price: 145,
    minAge: 18,
    minPassengerAge: 5,
    licenseRequired: true,
    vehicle: "ATV",
    category: "combo",
    addon: "Cabalgata",
    variants: [
      {
        type: "single",
        label: "ATV Single + Cabalgata",
        price: 145,
        seats: 1,
        description: "Solo ATV + horseback tour.",
      },
      {
        type: "double",
        label: "ATV Double + Cabalgata",
        price: 175,
        seats: 2,
        description: "2-up ATV (5+ passenger) + horseback tour.",
      },
    ],
    highlights: ["ATV jungle ride", "Guided horseback", "Finca stop", "Snack break"],
    includes: ["Helmet & gloves", "Trained horses", "Bilingual guide", "Light snack"],
    image: IMAGES.gallery[1],
  },
  {
    slug: "atv-canopy",
    title: "ATV + Canopy",
    tagline: "Ride the dirt. Fly the canopy.",
    description:
      "Kick off with an ATV blast — Single or Double — through Guanacaste trails, then strap in for a zipline canopy tour soaring above the forest floor. The ultimate adrenaline combo for riders who want wheels and wings.",
    duration: "4 hours",
    difficulty: "Extreme",
    price: 155,
    minAge: 18,
    minPassengerAge: 5,
    licenseRequired: true,
    vehicle: "ATV",
    category: "combo",
    addon: "Canopy",
    variants: [
      {
        type: "single",
        label: "ATV Single + Canopy",
        price: 155,
        seats: 1,
        description: "Solo ATV + zipline canopy.",
      },
      {
        type: "double",
        label: "ATV Double + Canopy",
        price: 185,
        seats: 2,
        description: "2-up ATV (5+ passenger) + zipline canopy.",
      },
    ],
    highlights: ["ATV jungle ride", "Zipline canopy", "Treetop views", "Full harness gear"],
    includes: ["Helmet & gloves", "Canopy harness", "Bilingual guide", "Bottled water"],
    image: IMAGES.gallery[3],
  },
  {
    slug: "utv-cabalgata",
    title: "UTV + Cabalgata",
    tagline: "Family off-road + horseback finca ride.",
    description:
      "Load the whole family into the UTV for a trail adventure, then swap wheels for saddles on a relaxed guided horseback ride. The best combo for mixed-age groups who want variety without the extreme.",
    duration: "4 hours",
    difficulty: "Easy",
    price: 230,
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "combo",
    addon: "Cabalgata",
    highlights: ["Up to 4 in UTV", "Guided horseback", "Finca visit", "Snack break"],
    includes: ["Helmets for all", "Trained horses", "Bilingual guide", "Light snack"],
    image: IMAGES.gallery[7],
  },
  {
    slug: "utv-canopy",
    title: "UTV + Canopy",
    tagline: "Drive the beast. Fly the forest.",
    description:
      "Our UTV trail ride paired with a high-flying zipline canopy tour. Comfortable for kids and grandparents on the trail, thrilling for everyone in the air. Costa Rica's greatest hits in one trip.",
    duration: "4 hours",
    difficulty: "Moderate",
    price: 240,
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "combo",
    addon: "Canopy",
    highlights: ["Up to 4 in UTV", "Zipline canopy", "Treetop views", "Full harness gear"],
    includes: ["Helmets for all", "Canopy harness", "Bilingual guide", "Bottled water"],
    image: IMAGES.gallery[8],
  },
];

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((t) => t.slug === slug);
}

export const BASE_TOURS = TOURS.filter((t) => t.category === "base");
export const COMBO_TOURS = TOURS.filter((t) => t.category === "combo");
