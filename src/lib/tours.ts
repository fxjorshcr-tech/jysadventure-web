import { IMAGES } from "./images";

export type TourCategory = "base" | "combo";

export type TourVariant = {
  type: "single" | "double";
  label: string;
  price: number;
  seats: number;
  description: string;
};

/**
 * Tier price for UTV combos where the per-UTV price depends on how many
 * riders are in that UTV (e.g. Skyline: x2 $556, x3 $667, x4 $779).
 */
export type UtvRiderTier = {
  riders: number;
  price: number;
};

export type CanopyOperator = {
  slug: string;
  name: string;
  recommendedZone: string;
  description: string;
  /** If set, overrides the global SCHEDULE.departures for this operator. */
  departures?: string[];
  scheduleNote?: string;
  /** Free pickup zones included with this operator (no extra transport cost). */
  freePickupZones?: string[];
  /** Other zones available for pickup with this operator at a flat surcharge. */
  paidPickupZones?: string[];
  /** Flat surcharge for any zone listed in `paidPickupZones`. */
  extraPickupSurcharge?: number;
  pickupNote?: string;
  /** Override variant prices (ATV combos: single / double per quad). */
  variantPrices?: { single?: number; double?: number };
  /** Per-UTV tier price by rider count (UTV combos). */
  utvTierPrices?: UtvRiderTier[];
  /** Override the per-UTV max seats when this operator is selected. */
  utvMaxSeats?: number;
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
    departures: ["8:00 AM", "11:00 AM"],
    scheduleNote:
      "Skyline runs two daily slots only. Hotel pickup is roughly one hour before your departure time.",
    freePickupZones: [
      "Playa Langosta",
      "Tamarindo",
      "Conchal",
      "Playa Grande",
      "Brasilito",
      "Flamingo",
      "Potrero",
    ],
    paidPickupZones: [
      "Hotel RIU",
      "El Coco",
      "Playa Hermosa",
      "Playa Panamá",
      "Andaz Papagayo",
      "Planet Hollywood",
      "Four Seasons",
      "Hotel Ritz",
    ],
    extraPickupSurcharge: 150,
    pickupNote:
      "Free round-trip transport from Langosta, Tamarindo, Conchal, Playa Grande, Brasilito, Flamingo and Potrero. From any other pickup zone (RIU, El Coco, Playa Hermosa, Playa Panamá, Andaz Papagayo, Planet Hollywood, Four Seasons, Hotel Ritz) add a flat $150 extra. Pickup ~1 hour before departure.",
    variantPrices: { single: 183, double: 264 },
    utvTierPrices: [
      { riders: 2, price: 556 },
      { riders: 3, price: 667 },
      { riders: 4, price: 779 },
    ],
    utvMaxSeats: 4,
  },
];

