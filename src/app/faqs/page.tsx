"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/SectionHeader";
import { Plus, Minus } from "lucide-react";

const FAQ_GROUPS: {
  title: string;
  items: { q: string; a: string }[];
}[] = [
  {
    title: "Age & license",
    items: [
      {
        q: "What is the minimum age to drive an ATV or UTV?",
        a: "All drivers must be 18+ and hold a valid driver's license — any country, any language. No license = no drive.",
      },
      {
        q: "What is the minimum passenger age?",
        a: "On a double ATV, passengers must be at least 5 years old. On the UTV, children from 2+ years old can ride with adults.",
      },
      {
        q: "Do I really need a driver's license? What if I don't have one?",
        a: "Yes — a valid driver's license is required by local law to operate ATVs or UTVs. Riders without a license can join as passengers on the ATV Double or UTV.",
      },
      {
        q: "Is an international driver's license required?",
        a: "No. A regular driver's license from your home country is accepted as long as it is valid and shows your photo.",
      },
    ],
  },
  {
    title: "Booking & payment",
    items: [
      {
        q: "How do I reserve my tour?",
        a: "Pick a tour, fill out the booking form on the tour page, and we'll confirm availability within an hour. You can also reach us via WhatsApp.",
      },
      {
        q: "Is a deposit required to book?",
        a: "Usually no deposit is needed to hold a reservation. Payment is made in cash or card the day of the tour at our base.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash in USD or Costa Rican colones, and major credit cards (Visa, Mastercard). Contact us for bank transfer options.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Free cancellation up to 24 hours before your tour. Inside 24 hours, please contact us directly — we'll do our best to reschedule.",
      },
    ],
  },
  {
    title: "Safety & what to bring",
    items: [
      {
        q: "Is the tour safe? What safety measures do you take?",
        a: "All vehicles are maintained and inspected before every ride. We provide helmets and gloves, and you'll ride with a trained bilingual guide who sets the pace for the group.",
      },
      {
        q: "What should I wear and bring?",
        a: "Closed-toe shoes, comfortable clothing you don't mind getting muddy, sunglasses, sunscreen, and a change of clothes. We recommend a GoPro or phone strap for photos.",
      },
      {
        q: "Can I go on the tour if I'm pregnant?",
        a: "For safety reasons we do not recommend ATV or UTV rides during pregnancy due to vibration and impact on rough terrain.",
      },
      {
        q: "Are there weight restrictions?",
        a: "Our ATVs and UTVs accommodate most adults comfortably. If you have concerns about weight or fit, contact us in advance so we can match you to the right vehicle.",
      },
    ],
  },
  {
    title: "The ride",
    items: [
      {
        q: "How long does each tour last?",
        a: "Base tours (ATV Single, ATV Double, UTV) run about 2 hours. Combos with Cabalgata or Canopy run about 4 hours total.",
      },
      {
        q: "Do the tours run if it rains?",
        a: "Most of the time yes — rain is part of the jungle experience. We only cancel in unsafe conditions. If we cancel, you get a full refund or free reschedule.",
      },
      {
        q: "Do you offer hotel pickup?",
        a: "Yes, we provide pickup and drop-off from hotels in El Coco, Playa Hermosa, Playa Panamá and nearby areas. Contact us for rates to other locations.",
      },
      {
        q: "Are your guides bilingual?",
        a: "Yes, all our guides speak Spanish and English so you never miss a beat on the trail.",
      },
      {
        q: "Can I bring a camera or GoPro?",
        a: "Absolutely. We recommend a GoPro with a helmet or chest mount. Phones should be in a zipped pocket or waterproof pouch — water crossings are real.",
      },
    ],
  },
  {
    title: "Combos: Cabalgata & Canopy",
    items: [
      {
        q: "What does the ATV + Cabalgata combo include?",
        a: "You get the full ATV trail ride plus a guided horseback tour across our family finca. Horses are trained for beginners, and helmets are provided.",
      },
      {
        q: "What does the ATV + Canopy combo include?",
        a: "The ATV ride followed by a zipline canopy tour above the rainforest. Full harness, helmet and certified canopy guides are included.",
      },
      {
        q: "Can kids do the Cabalgata or Canopy combo?",
        a: "Cabalgata is suitable for most ages with an adult. Canopy has a minimum age and weight requirement — contact us ahead of time so we can confirm for your group.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[55svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Image
          src={IMAGES.gallery[7]}
          alt="FAQs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            Got questions?
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,13vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            FAQ
            <span className="text-gradient-fire">S</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            Everything you need to know before your JYS adventure — from age
            limits to what to pack.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-5 lg:px-8">
          {FAQ_GROUPS.map((group, gi) => (
            <div key={group.title} className={gi === 0 ? "" : "mt-16"}>
              <SectionHeader
                kicker={`Section 0${gi + 1}`}
                title={<>{group.title}</>}
              />
              <div className="mt-8 space-y-3">
                {group.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition ${
        open
          ? "border-lava-400/60 bg-white/[0.04]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
        aria-expanded={open}
      >
        <span className="font-display text-base tracking-wide text-white sm:text-lg">
          {q}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-white/70 sm:px-6 sm:pb-6">
          {a}
        </div>
      )}
    </div>
  );
}
