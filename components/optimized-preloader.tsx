"use client"

import { useEffect, useState, useCallback } from "react"

const hackerMessages = ["Initializing...", "Loading assets...", "Ready!"]

export function OptimizedPreloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  const completeLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Faster, more predictable loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(completeLoading, 300)
          return 100
        }
        return prev + 20
      })
    }, 100)

    // Simpler message cycling
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % hackerMessages.length)
    }, 400)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [completeLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="text-center text-green-400 font-mono">
        {/* Simplified design - no heavy animations */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🤔</div>
          <div className="text-green-300">ANSH SHAH PORTFOLIO</div>
        </div>

        {/* Simple progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
          <div className="h-full bg-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="text-sm">{hackerMessages[currentMessage]}</div>
      </div>
    </div>
  )
}
