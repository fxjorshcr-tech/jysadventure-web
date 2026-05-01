import { IMAGES } from "./images";
import type { Bilingual } from "@/i18n/text";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/text";

export type BlogSection = {
  heading?: Bilingual;
  body: Bilingual;
};

export type BlogPost = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  date: Bilingual;
  readTime: Bilingual;
  image: string;
  tag: Bilingual;
  metaDescription: Bilingual;
  keywords: string[];
  intro: Bilingual;
  sections: BlogSection[];
  closing?: Bilingual;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "our-route-through-guanacaste",
    title: {
      en: "Our route through Guanacaste",
      es: "Nuestra ruta por Guanacaste",
    },
    excerpt: {
      en: "From open trails to river crossings and quiet villages — the route we hand-picked to share the real Guanacaste with our riders.",
      es: "De caminos abiertos a cruces de ríos y pueblos tranquilos — la ruta que escogimos a mano para compartir la verdadera Guanacaste con nuestros riders.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    readTime: { en: "3 min", es: "3 min" },
    image: IMAGES.gallery[0],
    tag: { en: "Trails", es: "Rutas" },
    metaDescription: {
      en: "Our single ATV / UTV route through Guanacaste, Costa Rica — open trails, river crossings, finca and a peek into the real Costa Rican countryside.",
      es: "Nuestra ruta única en ATV / UTV por Guanacaste, Costa Rica — caminos abiertos, cruces de río, finca y una mirada al verdadero campo costarricense.",
    },
    keywords: [
      "ATV trail Guanacaste",
      "Costa Rica off-road route",
      "JYS Adventure route",
    ],
    intro: {
      en: "We don't run a long list of routes. We have one — carefully picked over the years to capture what makes our corner of Guanacaste special.",
      es: "No tenemos una lista larga de rutas. Tenemos una — escogida con los años para capturar lo que hace especial este rincón de Guanacaste.",
    },
    sections: [
      {
        heading: { en: "Where it starts", es: "Dónde empieza" },
        body: {
          en: "From our base in Sardinal we head out onto open trails the moment we leave the gate — the kind of country roads only locals usually drive on.",
          es: "Desde nuestra base en Sardinal salimos a caminos abiertos apenas cruzamos el portón — caminos rurales que normalmente solo manejan los locales.",
        },
      },
      {
        heading: { en: "What you'll see", es: "Qué vas a ver" },
        body: {
          en: "Open ranch land, jungle, river crossings (when the season cooperates), small villages and a stop at the family finca where we slow down for a few minutes and take it all in.",
          es: "Pampa abierta, selva, cruces de río (cuando la temporada lo permite), pueblitos y una parada en la finca familiar donde bajamos el ritmo unos minutos y disfrutamos el lugar.",
        },
      },
      {
        heading: { en: "How fast we go", es: "A qué ritmo vamos" },
        body: {
          en: "It's a tour, not a race. The guide sets a pace that suits the group — comfortable for first-timers, fun for confident riders.",
          es: "Es un tour, no una carrera. El guía marca el ritmo según el grupo — cómodo para quienes nunca lo han hecho, divertido para quienes ya tienen experiencia.",
        },
      },
      {
        heading: { en: "Snacks along the way", es: "Snacks en el camino" },
        body: {
          en: "When seasonal fruit is in and we cross paths with it, we love sharing it with our riders — sometimes a piece of fresh fruit from the road or a slice of local cake. It's not on every tour, just whenever the season gives.",
          es: "Cuando hay fruta de temporada y la encontramos en el camino, nos encanta compartirla con los riders — a veces una fruta fresca o un pedacito de ponqué local. No está en cada tour, solo cuando la temporada lo da.",
        },
      },
      {
        heading: { en: "Adapting by season", es: "Adaptando según la temporada" },
        body: {
          en: "The route stays the same — the experience changes. In the green season the rivers are full and the jungle pops; in the dry season the views open up and the trails are faster. Same route, different magic.",
          es: "La ruta es la misma — la experiencia cambia. En temporada verde los ríos están llenos y la selva resalta; en temporada seca se abren las vistas y los caminos son más rápidos. Misma ruta, otra magia.",
        },
      },
    ],
    closing: {
      en: "Want to ride it? Pick a tour, tell us about your group and we'll take care of the rest.",
      es: "¿Quieres rodarla? Elige un tour, cuéntanos de tu grupo y nos encargamos del resto.",
    },
  },
  {
    slug: "atv-vs-utv-which-ride",
    title: {
      en: "ATV vs UTV: which ride is right for your crew?",
      es: "ATV vs UTV: ¿cuál es para tu grupo?",
    },
    excerpt: {
      en: "A quick guide to picking between a solo quad and a family side-by-side for your Costa Rica adventure.",
      es: "Una guía rápida para elegir entre un cuadraciclo solo y un side-by-side familiar para tu aventura en Costa Rica.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    readTime: { en: "2 min", es: "2 min" },
    image: IMAGES.gallery[2],
    tag: { en: "Guide", es: "Guía" },
    metaDescription: {
      en: "ATV or UTV in Costa Rica? Quick guide to picking the right vehicle by group size, age and riding experience for your Guanacaste adventure.",
      es: "¿ATV o UTV en Costa Rica? Guía rápida para elegir el vehículo correcto según el tamaño de grupo, edades y experiencia para tu aventura en Guanacaste.",
    },
    keywords: ["ATV vs UTV", "UTV Costa Rica", "ATV Guanacaste guide"],
    intro: {
      en: "Both rides hit the same trails — picking the right one comes down to your crew, not the terrain.",
      es: "Ambos vehículos recorren el mismo camino — elegir el correcto depende de tu grupo, no del terreno.",
    },
    sections: [
      {
        heading: { en: "Pick an ATV (Single or Double) if…", es: "Elige un ATV (Single o Double) si…" },
        body: {
          en: "You want hands-on control, you're 18+ with a license, or you want to mix solo riders and a 5+ year-old passenger in the same group.",
          es: "Quieres control directo, tienes 18+ con licencia, o quieres mezclar conductores solos y un pasajero de 5+ años en el mismo grupo.",
        },
      },
      {
        heading: { en: "Pick a UTV (Side-by-Side) if…", es: "Elige un UTV (Side-by-Side) si…" },
        body: {
          en: "You're travelling with kids from 2+, mixed ages, grandparents or anyone who'd rather sit back with a seatbelt and a roll cage. Up to 5 riders share one vehicle.",
          es: "Viajas con niños desde 2+, edades mixtas, abuelos o cualquiera que prefiera ir sentado con cinturón y barras antivuelco. Hasta 5 personas comparten un vehículo.",
        },
      },
      {
        heading: { en: "Still not sure?", es: "¿Aún no estás seguro?" },
        body: {
          en: "Mixed groups often book one UTV plus a couple of ATVs — kids and parents in the UTV, the adrenaline crew solo on quads. Same trail, same guide.",
          es: "Los grupos mixtos suelen reservar un UTV más un par de ATVs — niños y padres en el UTV, los de adrenalina en cuadraciclos solos. Mismo camino, mismo guía.",
        },
      },
    ],
    closing: {
      en: "Message us with your group ages and we'll suggest the best mix.",
      es: "Escríbenos con las edades del grupo y te sugerimos la mejor combinación.",
    },
  },
  {
    slug: "what-to-wear-off-road-costa-rica",
    title: {
      en: "What to wear on an off-road tour in Costa Rica",
      es: "Qué ponerse para un tour todoterreno en Costa Rica",
    },
    excerpt: {
      en: "Shoes, clothing, sunscreen, and the one thing most riders forget. A complete packing list.",
      es: "Zapatos, ropa, protector solar y lo único que la mayoría olvida. Una lista completa para empacar.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    readTime: { en: "2 min", es: "2 min" },
    image: IMAGES.gallery[4],
    tag: { en: "Tips", es: "Consejos" },
    metaDescription: {
      en: "What to wear and bring on an ATV or UTV tour in Guanacaste, Costa Rica — clothing, shoes, sunscreen and the small things first-timers forget.",
      es: "Qué ponerse y qué llevar a un tour de ATV o UTV en Guanacaste, Costa Rica — ropa, zapatos, protector solar y los pequeños detalles que olvidan los principiantes.",
    },
    keywords: [
      "ATV tour packing list",
      "what to wear ATV Costa Rica",
      "Guanacaste off-road tips",
    ],
    intro: {
      en: "Dust, sun, river crossings and shaded jungle — Guanacaste throws all of it at you in one ride. Pack smart and you'll have way more fun.",
      es: "Polvo, sol, cruces de río y selva con sombra — Guanacaste te tira todo eso en un solo recorrido. Empaca con cabeza y la pasarás mucho mejor.",
    },
    sections: [
      {
        heading: { en: "Wear", es: "Ponte" },
        body: {
          en: "Closed-toe shoes (sneakers or hiking shoes), comfortable shorts or light pants, a t-shirt you don't mind getting muddy.",
          es: "Zapato cerrado (tenis o zapato de senderismo), shorts cómodos o pantalón liviano, una camiseta que no te importe ensuciar.",
        },
      },
      {
        heading: { en: "Bring", es: "Lleva" },
        body: {
          en: "Sunscreen (reef-safe if you're combining with the beach), sunglasses, a hat or cap, and a small bottle of water if you want extra.",
          es: "Protector solar (reef-safe si lo combinas con la playa), gafas de sol, gorra y una botellita de agua extra si quieres.",
        },
      },
      {
        heading: { en: "We provide", es: "Nosotros ponemos" },
        body: {
          en: "Helmet, goggles, bilingual guide, fuel and bottled water on every tour. A bandana add-on is available for $10 if you want extra dust protection.",
          es: "Casco, goggles, guía bilingüe, combustible y agua embotellada en cada tour. Tenemos bandanas extras por $10 si quieres protección adicional contra el polvo.",
        },
      },
      {
        heading: { en: "The one thing people forget", es: "Lo único que la gente olvida" },
        body: {
          en: "A change of clothes. Trails get muddy in the green season and you'll thank yourself for a dry shirt in the car ride back.",
          es: "Una muda de ropa. Los caminos se enlodan en temporada verde y te vas a agradecer una camiseta seca para el viaje de vuelta.",
        },
      },
    ],
  },
  {
    slug: "riding-with-kids-utv-experience",
    title: {
      en: "Riding with kids: our family UTV experience",
      es: "Rodando con niños: nuestra experiencia familiar en UTV",
    },
    excerpt: {
      en: "Safety tips, age recommendations and how to make your kid's first off-road ride unforgettable.",
      es: "Consejos de seguridad, edades recomendadas y cómo hacer que el primer tour todoterreno de tu hijo sea inolvidable.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    readTime: { en: "2 min", es: "2 min" },
    image: IMAGES.gallery[5],
    tag: { en: "Family", es: "Familia" },
    metaDescription: {
      en: "Family UTV tours in Guanacaste, Costa Rica — kids 2+ welcome, safety setup, age tips and how to make your child's first off-road ride a great memory.",
      es: "Tours familiares en UTV en Guanacaste, Costa Rica — niños desde 2+, configuración de seguridad y cómo hacer del primer tour todoterreno un gran recuerdo.",
    },
    keywords: [
      "family UTV Costa Rica",
      "ATV with kids Guanacaste",
      "kid-friendly tour Costa Rica",
    ],
    intro: {
      en: "Bringing kids? The UTV is built for them — roof, seatbelts, roll cage and a calm pace through the same trails the adults ride.",
      es: "¿Vienes con niños? El UTV está hecho para ellos — techo, cinturones, barras antivuelco y un ritmo tranquilo por los mismos caminos.",
    },
    sections: [
      {
        heading: { en: "Ages we welcome", es: "Edades que aceptamos" },
        body: {
          en: "Kids from 2 years old can ride as passengers in the UTV. ATV Doubles welcome passengers from 5+ years.",
          es: "Niños desde 2 años pueden ir como pasajeros en el UTV. El ATV Double acepta pasajeros desde 5+ años.",
        },
      },
      {
        heading: { en: "How we set them up", es: "Cómo los preparamos" },
        body: {
          en: "Helmets in every kid size, seatbelts, and a guide who paces the trail to the youngest rider in the group. Baby seats available on request.",
          es: "Cascos en cada talla, cinturones y un guía que adapta el ritmo al niño más pequeño del grupo. Sillas de bebé bajo pedido.",
        },
      },
      {
        heading: { en: "What parents tell us", es: "Lo que nos cuentan los papás" },
        body: {
          en: "First-timers are a little nervous in the first 5 minutes — by the river crossing they're laughing. Bring a phone with a wrist strap for photos and let the guide handle the rest.",
          es: "Los que nunca lo han hecho están nerviosos los primeros 5 minutos — para el cruce de río ya se están riendo. Trae un celular con correa para fotos y deja que el guía maneje lo demás.",
        },
      },
    ],
    closing: {
      en: "Tell us your kids' ages when you book and we'll match the trail.",
      es: "Cuéntanos las edades de tus niños al reservar y adaptamos la ruta.",
    },
  },
  {
    slug: "atv-cabalgata-ultimate-half-day",
    title: {
      en: "Combining ATV + Cabalgata: the ultimate half-day",
      es: "Combinar ATV + Cabalgata: el medio día perfecto",
    },
    excerpt: {
      en: "Why mixing an adrenaline ride with a horseback finca visit might be the best travel decision you make.",
      es: "Por qué mezclar un tour con adrenalina y una cabalgata en finca puede ser la mejor decisión de viaje.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    readTime: { en: "2 min", es: "2 min" },
    image: IMAGES.gallery[1],
    tag: { en: "Combos", es: "Combos" },
    metaDescription: {
      en: "ATV plus horseback (cabalgata) combo tour in Guanacaste — half a day of adrenaline plus a calm finca ride. Why it's our most-booked combo.",
      es: "Tour combo ATV con cabalgata en Guanacaste — medio día de adrenalina más una cabalgata tranquila por la finca. Por qué es nuestro combo más reservado.",
    },
    keywords: [
      "ATV cabalgata Guanacaste",
      "horseback Costa Rica",
      "ATV horseback combo tour",
    ],
    intro: {
      en: "Half a day, two completely different rhythms. Our most-booked combo and an easy way to see two sides of Guanacaste.",
      es: "Medio día, dos ritmos totalmente diferentes. Nuestro combo más reservado y una forma fácil de ver dos caras de Guanacaste.",
    },
    sections: [
      {
        heading: { en: "Part 1 — ATV ride (about 2 hours)", es: "Parte 1 — Recorrido en ATV (~2 horas)" },
        body: {
          en: "Jungle trails, river crossings and a viewpoint stop. You pick Single or Double, no experience needed.",
          es: "Rutas selváticas, cruces de río y parada en mirador. Eliges Single o Double, sin experiencia previa.",
        },
      },
      {
        heading: { en: "Part 2 — Cabalgata (about 1.5 hours)", es: "Parte 2 — Cabalgata (~1.5 horas)" },
        body: {
          en: "Trade handlebars for reins on a guided horseback tour through our family finca. Trained horses, bilingual guide and a snack break.",
          es: "Cambia el manillar por las riendas en una cabalgata guiada por nuestra finca familiar. Caballos entrenados, guía bilingüe y pausa para snack.",
        },
      },
      {
        heading: { en: "Why it works", es: "Por qué funciona" },
        body: {
          en: "The ATV gets the adrenaline out of your system. The horseback ride gives you the slow, postcard side of Guanacaste — cattle, wide open finca and time to breathe.",
          es: "El ATV te saca la adrenalina del cuerpo. La cabalgata te da el lado lento y postal de Guanacaste — ganado, finca abierta y tiempo para respirar.",
        },
      },
    ],
    closing: {
      en: "Plan it for the morning so you have the afternoon free for the beach.",
      es: "Planéalo para la mañana y tienes la tarde libre para la playa.",
    },
  },
  {
    slug: "best-season-to-ride-guanacaste",
    title: {
      en: "Best season to ride in Guanacaste",
      es: "La mejor temporada para rodar en Guanacaste",
    },
    excerpt: {
      en: "Dry season, green season, rain — how weather changes the trails and when to book your ride.",
      es: "Temporada seca, temporada verde, lluvia — cómo el clima cambia los caminos y cuándo reservar.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    readTime: { en: "2 min", es: "2 min" },
    image: IMAGES.gallery[6],
    tag: { en: "Travel", es: "Viajes" },
    metaDescription: {
      en: "When is the best time to ride ATV / UTV tours in Guanacaste, Costa Rica? Dry vs green season trails, weather and what to expect month by month.",
      es: "¿Cuándo es la mejor época para tours de ATV / UTV en Guanacaste, Costa Rica? Temporada seca vs verde y qué esperar mes a mes.",
    },
    keywords: [
      "best season Guanacaste",
      "Costa Rica dry season",
      "Guanacaste weather ATV",
    ],
    intro: {
      en: "Short answer: any month is great — the trail just changes character. Here's what to expect.",
      es: "Respuesta corta: cualquier mes es buenísimo — el camino solo cambia de carácter. Esto es lo que puedes esperar.",
    },
    sections: [
      {
        heading: { en: "Dry season — December to April", es: "Temporada seca — diciembre a abril" },
        body: {
          en: "Sun, dust and wide rivers you can cross. Trails open up and views are clearest. Peak tourist season — book early.",
          es: "Sol, polvo y ríos amplios que se pueden cruzar. Los caminos se abren y las vistas son más limpias. Temporada alta — reserva con tiempo.",
        },
      },
      {
        heading: { en: "Green season — May to November", es: "Temporada verde — mayo a noviembre" },
        body: {
          en: "Lush jungle, full waterfalls and fewer tourists. Tours run daily; we just pick the route based on the morning's weather. Bring a light rain layer for late-day showers.",
          es: "Selva exuberante, cascadas llenas y menos turistas. Los tours salen a diario; solo adaptamos la ruta al clima de la mañana. Trae una capa liviana para los aguaceros de la tarde.",
        },
      },
      {
        heading: { en: "Bad weather?", es: "¿Mal tiempo?" },
        body: {
          en: "Costa Rican rain rarely lasts all day. We don't cancel for a sprinkle — only for safety. If we have to reschedule, we'll move you to another slot for free.",
          es: "La lluvia tica casi nunca dura todo el día. No cancelamos por un chubasco — solo por seguridad. Si hay que reprogramar, te movemos a otro slot sin costo.",
        },
      },
    ],
    closing: {
      en: "Whatever month you pick, you'll find a great ride waiting.",
      es: "El mes que elijas, te espera un gran recorrido.",
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export type LocalizedBlogPost = {
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
  sections: { heading?: string; body: string }[];
  closing?: string;
};

export function localizePost(post: BlogPost, locale: Locale): LocalizedBlogPost {
  return {
    slug: post.slug,
    title: t(post.title, locale),
    excerpt: t(post.excerpt, locale),
    date: t(post.date, locale),
    readTime: t(post.readTime, locale),
    image: post.image,
    tag: t(post.tag, locale),
    metaDescription: t(post.metaDescription, locale),
    keywords: post.keywords,
    intro: t(post.intro, locale),
    sections: post.sections.map((s) => ({
      heading: s.heading ? t(s.heading, locale) : undefined,
      body: t(s.body, locale),
    })),
    closing: post.closing ? t(post.closing, locale) : undefined,
  };
}

export function localizePosts(locale: Locale): LocalizedBlogPost[] {
  return BLOG_POSTS.map((p) => localizePost(p, locale));
}
