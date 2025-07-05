"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Sparkles, Zap, Star } from "lucide-react"
import Link from "next/link"

// Dynamic highlighting for individual characters
function DynamicHighlightedName({ name }: { name: string }) {
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const highlightSequence = () => {
      const letters = name.replace(" ", "").length
      let index = 0

      const interval = setInterval(() => {
        setHighlightIndex(index)
        index++

        if (index > letters) {
          clearInterval(interval)
          setTimeout(() => {
            setHighlightIndex(-1)
            setTimeout(highlightSequence, 4000) // Repeat every 4 seconds
          }, 1000)
        }
      }, 150)
    }

    setTimeout(highlightSequence, 2000)
  }, [name])

  return (
    <h1 ref={nameRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
      {name.split("").map((char, index) => {
        const letterIndex = char === " " ? -1 : name.replace(" ", "").indexOf(char, index - (index > 4 ? 1 : 0))
        const isHighlighted = letterIndex === highlightIndex

        return (
          <span
            key={index}
            className={`inline-block transition-all duration-300 ${
              isHighlighted
                ? "bg-gradient-to-r from-yellow-400 via-purple-600 to-blue-600 bg-clip-text text-transparent scale-110 drop-shadow-lg animate-pulse"
                : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent"
            }`}
            style={{
              textShadow: isHighlighted ? "0 0 20px rgba(255, 215, 0, 0.5)" : "0 0 20px rgba(139, 92, 246, 0.3)",
              transform: isHighlighted ? "scale(1.1) translateY(-2px)" : "scale(1)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        )
      })}
    </h1>
  )
}

// Enhanced animated headline with typewriter effect
function EnhancedAnimatedHeadline({ words }: { words: string[] }) {
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
    <div className="relative">
      <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {displayText}
        <span className="animate-pulse text-purple-600">|</span>
      </span>
    </div>
  )
}

// Interactive highlighted text with multiple effects
function InteractiveHighlightedText({
  children,
  delay = 0,
  effect = "glow",
}: { children: React.ReactNode; delay?: number; effect?: "glow" | "underline" | "background" | "scale" }) {
  const [isActive, setIsActive] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 2000)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  const handleMouseEnter = () => setIsActive(true)
  const handleMouseLeave = () => setIsActive(false)

  const getEffectClasses = () => {
    switch (effect) {
      case "glow":
        return isActive ? "text-purple-600 font-semibold drop-shadow-lg" : ""
      case "underline":
        return isActive ? "text-blue-600 font-semibold" : ""
      case "background":
        return isActive ? "text-white font-semibold" : ""
      case "scale":
        return isActive ? "text-green-600 font-semibold transform scale-105" : ""
      default:
        return ""
    }
  }

  return (
    <span
      ref={textRef}
      className={`relative inline-block transition-all duration-500 cursor-pointer ${getEffectClasses()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10">{children}</span>

      {/* Effect overlays */}
      {effect === "glow" && (
        <span
          className={`absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-lg blur-sm transition-all duration-500 ${
            isActive ? "opacity-100 scale-110" : "opacity-0 scale-100"
          }`}
          style={{ zIndex: -1 }}
        />
      )}

      {effect === "underline" && (
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ${
            isActive ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      )}

      {effect === "background" && (
        <span
          className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg transition-all duration-500 ${
            isActive ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ zIndex: -1 }}
        />
      )}

      {effect === "scale" && isActive && (
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg animate-pulse" />
      )}
    </span>
  )
}

// Floating particles animation
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          {i % 4 === 0 && <Star className="h-4 w-4 text-purple-400/20" />}
          {i % 4 === 1 && <Zap className="h-5 w-5 text-blue-400/20" />}
          {i % 4 === 2 && <Code className="h-4 w-4 text-cyan-400/20" />}
          {i % 4 === 3 && <Sparkles className="h-3 w-3 text-yellow-400/20" />}
        </div>
      ))}
    </div>
  )
}

export function EnhancedHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [highlightedElement, setHighlightedElement] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Dynamic highlighting cycle for different elements
    const interval = setInterval(() => {
      setHighlightedElement((prev) => (prev + 1) % 5) // 5 elements to highlight
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
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
      {/* Enhanced background with mouse tracking */}
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

        {/* Mouse follower effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        <FloatingParticles />
      </div>

      <div
        className={`container mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Enhanced tagline with dynamic highlighting */}
          <div className="flex items-center justify-center mb-6 group relative">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 animate-pulse group-hover:animate-spin" />
            <div className="relative">
              <span
                className={`text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transition-all duration-500 ${
                  highlightedElement === 0 ? "scale-110 drop-shadow-lg" : "scale-100"
                }`}
              >
                <InteractiveHighlightedText delay={500} effect="glow">
                  Craving For Crafting !!
                </InteractiveHighlightedText>
              </span>
              {highlightedElement === 0 && (
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-sm animate-pulse" />
              )}
            </div>
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 ml-2 animate-pulse group-hover:animate-spin" />
          </div>

          {/* Interactive greeting */}
          <div className="mb-4 relative">
            <span
              className={`text-base sm:text-lg text-muted-foreground transition-all duration-500 ${
                highlightedElement === 1 ? "scale-105 font-semibold" : "scale-100"
              }`}
            >
              <InteractiveHighlightedText delay={1000} effect="underline">
                Hello, I'm
              </InteractiveHighlightedText>
            </span>
            {highlightedElement === 1 && (
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg blur-sm animate-pulse" />
            )}
          </div>

          {/* Dynamic highlighted name */}
          <div className="relative mb-6">
            <div className={`transition-all duration-500 ${highlightedElement === 2 ? "scale-105" : "scale-100"}`}>
              <DynamicHighlightedName name="Ansh Shah" />
            </div>
            {highlightedElement === 2 && (
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-2xl blur-xl animate-pulse" />
            )}
          </div>

          {/* Enhanced animated headline */}
          <div className="relative mb-8">
            <div
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold h-12 sm:h-16 flex items-center justify-center transition-all duration-500 ${
                highlightedElement === 3 ? "scale-110" : "scale-100"
              }`}
            >
              <EnhancedAnimatedHeadline words={dynamicWords} />
            </div>
            {highlightedElement === 3 && (
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-xl blur-lg animate-pulse" />
            )}
          </div>

          {/* Interactive description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            I craft{" "}
            <InteractiveHighlightedText delay={2000} effect="background">
              beautiful digital experiences
            </InteractiveHighlightedText>{" "}
            with{" "}
            <InteractiveHighlightedText delay={2500} effect="glow">
              modern technologies
            </InteractiveHighlightedText>
            , turning{" "}
            <InteractiveHighlightedText delay={3000} effect="scale">
              innovative ideas
            </InteractiveHighlightedText>{" "}
            into reality through{" "}
            <InteractiveHighlightedText delay={3500} effect="underline">
              clean code
            </InteractiveHighlightedText>{" "}
            and{" "}
            <InteractiveHighlightedText delay={4000} effect="background">
              creative design solutions
            </InteractiveHighlightedText>
            .
          </p>

          {/* Enhanced buttons with dynamic highlighting */}
          <div className="relative mb-8 sm:mb-12">
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center px-4 transition-all duration-500 ${
                highlightedElement === 4 ? "scale-105" : "scale-100"
              }`}
            >
              <Button
                onClick={handleScrollToProjects}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">View My Work</span>
                <Sparkles className="h-4 w-4 ml-2 group-hover:animate-spin relative z-10" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent group relative overflow-hidden"
                asChild
              >
                <Link href="/resume">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:animate-bounce transition-transform relative z-10" />
                  <span className="relative z-10">Download CV</span>
                </Link>
              </Button>
            </div>
            {highlightedElement === 4 && (
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl animate-pulse" />
            )}
          </div>

          {/* Enhanced social links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 sm:w-14 sm:h-14 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110 group relative"
              asChild
            >
              <a href="https://github.com/ansh" target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 bg-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <Github className="h-6 w-6 sm:h-7 sm:w-7 group-hover:rotate-12 transition-transform relative z-10" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 sm:w-14 sm:h-14 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110 group relative"
              asChild
            >
              <a href="https://linkedin.com/in/ansh" target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform relative z-10" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 sm:w-14 sm:h-14 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-110 group relative"
              asChild
            >
              <a href="mailto:theanshshah@gmail.com">
                <div className="absolute inset-0 bg-green-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <Mail className="h-6 w-6 sm:h-7 sm:w-7 group-hover:rotate-12 transition-transform relative z-10" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform group"
      >
        <div className="absolute inset-0 bg-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        <ArrowDown className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground group-hover:text-purple-600 transition-colors relative z-10" />
      </button>
    </section>
  )
}
