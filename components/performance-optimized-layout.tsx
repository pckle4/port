"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { TechyPreloader } from "@/components/techy-preloader"

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode
}

export function PerformanceOptimizedLayout({ children }: PerformanceOptimizedLayoutProps) {
  const [showPreloader, setShowPreloader] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if preloader has already been shown (stored in localStorage)
    const hasShownPreloader = localStorage.getItem("portfolio-preloader-shown")

    if (!hasShownPreloader) {
      setShowPreloader(true)

      // Listen for preloader completion
      const checkPreloader = () => {
        const preloaderShown = localStorage.getItem("portfolio-preloader-shown")
        if (preloaderShown) {
          setShowPreloader(false)
          setIsLoaded(true)
        }
      }

      const interval = setInterval(checkPreloader, 100)

      return () => clearInterval(interval)
    } else {
      // Skip preloader if already shown
      setIsLoaded(true)
    }
  }, [])

  // Preload critical resources
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      // Optimize images loading
      const images = document.querySelectorAll("img[data-src]")
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.src || ""
              img.removeAttribute("data-src")
              imageObserver.unobserve(img)
            }
          })
        },
        { rootMargin: "50px" },
      )

      images.forEach((img) => imageObserver.observe(img))

      return () => {
        imageObserver.disconnect()
      }
    }
  }, [isLoaded])

  return (
    <>
      {/* Show techy preloader only on first visit */}
      {showPreloader && <TechyPreloader />}

      {/* Main content */}
      <div
        className={`performance-optimized-content transition-opacity duration-500 will-change-opacity ${
          showPreloader ? "opacity-0" : "opacity-100"
        }`}
        style={{
          visibility: showPreloader ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </>
  )
}
