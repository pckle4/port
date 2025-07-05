"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsTransitioning(true)

    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false),
    })

    // Page exit animation
    tl.to(".page-content", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.inOut",
    })
      // Page enter animation
      .fromTo(
        ".page-content",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
      )
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
