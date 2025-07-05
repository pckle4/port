"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"

const projects = [
  {
    title: "Resume Generator",
    description: "A responsive resume generator web application using React, TypeScript, and Tailwind CSS.",
    image: "/projects/resume-generator.jpeg",
    technologies: ["TypeScript", "React", "Tailwind CSS"],
    date: "Jan 2025",
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
    category: "Web App",
  },
  {
    title: "P2P File Transfer",
    description: "Peer-to-peer file transfer application with real-time chat functionality.",
    image: "/projects/file-transfer.jpeg",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Jan 2025",
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
    category: "Networking",
  },
  {
    title: "QR Code Generator",
    description: "Versatile QR code generator supporting multiple data types and formats.",
    image: "/projects/qr-generator.jpeg",
    technologies: ["React", "TypeScript", "CSS"],
    date: "Mar 2025",
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
    category: "Utility",
  },
]

function MobileProjectCard({ project, index }: { project: any; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Card
      ref={cardRef}
      className={`transition-all duration-500 border-0 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden max-w-sm mx-auto ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-40">
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          width={320}
          height={160}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/20 text-white border-0 backdrop-blur-sm text-xs">
            {project.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-0 backdrop-blur-sm text-xs">
            {project.status}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span className="text-xs">{project.date}</span>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed line-clamp-2">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech, techIndex) => (
            <Badge
              key={tech}
              variant="outline"
              className={`text-xs ${
                techIndex % 4 === 0
                  ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  : techIndex % 4 === 1
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : techIndex % 4 === 2
                      ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
              }`}
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 h-8"
            asChild
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span className="text-xs">Demo</span>
            </a>
          </Button>
          <Button size="sm" variant="outline" className="flex-1 h-8 bg-transparent" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-3 w-3 mr-1" />
              <span className="text-xs">Code</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function MobileOptimizedProjects() {
  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <MobileProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
