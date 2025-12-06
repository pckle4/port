
"use client"

import React, { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { IconCloud } from "./icon-cloud"

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nodedotjs",
  "express",
  "prisma",
  "postgresql",
  "mongodb",
  "redis",
  "tailwindcss",
  "sass",
  "figma",
  "docker",
  "kubernetes",
  "git",
  "github",
  "aws",
  "python",
  "java",
  "go",
  "rust",
  "html5",
  "css3",
  "graphql",
  "firebase",
  "threedotjs",
]

const skillCategories = [
  {
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces with modern frameworks and libraries.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Three.js"],
    color: "purple",
    icon: "🎨",
  },
  {
    title: "Backend Development",
    description: "Building scalable server-side applications and APIs with robust architecture.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    color: "blue",
    icon: "⚙️",
  },
  {
    title: "DevOps & Cloud",
    description: "Deploying and managing applications with modern cloud infrastructure.",
    skills: ["Docker", "AWS", "Kubernetes", "CI/CD"],
    color: "green",
    icon: "☁️",
  },
  {
    title: "Design & UX",
    description: "Creating beautiful and intuitive user experiences with design thinking.",
    skills: ["Figma", "Prototyping", "User Research"],
    color: "pink",
    icon: "✨",
  },
]

export default function EnhancedSkills() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRenderCloud, setShouldRenderCloud] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setShouldRenderCloud(true) // Start rendering cloud once seen
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-16 relative overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-center mb-3 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Skills & Technologies
          </h2>
          <p
            className={`text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A comprehensive toolkit of modern technologies and frameworks I use to bring ideas to life
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              {skillCategories.map((category, index) => (
                <Card
                  key={index}
                  className="group p-5 rounded-xl bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{category.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 cursor-default
                                ${
                                  category.color === "purple"
                                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                    : category.color === "blue"
                                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                      : category.color === "green"
                                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                        : "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                                }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div
              className={`relative flex items-center justify-center transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              {shouldRenderCloud && (
                // Fixed Dimensions to prevent explosion on "Desktop Site" in mobile
                // Responsive sizing: smaller on mobile, reasonable max on desktop
                <div className="h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] relative flex items-center justify-center animate-fade-in aspect-square">
                  <IconCloud iconSlugs={slugs} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
