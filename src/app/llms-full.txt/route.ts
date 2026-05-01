import { SITE_URL, CONTACT, SCHEDULE, TRANSPORT_ZONES } from "@/lib/info";
import { TOURS, CANOPY_OPERATORS, localizeTour, localizeCanopyOperator } from "@/lib/tours";
import { BLOG_POSTS, localizePost } from "@/lib/blog";
import { t } from "@/i18n/text";

export const dynamic = "force-static";

export async function GET() {
  const lines: string[] = [];
  const locale = "en" as const;

  lines.push("# JYS Adventure Tour — full content");
  lines.push("");
  lines.push(
    "Family-run ATV and UTV tour operator based in Sardinal, Guanacaste, Costa Rica. Off-road rides through trails, river crossings and finca farmland. The fleet includes single-rider quads, two-up doubles and roofed UTV side-by-sides for families. Combos pair the off-road ride with a guided horseback finca tour (cabalgata) or a zipline canopy tour with a partner operator.",
  );
  lines.push("");
  lines.push("## Contact");
  lines.push(`- Site: ${SITE_URL}`);
  lines.push(`- Email: ${CONTACT.email}`);
  lines.push(`- Phone / WhatsApp: ${CONTACT.phone}`);
  lines.push(`- Location: ${CONTACT.location}`);
  lines.push("");

  lines.push("## Daily schedule");
  lines.push(`- Standard departures: ${SCHEDULE.departures.join(", ")}`);
  lines.push(`- ${t(SCHEDULE.note, locale)}`);
  lines.push("");

  lines.push("## Standard hotel pickup zones (13% IVA already included)");
  for (const z of TRANSPORT_ZONES) {
    const price = z.basePrice === 0 ? "free" : `$${z.basePrice}`;
    const extra = z.extraPerPerson > 0 ? `, +$${z.extraPerPerson} per extra rider` : "";
    lines.push(
      `- ${z.name}: ${price} for 1–5 riders${extra}${z.note ? ` (${t(z.note, locale)})` : ""}`,
    );
  }
  lines.push("");

  lines.push("## Tours");
  for (const baseTour of TOURS) {
    const tour = localizeTour(baseTour, locale);
    lines.push("");
    lines.push(`### ${tour.title}`);
    lines.push(`- URL: ${SITE_URL}/tours/${tour.slug}`);
    lines.push(`- Tagline: ${tour.tagline}`);
    lines.push(`- Duration: ${tour.duration}`);
    lines.push(`- Difficulty: ${tour.difficulty}`);
    lines.push(`- Vehicle: ${tour.vehicle}${tour.addon ? ` + ${tour.addon}` : ""}`);
    lines.push(
      `- Driver age: ${tour.minAge}+; Passenger age: ${tour.minPassengerAge ?? "n/a"}; Driver's license required: ${tour.licenseRequired ? "yes" : "no"}`,
    );
    if (tour.variants) {
      for (const v of tour.variants) {
        lines.push(
          `- ${v.label}: $${v.price} (${v.seats === 1 ? "1 rider" : "2 riders"}) — ${v.description}`,
        );
      }
    } else if (tour.pricingMode === "flat-vehicle") {
      lines.push(`- Price: $${tour.price} per UTV (up to ${tour.maxSeats ?? 5} riders)`);
    } else if (tour.pricingMode === "flat-plus-per-person") {
      lines.push(
        `- Price: $${tour.price} per UTV (up to ${tour.maxSeats ?? 5} riders) + $${tour.perPersonAddon} per rider for the ${tour.addon ?? "addon"} portion`,
      );
    }
    if (tour.seatingNote) lines.push(`- Seating note: ${tour.seatingNote}`);
    lines.push(`- Highlights: ${tour.highlights.join("; ")}`);
    lines.push(`- Includes: ${tour.includes.join("; ")}`);
    lines.push(`- Description: ${tour.description}`);
    if (tour.canopyOperators?.length) {
      lines.push(`- Canopy operators: ${tour.canopyOperators.map((o) => o.name).join(", ")}`);
    }
  }
  lines.push("");

  lines.push("## Canopy operators");
  for (const baseOp of CANOPY_OPERATORS) {
    const op = localizeCanopyOperator(baseOp, locale);
    lines.push("");
    lines.push(`### ${op.name}`);
    lines.push(`- Recommended zone: ${op.recommendedZone}`);
    lines.push(`- Description: ${op.description}`);
    if (op.departures) lines.push(`- Departures: ${op.departures.join(", ")}`);
    if (op.scheduleNote) lines.push(`- Schedule note: ${op.scheduleNote}`);
    if (op.variantPrices) {
      const parts: string[] = [];
      if (op.variantPrices.single !== undefined)
        parts.push(`ATV Single $${op.variantPrices.single}/person`);
      if (op.variantPrices.double !== undefined)
        parts.push(`ATV Double $${op.variantPrices.double}/quad`);
      lines.push(`- ATV pricing: ${parts.join(", ")}`);
    }
    if (op.utvTierPrices) {
      lines.push(
        `- UTV tier pricing: ${op.utvTierPrices.map((t) => `${t.riders} riders $${t.price}`).join(", ")}${op.utvMaxSeats ? ` (max ${op.utvMaxSeats} per UTV)` : ""}`,
      );
    }
    if (op.freePickupZones?.length)
      lines.push(`- Free pickup zones: ${op.freePickupZones.join(", ")}`);
    if (op.paidPickupZones?.length && op.extraPickupSurcharge)
      lines.push(
        `- Paid pickup zones (+$${op.extraPickupSurcharge}): ${op.paidPickupZones.join(", ")}`,
      );
    if (op.pickupNote) lines.push(`- Pickup note: ${op.pickupNote}`);
  }
  lines.push("");

  lines.push("## Blog posts");
  for (const basePost of BLOG_POSTS) {
    const p = localizePost(basePost, locale);
    lines.push("");
    lines.push(`### ${p.title}`);
    lines.push(`- URL: ${SITE_URL}/blog/${p.slug}`);
    lines.push(`- Tag: ${p.tag} · ${p.readTime} read`);
    lines.push("");
    lines.push(p.intro);
    for (const s of p.sections) {
      lines.push("");
      if (s.heading) lines.push(`#### ${s.heading}`);
      lines.push(s.body);
    }
    if (p.closing) {
      lines.push("");
      lines.push(p.closing);
    }
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
