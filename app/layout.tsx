import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { getDictionary, getLocaleFromHeaders } from "../lib/i18n"
import { getCartFromCookies } from "../lib/cart"
import { headers } from "next/headers"
import SiteHeader from "../components/layout/SiteHeader"
import "../design-system/globals.css"

export const metadata: Metadata = {
  title: "Casa Greda - Tradición en tu mesa",
  description: "Casa Greda - Cerámica Ancestral Chilena. Sitio en mantención, vuelva pronto.",
  generator: "Casa Greda",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = headers()
  const locale = getLocaleFromHeaders(headersList)
  const dict = await getDictionary(locale)
  const cart = getCartFromCookies()

  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
