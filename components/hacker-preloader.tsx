"use client"

import { useEffect, useState } from "react"

const hackerMessages = [
  "Initializing neural networks...",
  "Compiling quantum algorithms...",
  "Decrypting portfolio matrix...",
  "Loading creative subroutines...",
  "Establishing secure connection...",
  "Optimizing user experience...",
  "Calibrating design systems...",
  "Synchronizing data streams...",
  "Activating portfolio protocols...",
  "Ready to showcase brilliance...",
]

const binaryStrings = [
  "01001000 01100001 01100011 01101011",
  "01010000 01101111 01110010 01110100",
  "01000001 01101110 01110011 01101000",
  "01000100 01100101 01110110 01100101",
]

export function HackerPreloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [binaryIndex, setBinaryIndex] = useState(0)

  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsLoading(false), 1000)
          return 100
        }
        return prev + Math.random() * 8 + 2
      })
    }, 150)

    // Message cycling
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % hackerMessages.length)
    }, 800)

    // Binary cycling
    const binaryInterval = setInterval(() => {
      setBinaryIndex((prev) => (prev + 1) % binaryStrings.length)
    }, 1200)

    // Typing effect
    const message = hackerMessages[currentMessage]
    let index = 0
    const typingInterval = setInterval(() => {
      if (index <= message.length) {
        setTypedText(message.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    // Matrix rain animation
    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext("2d")
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
      const font_size = window.innerWidth < 768 ? 8 : 10
      const columns = canvas.width / font_size
      const drops: number[] = []

      for (let x = 0; x < columns; x++) {
        drops[x] = 1
      }

      function draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#0F0"
        ctx.font = font_size + "px arial"

        for (let i = 0; i < drops.length; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * font_size, drops[i] * font_size)

          if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }

      const matrixInterval = setInterval(draw, 35)

      return () => {
        clearInterval(progressInterval)
        clearInterval(messageInterval)
        clearInterval(binaryInterval)
        clearInterval(typingInterval)
        clearInterval(matrixInterval)
      }
    }

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearInterval(binaryInterval)
      clearInterval(typingInterval)
    }
  }, [currentMessage])

  if (!isLoading) return null

  return (
    <div className="hacker-preloader fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <canvas id="matrix-canvas" className="absolute inset-0 opacity-20" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanlines"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-green-400 font-mono max-w-4xl mx-auto px-4">
        {/* ASCII Art Header - Responsive */}
        <div className="mb-6 sm:mb-8 text-xs sm:text-sm leading-tight">
          <pre className="text-green-300 opacity-80 hidden sm:block">
            {`
    ╔═══════════════════════════════════════╗
    ║           ANSH SHAH PORTFOLIO         ║
    ║         SYSTEM INITIALIZATION         ║
    ╚═══════════════════════════════════════╝
`}
          </pre>
          <div className="sm:hidden text-green-300 opacity-80 text-center">
            <div className="border border-green-500 p-2 rounded">
              <div>ANSH SHAH PORTFOLIO</div>
              <div>SYSTEM INITIALIZATION</div>
            </div>
          </div>
        </div>

        {/* Binary Display */}
        <div className="mb-4 sm:mb-6 text-green-500 text-xs opacity-60">
          <span className="animate-pulse">{binaryStrings[binaryIndex]}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span>LOADING...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-none border border-green-500">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-green-400 opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="mb-6 sm:mb-8 h-12 sm:h-16 flex items-center justify-center">
          <div className="text-xs sm:text-sm">
            <span className="text-green-300">root@ansh-portfolio:~$ </span>
            <span className="text-white">{typedText}</span>
            <span className="animate-pulse text-green-400">|</span>
          </div>
        </div>

        {/* System Stats - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs mb-6">
          <div className="bg-gray-900/50 border border-green-500/30 p-2 sm:p-3 rounded">
            <div className="text-green-300">CPU</div>
            <div className="text-white">{Math.floor(Math.random() * 40) + 60}%</div>
          </div>
          <div className="bg-gray-900/50 border border-green-500/30 p-2 sm:p-3 rounded">
            <div className="text-green-300">RAM</div>
            <div className="text-white">{Math.floor(Math.random() * 30) + 70}%</div>
          </div>
          <div className="bg-gray-900/50 border border-green-500/30 p-2 sm:p-3 rounded">
            <div className="text-green-300">NET</div>
            <div className="text-white">{Math.floor(Math.random() * 20) + 80}%</div>
          </div>
          <div className="bg-gray-900/50 border border-green-500/30 p-2 sm:p-3 rounded">
            <div className="text-green-300">GPU</div>
            <div className="text-white">{Math.floor(Math.random() * 25) + 75}%</div>
          </div>
        </div>

        {/* Hacker Elements - Responsive positioning */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-xs opacity-50">
          <div>IP: 192.168.1.{Math.floor(Math.random() * 255)}</div>
          <div className="hidden sm:block">PORT: {Math.floor(Math.random() * 9000) + 1000}</div>
          <div className="hidden sm:block">PROTOCOL: HTTPS</div>
        </div>

        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-xs opacity-50">
          <div className="hidden sm:block">ENCRYPTION: AES-256</div>
          <div>STATUS: SECURE</div>
          <div className="hidden sm:block">
            UPTIME: {Math.floor(Math.random() * 24)}h {Math.floor(Math.random() * 60)}m
          </div>
        </div>

        {/* Bottom Terminal - Responsive */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-xs opacity-60">
          <div className="bg-black/50 border border-green-500/30 p-2 rounded font-mono">
            <div className="text-green-300">[INFO] Establishing secure connection...</div>
            <div className="text-yellow-300 hidden sm:block">[WARN] High creativity levels detected...</div>
            <div className="text-blue-300">[DEBUG] Loading awesome projects...</div>
          </div>
        </div>
      </div>

      {/* Glitch Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glitch-overlay"></div>
      </div>
    </div>
  )
}
