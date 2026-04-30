import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  bookingEmailHtml,
  bookingEmailSubject,
  bookingEmailText,
} from "@/lib/emails";
import { CONTACT } from "@/lib/info";

export const runtime = "nodejs";

const FROM = "JYS Adventure Tour <reservations@jysadventuretour.com>";
const TO = [CONTACT.email];

const schema = z.object({
  contact: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
  }),
  tour: z.object({
    slug: z.string(),
    title: z.string(),
  }),
  schedule: z.object({
    date: z.string(),
    departure: z.string(),
  }),
  vehicles: z.union([
    z.object({
      mode: z.literal("atv"),
      singles: z.number().int(),
      doubles: z.number().int(),
      totalRiders: z.number().int(),
    }),
    z.object({
      mode: z.literal("utv"),
      utvs: z.number().int(),
      riders: z.number().int(),
      totalRiders: z.number().int(),
    }),
  ]),
  canopyOperator: z
    .object({ slug: z.string(), name: z.string() })
    .nullable(),
  addons: z.object({ bandanas: z.number().int() }),
  pickup: z.object({
    zoneSlug: z.string(),
    zoneName: z.string(),
    otherDetail: z.string(),
    cost: z.number(),
    confirmedRate: z.boolean(),
  }),
  message: z.string(),
  pricing: z.object({
    tourSubtotal: z.number(),
    bandanaSubtotal: z.number(),
    transportSubtotal: z.number(),
    total: z.number(),
  }),
});

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/booking] RESEND_API_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Email service not configured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid booking payload" },
      { status: 422 },
    );
  }

  const payload = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: payload.contact.email,
      subject: bookingEmailSubject(payload),
      html: bookingEmailHtml(payload),
      text: bookingEmailText(payload),
    });
    if (error) {
      console.error("[api/booking] Resend error", error);
      return NextResponse.json(
        { ok: false, error: "Email send failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/booking] Unhandled error", err);
    return NextResponse.json(
      { ok: false, error: "Email send failed" },
      { status: 502 },
    );
  }
}
