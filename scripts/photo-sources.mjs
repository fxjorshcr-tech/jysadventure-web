/**
 * Original photos as uploaded to Supabase storage. This is the input of
 * `npm run optimize-images`, which downloads each one, writes resized WebP
 * variants to public/photos and the size manifest to src/lib/photos.manifest.json.
 *
 * Add a new photo here, run the script, then reference it from
 * src/lib/images.ts with `photo("key")`. The key is the file name.
 */
export const PHOTO_SOURCES = {
  logo: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/logo-jys%20(1).png",
  hero: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/ChatGPT%20Image%2013%20abr%202026,%2021_45_30.webp",
  heroAlt: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/ChatGPT%20Image%2013%20abr%202026,%2021_48_11.webp",
  atvMud: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/atv.jpeg", // ATV blasting through a muddy river crossing
  atvGroupRoad: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/atv2.jpeg", // four ATVs on a dirt road, blue sky
  owls: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/aves.jpeg", // pair of spectacled owls in the canopy
  monkey: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/mono.jpeg", // white-faced capuchin resting on a branch
  kidsFarm: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/ninos.jpeg", // kid with a sheep at base camp
  kidsFawn: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/ninos2.jpeg", // kids petting a fawn at base camp
  utvCattle: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/utv.jpeg", // UTV sharing the trail with cattle
  utvCattleHerd: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/utv1.jpeg", // UTV behind a herd on the trail
  utvMudPortrait: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/utv2.jpeg", // UTV mud splash, portrait
  utvCanopyTrail: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/utv3.jpeg", // UTV under the tree canopy, portrait
  utvRiver: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/utv4.jpeg", // UTV crossing the river by the fallen tree
  utvMudSplash: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/Fotos%20Nuevas/utv5.jpeg", // UTV mud splash, landscape
  atvTrio: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/912169_490058.webp", // three ATVs on a forest trail
  atvArmsOpen: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/893288_295807.webp", // rider celebrating on ATV
  utvSplash: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/842930_310.webp", // UTV river splash, landscape
  crewFicus: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/596402_712455.webp", // group with UTV at the ficus tree
  familyUtv: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/575269_858397.webp", // family in a UTV at base camp
  utvCamoRiver: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/477658_15781.webp", // camo UTV crossing the river
  atvPinkRoad: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/309058_952674.webp", // ATV convoy on the orange road
  atvBlueMud: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/public/jys/128400_649303.webp", // blue ATV mud splash, UTV behind
};
