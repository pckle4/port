
"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "./ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Sparkles, FileJson, Database, Braces, Terminal, Zap, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn, smoothScrollToElement } from "../lib/utils"

const GridBackground = () => {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full bg-[#faf8f6] dark:bg-[#0a0909]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 sm:opacity-100"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[220px] w-[220px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#cc8b86] opacity-20 blur-[60px] sm:blur-[100px]"></div>
    </div>
  )
}

const FloatingIcons = () => {
    const icons = [
        { Icon: FileJson, color: "text-[#cc8b86]/40", top: "25%", left: "15%", delay: "0s" },
        { Icon: Database, color: "text-[#a6808c]/40", top: "55%", left: "85%", delay: "1.5s" },
        { Icon: Braces, color: "text-[#7d4f50]/40", top: "70%", left: "12%", delay: "0.5s" },
        { Icon: Terminal, color: "text-[#aa998f]/40", top: "20%", left: "75%", delay: "2s" },
    ]

    return (
    <div 
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none hidden md:block parallax-container" 
        aria-hidden="true"
        onMouseMove={(e) => {
            const container = e.currentTarget;
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 50;
            const y = (e.clientY - rect.top - rect.height / 2) / 50;
            container.style.setProperty('--parallax-x', `${x}px`);
            container.style.setProperty('--parallax-y', `${y}px`);
        }}
    >
            {icons.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute w-6 h-6 transition-transform duration-300",
                        item.color
                    )}
                    style={{
                        top: item.top,
                        left: item.left,
                        willChange: 'transform',
                        animation: `float-slow 6s ease-in-out ${item.delay} infinite`,
                        transform: `translate(calc(var(--parallax-x, 0px) * ${(index % 3) + 1}), calc(var(--parallax-y, 0px) * ${(index % 3) + 1}))`
                    }}
                >
                    <item.Icon className="w-6 h-6" />
                </div>
            ))}
        </div>
    )
}

