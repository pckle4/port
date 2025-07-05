"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Github,
  Calendar,
  Star,
  Eye,
  TrendingUp,
  Code2,
  Palette,
  Zap,
  FileText,
  Share2,
  QrCode,
} from "lucide-react"
import { LazyImage } from "@/components/lazy-image"

const projects = [
  {
    title: "Resume Generator",
    description:
      "A responsive resume generator web application using React, TypeScript, and Tailwind CSS with real-time preview functionality and customizable templates.",
    image: "/projects/resume-generator-new.jpeg",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Shadcn/UI"],
    date: "Jan 2025",
    liveUrl: "https://nowhil.vercel.app",
    githubUrl: "https://nowhil.vercel.app",
    status: "Completed",
    category: "Web App",
    featured: true,
    stats: { stars: 24, forks: 8 },
    icon: FileText,
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "P2P File Transfer",
    description:
      "Peer-to-peer file transfer application with real-time chat functionality, secure connections, and seamless file sharing capabilities.",
    image: "/projects/file-transfer-new.jpeg",
    technologies: ["HTML", "CSS", "JavaScript", "WebRTC"],
    date: "Jan 2025",
    liveUrl: "https://nowhile.com/file",
    githubUrl: "https://nowhile.com/file",
    status: "Completed",
    category: "Networking",
    featured: false,
    stats: { stars: 18, forks: 5 },
    icon: Share2,
    color: "from-green-500 to-blue-600",
  },
  {
    title: "QR Code Generator",
    description:
      "Versatile QR code generator supporting multiple data types including URLs, text, contact info, and location coordinates with customization options.",
    image: "/projects/qr-generator-new.jpeg",
    technologies: ["React", "TypeScript", "CSS", "QR.js"],
    date: "Mar 2025",
    liveUrl: "https://qile.vercel.app",
    githubUrl: "https://qile.vercel.app",
    status: "Completed",
    category: "Utility",
    featured: true,
    stats: { stars: 32, forks: 12 },
    icon: QrCode,
    color: "from-purple-500 to-pink-600",
  },
]

// Magic UI inspired highlight animation
function MagicHighlight({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  return (
    <div className="relative">
      {children}
      {isActive && (
        <>
          {/* Animated border */}
          <div className="absolute inset-0 rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-75 animate-pulse" />
            <div className="absolute inset-[2px] rounded-lg bg-background" />
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg blur-lg animate-pulse" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
          </div>
        </>
      )}
    </div>
  )
}

function ProjectCard({ project, index, isHighlighted }: { project: any; index: number; isHighlighted: boolean }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const IconComponent = project.icon

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
    <div className="relative">
      <MagicHighlight isActive={isHighlighted}>
        <Card
          ref={cardRef}
          className={`group transition-all duration-700 border-0 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 relative z-10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${isHovered ? "scale-105" : "scale-100"}`}
          style={{ transitionDelay: `${index * 150}ms` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Project Image with Lazy Loading */}
          <div className="relative overflow-hidden h-48 lg:h-56">
            <LazyImage
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            />

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Project Icon */}
            <div className="absolute top-4 left-4">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center shadow-lg`}
              >
                <IconComponent className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Badge variant="secondary" className="bg-black/20 text-white border-0 backdrop-blur-sm">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-0 backdrop-blur-sm">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-0 backdrop-blur-sm">
                {project.status}
              </Badge>
            </div>

            {/* Hover Actions */}
            <div
              className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="sm"
                className={`flex-1 bg-gradient-to-r ${project.color} hover:shadow-lg text-white border-0 transition-all duration-300`}
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-black/20 border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            </div>

            {/* Quick Actions */}
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 transition-all duration-500 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 w-10 h-10 p-0 rounded-full"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 w-10 h-10 p-0 rounded-full"
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-xl group-hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                {project.title}
                {isHighlighted && <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />}
              </CardTitle>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">{project.date}</span>
              </div>
            </div>
            <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-0">
            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className={`transition-all duration-300 hover:scale-110 ${
                    techIndex % 4 === 0
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                      : techIndex % 4 === 1
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                        : techIndex % 4 === 2
                          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50"
                          : "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50"
                  } ${isHighlighted ? "animate-pulse" : ""}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-2 border-t border-muted/50">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{project.stats.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>{project.stats.forks}</span>
                </div>
              </div>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isHighlighted ? "bg-purple-500 animate-pulse scale-150" : "bg-muted"
                }`}
              />
            </div>
          </CardContent>

          {/* Decorative Elements */}
          <div
            className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${project.color} transform transition-transform duration-500 ${
              isHovered ? "scale-x-100" : "scale-x-0"
            } origin-left`}
          />
          <div
            className={`absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t ${project.color} transform transition-transform duration-500 ${
              isHovered ? "scale-y-100" : "scale-y-0"
            } origin-bottom`}
          />
        </Card>
      </MagicHighlight>
    </div>
  )
}

export function EnhancedProjects() {
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % projects.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="projects" className="py-16 lg:py-20 bg-muted/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 dark:from-purple-950/5 dark:via-blue-950/5 dark:to-cyan-950/5" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center mb-4">
              <Code2 className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <Palette className="h-8 w-8 text-blue-600 ml-3" />
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and personal projects, featuring modern technologies and innovative solutions
              with dynamic highlighting effects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} isHighlighted={index === highlightedIndex} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  )
}
