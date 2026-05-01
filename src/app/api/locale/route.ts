import { NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

export async function POST(req: Request) {
  let locale: unknown;
  try {
    const body = await req.json();
    locale = body?.locale;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!isLocale(locale)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true, locale });
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
