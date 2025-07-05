import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Kalam } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ansh Shah - Portfolio",
  description: "Full Stack Developer & UI/UX Designer",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={kalam.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
