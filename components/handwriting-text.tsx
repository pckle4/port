"use client"

import { useEffect, useState } from "react"

interface HandwritingTextProps {
  text: string
  className?: string
  speed?: number
}

export function HandwritingText({ text, className = "", speed = 100 }: HandwritingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={`${className} font-handwriting`}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  )
}
