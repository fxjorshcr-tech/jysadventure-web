const BASE =
  "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys";
const NEW = `${BASE}/Fotos%20Nuevas`;

/**
 * Every photo the site uses, addressed by name so a tour or page never
 * ends up with the wrong vehicle by accident.
 *
 * Landscape/portrait notes matter for hero crops (object-cover):
 *   - atvMud, utvRiver, utvMudSplash, monkey  -> landscape
 *   - atvGroupRoad, owls, kidsFarm, utvCattle, utvCattleHerd,
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
