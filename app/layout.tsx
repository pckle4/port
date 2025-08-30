import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ansh Shah - Full Stack Developer",
  description: "Passionate full-stack developer creating beautiful digital experiences with modern technologies.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PageTransition>{children}</PageTransition>
          <ServiceWorkerRegister />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
