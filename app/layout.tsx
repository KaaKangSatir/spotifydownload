import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spotify Download - Unduh Musik Berkualitas Tinggi",
  description: "Aplikasi untuk mengunduh musik dari Spotify dengan kualitas terbaik dan tanpa iklan",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
          <Analytics />
        </TooltipProvider>
      </body>
    </html>
  )
}
