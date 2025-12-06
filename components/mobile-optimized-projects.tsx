
"use client"

import React, { useRef, useState, MouseEvent } from "react"
import { ExternalLink, Github, ArrowUpRight, Folder, Calendar, ImageOff, Globe, Layout, Code2 } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"


type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  links: { demo: string; github: string }
  color: string
  date: string
  category: string
}

const projects: Project[] = [
  {
    title: "Link File Sharing",
    description: "A secure, frontend-only file sharing platform. Encrypts files client-side and generates shareable links without permanent server storage.",
    tags: ["React", "Tailwind CSS", "Web Crypto API"],
    image: "/images/4x.png",
    links: { demo: "https://l.nowhile.com", github: "https://github.com/theanshshah" },
    color: "from-orange-500 to-red-500",
    date: "November 2025",
    category: "Web App"
  },
  {
    title: "Resume Generator",
    description: "Professional resume builder with real-time preview. Features dynamic forms, customizable templates, and instant PDF export.",
    tags: ["React", "TypeScript", "Shadcn UI"],
    image: "/images/1x.png",
    links: { demo: "https://resume.nowhile.com", github: "https://github.com/theanshshah" },
    color: "from-purple-500 to-indigo-500",
    date: "January 2025",
    category: "Productivity"
  },
  {
    title: "P2P File Transfer",
    description: "Direct browser-to-browser file sharing using WebRTC. Supports large files and real-time text chat with zero-knowledge privacy.",
    tags: ["Vanilla JS", "WebRTC", "Socket.io"],
    image: "/images/3x.png",
    links: { demo: "https://file.nowhile.com", github: "https://github.com/theanshshah" },
    color: "from-blue-500 to-cyan-500",
    date: "January 2025",
    category: "Networking"
  },
  {
    title: "QR Code Generator",
    description: "Advanced QR tool supporting URLs, WiFi, vCards, and more. Includes customization options for colors, logos, and error correction levels.",
    tags: ["React", "TypeScript", "Canvas API"],
    image: "/images/2x.png",
    links: { demo: "https://qr.nowhile.com", github: "https://github.com/theanshshah" },
    color: "from-emerald-500 to-green-500",
    date: "March 2025",
    category: "Utility"
  }
]

// Optimized Image Component - Single Source
const OptimizedImage = ({ src, alt }: { src: string, alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900">
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 z-10">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-4 text-center bg-muted">
             <ImageOff className="w-8 h-8 opacity-50 mb-2" />
             <span className="text-[10px] font-mono opacity-70">Image Not Found</span>
             <span className="text-[9px] opacity-50 mt-1">{src.split('/').pop()}</span>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => { setIsLoading(false); setError(true); }}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />
      )}
    </div>
  )
}

// Modern Browser Window Card
const ModernProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border/60 bg-card shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full">
      
      {/* Browser Window Header */}
      <div className="h-7 bg-slate-100 dark:bg-slate-900/50 border-b border-border/50 flex items-center px-3 space-x-1.5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
        <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
        <div className="ml-3 flex-1 h-3.5 bg-white dark:bg-white/5 rounded text-[9px] flex items-center px-2 text-muted-foreground font-mono truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.links.demo.replace('https://', '')}
        </div>
      </div>

      {/* Image Container - Aspect Video (16:9) Enforcement */}
      <div className="relative w-full aspect-video overflow-hidden border-b border-border/40 bg-slate-50 dark:bg-black/20 group-hover:brightness-105 transition-all duration-500">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
           <OptimizedImage src={project.image} alt={project.title} />
        </div>
        
        {/* Overlay Action Buttons (Visible on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
           <Button variant="default" size="sm" className="rounded-full shadow-lg interactive" asChild>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                 <Globe className="w-3.5 h-3.5 mr-2" /> Live Demo
              </a>
           </Button>
           {project.links.github !== "#" && (
             <Button variant="outline" size="sm" className="rounded-full bg-background/90 hover:bg-background border-white/20 shadow-lg interactive" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                   <Github className="w-3.5 h-3.5 mr-2" /> Code
                </a>
             </Button>
           )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="inline-flex items-center text-[9px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-0.5">
               {project.category}
            </span>
            <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
          </div>
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1 interactive" title="Open Project">
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags & Footer */}
        <div className="mt-auto pt-3 border-t border-border/50 flex flex-wrap gap-2 items-center justify-between">
           <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
                    {tag}
                </span>
              ))}
           </div>
           {project.date && (
             <div className="flex items-center text-[10px] text-muted-foreground/60 font-medium">
               <Calendar className="w-3 h-3 mr-1" />
               {project.date}
             </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default function MobileOptimizedProjects() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wide border border-purple-200/50 dark:border-purple-800/50">
            <Code2 className="w-3 h-3 mr-1.5" />
            Selected Work
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-foreground">
             Featured <span className="text-purple-600 dark:text-purple-400">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A curated collection of web applications showcasing mastery in frontend architecture, user experience design, and performance optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ModernProjectCard key={index} project={project} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <Button variant="outline" className="h-11 rounded-full px-6 border-dashed border-2 hover:border-purple-500 hover:bg-purple-500/5 hover:text-purple-600 dark:hover:text-purple-400 transition-all interactive" asChild>
                <a href="https://github.com/theanshshah" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" /> View Full Archive
                </a>
            </Button>
        </div>
      </div>
    </section>
  )
}
