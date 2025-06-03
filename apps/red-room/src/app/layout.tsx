
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

import { Toaster } from "@/components/ui/toaster"

import QueryProvider from "@/provider/QueryProvider"

import "./globals.css"

const DynamicVConsole = dynamic(() => import("../components/global/VConsole"))

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Boli",
  description: "Boli",
}

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
