import { SITE_URL, CONTACT, SCHEDULE, TRANSPORT_ZONES } from "@/lib/info";
import { TOURS, CANOPY_OPERATORS } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const lines: string[] = [];

  // Header
  lines.push("# JYS Adventure Tour — full content");
  lines.push("");
  lines.push(
    "Family-run ATV and UTV tour operator based in Sardinal, Guanacaste, Costa Rica. Off-road rides through jungle trails, river crossings, finca farmland and volcanic ridges. The fleet includes single-rider quads, two-up doubles and roofed UTV side-by-sides for families. Combos pair the off-road ride with a guided horseback finca tour (cabalgata) or a zipline canopy tour with a partner operator.",
  );
  lines.push("");
  lines.push("## Contact");
  lines.push(`- Site: ${SITE_URL}`);
  lines.push(`- Email: ${CONTACT.email}`);
  lines.push(`- Phone / WhatsApp: ${CONTACT.phone}`);
  lines.push(`- Location: ${CONTACT.location}`);
  lines.push("");

  // Schedule + transport
  lines.push("## Daily schedule");
  lines.push(`- Standard departures: ${SCHEDULE.departures.join(", ")}`);
  lines.push(`- ${SCHEDULE.note}`);
  lines.push("");

  lines.push("## Standard hotel pickup zones");
  for (const z of TRANSPORT_ZONES) {
    const price = z.basePrice === 0 ? "free" : `$${z.basePrice}`;
    const extra = z.extraPerPerson > 0 ? `, +$${z.extraPerPerson} per extra rider` : "";
    lines.push(`- ${z.name}: ${price} for 1–5 riders${extra}${z.note ? ` (${z.note})` : ""}`);
  }
  lines.push("");

  // Tours
  lines.push("## Tours");
  for (const t of TOURS) {
    lines.push("");
    lines.push(`### ${t.title}`);
    lines.push(`- URL: ${SITE_URL}/tours/${t.slug}`);
    lines.push(`- Tagline: ${t.tagline}`);
    lines.push(`- Duration: ${t.duration}`);
    lines.push(`- Difficulty: ${t.difficulty}`);
    lines.push(`- Vehicle: ${t.vehicle}${t.addon ? ` + ${t.addon}` : ""}`);
    lines.push(
      `- Driver age: ${t.minAge}+; Passenger age: ${t.minPassengerAge ?? "n/a"}; Driver's license required: ${t.licenseRequired ? "yes" : "no"}`,
    );
    if (t.variants) {
      for (const v of t.variants) {
        lines.push(
          `- ${v.label}: $${v.price} (${v.seats === 1 ? "1 rider" : "2 riders"}) — ${v.description}`,
        );
      }
    } else if (t.pricingMode === "flat-vehicle") {
      lines.push(`- Price: $${t.price} per UTV (up to ${t.maxSeats ?? 5} riders)`);
    } else if (t.pricingMode === "flat-plus-per-person") {
      lines.push(
        `- Price: $${t.price} per UTV (up to ${t.maxSeats ?? 5} riders) + $${t.perPersonAddon} per rider for the ${t.addon ?? "addon"} portion`,
      );
    }
    if (t.seatingNote) lines.push(`- Seating note: ${t.seatingNote}`);
    lines.push(`- Highlights: ${t.highlights.join("; ")}`);
    lines.push(`- Includes: ${t.includes.join("; ")}`);
    lines.push(`- Description: ${t.description}`);
    if (t.canopyOperators?.length) {
      lines.push(`- Canopy operators: ${t.canopyOperators.map((o) => o.name).join(", ")}`);
    }
  }
  lines.push("");

  // Canopy operators
  lines.push("## Canopy operators");
  for (const op of CANOPY_OPERATORS) {
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

  // Blog
  lines.push("## Blog posts");
  for (const p of BLOG_POSTS) {
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
