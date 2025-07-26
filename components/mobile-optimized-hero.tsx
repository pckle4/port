"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code } from "lucide-react"
import Link from "next/link"

// Lightweight animated headline for mobile
function MobileAnimatedHeadline({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 2000) // Faster transitions for mobile
    return () => clearInterval(interval)
  }, [words])

  return (
    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
      {words[currentIndex]}
    </span>
  )
}

export function MobileOptimizedHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const timer = setTimeout(() => setIsVisible(true), 100)
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-3.5 pb-16"
    >
      {/* Simplified background for mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 dark:from-purple-950/5 dark:via-blue-950/5 dark:to-cyan-950/5" />
        {!isMobile && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        )}
      </div>

      <div
        className={`container mx-auto text-center transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <div className="flex items-center justify-center mb-4">
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Craving For Crafting !!
            </span>
          </div>

          {/* Greeting */}
          <div className="mb-3">
            <span className="text-sm sm:text-base text-muted-foreground">Hello, I'm</span>
          </div>

          {/* Name - Optimized for mobile */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Ansh Shah
            </span>
          </h1>

          {/* Animated headline */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6 h-8 sm:h-10 flex items-center justify-center">
            <MobileAnimatedHeadline words={dynamicWords} />
          </div>

          {/* Description - Shorter for mobile */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
            I craft beautiful digital experiences with modern technologies, turning ideas into reality through clean
            code and creative design.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 sm:mb-8">
            <Button
              onClick={handleScrollToProjects}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Code className="h-4 w-4 mr-2" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/resume">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Link>
            </Button>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-4 mb-6 sm:mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300"
              asChild
            >
              <a href="https://github.com/ansh" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
              asChild
            >
              <a href="https://linkedin.com/in/ansh" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300"
              asChild
            >
              <a href="mailto:theanshshah@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
      </button>
    </section>
  )
}
