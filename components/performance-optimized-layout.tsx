"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode
}

export function PerformanceOptimizedLayout({ children }: PerformanceOptimizedLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
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
      <div
        className="performance-optimized-content transition-opacity duration-500 will-change-opacity opacity-100"
        style={{ visibility: "visible" }}
      >
        {children}
      </div>
    </>
  )
}
