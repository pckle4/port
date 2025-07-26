"use client"

import { useEffect, useState } from "react"

const techyMessages = [
  "Initializing quantum processors...",
  "Loading neural networks...",
  "Compiling creative algorithms...",
  "Establishing secure connections...",
  "Optimizing user experience...",
  "Deploying portfolio matrix...",
  "Ready to craft digital magic!",
]

const codeSnippets = [
  "const developer = new FullStackDev();",
  "developer.skills.push('React', 'TypeScript');",
  "developer.passion = 'Creating Amazing UX';",
  "developer.status = 'Ready to Build';",
  "portfolio.initialize();",
  "Welcome to Ansh's Digital Universe",
]

export function TechyPreloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [currentCode, setCurrentCode] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Check if preloader has been shown before
    const hasShownPreloader = localStorage.getItem("portfolio-preloader-shown")

    if (hasShownPreloader) {
      setIsLoading(false)
      return
    }

    // Typing animation for code
    const typeCode = () => {
      const currentSnippet = codeSnippets[currentCode]
      let charIndex = 0

      const typeInterval = setInterval(() => {
        if (charIndex < currentSnippet.length) {
          setTypedText(currentSnippet.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setCurrentCode((prev) => (prev + 1) % codeSnippets.length)
            setTypedText("")
          }, 1000)
        }
      }, 50)
    }

    // Start typing animation
    typeCode()
    const codeInterval = setInterval(typeCode, 3000)

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    // Progress and message updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setIsLoading(false)
            localStorage.setItem("portfolio-preloader-shown", "true")
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 80)

    // Message cycling
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % techyMessages.length)
    }, 1200)

    return () => {
      clearInterval(codeInterval)
      clearInterval(cursorInterval)
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [currentCode])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo with glow effect */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              AS
            </div>
            <div className="absolute inset-0 text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent blur-lg opacity-50 animate-pulse" />
          </div>
          <div className="text-purple-300 text-lg md:text-xl font-semibold mt-2 tracking-wider">ANSH SHAH</div>
          <div className="text-cyan-400 text-sm md:text-base font-mono mt-1">Full Stack Developer</div>
        </div>

        {/* Code terminal */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <div className="ml-4 text-gray-400 text-sm font-mono">portfolio.js</div>
          </div>
          <div className="font-mono text-left">
            <div className="text-green-400 text-sm md:text-base min-h-[24px]">
              {typedText}
              <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
            </div>
          </div>
        </div>

        {/* Progress section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-300 text-sm font-semibold">{techyMessages[currentMessage]}</span>
            <span className="text-cyan-400 text-sm font-mono">{progress}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 animate-pulse" />
              <div className="absolute right-0 top-0 w-4 h-full bg-white/30 blur-sm animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Scanning line effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
            style={{
              animation: "scan 3s ease-in-out infinite",
              top: "50%",
            }}
          />
        </div>
      </div>
    </div>
  )
}
