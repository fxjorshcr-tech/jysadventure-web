import { NextResponse } from "next/server";
import { createChallenge } from "@/lib/challenge";
import { clientIp, isRateLimited } from "@/lib/antispam";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Issues a fresh arithmetic challenge for the contact and booking forms. */
export async function GET(req: Request) {
  if (isRateLimited(`challenge:${clientIp(req)}`, Date.now(), 40)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "cache-control": "no-store" } },
    );
  }
  const { a, b, token } = createChallenge();
  return NextResponse.json(
    { ok: true, a, b, token },
    { headers: { "cache-control": "no-store" } },
  );
}
