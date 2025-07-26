"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

export function AdvancedMicroInteractions() {
  const animationRef = useRef<number>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const isAnimatingRef = useRef(false)
  const isMountedRef = useRef(true)

  const createParticles = useCallback((x: number, y: number) => {
    if (!isMountedRef.current) return

    const colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b"]
    const newParticles: Particle[] = []

    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 40,
        maxLife: 40,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    particlesRef.current = [...particlesRef.current, ...newParticles]
  }, [])

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current || !isMountedRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    isAnimatingRef.current = true

    const animate = () => {
      if (!isAnimatingRef.current || !isMountedRef.current) return

      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update particles
        particlesRef.current = particlesRef.current
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
            vy: particle.vy + 0.1, // gravity
          }))
          .filter((particle) => particle.life > 0)

        // Draw particles
        particlesRef.current.forEach((particle) => {
          const alpha = particle.life / particle.maxLife
          ctx.globalAlpha = alpha
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
          ctx.fill()
        })

        animationRef.current = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
        isAnimatingRef.current = false
      }
    }

    animate()
  }, [])

  const stopAnimation = useCallback(() => {
    isAnimatingRef.current = false
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    // Wait for DOM to be ready
    const initializeInteractions = () => {
      if (!isMountedRef.current) return

      try {
        // Enhanced button click effects
        const buttons = document.querySelectorAll("button, .clickable")

        const handleClick = (e: MouseEvent) => {
          if (!isMountedRef.current) return

          const target = e.currentTarget as HTMLElement
          const rect = target.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          // Create ripple effect
          const ripple = document.createElement("span")
          ripple.className = "advanced-ripple"
          ripple.style.left = x + "px"
          ripple.style.top = y + "px"

          target.appendChild(ripple)
          setTimeout(() => {
            if (ripple.parentNode) {
              ripple.remove()
            }
          }, 1000)

          // Create particles
          createParticles(e.clientX, e.clientY)
        }

        const handleMouseEnter = (e: MouseEvent) => {
          if (!isMountedRef.current) return

          const target = e.currentTarget as HTMLElement
          target.style.transform = "scale(1.02) translateZ(0)"
          target.style.transition = "transform 0.3s ease"
        }

        const handleMouseLeave = (e: MouseEvent) => {
          if (!isMountedRef.current) return

          const target = e.currentTarget as HTMLElement
          target.style.transform = "scale(1) translateZ(0)"
        }

        buttons.forEach((button) => {
          button.addEventListener("click", handleClick)
          button.addEventListener("mouseenter", handleMouseEnter)
          button.addEventListener("mouseleave", handleMouseLeave)
        })

        return () => {
          buttons.forEach((button) => {
            button.removeEventListener("click", handleClick)
            button.removeEventListener("mouseenter", handleMouseEnter)
            button.removeEventListener("mouseleave", handleMouseLeave)
          })
        }
      } catch (error) {
        console.error("Error initializing interactions:", error)
        return () => {}
      }
    }

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(initializeInteractions, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [createParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isMountedRef.current) return

    try {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      startAnimation()

      const handleResize = () => {
        if (canvas && isMountedRef.current) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        stopAnimation()
      }
    } catch (error) {
      console.error("Canvas setup error:", error)
    }
  }, [startAnimation, stopAnimation])

  useEffect(() => {
    return () => {
      isMountedRef.current = false
      stopAnimation()
    }
  }, [stopAnimation])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ mixBlendMode: "screen" }} />
  )
}
