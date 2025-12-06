
"use client"

import React, { useEffect, useState, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Search, X, Home, User, Code, Briefcase, Mail, FileText, Moon, Sun, Monitor, ArrowRight, ExternalLink, Github, Linkedin, Download, Copy, Check, Terminal, Layout, Globe } from "lucide-react"
import { useTheme } from "./theme-provider"
import { cn } from "../lib/utils"

interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
}

type ActionItem = {
  id: string
  label: string
  description: string
  icon: React.ElementType
  keywords: string[]
  perform: () => void
  type: "nav" | "file" | "project" | "social" | "action" | "tech"
  color: string
  secondaryAction?: {
    icon: React.ElementType
    label: string
    perform: (e: React.MouseEvent) => void
  }
}

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { setTheme } = useTheme()

  const handleCopy = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const actions = useMemo<ActionItem[]>(() => [
    // Navigation
    {
      id: "home",
      label: "Home",
      description: "Go back to the landing page",
      icon: Home,
      keywords: ["start", "index", "landing"],
      perform: () => navigate("/"),
      type: "nav",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
      id: "about",
      label: "About Me",
      description: "Learn more about my background",
      icon: User,
      keywords: ["bio", "profile", "information"],
      perform: () => navigate("/#about"),
      type: "nav",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      id: "skills",
      label: "Skills & Technologies",
      description: "View my technical expertise",
      icon: Terminal,
      keywords: ["tech", "stack", "languages", "tools", "react", "node"],
      perform: () => navigate("/#skills"),
      type: "nav",
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20"
    },
    {
      id: "projects",
      label: "Projects",
      description: "Browse my portfolio",
      icon: Briefcase,
      keywords: ["work", "case studies", "app", "demo"],
      perform: () => navigate("/#projects"),
      type: "nav",
      color: "text-pink-500 bg-pink-500/10 border-pink-500/20"
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch with me",
      icon: Mail,
      keywords: ["email", "message", "hire"],
      perform: () => navigate("/#contact"),
      type: "nav",
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
      secondaryAction: {
        icon: Copy,
        label: "Copy Email",
        perform: (e) => handleCopy("theanshshah@gmail.com", "contact", e)
      }
    },
    {
      id: "resume",
      label: "View Resume",
      description: "View my professional resume",
      icon: FileText,
      keywords: ["cv", "view", "read", "job"],
      perform: () => navigate("/resume"),
      type: "file",
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      secondaryAction: {
        icon: Download,
        label: "Download",
        perform: (e) => {
            e.stopPropagation();
            const link = document.createElement('a');
            link.href = "/resume.pdf";
            link.download = "Ansh_Shah_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
      }
    },
    
    // Tech Stack Shortcuts
    {
      id: "tech-react",
      label: "React",
      description: "Skill: Frontend Library",
      icon: Code,
      keywords: ["reactjs", "frontend", "ui"],
      perform: () => navigate("/#skills"),
      type: "tech",
      color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
    },
    {
      id: "tech-node",
      label: "Node.js",
      description: "Skill: Backend Runtime",
      icon: Code,
      keywords: ["backend", "javascript", "server"],
      perform: () => navigate("/#skills"),
      type: "tech",
      color: "text-green-500 bg-green-500/10 border-green-500/20"
    },

    // Specific Projects - Updated with Secondary Actions
    {
      id: "project-resume",
      label: "Resume Generator",
      description: "Project: React & TypeScript resume builder",
      icon: Layout,
      keywords: ["resume", "builder", "generator", "project"],
      perform: () => navigate("/#projects"), // Primary: Go to portfolio section
      type: "project",
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      secondaryAction: {
        icon: Globe,
        label: "Visit Site",
        perform: (e) => { e.stopPropagation(); window.open("https://resume.nowhile.com", "_blank"); }
      }
    },
    {
      id: "project-link",
      label: "Link File Sharing",
      description: "Project: Frontend-only React file sharing",
      icon: ExternalLink,
      keywords: ["url", "link", "file", "sharing", "frontend", "react", "project"],
      perform: () => navigate("/#projects"),
      type: "project",
      color: "text-red-500 bg-red-500/10 border-red-500/20",
      secondaryAction: {
        icon: Globe,
        label: "Visit Site",
        perform: (e) => { e.stopPropagation(); window.open("https://l.nowhile.com", "_blank"); }
      }
    },
    {
      id: "project-file",
      label: "P2P File Transfer",
      description: "Project: Secure peer-to-peer file sharing",
      icon: ExternalLink,
      keywords: ["p2p", "file", "transfer", "sharing", "project"],
      perform: () => navigate("/#projects"),
      type: "project",
      color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      secondaryAction: {
        icon: Globe,
        label: "Visit Site",
        perform: (e) => { e.stopPropagation(); window.open("https://file.nowhile.com", "_blank"); }
      }
    },
    {
      id: "project-qr",
      label: "QR Code Generator",
      description: "Project: Versatile QR code creator",
      icon: ExternalLink,
      keywords: ["qr", "code", "generator", "project"],
      perform: () => navigate("/#projects"),
      type: "project",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
       secondaryAction: {
        icon: Globe,
        label: "Visit Site",
        perform: (e) => { e.stopPropagation(); window.open("https://qr.nowhile.com", "_blank"); }
      }
    },

    // Socials
    {
      id: "social-github",
      label: "GitHub",
      description: "Check out my code",
      icon: Github,
      keywords: ["git", "code", "repo"],
      perform: () => window.open("https://github.com/theanshshah", "_blank"),
      type: "social",
      color: "text-gray-500 dark:text-gray-400 bg-gray-500/10 border-gray-500/20"
    },
    {
      id: "social-linkedin",
      label: "LinkedIn",
      description: "Connect professionally",
      icon: Linkedin,
      keywords: ["linkedin", "job", "career"],
      perform: () => window.open("https://linkedin.com/in/anshshahh", "_blank"),
      type: "social",
      color: "text-blue-700 bg-blue-700/10 border-blue-700/20"
    },

    // Theme
    {
      id: "theme-light",
      label: "Light Mode",
      description: "Switch to light theme",
      icon: Sun,
      keywords: ["light", "white", "day", "theme", "mode"],
      perform: () => setTheme("light"),
      type: "action",
      color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "theme-dark",
      label: "Dark Mode",
      description: "Switch to dark theme",
      icon: Moon,
      keywords: ["dark", "black", "night", "theme", "mode"],
      perform: () => setTheme("dark"),
      type: "action",
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20"
    },
  ], [navigate, setTheme])

  // Clock Logic
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredItems = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim()
    
    // User requested: Do not show predefined queries in advance. Only show input bar initially.
    if (!lowerQuery) {
        return []
    }
    
    return actions
      .filter(item =>
        item.label.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.keywords.some(k => k.toLowerCase().includes(lowerQuery))
      )
      .sort((a, b) => {
        const aStarts = a.label.toLowerCase().startsWith(lowerQuery)
        const bStarts = b.label.toLowerCase().startsWith(lowerQuery)
        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1
        return 0
      })
  }, [query, actions])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10)
      document.body.style.overflow = "hidden"
    } else {
      setQuery("")
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    if (listRef.current && filteredItems.length > 0) {
      const activeElement = listRef.current.children[selectedIndex] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" })
      }
    }
  }, [selectedIndex, filteredItems])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          if (filteredItems.length > 0) {
              e.preventDefault()
              setSelectedIndex(prev => (prev + 1) % filteredItems.length)
          }
          break
        case "ArrowUp":
          if (filteredItems.length > 0) {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
          }
          break
        case "Enter":
          if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
            e.preventDefault()
            filteredItems[selectedIndex].perform()
            onClose()
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
        case "Tab":
            e.preventDefault()
            break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, onClose])

  if (!isOpen) return null

  // Check if we are showing results to conditionally style the bottom border
  const hasResults = query.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] sm:pt-[25vh] px-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className={cn(
        "relative w-full max-w-lg bg-background/95 dark:bg-[#121212]/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-200",
        // Only apply transition to height if needed, usually auto-height is fine
      )}>
        
        {/* Compact Search Header */}
        <div className={cn(
            "flex items-center px-3 h-9 sm:h-11 gap-2 sm:gap-3 transition-all duration-200",
            // Only show bottom border if there are results
            hasResults ? "border-b border-white/10 dark:border-white/5" : "border-b-0"
        )}>
          <Search className="h-4 w-4 text-muted-foreground/80 shrink-0" />
          <input 
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 text-foreground h-full min-w-0"
            placeholder="Type command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          <div className="flex items-center gap-2 shrink-0">
            {query ? (
                <button onClick={() => setQuery("")} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
            ) : (
                <div className="hidden sm:flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                    <span className="text-[10px] font-medium text-muted-foreground">ESC</span>
                </div>
            )}
             {/* Visible Time on Mobile - Added shrink-0 to prevent crushing */}
             <div className="select-none pointer-events-none text-[10px] font-mono text-muted-foreground/70 border-l border-white/10 pl-2 ml-1 sm:pl-3 sm:ml-2 shrink-0">
               {currentTime}
             </div>
          </div>
        </div>

        {/* Results List - Only render if query exists */}
        {hasResults && (
            <div className="overflow-y-auto" ref={listRef} style={{ maxHeight: 'calc(45vh)' }}>
                {filteredItems.length === 0 ? (
                    <div className="py-6 text-center text-muted-foreground">
                        <p className="text-xs">No results found for "{query}"</p>
                    </div>
                ) : (
                    <div className="p-1.5 space-y-0.5">
                    {filteredItems.map((item, index) => (
                        <div
                        key={item.id}
                        onClick={() => {
                            item.perform()
                            onClose()
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group cursor-pointer",
                            selectedIndex === index 
                            ? "bg-white/10 dark:bg-white/5" 
                            : "hover:bg-white/5"
                        )}
                        >
                        <div className="flex items-center gap-3 overflow-hidden flex-1">
                            {/* Colored Icon Container */}
                            <div className={cn(
                                "p-1.5 rounded-md transition-colors shrink-0 border",
                                item.color
                            )}>
                                <item.icon className="h-3.5 w-3.5" />
                            </div>
                            
                            <div className="truncate min-w-0 flex-1">
                                <div className={cn("text-sm font-medium truncate flex items-center gap-2", selectedIndex === index ? "text-foreground" : "text-muted-foreground")}>
                                        {item.label}
                                        {selectedIndex === index && <ArrowRight className="h-3 w-3 opacity-50 -ml-1 animate-in slide-in-from-left-1" />}
                                </div>
                                <div className="text-[10px] truncate text-muted-foreground/60">
                                        {item.description}
                                </div>
                            </div>
                        </div>
                        
                        {/* Secondary Action or Status */}
                        <div className="flex items-center gap-2 pl-2 shrink-0">
                            {item.secondaryAction && (
                                <button 
                                    onClick={item.secondaryAction.perform}
                                    className={cn(
                                        "p-1.5 rounded-md transition-all duration-200 flex items-center gap-1.5",
                                        "hover:bg-white/10 border border-transparent hover:border-white/10",
                                        copiedId === item.id ? "text-green-500 bg-green-500/10" : "text-muted-foreground hover:text-foreground"
                                    )}
                                    title={item.secondaryAction.label}
                                >
                                    {copiedId === item.id ? <Check className="h-3.5 w-3.5" /> : <item.secondaryAction.icon className="h-3.5 w-3.5" />}
                                    <span className="text-[10px] font-medium hidden sm:inline-block">
                                        {copiedId === item.id ? "Done" : item.secondaryAction.label}
                                    </span>
                                </button>
                            )}
                        </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        )}
        
        {/* Footer - Only show if there are results */}
        {hasResults && filteredItems.length > 0 && (
            <div className="hidden sm:flex justify-between items-center px-4 py-2 border-t border-white/5 text-[10px] text-muted-foreground bg-white/2 dark:bg-black/20">
                 <span>Use arrows to navigate</span>
                 <div className="flex gap-3">
                     <span className="flex items-center gap-1"><span className="bg-white/10 px-1 rounded">↵</span> to select</span>
                     <span className="flex items-center gap-1"><span className="bg-white/10 px-1 rounded">esc</span> to close</span>
                 </div>
            </div>
        )}
      </div>
    </div>
  )
}
