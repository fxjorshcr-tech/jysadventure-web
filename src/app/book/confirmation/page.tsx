"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, Phone } from "lucide-react";
import { CONTACT } from "@/lib/info";

type Summary = {
  contact: { name: string; email: string; phone: string };
  tour: { slug: string; title: string };
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

  if (hydrated && !summary) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-night-950 px-4 pt-32">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl tracking-wide text-white md:text-5xl">
            No booking <span className="text-gradient-fire">found</span>
          </h1>
          <p className="mt-4 text-white/65">
            We don&apos;t have a booking summary to show. Pick a tour and start
            the booking flow there.
          </p>
          <Link href="/tours" className="btn-primary mt-8 inline-flex">
            Browse tours <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-night-950 pt-32">
        <div className="text-white/60">Loading…</div>
      </section>
    );
  }

  const v = summary.vehicles;

  return (
    <>
      <section className="relative w-full overflow-hidden bg-night-950 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="relative mx-auto w-full max-w-3xl px-4 pb-10 sm:px-5 sm:pb-14 lg:px-8">
          <div className="flex items-center gap-3 text-jungle-500">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
              Booking received
            </span>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2rem,8vw,3.75rem)] leading-[0.95] tracking-wide text-white md:text-6xl">
            Thanks, <span className="text-gradient-fire">{summary.contact.name.split(" ")[0]}!</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 md:text-lg">
            Here&apos;s the summary of your reservation. Our team will reach
            out shortly to confirm availability and finalize details.
          </p>
        </div>
      </section>

      <section className="relative bg-night-950 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
            <Section title="Tour">
              <Row label="Ride" value={summary.tour.title} />
              <Row label="Date" value={summary.schedule.date || "—"} />
              <Row label="Departure" value={summary.schedule.departure || "—"} />
              {summary.canopyOperator && (
                <Row label="Canopy operator" value={summary.canopyOperator.name} />
              )}
            </Section>

            <Divider />

            <Section title="Vehicles & riders">
              {v.mode === "atv" ? (
                <>
                  {v.singles > 0 && (
                    <Row label="ATV Single" value={`${v.singles}`} />
                  )}
                  {v.doubles > 0 && (
                    <Row label="ATV Double" value={`${v.doubles}`} />
                  )}
                  <Row label="Total riders" value={`${v.totalRiders}`} />
                </>
              ) : (
                <>
                  <Row label="UTV vehicles" value={`${v.utvs}`} />
                  <Row label="Total riders" value={`${v.riders}`} />
                </>
              )}
            </Section>

            <Divider />

            <Section title="Pickup">
              {summary.pickup.zoneSlug === "" ? (
                <Row label="Pickup" value="Meet at base camp" />
              ) : summary.pickup.zoneSlug === "other" ? (
                <>
                  <Row label="Pickup" value={summary.pickup.otherDetail || "Other"} />
                  <p className="mt-2 text-xs text-white/60">
                    We&apos;ll confirm the transport rate for this location
                    before charging anything.
                  </p>
                </>
              ) : (
                <>
                  <Row label="Pickup" value={summary.pickup.zoneName} />
                  <Row
                    label="Transport"
                    value={
                      summary.pickup.cost === 0
                        ? "Free"
                        : `$${summary.pickup.cost}`
                    }
                  />
                </>
              )}
            </Section>

            {summary.addons.bandanas > 0 && (
              <>
                <Divider />
                <Section title="Add-ons">
                  <Row
                    label="Bandanas"
                    value={`${summary.addons.bandanas}`}
                  />
                </Section>
              </>
            )}

            {summary.message && (
              <>
                <Divider />
                <Section title="Notes">
                  <p className="text-sm text-white/75">{summary.message}</p>
                </Section>
              </>
            )}

            <Divider />

            <Section title="Contact">
              <Row label="Name" value={summary.contact.name} />
              <Row label="Email" value={summary.contact.email} />
              {summary.contact.phone && (
                <Row label="Phone" value={summary.contact.phone} />
              )}
            </Section>

            <div className="mt-8 rounded-2xl border border-lava-500/40 bg-lava-500/10 p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Estimated total
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/45">
                    Tax included
                    {summary.pickup.zoneSlug && summary.pickup.zoneSlug !== "other"
                      ? " · transport included"
                      : summary.pickup.zoneSlug === "other"
                        ? " · transport TBC"
                        : ""}
                  </div>
                </div>
                <div className="font-display text-3xl text-lava-400 sm:text-4xl">
                  ${summary.pricing.total}
                </div>
              </div>
              <ul className="mt-4 space-y-1 border-t border-white/10 pt-3 text-xs text-white/65">
                <li className="flex justify-between gap-3">
                  <span>Tour</span>
                  <span>${summary.pricing.tourSubtotal}</span>
                </li>
                {summary.pricing.bandanaSubtotal > 0 && (
                  <li className="flex justify-between gap-3">
                    <span>Add-ons</span>
                    <span>${summary.pricing.bandanaSubtotal}</span>
                  </li>
                )}
                {summary.pricing.transportSubtotal > 0 && (
                  <li className="flex justify-between gap-3">
                    <span>Transport</span>
                    <span>${summary.pricing.transportSubtotal}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
              Need to change something?
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
              Browse more tours
            </Link>
            <Link href="/" className="btn-primary w-full sm:w-auto">
              Back to home <ArrowRight className="h-4 w-4" />
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
