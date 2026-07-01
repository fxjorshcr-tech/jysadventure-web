import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/info";

/**
 * AI / answer-engine crawlers we explicitly welcome. Being listed (rather than
 * relying on the "*" wildcard) is a clear opt-in signal for AEO — we want these
 * agents to read the site and cite it in their answers.
 */
const AI_BOTS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on user request
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended", // Gemini / Google AI
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl
  "Amazonbot",
  "Bytespider",
  "meta-externalagent", // Meta AI
];

const DISALLOW = ["/book/confirmation"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
