import { Metadata } from "next"
import dynamic from "next/dynamic"
import localFont from "next/font/local"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

import { Toaster } from "@/components/ui/toaster"

import QueryProvider from "@/provider/QueryProvider"

import "./globals.css"
import { cookies } from "next/headers"
import { setGlobalRequestHeaders } from "@repo/request"

const DynamicVConsole = dynamic(() => import("../components/global/VConsole"))

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Boli",
  description: "Boli",
}

// const fromPackage = (await cookies()).get("x-frompackage")?.value || "none"
// const language = (await cookies()).get("x-language")?.value || "zh"
// const fromurl = (await cookies()).get("x-fromurl")?.value || "none"

// setGlobalRequestHeaders({
//   'x-frompackage': fromPackage,
//   'x-language': language,
//   'x-fromurl': fromurl
// })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[750px] w-full mx-auto`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </NextIntlClientProvider>
        <DynamicVConsole />
      </body>
    </html>
  )
}
