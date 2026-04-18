import { IMAGES } from "./images";

export type TourCategory = "base" | "combo";

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
  vehicle: "ATV" | "UTV" | "ATV / UTV";
  category: TourCategory;
  addon: "Cabalgata" | "Canopy" | null;
  highlights: string[];
  includes: string[];
  image: string;
};

export const TOURS: Tour[] = [
  {
    slug: "atv-single",
    title: "ATV Single",
    tagline: "Solo rider. One ATV. Pure jungle adrenaline.",
    description:
      "Our flagship ATV ride for solo pilots. Command your own quad through Guanacaste rainforest, splash across crystal rivers and rip along hidden backcountry trails. Bilingual guide leads the way, you set the pace.",
    duration: "2 hours",
    difficulty: "Moderate",
    price: 95,
    minAge: 18,
    minPassengerAge: null,
    licenseRequired: true,
    vehicle: "ATV",
    category: "base",
    addon: null,
    highlights: ["Jungle trails", "River crossing", "Viewpoint stop", "Photo ops"],
    includes: ["Helmet & gloves", "Bilingual guide", "Fuel", "Bottled water"],
    image: IMAGES.gallery[0],
  },
  {
    slug: "atv-double",
    title: "ATV Double",
    tagline: "Bring a co-pilot. Share the thrill.",
    description:
      "Same raw jungle adventure as ATV Single — but built for two. One driver, one passenger on a single quad. Perfect for couples, parents with a teen, or friends who want the ride without the solo wheel.",
    duration: "2 hours",
    difficulty: "Moderate",
    price: 120,
    minAge: 18,
    minPassengerAge: 5,
    licenseRequired: true,
    vehicle: "ATV",
    category: "base",
    addon: null,
    highlights: ["2-up riding", "Jungle + river", "Kid-friendly passenger", "Group photos"],
    includes: ["2 helmets & gloves", "Bilingual guide", "Fuel", "Bottled water"],
    image: IMAGES.gallery[2],
  },
  {
    slug: "utv",
    title: "UTV Side by Side",
    tagline: "The whole family in one beast.",
    description:
      "Our most family-friendly ride. Up to 4 seats in a roofed UTV with seatbelts and roll cage. Tackle the same wild trails in total comfort — ideal for small kids, grandparents and anyone who wants the view without holding on.",
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
    slug: "atv-single-cabalgata",
    title: "ATV Single + Cabalgata",
    tagline: "Two rides, one wild afternoon.",
    description:
      "Double the adventure. Start on an ATV carving through the jungle, then trade handlebars for reins on a guided horseback ride across our family finca. Two classic Costa Rican experiences in a single half-day.",
    duration: "4 hours",
    difficulty: "Moderate",
    price: 145,
    minAge: 18,
    minPassengerAge: null,
    licenseRequired: true,
    vehicle: "ATV",
    category: "combo",
    addon: "Cabalgata",
    highlights: ["ATV jungle ride", "Guided horseback", "Finca stop", "Snack break"],
    includes: ["Helmet & gloves", "Trained horse", "Bilingual guide", "Light snack"],
    image: IMAGES.gallery[1],
  },
  {
    slug: "atv-single-canopy",
    title: "ATV Single + Canopy",
    tagline: "Ride the dirt. Fly the canopy.",
    description:
      "Kick off with a solo ATV blast through Guanacaste trails, then strap in for a zipline canopy tour soaring above the forest floor. The ultimate adrenaline combo for riders who want both wheels and wings.",
    duration: "4 hours",
    difficulty: "Extreme",
    price: 155,
    minAge: 18,
    minPassengerAge: null,
    licenseRequired: true,
    vehicle: "ATV",
    category: "combo",
    addon: "Canopy",
    highlights: ["ATV jungle ride", "Zipline canopy", "Treetop views", "Full harness gear"],
    includes: ["Helmet & gloves", "Canopy harness", "Bilingual guide", "Bottled water"],
    image: IMAGES.gallery[3],
  },
  {
    slug: "atv-double-cabalgata",
    title: "ATV Double + Cabalgata",
    tagline: "Ride two-up, then switch to horseback.",
    description:
      "Bring your co-pilot and share it all. A two-seat ATV adventure through the jungle, followed by a relaxed horseback ride across the finca. Perfect for couples or a parent + teen combo.",
    duration: "4 hours",
    difficulty: "Moderate",
    price: 175,
    minAge: 18,
    minPassengerAge: 5,
    licenseRequired: true,
    vehicle: "ATV",
    category: "combo",
    addon: "Cabalgata",
    highlights: ["2-up ATV", "Guided horseback", "Finca visit", "Snack break"],
    includes: ["2 helmets & gloves", "Trained horses", "Bilingual guide", "Light snack"],
    image: IMAGES.gallery[5],
  },
  {
    slug: "atv-double-canopy",
    title: "ATV Double + Canopy",
    tagline: "Two riders, two thrills.",
    description:
      "A two-seat ATV ride through Guanacaste trails, followed by a zipline canopy tour above the rainforest. Every thrill Costa Rica is famous for — packed into one unforgettable half-day.",
    duration: "4 hours",
    difficulty: "Extreme",
    price: 185,
    minAge: 18,
    minPassengerAge: 5,
    licenseRequired: true,
    vehicle: "ATV",
    category: "combo",
    addon: "Canopy",
    highlights: ["2-up ATV", "Zipline canopy", "Treetop views", "Group photos"],
    includes: ["2 helmets & gloves", "Canopy harness", "Bilingual guide", "Bottled water"],
    image: IMAGES.gallery[6],
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