export type Tour = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** SEO-focused short description for <meta name="description">. */
  metaDescription: string;
  /** SEO keywords for this specific tour. */
  keywords: string[];
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
    slug: "atv-tour-guanacaste",
    title: "ATV Adventure",
    tagline: "Solo rider or 2-up. You pick.",
    description:
      "Our flagship off-road ride through Guanacaste rainforest, river crossings and hidden trails. Available as Single (one pilot per quad, for pure solo control) or Double (driver + one passenger from 5+ years old, for couples, parents with a teen or friends who want to ride together).",
    metaDescription:
      "ATV tour in Guanacaste, Costa Rica — solo Single or 2-up Double quads through jungle trails, river crossings and hidden viewpoints with JYS Adventure.",
    keywords: [
      "ATV tour Guanacaste",
      "ATV tour Costa Rica",
      "quad tour Guanacaste",
      "ATV Sardinal",
      "ATV Playa Hermosa",
    ],
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
    slug: "utv-tour-guanacaste",
    title: "UTV Side by Side",
    tagline: "The whole crew in one beast.",
    description:
      "Our most family-friendly ride. Up to 5 riders in a roofed UTV with seatbelts and roll cage. Tackle the same wild trails in total comfort — ideal for small kids (2+), grandparents and anyone who wants the view without holding on.",
    metaDescription:
      "UTV side-by-side tour in Guanacaste, Costa Rica — up to 5 riders per vehicle through jungle trails. Family-friendly, kids 2+ welcome.",
    keywords: [
      "UTV tour Guanacaste",
      "UTV side by side Costa Rica",
      "family UTV tour Guanacaste",
      "buggy tour Costa Rica",
    ],
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
    slug: "atv-horseback-tour-guanacaste",
    title: "ATV + Cabalgata",
    tagline: "Off-road ride paired with a horseback finca tour.",
    description:
      "Double the adventure. Start on an ATV — Single or Double — carving through the jungle, then trade handlebars for reins on a guided horseback ride across our family finca. Two classic Costa Rican experiences in a single half-day.",
    metaDescription:
      "ATV plus horseback (cabalgata) combo tour in Guanacaste, Costa Rica. Off-road quad ride and a guided finca horseback experience in one half-day.",
    keywords: [
      "ATV horseback tour Guanacaste",
      "ATV cabalgata Costa Rica",
      "ATV and horseback combo Guanacaste",
      "finca tour Costa Rica",
    ],
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
    slug: "atv-canopy-zipline-tour-guanacaste",
    title: "ATV + Canopy",
    tagline: "Ride the dirt. Fly the canopy.",
    description:
      "Kick off with an ATV blast — Single or Double — through Guanacaste trails, then strap in for a zipline canopy tour soaring above the forest floor. Choose Congo Trail (closest to Playa Hermosa / El Coco) or Skyline (recommended if you're coming from Tamarindo or Flamingo).",
    metaDescription:
      "ATV plus canopy zipline combo in Guanacaste, Costa Rica. Off-road quad ride paired with a treetop zipline tour. Choose Congo Trail or Skyline.",
    keywords: [
      "ATV canopy tour Guanacaste",
      "ATV zipline Costa Rica",
      "ATV Skyline canopy",
      "ATV Congo Trail",
      "canopy zipline Guanacaste",
    ],
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
    slug: "utv-horseback-tour-guanacaste",
    title: "UTV + Cabalgata",
    tagline: "Family off-road + horseback finca ride.",
    description:
      "Load the whole crew into the UTV for a trail adventure, then swap wheels for saddles on a relaxed guided horseback ride. The best combo for mixed-age groups who want variety without the extreme. UTV covers the vehicle (up to 5 riders) and each rider adds the horseback portion per person.",
    metaDescription:
      "UTV plus horseback (cabalgata) combo tour in Guanacaste, Costa Rica. Family-friendly side-by-side trail ride paired with a finca horseback tour.",
    keywords: [
      "UTV horseback tour Guanacaste",
      "UTV cabalgata Costa Rica",
      "family UTV horseback combo",
      "Guanacaste finca horseback",
    ],
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
    slug: "utv-canopy-zipline-tour-guanacaste",
    title: "UTV + Canopy",
    tagline: "Drive the beast. Fly the forest.",
    description:
      "Our UTV trail ride paired with a high-flying zipline canopy tour. Comfortable for kids and grandparents on the trail, thrilling for everyone in the air. Choose Congo Trail (closest to Playa Hermosa / El Coco) or Skyline (recommended if you're coming from Tamarindo or Flamingo). UTV covers the vehicle (up to 5 riders) and each rider adds the canopy portion per person.",
    metaDescription:
      "UTV plus canopy zipline combo tour in Guanacaste, Costa Rica. Family-friendly UTV trail ride with a treetop zipline tour. Congo Trail or Skyline.",
    keywords: [
      "UTV canopy tour Guanacaste",
      "UTV zipline Costa Rica",
      "UTV Skyline canopy combo",
      "UTV Congo Trail",
      "family canopy tour Guanacaste",
    ],
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

/**
 * Distribute `riders` evenly across `utvs` UTVs, larger UTVs first.
 * e.g. distributeRiders(7, 2) -> [4, 3]
 */
export function distributeRiders(riders: number, utvs: number): number[] {
  if (utvs <= 0) return [];
  const base = Math.floor(riders / utvs);
  const extra = riders % utvs;
  return Array.from({ length: utvs }, (_, i) => base + (i < extra ? 1 : 0));
}

/**
 * Compute the total price for a UTV combo tour using operator-specific tier
 * pricing. Returns null if any UTV's rider count falls outside the tier range.
 */
export function computeUtvTierTotal(
  riders: number,
  utvs: number,
  tiers: UtvRiderTier[],
): number | null {
  const distribution = distributeRiders(riders, utvs);
  let total = 0;
  for (const utvRiders of distribution) {
    const tier = tiers.find((t) => t.riders === utvRiders);
    if (!tier) return null;
    total += tier.price;
  }
  return total;
}
