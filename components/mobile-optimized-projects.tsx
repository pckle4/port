"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar, Sparkles, Filter, X } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { useRouter } from "next/navigation"

const projects = [
  {
    title: "Resume Generator",
    description: "A responsive resume generator web application using React, TypeScript, and Tailwind CSS.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-26%20at%2013.03.18-56X3iLjvY3SN2KoA7P09PDP0FhVkkd.jpeg",
    technologies: ["TypeScript", "React", "Tailwind CSS"],
    date: "Jan 2025",
    liveUrl: "https://resume.nowhile.com",
    githubUrl: "#",
    status: "Completed",
    category: "Web App",
  },
  {
    title: "P2P File Transfer",
    description: "Peer-to-peer file transfer application with real-time chat functionality.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-26%20at%2013.27.30-JZN3AbaEpz9KXVPcXNQBFY54JvbpO8.jpeg",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Jan 2025",
    liveUrl: "https://file.nowhile.com",
    githubUrl: "#",
    status: "Completed",
    category: "Networking",
  },
  {
    title: "QR Code Generator",
    description: "Versatile QR code generator supporting multiple data types and formats.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-26%20at%2013.06.02-0Kz5UFfKJBIvnkVOKWIiAUzNhiWBYc.jpeg",
    technologies: ["React", "TypeScript", "CSS"],
    date: "Mar 2025",
    liveUrl: "https://qr.nowhile.com",
    githubUrl: "#",
    status: "Completed",
    category: "Utility",
  },
]

function OptimizedProjectCard({ project, index }: { project: any; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div
      ref={cardRef}
      className={`relative group max-w-sm mx-auto transition-all duration-500 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Glow Effect */}
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-lg transition-all duration-300 ${
          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      />

      <Card className="relative bg-background/95 dark:bg-background/95 backdrop-blur-sm border border-border/50 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] will-change-transform">
        {/* Project Image */}
        <div className="relative overflow-hidden h-40">
          <OptimizedImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={320}
            height={160}
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-black/20 dark:bg-white/10 text-white border-0 backdrop-blur-sm text-xs font-medium"
            >
              {project.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-100 border-0 backdrop-blur-sm text-xs font-medium"
            >
              {project.status}
            </Badge>
          </div>

          {/* Sparkle Effect */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-white/80 animate-pulse" />
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
              {project.title}
            </CardTitle>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span className="text-xs font-medium">{project.date}</span>
            </div>
          </div>
          <CardDescription className="text-sm leading-relaxed line-clamp-2 text-muted-foreground">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <Badge
                key={tech}
                variant="outline"
                className={`text-xs font-medium transition-colors duration-200 ${
                  techIndex % 4 === 0
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                    : techIndex % 4 === 1
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : techIndex % 4 === 2
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                }`}
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 h-9 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              asChild
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                <span className="text-sm">Demo</span>
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-9 border hover:bg-foreground hover:text-background transition-all duration-200 hover:scale-105 font-medium bg-transparent"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                <span className="text-sm">Code</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function MobileOptimizedProjects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set())

  const categories = Array.from(new Set(["All", ...projects.map((p) => p.category)])).filter(Boolean)
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies)))

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) => {
      const next = new Set(prev)
      if (next.has(tech)) next.delete(tech)
      else next.add(tech)
      return next
    })
  }

  const clearFilters = () => {
    setActiveCategory("All")
    setSelectedTechs(new Set())
  }

  const filteredProjects = projects.filter((p) => {
    const categoryOk = activeCategory === "All" || p.category === activeCategory
    const techsOk = selectedTechs.size === 0 || Array.from(selectedTechs).every((t) => p.technologies.includes(t))
    return categoryOk && techsOk
  })

  const pathname = typeof window !== "undefined" ? window.location.pathname : "/"
  const router = useRouter()
  const initializedRef = useRef(false)

  // initialize from URL once
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    try {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
      const cat = params.get("cat")
      const techParam = params.get("tech")
      if (cat && categories.includes(cat)) setActiveCategory(cat)
      if (techParam) {
        const parts = techParam.split(",").filter(Boolean)
        if (parts.length) {
          setSelectedTechs(new Set(parts.filter((t) => allTechs.includes(t))))
        }
      }
    } catch {}
  }, [categories.join(","), allTechs.join(",")])

  // write filters to URL on change
  useEffect(() => {
    try {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
      if (activeCategory && activeCategory !== "All") params.set("cat", activeCategory)
      else params.delete("cat")
      if (selectedTechs.size > 0) params.set("tech", Array.from(selectedTechs).join(","))
      else params.delete("tech")

      const qs = params.toString()
      const url = qs ? `${pathname}?${qs}` : pathname
      if (typeof window !== "undefined" && url !== window.location.pathname + (window.location.search || "")) {
        router.replace(url)
      }
    } catch {}
  }, [activeCategory, selectedTechs, pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-muted/30 dark:bg-muted/5 relative">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="mb-6 sm:mb-8 space-y-3">
            {/* Category pills */}
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
              role="tablist"
              aria-label="Project categories"
            >
              <span className="flex items-center text-xs text-muted-foreground mr-1 shrink-0">
                <Filter className="h-4 w-4 mr-1" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background/60 hover:bg-muted border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {(activeCategory !== "All" || selectedTechs.size > 0) && (
                <button
                  onClick={clearFilters}
                  className="ml-auto px-2 py-1 rounded-full text-xs border border-border hover:bg-muted flex items-center gap-1 shrink-0"
                  aria-label="Clear filters"
                  title="Clear filters"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>

            {/* Technology chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar" aria-label="Technology filters">
              <span className="flex items-center text-xs text-muted-foreground mr-1 shrink-0">Tech:</span>
              {allTechs.map((tech) => {
                const active = selectedTechs.has(tech)
                return (
                  <button
                    type="button"
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs border whitespace-nowrap transition-colors ${
                      active
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-background/60 border-border hover:bg-muted"
                    }`}
                    aria-pressed={active}
                  >
                    {tech}
                  </button>
                )
              })}
            </div>

            {/* Results count */}
            <div className="text-xs text-muted-foreground" aria-live="polite">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <OptimizedProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
