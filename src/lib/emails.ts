import { CONTACT } from "./info";
import type { Locale } from "@/i18n/config";

const escape = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const wrapEmail = (locale: Locale, title: string, contentHtml: string) => `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escape(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f1ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f1ee;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px -10px rgba(0,0,0,0.15);">
            <tr>
              <td style="background:linear-gradient(135deg,#0a0f0a 0%,#1a1f1a 60%,#c2410c 130%);padding:32px 32px 28px 32px;color:#ffffff;">
                <div style="font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#fbbf24;margin-bottom:12px;">JYS Adventure Tour</div>
                <div style="font-size:26px;font-weight:800;line-height:1.15;letter-spacing:0.5px;">${escape(title)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${contentHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:#0a0f0a;color:#9aa19a;padding:20px 32px;font-size:12px;line-height:1.6;">
                <div style="color:#ffffff;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-size:10px;margin-bottom:6px;">JYS Adventure Tour</div>
                <div>${escape(CONTACT.location)}</div>
                <div>${escape(CONTACT.phone)} · <a href="mailto:${escape(CONTACT.email)}" style="color:#fb923c;text-decoration:none;">${escape(CONTACT.email)}</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #ececec;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#777;width:38%;vertical-align:top;">
      ${escape(label)}
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #ececec;font-size:14px;color:#1a1a1a;font-weight:500;vertical-align:top;">
      ${value}
    </td>
  </tr>`;

const section = (heading: string, rowsHtml: string) => `
  <div style="margin-bottom:28px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin-bottom:10px;">${escape(heading)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      ${rowsHtml}
    </table>
  </div>`;

// Translation helpers
type Strings = Record<string, string>;
const STR: Record<Locale, Strings> = {
  en: {
    newBooking: "New booking",
    tour: "Tour",
    date: "Date",
    departure: "Departure",
    vehicles: "Vehicles",
    canopyOperator: "Canopy operator",
    pickup: "Pickup",
    addons: "Add-ons",
    contact: "Contact",
    rideDetails: "Ride details",
    messageFromGuest: "Message from guest",
    name: "Name",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    yourRide: "Your ride",
    weGotYourBooking: "We got your booking!",
    weGotYourMessage: "We got your message!",
    yourMessage: "Your message",
    rateTbc: "Rate to be confirmed",
    free: "Free",
    riderTotal: "rider total",
    ridersTotal: "riders total",
    tourSubtotal: "Tour subtotal",
    transport: "Transport",
    total: "Total",
    baseCamp: "Base camp pickup",
    newBookingPrefix: "A new booking just came in through the website. Reply to this email to reach",
    newBookingSuffix: "directly.",
    customerHello: "Hi",
    customerThanks:
      "thanks for booking with JYS Adventure Tour! We've received your reservation request and our team will reach out within the hour to confirm the details.",
    customerSummaryNote:
      "Here's a summary of what you booked. If anything looks off, just reply to this email and we'll fix it.",
    questions: "Questions? Reply to this email or call us at",
    puraVida: "¡Pura vida!",
    contactNew: "New contact message",
    contactReply: "Reply to this email to respond to",
    contactCustomerThanks:
      "thanks for reaching out to JYS Adventure Tour! We received your message and will reply shortly.",
    fasterReply: "Need a faster reply? Call us at",
    yourBookingSubject: "Your JYS Adventure booking",
    weGotMessageSubject: "We got your message",
  },
  es: {
    newBooking: "Nueva reserva",
    tour: "Tour",
    date: "Fecha",
    departure: "Salida",
    vehicles: "Vehículos",
    canopyOperator: "Operador canopy",
    pickup: "Recogida",
    addons: "Extras",
    contact: "Contacto",
    rideDetails: "Detalles del tour",
    messageFromGuest: "Mensaje del cliente",
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono",
    subject: "Asunto",
    message: "Mensaje",
    yourRide: "Tu tour",
    weGotYourBooking: "¡Recibimos tu reserva!",
    weGotYourMessage: "¡Recibimos tu mensaje!",
    yourMessage: "Tu mensaje",
    rateTbc: "Tarifa por confirmar",
    free: "Gratis",
    riderTotal: "persona en total",
    ridersTotal: "personas en total",
    tourSubtotal: "Subtotal del tour",
    transport: "Transporte",
    total: "Total",
    baseCamp: "Recogida en base",
    newBookingPrefix: "Acaba de entrar una reserva por la web. Responde este correo para escribirle a",
    newBookingSuffix: "directamente.",
    customerHello: "Hola",
    customerThanks:
      "¡gracias por reservar con JYS Adventure Tour! Recibimos tu solicitud y nuestro equipo te contactará en una hora para confirmar los detalles.",
    customerSummaryNote:
      "Aquí va el resumen de tu reserva. Si algo no cuadra, responde este correo y lo arreglamos.",
    questions: "¿Dudas? Responde este correo o llámanos al",
    puraVida: "¡Pura vida!",
    contactNew: "Nuevo mensaje de contacto",
    contactReply: "Responde este correo para escribirle a",
    contactCustomerThanks:
      "¡gracias por escribir a JYS Adventure Tour! Recibimos tu mensaje y te respondemos pronto.",
    fasterReply: "¿Necesitas respuesta más rápida? Llámanos al",
    yourBookingSubject: "Tu reserva con JYS Adventure",
    weGotMessageSubject: "Recibimos tu mensaje",
  },
};

