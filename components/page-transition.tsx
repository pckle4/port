"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsTransitioning(true)

    // Simple CSS transition instead of GSAP
    const pageContent = document.querySelector(".page-content") as HTMLElement
    if (pageContent) {
      pageContent.style.opacity = "0"
      pageContent.style.transform = "translateY(20px)"

      setTimeout(() => {
        pageContent.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out"
        pageContent.style.opacity = "1"
        pageContent.style.transform = "translateY(0)"
        setIsTransitioning(false)
      }, 100)
    }
  }, [pathname])

  return (
    <div className="page-wrapper">
      {isTransitioning && (
        <div className="page-transition-overlay fixed inset-0 z-[9998] bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-sm">
          <div className="flex items-center justify-center h-full">
            <div className="loading-spinner w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <div className="page-content">{children}</div>
    </div>
  )
}
