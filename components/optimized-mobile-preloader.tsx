"use client"

import { useEffect, useState } from "react"

const quickSteps = [
  { message: "Initializing...", duration: 300 },
  { message: "Loading assets...", duration: 400 },
  { message: "Preparing interface...", duration: 300 },
  { message: "Ready!", duration: 200 },
]

export function OptimizedMobilePreloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout
    let progressInterval: NodeJS.Timeout

    const executeStep = (stepIndex: number) => {
      if (stepIndex >= quickSteps.length) {
        setTimeout(() => setIsLoading(false), 200)
        return
      }

      const step = quickSteps[stepIndex]
      setCurrentStep(stepIndex)

      // Faster progress for mobile
      const progressStep = 100 / quickSteps.length
      const targetProgress = (stepIndex + 1) * progressStep

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= targetProgress) {
            clearInterval(progressInterval)
            return targetProgress
          }
          return prev + 8
        })
      }, 30)

      stepTimeout = setTimeout(() => {
        executeStep(stepIndex + 1)
      }, step.duration)
    }

    // Start immediately
    executeStep(0)

    return () => {
      clearTimeout(stepTimeout)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="text-center text-green-400 font-mono px-4">
        {/* Simplified mobile design */}
        <div className="mb-8">
          <div className="text-4xl mb-4">🚀</div>
          <div className="text-green-300 text-lg">ANSH SHAH</div>
          <div className="text-green-500 text-sm">PORTFOLIO</div>
        </div>

        {/* Simple progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
          <div className="h-full bg-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="text-sm">{quickSteps[currentStep]?.message || "Loading..."}</div>

        {/* Simple step indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {quickSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? "bg-green-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