function EnhancedAnimatedHeadline({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [displayText, setDisplayText] = useState(words[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const [showHighlight, setShowHighlight] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => setPrefersReducedMotion(event.matches)
    handleChange(mediaQuery)
    

    setIsMobile(window.innerWidth < 768)
    
    const updateSize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', updateSize)
    return () => {
        mediaQuery.removeEventListener?.('change', handleChange)
        window.removeEventListener('resize', updateSize)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(words[0])
      return
    }


    if (isInitialLoad) {
        const initialTimer = setTimeout(() => {
            setIsInitialLoad(false)
            setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(initialTimer)
    }

    const currentWord = words[currentIndex]
    const typingSpeed = isDeleting ? (isMobile ? 30 : 50) : (isMobile ? 60 : 100)
    const pauseDuration = isMobile ? 1500 : 2000

    if (!isDeleting && displayText === currentWord) {
      const highlightTimer = setTimeout(() => setShowHighlight(true), 100)
      const pauseTimer = setTimeout(() => {
        setShowHighlight(false)
        const deleteDelayTimer = setTimeout(() => setIsDeleting(true), 400)
        return () => clearTimeout(deleteDelayTimer)
      }, pauseDuration)
      return () => {
        clearTimeout(highlightTimer)
        clearTimeout(pauseTimer)
      }
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      setDisplayText(prev => 
        isDeleting 
          ? prev.substring(0, prev.length - 1) 
          : currentWord.substring(0, prev.length + 1)
      )
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentIndex, words, isMobile, prefersReducedMotion, isInitialLoad])

  if (prefersReducedMotion) {
    return <span className="font-bold text-foreground">{words[0]}</span>
  }

  return (
    <span className="relative inline-block px-2 mx-1 select-none pointer-events-none">
      <span 
        className={cn(
          "absolute top-[10%] bottom-[5%] left-0 bg-[#7d4f50] dark:bg-[#d1be9c] -z-10 rounded-sm mix-blend-normal shadow-sm dark:opacity-100",
          "transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]", 
          showHighlight ? "opacity-100" : "opacity-0"
        )}
        style={{ 
          width: "102%",
          left: "-1%",
          clipPath: showHighlight ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transitionProperty: "clip-path, opacity"
        }}
        aria-hidden="true"
      />
      <span className={cn(
        "relative z-10 font-extrabold tracking-tight transition-colors duration-500", 
        showHighlight 
          ? "text-white dark:text-[#171512]" 
          : "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
      )}>
        {displayText}
      </span>
      <span className="text-[#a6808c] dark:text-[#cc8b86] font-light ml-0.5 motion-reduce:hidden animate-pulse">|</span>
    </span>
  )
}

export function OptimizedMobileHero() {
  const containerRef = useRef<HTMLElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768)
  }, [])
  
  const handleScrollToProjects = () => {
    const el = document.getElementById("projects")
    if (el) smoothScrollToElement(el)
  }

  const handleScrollDown = () => {
    const el = document.getElementById("about")
    if (el) smoothScrollToElement(el)
  }

  const dynamicWords = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"]

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 pt-20 pb-16"
    >
      <GridBackground />
      
      {isDesktop && <FloatingIcons />}

      <div className="container mx-auto text-center max-w-5xl relative z-10">
        
        <div className="mb-8 flex justify-center motion-reduce:animate-none animate-slide-up relative z-20">
          <div className="group relative inline-flex overflow-hidden rounded-full p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#7d4f50]">
            
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d6cfcb_0%,#7d4f50_50%,#d6cfcb_100%)]" />
            
            <div className="relative inline-flex h-full w-full cursor-default items-center justify-center rounded-full px-5 py-2 text-sm font-medium bg-white dark:bg-slate-950 backdrop-blur-3xl">
              
              <Zap className="w-4 h-4 mr-2 text-[#cc8b86] dark:text-[#a6808c] fill-[#cc8b86] dark:fill-[#a6808c]" />
              
              <span className="text-gray-900 dark:text-white font-semibold">
                Open to Work
              </span>
              
              <ChevronRight className="w-4 h-4 ml-1.5 text-[#cc8b86] dark:text-[#a6808c] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-center space-x-2 text-muted-foreground motion-reduce:animate-none animate-slide-up" style={{ animationDelay: "100ms" }}>
            <span className="text-lg font-light tracking-wide">Hi, I'm</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-5 tracking-tight relative inline-block motion-reduce:animate-none animate-slide-up select-none pointer-events-none" style={{ animationDelay: "200ms" }}>
          <span className="animate-gradient-text">
            Ansh Shah
          </span>
          <Sparkles className="absolute -top-3 -right-6 w-8 h-8 sm:w-10 sm:h-10 text-[#d1be9c] hidden sm:block" />
        </h1>

        <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold motion-reduce:animate-none animate-slide-up select-none pointer-events-none" style={{ animationDelay: "300ms" }}>
          <EnhancedAnimatedHeadline words={dynamicWords} />
        </div>

        <p className="mb-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed motion-reduce:animate-none animate-slide-up" style={{ animationDelay: "400ms" }}>
          Building <span className="text-[#cc8b86] dark:text-[#a6808c] font-semibold">digital masterpieces</span> that seamlessly blend{" "}
          <span className="inline-block relative font-medium text-foreground mx-1">
            complex logic
            <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#a6808c]/30 -z-10 rounded-full"></span>
          </span>{" "}
          with{" "}
          <span className="inline-block relative font-medium text-foreground mx-1">
             elegant aesthetics
             <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#cc8b86]/30 -z-10 rounded-full"></span>
          </span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 px-2 sm:px-0 motion-reduce:animate-none animate-slide-up safe-area-inset" style={{ animationDelay: "500ms" }}>
          <Button
            onClick={handleScrollToProjects}
            className="group w-full sm:w-auto min-w-[160px] h-12 sm:h-12 text-base font-semibold bg-gradient-to-r from-[#cc8b86] to-[#a6808c] hover:from-[#b87a75] hover:to-[#967480] text-white rounded-full shadow-lg shadow-[#cc8b86]/25 border-0 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#cc8b86]/30 active:scale-[0.98] touch-feedback"
          >
            <Code className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" /> 
            View Work
            <ChevronRight className="ml-1 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </Button>

          <Button
            variant="outline"
            asChild
            className="group w-full sm:w-auto min-w-[160px] h-12 sm:h-12 text-base font-semibold rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-none sm:backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#7d4f50] dark:hover:border-[#cc8b86] hover:bg-[#7d4f50] dark:hover:bg-[#cc8b86]/20 hover:text-white dark:hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-feedback"
          >
            <Link to="/resume">
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce motion-reduce:animate-none" /> 
              Resume
            </Link>
          </Button>
        </div>

        <div className="flex justify-center gap-5 motion-reduce:animate-none animate-slide-up" style={{ animationDelay: "600ms" }}>
          {[
            { Icon: Github, href: "https://github.com/theanshshah", color: "text-[#565264] dark:text-[#d6cfcb] hover:text-[#7d4f50] dark:hover:text-white", label: "GitHub Profile" },
            { Icon: Linkedin, href: "https://linkedin.com/in/anshshahh", color: "text-[#706677] dark:text-[#a6808c] hover:text-[#565264] dark:hover:text-[#cc8b86]", label: "LinkedIn Profile" },
            { Icon: Mail, href: "mailto:theanshshah@gmail.com", color: "text-[#cc8b86] dark:text-[#cc8b86] hover:text-[#7d4f50] dark:hover:text-[#d6cfcb]", label: "Send Email" }
          ].map(({ Icon, href, color, label }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn("p-3 rounded-full bg-white/60 dark:bg-white/5 border border-[#ccb7ae] dark:border-[#565264] hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 backdrop-blur-none sm:backdrop-blur-md touch-feedback", color)}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <button 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-none sm:animate-bounce cursor-pointer p-3 rounded-full hover:bg-white/20 transition-colors z-20"
        onClick={handleScrollDown}
        aria-label="Scroll down to about section"
      >
        <ArrowDown className="w-6 h-6 text-[#a6808c]/70 hover:text-[#cc8b86] transition-colors" />
      </button>
    </section>
  )
}
