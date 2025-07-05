"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Code, Palette, Smartphone, Globe, Database, Zap } from "lucide-react"

const icons = [
  { Icon: Code, delay: 0 },
  { Icon: Palette, delay: 0.2 },
  { Icon: Smartphone, delay: 0.4 },
  { Icon: Globe, delay: 0.6 },
  { Icon: Database, delay: 0.8 },
  { Icon: Zap, delay: 1.0 },
]

export function AnimatedIcons() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const iconElements = containerRef.current.querySelectorAll(".animated-icon")

    gsap.fromTo(
      iconElements,
      {
        y: 50,
        opacity: 0,
        scale: 0.5,
        rotation: -180,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
      },
    )

    // Floating animation
    iconElements.forEach((icon, index) => {
      gsap.to(icon, {
        y: -10,
        duration: 2 + index * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="flex justify-center space-x-8 mt-8">
      {icons.map(({ Icon, delay }, index) => (
        <div
          key={index}
          className="animated-icon w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      ))}
    </div>
  )
}
