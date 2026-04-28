import { IMAGES } from "./images";

export type BlogSection = {
  heading?: string;
  body: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  tag: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: BlogSection[];
  closing?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-atv-trails-guanacaste",
    title: "Top 5 ATV trails in Guanacaste you can't miss",
    excerpt:
      "From dry riverbeds to volcanic ridges, our guides break down the best off-road routes in Costa Rica's Pacific coast.",
    date: "April 2026",
    readTime: "3 min",
    image: IMAGES.gallery[0],
    tag: "Trails",
    metaDescription:
      "The five best ATV trails in Guanacaste, Costa Rica — riverbeds, jungle climbs, hidden waterfalls and ocean lookouts ridden by JYS Adventure guides.",
    keywords: [
      "ATV trails Guanacaste",
      "Costa Rica off-road routes",
      "best ATV ride Guanacaste",
    ],
    intro:
      "Guanacaste's Pacific side hides some of the best off-road riding in Central America. These are the five trails our guides keep coming back to.",
    sections: [
      {
        heading: "1. Sardinal river run",
        body: "Our home trail. Seasonal river crossings, shaded jungle and a view of the Papagayo gulf at the top.",
      },
      {
        heading: "2. Las Pilas waterfall loop",
        body: "Our green-season favourite — single-track through forest, ending at a hidden waterfall pool perfect for a photo stop.",
      },
      {
        heading: "3. Finca cattle road",
        body: "Open ranch land with long, fast straights and a finca break for fresh fruit and a coffee.",
      },
      {
        heading: "4. Volcán Rincón ridge",
        body: "A longer route up volcanic ridges with steam vents and panoramic views — best for confident riders.",
      },
      {
        heading: "5. Beach connector",
        body: "A combo of jungle trail and beach run linking Hermosa with hidden coves only locals know about.",
      },
    ],
    closing:
      "Want to try them? Most fit into a 2- or 4-hour tour. Tell us your level and your group size and we'll pick the right one.",
  },
  {
    slug: "atv-vs-utv-which-ride",
    title: "ATV vs UTV: which ride is right for your crew?",
    excerpt:
      "A quick guide to picking between a solo quad and a family side-by-side for your Costa Rica adventure.",
    date: "April 2026",
    readTime: "2 min",
    image: IMAGES.gallery[2],
    tag: "Guide",
    metaDescription:
      "ATV or UTV in Costa Rica? Quick guide to picking the right vehicle by group size, age and riding experience for your Guanacaste adventure.",
    keywords: ["ATV vs UTV", "UTV Costa Rica", "ATV Guanacaste guide"],
    intro:
      "Both rides hit the same trails — picking the right one comes down to your crew, not the terrain.",
    sections: [
      {
        heading: "Pick an ATV (Single or Double) if…",
        body: "You want hands-on control, you're 18+ with a license, or you want to mix solo riders and a 5+ year-old passenger in the same group.",
      },
      {
        heading: "Pick a UTV (Side-by-Side) if…",
        body: "You're travelling with kids from 2+, mixed ages, grandparents or anyone who'd rather sit back with a seatbelt and a roll cage. Up to 5 riders share one vehicle.",
      },
      {
        heading: "Still not sure?",
        body: "Mixed groups often book one UTV plus a couple of ATVs — kids and parents in the UTV, the adrenaline crew solo on quads. Same trail, same guide.",
      },
    ],
    closing: "Message us with your group ages and we'll suggest the best mix.",
  },
  {
    slug: "what-to-wear-off-road-costa-rica",
    title: "What to wear on an off-road tour in Costa Rica",
    excerpt:
      "Shoes, clothing, sunscreen, and the one thing most riders forget. A complete packing list.",
    date: "April 2026",
    readTime: "2 min",
    image: IMAGES.gallery[4],
    tag: "Tips",
    metaDescription:
      "What to wear and bring on an ATV or UTV tour in Guanacaste, Costa Rica — clothing, shoes, sunscreen and the small things first-timers forget.",
    keywords: [
      "ATV tour packing list",
      "what to wear ATV Costa Rica",
      "Guanacaste off-road tips",
    ],
    intro:
      "Dust, sun, river crossings and shaded jungle — Guanacaste throws all of it at you in one ride. Pack smart and you'll have way more fun.",
    sections: [
      {
        heading: "Wear",
        body: "Closed-toe shoes (sneakers or hiking shoes), comfortable shorts or light pants, a t-shirt you don't mind getting muddy.",
      },
      {
        heading: "Bring",
        body: "Sunscreen (reef-safe if you're combining with the beach), sunglasses, a hat or cap, and a small bottle of water if you want extra.",
      },
      {
        heading: "We provide",
        body: "Helmet, goggles, bilingual guide, fuel and bottled water on every tour. A bandana add-on is available for $10 if you want extra dust protection.",
      },
      {
        heading: "The one thing people forget",
        body: "A change of clothes. Trails get muddy in the green season and you'll thank yourself for a dry shirt in the car ride back.",
      },
    ],
  },
  {
    slug: "riding-with-kids-utv-experience",
    title: "Riding with kids: our family UTV experience",
    excerpt:
      "Safety tips, age recommendations and how to make your kid's first off-road ride unforgettable.",
    date: "April 2026",
    readTime: "2 min",
    image: IMAGES.gallery[5],
    tag: "Family",
    metaDescription:
      "Family UTV tours in Guanacaste, Costa Rica — kids 2+ welcome, safety setup, age tips and how to make your child's first off-road ride a great memory.",
    keywords: [
      "family UTV Costa Rica",
      "ATV with kids Guanacaste",
      "kid-friendly tour Costa Rica",
    ],
    intro:
      "Bringing kids? The UTV is built for them — roof, seatbelts, roll cage and a calm pace through the same trails the adults ride.",
    sections: [
      {
        heading: "Ages we welcome",
        body: "Kids from 2 years old can ride as passengers in the UTV. ATV Doubles welcome passengers from 5+ years.",
      },
      {
        heading: "How we set them up",
        body: "Helmets in every kid size, seatbelts, and a guide who paces the trail to the youngest rider in the group. Baby seats available on request.",
      },
      {
        heading: "What parents tell us",
        body: "First-timers are a little nervous in the first 5 minutes — by the river crossing they're laughing. Bring a phone with a wrist strap for photos and let the guide handle the rest.",
      },
    ],
    closing: "Tell us your kids' ages when you book and we'll match the trail.",
  },
  {
    slug: "atv-cabalgata-ultimate-half-day",
    title: "Combining ATV + Cabalgata: the ultimate half-day",
    excerpt:
      "Why mixing an adrenaline ride with a horseback finca visit might be the best travel decision you make.",
    date: "April 2026",
    readTime: "2 min",
    image: IMAGES.gallery[1],
    tag: "Combos",
    metaDescription:
      "ATV plus horseback (cabalgata) combo tour in Guanacaste — half a day of adrenaline plus a calm finca ride. Why it's our most-booked combo.",
    keywords: [
      "ATV cabalgata Guanacaste",
      "horseback Costa Rica",
      "ATV horseback combo tour",
    ],
    intro:
      "Half a day, two completely different rhythms. Our most-booked combo and an easy way to see two sides of Guanacaste.",
    sections: [
      {
        heading: "Part 1 — ATV ride (about 2 hours)",
        body: "Jungle trails, river crossings and a viewpoint stop. You pick Single or Double, no experience needed.",
      },
      {
        heading: "Part 2 — Cabalgata (about 1.5 hours)",
        body: "Trade handlebars for reins on a guided horseback tour through our family finca. Trained horses, bilingual guide and a snack break.",
      },
      {
        heading: "Why it works",
        body: "The ATV gets the adrenaline out of your system. The horseback ride gives you the slow, postcard side of Guanacaste — cattle, wide open finca and a coffee at the end.",
      },
    ],
    closing: "Plan it for the morning so you have the afternoon free for the beach.",
  },
  {
    slug: "best-season-to-ride-guanacaste",
    title: "Best season to ride in Guanacaste",
    excerpt:
      "Dry season, green season, rain — how weather changes the trails and when to book your ride.",
    date: "April 2026",
    readTime: "2 min",
    image: IMAGES.gallery[6],
    tag: "Travel",
    metaDescription:
      "When is the best time to ride ATV / UTV tours in Guanacaste, Costa Rica? Dry vs green season trails, weather and what to expect month by month.",
    keywords: [
      "best season Guanacaste",
      "Costa Rica dry season",
      "Guanacaste weather ATV",
    ],
    intro:
      "Short answer: any month is great — the trail just changes character. Here's what to expect.",
    sections: [
      {
        heading: "Dry season — December to April",
        body: "Sun, dust and wide rivers you can cross. Trails are fast and views are clearest. Peak tourist season — book early.",
      },
      {
        heading: "Green season — May to November",
        body: "Lush jungle, full waterfalls and fewer tourists. Tours run daily; we just pick the route based on the morning's weather. Bring a light rain layer for late-day showers.",
      },
      {
        heading: "Bad weather?",
        body: "Costa Rican rain rarely lasts all day. We don't cancel for a sprinkle — only for safety. If we have to reschedule, we'll move you to another slot for free.",
      },
    ],
    closing: "Whatever month you pick, you'll find a great ride waiting.",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
