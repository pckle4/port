
"use client"

import React, { useEffect, useState, useRef, useCallback, memo } from "react"
import { useNavigate } from "react-router-dom"
import { Search, X, Home, User, Code, Briefcase, Mail, FileText, Moon, Sun, ArrowRight, ExternalLink, Github, Linkedin, Download, Copy, Check, Terminal, Layout, Globe, Sparkles, Zap } from "lucide-react"
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

const SearchItem = memo(({ item, isSelected, onSelect, onHover, copiedId, onCopy }: {
  item: ActionItem
  isSelected: boolean
  onSelect: () => void
  onHover: () => void
  copiedId: string | null
  onCopy: (text: string, id: string, e: React.MouseEvent) => void
}) => (
  <div
    onClick={onSelect}
    onMouseEnter={onHover}
    className={cn(
      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer group",
      "transition-all duration-150 ease-out",
      isSelected 
        ? "bg-purple-500/10 dark:bg-purple-500/15 shadow-sm" 
        : "hover:bg-white/5"
    )}
  >
    <div className="flex items-center gap-3 overflow-hidden flex-1">
      <div className={cn(
        "p-2 rounded-lg transition-all duration-200 shrink-0 border",
        item.color,
        isSelected && "scale-110"
      )}>
        <item.icon className="h-4 w-4" />
      </div>
      <div className="truncate min-w-0 flex-1">
        <div className={cn(
          "text-sm font-medium truncate flex items-center gap-2 transition-colors duration-150",
          isSelected ? "text-foreground" : "text-muted-foreground"
        )}>
          {item.label}
          {isSelected && <ArrowRight className="h-3 w-3 opacity-60" />}
        </div>
        <div className="text-[11px] truncate text-muted-foreground/60">
          {item.description}
        </div>
      </div>
    </div>
    {item.secondaryAction && (
      <button 
        onClick={(e) => {
          e.stopPropagation()
          if (item.id === "contact") {
            onCopy("theanshshah@gmail.com", item.id, e)
          } else {
            item.secondaryAction!.perform(e)
          }
        }}
        className={cn(
          "p-1.5 rounded-md transition-all duration-150 flex items-center gap-1.5 ml-2",
          "hover:bg-white/10 border border-transparent hover:border-white/10",
          copiedId === item.id ? "text-green-500 bg-green-500/10" : "text-muted-foreground hover:text-foreground"
        )}
        title={item.secondaryAction.label}
      >
        {copiedId === item.id ? <Check className="h-3.5 w-3.5" /> : <item.secondaryAction.icon className="h-3.5 w-3.5" />}
      </button>
    )}
  </div>
))

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { setTheme } = useTheme()

  const handleCopy = useCallback((text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  const actions: ActionItem[] = [
    {
      id: "home",
      label: "Home",
      description: "Go back to the landing page",
      icon: Home,
      keywords: ["start", "index", "landing", "main"],
      perform: () => navigate("/"),
      type: "nav",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
      id: "about",
      label: "About",
      description: "Learn more about my background",
      icon: User,
      keywords: ["bio", "profile", "information", "me", "who"],
      perform: () => navigate("/#about"),
      type: "nav",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      id: "skills",
      label: "Skills & Technologies",
      description: "View my technical expertise",
      icon: Terminal,
      keywords: ["tech", "stack", "languages", "tools", "react", "node", "typescript", "javascript"],
      perform: () => navigate("/#skills"),
      type: "nav",
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20"
    },
    {
      id: "projects",
      label: "Projects",
      description: "Browse my portfolio work",
      icon: Briefcase,
      keywords: ["work", "case", "app", "demo", "portfolio"],
      perform: () => navigate("/#projects"),
      type: "nav",
      color: "text-pink-500 bg-pink-500/10 border-pink-500/20"
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch with me",
      icon: Mail,
      keywords: ["email", "message", "hire", "reach"],
      perform: () => navigate("/#contact"),
      type: "nav",
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
      secondaryAction: { icon: Copy, label: "Copy", perform: () => {} }
    },
    {
      id: "resume",
      label: "View Resume",
      description: "View my professional resume",
      icon: FileText,
      keywords: ["cv", "view", "read", "job", "pdf"],
      perform: () => navigate("/resume"),
      type: "file",
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      secondaryAction: {
        icon: Download,
        label: "PDF",
        perform: () => {
          const link = document.createElement('a')
          link.href = "/resume.pdf"
          link.download = "Ansh_Shah_Resume.pdf"
          link.click()
        }
      }
    },
    {
      id: "tech-react",
      label: "React",
      description: "Frontend Library",
      icon: Code,
      keywords: ["reactjs", "frontend", "ui", "component"],
      perform: () => navigate("/#skills"),
      type: "tech",
      color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
    },
    {
      id: "tech-typescript",
      label: "TypeScript",
      description: "Type-safe JavaScript",
      icon: Code,
      keywords: ["ts", "types", "javascript"],
      perform: () => navigate("/#skills"),
      type: "tech",
      color: "text-blue-600 bg-blue-600/10 border-blue-600/20"
    },
    {
      id: "tech-node",
      label: "Node.js",
      description: "Backend Runtime",
      icon: Code,
      keywords: ["backend", "javascript", "server", "api"],
      perform: () => navigate("/#skills"),
      type: "tech",
      color: "text-green-500 bg-green-500/10 border-green-500/20"
    },

    {
      id: "project-resume",
      label: "Resume Generator",
      description: "Project: React & TypeScript resume builder",
      icon: Layout,
      keywords: ["resume", "builder", "generator", "project"],
      perform: () => navigate("/#project-resume"),
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
      perform: () => navigate("/#project-link-share"),
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
      perform: () => navigate("/#project-p2p"),
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
      perform: () => navigate("/#project-qr"),
      type: "project",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
       secondaryAction: {
        icon: Globe,
        label: "Visit Site",
        perform: (e) => { e.stopPropagation(); window.open("https://qr.nowhile.com", "_blank"); }
      }
    },

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
  ]

  const getFilteredItems = useCallback((searchQuery: string) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return []
    
    const scored = actions.map(item => {
      let score = 0
      const label = item.label.toLowerCase()
      if (label === q) score = 100
      else if (label.startsWith(q)) score = 80
      else if (label.includes(q)) score = 60
      else if (item.keywords.some(k => k.startsWith(q))) score = 40
      else if (item.keywords.some(k => k.includes(q))) score = 30
      else if (item.description.toLowerCase().includes(q)) score = 20
      return { item, score }
    })
    
    return scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.item)
  }, [])

  const filteredItems = getFilteredItems(query)

  useEffect(() => { setSelectedIndex(0) }, [query])

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = "hidden"
    } else {
      setQuery("")
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement
    el?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      const len = filteredItems.length
      if (e.key === "ArrowDown" && len > 0) {
        e.preventDefault()
        setSelectedIndex(i => (i + 1) % len)
      } else if (e.key === "ArrowUp" && len > 0) {
        e.preventDefault()
        setSelectedIndex(i => (i - 1 + len) % len)
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (len > 0 && selectedIndex >= 0 && selectedIndex < len) {
          const item = filteredItems[selectedIndex]
          if (item && typeof item.perform === 'function') {
            item.perform()
            onClose()
          }
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      } else if (e.key === "Tab") {
        e.preventDefault()
      } else if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 150ms ease-out" }}
        aria-hidden="true"
      />
      
      <div 
        className="relative w-full max-w-3xl bg-background/95 dark:bg-[#121212]/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/10"
        style={{ animation: "slideUp 200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        role="dialog"
        aria-label="Search commands"
        aria-modal="true"
      >
        <div className="flex items-center px-4 h-12 sm:h-14 gap-3 sm:gap-4">
          <Search className="h-5 w-5 text-muted-foreground/80 shrink-0" aria-hidden="true" />
          <input 
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground/50 text-foreground h-full min-w-0"
            placeholder="Type command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Search commands and actions"
          />
          <div className="flex items-center gap-2 shrink-0">
            {query ? (
              <button onClick={() => setQuery("")} className="p-1 hover:bg-white/10 rounded-full transition-colors" aria-label="Clear search">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10" aria-hidden="true">
                  <span className="text-[10px] font-medium text-muted-foreground">ESC</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {query && (
          <div className="overflow-y-auto border-t border-white/10 dark:border-white/5" ref={listRef} style={{ maxHeight: 'calc(50vh)' }} role="listbox" aria-label="Search results">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p className="text-sm">No results found for "{query}"</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredItems.map((item, index) => (
                  <SearchItem
                    key={item.id}
                    item={item}
                    isSelected={selectedIndex === index}
                    onSelect={() => { item.perform(); onClose() }}
                    onHover={() => setSelectedIndex(index)}
                    copiedId={copiedId}
                    onCopy={handleCopy}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
