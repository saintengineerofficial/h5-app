import { Metadata } from "next"
import dynamic from "next/dynamic"
import localFont from "next/font/local"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

import { Toaster } from "@/components/ui/toaster"

import QueryProvider from "@/provider/QueryProvider"

import "./globals.css"

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
        {/* <DynamicVConsole /> */}
      </body>
    </html>
  )
}
