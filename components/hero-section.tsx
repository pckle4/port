"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Sparkles, Grid3X3, Zap, Star } from "lucide-react"
import { AnimatedHeadline } from "@/components/animated-headline"
import { AnimatedIcons } from "@/components/animated-icons"
import { HandwritingText } from "@/components/handwriting-text"
import { gsap } from "gsap"
import Link from "next/link"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const gridElementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    // Background animation
    gsap.to(backgroundRef.current?.children, {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
      stagger: 3,
    })

    // Grid elements animation
    const gridElements = gridElementsRef.current?.querySelectorAll(".grid-element")
    if (gridElements) {
      gsap.fromTo(
        gridElements,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.15,
          delay: 1.5,
        },
      )

      // Floating animation for grid elements
      gridElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 3 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4,
        })
      })
    }

    const tl = gsap.timeline()

    // Enhanced entrance animations
    tl.fromTo(taglineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      .fromTo(
        titleRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "elastic.out(1, 0.8)" },
        "-=0.3",
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(
        buttonsRef.current?.children,
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.15 },
        "-=0.5",
      )
      .fromTo(
        socialRef.current?.children,
        { y: 30, opacity: 0, rotation: -45 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)", stagger: 0.08 },
        "-=0.4",
      )

    // Continuous floating animation for the entire hero content
    gsap.to(heroRef.current, {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  const dynamicWords = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"]

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollDown = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20"
    >
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 -z-10">
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
        {/* Diagonal grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Floating Grid Elements - Hidden on mobile for performance */}
      <div ref={gridElementsRef} className="absolute inset-0 -z-10 hidden sm:block">
        <div className="grid-element absolute top-20 left-20 w-12 h-12 sm:w-16 sm:h-16 border-2 border-purple-400/30 rounded-lg flex items-center justify-center">
          <Grid3X3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400/50" />
        </div>
        <div className="grid-element absolute top-32 right-32 w-10 h-10 sm:w-12 sm:h-12 border-2 border-blue-400/30 rounded-full flex items-center justify-center">
          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400/50" />
        </div>
        <div className="grid-element absolute bottom-40 left-40 w-12 h-12 sm:w-14 sm:h-14 border-2 border-cyan-400/30 rounded-lg rotate-45 flex items-center justify-center">
          <Star className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400/50 -rotate-45" />
        </div>
        <div className="grid-element absolute bottom-32 right-20 w-8 h-8 sm:w-10 sm:h-10 border-2 border-purple-400/30 rounded-full flex items-center justify-center">
          <Code className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400/50" />
        </div>
        <div className="grid-element absolute top-1/2 left-10 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg"></div>
        <div className="grid-element absolute top-1/3 right-10 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full"></div>
      </div>

      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles - Reduced on mobile */}
      <div className="absolute inset-0 -z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div ref={heroRef} className="container mx-auto text-center">
        <div className="max-w-5xl mx-auto">
          {/* Tagline */}
          <div ref={taglineRef} className="flex items-center justify-center mb-6">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 animate-pulse" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Craving For Crafting !!
            </span>
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 ml-2 animate-pulse" />
          </div>

          {/* Greeting */}
          <div className="flex items-center justify-center mb-4">
            <HandwritingText text="Hello, I'm" className="text-base sm:text-lg text-muted-foreground" speed={80} />
          </div>

          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Ansh Shah
            </span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 h-12 sm:h-16 flex items-center justify-center">
            <AnimatedHeadline words={dynamicWords} />
          </div>

          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          >
            <HandwritingText
              text="I craft beautiful digital experiences with modern technologies, turning innovative ideas into reality through clean code and creative design solutions."
              speed={30}
            />
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
          >
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

          <div ref={socialRef} className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12">
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

          <div className="hidden sm:block">
            <AnimatedIcons />
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
