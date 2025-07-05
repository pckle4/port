"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Sparkles } from "lucide-react"
import Link from "next/link"

// Enhanced animated headline with microinteractions
function AnimatedHeadline({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentWord = words[currentIndex]

    if (isTyping) {
      if (charIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex + 1))
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
          setDisplayText(currentWord.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 50)
        return () => clearTimeout(timer)
      } else {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsTyping(true)
      }
    }
  }, [currentIndex, isTyping, charIndex, words])

  return (
    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
      {displayText}
      <span className="animate-pulse text-purple-600">|</span>
    </span>
  )
}

// Animated name with letter-by-letter reveal
function AnimatedName({ name }: { name: string }) {
  const [visibleChars, setVisibleChars] = useState(0)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleChars < name.length) {
        setVisibleChars((prev) => prev + 1)
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [visibleChars, name.length])

  return (
    <h1 ref={nameRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
      {name.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-500 ${
            index < visibleChars
              ? "opacity-100 transform translate-y-0 scale-100"
              : "opacity-0 transform translate-y-4 scale-95"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            textShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  )
}

// Highlighted text with dynamic effects
function HighlightedText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isHighlighted, setIsHighlighted] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHighlighted(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span
      ref={textRef}
      className={`relative inline-block transition-all duration-1000 ${isHighlighted ? "transform scale-105" : ""}`}
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
    >
      <span className={`relative z-10 ${isHighlighted ? "text-purple-600 font-semibold" : ""}`}>{children}</span>
      <span
        className={`absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg transition-all duration-500 ${
          isHighlighted ? "opacity-100 scale-110" : "opacity-0 scale-100"
        }`}
        style={{ zIndex: -1 }}
      />
    </span>
  )
}

export function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const dynamicWords = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"]

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16"
    >
      {/* Enhanced background with better visibility */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-cyan-50/50 dark:from-purple-950/10 dark:via-blue-950/10 dark:to-cyan-950/10" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div
        ref={heroRef}
        className={`container mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Animated tagline */}
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 animate-pulse" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              <HighlightedText delay={500}>Craving For Crafting !!</HighlightedText>
            </span>
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 ml-2 animate-pulse" />
          </div>

          {/* Animated greeting */}
          <div className="mb-4">
            <span className="text-base sm:text-lg text-muted-foreground">
              <HighlightedText delay={1000}>Hello, I'm</HighlightedText>
            </span>
          </div>

          {/* Animated name */}
          <AnimatedName name="Ansh Shah" />

          {/* Animated headline */}
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-8 h-12 sm:h-16 flex items-center justify-center">
            <AnimatedHeadline words={dynamicWords} />
          </div>

          {/* Animated description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            I craft <HighlightedText delay={2000}>beautiful digital experiences</HighlightedText> with{" "}
            <HighlightedText delay={2500}>modern technologies</HighlightedText>, turning{" "}
            <HighlightedText delay={3000}>innovative ideas</HighlightedText> into reality through{" "}
            <HighlightedText delay={3500}>clean code</HighlightedText> and{" "}
            <HighlightedText delay={4000}>creative design solutions</HighlightedText>.
          </p>

          {/* Animated buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Button
              onClick={handleScrollToProjects}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:rotate-12 transition-transform" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent group"
              asChild
            >
              <Link href="/resume">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:translate-y-1 transition-transform" />
                Download CV
              </Link>
            </Button>
          </div>

          {/* Animated social links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 sm:w-14 sm:h-14 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110 group"
              asChild
            >
              <a href="https://github.com/ansh" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 sm:h-7 sm:w-7 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 sm:w-14 sm:h-14 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110 group"
              asChild
            >
              <a href="https://linkedin.com/in/ansh" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 sm:w-14 sm:h-14 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-110 group"
              asChild
            >
              <a href="mailto:theanshshah@gmail.com">
                <Mail className="h-6 w-6 sm:h-7 sm:w-7 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform"
      >
        <ArrowDown className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground" />
      </button>
    </section>
  )
}
