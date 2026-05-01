"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const cf = dict.contactForm;
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
          locale,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Contact request failed");
      }
    } catch (err) {
      console.error("Contact submit failed", err);
      setSubmitError(cf.error);
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
          <label className={label}>{cf.name}</label>
          <input
            {...register("name")}
            placeholder={cf.namePh}
            className={field}
          />
          {errors.name && <p className={errorCls}>{cf.required}</p>}
        </div>

        <div>
          <label className={label}>{cf.email}</label>
          <input
            {...register("email")}
            placeholder={cf.emailPh}
            className={field}
          />
          {errors.email && <p className={errorCls}>{cf.invalidEmail}</p>}
        </div>

        <div>
          <label className={label}>{cf.phone}</label>
          <input
            {...register("phone")}
            placeholder={cf.phonePh}
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>{cf.subject}</label>
          <input
            {...register("subject")}
            placeholder={cf.subjectPh}
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>{cf.message}</label>
          <textarea
            rows={5}
            {...register("message")}
            placeholder={cf.messagePh}
            className={field}
          />
          {errors.message && <p className={errorCls}>{cf.required}</p>}
        </div>
      </div>

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
            <Loader2 className="h-4 w-4 animate-spin" /> {cf.submitting}
          </>
        ) : sent ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> {cf.success}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {cf.submit}
          </>
        )}
      </button>
    </form>
  );
}