// ----- Booking email -----

export type BookingPayload = {
  contact: { name: string; email: string; phone: string };
  tour: { slug: string; title: string; titleLocalized?: string };
  schedule: { date: string; departure: string };
  vehicles:
    | { mode: "atv"; singles: number; doubles: number; totalRiders: number }
    | { mode: "utv"; utvs: number; riders: number; totalRiders: number };
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
  locale?: Locale;
};

const formatDate = (iso: string, locale: Locale) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const vehiclesSummary = (v: BookingPayload["vehicles"], s: Strings) => {
  const total = `${v.totalRiders} ${v.totalRiders === 1 ? s.riderTotal : s.ridersTotal}`;
  if (v.mode === "atv") {
    const parts: string[] = [];
    if (v.singles > 0) parts.push(`${v.singles} × ATV Single`);
    if (v.doubles > 0) parts.push(`${v.doubles} × ATV Double`);
    return `${parts.join(" + ") || "—"}<br/><span style="color:#777;font-size:12px;">${total}</span>`;
  }
  return `${v.utvs} UTV${v.utvs > 1 ? "s" : ""}<br/><span style="color:#777;font-size:12px;">${v.riders} ${v.riders === 1 ? s.riderTotal : s.ridersTotal}</span>`;
};

const pickupSummary = (p: BookingPayload["pickup"], s: Strings) => {
  if (!p.zoneSlug) return s.baseCamp;
  if (p.zoneSlug === "other") {
    return `${escape(p.otherDetail || "Other")}<br/><span style="color:#777;font-size:12px;">${s.rateTbc}</span>`;
  }
  const cost =
    p.cost === 0 ? s.free : `$${p.cost}${p.confirmedRate ? "" : " (TBC)"}`;
  return `${escape(p.zoneName)}<br/><span style="color:#777;font-size:12px;">${cost}</span>`;
};

