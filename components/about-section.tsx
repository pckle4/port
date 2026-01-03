"use client"

import React, { useState, useEffect, useRef, memo } from "react"
import { Card, CardContent } from "./ui/card"
import { Code, Palette, Zap, Heart, GraduationCap, Rocket, Brain, BookOpen, Coffee, Lightbulb, Globe, Terminal } from "lucide-react"
import { cn } from "../lib/utils"

const TechOrbit = memo(() => {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden" style={{ willChange: "transform" }}>
      <div className="absolute z-20 w-20 h-20 bg-gradient-to-br from-[#cc8b86] to-[#7d4f50] rounded-full flex items-center justify-center shadow-lg shadow-[#cc8b86]/30 animate-pulse">
        <Brain className="w-8 h-8 text-white" />
      </div>

      <div className="absolute w-[200px] h-[200px] border border-[#a6808c]/30 rounded-full animate-[spin_30s_linear_infinite]" style={{ willChange: "transform" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-[#a6808c]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Code className="w-4 h-4 text-[#a6808c]" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-background border border-[#a6808c]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Palette className="w-4 h-4 text-[#cc8b86]" />
        </div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-[#a6808c]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Terminal className="w-4 h-4 text-[#7d4f50]" />
        </div>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-[#a6808c]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Globe className="w-4 h-4 text-[#706677]" />
        </div>
      </div>

      <div className="absolute w-[280px] h-[280px] border border-[#cc8b86]/20 rounded-full animate-[spin_45s_linear_infinite_reverse]" style={{ willChange: "transform" }}>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-background border border-[#cc8b86]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Rocket className="w-4 h-4 text-[#706677]" />
        </div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-background border border-[#cc8b86]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Zap className="w-4 h-4 text-[#d1be9c]" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-9 h-9 bg-background border border-[#cc8b86]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Coffee className="w-4 h-4 text-[#7d4f50]" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-background border border-[#cc8b86]/50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <Lightbulb className="w-4 h-4 text-[#ccb7ae]" />
        </div>
      </div>
    </div>
  )
})

const AboutSection = memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-20 relative overflow-hidden bg-[#f5ebe4] dark:bg-[#12100e] section-divider"
      style={{ scrollMarginTop: '96px' }}
    >
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#cc8b86]/30 to-transparent dark:from-[#a6808c]/15 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-[#d1be9c]/30 to-transparent dark:from-[#706677]/15 dark:to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#cc8b86] to-[#a6808c] inline-block mb-3">
              Behind the Code
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#cc8b86] to-[#a6808c] mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            <div className={`order-2 lg:order-1 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
              <TechOrbit />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              
              <div className={`space-y-3 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  I'm a <span className="text-[#cc8b86] dark:text-[#a6808c]">Computer Engineering Student</span> driven by an insatiable curiosity for how things work under the hood.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  My journey isn't defined by a destination, but by the continuous process of learning. From deciphering complex algorithms to crafting intuitive user interfaces, I treat every challenge as an opportunity to expand my toolkit. I'm currently deep-diving into the modern web stack, exploring the intersection of design and logic.
                </p>
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <Card className="bg-secondary/30 border-[#a6808c]/30 dark:border-[#a6808c]/30 hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-2.5 bg-[#cc8b86]/10 dark:bg-[#cc8b86]/20 rounded-lg text-[#cc8b86] dark:text-[#cc8b86]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">Student</h3>
                      <p className="text-xs text-muted-foreground">Computer Engineering</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/30 border-[#706677]/30 dark:border-[#706677]/30 hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-2.5 bg-[#706677]/10 dark:bg-[#706677]/20 rounded-lg text-[#706677] dark:text-[#a6808c]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">Learner</h3>
                      <p className="text-xs text-muted-foreground">Full Stack Development</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className={`pt-2 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Core Values</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Brain, label: "Curiosity", color: "text-[#d1be9c]" },
                    { icon: Code, label: "Clean Code", color: "text-[#706677]" },
                    { icon: Heart, label: "Passion", color: "text-[#cc8b86]" },
                    { icon: Rocket, label: "Growth", color: "text-[#7d4f50]" },
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex flex-col items-center justify-center p-3 rounded-xl bg-background border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                      <item.icon className={cn("w-4 h-4 mb-2", item.color)} />
                      <span className="text-[10px] font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

AboutSection.displayName = "AboutSection"

export default AboutSection
