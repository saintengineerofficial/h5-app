import { headers } from "next/headers"
import { getRequestConfig } from "next-intl/server"

import { getLocale } from "."

import { CommonActApi } from "@/services/act/common"

import type { LangKey } from "@/services/type"

export default getRequestConfig(async () => {
  const locale = (await getLocale()) as LangKey
  const translateId = process.env.NEXT_PUBLIC_TRANSLATE_ID!

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
