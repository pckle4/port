"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Simplified icon cloud without heavy dependencies
function SimpleIconCloud() {
  const skills = [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
  ]

  return (
    <div className="relative h-[400px] flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4 max-w-sm">
        {skills.map((skill, index) => (
          <div
            key={skill}
            className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-3 text-center text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

const skillCategories = [
  {
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces with modern frameworks and libraries.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    color: "purple",
    icon: "🎨",
  },
  {
    title: "Backend Development",
    description: "Building scalable server-side applications and APIs with robust architecture.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "GraphQL"],
    color: "blue",
    icon: "⚙️",
  },
  {
    title: "DevOps & Cloud",
    description: "Deploying and managing applications with modern cloud infrastructure.",
    skills: ["Docker", "AWS", "Vercel", "Kubernetes", "CI/CD", "Monitoring"],
    color: "green",
    icon: "☁️",
  },
  {
    title: "Design & UX",
    description: "Creating beautiful and intuitive user experiences with design thinking.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems"],
    color: "pink",
    icon: "✨",
  },
]

export function OptimizedSkills() {
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
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Skills & Technologies
          </h2>
          <p
            className={`text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A comprehensive toolkit of modern technologies and frameworks I use to bring ideas to life
          </p>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              {skillCategories.map((category, index) => (
                <Card
                  key={index}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default
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
              className={`relative transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <SimpleIconCloud />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
