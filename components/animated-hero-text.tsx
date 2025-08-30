"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedHeroTextProps {
  text: string
  className?: string
  delay?: number
  highlightWords?: string[]
}

export function AnimatedHeroText({ text, className = "", delay = 0, highlightWords = [] }: AnimatedHeroTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [highlightedWords, setHighlightedWords] = useState<Set<string>>(new Set())
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          setIsComplete(true)
          setTimeout(() => setShowCursor(false), 1000)
        }
      },
      delay + (currentIndex === 0 ? 500 : 50),
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  // Cursor blinking effect
  useEffect(() => {
    if (!isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)
      return () => clearInterval(cursorInterval)
    }
  }, [isComplete])

  // Dynamic highlighting effect
  useEffect(() => {
    if (isComplete && highlightWords.length > 0) {
      const highlightInterval = setInterval(() => {
        const randomWord = highlightWords[Math.floor(Math.random() * highlightWords.length)]
        setHighlightedWords((prev) => new Set([...prev, randomWord]))

        setTimeout(() => {
          setHighlightedWords((prev) => {
            const newSet = new Set(prev)
            newSet.delete(randomWord)
            return newSet
          })
        }, 2000)
      }, 3000)

      return () => clearInterval(highlightInterval)
    }
  }, [isComplete, highlightWords])

  const renderTextWithHighlights = (text: string) => {
    if (highlightWords.length === 0) return text

    const words = text.split(" ")
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]/, "")
      const isHighlighted = highlightedWords.has(cleanWord)

      return (
        <span
          key={index}
          className={`relative inline-block transition-all duration-500 ${
            isHighlighted
              ? "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 dark:from-yellow-400/30 dark:via-yellow-300/40 dark:to-yellow-400/30 px-1 rounded transform scale-105 shadow-lg"
              : ""
          }`}
          style={{
            animation: isHighlighted ? "markerHighlight 0.5s ease-out" : "none",
          }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
          {isHighlighted && (
            <div className="absolute inset-0 bg-yellow-300/20 dark:bg-yellow-400/20 rounded animate-pulse" />
          )}
        </span>
      )
    })
  }

  return (
    <div ref={textRef} className={`${className} relative`}>
      <span className="inline-block">
        {isComplete ? renderTextWithHighlights(displayText) : displayText}
        <span
          className={`inline-block w-0.5 h-[1em] bg-purple-600 dark:bg-purple-400 ml-1 transition-opacity duration-300 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: showCursor ? "blink 1s infinite" : "none" }}
        />
      </span>
    </div>
  )
}

export function AnimatedHeadline({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentWord = words[currentIndex]

    if (isTyping) {
      if (charIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 100)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timer)
      }
    } else {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 50)
        return () => clearTimeout(timer)
      } else {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsTyping(true)
      }
    }
  }, [currentIndex, charIndex, isTyping, words])

  return (
    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent relative">
      {displayText}
      <span className="animate-pulse">|</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-lg animate-pulse" />
    </span>
  )
}
