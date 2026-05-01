import type { Locale } from "./config";

export type Bilingual = { en: string; es: string };
export type LocalizedText = string | Bilingual;

export function t(value: LocalizedText, locale: Locale): string {
  if (typeof value === "string") return value;
  return value[locale] ?? value.en;
}

export function tArray(values: LocalizedText[], locale: Locale): string[] {
  return values.map((v) => t(v, locale));
}
