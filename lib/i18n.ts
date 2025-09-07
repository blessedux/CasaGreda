// Casa Greda Internationalization System

export type Locale = "es" | "en"

export interface Dictionary {
  [key: string]: string | Dictionary
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("../data/i18n/es.json").then((module) => module.default),
  en: () => import("../data/i18n/en.json").then((module) => module.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    return await dictionaries[locale]()
  } catch {
    // Fallback to Spanish if dictionary not found
    return await dictionaries.es()
  }
}

export function getLocaleFromHeaders(headers: Headers): Locale {
  const acceptLanguage = headers.get("accept-language") || ""

  if (acceptLanguage.includes("en")) {
    return "en"
  }

  return "es" // Default to Spanish
}

export function getLocaleFromCookie(cookieHeader: string | null): Locale | null {
  if (!cookieHeader) return null

  const match = cookieHeader.match(/locale=([^;]+)/)
  const locale = match?.[1] as Locale

  return locale && ["es", "en"].includes(locale) ? locale : null
}
