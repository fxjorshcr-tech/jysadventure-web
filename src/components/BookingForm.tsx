"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2, Minus, Plus } from "lucide-react";
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

export function BookingForm({ preselectedSlug }: { preselectedSlug?: string } = {}) {
  const [sent, setSent] = useState(false);

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
      riders: 2,
      tour: preselectedSlug ?? "",
    },
  });

  const currentSlug = watch("tour");
  const currentTour = getTour(currentSlug);
  const hasVariants = !!currentTour?.variants;
  const singles = watch("singles") ?? 0;
  const doubles = watch("doubles") ?? 0;
  const totalRiders = hasVariants ? singles + doubles * 2 : watch("riders") ?? 0;

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset({
      singles: 0,
      doubles: 0,
      riders: 2,
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
      className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur md:p-8"
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

        <div className="sm:col-span-2">
          <label className={label}>Tour</label>
          <select
            {...register("tour")}
            className={`${field} appearance-none`}
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
          {errors.tour && <p className={errorCls}>{errors.tour.message}</p>}
        </div>

        {/* Quantity pickers depend on tour */}
        {hasVariants ? (
          <div className="sm:col-span-2">
            <label className={label}>How many of each?</label>
            <div className="grid gap-3 sm:grid-cols-2">
              <QuantityField
                title="ATV Single"
                sub={`$${currentTour!.variants![0].price} / quad · 1 rider`}
                value={singles}
                onChange={(v) => setValue("singles", v, { shouldValidate: true })}
              />
              <QuantityField
                title="ATV Double"
                sub={`$${currentTour!.variants![1].price} / quad · 2 riders (5+)`}
                value={doubles}
                onChange={(v) => setValue("doubles", v, { shouldValidate: true })}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-white/60">
              <span>
                Total riders:{" "}
                <span className="font-bold text-white">{totalRiders}</span>
              </span>
              {errors.riders && (
                <span className="text-lava-400">{errors.riders.message}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="sm:col-span-2">
            <label className={label}>Riders</label>
            <QuantityField
              title="Total riders"
              sub={
                currentTour
                  ? `$${currentTour.price} / person`
                  : "Group size"
              }
              value={watch("riders") ?? 0}
              onChange={(v) => setValue("riders", v, { shouldValidate: true })}
            />
            {errors.riders && (
              <p className={errorCls}>{errors.riders.message}</p>
            )}
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

function QuantityField({
  title,
  sub,
  value,
  onChange,
}: {
  title: string;
  sub: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const dec = () => onChange(Math.max(0, value - 1));
  const inc = () => onChange(Math.min(30, value + 1));
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3">
      <div className="min-w-0">
        <div className="truncate font-display text-base tracking-wide text-white">
          {title}
        </div>
        <div className="truncate text-[11px] text-white/55">{sub}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-lava-400 hover:text-white disabled:opacity-40"
          disabled={value <= 0}
          aria-label="Decrease"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center font-display text-lg text-white">
          {value}
        </span>
        <button
          type="button"
          onClick={inc}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-lava-400 hover:text-white"
          aria-label="Increase"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
