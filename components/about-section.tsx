"use client"

import { useState, useEffect, useRef, memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap, Heart } from "lucide-react"

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
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50/50 to-purple-50/30 dark:from-gray-950/50 dark:to-purple-950/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div
              className={`order-2 lg:order-1 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-full opacity-80 animate-spin-slow" />
                <div className="absolute inset-1 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/30 dark:shadow-purple-400/40">
                  <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-60 md:h-60 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border-4 border-white/20 dark:border-gray-700/30">
                    <span className="text-2xl sm:text-4xl md:text-6xl animate-bounce">👨‍💻</span>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 animate-pulse" />
              </div>
            </div>

            <div
              className={`space-y-4 sm:space-y-6 order-1 lg:order-2 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            >
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                I'm a passionate full-stack developer with experience creating digital solutions that make a difference.
                I specialize in modern web technologies and love bringing creative ideas to life through elegant code
                and intuitive design.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                When I'm not coding, you'll find me exploring new technologies, working on creative projects, and
                continuously learning about the latest developments in web development, AI, and user experience design.
              </p>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <Card className="group hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/30 transition-all duration-300 hover:scale-105 border-purple-200/50 dark:border-purple-700/50 will-change-transform">
                  <CardContent className="p-3 sm:p-4 md:p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/40 dark:to-blue-950/40">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform duration-300">
                      15+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Projects Completed
                    </div>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 transition-all duration-300 hover:scale-105 border-blue-200/50 dark:border-blue-700/50 will-change-transform">
                  <CardContent className="p-3 sm:p-4 md:p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-300 group-hover:scale-110 transition-transform duration-300">
                      2+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Years Experience
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/60 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 group hover:scale-105 will-change-transform">
                  <Code className="h-6 w-6 text-purple-600 dark:text-purple-300 mb-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Development</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 group hover:scale-105 will-change-transform">
                  <Palette className="h-6 w-6 text-blue-600 dark:text-blue-300 mb-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Design</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 group hover:scale-105 will-change-transform">
                  <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-300 mb-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Innovation</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/60 hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-all duration-300 group hover:scale-105 will-change-transform">
                  <Heart className="h-6 w-6 text-pink-600 dark:text-pink-300 mb-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Passion</span>
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

export { AboutSection }
