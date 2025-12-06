
"use client"

import React, { useState, useEffect, useRef, memo } from "react"
import { Card, CardContent } from "./ui/card"
import { Code, Palette, Zap, Heart, GraduationCap, Rocket, Brain, BookOpen } from "lucide-react"
import { cn } from "../lib/utils"

// Tech Orbit Animation Component
const TechOrbit = () => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto flex items-center justify-center">
      {/* Central Core */}
      <div className="absolute z-20 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse">
        <Brain className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
      </div>

      {/* Inner Orbit */}
      <div className="absolute w-[70%] h-[70%] border border-purple-500/30 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-purple-500/50 rounded-full flex items-center justify-center shadow-sm">
          <Code className="w-4 h-4 text-purple-500" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-background border border-purple-500/50 rounded-full flex items-center justify-center shadow-sm">
          <Palette className="w-4 h-4 text-pink-500" />
        </div>
      </div>

      {/* Outer Orbit */}
      <div className="absolute w-full h-full border border-blue-500/20 rounded-full animate-spin-slow reverse" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-background border border-blue-500/50 rounded-full flex items-center justify-center shadow-sm">
          <Rocket className="w-5 h-5 text-blue-500" />
        </div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-background border border-blue-500/50 rounded-full flex items-center justify-center shadow-sm">
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -z-10" />
    </div>
  )
}

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
      className="py-16 sm:py-20 relative overflow-hidden bg-background"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-purple-100/40 to-transparent dark:from-purple-900/20 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-blue-100/40 to-transparent dark:from-blue-900/20 dark:to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 inline-block mb-3">
              Behind the Code
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Visuals */}
            <div className={`order-2 lg:order-1 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
              <TechOrbit />
            </div>

            {/* Right Column: Content */}
            <div className="order-1 lg:order-2 space-y-6">
              
              {/* Bio Text */}
              <div className={`space-y-3 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  I'm a <span className="text-purple-600 dark:text-purple-400">Computer Engineering Student</span> driven by an insatiable curiosity for how things work under the hood.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  My journey isn't defined by a destination, but by the continuous process of learning. From deciphering complex algorithms to crafting intuitive user interfaces, I treat every challenge as an opportunity to expand my toolkit. I'm currently deep-diving into the modern web stack, exploring the intersection of design and logic.
                </p>
              </div>

              {/* Info Cards */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <Card className="bg-secondary/30 border-purple-200/50 dark:border-purple-800/50 hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-300">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Student</h4>
                      <p className="text-xs text-muted-foreground">Computer Engineering</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/30 border-blue-200/50 dark:border-blue-800/50 hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-300">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Learner</h4>
                      <p className="text-xs text-muted-foreground">Full Stack Development</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Attributes Grid */}
              <div className={`pt-2 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Core Values</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Brain, label: "Curiosity", color: "text-amber-500" },
                    { icon: Code, label: "Clean Code", color: "text-blue-500" },
                    { icon: Heart, label: "Passion", color: "text-pink-500" },
                    { icon: Rocket, label: "Growth", color: "text-green-500" },
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
