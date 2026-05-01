import { SITE_URL, CONTACT } from "@/lib/info";
import { TOURS, localizeTour } from "@/lib/tours";
import { BLOG_POSTS, localizePost } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const lines: string[] = [];
  const locale = "en" as const;

  lines.push("# JYS Adventure Tour");
  lines.push("");
  lines.push(
    "> Off-road ATV and UTV tours through Guanacaste, Costa Rica. Family-run operator based in Sardinal, riding jungle trails, river crossings and finca farmland. Single rider, two-up and family side-by-side rides, plus combo half-day tours with horseback (cabalgata) or zipline canopy.",
  );
  lines.push("");
  lines.push(`Site: ${SITE_URL}`);
  lines.push(`Email: ${CONTACT.email}`);
  lines.push(`Phone / WhatsApp: ${CONTACT.phone}`);
  lines.push(`Location: ${CONTACT.location}`);
  lines.push("");

  lines.push("## Tours");
  for (const baseTour of TOURS) {
    const t = localizeTour(baseTour, locale);
    lines.push(`- [${t.title}](${SITE_URL}/tours/${t.slug}): ${t.metaDescription}`);
  }
  lines.push("");

  lines.push("## Site");
  lines.push(`- [Home](${SITE_URL}/): Overview, signature rides and Google reviews.`);
  lines.push(`- [All tours](${SITE_URL}/tours): Every ride in one page with pricing and pickup zones.`);
  lines.push(`- [About](${SITE_URL}/about): Story of the family-run operation in Guanacaste.`);
  lines.push(`- [Contact](${SITE_URL}/contact): Reach the team or send a quick booking request.`);
  lines.push(`- [FAQs](${SITE_URL}/faqs): Common questions about ages, license, transport and weather.`);
  lines.push(`- [Blog](${SITE_URL}/blog): Short reads on Guanacaste trails, gear and travel tips.`);
  lines.push("");

  lines.push("## Blog");
  for (const basePost of BLOG_POSTS) {
    const p = localizePost(basePost, locale);
    lines.push(`- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.metaDescription}`);
  }
  lines.push("");

  lines.push("## Optional");
  lines.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt): Full structured content of every tour and post.`);
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml): All canonical URLs.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
