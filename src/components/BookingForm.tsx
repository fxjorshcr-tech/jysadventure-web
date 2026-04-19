"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Loader2,
  CheckCircle2,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";
import { TOURS, getTour } from "@/lib/tours";
import { DatePicker } from "./DatePicker";

const schema = z
  .object({
    name: z.string().min(2, "Your name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    date: z.string().min(1, "Pick a date"),
    tour: z.string().min(1, "Choose a tour"),
    singles: z.coerce.number().min(0).max(20),
    doubles: z.coerce.number().min(0).max(20),
    riders: z.coerce.number().min(0).max(30),
    license: z.boolean().optional(),
    message: z.string().optional(),
  })
  .refine(
    (d) => {
      const tour = getTour(d.tour);
      if (!tour) return true;
      if (tour.variants) {
        return (d.singles ?? 0) + (d.doubles ?? 0) > 0;
      }
      return (d.riders ?? 0) > 0;
    },
    {
      message: "Add at least 1 rider or vehicle",
      path: ["riders"],
    }
  );

type FormData = z.infer<typeof schema>;

export function BookingForm({
  preselectedSlug,
}: {
  preselectedSlug?: string;
} = {}) {
  const [sent, setSent] = useState(false);
  const lockedTour = preselectedSlug ? getTour(preselectedSlug) : undefined;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      singles: 0,
      doubles: 0,
      riders: lockedTour && !lockedTour.variants ? 2 : 0,
      tour: preselectedSlug ?? "",
    },
  });

  const currentSlug = watch("tour");
  const currentTour = getTour(currentSlug);
  const hasVariants = !!currentTour?.variants;
  const singles = watch("singles") ?? 0;
  const doubles = watch("doubles") ?? 0;
  const riders = watch("riders") ?? 0;

  const totalRiders = hasVariants ? singles + doubles * 2 : riders;
  const totalPrice = currentTour
    ? hasVariants
      ? singles * (currentTour.variants![0].price) +
        doubles * (currentTour.variants![1].price)
      : riders * currentTour.price
    : 0;

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset({
      singles: 0,
      doubles: 0,
      riders: lockedTour && !lockedTour.variants ? 2 : 0,
      tour: preselectedSlug ?? "",
    });
    setTimeout(() => setSent(false), 4500);
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
            placeholder="+506 0000 0000"
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
        {hasVariants ? (
          <div className="sm:col-span-2">
            <label className={label}>How many of each?</label>
            <div className="space-y-3">
              <QuantityRow
                title={currentTour!.variants![0].label}
                subtitle="1 rider per quad"
                price={currentTour!.variants![0].price}
                value={singles}
                onChange={(v) => setValue("singles", v, { shouldValidate: true })}
              />
              <QuantityRow
                title={currentTour!.variants![1].label}
                subtitle={`2 riders per quad · passenger ${currentTour!.minPassengerAge}+`}
                price={currentTour!.variants![1].price}
                value={doubles}
                onChange={(v) => setValue("doubles", v, { shouldValidate: true })}
              />
            </div>
            {errors.riders && (
              <p className={errorCls}>{errors.riders.message}</p>
            )}
          </div>
        ) : (
          <div className="sm:col-span-2">
            <label className={label}>Riders</label>
            <QuantityRow
              title="Total riders"
              subtitle={
                currentTour
                  ? `Up to 4 per UTV · passenger ${currentTour.minPassengerAge}+`
                  : "Group size"
              }
              price={currentTour?.price ?? 0}
              priceLabel="per person"
              value={riders}
              onChange={(v) => setValue("riders", v, { shouldValidate: true })}
            />
            {errors.riders && (
              <p className={errorCls}>{errors.riders.message}</p>
            )}
          </div>
        )}

        {/* Live total */}
        {currentTour && (
          <div className="sm:col-span-2">
            <div className="flex items-end justify-between gap-3 rounded-2xl border border-lava-500/40 bg-lava-500/10 px-4 py-4 sm:gap-4 sm:px-5">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                  Total
                </div>
                <div className="mt-0.5 text-sm text-white/75">
                  {totalRiders} {totalRiders === 1 ? "rider" : "riders"}
                  {hasVariants && (singles > 0 || doubles > 0) && (
                    <span className="text-white/55">
                      {" "}
                      ({singles > 0 && `${singles} Single`}
                      {singles > 0 && doubles > 0 && " + "}
                      {doubles > 0 && `${doubles} Double`})
                    </span>
                  )}
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
        disabled={isSubmitting || sent}
        className="btn-primary mt-6 w-full disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : sent ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> Sent! We&apos;ll be in touch
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Launch my adventure
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
  value,
  onChange,
}: {
  title: string;
  subtitle: string;
  price: number;
  priceLabel?: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const dec = () => onChange(Math.max(0, value - 1));
  const inc = () => onChange(Math.min(30, value + 1));
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-3 sm:gap-4 sm:px-4">
      <div className="min-w-0 flex-1">
        <div className="font-display text-sm tracking-wide text-white sm:text-base">
          {title}
        </div>
        <div className="mt-0.5 text-[11px] text-white/55">{subtitle}</div>
        <div className="mt-1 text-xs text-lava-400">
          ${price} <span className="text-white/50">{priceLabel}</span>
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
          aria-label="Increase"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
