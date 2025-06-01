"use client"

import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { locales } from "@/i18n/config"
import { setLocale } from "@/i18n/index"


export default function LanguageSwitcher() {
  const router = useRouter()
  const currentLocale = useLocale()

  const handleChange = async (newLocale: string) => {
    await setLocale(newLocale as any)
    router.refresh() // 刷新当前路由，触发新语言的渲染
  }

  return (
    <Select onValueChange={handleChange} defaultValue={currentLocale}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}