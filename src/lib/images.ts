import type { Bilingual } from "@/i18n/text";

const BASE =
  "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys";
const NEW = `${BASE}/Fotos%20Nuevas`;

/**
 * Every photo the site uses, addressed by name so a tour or page never
 * ends up with the wrong vehicle by accident.
 *
 * Landscape/portrait notes matter for hero crops (object-cover):
 *   - atvMud, utvRiver, utvMudSplash, monkey  -> landscape
 *   - atvGroupRoad, owls, kidsFarm, kidsFawn, utvCattle, utvCattleHerd,
 *     utvMudPortrait, utvCanopyTrail, atvBlueMud, atvPinkRoad -> portrait
 */
export const IMAGES = {
  logo: `${BASE}/logo-jys%20(1).png`,

  // Home hero (full-screen backdrop)
  hero: `${BASE}/ChatGPT%20Image%2013%20abr%202026,%2021_45_30.webp`,
  heroAlt: `${BASE}/ChatGPT%20Image%2013%20abr%202026,%2021_48_11.webp`,

  // --- Real ride photos (Fotos Nuevas) ---
  atvMud: `${NEW}/atv.jpeg`, // ATV blasting through a muddy river crossing
  atvGroupRoad: `${NEW}/atv2.jpeg`, // four ATVs on a dirt road, blue sky
  owls: `${NEW}/aves.jpeg`, // pair of spectacled owls in the canopy
  monkey: `${NEW}/mono.jpeg`, // white-faced capuchin resting on a branch
  kidsFarm: `${NEW}/ninos.jpeg`, // kid with a sheep at base camp
  kidsFawn: `${NEW}/ninos2.jpeg`, // kids petting a fawn at base camp
  utvCattle: `${NEW}/utv.jpeg`, // UTV sharing the trail with cattle
  utvCattleHerd: `${NEW}/utv1.jpeg`, // UTV behind a herd on the trail
  utvMudPortrait: `${NEW}/utv2.jpeg`, // UTV mud splash, portrait
  utvCanopyTrail: `${NEW}/utv3.jpeg`, // UTV under the tree canopy, portrait
  utvRiver: `${NEW}/utv4.jpeg`, // UTV crossing the river by the fallen tree
  utvMudSplash: `${NEW}/utv5.jpeg`, // UTV mud splash, landscape

  // --- Real ride photos (original set) ---
  atvTrio: `${BASE}/912169_490058.webp`, // three ATVs on a forest trail
  atvArmsOpen: `${BASE}/893288_295807.webp`, // rider celebrating on ATV
  utvSplash: `${BASE}/842930_310.webp`, // UTV river splash, landscape
  crewFicus: `${BASE}/596402_712455.webp`, // group with UTV at the ficus tree
  familyUtv: `${BASE}/575269_858397.webp`, // family in a UTV at base camp
  utvCamoRiver: `${BASE}/477658_15781.webp`, // camo UTV crossing the river
  atvPinkRoad: `${BASE}/309058_952674.webp`, // ATV convoy on the orange road
  atvBlueMud: `${BASE}/128400_649303.webp`, // blue ATV mud splash, UTV behind
} as const;

/** Home gallery. Every 5th item (0, 5, ...) renders as a 2x2 tile. */
export const GALLERY: { src: string; alt: string }[] = [
  { src: IMAGES.atvTrio, alt: "Group of riders on ATVs in the Guanacaste forest" },
  { src: IMAGES.atvMud, alt: "ATV splashing through a muddy river crossing" },
  { src: IMAGES.utvSplash, alt: "UTV side by side crossing a river at full speed" },
  { src: IMAGES.monkey, alt: "White-faced capuchin monkey seen on the tour" },
  { src: IMAGES.atvPinkRoad, alt: "ATV convoy riding the orange dirt roads of Guanacaste" },
  { src: IMAGES.utvRiver, alt: "UTV crossing the river beside a fallen tree" },
  { src: IMAGES.atvArmsOpen, alt: "Rider celebrating on an ATV with arms wide open" },
  { src: IMAGES.owls, alt: "Two spectacled owls perched in the jungle canopy" },
  { src: IMAGES.utvCattleHerd, alt: "UTV following a herd of cattle on a Guanacaste trail" },
  { src: IMAGES.atvGroupRoad, alt: "Four ATVs on a country road under a blue sky" },
];

export type PhotoCategory = "atv" | "utv" | "wildlife" | "basecamp";

export type Photo = {
  src: string;
  alt: Bilingual;
  category: PhotoCategory;
  /** Intrinsic size, used to reserve the right aspect ratio in the grid. */
  w: number;
  h: number;
};

