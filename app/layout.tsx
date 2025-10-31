import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Noor & Co. - Transform Your Space with Candles & Décor",
  description:
    "Premium Pakistani lifestyle brand offering handmade scented candles, decorative wall frames, aroma diffusers, and unique home accessories.",
  generator: "v0.app",
}

// Critical for mobile responsiveness
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}