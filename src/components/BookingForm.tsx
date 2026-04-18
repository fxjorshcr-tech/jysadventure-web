"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { TOURS } from "@/lib/tours";

const schema = z.object({
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Pick a date"),
  people: z.coerce.number().min(1, "Min 1 rider").max(30, "Max 30 riders"),
  tour: z.string().min(1, "Choose a tour"),
  license: z.boolean().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function BookingForm({ preselectedSlug }: { preselectedSlug?: string } = {}) {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { people: 2, tour: preselectedSlug ?? "" },
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset({ people: 2, tour: preselectedSlug ?? "" });
    setTimeout(() => setSent(false), 4500);
  };

  const field =
    "w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-sm transition focus:border-lava-400 focus:bg-white/[0.06] focus:ring-2 focus:ring-lava-500/30";
  const label =
    "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-white/60";
  const error = "mt-1 text-xs text-lava-400";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Full name</label>
          <input {...register("name")} placeholder="Alex Morgan" className={field} />
          {errors.name && <p className={error}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={label}>Email</label>
          <input {...register("email")} placeholder="you@email.com" className={field} />
          {errors.email && <p className={error}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={label}>Date</label>
          <input type="date" {...register("date")} className={field} />
          {errors.date && <p className={error}>{errors.date.message}</p>}
        </div>

        <div>
          <label className={label}>Riders</label>
          <input type="number" min={1} max={30} {...register("people")} className={field} />
          {errors.people && <p className={error}>{errors.people.message}</p>}
        </div>

        <div>
          <label className={label}>Tour</label>
          <select {...register("tour")} className={`${field} appearance-none`}>
            <option value="" className="bg-night-900">Choose your ride…</option>
            {TOURS.map((t) => (
              <option key={t.slug} value={t.slug} className="bg-night-900">
                {t.title}
              </option>
            ))}
          </select>
          {errors.tour && <p className={error}>{errors.tour.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/75">
            <input
              type="checkbox"
              {...register("license")}
              className="mt-1 h-4 w-4 accent-lava-500"
            />
            <span>
              I confirm the driver has a valid driver&apos;s license. Required for
              all ATV and UTV rides.
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