/** Every real photo, for the /gallery page. */
export const PHOTOS: Photo[] = [
  {
    src: IMAGES.utvRiver,
    alt: { en: "UTV crossing the river beside a fallen tree", es: "UTV cruzando el río junto a un árbol caído" },
    category: "utv", w: 1280, h: 720,
  },
  {
    src: IMAGES.atvArmsOpen,
    alt: { en: "Rider celebrating on an ATV with arms wide open", es: "Piloto celebrando en un ATV con los brazos abiertos" },
    category: "atv", w: 1920, h: 2560,
  },
  {
    src: IMAGES.monkey,
    alt: { en: "White-faced capuchin monkey seen on the tour", es: "Mono carablanca visto durante el tour" },
    category: "wildlife", w: 1599, h: 899,
  },
  {
    src: IMAGES.atvMud,
    alt: { en: "ATV splashing through a muddy river crossing", es: "ATV atravesando un cruce de río lleno de barro" },
    category: "atv", w: 1280, h: 720,
  },
  {
    src: IMAGES.utvCanopyTrail,
    alt: { en: "UTV riding under the Guanacaste tree canopy", es: "UTV avanzando bajo el dosel de árboles de Guanacaste" },
    category: "utv", w: 2160, h: 3840,
  },
  {
    src: IMAGES.kidsFawn,
    alt: { en: "Kids petting a fawn at JYS base camp", es: "Niños acariciando un venadito en el base camp de JYS" },
    category: "basecamp", w: 3120, h: 4160,
  },
  {
    src: IMAGES.atvTrio,
    alt: { en: "Group of riders on ATVs in the Guanacaste forest", es: "Grupo de pilotos en ATV en el bosque de Guanacaste" },
    category: "atv", w: 1280, h: 960,
  },
  {
    src: IMAGES.utvSplash,
    alt: { en: "UTV side by side crossing a river at full speed", es: "UTV side by side cruzando un río a toda velocidad" },
    category: "utv", w: 1920, h: 1080,
  },
  {
    src: IMAGES.owls,
    alt: { en: "Two spectacled owls perched in the jungle canopy", es: "Dos búhos de anteojos posados en el dosel de la selva" },
    category: "wildlife", w: 3024, h: 4032,
  },
  {
    src: IMAGES.atvPinkRoad,
    alt: { en: "ATV convoy riding the orange dirt roads of Guanacaste", es: "Caravana de ATVs por los caminos de tierra naranja de Guanacaste" },
    category: "atv", w: 1920, h: 2560,
  },
  {
    src: IMAGES.utvCattle,
    alt: { en: "UTV sharing the trail with local cattle", es: "UTV compartiendo el sendero con el ganado local" },
    category: "utv", w: 1086, h: 1448,
  },
  {
    src: IMAGES.crewFicus,
    alt: { en: "Group posing with a UTV under the giant ficus tree", es: "Grupo posando con un UTV bajo el higuerón gigante" },
    category: "utv", w: 1920, h: 2560,
  },
  {
    src: IMAGES.utvMudSplash,
    alt: { en: "UTV blasting through a mud puddle", es: "UTV atravesando un charco de barro" },
    category: "utv", w: 1280, h: 720,
  },
  {
    src: IMAGES.kidsFarm,
    alt: { en: "Kid meeting a sheep at JYS base camp", es: "Niño conociendo una oveja en el base camp de JYS" },
    category: "basecamp", w: 3024, h: 4032,
  },
  {
    src: IMAGES.atvBlueMud,
    alt: { en: "Blue ATV splashing through mud with a UTV behind", es: "ATV azul salpicando barro con un UTV detrás" },
    category: "atv", w: 900, h: 1600,
  },
  {
    src: IMAGES.utvCattleHerd,
    alt: { en: "UTV following a herd of cattle on a Guanacaste trail", es: "UTV siguiendo una manada de ganado en un sendero de Guanacaste" },
    category: "utv", w: 899, h: 1599,
  },
  {
    src: IMAGES.atvGroupRoad,
    alt: { en: "Four ATVs on a country road under a blue sky", es: "Cuatro ATVs en un camino rural bajo el cielo azul" },
    category: "atv", w: 575, h: 1280,
  },
  {
    src: IMAGES.familyUtv,
    alt: { en: "Family ready to ride in a UTV at base camp", es: "Familia lista para salir en un UTV desde el base camp" },
    category: "basecamp", w: 1920, h: 2560,
  },
  {
    src: IMAGES.utvMudPortrait,
    alt: { en: "UTV kicking up mud on the trail", es: "UTV levantando barro en el sendero" },
    category: "utv", w: 2160, h: 3840,
  },
  {
    src: IMAGES.utvCamoRiver,
    alt: { en: "Camo UTV crossing a fast-flowing river", es: "UTV camuflado cruzando un río caudaloso" },
    category: "utv", w: 960, h: 1280,
  },
];
