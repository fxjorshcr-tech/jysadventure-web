import { IMAGES } from "./images";

export type TourCategory = "base" | "combo";

export type TourVariant = {
  type: "single" | "double";
  label: string;
  price: number;
  seats: number;
  description: string;
};

export type CanopyOperator = {
  slug: string;
  name: string;
  recommendedZone: string;
  description: string;
};

export const CANOPY_OPERATORS: CanopyOperator[] = [
  {
    slug: "congo-trail",
    name: "Congo Trail",
    recommendedZone: "Playa Hermosa / El Coco",
    description:
      "Closest canopy to our base — ideal for guests staying in Playa Hermosa or El Coco.",
  },
  {
    slug: "skyline",
    name: "Skyline Canopy Tour",
    recommendedZone: "Tamarindo / Flamingo",
    description:
      "Recommended for guests coming from the Tamarindo or Flamingo area.",
  },
];

export type Tour = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Extreme";
  price: number;
  /**
   * How `price` should be interpreted and totals computed.
   * - "per-variant": use `variants[i].price` * quantity (ATV Single / Double).
   * - "flat-vehicle": one flat price for the whole vehicle up to `maxSeats`.
   * - "flat-plus-per-person": flat vehicle price + `perPersonAddon` * riders.
   */
  pricingMode: "per-variant" | "flat-vehicle" | "flat-plus-per-person";
  perPersonAddon?: number;
  maxSeats?: number;
  seatingNote?: string;
  minAge: number;
  minPassengerAge: number | null;
  licenseRequired: boolean;
  vehicle: "ATV" | "UTV";
  category: TourCategory;
  addon: "Cabalgata" | "Canopy" | null;
  variants?: TourVariant[];
  canopyOperators?: CanopyOperator[];
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
    price: 105,
    pricingMode: "per-variant",
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
        price: 105,
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
    includes: ["Helmet & goggles", "Bottled water", "Bilingual guide", "Fuel"],
    image: IMAGES.gallery[0],
  },
  {
    slug: "utv",
    title: "UTV Side by Side",
    tagline: "The whole crew in one beast.",
    description:
      "Our most family-friendly ride. Up to 5 riders in a roofed UTV with seatbelts and roll cage. Tackle the same wild trails in total comfort — ideal for small kids (2+), grandparents and anyone who wants the view without holding on.",
    duration: "2 hours",
    difficulty: "Easy",
    price: 339,
    pricingMode: "flat-vehicle",
    maxSeats: 5,
    seatingNote:
      "Up to 5 riders of slim to medium build. For groups of all adults we recommend booking for 4 for extra comfort.",
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "base",
    addon: null,
    highlights: [
      "Up to 5 riders per UTV",
      "Roll cage & seatbelts",
      "Family friendly",
      "Finca visit",
    ],
    includes: ["Helmets & goggles for all", "Bottled water", "Bilingual guide", "Fuel"],
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
    price: 150,
    pricingMode: "per-variant",
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
        price: 150,
        seats: 1,
        description: "Solo ATV + horseback tour.",
      },
      {
        type: "double",
        label: "ATV Double + Cabalgata",
        price: 195,
        seats: 2,
        description: "2-up ATV (5+ passenger) + horseback tour.",
      },
    ],
    highlights: ["ATV jungle ride", "Guided horseback", "Finca stop", "Snack break"],
    includes: ["Helmet & goggles", "Trained horses", "Bilingual guide", "Light snack"],
    image: IMAGES.gallery[1],
  },
  {
    slug: "atv-canopy",
    title: "ATV + Canopy",
    tagline: "Ride the dirt. Fly the canopy.",
    description:
      "Kick off with an ATV blast — Single or Double — through Guanacaste trails, then strap in for a zipline canopy tour soaring above the forest floor. Choose Congo Trail (closest to Playa Hermosa / El Coco) or Skyline (recommended if you're coming from Tamarindo or Flamingo).",
    duration: "4 hours",
    difficulty: "Extreme",
    price: 165,
    pricingMode: "per-variant",
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
        price: 165,
        seats: 1,
        description: "Solo ATV + zipline canopy.",
      },
      {
        type: "double",
        label: "ATV Double + Canopy",
        price: 205,
        seats: 2,
        description: "2-up ATV (5+ passenger) + zipline canopy.",
      },
    ],
    canopyOperators: CANOPY_OPERATORS,
    highlights: [
      "ATV jungle ride",
      "Zipline canopy (Congo Trail or Skyline)",
      "Treetop views",
      "Full harness gear",
    ],
    includes: ["Helmet & goggles", "Canopy harness", "Bilingual guide", "Bottled water"],
    image: IMAGES.gallery[3],
  },
  {
    slug: "utv-cabalgata",
    title: "UTV + Cabalgata",
    tagline: "Family off-road + horseback finca ride.",
    description:
      "Load the whole crew into the UTV for a trail adventure, then swap wheels for saddles on a relaxed guided horseback ride. The best combo for mixed-age groups who want variety without the extreme. UTV covers the vehicle (up to 5 riders) and each rider adds the horseback portion per person.",
    duration: "4 hours",
    difficulty: "Easy",
    price: 339,
    pricingMode: "flat-plus-per-person",
    perPersonAddon: 45,
    maxSeats: 5,
    seatingNote:
      "UTV seats up to 5 riders (slim to medium build). For groups of all adults we recommend 4 for extra comfort. Horseback portion priced per person.",
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "combo",
    addon: "Cabalgata",
    highlights: [
      "Up to 5 riders in UTV",
      "Guided horseback per rider",
      "Finca visit",
      "Snack break",
    ],
    includes: ["Helmets & goggles for all", "Trained horses", "Bilingual guide", "Light snack"],
    image: IMAGES.gallery[7],
  },
  {
    slug: "utv-canopy",
    title: "UTV + Canopy",
    tagline: "Drive the beast. Fly the forest.",
    description:
      "Our UTV trail ride paired with a high-flying zipline canopy tour. Comfortable for kids and grandparents on the trail, thrilling for everyone in the air. Choose Congo Trail (closest to Playa Hermosa / El Coco) or Skyline (recommended if you're coming from Tamarindo or Flamingo). UTV covers the vehicle (up to 5 riders) and each rider adds the canopy portion per person.",
    duration: "4 hours",
    difficulty: "Moderate",
    price: 339,
    pricingMode: "flat-plus-per-person",
    perPersonAddon: 40,
    maxSeats: 5,
    seatingNote:
      "UTV seats up to 5 riders (slim to medium build). For groups of all adults we recommend 4 for extra comfort. Canopy portion priced per person.",
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "combo",
    addon: "Canopy",
    canopyOperators: CANOPY_OPERATORS,
    highlights: [
      "Up to 5 riders in UTV",
      "Zipline canopy (Congo Trail or Skyline)",
      "Treetop views",
      "Full harness gear",
    ],
    includes: ["Helmets & goggles for all", "Canopy harness", "Bilingual guide", "Bottled water"],
    image: IMAGES.gallery[8],
  },
];

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((t) => t.slug === slug);
}

export const BASE_TOURS = TOURS.filter((t) => t.category === "base");
export const COMBO_TOURS = TOURS.filter((t) => t.category === "combo");
