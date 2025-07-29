"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Sparkles, Zap, Star, Heart } from "lucide-react"
import Link from "next/link"

// Enhanced animated headline with marker highlighting
function EnhancedAnimatedHeadline({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)
  const [highlightedWords, setHighlightedWords] = useState<Set<string>>(new Set())

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
        // Add dynamic highlighting after typing completes
        const highlightTimer = setTimeout(() => {
          setHighlightedWords(new Set([currentWord]))
          setTimeout(() => setHighlightedWords(new Set()), 1500)
        }, 500)

        const pauseTimer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)

        return () => {
          clearTimeout(highlightTimer)
          clearTimeout(pauseTimer)
        }
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

  const isHighlighted = highlightedWords.has(words[currentIndex])

  return (
    <span
      className={`relative inline-block transition-all duration-500 ${
        isHighlighted
          ? "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 dark:from-yellow-400/30 dark:via-yellow-300/40 dark:to-yellow-400/30 px-2 py-1 rounded-lg transform scale-105 shadow-lg animate-pulse"
          : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent"
      }`}
    >
      {displayText}
      <span className="animate-pulse text-purple-600 dark:text-purple-400">|</span>
      {isHighlighted && (
        <div className="absolute inset-0 bg-yellow-300/20 dark:bg-yellow-400/20 rounded-lg animate-pulse" />
      )}
    </span>
  )
}

// Animated SVG Icons
function AnimatedCodeIcon() {
  return (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400 animate-bounce"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 18L22 12L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      />
      <path
        d="M8 6L2 12L8 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
    </svg>
  )
}

function AnimatedDesignIcon() {
  return (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400 animate-spin-slow"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" className="animate-pulse" />
      <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function OptimizedMobileHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 pb-16"
    >
      {/* Grid Background - Only for hero section */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 dark:from-purple-950/10 dark:via-blue-950/10 dark:to-cyan-950/10" />

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Dynamic grid overlay */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "gridMove 30s linear infinite reverse",
          }}
        />
      </div>

      <div className="container mx-auto text-center max-w-5xl relative z-10">
        {/* Enhanced Tagline with animated icons - Increased mobile text size */}
        <div className="mb-2 sm:mb-6 flex items-center justify-center space-x-3 sm:space-x-4">
          <AnimatedCodeIcon />
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
            Craving For Crafting !!
          </span>
          <AnimatedDesignIcon />
        </div>

        {/* Animated greeting with sparkles - Increased mobile text size */}
        <div className="mb-3 sm:mb-4 flex items-center justify-center space-x-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-spin" />
          <span className="text-sm sm:text-base md:text-lg text-muted-foreground animate-bounce">Hello, I'm</span>
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />
        </div>

        {/* Enhanced Name with glow effect - Increased mobile text size */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight relative group">
          <span className="relative inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-all duration-300">
            Ansh Shah
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-xl group-hover:blur-2xl transition-all duration-300 animate-pulse" />
          </span>
        </h1>

        {/* Enhanced animated headline - Increased mobile text size */}
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 sm:mb-8 h-10 sm:h-12 md:h-14 flex items-center justify-center">
          <EnhancedAnimatedHeadline words={dynamicWords} />
        </div>

        {/* Enhanced description - Increased mobile text size */}
        <div className="mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-in">
            I craft{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                beautiful digital experiences
              </span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 animate-expand" />
            </span>{" "}
            with modern technologies, turning ideas into reality through{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
                clean code
              </span>
              <div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 animate-expand"
                style={{ animationDelay: "1s" }}
              />
            </span>{" "}
            and{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                creative design
              </span>
              <div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 animate-expand"
                style={{ animationDelay: "2s" }}
              />
            </span>
            .
          </p>
        </div>

        {/* Enhanced buttons with microinteractions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-2">
          <Button
            onClick={handleScrollToProjects}
            size="lg"
            className="group w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">View My Work</span>
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
            asChild
          >
            <Link href="/resume">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:animate-bounce" />
              <span className="relative z-10">Download CV</span>
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-red-500" />
            </Link>
          </Button>
        </div>

        {/* Enhanced social links with hover effects */}
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="lg"
            className="group w-12 h-12 sm:w-14 sm:h-14 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
            asChild
          >
            <a href="https://github.com/theanshshah" target="_blank" rel="noopener noreferrer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Github className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="group w-12 h-12 sm:w-14 sm:h-14 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
            asChild
          >
            <a href="https://linkedin.com/in/anshshahh" target="_blank" rel="noopener noreferrer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="group w-12 h-12 sm:w-14 sm:h-14 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
            asChild
          >
            <a href="mailto:theanshshah@gmail.com">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </Button>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-all duration-300 group"
      >
        <div className="relative">
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-muted-foreground group-hover:text-purple-600 transition-colors duration-300" />
          <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </div>
      </button>
    </section>
  )
}
