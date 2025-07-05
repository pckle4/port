"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import IconCloud from "@/components/icon-cloud"

gsap.registerPlugin(ScrollTrigger)

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "nodedotjs",
  "express",
  "prisma",
  "postgresql",
  "mongodb",
  "redis",
  "tailwindcss",
  "sass",
  "figma",
  "sketch",
  "adobexd",
  "docker",
  "kubernetes",
  "git",
  "github",
  "gitlab",
  "vercel",
  "netlify",
  "aws",
  "googlecloud",
  "azure",
  "python",
  "java",
  "go",
  "rust",
  "php",
  "html5",
  "css3",
  "graphql",
  "apollo",
  "firebase",
  "supabase",
  "planetscale",
  "stripe",
  "paypal",
  "socketdotio",
  "webrtc",
  "threejs",
  "d3dotjs",
  "chartdotjs",
  "framer",
  "gsap",
  "webpack",
  "vite",
  "rollup",
  "babel",
  "eslint",
  "prettier",
  "jest",
  "cypress",
  "playwright",
  "storybook",
  "chromatic",
]

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

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cloudRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      },
    )

    // Cloud animation
    gsap.fromTo(
      cloudRef.current,
      { scale: 0.8, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cloudRef.current,
          start: "top 80%",
        },
      },
    )

    // Skills cards animation
    const skillCards = skillsRef.current?.querySelectorAll(".skill-card")
    if (skillCards) {
      gsap.fromTo(
        skillCards,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to bring ideas to life
          </p>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={skillsRef} className="space-y-8">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className="skill-card group p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
                >
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
                </div>
              ))}
            </div>

            <div ref={cloudRef} className="relative">
              <div className="h-[500px] relative">
                <IconCloud iconSlugs={slugs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
