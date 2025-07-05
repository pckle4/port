"use client"

import { useState, useEffect } from "react"
import { EnhancedHeader } from "@/components/enhanced-header"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { AnimatedResumeSection } from "@/components/animated-resume-section"
import { EnhancedPreloader } from "@/components/enhanced-preloader"
import { PageTransition } from "@/components/page-transition"

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <EnhancedPreloader />
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <EnhancedHeader />
        <main className="pt-20">
          <AnimatedResumeSection />
        </main>
        <EnhancedFooter />
      </div>
    </PageTransition>
  )
}
