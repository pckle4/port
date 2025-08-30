"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsTransitioning(true)
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
      <div className="page-content">{children}</div>
    </div>
  )
}
