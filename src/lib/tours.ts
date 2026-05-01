import { IMAGES } from "./images";
import { TRANSPORT_ZONES } from "./info";
import type { Bilingual } from "@/i18n/text";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/text";

export type TourCategory = "base" | "combo";

export type TourVariant = {
  type: "single" | "double";
  label: Bilingual;
  price: number;
  seats: number;
  description: Bilingual;
};

export type UtvRiderTier = {
  riders: number;
  price: number;
};

export type CanopyOperator = {
  slug: string;
  name: string;
  recommendedZone: Bilingual;
  description: Bilingual;
  departures?: string[];
  scheduleNote?: Bilingual;
  freePickupZones?: string[];
  paidPickupZones?: string[];
  extraPickupSurcharge?: number;
  pickupNote?: Bilingual;
  variantPrices?: { single?: number; double?: number };
  utvTierPrices?: UtvRiderTier[];
  utvMaxSeats?: number;
};

export const CANOPY_OPERATORS: CanopyOperator[] = [
  {
    slug: "congo-trail",
    name: "Congo Trail",
    recommendedZone: { en: "Playa Hermosa / El Coco", es: "Playa Hermosa / El Coco" },
    description: {
      en: "Closest canopy to our base — ideal for guests staying in Playa Hermosa or El Coco.",
      es: "El canopy más cercano a nuestra base — ideal para huéspedes en Playa Hermosa o El Coco.",
    },
    departures: ["8:00 AM", "11:00 AM", "2:00 PM"],
    scheduleNote: {
      en: "Three daily slots. Hotel pickup arranged ahead of your departure time.",
      es: "Tres salidas diarias. La recogida en el hotel se coordina antes de tu salida.",
    },
    pickupNote: {
      en: "Listed rates cover 1–5 riders; extra riders add a small per-person fee. We confirm exact pickup time when we reply to your booking.",
      es: "Las tarifas listadas cubren 1–5 personas; personas adicionales suman una tarifa pequeña por persona. Confirmamos la hora exacta de recogida al responder tu reserva.",
    },
  },
  {
    slug: "skyline",
    name: "Skyline Canopy Tour",
    recommendedZone: { en: "Tamarindo / Flamingo", es: "Tamarindo / Flamingo" },
    description: {
      en: "Recommended for guests coming from the Tamarindo or Flamingo area.",
      es: "Recomendado para huéspedes que vienen de la zona de Tamarindo o Flamingo.",
    },
    departures: ["8:00 AM", "11:00 AM"],
    scheduleNote: {
      en: "Skyline runs two daily slots only. Hotel pickup is roughly one hour before your departure time.",
      es: "Skyline tiene solo dos salidas diarias. La recogida en el hotel es aproximadamente una hora antes de la salida.",
    },
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
    pickupNote: {
      en: "Free round-trip transport from Langosta, Tamarindo, Conchal, Playa Grande, Brasilito, Flamingo and Potrero. From any other pickup zone (RIU, El Coco, Playa Hermosa, Playa Panamá, Andaz Papagayo, Planet Hollywood, Four Seasons, Hotel Ritz) add a flat $150 extra. Pickup ~1 hour before departure.",
      es: "Transporte ida y vuelta gratis desde Langosta, Tamarindo, Conchal, Playa Grande, Brasilito, Flamingo y Potrero. Desde cualquier otra zona (RIU, El Coco, Playa Hermosa, Playa Panamá, Andaz Papagayo, Planet Hollywood, Four Seasons, Hotel Ritz) se suman $150 fijos. Recogida ~1 hora antes de la salida.",
    },
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
  title: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  metaDescription: Bilingual;
  keywords: string[];
  duration: Bilingual;
  difficulty: "Easy" | "Moderate" | "Extreme";
  price: number;
  pricingMode: "per-variant" | "flat-vehicle" | "flat-plus-per-person";
  perPersonAddon?: number;
  maxSeats?: number;
  seatingNote?: Bilingual;
  minAge: number;
  minPassengerAge: number | null;
  licenseRequired: boolean;
  vehicle: "ATV" | "UTV";
  category: TourCategory;
  addon: "Cabalgata" | "Canopy" | null;
  variants?: TourVariant[];
  canopyOperators?: CanopyOperator[];
  highlights: Bilingual[];
  includes: Bilingual[];
  image: string;
};

const HELMET_GOGGLES: Bilingual = {
  en: "Helmet & goggles",
  es: "Casco y goggles",
};
const HELMET_GOGGLES_ALL: Bilingual = {
  en: "Helmets & goggles for all",
  es: "Cascos y goggles para todos",
};
const BOTTLED_WATER: Bilingual = {
  en: "Bottled water",
  es: "Agua embotellada",
};
const BILINGUAL_GUIDE: Bilingual = {
  en: "Bilingual guide",
  es: "Guía bilingüe",
};
const FUEL: Bilingual = { en: "Fuel", es: "Combustible" };

export const TOURS: Tour[] = [
  {
    slug: "atv-tour-guanacaste",
    title: { en: "ATV Adventure", es: "Aventura en ATV" },
    tagline: {
      en: "Solo rider or 2-up. You pick.",
      es: "Solo o de a dos. Tú eliges.",
    },
    description: {
      en: "Our flagship off-road ride through Guanacaste rainforest, river crossings and hidden trails. Available as Single (one pilot per quad, for pure solo control) or Double (driver + one passenger from 5+ years old, for couples, parents with a teen or friends who want to ride together).",
      es: "Nuestro recorrido todoterreno principal por la selva de Guanacaste, cruces de ríos y rutas escondidas. Disponible como Single (un conductor por cuadraciclo, para control total en solitario) o Double (conductor + un pasajero desde 5 años, para parejas, padres con adolescentes o amigos que quieren rodar juntos).",
    },
    metaDescription: {
      en: "ATV tour in Guanacaste, Costa Rica — solo Single or 2-up Double quads through jungle trails, river crossings and hidden viewpoints with JYS Adventure.",
      es: "Tour de ATV en Guanacaste, Costa Rica — cuadraciclos Single solo o Double de a dos por rutas selváticas, cruces de río y miradores escondidos con JYS Adventure.",
    },
    keywords: [
      "ATV tour Guanacaste",
      "ATV tour Costa Rica",
      "quad tour Guanacaste",
      "ATV Sardinal",
      "ATV Playa Hermosa",
    ],
    duration: { en: "2 hours", es: "2 horas" },
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
        label: { en: "ATV Single", es: "ATV Single" },
        price: 105,
        seats: 1,
        description: {
          en: "One rider, one quad. Full control, full throttle.",
          es: "Un conductor, un cuadraciclo. Control total, aceleración total.",
        },
      },
      {
        type: "double",
        label: { en: "ATV Double", es: "ATV Double" },
        price: 120,
        seats: 2,
        description: {
          en: "Driver + one passenger (5+ years). Shared thrill.",
          es: "Conductor + un pasajero (5+ años). Emoción compartida.",
        },
      },
    ],
    highlights: [
      { en: "Jungle trails", es: "Rutas selváticas" },
      { en: "River crossing", es: "Cruce de río" },
      { en: "Viewpoint stop", es: "Parada en mirador" },
      {
        en: "Mix singles & doubles in one group",
        es: "Mezcla singles y doubles en un mismo grupo",
      },
    ],
    includes: [HELMET_GOGGLES, BOTTLED_WATER, BILINGUAL_GUIDE, FUEL],
    image: IMAGES.gallery[0],
  },
  {
    slug: "utv-tour-guanacaste",
    title: { en: "UTV Side by Side", es: "UTV Side by Side" },
    tagline: {
      en: "The whole crew in one beast.",
      es: "Todo el grupo en una sola bestia.",
    },
    description: {
      en: "Our most family-friendly ride. Up to 5 riders in a roofed UTV with seatbelts and roll cage. Tackle the same wild trails in total comfort — ideal for small kids (2+), grandparents and anyone who wants the view without holding on.",
      es: "Nuestro recorrido más familiar. Hasta 5 personas en un UTV con techo, cinturones y barras antivuelco. Recorre las mismas rutas salvajes con total comodidad — ideal para niños pequeños (2+), abuelos y quien quiera disfrutar la vista sin agarrarse.",
    },
    metaDescription: {
      en: "UTV side-by-side tour in Guanacaste, Costa Rica — up to 5 riders per vehicle through jungle trails. Family-friendly, kids 2+ welcome.",
      es: "Tour de UTV side-by-side en Guanacaste, Costa Rica — hasta 5 personas por vehículo en rutas selváticas. Familiar, niños desde 2+.",
    },
    keywords: [
      "UTV tour Guanacaste",
      "UTV side by side Costa Rica",
      "family UTV tour Guanacaste",
      "buggy tour Costa Rica",
    ],
    duration: { en: "2 hours", es: "2 horas" },
    difficulty: "Easy",
    price: 339,
    pricingMode: "flat-vehicle",
    maxSeats: 5,
    seatingNote: {
      en: "Up to 5 riders of slim to medium build. For groups of all adults we recommend booking for 4 for extra comfort.",
      es: "Hasta 5 personas de complexión delgada a media. Para grupos de adultos recomendamos reservar para 4 para mayor comodidad.",
    },
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "base",
    addon: null,
    highlights: [
      { en: "Up to 5 riders per UTV", es: "Hasta 5 personas por UTV" },
      { en: "Roll cage & seatbelts", es: "Barras antivuelco y cinturones" },
      { en: "Family friendly", es: "Familiar" },
      { en: "Finca visit", es: "Visita a la finca" },
    ],
    includes: [HELMET_GOGGLES_ALL, BOTTLED_WATER, BILINGUAL_GUIDE, FUEL],
    image: IMAGES.gallery[4],
  },
  {
    slug: "atv-horseback-tour-guanacaste",
    title: { en: "ATV + Cabalgata", es: "ATV + Cabalgata" },
    tagline: {
      en: "Off-road ride paired with a horseback finca tour.",
      es: "Recorrido todoterreno con tour a caballo en la finca.",
    },
    description: {
      en: "Double the adventure. Start on an ATV — Single or Double — carving through the jungle, then trade handlebars for reins on a guided horseback ride across our family finca. Two classic Costa Rican experiences in a single half-day.",
      es: "Doble aventura. Empieza en ATV — Single o Double — recorriendo la selva, luego cambia el manillar por las riendas en una cabalgata guiada por nuestra finca familiar. Dos experiencias clásicas de Costa Rica en medio día.",
    },
    metaDescription: {
      en: "ATV plus horseback (cabalgata) combo tour in Guanacaste, Costa Rica. Off-road quad ride and a guided finca horseback experience in one half-day.",
      es: "Tour combo ATV con cabalgata en Guanacaste, Costa Rica. Recorrido todoterreno en cuadraciclo y experiencia a caballo en finca, en medio día.",
    },
    keywords: [
      "ATV horseback tour Guanacaste",
      "ATV cabalgata Costa Rica",
      "ATV and horseback combo Guanacaste",
      "finca tour Costa Rica",
    ],
    duration: { en: "4 hours", es: "4 horas" },
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
        label: { en: "ATV Single + Cabalgata", es: "ATV Single + Cabalgata" },
        price: 150,
        seats: 1,
        description: {
          en: "Solo ATV + horseback tour.",
          es: "ATV solo + tour a caballo.",
        },
      },
      {
        type: "double",
        label: { en: "ATV Double + Cabalgata", es: "ATV Double + Cabalgata" },
        price: 195,
        seats: 2,
        description: {
          en: "2-up ATV (5+ passenger) + horseback tour.",
          es: "ATV de a dos (pasajero 5+) + tour a caballo.",
        },
      },
    ],
    highlights: [
      { en: "ATV jungle ride", es: "Recorrido en ATV por la selva" },
      { en: "Guided horseback", es: "Cabalgata guiada" },
      { en: "Finca stop", es: "Parada en finca" },
      { en: "Snack break", es: "Pausa para snack" },
    ],
    includes: [
      HELMET_GOGGLES,
      { en: "Trained horses", es: "Caballos entrenados" },
      BILINGUAL_GUIDE,
      { en: "Light snack", es: "Snack ligero" },
    ],
    image: IMAGES.gallery[1],
  },
  {
    slug: "atv-canopy-zipline-tour-guanacaste",
    title: { en: "ATV + Canopy", es: "ATV + Canopy" },
    tagline: {
      en: "Ride the dirt. Fly the canopy.",
      es: "Rueda en tierra. Vuela en canopy.",
    },
    description: {
      en: "Kick off with an ATV blast — Single or Double — through Guanacaste trails, then strap in for a zipline canopy tour soaring above the forest floor. Choose Congo Trail (closest to Playa Hermosa / El Coco) or Skyline (recommended if you're coming from Tamarindo or Flamingo).",
      es: "Arranca con un recorrido en ATV — Single o Double — por las rutas de Guanacaste, luego ponte el arnés para un tour de canopy volando sobre el bosque. Elige Congo Trail (el más cercano a Playa Hermosa / El Coco) o Skyline (recomendado si vienes de Tamarindo o Flamingo).",
    },
    metaDescription: {
      en: "ATV plus canopy zipline combo in Guanacaste, Costa Rica. Off-road quad ride paired with a treetop zipline tour. Choose Congo Trail or Skyline.",
      es: "Combo ATV con canopy en Guanacaste, Costa Rica. Recorrido todoterreno en cuadraciclo combinado con tour de canopy. Elige Congo Trail o Skyline.",
    },
    keywords: [
      "ATV canopy tour Guanacaste",
      "ATV zipline Costa Rica",
      "ATV Skyline canopy",
      "ATV Congo Trail",
      "canopy zipline Guanacaste",
    ],
    duration: { en: "4 hours", es: "4 horas" },
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
        label: { en: "ATV Single + Canopy", es: "ATV Single + Canopy" },
        price: 165,
        seats: 1,
        description: {
          en: "Solo ATV + zipline canopy.",
          es: "ATV solo + canopy.",
        },
      },
      {
        type: "double",
        label: { en: "ATV Double + Canopy", es: "ATV Double + Canopy" },
        price: 205,
        seats: 2,
        description: {
          en: "2-up ATV (5+ passenger) + zipline canopy.",
          es: "ATV de a dos (pasajero 5+) + canopy.",
        },
      },
    ],
    canopyOperators: CANOPY_OPERATORS,
    highlights: [
      { en: "ATV jungle ride", es: "Recorrido en ATV por la selva" },
      {
        en: "Zipline canopy (Congo Trail or Skyline)",
        es: "Canopy (Congo Trail o Skyline)",
      },
      { en: "Treetop views", es: "Vistas desde las copas" },
      { en: "Full harness gear", es: "Equipo completo de arnés" },
    ],
    includes: [
      HELMET_GOGGLES,
      { en: "Canopy harness", es: "Arnés de canopy" },
      BILINGUAL_GUIDE,
      BOTTLED_WATER,
    ],
    image: IMAGES.gallery[3],
  },
  {
    slug: "utv-horseback-tour-guanacaste",
    title: { en: "UTV + Cabalgata", es: "UTV + Cabalgata" },
    tagline: {
      en: "Family off-road + horseback finca ride.",
      es: "Todoterreno familiar + cabalgata en la finca.",
    },
    description: {
      en: "Load the whole crew into the UTV for a trail adventure, then swap wheels for saddles on a relaxed guided horseback ride. The best combo for mixed-age groups who want variety without the extreme. UTV covers the vehicle (up to 5 riders) and each rider adds the horseback portion per person.",
      es: "Sube a todo el grupo al UTV para una aventura por las rutas, luego cambia ruedas por monturas en una cabalgata guiada y relajada. El mejor combo para grupos de edades mixtas que quieren variedad sin lo extremo. El UTV cubre el vehículo (hasta 5 personas) y cada persona agrega la parte de cabalgata por persona.",
    },
    metaDescription: {
      en: "UTV plus horseback (cabalgata) combo tour in Guanacaste, Costa Rica. Family-friendly side-by-side trail ride paired with a finca horseback tour.",
      es: "Tour combo UTV con cabalgata en Guanacaste, Costa Rica. Recorrido todoterreno familiar combinado con cabalgata en la finca.",
    },
    keywords: [
      "UTV horseback tour Guanacaste",
      "UTV cabalgata Costa Rica",
      "family UTV horseback combo",
      "Guanacaste finca horseback",
    ],
    duration: { en: "4 hours", es: "4 horas" },
    difficulty: "Easy",
    price: 339,
    pricingMode: "flat-plus-per-person",
    perPersonAddon: 45,
    maxSeats: 5,
    seatingNote: {
      en: "UTV seats up to 5 riders (slim to medium build). For groups of all adults we recommend 4 for extra comfort. Horseback portion priced per person.",
      es: "El UTV lleva hasta 5 personas (complexión delgada a media). Para grupos de adultos recomendamos 4 para mayor comodidad. La cabalgata se cobra por persona.",
    },
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "combo",
    addon: "Cabalgata",
    highlights: [
      { en: "Up to 5 riders in UTV", es: "Hasta 5 personas en el UTV" },
      { en: "Guided horseback per rider", es: "Cabalgata guiada por persona" },
      { en: "Finca visit", es: "Visita a la finca" },
      { en: "Snack break", es: "Pausa para snack" },
    ],
    includes: [
      HELMET_GOGGLES_ALL,
      { en: "Trained horses", es: "Caballos entrenados" },
      BILINGUAL_GUIDE,
      { en: "Light snack", es: "Snack ligero" },
    ],
    image: IMAGES.gallery[7],
  },
  {
    slug: "utv-canopy-zipline-tour-guanacaste",
    title: { en: "UTV + Canopy", es: "UTV + Canopy" },
    tagline: {
      en: "Drive the beast. Fly the forest.",
      es: "Maneja la bestia. Vuela el bosque.",
    },
    description: {
      en: "Our UTV trail ride paired with a high-flying zipline canopy tour. Comfortable for kids and grandparents on the trail, thrilling for everyone in the air. Choose Congo Trail (closest to Playa Hermosa / El Coco) or Skyline (recommended if you're coming from Tamarindo or Flamingo). UTV covers the vehicle (up to 5 riders) and each rider adds the canopy portion per person.",
      es: "Nuestro recorrido en UTV combinado con un tour de canopy a gran altura. Cómodo para niños y abuelos en el camino, emocionante para todos en el aire. Elige Congo Trail (el más cercano a Playa Hermosa / El Coco) o Skyline (recomendado si vienes de Tamarindo o Flamingo). El UTV cubre el vehículo (hasta 5 personas) y cada persona agrega la parte de canopy por persona.",
    },
    metaDescription: {
      en: "UTV plus canopy zipline combo tour in Guanacaste, Costa Rica. Family-friendly UTV trail ride with a treetop zipline tour. Congo Trail or Skyline.",
      es: "Tour combo UTV con canopy en Guanacaste, Costa Rica. Recorrido familiar en UTV con tour de canopy. Congo Trail o Skyline.",
    },
    keywords: [
      "UTV canopy tour Guanacaste",
      "UTV zipline Costa Rica",
      "UTV Skyline canopy combo",
      "UTV Congo Trail",
      "family canopy tour Guanacaste",
    ],
    duration: { en: "4 hours", es: "4 horas" },
    difficulty: "Moderate",
    price: 339,
    pricingMode: "flat-plus-per-person",
    perPersonAddon: 40,
    maxSeats: 5,
    seatingNote: {
      en: "UTV seats up to 5 riders (slim to medium build). For groups of all adults we recommend 4 for extra comfort. Canopy portion priced per person.",
      es: "El UTV lleva hasta 5 personas (complexión delgada a media). Para grupos de adultos recomendamos 4 para mayor comodidad. La parte de canopy se cobra por persona.",
    },
    minAge: 18,
    minPassengerAge: 2,
    licenseRequired: true,
    vehicle: "UTV",
    category: "combo",
    addon: "Canopy",
    canopyOperators: CANOPY_OPERATORS,
    highlights: [
      { en: "Up to 5 riders in UTV", es: "Hasta 5 personas en el UTV" },
      {
        en: "Zipline canopy (Congo Trail or Skyline)",
        es: "Canopy (Congo Trail o Skyline)",
      },
      { en: "Treetop views", es: "Vistas desde las copas" },
      { en: "Full harness gear", es: "Equipo completo de arnés" },
    ],
    includes: [
      HELMET_GOGGLES_ALL,
      { en: "Canopy harness", es: "Arnés de canopy" },
      BILINGUAL_GUIDE,
      BOTTLED_WATER,
    ],
    image: IMAGES.gallery[8],
  },
];

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((t) => t.slug === slug);
}

