"use client";

import { useEffect } from "react";
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
  computeUtvTierTotal,
  distributeRiders,
  type CanopyOperator,
} from "@/lib/tours";
import {
  ADD_ONS,
  SCHEDULE,
  TRANSPORT_ZONES,
  TRANSPORT_INFO,
} from "@/lib/info";
import { DatePicker } from "./DatePicker";

const BANDANA = ADD_ONS.find((a) => a.slug === "bandana")!;

function allowedDepartures(operator?: CanopyOperator) {
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
  operator?: CanopyOperator,
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
    name: z.string().min(2, "Your name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    date: z.string().min(1, "Pick a date"),
    departure: z.string().min(1, "Pick a departure time"),
    tour: z.string().min(1, "Choose a tour"),
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
        const minTier = Math.min(...operator.utvTierPrices.map((t) => t.riders));
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
      !allowedDepartures(operator).includes(d.departure)
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
}: {
  preselectedSlug?: string;
  preselectedOperator?: string;
} = {}) {
  const lockedTour = preselectedSlug ? getTour(preselectedSlug) : undefined;
  const validPreselectedOperator =
    preselectedOperator &&
    lockedTour?.canopyOperators?.some((o) => o.slug === preselectedOperator)
      ? preselectedOperator
      : "";

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
  const currentTour = getTour(currentSlug);
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

  // Reset operator when tour changes
  useEffect(() => {
    if (!currentTour?.canopyOperators && canopyOperator) {
      setValue("canopyOperator", "");
    }
  }, [currentTour, canopyOperator, setValue]);

  // Reset pickup when the operator zone overrides change
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

  // Reset departure when it's no longer valid for the selected operator
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

  // Keep riders within [utvs, utvs * effectiveMaxSeats]
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
    await new Promise((r) => setTimeout(r, 400));

    const tour = getTour(data.tour);
    const operator = tour?.canopyOperators?.find(
      (o) => o.slug === data.canopyOperator
    );
    const summary = {
      contact: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
      },
      tour: {
        slug: tour?.slug ?? "",
        title: tour?.title ?? "",
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
    };

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur sm:p-6 md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Full name</label>
          <input {...register("name")} placeholder="Alex Morgan" className={field} />
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={label}>Email</label>
          <input
            {...register("email")}
            placeholder="you@email.com"
            className={field}
          />
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={label}>Phone / WhatsApp</label>
          <input
            {...register("phone")}
            placeholder="+506 8519-2804"
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Date</label>
          <Controller
            control={control}
            name="date"
            render={({ field: f }) => (
              <DatePicker value={f.value} onChange={f.onChange} />
            )}
          />
          {errors.date && <p className={errorCls}>{errors.date.message}</p>}
        </div>

        {/* Tour: hidden when already on a tour page, dropdown otherwise */}
        {lockedTour ? (
          <input type="hidden" {...register("tour")} value={lockedTour.slug} />
        ) : (
          <div className="sm:col-span-2">
            <label className={label}>Tour</label>
            <div className="relative">
              <select
                {...register("tour")}
                className={`${field} appearance-none pr-11`}
              >
                <option value="" className="bg-night-900">
                  Choose your ride…
                </option>
                {TOURS.map((t) => (
                  <option key={t.slug} value={t.slug} className="bg-night-900">
                    {t.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lava-400" />
            </div>
            {errors.tour && <p className={errorCls}>{errors.tour.message}</p>}
          </div>
        )}

        {/* Quantity pickers depend on tour */}
        {hasVariants && currentTour ? (
          <div className="sm:col-span-2">
            <label className={label}>How many of each?</label>
            <div className="space-y-3">
              <QuantityRow
                title={currentTour.variants![0].label}
                subtitle="1 rider per quad"
                price={
                  selectedOperator?.variantPrices?.single ??
                  currentTour.variants![0].price
                }
                value={singles}
                onChange={(v) => setValue("singles", v, { shouldValidate: true })}
              />
              <QuantityRow
                title={currentTour.variants![1].label}
                subtitle={`2 riders per quad · passenger ${currentTour.minPassengerAge}+ yrs`}
                price={
                  selectedOperator?.variantPrices?.double ??
                  currentTour.variants![1].price
                }
                value={doubles}
                onChange={(v) => setValue("doubles", v, { shouldValidate: true })}
              />
            </div>
            {selectedOperator?.variantPrices && (
              <p className="mt-2 text-xs text-white/55">
                Pricing shown with {selectedOperator.name}.
              </p>
            )}
            {errors.riders && (
              <p className={errorCls}>{errors.riders.message}</p>
            )}
          </div>
        ) : (
          <div className="sm:col-span-2">
            <label className={label}>
              {currentTour ? "UTVs & riders" : "Riders"}
            </label>
            {currentTour ? (
              <div className="space-y-3">
                <QuantityRow
                  title="UTV vehicles"
                  subtitle={`Each UTV seats up to ${effectiveMaxSeats}. Book multiple UTVs for larger groups.`}
                  price={
                    selectedOperator?.utvTierPrices
                      ? selectedOperator.utvTierPrices[0].price
                      : currentTour.price
                  }
                  priceLabel={
                    selectedOperator?.utvTierPrices ? "from / UTV" : "per UTV"
                  }
                  max={10}
                  value={utvs}
                  onChange={(v) => setValue("utvs", v, { shouldValidate: true })}
                />
                <QuantityRow
                  title="Total riders"
                  subtitle={
                    selectedOperator?.utvTierPrices
                      ? `Priced per UTV by rider count (${selectedOperator.utvTierPrices.map((t) => `x${t.riders} $${t.price}`).join(" · ")}). Passenger ${currentTour.minPassengerAge}+ yrs.`
                      : currentTour.pricingMode === "flat-plus-per-person"
                        ? `Priced per person. Passenger ${currentTour.minPassengerAge}+ yrs.`
                        : `Headcount across all UTVs. Passenger ${currentTour.minPassengerAge}+ yrs.`
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
                      ? "see UTV tiers"
                      : currentTour.pricingMode === "flat-plus-per-person"
                        ? "per person"
                        : "included"
                  }
                  max={Math.max(1, utvs) * effectiveMaxSeats}
                  value={riders}
                  onChange={(v) => setValue("riders", v, { shouldValidate: true })}
                />
                {selectedOperator?.utvTierPrices && utvs > 0 && riders > 0 && (
                  <p className="text-xs text-white/55">
                    Riders distributed across UTVs:{" "}
                    {distributeRiders(riders, utvs)
                      .map((n) => `${n} rider${n === 1 ? "" : "s"}`)
                      .join(" + ")}
                    .
                  </p>
                )}
                {currentTour.seatingNote && (
                  <p className="text-xs text-white/55">{currentTour.seatingNote}</p>
                )}
              </div>
            ) : (
              <QuantityRow
                title="Total riders"
                subtitle="Group size"
                price={0}
                priceLabel="per person"
                value={riders}
                onChange={(v) => setValue("riders", v, { shouldValidate: true })}
              />
            )}
            {errors.utvs && (
              <p className={errorCls}>{errors.utvs.message}</p>
            )}
            {errors.riders && (
              <p className={errorCls}>{errors.riders.message}</p>
            )}
          </div>
        )}

        {/* Canopy operator picker */}
        {currentTour?.canopyOperators && (
          <div className="sm:col-span-2">
            <label className={label}>Canopy operator</label>
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
                        Pre-selected
                      </span>
                    )}
                    <div className="font-display text-base tracking-wide text-white">
                      {op.name}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-widest text-lava-400">
                      {op.recommendedZone}
                    </div>
                    <div className="mt-2 text-xs text-white/65">
                      {op.description}
                    </div>
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
                        Departures ·{" "}
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

        {/* Departure time — filtered by canopy operator when applicable */}
        <div className="sm:col-span-2">
          <label className={label}>Departure time</label>
          {currentTour?.canopyOperators && !selectedOperator ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-xs text-white/55">
              Pick your canopy operator above to see available departure times.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(selectedOperator?.departures ?? SCHEDULE.departures).map((t) => {
                const selected = watch("departure") === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setValue("departure", t, { shouldValidate: true })
                    }
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selected
                        ? "border-lava-400 bg-lava-500/15 text-white"
                        : "border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30"
                    }`}
                  >
                    {t}
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

        {/* Bandana add-on */}
        <div className="sm:col-span-2">
          <label className={label}>Add-on</label>
          <QuantityRow
            title={BANDANA.name}
            subtitle={BANDANA.description}
            price={BANDANA.price}
            priceLabel="each"
            value={bandanas}
            onChange={(v) => setValue("bandanas", v, { shouldValidate: true })}
          />
        </div>

        {/* Pickup / transport */}
        <div className="sm:col-span-2">
          <label className={label}>Need hotel pickup?</label>
          <div className="relative">
            <select
              {...register("pickupZone")}
              className={`${field} appearance-none pr-11`}
            >
              <option value="" className="bg-night-900">
                No thanks — I&apos;ll meet at base camp
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
                      {name} — free ({selectedOperator.name})
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
                      ? " — free"
                      : ` — from $${z.basePrice}`}
                  </option>
                ))
              )}
              <option value="other" className="bg-night-900">
                Other location / hotel (we&apos;ll confirm rate)
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lava-400" />
          </div>
          {pickupZone === "other" && (
            <div className="mt-3">
              <input
                {...register("pickupOther")}
                placeholder="Hotel name or location"
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
              <p className="mt-3 text-xs text-white/60">
                Listed rate covers 1–{TRANSPORT_INFO.includedPassengers} riders;
                extra riders add to the base. The transport cost is added to
                your total below — our team will confirm everything when we
                reply to your booking.
              </p>
            )}
          {pickupZone &&
            pickupZone !== "" &&
            pickupZone !== "other" &&
            selectedOperator?.freePickupZones && (
              <p className="mt-3 text-xs text-white/60">
                {selectedOperator.pickupNote ??
                  `Pickup with ${selectedOperator.name}.`}
              </p>
            )}
          {pickupZone === "other" && (
            <p className="mt-3 text-xs text-white/60">
              We don&apos;t have a fixed rate for this location — our team will
              reach out to confirm the transport cost before charging anything.
            </p>
          )}
        </div>

        {/* Live total */}
        {currentTour && (
          <div className="sm:col-span-2">
            <div className="rounded-2xl border border-lava-500/40 bg-lava-500/10 px-4 py-4 sm:px-5">
              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Total
                  </div>
                  <div className="mt-0.5 text-sm text-white/75">
                    {!hasVariants && utvs > 0 && (
                      <span>
                        {utvs} UTV{utvs > 1 ? "s" : ""} ·{" "}
                      </span>
                    )}
                    {totalRiders} {totalRiders === 1 ? "rider" : "riders"}
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
                        · {bandanas} bandana{bandanas > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/45">
                    Tax included
                    {transport.zoneName
                      ? transport.cost > 0
                        ? " · transport included"
                        : " · free transport"
                      : pickupZone === "other"
                        ? " · transport TBC"
                        : " · base camp pickup"}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-display text-2xl text-lava-400 sm:text-3xl">
                    ${totalPrice}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">
                    estimated
                  </div>
                </div>
              </div>

              {/* Breakdown */}
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
                        (t) => t.riders === utvRiders,
                      );
                      return (
                        <li
                          key={idx}
                          className="flex justify-between gap-3"
                        >
                          <span>
                            UTV {idx + 1} · {utvRiders} riders ({selectedOperator.name})
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
                          {riders} × {currentTour.addon} (${currentTour.perPersonAddon}
                          /person)
                        </span>
                        <span>
                          ${riders * (currentTour.perPersonAddon ?? 0)}
                        </span>
                      </li>
                    )}
                  {bandanas > 0 && (
                    <li className="flex justify-between gap-3">
                      <span>
                        {bandanas} × Bandana (${BANDANA.price})
                      </span>
                      <span>${bandanaSubtotal}</span>
                    </li>
                  )}
                  {transport.zoneName && (
                    <li className="flex justify-between gap-3">
                      <span>
                        Transport — {transport.zoneName}
                        {!selectedOperator?.freePickupZones &&
                          totalRiders > TRANSPORT_INFO.includedPassengers &&
                          ` (incl. ${totalRiders - TRANSPORT_INFO.includedPassengers} extra)`}
                      </span>
                      <span>
                        {transportSubtotal === 0
                          ? "Free"
                          : `$${transportSubtotal}`}
                      </span>
                    </li>
                  )}
                  {pickupZone === "other" && (
                    <li className="flex justify-between gap-3 text-white/45">
                      <span>Transport — to be confirmed</span>
                      <span>—</span>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/75">
            <input
              type="checkbox"
              {...register("license")}
              className="mt-1 h-4 w-4 accent-lava-500"
            />
            <span>
              I confirm the driver has a valid driver&apos;s license. Required
              for all ATV and UTV rides.
            </span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Message (optional)</label>
          <textarea
            rows={3}
            {...register("message")}
            placeholder="Ages of passengers, pickup location, special requests…"
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
            <Loader2 className="h-4 w-4 animate-spin" /> Reviewing
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Review my booking
          </>
        )}
      </button>
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
          aria-label="Decrease"
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
          aria-label="Increase"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
