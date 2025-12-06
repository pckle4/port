
"use client"

import React, { useState, useEffect, useRef, MouseEvent } from "react"
import { Button } from "./ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Sparkles, Hexagon, Circle, Triangle, Gem, FileJson, Database, Server, Braces, Terminal } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"

// 3D Grid Background Component
const RetroGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden [perspective:500px] -z-20 pointer-events-none">
       {/* Floor Plane */}
       <div 
         className="absolute inset-0 bg-background"
         style={{
            backgroundImage: `
              linear-gradient(to right, rgba(128, 128, 128, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(128, 128, 128, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'rotateX(60deg) translateY(-20%) scale(2.5)',
            transformOrigin: 'top center',
            maskImage: 'linear-gradient(to bottom, transparent, 20%, white, 90%, transparent)'
         }}
       />
       {/* Background Glow */}
       <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-transparent blur-3xl" />
    </div>
  )
}

// Floating Tech Icons in 3D Space
const FloatingIcons = () => {
    // Array of icons with random positions and animation delays
    const icons = [
        { Icon: FileJson, color: "text-yellow-500", top: "20%", left: "15%", delay: "0s", size: "w-6 h-6" },
        { Icon: Database, color: "text-blue-500", top: "60%", left: "85%", delay: "2s", size: "w-8 h-8" },
        { Icon: Server, color: "text-green-500", top: "30%", left: "80%", delay: "4s", size: "w-5 h-5" },
        { Icon: Braces, color: "text-purple-500", top: "75%", left: "10%", delay: "1s", size: "w-10 h-10" },
        { Icon: Terminal, color: "text-gray-500", top: "15%", left: "70%", delay: "3s", size: "w-6 h-6" },
        { Icon: Code, color: "text-pink-500", top: "80%", left: "50%", delay: "5s", size: "w-5 h-5" },
    ]

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {icons.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute opacity-20 animate-float-slow",
                        item.color
                    )}
                    style={{
                        top: item.top,
                        left: item.left,
                        animationDelay: item.delay,
                        transform: 'translateZ(0)' // Hardware acceleration
                    }}
                >
                    <item.Icon className={item.size} />
                </div>
            ))}
        </div>
    )
}

function EnhancedAnimatedHeadline({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  const [showHighlight, setShowHighlight] = useState(false)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const currentWord = words[currentIndex]

    if (phase === 'typing') {
      if (charIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 80 + Math.random() * 30)
        return () => clearTimeout(timer)
      } else {
        setPhase('pausing')
      }
    } else if (phase === 'pausing') {
      const highlightTimer = setTimeout(() => setShowHighlight(true), 200)
      const nextPhaseTimer = setTimeout(() => {
        setPhase('deleting')
      }, 4000)

      return () => {
        clearTimeout(highlightTimer)
        clearTimeout(nextPhaseTimer)
      }
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 100)
        return () => clearTimeout(timer)
      } else {
        setShowHighlight(false)
        setPhase('typing')
        setCurrentIndex((prev) => (prev + 1) % words.length)
      }
    }
  }, [phase, charIndex, currentIndex, words])

  return (
    <span className="relative inline-block px-2 mx-1 select-none pointer-events-none">
      <span 
        className={cn(
          "absolute top-[10%] bottom-[5%] left-0 bg-[#FDE047] -z-10 rounded-sm mix-blend-multiply dark:mix-blend-normal dark:opacity-90",
          "transition-all duration-500 ease-out", 
          showHighlight ? "w-[102%] skew-x-[-3deg]" : "w-0 skew-x-0"
        )}
        style={{ transformOrigin: "left center" }}
      />
      <span className={cn(
        "relative z-10 font-bold transition-colors duration-300", 
        showHighlight 
          ? "text-black drop-shadow-sm" 
          : "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
      )}>
        {displayText}
      </span>
      <span className="animate-pulse text-purple-600 dark:text-purple-400 font-light ml-0.5">|</span>
    </span>
  )
}

const TiltButton = ({ children, className, ...props }: React.ComponentProps<typeof Button>) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || window.innerWidth < 768) return
    
    const button = buttonRef.current;
    
    requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = ((y - centerY) / centerY) * -8 
        const rotateY = ((x - centerX) / centerX) * 8

        button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    })
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
  }

  return (
    <Button
      ref={buttonRef}
      {...props}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("transition-transform duration-100 ease-out will-change-transform", className)}
    >
      {children}
    </Button>
  )
}

export function OptimizedMobileHero() {
  const containerRef = useRef<HTMLElement>(null)
  
  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const dynamicWords = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"]

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 pt-20 pb-16"
    >
      {/* 3D Grid Background */}
      <RetroGrid />
      
      {/* Moving Coding Icons */}
      <FloatingIcons />

      <div className="container mx-auto text-center max-w-5xl relative z-10">
        
        <div className="mb-6 flex justify-center animate-fade-in">
          <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/40 border border-purple-200/30 dark:border-purple-500/20 backdrop-blur-md shadow-sm hover:border-purple-400/50 transition-colors cursor-default">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-purple-700 to-blue-700 dark:from-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
              Available for freelance work
            </span>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-center space-x-2 text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="text-lg font-light tracking-wide">Hi, I'm</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-5 tracking-tight relative inline-block animate-fade-in select-none pointer-events-none" style={{ animationDelay: "200ms" }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 filter drop-shadow-sm">
            Ansh Shah
          </span>
          <Sparkles className="absolute -top-3 -right-6 w-8 h-8 sm:w-10 sm:h-10 text-[#FDE047] animate-pulse hidden sm:block" />
        </h1>

        <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in select-none pointer-events-none" style={{ animationDelay: "300ms" }}>
          <EnhancedAnimatedHeadline words={dynamicWords} />
        </div>

        <p className="mb-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "400ms" }}>
          Building <span className="text-purple-600 dark:text-purple-400 font-semibold">digital masterpieces</span> that seamlessly blend{" "}
          <span className="inline-block relative font-medium text-foreground mx-1">
            complex logic
            <span className="absolute bottom-1 left-0 w-full h-[3px] bg-blue-500/30 -z-10 rounded-full"></span>
          </span>{" "}
          with{" "}
          <span className="inline-block relative font-medium text-foreground mx-1">
             elegant aesthetics
             <span className="absolute bottom-1 left-0 w-full h-[3px] bg-pink-500/30 -z-10 rounded-full"></span>
          </span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <TiltButton
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto min-w-[160px] h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg shadow-purple-500/25 border-0"
          >
            <Code className="mr-2 h-4 w-4" /> View Work
          </TiltButton>

          <TiltButton
            variant="outline"
            asChild
            className="w-full sm:w-auto min-w-[160px] h-12 text-base font-semibold rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <Link to="/resume">
              <Download className="mr-2 h-4 w-4" /> Resume
            </Link>
          </TiltButton>
        </div>

        <div className="flex justify-center gap-5 animate-fade-in" style={{ animationDelay: "600ms" }}>
          {[
            { Icon: Github, href: "https://github.com/theanshshah", color: "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white" },
            { Icon: Linkedin, href: "https://linkedin.com/in/anshshahh", color: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" },
            { Icon: Mail, href: "mailto:theanshshah@gmail.com", color: "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300" }
          ].map(({ Icon, href, color }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("p-3 rounded-full bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 backdrop-blur-md", color)}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer p-3 rounded-full hover:bg-white/20 transition-colors z-20"
        onClick={handleScrollDown}
      >
        <ArrowDown className="w-6 h-6 text-purple-500/70 hover:text-purple-600 transition-colors" />
      </div>
    </section>
  )
}
