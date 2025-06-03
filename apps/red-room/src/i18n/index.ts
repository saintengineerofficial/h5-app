"use server"

import { cookies, headers } from "next/headers"

import { defaultLocale, Locale, locales } from "@/i18n/config"

const COOKIE_NAME = "NEXT_LOCALE"

export async function getLocale() {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(COOKIE_NAME)?.value

  if (cookieLocale) {
    return cookieLocale
  }

  // 获取浏览器语言
  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language") || ""
  const browserLocale = acceptLanguage.split(",")[0]?.split("-")[0] // 提取主要语言代码
  return locales.includes(browserLocale as Locale) ? (browserLocale as Locale) : defaultLocale
}

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}
