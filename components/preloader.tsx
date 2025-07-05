"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Animate thinking man
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(".thinking-dots", {
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
    }).to(".thinking-dots", {
      opacity: 0.3,
      duration: 0.5,
      stagger: 0.2,
    })

    // Floating animation for creative elements
    gsap.to(".floating-element", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    })

    return () => {
      clearInterval(interval)
      tl.kill()
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="preloader fixed inset-0 z-[9999] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Creative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-20 text-4xl opacity-30">💡</div>
        <div className="floating-element absolute top-32 right-32 text-3xl opacity-30">🎨</div>
        <div className="floating-element absolute bottom-40 left-40 text-3xl opacity-30">⚡</div>
        <div className="floating-element absolute bottom-32 right-20 text-4xl opacity-30">🚀</div>
        <div className="floating-element absolute top-1/2 left-10 text-2xl opacity-30">✨</div>
        <div className="floating-element absolute top-1/3 right-10 text-2xl opacity-30">🔥</div>
      </div>

      {/* Main Content */}
      <div className="text-center text-white z-10">
        {/* Thinking Man */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">🤔</div>
          <div className="flex justify-center space-x-2">
            <div className="thinking-dots w-2 h-2 bg-white rounded-full opacity-30"></div>
            <div className="thinking-dots w-2 h-2 bg-white rounded-full opacity-30"></div>
            <div className="thinking-dots w-2 h-2 bg-white rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          Crafting Something Amazing...
        </h2>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto mb-4">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Text */}
        <p className="text-sm text-white/70">{Math.round(progress)}% Complete</p>

        {/* Creative Icons */}
        <div className="flex justify-center space-x-4 mt-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">🎯</span>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">💻</span>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">🎨</span>
          </div>
        </div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
