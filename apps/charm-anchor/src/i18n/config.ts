export type Locale = (typeof locales)[number]

export const locales = ["zh", "en", "ar"] as const
export const defaultLocale: Locale = "en"
