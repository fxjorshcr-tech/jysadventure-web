import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  contactCustomerEmailHtml,
  contactCustomerEmailSubject,
  contactCustomerEmailText,
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
} from "@/lib/emails";
import { CONTACT } from "@/lib/info";
import {
  antispamFieldsSchema,
  checkForSpam,
  spamResponseBody,
} from "@/lib/antispam";

export const runtime = "nodejs";

const FROM = "JYS Adventure Tour <reservations@jysadventuretour.com>";
const TO = [CONTACT.email];

const schema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(60),
    subject: z.string().trim().max(200),
    message: z.string().trim().min(5).max(5000),
    locale: z.enum(["en", "es"]).optional(),
  })
  .merge(antispamFieldsSchema);

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/contact] RESEND_API_KEY is not set");
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
      { ok: false, error: "Invalid contact payload" },
      { status: 422 },
    );
  }

  const payload = parsed.data;

  const verdict = await checkForSpam(req, "contact", payload);
  if (verdict.spam) {
    console.warn(
      `[api/contact] Blocked submission (${verdict.reason}) from ${payload.email}`,
    );
    return NextResponse.json(spamResponseBody(verdict), {
      status: verdict.status,
    });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: payload.email,
      subject: contactEmailSubject(payload),
      html: contactEmailHtml(payload),
      text: contactEmailText(payload),
    });
    if (error) {
      console.error("[api/contact] Resend error", error);
      return NextResponse.json(
        { ok: false, error: "Email send failed" },
        { status: 502 },
      );
    }

    const customerResult = await resend.emails.send({
      from: FROM,
      to: [payload.email],
      replyTo: CONTACT.email,
      subject: contactCustomerEmailSubject(payload),
      html: contactCustomerEmailHtml(payload),
      text: contactCustomerEmailText(payload),
    });
    if (customerResult.error) {
      console.error(
        "[api/contact] Customer confirmation send failed",
        customerResult.error,
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Unhandled error", err);
    return NextResponse.json(
      { ok: false, error: "Email send failed" },
      { status: 502 },
    );
  }
}
