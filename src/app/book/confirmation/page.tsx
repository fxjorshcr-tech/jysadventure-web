"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, Phone } from "lucide-react";
import { CONTACT } from "@/lib/info";

type Summary = {
  contact: { name: string; email: string; phone: string };
  tour: { slug: string; title: string; titleLocalized?: string };
  schedule: { date: string; departure: string };
  vehicles:
    | {
        mode: "atv";
        singles: number;
        doubles: number;
        totalRiders: number;
      }
    | {
        mode: "utv";
        utvs: number;
        riders: number;
        totalRiders: number;
      };
  canopyOperator: { slug: string; name: string } | null;
  addons: { bandanas: number };
  pickup: {
    zoneSlug: string;
    zoneName: string;
    otherDetail: string;
    cost: number;
    confirmedRate: boolean;
  };
  message: string;
  pricing: {
    tourSubtotal: number;
    bandanaSubtotal: number;
    transportSubtotal: number;
    total: number;
  };
  locale?: "en" | "es";
};

export default function ConfirmationPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const raw = sessionStorage.getItem("jys-booking");
    if (raw) {
      try {
        setSummary(JSON.parse(raw));
      } catch {
        setSummary(null);
      }
    }
  }, []);

  // Use the locale stored in session, otherwise fall back to en.
  const locale: "en" | "es" = summary?.locale ?? "en";
  const isEs = locale === "es";

  const T = isEs
    ? {
        noBookingTitle: "No hay reserva",
        noBookingTitleHl: "encontrada",
        noBookingHelp:
          "No tenemos un resumen de reserva para mostrar. Elige un tour y empieza el flujo desde ahí.",
        browseTours: "Ver tours",
        loading: "Cargando…",
        bookingReceived: "Reserva recibida",
        thanks: "Gracias,",
        confirmHelp:
          "Aquí tienes el resumen de tu reserva. Nuestro equipo te contactará pronto para confirmar disponibilidad y finalizar los detalles.",
        tour: "Tour",
        ride: "Recorrido",
        date: "Fecha",
        departure: "Salida",
        canopyOperator: "Operador canopy",
        vehiclesRiders: "Vehículos y personas",
        atvSingle: "ATV Single",
        atvDouble: "ATV Double",
        totalRiders: "Total de personas",
        utvVehicles: "Vehículos UTV",
        pickup: "Recogida",
        meetBase: "Recogida en base",
        other: "Otra",
        confirmRate:
          "Confirmaremos la tarifa de transporte para esta ubicación antes de cobrar nada.",
        transport: "Transporte",
        free: "Gratis",
        addons: "Extras",
        bandanas: "Bandanas",
        notes: "Notas",
        contact: "Contacto",
        name: "Nombre",
        email: "Correo",
        phone: "Teléfono",
        estTotal: "Total estimado",
        ivaIncl: "13% IVA en transporte incluido",
        transportIncl: " · transporte incluido",
        transportTbc: " · transporte por confirmar",
        tourLabel: "Tour",
        addonsLabel: "Extras",
        transportLabel: "Transporte",
        needChange: "¿Necesitas cambiar algo?",
        browseMore: "Ver más tours",
        backHome: "Volver al inicio",
      }
    : {
        noBookingTitle: "No booking",
        noBookingTitleHl: "found",
        noBookingHelp:
          "We don't have a booking summary to show. Pick a tour and start the booking flow there.",
        browseTours: "Browse tours",
        loading: "Loading…",
        bookingReceived: "Booking received",
        thanks: "Thanks,",
        confirmHelp:
          "Here's the summary of your reservation. Our team will reach out shortly to confirm availability and finalize details.",
        tour: "Tour",
        ride: "Ride",
        date: "Date",
        departure: "Departure",
        canopyOperator: "Canopy operator",
        vehiclesRiders: "Vehicles & riders",
        atvSingle: "ATV Single",
        atvDouble: "ATV Double",
        totalRiders: "Total riders",
        utvVehicles: "UTV vehicles",
        pickup: "Pickup",
        meetBase: "Meet at base camp",
        other: "Other",
        confirmRate:
          "We'll confirm the transport rate for this location before charging anything.",
        transport: "Transport",
        free: "Free",
        addons: "Add-ons",
        bandanas: "Bandanas",
        notes: "Notes",
        contact: "Contact",
        name: "Name",
        email: "Email",
        phone: "Phone",
        estTotal: "Estimated total",
        ivaIncl: "13% IVA on transport incl.",
        transportIncl: " · transport included",
        transportTbc: " · transport TBC",
        tourLabel: "Tour",
        addonsLabel: "Add-ons",
        transportLabel: "Transport",
        needChange: "Need to change something?",
        browseMore: "Browse more tours",
        backHome: "Back to home",
      };

  if (hydrated && !summary) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-night-950 px-4 pt-32">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl tracking-wide text-white md:text-5xl">
            {T.noBookingTitle}{" "}
            <span className="text-gradient-fire">{T.noBookingTitleHl}</span>
          </h1>
          <p className="mt-4 text-white/65">{T.noBookingHelp}</p>
          <Link href="/tours" className="btn-primary mt-8 inline-flex">
            {T.browseTours} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-night-950 pt-32">
        <div className="text-white/60">{T.loading}</div>
      </section>
    );
  }

  const v = summary.vehicles;
  const tourTitle = summary.tour.titleLocalized || summary.tour.title;

  return (
    <>
      <section className="relative w-full overflow-hidden bg-night-950 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="relative mx-auto w-full max-w-3xl px-4 pb-10 sm:px-5 sm:pb-14 lg:px-8">
          <div className="flex items-center gap-3 text-jungle-500">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
              {T.bookingReceived}
            </span>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2rem,8vw,3.75rem)] leading-[0.95] tracking-wide text-white md:text-6xl">
            {T.thanks}{" "}
            <span className="text-gradient-fire">
              {summary.contact.name.split(" ")[0]}!
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 md:text-lg">
            {T.confirmHelp}
          </p>
        </div>
      </section>

      <section className="relative bg-night-950 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
            <Section title={T.tour}>
              <Row label={T.ride} value={tourTitle} />
              <Row label={T.date} value={summary.schedule.date || "—"} />
              <Row label={T.departure} value={summary.schedule.departure || "—"} />
              {summary.canopyOperator && (
                <Row label={T.canopyOperator} value={summary.canopyOperator.name} />
              )}
            </Section>

            <Divider />

            <Section title={T.vehiclesRiders}>
              {v.mode === "atv" ? (
                <>
                  {v.singles > 0 && (
                    <Row label={T.atvSingle} value={`${v.singles}`} />
                  )}
                  {v.doubles > 0 && (
                    <Row label={T.atvDouble} value={`${v.doubles}`} />
                  )}
                  <Row label={T.totalRiders} value={`${v.totalRiders}`} />
                </>
              ) : (
                <>
                  <Row label={T.utvVehicles} value={`${v.utvs}`} />
                  <Row label={T.totalRiders} value={`${v.riders}`} />
                </>
              )}
            </Section>

            <Divider />

            <Section title={T.pickup}>
              {summary.pickup.zoneSlug === "" ? (
                <Row label={T.pickup} value={T.meetBase} />
              ) : summary.pickup.zoneSlug === "other" ? (
                <>
                  <Row
                    label={T.pickup}
                    value={summary.pickup.otherDetail || T.other}
                  />
                  <p className="mt-2 text-xs text-white/60">{T.confirmRate}</p>
                </>
              ) : (
                <>
                  <Row label={T.pickup} value={summary.pickup.zoneName} />
                  <Row
                    label={T.transport}
                    value={
                      summary.pickup.cost === 0 ? T.free : `$${summary.pickup.cost}`
                    }
                  />
                </>
              )}
            </Section>

            {summary.addons.bandanas > 0 && (
              <>
                <Divider />
                <Section title={T.addons}>
                  <Row label={T.bandanas} value={`${summary.addons.bandanas}`} />
                </Section>
              </>
            )}

            {summary.message && (
              <>
                <Divider />
                <Section title={T.notes}>
                  <p className="text-sm text-white/75">{summary.message}</p>
                </Section>
              </>
            )}

            <Divider />

            <Section title={T.contact}>
              <Row label={T.name} value={summary.contact.name} />
              <Row label={T.email} value={summary.contact.email} />
              {summary.contact.phone && (
                <Row label={T.phone} value={summary.contact.phone} />
              )}
            </Section>

            <div className="mt-8 rounded-2xl border border-lava-500/40 bg-lava-500/10 p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    {T.estTotal}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/45">
                    {T.ivaIncl}
                    {summary.pickup.zoneSlug && summary.pickup.zoneSlug !== "other"
                      ? T.transportIncl
                      : summary.pickup.zoneSlug === "other"
                        ? T.transportTbc
                        : ""}
                  </div>
                </div>
                <div className="font-display text-3xl text-lava-400 sm:text-4xl">
                  ${summary.pricing.total}
                </div>
              </div>
              <ul className="mt-4 space-y-1 border-t border-white/10 pt-3 text-xs text-white/65">
                <li className="flex justify-between gap-3">
                  <span>{T.tourLabel}</span>
                  <span>${summary.pricing.tourSubtotal}</span>
                </li>
                {summary.pricing.bandanaSubtotal > 0 && (
                  <li className="flex justify-between gap-3">
                    <span>{T.addonsLabel}</span>
                    <span>${summary.pricing.bandanaSubtotal}</span>
                  </li>
                )}
                {summary.pricing.transportSubtotal > 0 && (
                  <li className="flex justify-between gap-3">
                    <span>{T.transportLabel}</span>
                    <span>${summary.pricing.transportSubtotal}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
              {T.needChange}
            </div>
            <div className="mt-3 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-lava-400/50"
              >
                <Mail className="h-4 w-4 text-lava-400" />
                <span className="break-all">{CONTACT.email}</span>
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-lava-400/50"
              >
                <Phone className="h-4 w-4 text-lava-400" />
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <Link href="/tours" className="btn-ghost w-full sm:w-auto">
              {T.browseMore}
            </Link>
            <Link href="/" className="btn-primary w-full sm:w-auto">
              {T.backHome} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
        {title}
      </div>
      <div className="mt-3 space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 text-sm">
      <span className="text-white/55">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="my-6 border-t border-white/10" />;
}
