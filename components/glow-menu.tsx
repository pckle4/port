"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles, Zap } from "lucide-react"

interface MenuItem {
  name: string
  href: string
  id: string
  icon?: React.ReactNode
}

interface GlowMenuProps {
  items: MenuItem[]
  activeItem: string
  onItemClick: (href: string, id: string) => void
  className?: string
}

export function GlowMenu({ items, activeItem, onItemClick, className = "" }: GlowMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate floating particles
    try {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(newParticles)
    } catch (error) {
      console.error("Error generating particles:", error)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (menuRef.current) {
      try {
        const rect = menuRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      } catch (error) {
        console.error("Error handling mouse move:", error)
      }
    }
  }

  return (
    <div ref={menuRef} className={`relative ${className}`} onMouseMove={handleMouseMove}>
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float 4s ease-in-out infinite ${particle.delay}s, sparkle 2s ease-in-out infinite ${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower glow */}
      <div
        className="absolute w-32 h-32 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-full blur-xl pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          opacity: hoveredItem ? 0.6 : 0,
        }}
      />

      {/* Menu items */}
      <div className="flex space-x-2 relative z-10">
        {items.map((item, index) => {
          const isActive = activeItem === item.id
          const isHovered = hoveredItem === item.id

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onItemClick(item.href, item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative px-6 py-3 rounded-full transition-all duration-500 group overflow-hidden transform hover:scale-105 clickable ${
                isActive
                  ? "text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-2xl"
                  : "text-foreground/80 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/80 hover:via-blue-600/80 hover:to-cyan-600/80"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Multi-layer glow effects */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-100"
                    : "bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-cyan-600/50 opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* Outer glow ring */}
              <div
                className={`absolute -inset-1 rounded-full blur-md transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/60 via-blue-600/60 to-cyan-600/60 opacity-100 scale-110 animate-pulse"
                    : "bg-gradient-to-r from-purple-600/40 via-blue-600/40 to-cyan-600/40 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                }`}
              />

              {/* Content */}
              <div className="relative z-10 flex items-center space-x-2">
                {item.icon}
                <span className="font-semibold tracking-wide">{item.name}</span>
                {isActive && <Sparkles className="h-4 w-4 animate-spin" />}
              </div>

              {/* Bottom glow line */}
              <div
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-full bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-100"
                    : "w-0 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`}
              />

              {/* Sparkle effects */}
              {isActive && (
                <>
                  <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75" />
                  <div
                    className="absolute bottom-1 left-2 w-1 h-1 bg-white rounded-full animate-ping opacity-75"
                    style={{ animationDelay: "0.5s" }}
                  />
                </>
              )}

              {/* Lightning effect on hover */}
              {isHovered && (
                <div className="absolute top-0 right-0 text-yellow-400 animate-bounce">
                  <Zap className="h-3 w-3" />
                </div>
              )}
            </Link>
          )
        })}
      </div>

      {/* Background aurora effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-cyan-600/5 animate-aurora" />
      </div>
    </div>
  )
}
