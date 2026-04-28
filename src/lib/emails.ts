import { CONTACT } from "./info";

const escape = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const wrapEmail = (title: string, contentHtml: string) => `<!DOCTYPE html>
<html lang="en">
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

// ----- Booking email -----

export type BookingPayload = {
  contact: { name: string; email: string; phone: string };
  tour: { slug: string; title: string };
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
};

const formatDate = (iso: string) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const vehiclesSummary = (v: BookingPayload["vehicles"]) => {
  if (v.mode === "atv") {
    const parts: string[] = [];
    if (v.singles > 0) parts.push(`${v.singles} × ATV Single`);
    if (v.doubles > 0) parts.push(`${v.doubles} × ATV Double`);
    return `${parts.join(" + ") || "—"}<br/><span style="color:#777;font-size:12px;">${v.totalRiders} rider${v.totalRiders === 1 ? "" : "s"} total</span>`;
  }
  return `${v.utvs} UTV${v.utvs > 1 ? "s" : ""}<br/><span style="color:#777;font-size:12px;">${v.riders} rider${v.riders === 1 ? "" : "s"} total</span>`;
};

const pickupSummary = (p: BookingPayload["pickup"]) => {
  if (!p.zoneSlug) return 'Base camp pickup';
  if (p.zoneSlug === "other") {
    return `${escape(p.otherDetail || "Other location")}<br/><span style="color:#777;font-size:12px;">Rate to be confirmed</span>`;
  }
  const cost =
    p.cost === 0 ? "Free" : `$${p.cost}${p.confirmedRate ? "" : " (TBC)"}`;
  return `${escape(p.zoneName)}<br/><span style="color:#777;font-size:12px;">${cost}</span>`;
};

export function bookingEmailHtml(b: BookingPayload) {
  const title = `New booking: ${b.tour.title}`;

  const contactRows =
    row("Name", escape(b.contact.name)) +
    row(
      "Email",
      `<a href="mailto:${escape(b.contact.email)}" style="color:#c2410c;text-decoration:none;">${escape(b.contact.email)}</a>`,
    ) +
    row(
      "Phone",
      b.contact.phone
        ? `<a href="tel:${escape(b.contact.phone.replace(/\s/g, ""))}" style="color:#c2410c;text-decoration:none;">${escape(b.contact.phone)}</a>`
        : "—",
    );

  const tourRows =
    row("Tour", escape(b.tour.title)) +
    row("Date", escape(formatDate(b.schedule.date))) +
    row("Departure", escape(b.schedule.departure || "—")) +
    row("Vehicles", vehiclesSummary(b.vehicles)) +
    (b.canopyOperator
      ? row("Canopy operator", escape(b.canopyOperator.name))
      : "") +
    row("Pickup", pickupSummary(b.pickup)) +
    (b.addons.bandanas > 0
      ? row(
          "Add-ons",
          `${b.addons.bandanas} × Bandana ($${b.addons.bandanas * 10})`,
        )
      : "");

  const pricingHtml = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:18px 20px;">
      <tr>
        <td style="font-size:12px;color:#9a3412;padding-bottom:6px;">Tour subtotal</td>
        <td style="font-size:12px;color:#9a3412;text-align:right;padding-bottom:6px;">$${b.pricing.tourSubtotal}</td>
      </tr>
      ${b.pricing.bandanaSubtotal > 0 ? `<tr><td style="font-size:12px;color:#9a3412;padding-bottom:6px;">Add-ons</td><td style="font-size:12px;color:#9a3412;text-align:right;padding-bottom:6px;">$${b.pricing.bandanaSubtotal}</td></tr>` : ""}
      ${b.pricing.transportSubtotal > 0 ? `<tr><td style="font-size:12px;color:#9a3412;padding-bottom:6px;">Transport</td><td style="font-size:12px;color:#9a3412;text-align:right;padding-bottom:6px;">$${b.pricing.transportSubtotal}</td></tr>` : ""}
      <tr>
        <td style="border-top:1px solid #fed7aa;padding-top:10px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#1a1a1a;">Total</td>
        <td style="border-top:1px solid #fed7aa;padding-top:10px;font-size:24px;font-weight:800;color:#c2410c;text-align:right;">$${b.pricing.total}</td>
      </tr>
    </table>`;

  const messageHtml = b.message
    ? `<div style="margin-bottom:24px;padding:16px 18px;background-color:#f8f7f4;border-left:3px solid #c2410c;border-radius:8px;font-size:14px;color:#333;line-height:1.6;white-space:pre-wrap;">${escape(b.message)}</div>`
    : "";

  const content = `
    <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;color:#444;">
      A new booking just came in through the website. Reply to this email to reach <strong>${escape(b.contact.name)}</strong> directly.
    </p>
    ${section("Contact", contactRows)}
    ${section("Ride details", tourRows)}
    ${messageHtml ? `<div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin-bottom:10px;">Message from guest</div>${messageHtml}` : ""}
    ${pricingHtml}
  `;

  return wrapEmail(title, content);
}

export function bookingEmailSubject(b: BookingPayload) {
  return `New booking · ${b.tour.title} · ${b.contact.name} · ${formatDate(b.schedule.date)}`;
}

export function bookingEmailText(b: BookingPayload) {
  const lines: string[] = [];
  lines.push(`New booking — ${b.tour.title}`);
  lines.push("");
  lines.push(`Name:  ${b.contact.name}`);
  lines.push(`Email: ${b.contact.email}`);
  lines.push(`Phone: ${b.contact.phone || "—"}`);
  lines.push("");
  lines.push(`Date:      ${formatDate(b.schedule.date)}`);
  lines.push(`Departure: ${b.schedule.departure || "—"}`);
  if (b.vehicles.mode === "atv") {
    if (b.vehicles.singles)
      lines.push(`Vehicles:  ${b.vehicles.singles} × ATV Single`);
    if (b.vehicles.doubles)
      lines.push(`           ${b.vehicles.doubles} × ATV Double`);
  } else {
    lines.push(
      `Vehicles:  ${b.vehicles.utvs} UTV(s) — ${b.vehicles.riders} riders`,
    );
  }
  if (b.canopyOperator) lines.push(`Canopy:    ${b.canopyOperator.name}`);
  lines.push(
    `Pickup:    ${b.pickup.zoneSlug ? b.pickup.zoneName || b.pickup.otherDetail : "Base camp"}${b.pickup.cost ? ` ($${b.pickup.cost})` : ""}`,
  );
  if (b.addons.bandanas)
    lines.push(`Add-ons:   ${b.addons.bandanas} × Bandana`);
  lines.push("");
  if (b.message) {
    lines.push("Message:");
    lines.push(b.message);
    lines.push("");
  }
  lines.push(`TOTAL: $${b.pricing.total}`);
  return lines.join("\n");
}

// ----- Contact email -----

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export function contactEmailHtml(c: ContactPayload) {
  const title = c.subject ? `New message: ${c.subject}` : "New contact message";

  const contactRows =
    row("Name", escape(c.name)) +
    row(
      "Email",
      `<a href="mailto:${escape(c.email)}" style="color:#c2410c;text-decoration:none;">${escape(c.email)}</a>`,
    ) +
    row(
      "Phone",
      c.phone
        ? `<a href="tel:${escape(c.phone.replace(/\s/g, ""))}" style="color:#c2410c;text-decoration:none;">${escape(c.phone)}</a>`
        : "—",
    ) +
    (c.subject ? row("Subject", escape(c.subject)) : "");

  const messageHtml = `<div style="margin-bottom:8px;padding:18px 20px;background-color:#f8f7f4;border-left:3px solid #c2410c;border-radius:8px;font-size:15px;color:#222;line-height:1.6;white-space:pre-wrap;">${escape(c.message)}</div>`;

  const content = `
    <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;color:#444;">
      Reply to this email to respond to <strong>${escape(c.name)}</strong> directly.
    </p>
    ${section("Contact", contactRows)}
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin-bottom:10px;">Message</div>
    ${messageHtml}
  `;

  return wrapEmail(title, content);
}

export function contactEmailSubject(c: ContactPayload) {
  return c.subject
    ? `Contact · ${c.subject} · ${c.name}`
    : `Contact · ${c.name}`;
}

export function contactEmailText(c: ContactPayload) {
  const lines: string[] = [];
  lines.push("New contact message");
  lines.push("");
  lines.push(`Name:    ${c.name}`);
  lines.push(`Email:   ${c.email}`);
  lines.push(`Phone:   ${c.phone || "—"}`);
  if (c.subject) lines.push(`Subject: ${c.subject}`);
  lines.push("");
  lines.push("Message:");
  lines.push(c.message);
  return lines.join("\n");
}
