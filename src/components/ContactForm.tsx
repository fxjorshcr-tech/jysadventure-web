"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Tell us a bit more"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone ?? "",
          subject: data.subject ?? "",
          message: data.message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Contact request failed");
      }
    } catch (err) {
      console.error("Contact submit failed", err);
      setSubmitError(
        "We couldn't send your message right now. Please try again or email us directly.",
      );
      return;
    }
    setSent(true);
    reset();
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
          <input
            {...register("name")}
            placeholder="Alex Morgan"
            className={field}
          />
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
          <label className={label}>Subject (optional)</label>
          <input
            {...register("subject")}
            placeholder="Question about the UTV tour, availability, etc."
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Message</label>
          <textarea
            rows={5}
            {...register("message")}
            placeholder="How can we help?"
            className={field}
          />
          {errors.message && (
            <p className={errorCls}>{errors.message.message}</p>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-white/55">
        Ready to book instead? Head to the{" "}
        <a href="/tours" className="text-lava-400 hover:underline">
          Tours page
        </a>{" "}
        and reserve directly from any tour.
      </p>

      {submitError && (
        <p className="mt-4 rounded-2xl border border-lava-500/40 bg-lava-500/10 p-3 text-sm text-lava-300">
          {submitError}
        </p>
      )}

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
            <CheckCircle2 className="h-4 w-4" /> Sent! We&apos;ll reply soon
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
    </form>
  );
}