export const BASE_TOURS = TOURS.filter((t) => t.category === "base");
export const COMBO_TOURS = TOURS.filter((t) => t.category === "combo");

export function distributeRiders(riders: number, utvs: number): number[] {
  if (utvs <= 0) return [];
  const base = Math.floor(riders / utvs);
  const extra = riders % utvs;
  return Array.from({ length: utvs }, (_, i) => base + (i < extra ? 1 : 0));
}

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

export type PickupTier = {
  label: string;
  price: number;
  zones: string[];
};

export function getOperatorPickupTiers(
  operator: CanopyOperator,
  locale: Locale,
): PickupTier[] {
  if (operator.freePickupZones || operator.paidPickupZones) {
    const tiers: PickupTier[] = [];
    if (operator.freePickupZones?.length) {
      tiers.push({
        label: locale === "es" ? "Gratis" : "Free",
        price: 0,
        zones: operator.freePickupZones,
      });
    }
    if (operator.paidPickupZones?.length && operator.extraPickupSurcharge) {
      tiers.push({
        label: `+$${operator.extraPickupSurcharge}`,
        price: operator.extraPickupSurcharge,
        zones: operator.paidPickupZones,
      });
    }
    return tiers;
  }
  const grouped = new Map<number, string[]>();
  for (const z of TRANSPORT_ZONES) {
    const list = grouped.get(z.basePrice) ?? [];
    list.push(z.name);
    grouped.set(z.basePrice, list);
  }
  return [...grouped.entries()]
    .sort(([a], [b]) => a - b)
    .map(([price, zones]) => ({
      label: price === 0 ? (locale === "es" ? "Gratis" : "Free") : `$${price}`,
      price,
      zones,
    }));
}

