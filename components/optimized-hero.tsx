"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code } from "lucide-react"
import Link from "next/link"

// Simplified animated headline without heavy GSAP
function SimpleAnimatedHeadline({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words])

  return (
    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-500">
      {words[currentIndex]}
    </span>
  )
}

export function OptimizedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simple entrance animation without heavy GSAP
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20"
    >
      {/* Simplified background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20" />

      <div
        ref={heroRef}
        className={`container mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Tagline */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Craving For Crafting !!
            </span>
          </div>

          {/* Greeting */}
          <div className="mb-4">
            <span className="text-base sm:text-lg text-muted-foreground">Hello, I'm</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Ansh Shah
            </span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 h-12 sm:h-16 flex items-center justify-center">
            <SimpleAnimatedHeadline words={dynamicWords} />
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            I craft beautiful digital experiences with modern technologies, turning innovative ideas into reality
            through clean code and creative design solutions.
          </p>

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

          <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 sm:w-12 sm:h-12 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110 group"
              asChild
            >
              <a href="https://github.com/ansh" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 sm:w-12 sm:h-12 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110 group"
              asChild
            >
              <a href="https://linkedin.com/in/ansh" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 sm:w-12 sm:h-12 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-110 group"
              asChild
            >
              <a href="mailto:theanshshah@gmail.com">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform"
      >
        <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
      </button>
    </section>
  )
}
