import { IMAGES } from "./images";
import type { Bilingual } from "@/i18n/text";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/text";

export type BlogSection = {
  heading?: Bilingual;
  /** Body text. Use "\n\n" to separate paragraphs — the renderer splits them. */
  body: Bilingual;
};

export type BlogFaq = { q: Bilingual; a: Bilingual };

export type BlogPost = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  date: Bilingual;
  /** ISO 8601 publish date (YYYY-MM-DD) used for structured data and sitemaps. */
  dateISO: string;
  /** ISO 8601 last-modified date, when the post was substantially updated. */
  modifiedISO?: string;
  readTime: Bilingual;
  image: string;
  tag: Bilingual;
  metaDescription: Bilingual;
  keywords: string[];
  intro: Bilingual;
  sections: BlogSection[];
  closing?: Bilingual;
  /** Question/answer pairs rendered at the end of the post and emitted as FAQPage structured data. */
  faqs?: BlogFaq[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "our-route-through-guanacaste",
    title: {
      en: "Our route through Guanacaste: what to expect on an ATV tour",
      es: "Nuestra ruta por Guanacaste: qué esperar en un tour de ATV",
    },
    excerpt: {
      en: "From open trails to river crossings and quiet villages — a stop-by-stop look at the route we hand-picked to share the real Guanacaste with our riders.",
      es: "De caminos abiertos a cruces de ríos y pueblos tranquilos — un recorrido parada por parada de la ruta que escogimos a mano para compartir la verdadera Guanacaste.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    dateISO: "2026-04-05",
    modifiedISO: "2026-08-05",
    readTime: { en: "7 min", es: "7 min" },
    image: IMAGES.gallery[0],
    tag: { en: "Trails", es: "Rutas" },
    metaDescription: {
      en: "What to expect on an ATV / UTV tour in Guanacaste, Costa Rica: where the route starts, river crossings, the finca stop, how long it takes and how to book.",
      es: "Qué esperar en un tour de ATV / UTV en Guanacaste, Costa Rica: dónde empieza la ruta, cruces de río, la parada en finca, cuánto dura y cómo reservar.",
    },
    keywords: [
      "ATV trail Guanacaste",
      "Costa Rica off-road route",
      "ATV tour what to expect",
      "ATV tour near Playas del Coco",
      "ATV tour near Playa Hermosa",
      "JYS Adventure route",
      "river crossing ATV Costa Rica",
    ],
    intro: {
      en: "We don't run a long list of routes — we have one, hand-picked over years of riding these hills, and it packs jungle trails, river crossings, open ranch land and a family finca into a single two-hour loop. Here's exactly what the ride looks like, stop by stop, so you know what you're signing up for before you book.",
      es: "No tenemos una lista larga de rutas — tenemos una, escogida a mano tras años de rodar estas colinas, y reúne selva, cruces de río, pampa abierta y una finca familiar en un solo circuito de dos horas. Aquí te contamos exactamente cómo es el recorrido, parada por parada, para que sepas qué esperar antes de reservar.",
    },
    sections: [
      {
        heading: {
          en: "Where does the tour start?",
          es: "¿Dónde empieza el tour?",
        },
        body: {
          en: "Every ride leaves from our base in Sardinal, Guanacaste — about 10–15 minutes inland from Playas del Coco and Playa Hermosa, and roughly 25 minutes from the Papagayo Peninsula hotels. You can drive to us directly, or book hotel pickup: round-trip transport is free from Hotel RIU, and rates from El Coco, Playa Hermosa and Playa Panamá start at $68 for up to 5 riders (13% IVA already included).\n\nThe best part of starting in Sardinal? There's no trailer ride to a distant trailhead. The moment you leave our gate you're already on the kind of rural back roads only locals normally drive.",
          es: "Cada salida parte de nuestra base en Sardinal, Guanacaste — a unos 10–15 minutos tierra adentro de Playas del Coco y Playa Hermosa, y a unos 25 minutos de los hoteles de la Península de Papagayo. Puedes llegar por tu cuenta o reservar recogida en tu hotel: el transporte ida y vuelta es gratis desde el Hotel RIU, y las tarifas desde El Coco, Playa Hermosa y Playa Panamá empiezan en $68 para hasta 5 personas (13% IVA ya incluido).\n\n¿Lo mejor de salir desde Sardinal? No hay que remolcar las máquinas hasta un sendero lejano. Apenas cruzas nuestro portón ya estás en los caminos rurales que normalmente solo manejan los locales.",
        },
      },
      {
        heading: {
          en: "What will you see on the route?",
          es: "¿Qué vas a ver en la ruta?",
        },
        body: {
          en: "In two hours you cross a surprising range of Guanacaste landscapes: open cattle ranch land with volcano views on clear days, shaded jungle sections where howler monkeys are regular company, seasonal river crossings, small villages where life moves at a different pace, and a stop at our family finca.\n\nThis is working countryside, not a theme park loop. You'll pass real farms, wave at real neighbors and ride trails that change with the weather — which is exactly why people tell us it feels like seeing the 'real' Costa Rica.",
          es: "En dos horas cruzas una variedad sorprendente de paisajes guanacastecos: pampa ganadera abierta con vista a los volcanes en días despejados, tramos de selva con sombra donde los monos congo son compañía habitual, cruces de río según la temporada, pueblitos donde la vida va a otro ritmo y una parada en nuestra finca familiar.\n\nEsto es campo de verdad, no un circuito de parque temático. Vas a pasar por fincas reales, saludar a vecinos reales y rodar caminos que cambian con el clima — exactamente por eso la gente nos dice que se siente como ver la Costa Rica 'de verdad'.",
        },
      },
      {
        heading: {
          en: "How long is the ATV tour?",
          es: "¿Cuánto dura el tour de ATV?",
        },
        body: {
          en: "The base ATV and UTV tours last about 2 hours on the trail. Combo tours — ATV + Cabalgata (horseback) or ATV + Canopy (zipline) — run about 4 hours in total. We have three daily departures at 8:00 AM, 11:00 AM and 2:00 PM, and the schedule is flexible: if you need a different start time, write to us and we'll do our best to fit you in.\n\nPlan on arriving about 15 minutes early for the safety briefing, gear fitting and a short practice run before the group heads out.",
          es: "Los tours base de ATV y UTV duran alrededor de 2 horas en el camino. Los combos — ATV + Cabalgata o ATV + Canopy — duran unas 4 horas en total. Tenemos tres salidas diarias: 8:00 AM, 11:00 AM y 2:00 PM, y el horario es flexible: si necesitas otra hora, escríbenos y haremos lo posible por acomodarte.\n\nLlega unos 15 minutos antes para la charla de seguridad, el ajuste del equipo y una pequeña práctica antes de que salga el grupo.",
        },
      },
      {
        heading: {
          en: "Is the route difficult? Do I need experience?",
          es: "¿Es difícil la ruta? ¿Necesito experiencia?",
        },
        body: {
          en: "No experience needed. Most of our riders have never been on an ATV before, and the guide sets a pace that matches the group — comfortable for first-timers, fun for confident riders. The quads are easy to operate and you get a hands-on intro before the tour starts.\n\nWhat you do need: every driver must be 18 or older with a valid driver's license from any country. No license means you ride as a passenger — on an ATV Double (passengers 5+) or in the UTV (passengers 2+).",
          es: "No necesitas experiencia. La mayoría de nuestros riders nunca se han subido a un ATV, y el guía marca un ritmo acorde al grupo — cómodo para principiantes, divertido para quienes ya tienen práctica. Los cuadraciclos son fáciles de manejar y recibes una introducción práctica antes de salir.\n\nLo que sí necesitas: todo conductor debe tener 18 años o más y licencia de conducir vigente de cualquier país. Sin licencia, vas de pasajero — en un ATV Double (pasajeros 5+) o en el UTV (pasajeros 2+).",
        },
      },
      {
        heading: {
          en: "Do you really cross rivers?",
          es: "¿De verdad cruzan ríos?",
        },
        body: {
          en: "Yes — when the season cooperates. In the green season (May to November) the rivers run full and the crossings are the highlight of the ride: water splashing, engines working, everyone grinning. In the dry season (December to April) some crossings shrink to shallow fords, and the trade-off is faster, dustier trails and wide-open views.\n\nOur guides check conditions every morning and never take the group through water that isn't safe to cross.",
          es: "Sí — cuando la temporada lo permite. En la temporada verde (mayo a noviembre) los ríos van llenos y los cruces son el punto alto del recorrido: agua salpicando, motores trabajando y todo el mundo sonriendo. En la temporada seca (diciembre a abril) algunos cruces bajan a vados poco profundos, y a cambio los caminos son más rápidos, con más polvo y vistas abiertas.\n\nNuestros guías revisan las condiciones cada mañana y nunca meten al grupo en un cruce que no sea seguro.",
        },
      },
      {
        heading: {
          en: "What's the finca stop like?",
          es: "¿Cómo es la parada en la finca?",
        },
        body: {
          en: "About midway through the ride we pull into our family finca — a working farm that's been in the family for generations. It's a chance to stretch your legs, take photos, meet whatever animals are around that day and just take in the quiet. Your guide shares a bit of the family history and what farm life in Guanacaste actually looks like.\n\nWhen seasonal fruit is in and we cross paths with it, we love sharing it with our riders — sometimes fresh fruit straight from the road, sometimes a slice of local cake. It's not a printed menu item; it's just how we'd treat a friend who came to visit.",
          es: "A mitad del recorrido entramos a nuestra finca familiar — una finca en producción que lleva generaciones en la familia. Es la oportunidad de estirar las piernas, tomar fotos, conocer los animales que anden por ahí ese día y disfrutar la tranquilidad. El guía cuenta un poco de la historia familiar y de cómo es de verdad la vida de campo en Guanacaste.\n\nCuando hay fruta de temporada y la encontramos en el camino, nos encanta compartirla con los riders — a veces fruta fresca, a veces un pedacito de ponqué local. No es un ítem de menú; es como recibiríamos a un amigo de visita.",
        },
      },
      {
        heading: {
          en: "How does the route change with the seasons?",
          es: "¿Cómo cambia la ruta con las temporadas?",
        },
        body: {
          en: "The route stays the same all year — the experience transforms. Green season: full rivers, lush jungle, mud that makes every corner more entertaining, and dramatic afternoon skies. Dry season: firm fast trails, long views across golden hills, and sunsets that light up the dust.\n\nOur guides adapt the pace and the technical sections to the day's conditions, so the ride is always the best version of itself. Same route, different magic — plenty of guests ride it in both seasons and swear it's two different tours.",
          es: "La ruta es la misma todo el año — la experiencia se transforma. Temporada verde: ríos llenos, selva exuberante, barro que hace cada curva más entretenida y cielos dramáticos por la tarde. Temporada seca: caminos firmes y rápidos, vistas largas sobre colinas doradas y atardeceres que encienden el polvo.\n\nLos guías adaptan el ritmo y los tramos técnicos a las condiciones del día, así que el recorrido siempre es la mejor versión de sí mismo. Misma ruta, otra magia — muchos huéspedes la ruedan en ambas temporadas y juran que son dos tours distintos.",
        },
      },
      {
        heading: {
          en: "How do I book, and what does it cost?",
          es: "¿Cómo reservo y cuánto cuesta?",
        },
        body: {
          en: "The ATV Adventure costs $95 per rider on a Single quad or $105 per Double quad (driver + passenger 5+), tax included. One thing to know: ATV bookings require a minimum of 2 machines per reservation — any mix of Singles and Doubles — and that applies to the ATV combos too. Traveling solo or prefer one vehicle? The UTV Side by Side ($300 for up to 5 riders) can be booked on its own.\n\nBooking is simple: pick your tour, fill in the form and we confirm availability within the hour. No deposit is usually needed — you pay in cash (USD or colones) or by card on the day of the tour. Cancellation is free up to 24 hours before.",
          es: "La Aventura en ATV cuesta $95 por persona en un cuadraciclo Single o $105 por cuadraciclo Double (conductor + pasajero 5+), impuestos incluidos. Algo importante: las reservas de ATV requieren un mínimo de 2 máquinas por reserva — cualquier mezcla de Singles y Doubles — y aplica también para los combos de ATV. ¿Viajas solo o prefieres un solo vehículo? El UTV Side by Side ($300 para hasta 5 personas) sí se puede reservar individualmente.\n\nReservar es simple: elige tu tour, llena el formulario y confirmamos disponibilidad en una hora. Normalmente no se necesita depósito — pagas en efectivo (USD o colones) o con tarjeta el día del tour. La cancelación es gratis hasta 24 horas antes.",
        },
      },
    ],
    closing: {
      en: "Want to ride it? Pick a tour, tell us about your group and we'll take care of the rest — trail conditions, gear, pace and all the little details that make the difference.",
      es: "¿Quieres rodarla? Elige un tour, cuéntanos de tu grupo y nos encargamos del resto — condiciones del camino, equipo, ritmo y todos los detalles que hacen la diferencia.",
    },
    faqs: [
      {
        q: {
          en: "How long is the ATV tour in Guanacaste?",
          es: "¿Cuánto dura el tour de ATV en Guanacaste?",
        },
        a: {
          en: "The base ATV and UTV tours last about 2 hours. Combo tours with horseback (cabalgata) or zipline canopy last about 4 hours total. Departures are at 8:00 AM, 11:00 AM and 2:00 PM.",
          es: "Los tours base de ATV y UTV duran unas 2 horas. Los combos con cabalgata o canopy duran unas 4 horas en total. Las salidas son a las 8:00 AM, 11:00 AM y 2:00 PM.",
        },
      },
      {
        q: {
          en: "Do I need experience to ride an ATV in Costa Rica?",
          es: "¿Necesito experiencia para manejar un ATV en Costa Rica?",
        },
        a: {
          en: "No. Most riders are first-timers. You get a safety briefing and practice before the tour, and the guide sets the pace to the group. Drivers must be 18+ with a valid driver's license from any country.",
          es: "No. La mayoría de los riders son principiantes. Recibes una charla de seguridad y práctica antes del tour, y el guía adapta el ritmo al grupo. Los conductores deben tener 18+ años y licencia vigente de cualquier país.",
        },
      },
      {
        q: {
          en: "Where does the tour leave from?",
          es: "¿De dónde sale el tour?",
        },
        a: {
          en: "From our base in Sardinal, Guanacaste — 10–15 minutes from Playas del Coco and Playa Hermosa. Hotel pickup is available: free from Hotel RIU, from $68 for up to 5 riders from El Coco, Playa Hermosa and Playa Panamá.",
          es: "De nuestra base en Sardinal, Guanacaste — a 10–15 minutos de Playas del Coco y Playa Hermosa. Hay recogida en hoteles: gratis desde el Hotel RIU, y desde $68 para hasta 5 personas desde El Coco, Playa Hermosa y Playa Panamá.",
        },
      },
      {
        q: {
          en: "Can I book just one ATV?",
          es: "¿Puedo reservar un solo ATV?",
        },
        a: {
          en: "No — ATV bookings require a minimum of 2 machines per reservation (any mix of Single and Double), including on combo tours. The UTV Side by Side can be booked as a single vehicle.",
          es: "No — las reservas de ATV requieren un mínimo de 2 máquinas (cualquier mezcla de Single y Double), incluso en los combos. El UTV Side by Side sí se puede reservar como vehículo único.",
        },
      },
      {
        q: {
          en: "Does the tour run if it rains?",
          es: "¿El tour sale si llueve?",
        },
        a: {
          en: "Almost always — rain is part of the jungle experience. We only cancel for genuinely unsafe conditions, and in that case you get a full refund or a free reschedule.",
          es: "Casi siempre — la lluvia es parte de la experiencia. Solo cancelamos por condiciones realmente inseguras, y en ese caso recibes reembolso completo o reprogramación gratis.",
        },
      },
    ],
  },
  {
    slug: "atv-vs-utv-which-ride",
    title: {
      en: "ATV vs UTV: which ride is right for your crew?",
      es: "ATV vs UTV: ¿cuál es para tu grupo?",
    },
    excerpt: {
      en: "Quad or side-by-side? A complete guide to choosing the right vehicle for your Costa Rica adventure — by group size, ages, budget and riding style.",
      es: "¿Cuadraciclo o side-by-side? Una guía completa para elegir el vehículo correcto para tu aventura en Costa Rica — según tamaño de grupo, edades, presupuesto y estilo.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    dateISO: "2026-04-08",
    modifiedISO: "2026-08-05",
    readTime: { en: "7 min", es: "7 min" },
    image: IMAGES.gallery[2],
    tag: { en: "Guide", es: "Guía" },
    metaDescription: {
      en: "ATV or UTV in Costa Rica? Full comparison: differences, prices, ages, license rules, safety and which to pick by group — plus the 2-ATV minimum explained.",
      es: "¿ATV o UTV en Costa Rica? Comparación completa: diferencias, precios, edades, licencia, seguridad y cuál elegir según tu grupo — y el mínimo de 2 ATVs explicado.",
    },
    keywords: [
      "ATV vs UTV",
      "difference between ATV and UTV",
      "UTV Costa Rica",
      "side by side tour Guanacaste",
      "quad vs side by side",
      "ATV Guanacaste guide",
      "family UTV tour Costa Rica",
    ],
    intro: {
      en: "Quick answer: pick the ATV if you want hands-on riding and everyone in your group is comfortable driving or riding 2-up; pick the UTV if you're bringing small kids, mixed ages or anyone who'd rather sit back with a seatbelt. Both vehicles ride the exact same trails with the same guide — so the choice comes down to your crew, not the terrain. Here's the full breakdown.",
      es: "Respuesta rápida: elige el ATV si quieres manejar tú mismo y todo tu grupo se siente cómodo conduciendo o yendo de a dos; elige el UTV si traes niños pequeños, edades mixtas o alguien que prefiera ir sentado con cinturón. Ambos vehículos recorren exactamente los mismos caminos con el mismo guía — así que la decisión depende de tu grupo, no del terreno. Aquí va la comparación completa.",
    },
    sections: [
      {
        heading: {
          en: "What's the difference between an ATV and a UTV?",
          es: "¿Cuál es la diferencia entre un ATV y un UTV?",
        },
        body: {
          en: "An ATV (all-terrain vehicle, also called a quad) is a motorcycle-style machine you straddle and steer with handlebars — 1 rider on a Single, or driver plus one passenger on a Double. A UTV (utility task vehicle, also called a side-by-side or buggy) is more like a small open jeep: car-style seats for up to 5 people, a steering wheel, seatbelts, a roll cage and a roof.\n\nIn short: the ATV is the more physical, hands-on ride; the UTV is the more comfortable, social one. Same trails, same mud, same river crossings — different way of experiencing them.",
          es: "Un ATV (vehículo todo terreno, o cuadraciclo) es una máquina estilo moto que montas a horcajadas y diriges con manillar — 1 persona en un Single, o conductor más un pasajero en un Double. Un UTV (también side-by-side o buggy) es más como un pequeño jeep abierto: asientos tipo carro para hasta 5 personas, volante, cinturones, barras antivuelco y techo.\n\nEn resumen: el ATV es la experiencia más física y directa; el UTV es la más cómoda y social. Mismos caminos, mismo barro, mismos cruces de río — otra forma de vivirlos.",
        },
      },
      {
        heading: {
          en: "Who can drive, and who can ride along?",
          es: "¿Quién puede manejar y quién puede ir de pasajero?",
        },
        body: {
          en: "The rules are the same for both vehicles: every driver must be 18 or older with a valid driver's license from any country, in any language. No international permit needed — your regular license works as long as it's valid and has your photo.\n\nPassenger ages differ: on an ATV Double, passengers must be at least 5 years old. In the UTV, kids from 2 years old can ride, and baby seats are available on request. Anyone without a license — teens included — joins as a passenger.",
          es: "Las reglas son iguales para ambos vehículos: todo conductor debe tener 18 años o más y licencia de conducir vigente de cualquier país, en cualquier idioma. No se necesita permiso internacional — tu licencia normal sirve mientras esté vigente y tenga foto.\n\nLas edades de pasajeros cambian: en un ATV Double, los pasajeros deben tener al menos 5 años. En el UTV pueden ir niños desde los 2 años, y hay sillas de bebé bajo pedido. Quien no tenga licencia — adolescentes incluidos — va de pasajero.",
        },
      },
      {
        heading: {
          en: "Pick an ATV (Single or Double) if…",
          es: "Elige un ATV (Single o Double) si…",
        },
        body: {
          en: "You want the throttle in your own hand. The ATV is for riders who want to feel the trail — leaning into corners, powering through river crossings, picking their own line in the mud. Singles give every rider full control; Doubles let a licensed driver share the machine with a passenger aged 5+, which is great for couples and parents with a kid or teen.\n\nOne key booking rule: ATV reservations require a minimum of 2 machines (any mix of Singles and Doubles), and this applies to the ATV combo tours too. So a lone Single or a lone Double can't go out by itself — think two Singles, a Single plus a Double, two Doubles, and so on.",
          es: "Quieres el acelerador en tu propia mano. El ATV es para quienes quieren sentir el camino — inclinarse en las curvas, acelerar en los cruces de río, elegir su propia línea en el barro. El Single da control total a cada rider; el Double permite que un conductor con licencia comparta la máquina con un pasajero de 5+ años, ideal para parejas y papás con un niño o adolescente.\n\nUna regla clave al reservar: las reservas de ATV requieren un mínimo de 2 máquinas (cualquier mezcla de Singles y Doubles), y aplica también para los combos de ATV. Es decir, un Single solo o un Double solo no puede salir por sí mismo — piensa en dos Singles, un Single más un Double, dos Doubles, etc.",
        },
      },
      {
        heading: {
          en: "Pick a UTV (Side-by-Side) if…",
          es: "Elige un UTV (Side-by-Side) si…",
        },
        body: {
          en: "You're travelling with kids from 2+, mixed ages, grandparents, or anyone who'd rather enjoy the view from a proper seat with a seatbelt and a roll cage overhead. Up to 5 riders share one vehicle (we recommend 4 for all-adult groups, for extra comfort), so the whole family experiences the trail together — pointing out monkeys, laughing through the splashes, no one left out.\n\nThe UTV is also the answer for solo travelers and couples who want a single vehicle: unlike the ATVs, the UTV can be booked on its own with no minimum-machine rule.",
          es: "Viajas con niños desde 2+, edades mixtas, abuelos o alguien que prefiera disfrutar la vista desde un asiento de verdad, con cinturón y barras antivuelco. Hasta 5 personas comparten un vehículo (recomendamos 4 si son todos adultos, para mayor comodidad), así que toda la familia vive el camino junta — señalando monos, riéndose con las salpicadas, sin que nadie quede fuera.\n\nEl UTV también es la respuesta para quienes viajan solos o en pareja y quieren un solo vehículo: a diferencia de los ATVs, el UTV se puede reservar individualmente, sin regla de mínimo de máquinas.",
        },
      },
      {
        heading: {
          en: "How much does each one cost?",
          es: "¿Cuánto cuesta cada uno?",
        },
        body: {
          en: "All prices include Costa Rica's 13% IVA. The ATV Adventure runs $95 per Single (1 rider) and $105 per Double quad (2 riders — that's about $53 per person). The UTV is $300 per vehicle for up to 5 riders, which works out to as little as $60 per person with a full crew.\n\nOn combos: ATV + Cabalgata is $150 (Single) / $195 (Double); ATV + Canopy is $165 (Single) / $205 (Double) with Congo Trail. The UTV combos keep the $339 vehicle price and add the activity per person — $45 for the cabalgata, $40 for the canopy.",
          es: "Todos los precios incluyen el 13% de IVA. La Aventura en ATV cuesta $95 por Single (1 persona) y $105 por cuadraciclo Double (2 personas — sale a unos $53 por persona). El UTV cuesta $300 por vehículo para hasta 5 personas, lo que puede salir en apenas $60 por persona con el vehículo lleno.\n\nEn los combos: ATV + Cabalgata cuesta $150 (Single) / $195 (Double); ATV + Canopy cuesta $165 (Single) / $205 (Double) con Congo Trail. Los combos de UTV mantienen los $339 del vehículo y suman la actividad por persona — $45 la cabalgata, $40 el canopy.",
        },
      },
      {
        heading: {
          en: "Which one is safer?",
          es: "¿Cuál es más seguro?",
        },
        body: {
          en: "Both are guided tours on a route our team rides every single day, with helmets and goggles included, vehicles inspected before every departure and a bilingual guide setting a pace that matches the least experienced rider in the group.\n\nThat said, the UTV adds passive protection the ATV can't: seatbelts, a roll cage and a roof. That's why it's our recommendation for small children, older riders and anyone nervous about balance. On the ATV, safety comes from the briefing, the pace and your own attention — thousands of first-timers do it every year without trouble.",
          es: "Ambos son tours guiados en una ruta que nuestro equipo rueda todos los días, con casco y goggles incluidos, vehículos inspeccionados antes de cada salida y un guía bilingüe que marca el ritmo según el rider con menos experiencia del grupo.\n\nDicho eso, el UTV suma protección pasiva que el ATV no tiene: cinturones, barras antivuelco y techo. Por eso es nuestra recomendación para niños pequeños, personas mayores y quien sienta nervios por el equilibrio. En el ATV, la seguridad viene de la charla previa, el ritmo y tu propia atención — miles de principiantes lo hacen cada año sin problema.",
        },
      },
      {
        heading: {
          en: "Can we mix ATVs and UTVs in one group?",
          es: "¿Podemos mezclar ATVs y UTVs en un mismo grupo?",
        },
        body: {
          en: "Yes — and it's what most bigger groups end up doing. A classic setup: kids and parents in the UTV, the adrenaline crew solo on quads, everyone on the same trail with the same guide, regrouping at the finca and the viewpoints for photos.\n\nIf you're planning a mixed group, tell us the ages and preferences when you book (or message us on WhatsApp) and we'll suggest the best combination of vehicles for your crew.",
          es: "Sí — y es lo que terminan haciendo la mayoría de los grupos grandes. Una configuración clásica: niños y papás en el UTV, los de la adrenalina solos en cuadraciclos, todos en el mismo camino con el mismo guía, reagrupándose en la finca y los miradores para las fotos.\n\nSi planeas un grupo mixto, cuéntanos las edades y preferencias al reservar (o escríbenos por WhatsApp) y te sugerimos la mejor combinación de vehículos para tu grupo.",
        },
      },
      {
        heading: {
          en: "What if I'm traveling solo?",
          es: "¿Y si viajo solo?",
        },
        body: {
          en: "Because ATV bookings need a minimum of 2 machines, a solo traveler can't reserve a single quad on its own. Your best options: book the UTV (it goes out as a single vehicle), or write to us on WhatsApp — depending on the day's schedule we may be able to help you find a departure to join.",
          es: "Como las reservas de ATV requieren mínimo 2 máquinas, quien viaja solo no puede reservar un único cuadraciclo. Tus mejores opciones: reservar el UTV (sale como vehículo único), o escribirnos por WhatsApp — según la agenda del día, podemos ayudarte a encontrar una salida a la cual unirte.",
        },
      },
    ],
    closing: {
      en: "Still not sure? Message us with your group's ages and we'll suggest the best mix — no pressure, just honest advice from people who ride these trails daily.",
      es: "¿Aún con dudas? Escríbenos con las edades de tu grupo y te sugerimos la mejor combinación — sin presión, solo el consejo honesto de quienes ruedan estos caminos a diario.",
    },
    faqs: [
      {
        q: {
          en: "What is the difference between an ATV and a UTV?",
          es: "¿Cuál es la diferencia entre un ATV y un UTV?",
        },
        a: {
          en: "An ATV (quad) is a handlebar-steered machine for 1–2 riders. A UTV (side-by-side) has car-style seats for up to 5, a steering wheel, seatbelts, a roll cage and a roof. Both ride the same trails on our tours.",
          es: "Un ATV (cuadraciclo) se maneja con manillar y lleva 1–2 personas. Un UTV (side-by-side) tiene asientos tipo carro para hasta 5, volante, cinturones, barras antivuelco y techo. Ambos recorren los mismos caminos en nuestros tours.",
        },
      },
      {
        q: {
          en: "Do I need a driver's license for an ATV or UTV tour?",
          es: "¿Necesito licencia para un tour de ATV o UTV?",
        },
        a: {
          en: "Yes — all drivers must be 18+ with a valid driver's license from any country. Riders without a license can join as passengers (5+ on an ATV Double, 2+ in the UTV).",
          es: "Sí — todos los conductores deben tener 18+ y licencia vigente de cualquier país. Quien no tenga licencia puede ir de pasajero (5+ en ATV Double, 2+ en el UTV).",
        },
      },
      {
        q: {
          en: "Can I book a single ATV?",
          es: "¿Puedo reservar un solo ATV?",
        },
        a: {
          en: "No — ATV bookings (including combos) require a minimum of 2 machines per reservation, in any mix of Singles and Doubles. The UTV can be booked on its own.",
          es: "No — las reservas de ATV (incluidos los combos) requieren un mínimo de 2 máquinas, en cualquier mezcla de Singles y Doubles. El UTV sí se puede reservar solo.",
        },
      },
      {
        q: {
          en: "Which is better for families with small kids?",
          es: "¿Cuál es mejor para familias con niños pequeños?",
        },
        a: {
          en: "The UTV — kids from 2 years old can ride with seatbelts, roll cage and roof, and up to 5 people share one vehicle. On ATV Doubles, passengers must be at least 5 years old.",
          es: "El UTV — niños desde los 2 años pueden ir con cinturón, barras antivuelco y techo, y hasta 5 personas comparten un vehículo. En los ATV Double, los pasajeros deben tener al menos 5 años.",
        },
      },
      {
        q: {
          en: "How much do the tours cost?",
          es: "¿Cuánto cuestan los tours?",
        },
        a: {
          en: "ATV: $95 per Single, $105 per Double quad. UTV: $300 per vehicle for up to 5 riders. Combos add horseback or canopy — see each tour page for exact pricing. All prices include 13% IVA.",
          es: "ATV: $95 por Single, $105 por cuadraciclo Double. UTV: $300 por vehículo para hasta 5 personas. Los combos suman cabalgata o canopy — mira cada página de tour para el precio exacto. Todos los precios incluyen 13% de IVA.",
        },
      },
    ],
  },
  {
    slug: "what-to-wear-off-road-costa-rica",
    title: {
      en: "What to wear on an off-road tour in Costa Rica",
      es: "Qué ponerse para un tour todoterreno en Costa Rica",
    },
    excerpt: {
      en: "Shoes, clothing, sunscreen, season-by-season packing and the one thing most riders forget. The complete list from guides who ride every day.",
      es: "Zapatos, ropa, protector solar, empaque por temporada y lo único que la mayoría olvida. La lista completa de guías que ruedan todos los días.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    dateISO: "2026-04-12",
    modifiedISO: "2026-08-05",
    readTime: { en: "6 min", es: "6 min" },
    image: IMAGES.gallery[4],
    tag: { en: "Tips", es: "Consejos" },
    metaDescription: {
      en: "What to wear and bring on an ATV or UTV tour in Guanacaste, Costa Rica — shoes, clothing by season, sunscreen, what we provide and what first-timers forget.",
      es: "Qué ponerse y qué llevar a un tour de ATV o UTV en Guanacaste, Costa Rica — zapatos, ropa por temporada, protector solar, qué incluimos y qué olvidan los principiantes.",
    },
    keywords: [
      "what to wear ATV Costa Rica",
      "ATV tour packing list",
      "what to bring ATV tour",
      "can I wear sandals on ATV tour",
      "Guanacaste off-road tips",
      "ATV tour clothes",
    ],
    intro: {
      en: "The short version: closed-toe shoes, clothes you don't mind getting dirty, sunscreen and a change of clothes for afterwards. Dust, sun, river crossings and shaded jungle — Guanacaste throws all of it at you in one two-hour ride, and what you wear makes a real difference to how much fun you have. Here's the complete list, straight from guides who gear up for this trail every single day.",
      es: "La versión corta: zapato cerrado, ropa que no te importe ensuciar, protector solar y una muda para después. Polvo, sol, cruces de río y selva con sombra — Guanacaste te tira todo eso en un recorrido de dos horas, y lo que llevas puesto hace una diferencia real en cuánto lo disfrutas. Aquí está la lista completa, directo de guías que se equipan para este camino todos los días.",
    },
    sections: [
      {
        heading: {
          en: "What shoes should I wear? (No sandals!)",
          es: "¿Qué zapatos me pongo? (¡Nada de sandalias!)",
        },
        body: {
          en: "Closed-toe shoes are non-negotiable — sneakers, trail runners or light hiking shoes are all perfect. Your feet sit close to hot engine parts and flying pebbles on the ATV, and you'll be stepping in and out on uneven ground at every stop.\n\nFlip-flops, sandals and Crocs don't work: they slip off the footpegs, offer zero protection and tend to disappear into the first river crossing. If sneakers are all you packed for the beach trip, they're exactly right — just accept they'll pick up some honest Guanacaste dust.",
          es: "El zapato cerrado no es negociable — tenis, zapatillas de trail o zapatos livianos de senderismo son perfectos. En el ATV tus pies van cerca de partes calientes del motor y de piedritas que saltan, y en cada parada caminas sobre terreno irregular.\n\nLas chanclas, sandalias y Crocs no sirven: se resbalan de los estribos, no protegen nada y suelen desaparecer en el primer cruce de río. Si solo trajiste tenis para tu viaje de playa, son exactamente lo correcto — solo acepta que se llevarán un poco de honesto polvo guanacasteco.",
        },
      },
      {
        heading: {
          en: "What clothes work best?",
          es: "¿Qué ropa funciona mejor?",
        },
        body: {
          en: "Comfortable shorts or light pants and a t-shirt you don't mind getting muddy — that's it. Athletic or quick-dry fabric beats cotton if you have it, since it dries fast after river splashes. Long sleeves are worth considering if you burn easily: two hours of tropical sun adds up even on cloudy days.\n\nSkip anything white or precious. The trail's red dust and brown mud have strong opinions about light-colored clothing, and those stains are souvenirs that never leave.",
          es: "Shorts cómodos o pantalón liviano y una camiseta que no te importe enlodar — eso es todo. La tela deportiva o de secado rápido le gana al algodón si la tienes, porque seca rápido tras las salpicadas del río. La manga larga vale la pena si te quemas fácil: dos horas de sol tropical suman incluso en días nublados.\n\nEvita lo blanco y lo delicado. El polvo rojo y el barro del camino tienen opiniones fuertes sobre la ropa clara, y esas manchas son recuerdos que nunca se van.",
        },
      },
      {
        heading: {
          en: "Sun protection: what you actually need",
          es: "Protección solar: lo que de verdad necesitas",
        },
        body: {
          en: "Sunscreen on every exposed bit of skin — apply it before the tour starts, because you won't want to stop mid-trail. If you're combining the ride with a beach day, go reef-safe. Sunglasses do double duty against sun and dust (we also provide goggles), and a cap or hat keeps the sun off at the stops.\n\nGuanacaste's UV index is high year-round, dry season and green season alike. The riders who skip sunscreen are easy to spot at dinner that night.",
          es: "Protector solar en cada zona de piel expuesta — aplícalo antes de salir, porque no vas a querer parar a mitad del camino. Si combinas el tour con un día de playa, que sea reef-safe. Las gafas de sol cumplen doble función contra sol y polvo (también damos goggles), y una gorra o sombrero te cubre en las paradas.\n\nEl índice UV de Guanacaste es alto todo el año, en seca y en verde por igual. A los riders que se saltan el protector se les nota en la cena esa misma noche.",
        },
      },
      {
        heading: {
          en: "What does the tour provide?",
          es: "¿Qué incluye el tour?",
        },
        body: {
          en: "Every tour includes a helmet, goggles, bottled water, fuel and a bilingual guide — you don't need to bring or rent any riding gear. Helmets come in all sizes, including kids' sizes for the UTV and Double passengers.\n\nWant extra dust protection? A bandana add-on is available for $10 when you book — worth it in the dry season, when the rider in front of you writes their signature in dust.",
          es: "Cada tour incluye casco, goggles, agua embotellada, combustible y guía bilingüe — no necesitas traer ni alquilar equipo. Hay cascos de todas las tallas, incluidas tallas de niños para el UTV y los pasajeros del Double.\n\n¿Quieres protección extra contra el polvo? Hay bandanas por $10 al reservar — valen la pena en temporada seca, cuando el rider de adelante firma su nombre en el polvo.",
        },
      },
      {
        heading: {
          en: "Can I bring my phone or camera?",
          es: "¿Puedo llevar el celular o la cámara?",
        },
        body: {
          en: "Yes — and good news: your guide takes photos of the group along the trail and shares them at the end, so you're covered even if your phone stays pocketed. If you do bring it, use a wrist strap, a zippered pocket or a waterproof pouch; the combination of bumps and river crossings has claimed a few unsecured phones over the years.\n\nGoPros are welcome, especially chest or helmet mounted. Drones: message us first so we can tell you where flying is okay along the route.",
          es: "Sí — y buenas noticias: el guía toma fotos del grupo a lo largo del camino y te las comparte al final, así que estás cubierto aunque el celular no salga del bolsillo. Si lo llevas, usa correa de muñeca, bolsillo con cierre o bolsa impermeable; la combinación de brincos y cruces de río se ha cobrado varios celulares sueltos con los años.\n\nLas GoPro son bienvenidas, sobre todo montadas en pecho o casco. ¿Drones? Escríbenos antes para decirte dónde se puede volar en la ruta.",
        },
      },
      {
        heading: {
          en: "Packing by season: dry vs green",
          es: "Empaque por temporada: seca vs verde",
        },
        body: {
          en: "Dry season (December–April): dust is the theme. Sunglasses or goggles at all times, consider the bandana, and bring lip balm — the wind and dust dry you out fast. Trails are fast and firm, so any closed shoe works.\n\nGreen season (May–November): mud and splashes are the fun. Quick-dry clothing earns its keep, a light rain layer is smart for afternoon departures, and shoes with some grip beat smooth soles. Rivers run full, so assume you'll get at least a little wet — that's the good part.",
          es: "Temporada seca (diciembre–abril): el tema es el polvo. Gafas o goggles todo el tiempo, considera la bandana y trae bálsamo labial — el viento y el polvo resecan rápido. Los caminos van firmes y rápidos, así que cualquier zapato cerrado sirve.\n\nTemporada verde (mayo–noviembre): el barro y las salpicadas son la diversión. La ropa de secado rápido se gana su lugar, una capa liviana de lluvia es inteligente para las salidas de la tarde, y un zapato con agarre le gana a la suela lisa. Los ríos van llenos, así que asume que te vas a mojar al menos un poco — esa es la parte buena.",
        },
      },
      {
        heading: {
          en: "The one thing people always forget",
          es: "Lo único que la gente siempre olvida",
        },
        body: {
          en: "A change of clothes and a small towel, left in your car or with your things at the base. After two hours of dust or mud, a dry shirt for the ride back to the hotel feels like a luxury — and if you're heading to lunch or the beach afterwards, you'll be very glad you planned ahead.\n\nSecond most forgotten: a hair tie. Helmets plus wind have strong opinions about loose hair.",
          es: "Una muda de ropa y una toalla pequeña, dejadas en el carro o con tus cosas en la base. Después de dos horas de polvo o barro, una camiseta seca para el regreso al hotel se siente un lujo — y si después vas a almorzar o a la playa, vas a agradecer haberlo pensado.\n\nLo segundo más olvidado: una liga para el pelo. Los cascos más el viento tienen opiniones fuertes sobre el pelo suelto.",
        },
      },
    ],
    closing: {
      en: "That's the whole list: closed shoes, expendable clothes, sunscreen, a secured phone and a dry change for after. Everything else — helmet, goggles, water, photos — is on us.",
      es: "Esa es toda la lista: zapato cerrado, ropa sacrificable, protector solar, celular asegurado y una muda seca para después. Todo lo demás — casco, goggles, agua, fotos — corre por nuestra cuenta.",
    },
    faqs: [
      {
        q: {
          en: "Can I wear sandals on an ATV tour?",
          es: "¿Puedo usar sandalias en un tour de ATV?",
        },
        a: {
          en: "No — closed-toe shoes are required. Sneakers, trail runners or light hiking shoes all work. Sandals and flip-flops slip off the footpegs and offer no protection.",
          es: "No — se requiere zapato cerrado. Tenis, zapatillas de trail o zapatos livianos de senderismo funcionan. Las sandalias y chanclas se resbalan de los estribos y no protegen.",
        },
      },
      {
        q: {
          en: "Do you provide helmets and goggles?",
          es: "¿Dan casco y goggles?",
        },
        a: {
          en: "Yes — every tour includes helmet, goggles, bottled water, fuel and a bilingual guide, with helmet sizes for kids too. A bandana add-on is available for $10 for extra dust protection.",
          es: "Sí — cada tour incluye casco, goggles, agua embotellada, combustible y guía bilingüe, con tallas de casco para niños. Hay bandanas opcionales por $10 para protección extra contra el polvo.",
        },
      },
      {
        q: {
          en: "Will I get dirty on the tour?",
          es: "¿Me voy a ensuciar en el tour?",
        },
        a: {
          en: "Almost certainly — dust in the dry season, mud and river splashes in the green season. Wear clothes you don't mind staining and bring a change of clothes for afterwards.",
          es: "Casi seguro — polvo en la temporada seca, barro y salpicadas de río en la verde. Usa ropa que no te importe manchar y trae una muda para después.",
        },
      },
      {
        q: {
          en: "Can I bring my phone on the ride?",
          es: "¿Puedo llevar el celular en el recorrido?",
        },
        a: {
          en: "Yes, secured with a wrist strap, zippered pocket or waterproof pouch. Your guide also takes photos of the group during the tour and shares them at the end.",
          es: "Sí, asegurado con correa, bolsillo con cierre o bolsa impermeable. El guía además toma fotos del grupo durante el tour y las comparte al final.",
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
      en: "Ages, safety setup, pricing and honest tips from parents — everything you need to plan your kid's first off-road adventure in Costa Rica.",
      es: "Edades, seguridad, precios y consejos honestos de otros papás — todo lo que necesitas para planear la primera aventura todoterreno de tu hijo en Costa Rica.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    dateISO: "2026-04-16",
    modifiedISO: "2026-08-05",
    readTime: { en: "6 min", es: "6 min" },
    image: IMAGES.gallery[5],
    tag: { en: "Family", es: "Familia" },
    metaDescription: {
      en: "Family UTV tours in Guanacaste, Costa Rica — kids from 2 years old, safety gear, baby seats, family pricing and tips to make a first off-road ride unforgettable.",
      es: "Tours familiares en UTV en Guanacaste, Costa Rica — niños desde 2 años, equipo de seguridad, sillas de bebé, precios familiares y consejos para un primer tour inolvidable.",
    },
    keywords: [
      "family UTV Costa Rica",
      "ATV with kids Guanacaste",
      "kid-friendly tour Costa Rica",
      "things to do with kids Guanacaste",
      "UTV tour minimum age",
      "family activities Playas del Coco",
    ],
    intro: {
      en: "Yes, kids can absolutely do an off-road tour in Costa Rica — from as young as 2 years old in our UTV, with seatbelts, a roll cage, kid-sized helmets and a guide who paces the whole ride to the youngest person in the group. Here's everything parents ask us before booking, answered honestly.",
      es: "Sí, los niños definitivamente pueden hacer un tour todoterreno en Costa Rica — desde los 2 años en nuestro UTV, con cinturones, barras antivuelco, cascos de talla infantil y un guía que adapta todo el recorrido al integrante más pequeño del grupo. Aquí respondemos con honestidad todo lo que los papás nos preguntan antes de reservar.",
    },
    sections: [
      {
        heading: {
          en: "What ages can join the tour?",
          es: "¿Desde qué edad pueden ir los niños?",
        },
        body: {
          en: "Kids from 2 years old ride as passengers in the UTV — that's the family vehicle, with proper seats, seatbelts and a roof. On ATV Doubles, passengers must be at least 5 years old and ride behind a licensed adult driver. Driving is 18+ with a valid license, no exceptions — so teens ride as passengers even if they drive at home.\n\nIf your group has a wide age spread — say, a 3-year-old, two teens and grandparents — the classic answer is a UTV for the little ones and their adults, plus ATVs for anyone who wants their own machine. Same trail, same guide, everyone together.",
          es: "Los niños desde los 2 años van como pasajeros en el UTV — el vehículo familiar, con asientos de verdad, cinturones y techo. En los ATV Double, los pasajeros deben tener al menos 5 años y van detrás de un conductor adulto con licencia. Manejar es desde los 18 con licencia vigente, sin excepciones — así que los adolescentes van de pasajeros aunque manejen en su país.\n\nSi tu grupo tiene edades muy variadas — digamos, un niño de 3, dos adolescentes y los abuelos — la respuesta clásica es un UTV para los pequeños y sus adultos, más ATVs para quien quiera su propia máquina. Mismo camino, mismo guía, todos juntos.",
        },
      },
      {
        heading: {
          en: "How do you keep kids safe?",
          es: "¿Cómo mantienen seguros a los niños?",
        },
        body: {
          en: "Layer by layer: the UTV itself has seatbelts for every seat, a full roll cage and a roof. We stock helmets in every kid size and fit them properly before departure. Baby seats are available on request — just mention your child's age when you book. And the guide adjusts speed, line choice and the length of stops to the youngest rider in the group.\n\nVehicles are inspected before every single departure, and our guides ride this exact route every day — they know each puddle, rut and river crossing personally.",
          es: "Capa por capa: el UTV en sí tiene cinturones en cada asiento, barras antivuelco completas y techo. Tenemos cascos en todas las tallas infantiles y los ajustamos bien antes de salir. Hay sillas de bebé bajo pedido — solo menciona la edad de tu hijo al reservar. Y el guía ajusta velocidad, trazada y duración de las paradas según el rider más pequeño del grupo.\n\nLos vehículos se inspeccionan antes de cada salida, y nuestros guías ruedan esta ruta exacta todos los días — conocen cada charco, hueco y cruce de río personalmente.",
        },
      },
      {
        heading: {
          en: "What is the ride actually like for kids?",
          es: "¿Cómo es realmente el recorrido para los niños?",
        },
        body: {
          en: "Think of it as a two-hour safari with better sound effects. Kids get river splashes, bumpy jungle sections that feel like a rollercoaster at kid-speed, howler monkeys in the trees, cows and horses along the road, and a finca stop where they can stretch their legs and meet whatever animals are around.\n\nThe pattern parents describe is almost universal: slightly nervous for the first five minutes, then by the first river crossing they're laughing, and by the end they're asking to do it again tomorrow.",
          es: "Piénsalo como un safari de dos horas con mejores efectos de sonido. Los niños tienen salpicadas de río, tramos de selva movidos que se sienten como montaña rusa a velocidad de niño, monos congo en los árboles, vacas y caballos junto al camino, y una parada en la finca donde estiran las piernas y conocen los animales que anden por ahí.\n\nEl patrón que describen los papás es casi universal: algo nerviosos los primeros cinco minutos, riéndose para el primer cruce de río, y al final pidiendo repetir mañana.",
        },
      },
      {
        heading: {
          en: "How much does a family tour cost?",
          es: "¿Cuánto cuesta un tour familiar?",
        },
        body: {
          en: "The UTV is priced per vehicle, not per person: $300 (tax included) for up to 5 riders. For a family of four, that's $75 per person; a full crew of five brings it down to $60 each. For all-adult groups we suggest 4 per UTV for comfort, but with kids in the mix, five fit happily.\n\nWant to make a half-day of it? The UTV + Cabalgata combo adds a guided horseback finca ride at $45 per person, and UTV + Canopy adds a zipline tour at $40 per person, both on top of the $339 vehicle price.",
          es: "El UTV se cobra por vehículo, no por persona: $300 (impuestos incluidos) para hasta 5 personas. Para una familia de cuatro, eso da $75 por persona; con cinco a bordo baja a $60 cada uno. Para grupos de solo adultos sugerimos 4 por UTV por comodidad, pero con niños en la mezcla, cinco van felices.\n\n¿Quieres hacerlo de medio día? El combo UTV + Cabalgata suma una cabalgata guiada por la finca a $45 por persona, y UTV + Canopy suma un tour de canopy a $40 por persona, ambos sobre los $339 del vehículo.",
        },
      },
      {
        heading: {
          en: "Tips from parents who've done it",
          es: "Consejos de papás que ya lo hicieron",
        },
        body: {
          en: "Book the 8:00 AM departure — it's cooler, the light is beautiful and kids are at their best early. Bring a phone with a wrist strap for photos (your guide takes group photos too, so you can also just enjoy the ride). Pack a change of clothes per kid; someone always finds the mud. Snacks for the car ride back never hurt.\n\nAnd tell us the kids' ages when you book — it lets us prep the right helmets and seats before you arrive, so the start is smooth instead of a fitting session.",
          es: "Reserva la salida de 8:00 AM — hace más fresco, la luz es preciosa y los niños están en su mejor momento temprano. Lleva un celular con correa para fotos (el guía también toma fotos del grupo, así que puedes simplemente disfrutar). Empaca una muda por niño; siempre hay alguien que encuentra el barro. Y unos snacks para el regreso nunca sobran.\n\nCuéntanos las edades de los niños al reservar — así preparamos los cascos y sillas correctos antes de que lleguen, y el arranque es fluido en vez de una sesión de tallaje.",
        },
      },
      {
        heading: {
          en: "What about families who want ATVs too?",
          es: "¿Y las familias que también quieren ATVs?",
        },
        body: {
          en: "Very common — parents in the UTV with the little ones, older teens and adults on quads. Remember that ATV bookings need a minimum of 2 machines (any mix of Singles and Doubles), and every ATV driver needs to be 18+ with a license. Kids 5+ can ride as ATV Double passengers if they prefer the open-air option over the UTV.\n\nMixed bookings are easy to set up in the booking form: pick your tour, add the UTV riders and the ATVs, and the total updates as you go.",
          es: "Muy común — papás en el UTV con los pequeños, adolescentes mayores y adultos en cuadraciclos. Recuerda que las reservas de ATV requieren mínimo 2 máquinas (cualquier mezcla de Single y Double), y todo conductor de ATV debe tener 18+ y licencia. Los niños de 5+ pueden ir de pasajeros en un ATV Double si prefieren la opción al aire libre sobre el UTV.\n\nLas reservas mixtas son fáciles en el formulario: elige el tour, agrega las personas del UTV y los ATVs, y el total se actualiza al instante.",
        },
      },
    ],
    closing: {
      en: "Tell us your kids' ages when you book and we'll have the right helmets, seats and pace ready — first off-road memories are kind of our specialty.",
      es: "Cuéntanos las edades de tus niños al reservar y tendremos listos los cascos, las sillas y el ritmo correcto — los primeros recuerdos todoterreno son un poco nuestra especialidad.",
    },
    faqs: [
      {
        q: {
          en: "What is the minimum age for the UTV tour?",
          es: "¿Cuál es la edad mínima para el tour en UTV?",
        },
        a: {
          en: "Kids from 2 years old can ride as passengers in the UTV, which has seatbelts, a roll cage and a roof. Baby seats are available on request.",
          es: "Los niños desde los 2 años pueden ir como pasajeros en el UTV, que tiene cinturones, barras antivuelco y techo. Hay sillas de bebé bajo pedido.",
        },
      },
      {
        q: {
          en: "Can a teenager drive an ATV or UTV?",
          es: "¿Un adolescente puede manejar un ATV o UTV?",
        },
        a: {
          en: "No — all drivers must be 18+ with a valid driver's license. Teens join as passengers: 5+ on an ATV Double, any age from 2+ in the UTV.",
          es: "No — todos los conductores deben tener 18+ y licencia vigente. Los adolescentes van de pasajeros: 5+ en ATV Double, y desde los 2 años en el UTV.",
        },
      },
      {
        q: {
          en: "How many people fit in one UTV?",
          es: "¿Cuántas personas caben en un UTV?",
        },
        a: {
          en: "Up to 5 riders of slim to medium build. For groups of all adults we recommend 4 per UTV for extra comfort. The UTV is priced per vehicle: $300, tax included.",
          es: "Hasta 5 personas de complexión delgada a media. Para grupos de solo adultos recomendamos 4 por UTV para mayor comodidad. El UTV se cobra por vehículo: $300, impuestos incluidos.",
        },
      },
      {
        q: {
          en: "Is the UTV tour safe for small children?",
          es: "¿El tour en UTV es seguro para niños pequeños?",
        },
        a: {
          en: "Yes — seatbelts on every seat, full roll cage, roof, kid-sized helmets and a guide who paces the ride to the youngest rider. Vehicles are inspected before every departure.",
          es: "Sí — cinturones en cada asiento, barras antivuelco completas, techo, cascos de talla infantil y un guía que adapta el ritmo al rider más pequeño. Los vehículos se inspeccionan antes de cada salida.",
        },
      },
    ],
  },
  {
    slug: "atv-cabalgata-ultimate-half-day",
    title: {
      en: "Combining ATV + Cabalgata: the ultimate half-day",
      es: "Combinar ATV + Cabalgata: el medio día perfecto",
    },
    excerpt: {
      en: "Why mixing an adrenaline ATV ride with a horseback finca tour might be the best travel decision of your trip — prices, timing and what to expect.",
      es: "Por qué mezclar un tour de ATV con adrenalina y una cabalgata en finca puede ser la mejor decisión de tu viaje — precios, horarios y qué esperar.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    dateISO: "2026-04-20",
    modifiedISO: "2026-08-05",
    readTime: { en: "6 min", es: "6 min" },
    image: IMAGES.gallery[1],
    tag: { en: "Combos", es: "Combos" },
    metaDescription: {
      en: "ATV plus horseback (cabalgata) combo in Guanacaste, Costa Rica: 4-hour half-day, prices from $150, no riding experience needed. What to expect, hour by hour.",
      es: "Combo ATV con cabalgata en Guanacaste, Costa Rica: medio día de 4 horas, precios desde $150, sin experiencia necesaria. Qué esperar, hora por hora.",
    },
    keywords: [
      "ATV cabalgata Guanacaste",
      "horseback riding Costa Rica",
      "ATV horseback combo tour",
      "half day tour Guanacaste",
      "horseback tour Playas del Coco",
      "finca tour Costa Rica",
    ],
    intro: {
      en: "Half a day, two completely different rhythms: about 2 hours of ATV adrenaline through jungle and rivers, then roughly 1.5 hours on horseback across our family finca at the pace Guanacaste was meant to be seen. It's our most-booked combo, it costs from $150 per person, and it needs zero experience in either saddle. Here's how it works, hour by hour.",
      es: "Medio día, dos ritmos totalmente diferentes: unas 2 horas de adrenalina en ATV por selva y ríos, y luego cerca de 1.5 horas a caballo por nuestra finca familiar, al ritmo al que Guanacaste se dejó ver siempre. Es nuestro combo más reservado, cuesta desde $150 por persona y no requiere experiencia en ninguna de las dos monturas. Así funciona, hora por hora.",
    },
    sections: [
      {
        heading: {
          en: "What exactly is the ATV + Cabalgata combo?",
          es: "¿Qué es exactamente el combo ATV + Cabalgata?",
        },
        body: {
          en: "One booking, two classic Costa Rican experiences back to back: the full ATV trail ride (the same route as our flagship tour — jungle, river crossings, viewpoint) followed by a guided horseback tour across our family finca, with trained horses, a bilingual guide and a snack break. Total time is about 4 hours including the transition between activities.\n\n'Cabalgata' simply means horseback ride in Spanish — and doing one on a working Guanacaste finca, where sabanero (cowboy) culture was born, is about as authentic as it gets.",
          es: "Una sola reserva, dos experiencias clásicas de Costa Rica seguidas: el recorrido completo en ATV (la misma ruta de nuestro tour principal — selva, cruces de río, mirador) seguido de una cabalgata guiada por nuestra finca familiar, con caballos entrenados, guía bilingüe y pausa para snack. El tiempo total es de unas 4 horas incluyendo la transición entre actividades.\n\nY hacer una cabalgata en una finca guanacasteca en producción — donde nació la cultura sabanera — es de lo más auténtico que hay.",
        },
      },
      {
        heading: {
          en: "Part 1 — The ATV ride (about 2 hours)",
          es: "Parte 1 — El recorrido en ATV (~2 horas)",
        },
        body: {
          en: "You start with the briefing, gear up (helmet and goggles included) and head out on jungle trails with river crossings and a viewpoint stop. You pick Single ($150 per person) or Double ($195 per quad, driver + passenger 5+). No off-road experience needed — the guide sets the pace.\n\nNote that the ATV minimum applies here like on all our ATV tours: bookings require at least 2 machines, in any mix of Singles and Doubles.",
          es: "Empiezas con la charla de seguridad, te equipas (casco y goggles incluidos) y sales a rutas selváticas con cruces de río y parada en mirador. Eliges Single ($150 por persona) o Double ($195 por cuadraciclo, conductor + pasajero 5+). No se necesita experiencia todoterreno — el guía marca el ritmo.\n\nOjo: el mínimo de ATV aplica aquí como en todos nuestros tours de ATV — las reservas requieren al menos 2 máquinas, en cualquier mezcla de Singles y Doubles.",
        },
      },
      {
        heading: {
          en: "Part 2 — The cabalgata (about 1.5 hours)",
          es: "Parte 2 — La cabalgata (~1.5 horas)",
        },
        body: {
          en: "Trade handlebars for reins. Our horses are trained for beginners and matched to each rider's size and confidence — if you've never been on a horse, you're exactly who they're used to carrying. The ride crosses open finca land: cattle pastures, big skies, slow rhythm, with a snack break along the way.\n\nAfter two hours of engine and adrenaline, the contrast is the whole point. Guests consistently tell us the quiet half is the part they didn't expect to love.",
          es: "Cambia el manillar por las riendas. Nuestros caballos están entrenados para principiantes y se asignan según el tamaño y la confianza de cada rider — si nunca has montado, eres exactamente el tipo de jinete que están acostumbrados a llevar. El recorrido cruza la finca abierta: potreros, cielos enormes, ritmo lento, con pausa para snack en el camino.\n\nDespués de dos horas de motor y adrenalina, el contraste es justamente el punto. Los huéspedes nos dicen una y otra vez que la mitad tranquila fue la parte que no esperaban amar.",
        },
      },
      {
        heading: {
          en: "How much does it cost?",
          es: "¿Cuánto cuesta?",
        },
        body: {
          en: "ATV Single + Cabalgata: $150 per person. ATV Double + Cabalgata: $195 per quad (that covers driver and passenger). All prices include the 13% IVA, plus helmets, trained horses, bilingual guide and a light snack.\n\nPrefer the family setup? The UTV + Cabalgata combo runs $339 for the UTV (up to 5 riders) plus $45 per person for the horseback portion — the best pick when small kids or grandparents are in the group.",
          es: "ATV Single + Cabalgata: $150 por persona. ATV Double + Cabalgata: $195 por cuadraciclo (cubre conductor y pasajero). Todos los precios incluyen el 13% de IVA, además de cascos, caballos entrenados, guía bilingüe y snack ligero.\n\n¿Prefieres el plan familiar? El combo UTV + Cabalgata cuesta $339 por el UTV (hasta 5 personas) más $45 por persona por la parte de cabalgata — la mejor opción cuando hay niños pequeños o abuelos en el grupo.",
        },
      },
      {
        heading: {
          en: "Do I need horseback riding experience?",
          es: "¿Necesito experiencia montando a caballo?",
        },
        body: {
          en: "None at all. The horses are calm, trail-trained and used to first-timers; the guide rides with the group the whole time and helps everyone mount, adjust stirrups and get comfortable before setting off. Helmets are provided.\n\nKids can join the cabalgata at most ages when accompanied by an adult — tell us your group's ages when booking and we'll confirm the right setup.",
          es: "Ninguna. Los caballos son tranquilos, entrenados para el sendero y acostumbrados a principiantes; el guía cabalga con el grupo todo el tiempo y ayuda a todos a montar, ajustar estribos y acomodarse antes de arrancar. Incluimos cascos.\n\nLos niños pueden unirse a la cabalgata en la mayoría de las edades acompañados de un adulto — cuéntanos las edades de tu grupo al reservar y confirmamos la configuración correcta.",
        },
      },
      {
        heading: {
          en: "Morning or afternoon? How to plan your day",
          es: "¿Mañana o tarde? Cómo planear tu día",
        },
        body: {
          en: "Our recommendation: take the 8:00 AM departure. You ride in the cooler hours, the light on the finca is gorgeous, and you're done by early afternoon — showered and on the beach by 2:00 PM with the day's best story already in the bag. The 11:00 AM slot works great too if mornings aren't your thing.\n\nIn the green season, morning departures also stack the odds of dry weather in your favor, since showers tend to arrive later in the day.",
          es: "Nuestra recomendación: toma la salida de 8:00 AM. Ruedas en las horas frescas, la luz en la finca es preciosa y terminas a primera hora de la tarde — bañado y en la playa a las 2:00 PM con la mejor historia del día ya asegurada. La salida de 11:00 AM también funciona muy bien si las mañanas no son lo tuyo.\n\nEn temporada verde, salir de mañana además pone las probabilidades de clima seco a tu favor, porque los aguaceros suelen llegar más tarde.",
        },
      },
      {
        heading: {
          en: "Who is this combo for?",
          es: "¿Para quién es este combo?",
        },
        body: {
          en: "Couples who want adventure and romance in the same morning. Friend groups where half want speed and half want photos. Travelers with just one free day in Guanacaste who want maximum variety per hour. And honestly, anyone who suspects that the best version of Costa Rica involves both a splash of adrenaline and a slow ride into a big landscape.\n\nIf your crew leans more family — small kids, mixed ages — look at the UTV + Cabalgata version of the same combo instead.",
          es: "Parejas que quieren aventura y romance en la misma mañana. Grupos de amigos donde la mitad quiere velocidad y la otra mitad quiere fotos. Viajeros con un solo día libre en Guanacaste que buscan la máxima variedad por hora. Y honestamente, cualquiera que sospeche que la mejor versión de Costa Rica incluye un golpe de adrenalina y un paseo lento por un paisaje enorme.\n\nSi tu grupo es más familiar — niños pequeños, edades mixtas — mira la versión UTV + Cabalgata del mismo combo.",
        },
      },
    ],
    closing: {
      en: "Plan it for the morning, bring closed shoes and a change of clothes, and leave the afternoon free for the beach. One booking, two adventures, zero regrets.",
      es: "Planéalo para la mañana, trae zapato cerrado y una muda, y deja la tarde libre para la playa. Una reserva, dos aventuras, cero arrepentimientos.",
    },
    faqs: [
      {
        q: {
          en: "How long does the ATV + Cabalgata combo last?",
          es: "¿Cuánto dura el combo ATV + Cabalgata?",
        },
        a: {
          en: "About 4 hours total: roughly 2 hours on the ATV trail and 1.5 hours on horseback across the finca, plus the transition and snack break.",
          es: "Unas 4 horas en total: cerca de 2 horas en la ruta de ATV y 1.5 horas a caballo por la finca, más la transición y la pausa para snack.",
        },
      },
      {
        q: {
          en: "How much does the ATV + Cabalgata combo cost?",
          es: "¿Cuánto cuesta el combo ATV + Cabalgata?",
        },
        a: {
          en: "$150 per person on an ATV Single, or $195 per Double quad (driver + passenger). Tax included. ATV bookings require a minimum of 2 machines. The UTV version is $339 per vehicle plus $45 per person.",
          es: "$150 por persona en ATV Single, o $195 por cuadraciclo Double (conductor + pasajero). Impuestos incluidos. Las reservas de ATV requieren mínimo 2 máquinas. La versión en UTV cuesta $339 por vehículo más $45 por persona.",
        },
      },
      {
        q: {
          en: "Do I need horseback experience for the cabalgata?",
          es: "¿Necesito experiencia para la cabalgata?",
        },
        a: {
          en: "No — the horses are trained for beginners, the guide helps everyone get set up, and helmets are provided. Most of our riders are on a horse for the first time.",
          es: "No — los caballos están entrenados para principiantes, el guía ayuda a todos a acomodarse y damos cascos. La mayoría de nuestros riders montan por primera vez.",
        },
      },
      {
        q: {
          en: "Can kids do the combo?",
          es: "¿Los niños pueden hacer el combo?",
        },
        a: {
          en: "Yes — kids 5+ can ride as ATV Double passengers, and the cabalgata suits most ages with an adult. For younger kids, the UTV + Cabalgata combo welcomes children from 2+.",
          es: "Sí — los niños de 5+ pueden ir de pasajeros en ATV Double, y la cabalgata es apta para la mayoría de edades con un adulto. Para los más pequeños, el combo UTV + Cabalgata acepta niños desde los 2 años.",
        },
      },
    ],
  },
  {
    slug: "best-season-to-ride-guanacaste",
    title: {
      en: "Best season to ride in Guanacaste: month-by-month guide",
      es: "La mejor temporada para rodar en Guanacaste: guía mes a mes",
    },
    excerpt: {
      en: "Dry season, green season, rain and the best month for your ride — how Guanacaste's weather changes the trails and when to book.",
      es: "Temporada seca, temporada verde, lluvia y el mejor mes para tu tour — cómo el clima de Guanacaste cambia los caminos y cuándo reservar.",
    },
    date: { en: "April 2026", es: "Abril 2026" },
    dateISO: "2026-04-24",
    modifiedISO: "2026-08-05",
    readTime: { en: "7 min", es: "7 min" },
    image: IMAGES.gallery[6],
    tag: { en: "Travel", es: "Viajes" },
    metaDescription: {
      en: "Best time for ATV / UTV tours in Guanacaste, Costa Rica: dry vs green season compared month by month, rain policy, best time of day and when to book ahead.",
      es: "La mejor época para tours de ATV / UTV en Guanacaste, Costa Rica: temporada seca vs verde mes a mes, política de lluvia, mejor hora del día y cuándo reservar.",
    },
    keywords: [
      "best time to visit Guanacaste",
      "Costa Rica dry season",
      "Guanacaste weather by month",
      "green season Costa Rica",
      "does it rain in Guanacaste",
      "best month ATV tour Costa Rica",
    ],
    intro: {
      en: "Short answer: there is no bad month to ride in Guanacaste — this is one of the driest, sunniest regions of Costa Rica, and our tours run year-round on the same route. The real question is which version of the trail you want: the fast, golden, dusty one (December–April) or the green, muddy, rivers-running-full one (May–November). Here's the honest month-by-month breakdown.",
      es: "Respuesta corta: no hay mes malo para rodar en Guanacaste — es una de las regiones más secas y soleadas de Costa Rica, y nuestros tours salen todo el año por la misma ruta. La verdadera pregunta es qué versión del camino quieres: la rápida, dorada y polvorienta (diciembre–abril) o la verde, embarrada y con ríos llenos (mayo–noviembre). Aquí va el desglose honesto, mes a mes.",
    },
    sections: [
      {
        heading: {
          en: "Dry season (December–April): fast trails and open views",
          es: "Temporada seca (diciembre–abril): caminos rápidos y vistas abiertas",
        },
        body: {
          en: "This is Guanacaste's classic postcard: near-guaranteed sunshine, firm fast trails, hills turning gold and views that stretch for miles because the foliage thins out. Rivers drop to shallow, easy crossings. It's also peak tourist season — flights are fuller, hotels pricier and tour slots go quickly, especially around Christmas, New Year's and Easter week.\n\nRide-wise, expect dust (sunglasses or goggles all the time, and the $10 bandana add-on earns its keep), warm afternoons and spectacular sunsets on the late departure. December and January are the freshest months; March and April are the hottest.",
          es: "Esta es la postal clásica de Guanacaste: sol casi garantizado, caminos firmes y rápidos, colinas dorándose y vistas kilométricas porque el follaje se abre. Los ríos bajan a cruces fáciles y poco profundos. También es temporada alta — vuelos más llenos, hoteles más caros y cupos de tour que vuelan, sobre todo en Navidad, Año Nuevo y Semana Santa.\n\nEn el camino, espera polvo (gafas o goggles todo el tiempo, y la bandana de $10 se gana su lugar), tardes calientes y atardeceres espectaculares en la última salida. Diciembre y enero son los meses más frescos; marzo y abril, los más calientes.",
        },
      },
      {
        heading: {
          en: "Green season (May–November): full rivers and lush jungle",
          es: "Temporada verde (mayo–noviembre): ríos llenos y selva exuberante",
        },
        body: {
          en: "The landscape flips: everything turns a deep tropical green, waterfalls and rivers run full, the dust disappears and the river crossings become the star of the show. Fewer tourists mean easier booking, quieter trails and often better hotel rates. Wildlife is more active too.\n\nThe rhythm of rain here is friendly to morning plans: most days start sunny, with showers building in the late afternoon. Tours run daily — we simply read the morning's weather and adapt. September and October bring the most rain (and the greenest green); May, June and November are lovely shoulder months many regulars consider the sweet spot.",
          es: "El paisaje se voltea: todo se pone de un verde tropical profundo, cascadas y ríos corren llenos, el polvo desaparece y los cruces de río se vuelven la estrella del show. Menos turistas significa reservar más fácil, caminos más tranquilos y muchas veces mejores tarifas de hotel. La fauna también está más activa.\n\nEl ritmo de la lluvia aquí es amable con los planes de mañana: la mayoría de los días amanecen soleados y los aguaceros se arman al final de la tarde. Los tours salen a diario — simplemente leemos el clima de la mañana y adaptamos. Septiembre y octubre traen la mayor lluvia (y el verde más verde); mayo, junio y noviembre son meses de transición encantadores que muchos habituales consideran el punto dulce.",
        },
      },
      {
        heading: {
          en: "What happens if it rains on my tour?",
          es: "¿Qué pasa si llueve el día de mi tour?",
        },
        body: {
          en: "Nine times out of ten: you ride, you get a little wet, and it becomes the best part of the story. Costa Rican rain rarely lasts all day, and a warm-rain jungle ride is genuinely fun. We don't cancel for a shower — only for conditions our guides judge unsafe, like flooded crossings or storms.\n\nIf we do have to cancel, you choose: full refund or a free reschedule to another slot. And cancellation on your side is free up to 24 hours before the tour, so booking ahead carries no weather risk.",
          es: "Nueve de cada diez veces: ruedas, te mojas un poco y se convierte en la mejor parte de la historia. La lluvia tica casi nunca dura todo el día, y rodar la selva bajo lluvia tibia es genuinamente divertido. No cancelamos por un aguacero — solo por condiciones que nuestros guías consideren inseguras, como cruces crecidos o tormentas.\n\nSi nos toca cancelar, tú eliges: reembolso completo o reprogramación gratis en otro horario. Y cancelar de tu lado es gratis hasta 24 horas antes del tour, así que reservar con anticipación no tiene riesgo climático.",
        },
      },
      {
        heading: {
          en: "What's the best time of day to ride?",
          es: "¿Cuál es la mejor hora del día para rodar?",
        },
        body: {
          en: "We run three departures: 8:00 AM, 11:00 AM and 2:00 PM. The 8:00 AM is our insider pick — coolest temperatures, most active wildlife, soft light for photos, and in the green season it beats the afternoon showers by hours. The 2:00 PM departure is the sunset-chaser's choice in the dry season, when golden hour sets the dust glowing.\n\nThe 11:00 AM slot is the practical middle: sleep in, ride, and still make a late lunch. If you need a different time entirely, message us — the schedule is flexible when we can make it work.",
          es: "Tenemos tres salidas: 8:00 AM, 11:00 AM y 2:00 PM. La de 8:00 AM es nuestra favorita de conocedores — las temperaturas más frescas, la fauna más activa, luz suave para fotos, y en temporada verde le gana por horas a los aguaceros de la tarde. La de 2:00 PM es la elección de los cazadores de atardeceres en temporada seca, cuando la hora dorada enciende el polvo.\n\nLa de 11:00 AM es el punto medio práctico: duermes un poco más, ruedas y todavía llegas a un almuerzo tardío. Si necesitas otra hora, escríbenos — el horario es flexible cuando lo podemos acomodar.",
        },
      },
      {
        heading: {
          en: "When should I book ahead?",
          es: "¿Con cuánta anticipación debo reservar?",
        },
        body: {
          en: "Dry season, and especially the holiday weeks (mid-December through early January, and Easter week), book several days to a couple of weeks ahead — groups are bigger and slots fill. The rest of the year, a day or two of notice is usually plenty, and same-day requests often work out; just write us on WhatsApp.\n\nBooking is commitment-light either way: we confirm within the hour, usually no deposit is needed, you pay on the day, and cancellation is free up to 24 hours before.",
          es: "En temporada seca, y sobre todo en las semanas festivas (mediados de diciembre a inicios de enero, y Semana Santa), reserva con varios días o un par de semanas de anticipación — los grupos son más grandes y los cupos se llenan. El resto del año, uno o dos días suelen bastar, y las solicitudes del mismo día muchas veces funcionan; solo escríbenos por WhatsApp.\n\nReservar compromete poco en cualquier caso: confirmamos en una hora, normalmente no se necesita depósito, pagas el día del tour y la cancelación es gratis hasta 24 horas antes.",
        },
      },
      {
        heading: {
          en: "So… which season should I actually pick?",
          es: "Entonces… ¿cuál temporada elijo?",
        },
        body: {
          en: "If you dream of dust trails, big open views and guaranteed sun: December to April. If you want full rivers, deep green jungle, livelier wildlife and quieter trails: May to November. If you're chasing the best of both, aim for the transitions — late November, or May–June — when the landscape is turning and the crowds are thin.\n\nAnd if the trip dates are already fixed? Relax: the route is great in every month, our guides adapt it daily, and both seasons produce the kind of photos that make people back home ask questions.",
          es: "Si sueñas con caminos de polvo, vistas enormes y sol garantizado: diciembre a abril. Si quieres ríos llenos, selva verde profunda, fauna más activa y caminos tranquilos: mayo a noviembre. Si buscas lo mejor de ambos, apunta a las transiciones — finales de noviembre, o mayo–junio — cuando el paisaje está cambiando y hay poca gente.\n\n¿Y si las fechas del viaje ya están fijas? Tranquilo: la ruta es buenísima en cualquier mes, nuestros guías la adaptan a diario y ambas temporadas producen el tipo de fotos que hacen que en casa te pregunten cosas.",
        },
      },
    ],
    closing: {
      en: "Whatever month you pick, you'll find a great ride waiting — and a team that reads the sky every morning to give you the best version of the trail that day.",
      es: "El mes que elijas, te espera un gran recorrido — y un equipo que lee el cielo cada mañana para darte la mejor versión del camino ese día.",
    },
    faqs: [
      {
        q: {
          en: "What is the best month for an ATV tour in Guanacaste?",
          es: "¿Cuál es el mejor mes para un tour de ATV en Guanacaste?",
        },
        a: {
          en: "Every month works — tours run year-round. December–April brings sun, dust and open views; May–November brings green jungle and full river crossings. Transition months (late November, May–June) offer a bit of both.",
          es: "Todos los meses funcionan — los tours salen todo el año. Diciembre–abril trae sol, polvo y vistas abiertas; mayo–noviembre trae selva verde y ríos llenos. Los meses de transición (finales de noviembre, mayo–junio) ofrecen un poco de ambos.",
        },
      },
      {
        q: {
          en: "Does it rain every day in Guanacaste's green season?",
          es: "¿Llueve todos los días en la temporada verde de Guanacaste?",
        },
        a: {
          en: "No — most green-season days start sunny, with showers arriving in the late afternoon. Morning departures usually stay dry. September and October are the rainiest months.",
          es: "No — la mayoría de los días de temporada verde amanecen soleados, con aguaceros al final de la tarde. Las salidas de la mañana suelen mantenerse secas. Septiembre y octubre son los meses más lluviosos.",
        },
      },
      {
        q: {
          en: "Do tours get cancelled for rain?",
          es: "¿Se cancelan los tours por lluvia?",
        },
        a: {
          en: "Rarely — we ride in the rain and only cancel for genuinely unsafe conditions. If we cancel, you get a full refund or a free reschedule. Your own cancellation is free up to 24 hours before.",
          es: "Rara vez — rodamos bajo la lluvia y solo cancelamos por condiciones realmente inseguras. Si cancelamos nosotros, recibes reembolso completo o reprogramación gratis. Tu cancelación es gratis hasta 24 horas antes.",
        },
      },
      {
        q: {
          en: "How far in advance should I book?",
          es: "¿Con cuánta anticipación debo reservar?",
        },
        a: {
          en: "In high season (December–April) and holiday weeks, book several days to two weeks ahead. The rest of the year, a day or two is usually enough — and same-day requests via WhatsApp often work.",
          es: "En temporada alta (diciembre–abril) y semanas festivas, reserva con varios días o hasta dos semanas de anticipación. El resto del año, uno o dos días suelen bastar — y las solicitudes del mismo día por WhatsApp muchas veces funcionan.",
        },
      },
    ],
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
  dateISO: string;
  modifiedISO?: string;
  readTime: string;
  image: string;
  tag: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: { heading?: string; body: string }[];
  closing?: string;
  faqs?: { q: string; a: string }[];
};

export function localizePost(post: BlogPost, locale: Locale): LocalizedBlogPost {
  return {
    slug: post.slug,
    title: t(post.title, locale),
    excerpt: t(post.excerpt, locale),
    date: t(post.date, locale),
    dateISO: post.dateISO,
    modifiedISO: post.modifiedISO,
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
    faqs: post.faqs?.map((f) => ({
      q: t(f.q, locale),
      a: t(f.a, locale),
    })),
  };
}

export function localizePosts(locale: Locale): LocalizedBlogPost[] {
  return BLOG_POSTS.map((p) => localizePost(p, locale));
}