/**
 * Localized projection of a Tour with all bilingual text resolved to the
 * given locale. Server pages call this once and pass the result to client
 * components, which can then read plain strings without knowing about i18n.
 */
export type LocalizedTour = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  duration: string;
  difficulty: Tour["difficulty"];
  price: number;
  pricingMode: Tour["pricingMode"];
  perPersonAddon?: number;
  maxSeats?: number;
  seatingNote?: string;
  minAge: number;
  minPassengerAge: number | null;
  licenseRequired: boolean;
  vehicle: Tour["vehicle"];
  category: TourCategory;
  addon: Tour["addon"];
  variants?: {
    type: "single" | "double";
    label: string;
    price: number;
    seats: number;
    description: string;
  }[];
  canopyOperators?: LocalizedCanopyOperator[];
  highlights: string[];
  includes: string[];
  image: string;
};

export type LocalizedCanopyOperator = {
  slug: string;
  name: string;
  recommendedZone: string;
  description: string;
  departures?: string[];
  scheduleNote?: string;
  freePickupZones?: string[];
  paidPickupZones?: string[];
  extraPickupSurcharge?: number;
  pickupNote?: string;
  variantPrices?: { single?: number; double?: number };
  utvTierPrices?: UtvRiderTier[];
  utvMaxSeats?: number;
};

