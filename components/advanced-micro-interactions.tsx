"use client"

import { useEffect, useRef, useCallback, memo } from "react"

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

const AdvancedMicroInteractions = memo(() => {
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

  const animate = useCallback(() => {
    if (!isAnimatingRef.current || !isMountedRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vy: particle.vy + 0.1,
        }))
        .filter((particle) => particle.life > 0)

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
      isAnimatingRef.current = false
    }
  }, [])

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current || !isMountedRef.current) return
    isAnimatingRef.current = true
    animate()
  }, [animate])

  const stopAnimation = useCallback(() => {
    isAnimatingRef.current = false
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const initializeInteractions = () => {
      if (!isMountedRef.current) return

      try {
        const buttons = document.querySelectorAll("button, .clickable")

        const handleClick = (e: MouseEvent) => {
          if (!isMountedRef.current) return

          const target = e.currentTarget as HTMLElement
          const rect = target.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          const ripple = document.createElement("span")
          ripple.className = "advanced-ripple"
          ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
          `

          target.style.position = "relative"
          target.appendChild(ripple)
          setTimeout(() => ripple.remove(), 600)

          createParticles(e.clientX, e.clientY)
        }

        const handleMouseEnter = (e: MouseEvent) => {
          if (!isMountedRef.current) return
          const target = e.currentTarget as HTMLElement
          target.style.transform = "scale(1.02) translateZ(0)"
          target.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }

        const handleMouseLeave = (e: MouseEvent) => {
          if (!isMountedRef.current) return
          const target = e.currentTarget as HTMLElement
          target.style.transform = "scale(1) translateZ(0)"
        }

        buttons.forEach((button) => {
          button.addEventListener("click", handleClick, { passive: true })
          button.addEventListener("mouseenter", handleMouseEnter, { passive: true })
          button.addEventListener("mouseleave", handleMouseLeave, { passive: true })
        })

        return () => {
          buttons.forEach((button) => {
            button.removeEventListener("click", handleClick)
            button.removeEventListener("mouseenter", handleMouseEnter)
            button.removeEventListener("mouseleave", handleMouseLeave)
          })
        }
      } catch (error) {
        return () => {}
      }
    }

    const timer = setTimeout(initializeInteractions, 1000)
    return () => clearTimeout(timer)
  }, [createParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isMountedRef.current) return

    try {
      const updateCanvasSize = () => {
        if (canvas && isMountedRef.current) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }
      }

      updateCanvasSize()
      startAnimation()

      window.addEventListener("resize", updateCanvasSize, { passive: true })

      return () => {
        window.removeEventListener("resize", updateCanvasSize)
        stopAnimation()
      }
    } catch (error) {
      return () => {}
    }
  }, [startAnimation, stopAnimation])

  useEffect(() => {
    return () => {
      isMountedRef.current = false
      stopAnimation()
    }
  }, [stopAnimation])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ mixBlendMode: "screen" }} />
      <style jsx>{`
        @keyframes ripple {
          to {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
})

AdvancedMicroInteractions.displayName = "AdvancedMicroInteractions"

export { AdvancedMicroInteractions }
