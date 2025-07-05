"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { OptimizedMobilePreloader } from "@/components/optimized-mobile-preloader"
import { EnhancedPreloader } from "@/components/enhanced-preloader"

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode
}

export function PerformanceOptimizedLayout({ children }: PerformanceOptimizedLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement("link")
      fontLink.rel = "preload"
      fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      fontLink.as = "style"
      document.head.appendChild(fontLink)

      // Mark as loaded
      setIsLoaded(true)
    }

    // Use requestIdleCallback for non-critical work
    if ("requestIdleCallback" in window) {
      requestIdleCallback(preloadCriticalResources)
    } else {
      setTimeout(preloadCriticalResources, 1)
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <>
      {/* Use mobile-optimized preloader for mobile devices */}
      {isMobile ? <OptimizedMobilePreloader /> : <EnhancedPreloader />}

      {/* Main content with performance optimizations */}
      <div className="performance-optimized-content">{children}</div>
    </>
  )
}