const pricingTable = (b: BookingPayload, s: Strings) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:18px 20px;">
    <tr>
      <td style="font-size:12px;color:#9a3412;padding-bottom:6px;">${s.tourSubtotal}</td>
      <td style="font-size:12px;color:#9a3412;text-align:right;padding-bottom:6px;">$${b.pricing.tourSubtotal}</td>
    </tr>
    ${b.pricing.bandanaSubtotal > 0 ? `<tr><td style="font-size:12px;color:#9a3412;padding-bottom:6px;">${s.addons}</td><td style="font-size:12px;color:#9a3412;text-align:right;padding-bottom:6px;">$${b.pricing.bandanaSubtotal}</td></tr>` : ""}
    ${b.pricing.transportSubtotal > 0 ? `<tr><td style="font-size:12px;color:#9a3412;padding-bottom:6px;">${s.transport}</td><td style="font-size:12px;color:#9a3412;text-align:right;padding-bottom:6px;">$${b.pricing.transportSubtotal}</td></tr>` : ""}
    <tr>
      <td style="border-top:1px solid #fed7aa;padding-top:10px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#1a1a1a;">${s.total}</td>
      <td style="border-top:1px solid #fed7aa;padding-top:10px;font-size:24px;font-weight:800;color:#c2410c;text-align:right;">$${b.pricing.total}</td>
    </tr>
  </table>`;

export function bookingEmailHtml(b: BookingPayload) {
  // Operator-facing email is always English (internal team).
  const locale: Locale = "en";
  const s = STR[locale];
  const tourTitle = b.tour.title;
  const title = `${s.newBooking}: ${tourTitle}`;

  const contactRows =
    row(s.name, escape(b.contact.name)) +
    row(
      s.email,
      `<a href="mailto:${escape(b.contact.email)}" style="color:#c2410c;text-decoration:none;">${escape(b.contact.email)}</a>`,
    ) +
    row(
      s.phone,
      b.contact.phone
        ? `<a href="tel:${escape(b.contact.phone.replace(/\s/g, ""))}" style="color:#c2410c;text-decoration:none;">${escape(b.contact.phone)}</a>`
        : "—",
    );

  const tourRows =
    row(s.tour, escape(tourTitle)) +
    row(s.date, escape(formatDate(b.schedule.date, locale))) +
    row(s.departure, escape(b.schedule.departure || "—")) +
    row(s.vehicles, vehiclesSummary(b.vehicles, s)) +
    (b.canopyOperator ? row(s.canopyOperator, escape(b.canopyOperator.name)) : "") +
    row(s.pickup, pickupSummary(b.pickup, s)) +
    (b.addons.bandanas > 0
      ? row(s.addons, `${b.addons.bandanas} × Bandana ($${b.addons.bandanas * 10})`)
      : "");

  const messageHtml = b.message
    ? `<div style="margin-bottom:24px;padding:16px 18px;background-color:#f8f7f4;border-left:3px solid #c2410c;border-radius:8px;font-size:14px;color:#333;line-height:1.6;white-space:pre-wrap;">${escape(b.message)}</div>`
    : "";

  const guestLocale = b.locale ?? "en";
  const guestLabel = guestLocale === "es" ? "Customer language: Spanish" : "Customer language: English";

  const content = `
    <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#444;">
      ${s.newBookingPrefix} <strong>${escape(b.contact.name)}</strong> ${s.newBookingSuffix}
    </p>
    <p style="margin:0 0 24px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#777;">${guestLabel}</p>
    ${section(s.contact, contactRows)}
    ${section(s.rideDetails, tourRows)}
    ${messageHtml ? `<div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin-bottom:10px;">${s.messageFromGuest}</div>${messageHtml}` : ""}
    ${pricingTable(b, s)}
  `;

  return wrapEmail(locale, title, content);
}

export function bookingEmailSubject(b: BookingPayload) {
  return `New booking · ${b.tour.title} · ${b.contact.name} · ${formatDate(b.schedule.date, "en")}`;
}

export function bookingCustomerEmailHtml(b: BookingPayload) {
  const locale: Locale = b.locale ?? "en";
  const s = STR[locale];
  const tourTitle = b.tour.titleLocalized || b.tour.title;
  const title = s.weGotYourBooking;

  const tourRows =
    row(s.tour, escape(tourTitle)) +
    row(s.date, escape(formatDate(b.schedule.date, locale))) +
    row(s.departure, escape(b.schedule.departure || "—")) +
    row(s.vehicles, vehiclesSummary(b.vehicles, s)) +
    (b.canopyOperator ? row(s.canopyOperator, escape(b.canopyOperator.name)) : "") +
    row(s.pickup, pickupSummary(b.pickup, s)) +
    (b.addons.bandanas > 0
      ? row(s.addons, `${b.addons.bandanas} × Bandana ($${b.addons.bandanas * 10})`)
      : "");

  const content = `
    <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#222;">
      ${s.customerHello} <strong>${escape(b.contact.name)}</strong>, ${s.customerThanks}
    </p>
    <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;color:#444;">
      ${s.customerSummaryNote}
    </p>
    ${section(s.yourRide, tourRows)}
    ${pricingTable(b, s)}
    <p style="margin:24px 0 0 0;font-size:13px;line-height:1.6;color:#666;">
      ${s.questions} <a href="tel:${escape(CONTACT.phone.replace(/\s/g, ""))}" style="color:#c2410c;text-decoration:none;">${escape(CONTACT.phone)}</a>. ${s.puraVida}
    </p>
  `;

  return wrapEmail(locale, title, content);
}

export function bookingCustomerEmailSubject(b: BookingPayload) {
  const locale: Locale = b.locale ?? "en";
  const s = STR[locale];
  const tourTitle = b.tour.titleLocalized || b.tour.title;
  return `${s.yourBookingSubject} — ${tourTitle} · ${formatDate(b.schedule.date, locale)}`;
}

export function bookingCustomerEmailText(b: BookingPayload) {
  const locale: Locale = b.locale ?? "en";
  const s = STR[locale];
  const tourTitle = b.tour.titleLocalized || b.tour.title;
  const lines: string[] = [];
  lines.push(`${s.customerHello} ${b.contact.name},`);
  lines.push("");
  lines.push(s.customerThanks);
  lines.push("");
  lines.push(`${s.tour}: ${tourTitle}`);
  lines.push(`${s.date}: ${formatDate(b.schedule.date, locale)}`);
  lines.push(`${s.departure}: ${b.schedule.departure || "—"}`);
  if (b.vehicles.mode === "atv") {
    if (b.vehicles.singles)
      lines.push(`${s.vehicles}: ${b.vehicles.singles} × ATV Single`);
    if (b.vehicles.doubles)
      lines.push(`           ${b.vehicles.doubles} × ATV Double`);
  } else {
    lines.push(
      `${s.vehicles}: ${b.vehicles.utvs} UTV(s) — ${b.vehicles.riders} ${b.vehicles.riders === 1 ? s.riderTotal : s.ridersTotal}`,
    );
  }
  if (b.canopyOperator) lines.push(`${s.canopyOperator}: ${b.canopyOperator.name}`);
  lines.push(
    `${s.pickup}: ${b.pickup.zoneSlug ? b.pickup.zoneName || b.pickup.otherDetail : s.baseCamp}${b.pickup.cost ? ` ($${b.pickup.cost})` : ""}`,
  );
  if (b.addons.bandanas) lines.push(`${s.addons}: ${b.addons.bandanas} × Bandana`);
  lines.push("");
  lines.push(`${s.total}: $${b.pricing.total}`);
  lines.push("");
  lines.push(`${s.questions} ${CONTACT.phone}. ${s.puraVida}`);
  lines.push("");
  lines.push("— JYS Adventure Tour");
  return lines.join("\n");
}

export function bookingEmailText(b: BookingPayload) {
  const locale: Locale = "en";
  const s = STR[locale];
  const lines: string[] = [];
  lines.push(`${s.newBooking} — ${b.tour.title}`);
  lines.push("");
  lines.push(`${s.name}: ${b.contact.name}`);
  lines.push(`${s.email}: ${b.contact.email}`);
  lines.push(`${s.phone}: ${b.contact.phone || "—"}`);
  lines.push("");
  lines.push(`${s.date}: ${formatDate(b.schedule.date, locale)}`);
  lines.push(`${s.departure}: ${b.schedule.departure || "—"}`);
  if (b.vehicles.mode === "atv") {
    if (b.vehicles.singles)
      lines.push(`${s.vehicles}: ${b.vehicles.singles} × ATV Single`);
    if (b.vehicles.doubles)
      lines.push(`           ${b.vehicles.doubles} × ATV Double`);
  } else {
    lines.push(
      `${s.vehicles}: ${b.vehicles.utvs} UTV(s) — ${b.vehicles.riders} ${s.ridersTotal}`,
    );
  }
  if (b.canopyOperator) lines.push(`${s.canopyOperator}: ${b.canopyOperator.name}`);
  lines.push(
    `${s.pickup}: ${b.pickup.zoneSlug ? b.pickup.zoneName || b.pickup.otherDetail : s.baseCamp}${b.pickup.cost ? ` ($${b.pickup.cost})` : ""}`,
  );
  if (b.addons.bandanas) lines.push(`${s.addons}: ${b.addons.bandanas} × Bandana`);
  lines.push("");
  if (b.message) {
    lines.push(`${s.message}:`);
    lines.push(b.message);
    lines.push("");
  }
  lines.push(`Customer language: ${b.locale === "es" ? "Spanish" : "English"}`);
  lines.push(`${s.total}: $${b.pricing.total}`);
  return lines.join("\n");
}

// ----- Contact email -----

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  locale?: Locale;
};

export function contactEmailHtml(c: ContactPayload) {
  const locale: Locale = "en"; // operator email always EN
  const s = STR[locale];
  const title = c.subject ? `New message: ${c.subject}` : s.contactNew;

  const contactRows =
    row(s.name, escape(c.name)) +
    row(
      s.email,
      `<a href="mailto:${escape(c.email)}" style="color:#c2410c;text-decoration:none;">${escape(c.email)}</a>`,
    ) +
    row(
      s.phone,
      c.phone
        ? `<a href="tel:${escape(c.phone.replace(/\s/g, ""))}" style="color:#c2410c;text-decoration:none;">${escape(c.phone)}</a>`
        : "—",
    ) +
    (c.subject ? row(s.subject, escape(c.subject)) : "");

  const messageHtml = `<div style="margin-bottom:8px;padding:18px 20px;background-color:#f8f7f4;border-left:3px solid #c2410c;border-radius:8px;font-size:15px;color:#222;line-height:1.6;white-space:pre-wrap;">${escape(c.message)}</div>`;

  const guestLabel = c.locale === "es" ? "Customer language: Spanish" : "Customer language: English";

  const content = `
    <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#444;">
      ${s.contactReply} <strong>${escape(c.name)}</strong> ${s.newBookingSuffix}
    </p>
    <p style="margin:0 0 24px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#777;">${guestLabel}</p>
    ${section(s.contact, contactRows)}
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin-bottom:10px;">${s.message}</div>
    ${messageHtml}
  `;

  return wrapEmail(locale, title, content);
}

export function contactEmailSubject(c: ContactPayload) {
  return c.subject ? `Contact · ${c.subject} · ${c.name}` : `Contact · ${c.name}`;
}

export function contactCustomerEmailHtml(c: ContactPayload) {
  const locale: Locale = c.locale ?? "en";
  const s = STR[locale];
  const title = s.weGotYourMessage;

  const messageHtml = `<div style="margin-bottom:8px;padding:18px 20px;background-color:#f8f7f4;border-left:3px solid #c2410c;border-radius:8px;font-size:15px;color:#222;line-height:1.6;white-space:pre-wrap;">${escape(c.message)}</div>`;

  const content = `
    <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#222;">
      ${s.customerHello} <strong>${escape(c.name)}</strong>, ${s.contactCustomerThanks}
    </p>
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin-bottom:10px;">${s.yourMessage}</div>
    ${messageHtml}
    <p style="margin:24px 0 0 0;font-size:13px;line-height:1.6;color:#666;">
      ${s.fasterReply} <a href="tel:${escape(CONTACT.phone.replace(/\s/g, ""))}" style="color:#c2410c;text-decoration:none;">${escape(CONTACT.phone)}</a>. ${s.puraVida}
    </p>
  `;

  return wrapEmail(locale, title, content);
}

export function contactCustomerEmailSubject(c: ContactPayload) {
  const locale: Locale = c.locale ?? "en";
  const s = STR[locale];
  return c.subject
    ? `${s.weGotMessageSubject} — ${c.subject}`
    : `${s.weGotMessageSubject} — JYS Adventure Tour`;
}

export function contactCustomerEmailText(c: ContactPayload) {
  const locale: Locale = c.locale ?? "en";
  const s = STR[locale];
  const lines: string[] = [];
  lines.push(`${s.customerHello} ${c.name},`);
  lines.push("");
  lines.push(s.contactCustomerThanks);
  lines.push("");
  lines.push(`${s.yourMessage}:`);
  lines.push(c.message);
  lines.push("");
  lines.push(`${s.fasterReply} ${CONTACT.phone}. ${s.puraVida}`);
  lines.push("");
  lines.push("— JYS Adventure Tour");
  return lines.join("\n");
}

export function contactEmailText(c: ContactPayload) {
  const locale: Locale = "en";
  const s = STR[locale];
  const lines: string[] = [];
  lines.push(s.contactNew);
  lines.push("");
  lines.push(`${s.name}: ${c.name}`);
  lines.push(`${s.email}: ${c.email}`);
  lines.push(`${s.phone}: ${c.phone || "—"}`);
  if (c.subject) lines.push(`${s.subject}: ${c.subject}`);
  lines.push(`Customer language: ${c.locale === "es" ? "Spanish" : "English"}`);
  lines.push("");
  lines.push(`${s.message}:`);
  lines.push(c.message);
  return lines.join("\n");
}
