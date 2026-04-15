import { IMAGES } from "./images";

export type Tour = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Extreme";
  price: number;
  minAge: number;
  vehicle: "ATV" | "UTV" | "ATV / UTV";
  highlights: string[];
  image: string;
};

export const TOURS: Tour[] = [
  {
    slug: "jungle-rush",
    title: "Jungle Rush",
    tagline: "Deep jungle trails, river crossings & hidden waterfalls",
    description:
      "Carve through dense Guanacaste rainforest, splash across crystal rivers and chase the roar of a hidden waterfall. Our most thrilling entry-level ride — pure adrenaline, zero boredom.",
    duration: "2 hours",
    difficulty: "Moderate",
    price: 95,
    minAge: 12,
    vehicle: "ATV",
    highlights: ["Jungle trails", "River crossing", "Waterfall stop", "Photo ops"],
    image: IMAGES.gallery[0],
  },
  {
    slug: "volcano-storm",
    title: "Volcano Storm",
    tagline: "Black-sand ridges with a view of Rincón de la Vieja",
    description:
      "Climb the volcanic backbone of Guanacaste. Rugged ascents, wide-open sky, sulfuric winds and a panorama of the Rincón de la Vieja volcano that will melt your SD card.",
    duration: "3 hours",
    difficulty: "Extreme",
    price: 145,
    minAge: 16,
    vehicle: "UTV",
    highlights: ["Volcano viewpoints", "Rocky ascents", "Panoramic ridge", "Pro driver optional"],
    image: IMAGES.gallery[1],
  },
  {
    slug: "sunset-beach-blast",
    title: "Sunset Beach Blast",
    tagline: "Ride the Pacific coastline as the sky turns gold",
    description:
      "Blast down empty Pacific beaches, cut through coastal forest and arrive at a secret cove for the most unreal sunset in Costa Rica. Cold drink included — memories, priceless.",
    duration: "2.5 hours",
    difficulty: "Easy",
    price: 120,
    minAge: 10,
    vehicle: "ATV / UTV",
    highlights: ["Pacific beach", "Sunset viewpoint", "Welcome drink", "Secret cove"],
    image: IMAGES.gallery[2],
  },
  {
    slug: "canyon-breaker",
    title: "Canyon Breaker",
    tagline: "Narrow canyon descents and a full-send dry riverbed",
    description:
      "Drop into a cinematic canyon full of switchbacks, tight turns and a dry riverbed straight out of a movie chase. Built for riders who want maximum throttle and zero limits.",
    duration: "3.5 hours",
    difficulty: "Extreme",
    price: 165,
    minAge: 18,
    vehicle: "UTV",
    highlights: ["Canyon descent", "Dry riverbed", "Technical turns", "GoPro footage"],
    image: IMAGES.gallery[3],
  },
  {
    slug: "family-expedition",
    title: "Family Expedition",
    tagline: "An unforgettable first off-road ride for the whole crew",
    description:
      "The perfect intro for families. Gentle trails, expert guides, quick photo stops at a local finca and lots of laughs. Side-by-side UTVs mean everyone rides together.",
    duration: "1.5 hours",
    difficulty: "Easy",
    price: 85,
    minAge: 6,
    vehicle: "UTV",
    highlights: ["Kid-friendly", "Finca visit", "Easy trails", "Group photos"],
    image: IMAGES.gallery[4],
  },
  {
    slug: "night-predator",
    title: "Night Predator",
    tagline: "Headlight-only jungle ride under a Guanacaste sky",
    description:
      "When the sun drops, the jungle wakes up. Follow your headlights through glowing trails, listen to howler monkeys and feel the pulse of a Costa Rica you've never seen before.",
    duration: "2 hours",
    difficulty: "Moderate",
    price: 135,
    minAge: 14,
    vehicle: "ATV",
    highlights: ["Night ride", "Wildlife sounds", "Stargazing stop", "Hot chocolate"],
    image: IMAGES.gallery[5],
  },
];
