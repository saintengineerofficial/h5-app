import { headers } from "next/headers"
import { getRequestConfig } from "next-intl/server"

import { getLocale } from "."

import { CommonActApi } from "@/services/act/common"

import type { LangKey } from "@/services/type"

export async function getTranslationId() {
  try {
    const headersList = headers()
    const url = (await headersList).get("x-url") || ""
    const searchParams = new URL(url).searchParams
    return searchParams.get("translateId")
  } catch {
    throw new Error("Failed to get translation id")
  }
}

export default getRequestConfig(async () => {
  const locale = (await getLocale()) as LangKey
  const translateId = await getTranslationId()

  let messages = {}
  try {
    const data = await CommonActApi.getTranslations({ translateId: Number(translateId) })
    console.log("🚀 ~ 当前语言 ~ locale:", locale)
    console.log("🚀 ~ 翻译文件 ~ message:", data)

    messages = data[locale] || {}
  } catch (error) {
    console.error("Failed to load translations:", error)
  }

  return {
    locale,
    messages,
    onError: error => {
      if (error.code === "MISSING_MESSAGE") {
        return error.name
      }
      return error.message
    },
  }
})