export function localizeCanopyOperator(
  op: CanopyOperator,
  locale: Locale,
): LocalizedCanopyOperator {
  return {
    slug: op.slug,
    name: op.name,
    recommendedZone: t(op.recommendedZone, locale),
    description: t(op.description, locale),
    departures: op.departures,
    scheduleNote: op.scheduleNote ? t(op.scheduleNote, locale) : undefined,
    freePickupZones: op.freePickupZones,
    paidPickupZones: op.paidPickupZones,
    extraPickupSurcharge: op.extraPickupSurcharge,
    pickupNote: op.pickupNote ? t(op.pickupNote, locale) : undefined,
    variantPrices: op.variantPrices,
    utvTierPrices: op.utvTierPrices,
    utvMaxSeats: op.utvMaxSeats,
  };
}

export function localizeTour(tour: Tour, locale: Locale): LocalizedTour {
  return {
    slug: tour.slug,
    title: t(tour.title, locale),
    tagline: t(tour.tagline, locale),
    description: t(tour.description, locale),
    metaDescription: t(tour.metaDescription, locale),
    keywords: tour.keywords,
    duration: t(tour.duration, locale),
    difficulty: tour.difficulty,
    price: tour.price,
    pricingMode: tour.pricingMode,
    perPersonAddon: tour.perPersonAddon,
    maxSeats: tour.maxSeats,
    seatingNote: tour.seatingNote ? t(tour.seatingNote, locale) : undefined,
    minAge: tour.minAge,
    minPassengerAge: tour.minPassengerAge,
    licenseRequired: tour.licenseRequired,
    vehicle: tour.vehicle,
    category: tour.category,
    addon: tour.addon,
    variants: tour.variants?.map((v) => ({
      type: v.type,
      label: t(v.label, locale),
      price: v.price,
      seats: v.seats,
      description: t(v.description, locale),
    })),
    canopyOperators: tour.canopyOperators?.map((op) =>
      localizeCanopyOperator(op, locale),
    ),
    highlights: tour.highlights.map((h) => t(h, locale)),
    includes: tour.includes.map((i) => t(i, locale)),
    image: tour.image,
  };
}

export function localizeTours(locale: Locale): LocalizedTour[] {
  return TOURS.map((tr) => localizeTour(tr, locale));
}
