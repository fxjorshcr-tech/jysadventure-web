import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOURS, getTour, localizeTour } from "@/lib/tours";
import { BookingForm } from "@/components/BookingForm";
import { ArrowLeft } from "lucide-react";
import { getLocale } from "@/i18n/request";
import { getDictionary } from "@/i18n/dictionaries";

type Params = { slug: string };
type SearchParams = { op?: string };

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { op } = await searchParams;
  const tour = getTour(slug);
  if (!tour) return { title: "Book — JYS Adventure Tour" };
  const locale = await getLocale();
  const localized = localizeTour(tour, locale);
  const operator = tour.canopyOperators?.find((o) => o.slug === op);
  const verb = locale === "es" ? "Reservar" : "Book";
  const title = operator
    ? `${verb} ${localized.title} — ${operator.name} — JYS Adventure Tour`
    : `${verb} ${localized.title} — JYS Adventure Tour`;
  return {
    title,
    description: `${localized.title}. ${localized.tagline}`,
    robots: { index: false, follow: true },
  };
}

export default async function BookTourPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { op } = await searchParams;
  const baseTour = getTour(slug);
  if (!baseTour) notFound();
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const tour = localizeTour(baseTour, locale);

  const explicitOp = baseTour.canopyOperators?.find((o) => o.slug === op);
  const preselectedOperator =
    explicitOp?.slug ?? (baseTour.canopyOperators ? "skyline" : undefined);
  const lockOperator = Boolean(explicitOp);
  const bookYourPrefix = locale === "es" ? "Reserva tu" : "Book your";
  const backToPrefix = locale === "es" ? "Volver a" : "Back to";
  const bookingBadge = locale === "es" ? "Reserva" : "Booking";
  const withLabel = locale === "es" ? "Con" : "With";
  const helpText =
    locale === "es"
      ? "Llena los detalles y revisaremos tu reserva en la siguiente pantalla. Respondemos en una hora."
      : "Fill in the details and we'll review your booking on the next screen before you confirm. We reply within the hour.";

  return (
    <>
      <section className="relative w-full overflow-hidden bg-night-950 pt-32 sm:pt-40">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/70 to-night-950" />

        <div className="relative mx-auto w-full max-w-4xl px-4 pb-10 sm:px-5 sm:pb-12 lg:px-8">
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {backToPrefix} {tour.title}
          </Link>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            {bookingBadge}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2rem,8vw,3.75rem)] leading-[0.95] tracking-wide text-white md:text-6xl">
            {bookYourPrefix} <span className="text-gradient-fire">{tour.title}</span>
          </h1>
          {explicitOp && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-jungle-500/40 bg-jungle-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-jungle-500">
              {withLabel} {explicitOp.name}
            </div>
          )}
          <p className="mt-4 max-w-2xl text-white/70 md:text-lg">{helpText}</p>
        </div>
      </section>

      <section className="relative bg-night-950 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8">
          <BookingForm
            preselectedSlug={tour.slug}
            preselectedOperator={preselectedOperator}
            lockOperator={lockOperator}
            locale={locale}
            dict={dict}
          />
        </div>
      </section>
    </>
  );
}
