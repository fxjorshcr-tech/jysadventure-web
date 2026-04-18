import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { BookingForm } from "@/components/BookingForm";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";

export const metadata = {
  title: "Contact — JYS Adventure Tour",
  description:
    "Get in touch with JYS Adventure Tour to book your next ATV / UTV adventure in Guanacaste, Costa Rica.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Image
          src={IMAGES.gallery[2]}
          alt="Contact JYS"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            Let&apos;s talk
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,13vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            BOOK YOUR
            <br />
            <span className="text-gradient-fire">RIDE</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/70 md:text-lg">
            Tell us about your crew and when you want to ride. We&apos;ll take
            care of the rest — usually within the hour.
          </p>
        </div>
      </section>

      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* Info card */}
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 to-night-950 p-6 sm:p-8">
                <h2 className="font-display text-[clamp(2rem,8vw,2.75rem)] leading-tight tracking-wide text-white [overflow-wrap:anywhere] md:text-5xl">
                  Get in <span className="text-gradient-fire">touch</span>
                </h2>
                <p className="mt-3 text-white/60">
                  Prefer the old-school way? Call, email or drop by our base camp
                  in Guanacaste.
                </p>

                <div className="mt-8 space-y-5">
                  {[
                    {
                      icon: Phone,
                      label: "Phone / WhatsApp",
                      value: "+506 0000 0000",
                    },
                    {
                      icon: Mail,
                      label: "Reservations",
                      value: "reservations@jysadventuretours.com",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Sardinal, Guanacaste · Costa Rica",
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value: "Every day · 7AM — 5PM",
                    },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-lava-400/50"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lava-500/20 text-lava-400 ring-1 ring-lava-500/40">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                          {c.label}
                        </div>
                        <div className="mt-1 text-white">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  {[Instagram, Facebook, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-lava-400 hover:bg-lava-500/20 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={IMAGES.gallery[5]}
                  alt="JYS base camp"
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-display text-3xl tracking-wide text-white">
                    Guanacaste Base Camp
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    Costa Rica · Pacific Coast
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-night-900 to-night-950 p-5 sm:p-6 md:p-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
                    Quick booking
                  </span>
                  <h2 className="mt-5 font-display text-[clamp(2rem,8vw,2.75rem)] leading-tight tracking-wide text-white [overflow-wrap:anywhere] md:text-5xl md:leading-none">
                    Send us the <span className="text-gradient-fire">details</span>
                  </h2>
                  <p className="mt-3 max-w-md text-white/60">
                    We&apos;ll build the perfect ride for you. No deposit required
                    to get a quote.
                  </p>
                </div>
                <div className="mt-8">
                  <BookingForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
