import type { Bilingual } from "@/i18n/text";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/text";

export type FaqItem = { q: Bilingual; a: Bilingual };
export type FaqGroup = { title: Bilingual; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: { en: "Age & license", es: "Edad y licencia" },
    items: [
      {
        q: {
          en: "What is the minimum age to drive an ATV or UTV?",
          es: "¿Cuál es la edad mínima para manejar un ATV o UTV?",
        },
        a: {
          en: "All drivers must be 18+ and hold a valid driver's license — any country, any language. No license = no drive.",
          es: "Todos los conductores deben tener 18+ años y una licencia de conducir válida — de cualquier país, en cualquier idioma. Sin licencia, no hay manejo.",
        },
      },
      {
        q: {
          en: "What is the minimum passenger age?",
          es: "¿Cuál es la edad mínima para pasajeros?",
        },
        a: {
          en: "On a double ATV, passengers must be at least 5 years old. On the UTV, children from 2+ years old can ride with adults.",
          es: "En un ATV double, los pasajeros deben tener al menos 5 años. En el UTV, los niños desde 2+ años pueden ir con adultos.",
        },
      },
      {
        q: {
          en: "Do I really need a driver's license? What if I don't have one?",
          es: "¿De verdad necesito licencia? ¿Y si no tengo?",
        },
        a: {
          en: "Yes — a valid driver's license is required by local law to operate ATVs or UTVs. Riders without a license can join as passengers on the ATV Double or UTV.",
          es: "Sí — la ley local exige licencia válida para manejar ATVs o UTVs. Quien no tenga licencia puede ir como pasajero en el ATV Double o el UTV.",
        },
      },
      {
        q: {
          en: "Is an international driver's license required?",
          es: "¿Se necesita licencia internacional?",
        },
        a: {
          en: "No. A regular driver's license from your home country is accepted as long as it is valid and shows your photo.",
          es: "No. Se acepta una licencia normal de tu país, siempre que esté vigente y tenga tu foto.",
        },
      },
    ],
  },
  {
    title: { en: "Booking & payment", es: "Reserva y pago" },
    items: [
      {
        q: {
          en: "How do I reserve my tour?",
          es: "¿Cómo reservo mi tour?",
        },
        a: {
          en: "Pick a tour, fill out the booking form on the tour page, and we'll confirm availability within an hour. You can also reach us via WhatsApp.",
          es: "Elige un tour, llena el formulario en la página del tour y confirmamos disponibilidad en una hora. También puedes escribirnos por WhatsApp.",
        },
      },
      {
        q: {
          en: "Is a deposit required to book?",
          es: "¿Se requiere depósito para reservar?",
        },
        a: {
          en: "Usually no deposit is needed to hold a reservation. Payment is made in cash or card the day of the tour at our base.",
          es: "Normalmente no se requiere depósito para apartar la reserva. El pago se hace en efectivo o tarjeta el día del tour en nuestra base.",
        },
      },
      {
        q: {
          en: "What payment methods do you accept?",
          es: "¿Qué métodos de pago aceptan?",
        },
        a: {
          en: "We accept cash in USD or Costa Rican colones, and major credit cards (Visa, Mastercard). Contact us for bank transfer options.",
          es: "Aceptamos efectivo en USD o colones, y tarjetas de crédito principales (Visa, Mastercard). Escríbenos para opciones de transferencia bancaria.",
        },
      },
      {
        q: {
          en: "What is your cancellation policy?",
          es: "¿Cuál es la política de cancelación?",
        },
        a: {
          en: "Free cancellation up to 24 hours before your tour. Inside 24 hours, please contact us directly — we'll do our best to reschedule.",
          es: "Cancelación gratuita hasta 24 horas antes del tour. Dentro de las 24 horas, contáctanos directamente — haremos todo lo posible por reprogramar.",
        },
      },
    ],
  },
  {
    title: {
      en: "Safety & what to bring",
      es: "Seguridad y qué llevar",
    },
    items: [
      {
        q: {
          en: "Is the tour safe? What safety measures do you take?",
          es: "¿Es seguro el tour? ¿Qué medidas de seguridad toman?",
        },
        a: {
          en: "All vehicles are maintained and inspected before every ride. We provide helmets and goggles, and you'll ride with a trained bilingual guide who sets the pace for the group.",
          es: "Todos los vehículos se mantienen e inspeccionan antes de cada salida. Damos cascos y goggles, y rodarás con un guía bilingüe entrenado que marca el ritmo del grupo.",
        },
      },
      {
        q: {
          en: "What should I wear and bring?",
          es: "¿Qué me pongo y qué llevo?",
        },
        a: {
          en: "Closed-toe shoes, comfortable clothing you don't mind getting muddy, sunglasses, sunscreen, and a change of clothes. We recommend a GoPro or phone strap for photos.",
          es: "Zapato cerrado, ropa cómoda que no te importe ensuciar, gafas de sol, protector solar y una muda de ropa. Te recomendamos una GoPro o correa para el celular para las fotos.",
        },
      },
      {
        q: {
          en: "Can I go on the tour if I'm pregnant?",
          es: "¿Puedo hacer el tour si estoy embarazada?",
        },
        a: {
          en: "For safety reasons we do not recommend ATV or UTV rides during pregnancy due to vibration and impact on rough terrain.",
          es: "Por seguridad no recomendamos los tours de ATV o UTV durante el embarazo, por la vibración y los impactos en terreno irregular.",
        },
      },
      {
        q: {
          en: "Are there weight restrictions?",
          es: "¿Hay restricciones de peso?",
        },
        a: {
          en: "Our ATVs and UTVs accommodate most adults comfortably. If you have concerns about weight or fit, contact us in advance so we can match you to the right vehicle.",
          es: "Nuestros ATVs y UTVs acomodan cómodamente a la mayoría de los adultos. Si tienes dudas sobre peso o ajuste, escríbenos antes para asignarte el vehículo correcto.",
        },
      },
    ],
  },
  {
    title: { en: "The ride", es: "El recorrido" },
    items: [
      {
        q: {
          en: "How long does each tour last?",
          es: "¿Cuánto dura cada tour?",
        },
        a: {
          en: "Base tours (ATV Single, ATV Double, UTV) run about 2 hours. Combos with Cabalgata or Canopy run about 4 hours total.",
          es: "Los tours base (ATV Single, ATV Double, UTV) duran aproximadamente 2 horas. Los combos con Cabalgata o Canopy duran cerca de 4 horas en total.",
        },
      },
      {
        q: {
          en: "Do the tours run if it rains?",
          es: "¿Los tours salen si llueve?",
        },
        a: {
          en: "Most of the time yes — rain is part of the jungle experience. We only cancel in unsafe conditions. If we cancel, you get a full refund or free reschedule.",
          es: "La mayoría de las veces sí — la lluvia es parte de la experiencia. Solo cancelamos en condiciones inseguras. Si cancelamos, te devolvemos el dinero o te reprogramamos sin costo.",
        },
      },
      {
        q: {
          en: "Do you offer hotel pickup?",
          es: "¿Ofrecen recogida en el hotel?",
        },
        a: {
          en: "Yes. Round-trip transport is complimentary from Hotel RIU. Rates from El Coco, Playa Hermosa and Playa Panamá start at $68 for up to 5 riders; Andaz and Planet Hollywood at $147; Four Seasons and Ritz at $170. See the full zone list on the Tours page. Tour prices include tax; transport rates already include the 13% IVA.",
          es: "Sí. Transporte ida y vuelta cortesía desde el Hotel RIU. Las tarifas desde El Coco, Playa Hermosa y Playa Panamá empiezan en $68 para hasta 5 personas; Andaz y Planet Hollywood en $147; Four Seasons y Ritz en $170. Ve la lista completa en la página de Tours. Los precios del tour incluyen impuestos; las tarifas de transporte ya incluyen el 13% de IVA.",
        },
      },
      {
        q: {
          en: "What time do tours depart?",
          es: "¿A qué hora salen los tours?",
        },
        a: {
          en: "We run three daily departures: 8:00 AM, 11:00 AM and 2:00 PM. Our schedule is flexible — contact us if you need a different start time and we'll do our best to fit you in.",
          es: "Tenemos tres salidas diarias: 8:00 AM, 11:00 AM y 2:00 PM. El horario es flexible — escríbenos si necesitas otra hora y haremos lo posible por acomodarte.",
        },
      },
      {
        q: {
          en: "Are your guides bilingual?",
          es: "¿Los guías son bilingües?",
        },
        a: {
          en: "Yes, all our guides speak Spanish and English so you never miss a beat on the trail.",
          es: "Sí, todos nuestros guías hablan español e inglés para que no te pierdas ningún detalle del camino.",
        },
      },
      {
        q: {
          en: "Is there a photo service during the tour?",
          es: "¿Hay servicio de fotografía durante el tour?",
        },
        a: {
          en: "Yes — your guide takes photos of the group along the trail and shares them with you at the end of the tour. You're still welcome to bring your own GoPro or phone in a waterproof pouch if you want extra material.",
          es: "Sí — el guía toma fotos del grupo a lo largo del recorrido y te las comparte al final del tour. Igual puedes traer tu propia GoPro o celular en bolsa impermeable si quieres material extra.",
        },
      },
    ],
  },
  {
    title: {
      en: "Combos: Cabalgata & Canopy",
      es: "Combos: Cabalgata y Canopy",
    },
    items: [
      {
        q: {
          en: "What does the ATV + Cabalgata combo include?",
          es: "¿Qué incluye el combo ATV + Cabalgata?",
        },
        a: {
          en: "You get the full ATV trail ride plus a guided horseback tour across our family finca. Horses are trained for beginners, and helmets are provided.",
          es: "Tienes el recorrido completo de ATV más una cabalgata guiada por nuestra finca familiar. Los caballos están entrenados para principiantes y damos cascos.",
        },
      },
      {
        q: {
          en: "What does the ATV + Canopy combo include?",
          es: "¿Qué incluye el combo ATV + Canopy?",
        },
        a: {
          en: "The ATV ride followed by a zipline canopy tour above the rainforest. You can choose between two canopy operators at booking: Congo Trail (recommended if you're staying in Playa Hermosa or El Coco) or Skyline (recommended if you're coming from the Tamarindo / Flamingo area). Full harness, helmet and certified canopy guides are included.",
          es: "El recorrido en ATV seguido por un tour de canopy sobre la selva. Al reservar puedes elegir entre dos operadores: Congo Trail (recomendado si estás en Playa Hermosa o El Coco) o Skyline (recomendado si vienes de Tamarindo / Flamingo). Se incluye arnés completo, casco y guías de canopy certificados.",
        },
      },
      {
        q: {
          en: "How does UTV combo pricing work?",
          es: "¿Cómo funciona el precio del combo en UTV?",
        },
        a: {
          en: "The UTV is priced per vehicle ($339, tax included, up to 5 riders). On combo tours, each rider adds the horseback portion ($45/person) or the canopy portion ($40/person). We recommend a max of 4 adults in the UTV for extra comfort.",
          es: "El UTV se cobra por vehículo ($339, impuestos incluidos, hasta 5 personas). En los combos, cada persona suma la parte de cabalgata ($45/persona) o canopy ($40/persona). Recomendamos máximo 4 adultos en el UTV para mayor comodidad.",
        },
      },
      {
        q: {
          en: "Does the tour include safety gear?",
          es: "¿El tour incluye equipo de seguridad?",
        },
        a: {
          en: "Yes — every tour includes helmet, goggles and bottled water. Baby seats are available on request. Riders with mobility needs are welcome — they can travel either in the front or in the rear of the UTV; please let us know in advance so we can set up the best configuration for the group.",
          es: "Sí — cada tour incluye casco, goggles y agua embotellada. Las sillas de bebé están disponibles bajo pedido. Las personas con movilidad reducida son bienvenidas — pueden ir adelante o atrás en el UTV; avísanos con anticipación para preparar la mejor configuración del grupo.",
        },
      },
      {
        q: {
          en: "Are there different routes by season?",
          es: "¿Hay rutas diferentes según la temporada?",
        },
        a: {
          en: "We run a single route year-round. Our guides adapt it to the season's terrain and weather — in the green season the rivers are full and the jungle is lush; in the dry season the views open up and the trails are faster. Same route, different magic.",
          es: "Tenemos una sola ruta todo el año. Nuestros guías la adaptan al terreno y clima de la temporada — en la temporada verde los ríos están llenos y la selva está exuberante; en la seca se abren las vistas y los caminos son más rápidos. Misma ruta, otra magia.",
        },
      },
      {
        q: {
          en: "Can kids do the Cabalgata or Canopy combo?",
          es: "¿Los niños pueden hacer el combo de Cabalgata o Canopy?",
        },
        a: {
          en: "Cabalgata is suitable for most ages with an adult. Canopy has a minimum age and weight requirement — contact us ahead of time so we can confirm for your group.",
          es: "La cabalgata es apta para la mayoría de edades acompañado de un adulto. El canopy tiene un mínimo de edad y peso — contáctanos antes para confirmar según tu grupo.",
        },
      },
    ],
  },
];

export type LocalizedFaqGroup = {
  title: string;
  items: { q: string; a: string }[];
};

export function localizeFaqs(locale: Locale): LocalizedFaqGroup[] {
  return FAQ_GROUPS.map((g) => ({
    title: t(g.title, locale),
    items: g.items.map((it) => ({
      q: t(it.q, locale),
      a: t(it.a, locale),
    })),
  }));
}
