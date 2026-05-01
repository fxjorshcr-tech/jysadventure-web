"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Loader2,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  TOURS,
  getTour,
  localizeTour,
  computeUtvTierTotal,
  distributeRiders,
  type LocalizedCanopyOperator,
  type LocalizedTour,
} from "@/lib/tours";
import {
  ADD_ONS,
  SCHEDULE,
  TRANSPORT_ZONES,
  TRANSPORT_INFO,
} from "@/lib/info";
import { DatePicker } from "./DatePicker";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { t as translate } from "@/i18n/text";

const BANDANA = ADD_ONS.find((a) => a.slug === "bandana")!;

function allowedDepartures(operator?: LocalizedCanopyOperator) {
  return operator?.departures ?? SCHEDULE.departures;
}

type ResolvedPickup = {
  zoneName: string | null;
  cost: number;
};

function slugifyZone(name: string) {
  return `op-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function computeTransport(
  zoneSlug: string,
  riders: number,
  operator?: LocalizedCanopyOperator,
): ResolvedPickup {
  if (!zoneSlug) return { zoneName: null, cost: 0 };
  if (operator?.freePickupZones || operator?.paidPickupZones) {
    const free = operator.freePickupZones?.find(
      (z) => slugifyZone(z) === zoneSlug,
    );
    if (free) return { zoneName: free, cost: 0 };
    const paid = operator.paidPickupZones?.find(
      (z) => slugifyZone(z) === zoneSlug,
    );
    if (paid) {
      return { zoneName: paid, cost: operator.extraPickupSurcharge ?? 0 };
    }
    return { zoneName: null, cost: 0 };
  }
  const zone = TRANSPORT_ZONES.find((z) => z.slug === zoneSlug);
  if (!zone) return { zoneName: null, cost: 0 };
  const included = TRANSPORT_INFO.includedPassengers;
  const extras = Math.max(0, riders - included);
  const cost = zone.basePrice + extras * zone.extraPerPerson;
  return { zoneName: zone.name, cost };
}

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    date: z.string().min(1),
    departure: z.string().min(1),
    tour: z.string().min(1),
    singles: z.coerce.number().min(0).max(20),
    doubles: z.coerce.number().min(0).max(20),
    utvs: z.coerce.number().min(0).max(10),
    riders: z.coerce.number().min(0).max(50),
    canopyOperator: z.string().optional(),
    bandanas: z.coerce.number().min(0).max(30),
    pickupZone: z.string().optional(),
    pickupOther: z.string().optional(),
    license: z.boolean().optional(),
    message: z.string().optional(),
  })
  .superRefine((d, ctx) => {
    const tour = getTour(d.tour);
    if (!tour) return;
    const operator = tour.canopyOperators?.find(
      (op) => op.slug === d.canopyOperator,
    );
    if (tour.pricingMode === "per-variant") {
      if ((d.singles ?? 0) + (d.doubles ?? 0) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Add at least 1 rider or vehicle",
          path: ["riders"],
        });
      }
    } else {
      const utvs = d.utvs ?? 0;
      const riders = d.riders ?? 0;
      const maxSeats = operator?.utvMaxSeats ?? tour.maxSeats ?? 5;
      if (utvs <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Add at least 1 UTV",
          path: ["utvs"],
        });
      }
      if (riders < utvs) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least 1 rider per UTV",
          path: ["riders"],
        });
      }
      if (utvs > 0 && riders > utvs * maxSeats) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Max ${maxSeats} riders per UTV (${utvs * maxSeats} total)`,
          path: ["riders"],
        });
      }
      if (operator?.utvTierPrices && utvs > 0 && riders > 0) {
        const minTier = Math.min(...operator.utvTierPrices.map((tt) => tt.riders));
        if (riders < utvs * minTier) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${operator.name} requires at least ${minTier} riders per UTV.`,
            path: ["riders"],
          });
        }
      }
    }
    if (tour.canopyOperators && !d.canopyOperator) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Choose a canopy operator",
        path: ["canopyOperator"],
      });
    }
    if (
      d.departure &&
      !(operator?.departures ?? SCHEDULE.departures).includes(d.departure)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: operator
          ? `${operator.name} doesn't run at this time. Pick another slot.`
          : "Pick a valid departure time.",
        path: ["departure"],
      });
    }
    if (d.pickupZone === "other" && !d.pickupOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tell us your pickup hotel/location",
        path: ["pickupOther"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

export function BookingForm({
  preselectedSlug,
  preselectedOperator,
  lockOperator = false,
  locale,
  dict,
}: {
  preselectedSlug?: string;
  preselectedOperator?: string;
  lockOperator?: boolean;
  locale: Locale;
  dict: Dictionary;
}) {
  const bf = dict.bookingForm;
  const lockedBaseTour = preselectedSlug ? getTour(preselectedSlug) : undefined;
  const lockedTour: LocalizedTour | undefined = lockedBaseTour
    ? localizeTour(lockedBaseTour, locale)
    : undefined;

  const validPreselectedOperator =
    preselectedOperator &&
    lockedTour?.canopyOperators?.some((o) => o.slug === preselectedOperator)
      ? preselectedOperator
      : "";
  const lockedOperator =
    lockOperator && validPreselectedOperator
      ? lockedTour?.canopyOperators?.find(
          (o) => o.slug === validPreselectedOperator,
        )
      : undefined;

  const allTours = TOURS.map((tr) => localizeTour(tr, locale));

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      singles: 0,
      doubles: 0,
      utvs: lockedTour && lockedTour.pricingMode !== "per-variant" ? 1 : 0,
      riders: lockedTour && lockedTour.pricingMode !== "per-variant" ? 2 : 0,
      tour: preselectedSlug ?? "",
      departure: "",
      canopyOperator: validPreselectedOperator,
      bandanas: 0,
      pickupZone: "",
      pickupOther: "",
    },
  });

  const currentSlug = watch("tour");
  const currentTour: LocalizedTour | undefined = allTours.find(
    (a) => a.slug === currentSlug,
  );
  const hasVariants = currentTour?.pricingMode === "per-variant";
  const singles = watch("singles") ?? 0;
  const doubles = watch("doubles") ?? 0;
  const utvs = watch("utvs") ?? 0;
  const riders = watch("riders") ?? 0;
  const bandanas = watch("bandanas") ?? 0;
  const canopyOperator = watch("canopyOperator") ?? "";
  const selectedOperator = currentTour?.canopyOperators?.find(
    (op) => op.slug === canopyOperator,
  );
  const effectiveMaxSeats =
    selectedOperator?.utvMaxSeats ?? currentTour?.maxSeats ?? 5;
  const pickupZone = watch("pickupZone") ?? "";

  useEffect(() => {
    if (!currentTour?.canopyOperators && canopyOperator) {
      setValue("canopyOperator", "");
    }
  }, [currentTour, canopyOperator, setValue]);

  useEffect(() => {
    if (!pickupZone || pickupZone === "other") return;
    if (selectedOperator?.freePickupZones || selectedOperator?.paidPickupZones) {
      const valid =
        selectedOperator.freePickupZones?.some(
          (n) => slugifyZone(n) === pickupZone,
        ) ||
        selectedOperator.paidPickupZones?.some(
          (n) => slugifyZone(n) === pickupZone,
        );
      if (!valid) setValue("pickupZone", "");
    } else if (!TRANSPORT_ZONES.some((z) => z.slug === pickupZone)) {
      setValue("pickupZone", "");
    }
  }, [selectedOperator, pickupZone, setValue]);

  const departure = watch("departure");
  useEffect(() => {
    if (!departure) return;
    if (currentTour?.canopyOperators && !selectedOperator) {
      setValue("departure", "");
      return;
    }
    if (!allowedDepartures(selectedOperator).includes(departure)) {
      setValue("departure", "");
    }
  }, [selectedOperator, currentTour, departure, setValue]);

  useEffect(() => {
    if (currentTour && currentTour.pricingMode !== "per-variant") {
      const cap = utvs * effectiveMaxSeats;
      if (riders > cap) {
        setValue("riders", cap, { shouldValidate: true });
      } else if (riders < utvs) {
        setValue("riders", utvs, { shouldValidate: true });
      }
    }
  }, [utvs, currentTour, riders, effectiveMaxSeats, setValue]);

  const totalRiders = hasVariants ? singles + doubles * 2 : riders;

  let tourSubtotal = 0;
  if (currentTour) {
    if (hasVariants && currentTour.variants) {
      const singlePrice =
        selectedOperator?.variantPrices?.single ?? currentTour.variants[0].price;
      const doublePrice =
        selectedOperator?.variantPrices?.double ?? currentTour.variants[1].price;
      tourSubtotal = singles * singlePrice + doubles * doublePrice;
    } else if (currentTour.pricingMode === "flat-vehicle") {
      tourSubtotal = utvs * currentTour.price;
    } else if (currentTour.pricingMode === "flat-plus-per-person") {
      if (selectedOperator?.utvTierPrices && utvs > 0 && riders > 0) {
        const tiered = computeUtvTierTotal(
          riders,
          utvs,
          selectedOperator.utvTierPrices,
        );
        tourSubtotal =
          tiered ?? utvs * currentTour.price + riders * (currentTour.perPersonAddon ?? 0);
      } else {
        tourSubtotal =
          utvs * currentTour.price + riders * (currentTour.perPersonAddon ?? 0);
      }
    }
  }
  const bandanaSubtotal = bandanas * BANDANA.price;
  const transport = computeTransport(pickupZone, totalRiders, selectedOperator);
  const transportSubtotal = transport.cost;
  const totalPrice = tourSubtotal + bandanaSubtotal + transportSubtotal;

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const baseTour = getTour(data.tour);
    const localizedTour = baseTour ? localizeTour(baseTour, locale) : undefined;
    // Send tour title in English for the operator-facing email and in
    // localized form for the customer-facing email.
    const englishTitle = baseTour ? translate(baseTour.title, "en") : "";
    const localizedTitle = localizedTour?.title ?? "";
    const operator = baseTour?.canopyOperators?.find(
      (o) => o.slug === data.canopyOperator,
    );
    const summary = {
      contact: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
      },
      tour: {
        slug: baseTour?.slug ?? "",
        title: englishTitle,
        titleLocalized: localizedTitle,
      },
      schedule: {
        date: data.date,
        departure: data.departure,
      },
      vehicles: hasVariants
        ? {
            mode: "atv" as const,
            singles: data.singles,
            doubles: data.doubles,
            totalRiders,
          }
        : {
            mode: "utv" as const,
            utvs: data.utvs,
            riders: data.riders,
            totalRiders,
          },
      canopyOperator: operator
        ? { slug: operator.slug, name: operator.name }
        : null,
      addons: {
        bandanas: data.bandanas,
      },
      pickup: {
        zoneSlug: data.pickupZone ?? "",
        zoneName: transport.zoneName ?? (data.pickupZone === "other" ? "Other" : ""),
        otherDetail: data.pickupOther ?? "",
        cost: transportSubtotal,
        confirmedRate: data.pickupZone !== "other",
      },
      message: data.message ?? "",
      pricing: {
        tourSubtotal,
        bandanaSubtotal,
        transportSubtotal,
        total: totalPrice,
      },
      locale,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(summary),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Booking request failed");
      }
    } catch (err) {
      console.error("Booking submit failed", err);
      alert(bf.error);
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("jys-booking", JSON.stringify(summary));
    }

    router.push("/book/confirmation");
  };

  const field =
    "w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-sm transition focus:border-lava-400 focus:bg-white/[0.06] focus:ring-2 focus:ring-lava-500/30";
  const label =
    "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-white/60";
  const errorCls = "mt-1 text-xs text-lava-400";

  const sectionRideTitle = locale === "es" ? "Tu recorrido" : "Your ride";
  const sectionRideSub =
    locale === "es"
      ? "Elige fecha, tamaño del grupo y recogida. El total se actualiza al instante."
      : "Pick the date, group size and pickup. The total updates as you go.";
  const sectionDetailsTitle = locale === "es" ? "Tus datos" : "Your details";
  const sectionDetailsSub =
    locale === "es"
      ? "Te respondemos en una hora para confirmar tu cupo."
      : "We'll reply within the hour to confirm your slot.";
  const fullName = locale === "es" ? "Nombre completo" : "Full name";
  const emailLabel = "Email";
  const phoneLabel = locale === "es" ? "Teléfono / WhatsApp" : "Phone / WhatsApp";
  const messageLabel = locale === "es" ? "Mensaje (opcional)" : "Message (optional)";
  const messagePh =
    locale === "es"
      ? "Edades de los pasajeros, lugar de recogida, pedidos especiales…"
      : "Ages of passengers, pickup location, special requests…";
  const licenseConfirm =
    locale === "es"
      ? "Confirmo que el conductor tiene licencia válida. Es obligatorio para todos los tours de ATV y UTV."
      : "I confirm the driver has a valid driver's license. Required for all ATV and UTV rides.";
  const departureTime = locale === "es" ? "Hora de salida" : "Departure time";
  const pickCanopyFirst =
    locale === "es"
      ? "Elige el operador de canopy arriba para ver las salidas disponibles."
      : "Pick your canopy operator above to see available departure times.";
  const addOnLabel = locale === "es" ? "Extra" : "Add-on";
  const each = locale === "es" ? "c/u" : "each";
  const needPickupLabel = locale === "es" ? "¿Necesitas recogida en hotel?" : "Need hotel pickup?";
  const noThanksBase =
    locale === "es"
      ? "No, gracias — voy directo a la base"
      : "No thanks — I'll meet at base camp";
  const otherLocation =
    locale === "es"
      ? "Otra ubicación / hotel (confirmamos tarifa)"
      : "Other location / hotel (we'll confirm rate)";
  const hotelOrLocation =
    locale === "es" ? "Nombre del hotel o ubicación" : "Hotel name or location";
  const transportNote =
    locale === "es"
      ? `La tarifa cubre 1–${TRANSPORT_INFO.includedPassengers} personas; las personas extra se suman al total. El transporte se agrega abajo — el equipo confirma todo al responder tu reserva.`
      : `Listed rate covers 1–${TRANSPORT_INFO.includedPassengers} riders; extra riders add to the base. The transport cost is added to your total below — our team will confirm everything when we reply to your booking.`;
  const otherTransportNote =
    locale === "es"
      ? "No tenemos tarifa fija para esta ubicación — el equipo te confirmará el costo del transporte antes de cobrar nada."
      : "We don't have a fixed rate for this location — our team will reach out to confirm the transport cost before charging anything.";
  const change = locale === "es" ? "Cambiar" : "Change";
  const preSelected = locale === "es" ? "Pre-seleccionado" : "Pre-selected";
  const howManyEach = locale === "es" ? "¿Cuántos de cada uno?" : "How many of each?";
  const oneRiderPerQuad = locale === "es" ? "1 persona por cuadraciclo" : "1 rider per quad";
  const twoRiderPerQuad = (age: number) =>
    locale === "es"
      ? `2 personas por cuadraciclo · pasajero ${age}+ años`
      : `2 riders per quad · passenger ${age}+ yrs`;
  const utvsAndRiders = locale === "es" ? "UTVs y personas" : "UTVs & riders";
  const ridersOnly = locale === "es" ? "Personas" : "Riders";
  const utvVehicles = locale === "es" ? "Vehículos UTV" : "UTV vehicles";
  const eachUtvSeats = (max: number) =>
    locale === "es"
      ? `Cada UTV lleva hasta ${max}. Reserva varios UTVs para grupos grandes.`
      : `Each UTV seats up to ${max}. Book multiple UTVs for larger groups.`;
  const totalRidersLabel = locale === "es" ? "Total de personas" : "Total riders";
  const groupSize = locale === "es" ? "Tamaño del grupo" : "Group size";
  const fromUtv = locale === "es" ? "desde / UTV" : "from / UTV";
  const perUtvLabel = locale === "es" ? "por UTV" : "per UTV";
  const perPersonLabel = locale === "es" ? "por persona" : "per person";
  const includedLabel = locale === "es" ? "incluido" : "included";
  const seeUtvTiers = locale === "es" ? "ver tarifas UTV" : "see UTV tiers";
  const groupSizeNote = (age: number) =>
    locale === "es"
      ? `Personas en todos los UTVs. Pasajero ${age}+ años.`
      : `Headcount across all UTVs. Passenger ${age}+ yrs.`;
  const perPersonNote = (age: number) =>
    locale === "es"
      ? `Cobrado por persona. Pasajero ${age}+ años.`
      : `Priced per person. Passenger ${age}+ yrs.`;
  const tieredNote = (op: LocalizedCanopyOperator, age: number) =>
    locale === "es"
      ? `Cobrado por UTV según número de personas (${op.utvTierPrices?.map((tt) => `x${tt.riders} $${tt.price}`).join(" · ")}). Pasajero ${age}+ años.`
      : `Priced per UTV by rider count (${op.utvTierPrices?.map((tt) => `x${tt.riders} $${tt.price}`).join(" · ")}). Passenger ${age}+ yrs.`;
  const distributedAcross = (op: LocalizedCanopyOperator) =>
    locale === "es"
      ? `Personas distribuidas en UTVs: ${distributeRiders(riders, utvs).map((n) => `${n} ${n === 1 ? "persona" : "personas"}`).join(" + ")}.`
      : `Riders distributed across UTVs: ${distributeRiders(riders, utvs).map((n) => `${n} rider${n === 1 ? "" : "s"}`).join(" + ")}.`;
  const reviewing = locale === "es" ? "Revisando" : "Reviewing";
  const bookThisTour = locale === "es" ? "Reservar este tour" : "Book this tour";
  const totalLabel = locale === "es" ? "Total" : "Total";
  const ivaIncluded = locale === "es" ? "13% IVA en transporte incl." : "13% IVA on transport incl.";
  const transportIncl = locale === "es" ? " · transporte incluido" : " · transport included";
  const transportFree = locale === "es" ? " · transporte gratis" : " · free transport";
  const transportTbc = locale === "es" ? " · transporte por confirmar" : " · transport TBC";
  const baseCampPickup = locale === "es" ? " · recogida en base" : " · base camp pickup";
  const transportLabel = locale === "es" ? "Transporte" : "Transport";
  const transportTbcLine =
    locale === "es" ? "Transporte — por confirmar" : "Transport — to be confirmed";
  const inclExtra = (n: number) =>
    locale === "es" ? ` (incl. ${n} extra)` : ` (incl. ${n} extra)`;
  const tourLabel = locale === "es" ? "Tour" : "Tour";
  const ridersWord = (n: number) =>
    locale === "es" ? (n === 1 ? "persona" : "personas") : n === 1 ? "rider" : "riders";
  const utvWord = (n: number) =>
    locale === "es" ? (n === 1 ? "UTV" : "UTVs") : n === 1 ? "UTV" : "UTVs";
  const bandanaWord = (n: number) =>
    locale === "es" ? (n === 1 ? "bandana" : "bandanas") : n === 1 ? "bandana" : "bandanas";
  const chooseRide = locale === "es" ? "Elige tu recorrido…" : "Choose your ride…";
  const tourFieldLabel = locale === "es" ? "Tour" : "Tour";
  const dateLabel = locale === "es" ? "Fecha" : "Date";
  const pricingShownWith = (name: string) =>
    locale === "es" ? `Precio mostrado con ${name}.` : `Pricing shown with ${name}.`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
      {/* Section 1: Your ride */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur sm:p-6 md:p-8">
        <div className="mb-6 flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lava-500/20 font-display text-lg text-lava-400 ring-1 ring-lava-500/40">
            1
          </span>
          <div>
            <h3 className="font-display text-xl tracking-wide text-white">
              {sectionRideTitle}
            </h3>
            <p className="text-xs text-white/55">{sectionRideSub}</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>{dateLabel}</label>
            <Controller
              control={control}
              name="date"
              render={({ field: f }) => (
                <DatePicker value={f.value} onChange={f.onChange} />
              )}
            />
            {errors.date && <p className={errorCls}>{errors.date.message}</p>}
          </div>

          {lockedTour ? (
            <input type="hidden" {...register("tour")} value={lockedTour.slug} />
          ) : (
            <div className="sm:col-span-2">
              <label className={label}>{tourFieldLabel}</label>
              <div className="relative">
                <select
                  {...register("tour")}
                  className={`${field} appearance-none pr-11`}
                >
                  <option value="" className="bg-night-900">
                    {chooseRide}
                  </option>
                  {allTours.map((tt) => (
                    <option key={tt.slug} value={tt.slug} className="bg-night-900">
                      {tt.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lava-400" />
              </div>
              {errors.tour && <p className={errorCls}>{errors.tour.message}</p>}
            </div>
          )}

          {hasVariants && currentTour ? (
            <div className="sm:col-span-2">
              <label className={label}>{howManyEach}</label>
              <div className="space-y-3">
                <QuantityRow
                  title={currentTour.variants![0].label}
                  subtitle={oneRiderPerQuad}
                  price={
                    selectedOperator?.variantPrices?.single ??
                    currentTour.variants![0].price
                  }
                  priceLabel={perPersonLabel}
                  value={singles}
                  onChange={(v) => setValue("singles", v, { shouldValidate: true })}
                />
                <QuantityRow
                  title={currentTour.variants![1].label}
                  subtitle={twoRiderPerQuad(currentTour.minPassengerAge ?? 5)}
                  price={
                    selectedOperator?.variantPrices?.double ??
                    currentTour.variants![1].price
                  }
                  priceLabel={locale === "es" ? "por cuadraciclo" : "per quad"}
                  value={doubles}
                  onChange={(v) => setValue("doubles", v, { shouldValidate: true })}
                />
              </div>
              {selectedOperator?.variantPrices && (
                <p className="mt-2 text-xs text-white/55">
                  {pricingShownWith(selectedOperator.name)}
                </p>
              )}
              {errors.riders && (
                <p className={errorCls}>{errors.riders.message}</p>
              )}
            </div>
          ) : (
            <div className="sm:col-span-2">
              <label className={label}>{currentTour ? utvsAndRiders : ridersOnly}</label>
              {currentTour ? (
                <div className="space-y-3">
                  <QuantityRow
                    title={utvVehicles}
                    subtitle={eachUtvSeats(effectiveMaxSeats)}
                    price={
                      selectedOperator?.utvTierPrices
                        ? selectedOperator.utvTierPrices[0].price
                        : currentTour.price
                    }
                    priceLabel={
                      selectedOperator?.utvTierPrices ? fromUtv : perUtvLabel
                    }
                    max={10}
                    value={utvs}
                    onChange={(v) => setValue("utvs", v, { shouldValidate: true })}
                  />
                  <QuantityRow
                    title={totalRidersLabel}
                    subtitle={
                      selectedOperator?.utvTierPrices
                        ? tieredNote(selectedOperator, currentTour.minPassengerAge ?? 2)
                        : currentTour.pricingMode === "flat-plus-per-person"
                          ? perPersonNote(currentTour.minPassengerAge ?? 2)
                          : groupSizeNote(currentTour.minPassengerAge ?? 2)
                    }
                    price={
                      selectedOperator?.utvTierPrices
                        ? 0
                        : currentTour.pricingMode === "flat-plus-per-person"
                          ? currentTour.perPersonAddon ?? 0
                          : 0
                    }
                    priceLabel={
                      selectedOperator?.utvTierPrices
                        ? seeUtvTiers
                        : currentTour.pricingMode === "flat-plus-per-person"
                          ? perPersonLabel
                          : includedLabel
                    }
                    max={Math.max(1, utvs) * effectiveMaxSeats}
                    value={riders}
                    onChange={(v) => setValue("riders", v, { shouldValidate: true })}
                  />
                  {selectedOperator?.utvTierPrices && utvs > 0 && riders > 0 && (
                    <p className="text-xs text-white/55">
                      {distributedAcross(selectedOperator)}
                    </p>
                  )}
                  {currentTour.seatingNote && (
                    <p className="text-xs text-white/55">{currentTour.seatingNote}</p>
                  )}
                </div>
              ) : (
                <QuantityRow
                  title={totalRidersLabel}
                  subtitle={groupSize}
                  price={0}
                  priceLabel={perPersonLabel}
                  value={riders}
                  onChange={(v) => setValue("riders", v, { shouldValidate: true })}
                />
              )}
              {errors.utvs && <p className={errorCls}>{errors.utvs.message}</p>}
              {errors.riders && (
                <p className={errorCls}>{errors.riders.message}</p>
              )}
            </div>
          )}

          {currentTour?.canopyOperators && lockedOperator && (
            <div className="sm:col-span-2">
              <label className={label}>{bf.canopyOperator}</label>
              <div className="flex items-start justify-between gap-3 rounded-2xl border border-lava-400/60 bg-lava-500/10 p-4">
                <div className="min-w-0">
                  <div className="font-display text-base tracking-wide text-white">
                    {lockedOperator.name}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-lava-400">
                    {lockedOperator.recommendedZone}
                  </div>
                  <p className="mt-2 text-xs text-white/65">
                    {lockedOperator.description}
                  </p>
                </div>
                {lockedTour && (
                  <Link
                    href={`/tours/${lockedTour.slug}`}
                    className="shrink-0 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 transition hover:border-lava-400 hover:text-white"
                  >
                    {change}
                  </Link>
                )}
              </div>
            </div>
          )}
          {currentTour?.canopyOperators && !lockedOperator && (
            <div className="sm:col-span-2">
              <label className={label}>{bf.canopyOperator}</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {currentTour.canopyOperators.map((op) => {
                  const selected = canopyOperator === op.slug;
                  const isPreselected =
                    validPreselectedOperator === op.slug && selected;
                  return (
                    <button
                      key={op.slug}
                      type="button"
                      onClick={() =>
                        setValue("canopyOperator", op.slug, { shouldValidate: true })
                      }
                      className={`relative rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-lava-400 bg-lava-500/10"
                          : "border-white/15 bg-white/[0.03] hover:border-white/30"
                      }`}
                    >
                      {isPreselected && (
                        <span className="absolute right-3 top-3 rounded-full border border-lava-400/60 bg-lava-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-lava-300">
                          {preSelected}
                        </span>
                      )}
                      <div className="font-display text-base tracking-wide text-white">
                        {op.name}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-lava-400">
                        {op.recommendedZone}
                      </div>
                      <div className="mt-2 text-xs text-white/65">{op.description}</div>
                    </button>
                  );
                })}
              </div>
              {errors.canopyOperator && (
                <p className={errorCls}>{errors.canopyOperator.message}</p>
              )}
              {selectedOperator &&
                (selectedOperator.departures || selectedOperator.freePickupZones) && (
                  <div className="mt-3 rounded-2xl border border-lava-500/30 bg-lava-500/5 p-3 text-xs text-white/75">
                    {selectedOperator.departures && (
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-lava-400">
                          {dict.common.departures} ·{" "}
                        </span>
                        <span className="font-display tracking-wide text-white">
                          {selectedOperator.departures.join(" · ")}
                        </span>
                      </div>
                    )}
                    {selectedOperator.pickupNote && (
                      <p className="mt-2 text-[11px] text-white/65">
                        {selectedOperator.pickupNote}
                      </p>
                    )}
                  </div>
                )}
            </div>
          )}

          <div className="sm:col-span-2">
            <label className={label}>{departureTime}</label>
            {currentTour?.canopyOperators && !selectedOperator ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-xs text-white/55">
                {pickCanopyFirst}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(selectedOperator?.departures ?? SCHEDULE.departures).map((tm) => {
                  const selected = watch("departure") === tm;
                  return (
                    <button
                      key={tm}
                      type="button"
                      onClick={() =>
                        setValue("departure", tm, { shouldValidate: true })
                      }
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selected
                          ? "border-lava-400 bg-lava-500/15 text-white"
                          : "border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30"
                      }`}
                    >
                      {tm}
                    </button>
                  );
                })}
              </div>
            )}
            {selectedOperator?.scheduleNote && (
              <p className="mt-2 text-[11px] text-white/55">
                {selectedOperator.scheduleNote}
              </p>
            )}
            {errors.departure && (
              <p className={errorCls}>{errors.departure.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={label}>{addOnLabel}</label>
            <QuantityRow
              title={translate(BANDANA.name, locale)}
              subtitle={translate(BANDANA.description, locale)}
              price={BANDANA.price}
              priceLabel={each}
              value={bandanas}
              onChange={(v) => setValue("bandanas", v, { shouldValidate: true })}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={label}>{needPickupLabel}</label>
            <div className="relative">
              <select
                {...register("pickupZone")}
                className={`${field} appearance-none pr-11`}
              >
                <option value="" className="bg-night-900">
                  {noThanksBase}
                </option>
                {selectedOperator?.freePickupZones ||
                selectedOperator?.paidPickupZones ? (
                  <>
                    {selectedOperator.freePickupZones?.map((name) => (
                      <option
                        key={name}
                        value={slugifyZone(name)}
                        className="bg-night-900"
                      >
                        {name} — {dict.common.free.toLowerCase()} ({selectedOperator.name})
                      </option>
                    ))}
                    {selectedOperator.paidPickupZones?.map((name) => (
                      <option
                        key={name}
                        value={slugifyZone(name)}
                        className="bg-night-900"
                      >
                        {name} — +${selectedOperator.extraPickupSurcharge ?? 0}{" "}
                        ({selectedOperator.name})
                      </option>
                    ))}
                  </>
                ) : (
                  TRANSPORT_ZONES.map((z) => (
                    <option key={z.slug} value={z.slug} className="bg-night-900">
                      {z.name}
                      {z.basePrice === 0
                        ? ` — ${dict.common.free.toLowerCase()}`
                        : ` — ${locale === "es" ? "desde" : "from"} $${z.basePrice}`}
                    </option>
                  ))
                )}
                <option value="other" className="bg-night-900">
                  {otherLocation}
                </option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lava-400" />
            </div>
            {pickupZone === "other" && (
              <div className="mt-3">
                <input
                  {...register("pickupOther")}
                  placeholder={hotelOrLocation}
                  className={field}
                />
                {errors.pickupOther && (
                  <p className={errorCls}>{errors.pickupOther.message}</p>
                )}
              </div>
            )}
            {pickupZone &&
              pickupZone !== "" &&
              pickupZone !== "other" &&
              !selectedOperator?.freePickupZones && (
                <p className="mt-3 text-xs text-white/60">{transportNote}</p>
              )}
            {pickupZone &&
              pickupZone !== "" &&
              pickupZone !== "other" &&
              selectedOperator?.freePickupZones && (
                <p className="mt-3 text-xs text-white/60">
                  {selectedOperator.pickupNote ??
                    `${locale === "es" ? "Recogida con" : "Pickup with"} ${selectedOperator.name}.`}
                </p>
              )}
            {pickupZone === "other" && (
              <p className="mt-3 text-xs text-white/60">{otherTransportNote}</p>
            )}
          </div>

          {currentTour && (
            <div className="sm:col-span-2">
              <div className="rounded-2xl border border-lava-500/40 bg-lava-500/10 px-4 py-4 sm:px-5">
                <div className="flex items-end justify-between gap-3 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                      {totalLabel}
                    </div>
                    <div className="mt-0.5 text-sm text-white/75">
                      {!hasVariants && utvs > 0 && (
                        <span>
                          {utvs} {utvWord(utvs)} ·{" "}
                        </span>
                      )}
                      {totalRiders} {ridersWord(totalRiders)}
                      {hasVariants && (singles > 0 || doubles > 0) && (
                        <span className="text-white/55">
                          {" "}
                          ({singles > 0 && `${singles} Single`}
                          {singles > 0 && doubles > 0 && " + "}
                          {doubles > 0 && `${doubles} Double`})
                        </span>
                      )}
                      {bandanas > 0 && (
                        <span className="text-white/55">
                          {" "}
                          · {bandanas} {bandanaWord(bandanas)}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-white/45">
                      {ivaIncluded}
                      {transport.zoneName
                        ? transport.cost > 0
                          ? transportIncl
                          : transportFree
                        : pickupZone === "other"
                          ? transportTbc
                          : baseCampPickup}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-2xl text-lava-400 sm:text-3xl">
                      ${totalPrice}
                    </div>
                  </div>
                </div>

                {totalPrice > 0 && (
                  <ul className="mt-3 space-y-1 border-t border-white/10 pt-3 text-xs text-white/60">
                    {hasVariants && currentTour.variants && (() => {
                      const singlePrice =
                        selectedOperator?.variantPrices?.single ??
                        currentTour.variants[0].price;
                      const doublePrice =
                        selectedOperator?.variantPrices?.double ??
                        currentTour.variants[1].price;
                      return (
                        <>
                          {singles > 0 && (
                            <li className="flex justify-between gap-3">
                              <span>
                                {singles} × {currentTour.variants[0].label}
                                {selectedOperator?.variantPrices?.single !== undefined &&
                                  ` (${selectedOperator.name})`}
                              </span>
                              <span>${singles * singlePrice}</span>
                            </li>
                          )}
                          {doubles > 0 && (
                            <li className="flex justify-between gap-3">
                              <span>
                                {doubles} × {currentTour.variants[1].label}
                                {selectedOperator?.variantPrices?.double !== undefined &&
                                  ` (${selectedOperator.name})`}
                              </span>
                              <span>${doubles * doublePrice}</span>
                            </li>
                          )}
                        </>
                      );
                    })()}
                    {!hasVariants &&
                      selectedOperator?.utvTierPrices &&
                      utvs > 0 &&
                      riders > 0 &&
                      distributeRiders(riders, utvs).map((utvRiders, idx) => {
                        const tier = selectedOperator.utvTierPrices!.find(
                          (tt) => tt.riders === utvRiders,
                        );
                        return (
                          <li key={idx} className="flex justify-between gap-3">
                            <span>
                              UTV {idx + 1} · {utvRiders} {ridersWord(utvRiders)} ({selectedOperator.name})
                            </span>
                            <span>{tier ? `$${tier.price}` : "—"}</span>
                          </li>
                        );
                      })}
                    {!hasVariants && !selectedOperator?.utvTierPrices && utvs > 0 && (
                      <li className="flex justify-between gap-3">
                        <span>
                          {utvs} × UTV (${currentTour.price})
                        </span>
                        <span>${utvs * currentTour.price}</span>
                      </li>
                    )}
                    {!hasVariants &&
                      !selectedOperator?.utvTierPrices &&
                      currentTour.pricingMode === "flat-plus-per-person" &&
                      riders > 0 &&
                      (currentTour.perPersonAddon ?? 0) > 0 && (
                        <li className="flex justify-between gap-3">
                          <span>
                            {riders} × {currentTour.addon} (${currentTour.perPersonAddon}/{perPersonLabel})
                          </span>
                          <span>${riders * (currentTour.perPersonAddon ?? 0)}</span>
                        </li>
                      )}
                    {bandanas > 0 && (
                      <li className="flex justify-between gap-3">
                        <span>
                          {bandanas} × {translate(BANDANA.name, locale)} (${BANDANA.price})
                        </span>
                        <span>${bandanaSubtotal}</span>
                      </li>
                    )}
                    {transport.zoneName && (
                      <li className="flex justify-between gap-3">
                        <span>
                          {transportLabel} — {transport.zoneName}
                          {!selectedOperator?.freePickupZones &&
                            totalRiders > TRANSPORT_INFO.includedPassengers &&
                            inclExtra(totalRiders - TRANSPORT_INFO.includedPassengers)}
                        </span>
                        <span>
                          {transportSubtotal === 0
                            ? dict.common.free
                            : `$${transportSubtotal}`}
                        </span>
                      </li>
                    )}
                    {pickupZone === "other" && (
                      <li className="flex justify-between gap-3 text-white/45">
                        <span>{transportTbcLine}</span>
                        <span>—</span>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Your details */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur sm:p-6 md:p-8">
        <div className="mb-6 flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lava-500/20 font-display text-lg text-lava-400 ring-1 ring-lava-500/40">
            2
          </span>
          <div>
            <h3 className="font-display text-xl tracking-wide text-white">
              {sectionDetailsTitle}
            </h3>
            <p className="text-xs text-white/55">{sectionDetailsSub}</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>{fullName}</label>
            <input
              {...register("name")}
              placeholder={locale === "es" ? "Juana Pérez" : "Alex Morgan"}
              className={field}
            />
            {errors.name && <p className={errorCls}>{errors.name.message}</p>}
          </div>

          <div>
            <label className={label}>{emailLabel}</label>
            <input
              {...register("email")}
              placeholder={locale === "es" ? "tu@correo.com" : "you@email.com"}
              className={field}
            />
            {errors.email && <p className={errorCls}>{errors.email.message}</p>}
          </div>

          <div>
            <label className={label}>{phoneLabel}</label>
            <input
              {...register("phone")}
              placeholder="+506 8575-7272"
              className={field}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/75">
              <input
                type="checkbox"
                {...register("license")}
                className="mt-1 h-4 w-4 accent-lava-500"
              />
              <span>{licenseConfirm}</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className={label}>{messageLabel}</label>
            <textarea
              rows={3}
              {...register("message")}
              placeholder={messagePh}
              className={field}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-6 w-full disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {reviewing}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> {bookThisTour}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function QuantityRow({
  title,
  subtitle,
  price,
  priceLabel = "per quad",
  prefix,
  max = 30,
  value,
  onChange,
}: {
  title: string;
  subtitle: string;
  price: number;
  priceLabel?: string;
  prefix?: string;
  max?: number;
  value: number;
  onChange: (n: number) => void;
}) {
  const dec = () => onChange(Math.max(0, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-3 sm:gap-4 sm:px-4">
      <div className="min-w-0 flex-1">
        <div className="font-display text-sm tracking-wide text-white sm:text-base">
          {title}
        </div>
        <div className="mt-0.5 text-[11px] text-white/55">{subtitle}</div>
        <div className="mt-1 text-xs text-lava-400">
          {prefix && <span className="mr-1 text-white/70">{prefix}</span>}${price}{" "}
          <span className="text-white/50">{priceLabel}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={dec}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-lava-400 hover:text-white disabled:opacity-40 sm:h-9 sm:w-9"
          disabled={value <= 0}
          aria-label="-"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-6 text-center font-display text-xl text-white sm:w-7">
          {value}
        </span>
        <button
          type="button"
          onClick={inc}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-lava-400 hover:text-white sm:h-9 sm:w-9"
          disabled={value >= max}
          aria-label="+"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
