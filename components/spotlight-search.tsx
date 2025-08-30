"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Search,
  X,
  FileText,
  User,
  Code,
  Mail,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Award,
  Cpu,
  Database,
  Globe,
  Monitor,
  Terminal,
  Layers,
  Sun,
  Moon,
  Settings,
  Download,
  Copy,
  Share2,
  Github,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

interface SearchResult {
  id: string
  title: string
  description: string
  href?: string
  icon: React.ReactNode
  category: string
  keywords?: string[]
  action?: () => void
}

const searchData: SearchResult[] = [
  // Navigation
  {
    id: "home",
    title: "Home",
    description: "Welcome page and hero section",
    href: "/",
    icon: <User className="h-4 w-4" />,
    category: "Navigation",
    keywords: ["welcome", "hero", "main", "landing"],
  },
  {
    id: "about",
    title: "About",
    description: "Learn more about me and my background",
    href: "/#about",
    icon: <User className="h-4 w-4" />,
    category: "Navigation",
    keywords: [
      "background",
      "bio",
      "story",
      "experience",
      "full-stack",
      "developer",
      "passionate",
      "creative",
      "solutions",
    ],
  },
  {
    id: "skills",
    title: "Skills",
    description: "Technical skills and expertise",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Navigation",
    keywords: ["technical", "expertise", "technologies", "frameworks", "programming"],
  },
  {
    id: "projects",
    title: "Projects",
    description: "Portfolio of my work and projects",
    href: "/#projects",
    icon: <Lightbulb className="h-4 w-4" />,
    category: "Navigation",
    keywords: ["portfolio", "work", "showcase", "featured"],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with me",
    href: "/#contact",
    icon: <Mail className="h-4 w-4" />,
    category: "Navigation",
    keywords: ["get in touch", "email", "reach out", "connect"],
  },
  {
    id: "resume",
    title: "Resume",
    description: "View my professional resume",
    href: "/resume",
    icon: <FileText className="h-4 w-4" />,
    category: "Navigation",
    keywords: ["cv", "professional", "career", "education", "experience"],
  },

  // Projects
  {
    id: "resume-generator",
    title: "Resume Generator",
    description: "TypeScript, React, Tailwind CSS - Responsive resume builder",
    href: "/#projects",
    icon: <Briefcase className="h-4 w-4" />,
    category: "Projects",
    keywords: ["typescript", "react", "tailwind", "responsive", "builder", "professional", "resume.nowhile.com"],
  },
  {
    id: "p2p-file-transfer",
    title: "P2P File Transfer",
    description: "HTML, CSS, JavaScript - Peer-to-peer file sharing with chat",
    href: "/#projects",
    icon: <Briefcase className="h-4 w-4" />,
    category: "Projects",
    keywords: ["html", "css", "javascript", "peer-to-peer", "file sharing", "chat", "real-time", "file.nowhile.com"],
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "React, TypeScript, CSS - Versatile QR code creation tool",
    href: "/#projects",
    icon: <Briefcase className="h-4 w-4" />,
    category: "Projects",
    keywords: ["react", "typescript", "css", "qr code", "generator", "versatile", "qr.nowhile.com"],
  },

  // Skills - Frontend
  {
    id: "react",
    title: "React",
    description: "Frontend framework for building user interfaces",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Frontend Skills",
    keywords: ["frontend", "ui", "components", "jsx", "hooks", "state management"],
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "React framework for production applications",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Frontend Skills",
    keywords: ["react", "framework", "ssr", "static", "routing", "api routes"],
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Typed superset of JavaScript",
    href: "/#skills",
    icon: <Terminal className="h-5 w-5 text-gray-400 mr-3" />,
    category: "Frontend Skills",
    keywords: ["javascript", "typed", "static typing", "interfaces", "types"],
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Frontend Skills",
    keywords: ["css", "utility", "styling", "responsive", "design"],
  },
  {
    id: "framer-motion",
    title: "Framer Motion",
    description: "Animation library for React",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Frontend Skills",
    keywords: ["animation", "motion", "transitions", "gestures", "react"],
  },
  {
    id: "threejs",
    title: "Three.js",
    description: "3D graphics library for the web",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Frontend Skills",
    keywords: ["3d", "graphics", "webgl", "animation", "visualization"],
  },

  // Skills - Backend
  {
    id: "nodejs",
    title: "Node.js",
    description: "JavaScript runtime for server-side development",
    href: "/#skills",
    icon: <Terminal className="h-4 w-4" />,
    category: "Backend Skills",
    keywords: ["javascript", "server", "runtime", "backend", "api"],
  },
  {
    id: "express",
    title: "Express",
    description: "Web framework for Node.js",
    href: "/#skills",
    icon: <Terminal className="h-4 w-4" />,
    category: "Backend Skills",
    keywords: ["nodejs", "web framework", "api", "middleware", "routing"],
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    description: "Advanced open source relational database",
    href: "/#skills",
    icon: <Database className="h-4 w-4" />,
    category: "Backend Skills",
    keywords: ["database", "sql", "relational", "postgres", "data"],
  },
  {
    id: "mongodb",
    title: "MongoDB",
    description: "NoSQL document database",
    href: "/#skills",
    icon: <Database className="h-4 w-4" />,
    category: "Backend Skills",
    keywords: ["database", "nosql", "document", "json", "data"],
  },
  {
    id: "prisma",
    title: "Prisma",
    description: "Next-generation ORM for Node.js and TypeScript",
    href: "/#skills",
    icon: <Database className="h-4 w-4" />,
    category: "Backend Skills",
    keywords: ["orm", "database", "typescript", "schema", "migrations"],
  },
  {
    id: "graphql",
    title: "GraphQL",
    description: "Query language for APIs",
    href: "/#skills",
    icon: <Terminal className="h-4 w-4" />,
    category: "Backend Skills",
    keywords: ["api", "query language", "schema", "resolver", "data fetching"],
  },

  // Skills - DevOps & Cloud
  {
    id: "docker",
    title: "Docker",
    description: "Containerization platform",
    href: "/#skills",
    icon: <Monitor className="h-4 w-4" />,
    category: "DevOps Skills",
    keywords: ["containers", "deployment", "virtualization", "microservices"],
  },
  {
    id: "aws",
    title: "AWS",
    description: "Amazon Web Services cloud platform",
    href: "/#skills",
    icon: <Globe className="h-4 w-4" />,
    category: "DevOps Skills",
    keywords: ["cloud", "amazon", "ec2", "s3", "lambda", "infrastructure"],
  },
  {
    id: "vercel",
    title: "Vercel",
    description: "Frontend deployment platform",
    href: "/#skills",
    icon: <Globe className="h-4 w-4" />,
    category: "DevOps Skills",
    keywords: ["deployment", "hosting", "nextjs", "frontend", "serverless"],
  },
  {
    id: "kubernetes",
    title: "Kubernetes",
    description: "Container orchestration platform",
    href: "/#skills",
    icon: <Monitor className="h-4 w-4" />,
    category: "DevOps Skills",
    keywords: ["containers", "orchestration", "scaling", "deployment", "k8s"],
  },

  // Skills - Design & UX
  {
    id: "figma",
    title: "Figma",
    description: "Collaborative design tool",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Design Skills",
    keywords: ["design", "ui", "ux", "prototyping", "collaboration"],
  },
  {
    id: "adobe-xd",
    title: "Adobe XD",
    description: "User experience design software",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
    category: "Design Skills",
    keywords: ["design", "ui", "ux", "adobe", "prototyping"],
  },

  // Education & Experience
  {
    id: "education",
    title: "Computer Engineering - SVIT",
    description: "Bachelor's degree with 8.74 CGPA",
    href: "/resume",
    icon: <GraduationCap className="h-4 w-4" />,
    category: "Education",
    keywords: ["computer engineering", "svit", "bachelor", "degree", "cgpa", "vasad", "vadodara"],
  },
  {
    id: "mecia-hacks",
    title: "MECIA Hacks - Technical Head",
    description: "Leadership role in technical event management",
    href: "/resume",
    icon: <Award className="h-4 w-4" />,
    category: "Experience",
    keywords: ["technical head", "leadership", "event management", "qr code", "attendance"],
  },

  // Coursework
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Fundamental computer science concepts",
    href: "/resume",
    icon: <Layers className="h-4 w-4" />,
    category: "Coursework",
    keywords: ["algorithms", "programming", "computer science", "fundamentals"],
  },
  {
    id: "algorithms",
    title: "Algorithms Analysis",
    description: "Algorithm design and analysis",
    href: "/resume",
    icon: <Cpu className="h-4 w-4" />,
    category: "Coursework",
    keywords: ["algorithms", "analysis", "complexity", "optimization"],
  },
  {
    id: "dbms",
    title: "Database Management",
    description: "Database systems and management",
    href: "/resume",
    icon: <Database className="h-4 w-4" />,
    category: "Coursework",
    keywords: ["database", "sql", "management", "systems", "data"],
  },
  {
    id: "computer-networks",
    title: "Computer Networks",
    description: "Network protocols and architecture",
    href: "/resume",
    icon: <Globe className="h-4 w-4" />,
    category: "Coursework",
    keywords: ["networking", "protocols", "tcp", "ip", "architecture"],
  },

  // Actions
  {
    id: "theme-light",
    title: "Switch to Light Theme",
    description: "Change the website theme to light mode",
    icon: <Sun className="h-4 w-4" />,
    category: "Actions",
    keywords: ["light", "theme", "bright", "day"],
  },
  {
    id: "theme-dark",
    title: "Switch to Dark Theme",
    description: "Change the website theme to dark mode",
    icon: <Moon className="h-4 w-4" />,
    category: "Actions",
  },
  {
    id: "theme-system",
    title: "Use System Theme",
    description: "Follow your system's theme preference",
    icon: <Monitor className="h-4 w-4" />,
    category: "Actions",
    keywords: ["system", "theme", "auto", "default"],
  },
  {
    id: "copy-url",
    title: "Copy Current URL",
    description: "Copy the current page URL to clipboard",
    icon: <Copy className="h-4 w-4" />,
    category: "Actions",
    keywords: ["copy", "url", "link", "clipboard"],
  },
  {
    id: "share-page",
    title: "Share This Page",
    description: "Share the current page using Web Share API",
    icon: <Share2 className="h-4 w-4" />,
    category: "Actions",
    keywords: ["share", "social", "send"],
  },
  {
    id: "download-resume",
    title: "Download Resume",
    description: "Download my resume as JPG",
    icon: <Download className="h-4 w-4" />,
    category: "Actions",
    keywords: ["download", "resume", "jpg", "cv"],
  },
  {
    id: "scroll-to-top",
    title: "Scroll to Top",
    description: "Scroll to the top of the page",
    icon: <Settings className="h-4 w-4" />,
    category: "Actions",
    keywords: ["scroll", "top", "up", "beginning"],
  },
  {
    id: "copy-email",
    title: "Copy Email",
    description: "Copy my email to clipboard",
    icon: <Mail className="h-4 w-4" />,
    category: "Actions",
    keywords: ["email", "contact", "copy"],
  },
  {
    id: "open-github",
    title: "Open GitHub",
    description: "Open my GitHub profile in a new tab",
    icon: <Github className="h-4 w-4" />,
    category: "Actions",
    keywords: ["github", "code", "repository", "profile"],
  },
  {
    id: "scroll-projects",
    title: "Scroll to Projects",
    description: "Jump to the Projects section",
    icon: <Lightbulb className="h-4 w-4" />,
    category: "Actions",
    keywords: ["projects", "portfolio", "work", "scroll"],
  },
  {
    id: "toggle-theme",
    title: "Toggle Theme",
    description: "Switch between light and dark",
    icon: <Settings className="h-4 w-4" />,
    category: "Actions",
    keywords: ["theme", "toggle", "dark", "light"],
  },
]

// lightweight fuzzy scoring helper
function fuzzyScore(query: string, text: string) {
  // simple subsequence + proximity scoring; low-cost, no deps
  let qi = 0
  let score = 0
  const q = query.toLowerCase()
  const t = text.toLowerCase()

  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      score += 3
      // bonus for consecutive matches (proximity)
      if (i > 0 && qi > 0 && t[i - 1] === q[qi - 1]) score += 2
      qi++
    }
  }
  // reward prefix
  if (t.startsWith(q)) score += 10
  // small reward for inclusion to smooth ranking
  if (t.includes(q)) score += 5
  return score
}

function searchItems(query: string, setTheme: (theme: string) => void): SearchResult[] {
  if (!query.trim()) return searchData

  const q = query.toLowerCase()
  const terms = q.split(" ").filter(Boolean)

  return searchData
    .map((item) => {
      let score = 0
      const titleLower = item.title.toLowerCase()
      const descriptionLower = item.description.toLowerCase()
      const categoryLower = item.category.toLowerCase()
      const keywords = item.keywords || []

      // exacts and partials
      if (titleLower === q) score += 100
      if (titleLower.startsWith(q)) score += 50
      if (titleLower.includes(q)) score += 30
      if (descriptionLower.includes(q)) score += 20
      if (categoryLower.includes(q)) score += 15
      for (const kw of keywords) {
        const kl = kw.toLowerCase()
        if (kl.includes(q)) score += 10
      }

      // term-wise partials
      for (const term of terms) {
        if (titleLower.includes(term)) score += 6
        if (descriptionLower.includes(term)) score += 3
        for (const kw of keywords) {
          if (kw.toLowerCase().includes(term)) score += 2
        }
      }

      // fuzzy bonus
      score += fuzzyScore(q, titleLower)
      score += Math.min(10, Math.floor(fuzzyScore(q, descriptionLower) / 3))

      return { ...item, score }
    })
    .filter((item: any) => item.score > 0)
    .sort((a: any, b: any) => b.score - a.score)
}

export function SpotlightSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null) // used to detect outside clicks
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"suggestions" | "history">("suggestions")

  const saveRecent = useCallback((q: string) => {
    const query = q.trim()
    if (!query || query.length < 2) return
    try {
      const prev = JSON.parse(localStorage.getItem("recentSearches") || "[]") as string[]
      const next = [query, ...prev.filter((s) => s !== query)].slice(0, 5)
      localStorage.setItem("recentSearches", JSON.stringify(next))
      setRecentSearches(next)
    } catch {}
  }, [])

  const loadRecent = useCallback(() => {
    try {
      const arr = JSON.parse(localStorage.getItem("recentSearches") || "[]") as string[]
      setRecentSearches(Array.isArray(arr) ? arr.slice(0, 5) : [])
    } catch {
      setRecentSearches([])
    }
  }, [])

  const handleResultClick = useCallback(
    async (result: SearchResult, updateUrl = true) => {
      if (result.action) {
        result.action()
        return
      }

      // close immediately for responsiveness
      onClose()

      if (query.trim().length > 1) saveRecent(query)

      // theme actions
      if (result.id === "toggle-theme") {
        setTheme(theme === "dark" ? "light" : "dark")
        return
      }
      if (result.id === "theme-light") {
        setTheme("light")
        return
      }
      if (result.id === "theme-dark") {
        setTheme("dark")
        return
      }
      if (result.id === "theme-system") {
        setTheme("system")
        return
      }

      if (result.id === "copy-email") {
        try {
          await navigator.clipboard.writeText("theanshshah@gmail.com")
        } catch {}
        return
      }

      if (result.id === "open-github") {
        try {
          window.open("https://github.com/ansh", "_blank", "noopener,noreferrer")
        } catch {}
        return
      }

      if (result.id === "scroll-projects") {
        if (window.location.pathname !== "/") {
          router.push("/#projects")
        } else {
          const el = document.getElementById("projects")
          if (el) el.scrollIntoView({ behavior: "smooth" })
        }
        return
      }

      if (result.id === "copy-url") {
        try {
          await navigator.clipboard.writeText(window.location.href)
        } catch {}
        return
      }

      if (result.id === "share-page") {
        const sharePayload = {
          title: document.title || "Share",
          text: "Check out this page",
          url: window.location.href,
        }
        if ((navigator as any).share) {
          try {
            await (navigator as any).share(sharePayload)
          } catch {}
        } else {
          try {
            await navigator.clipboard.writeText(sharePayload.url)
          } catch {}
        }
        return
      }

      if (result.id === "download-resume") {
        const jpgPath = "/Ansh_Shah_Resume.jpg"
        try {
          const cached = typeof caches !== "undefined" ? await caches.match(jpgPath) : undefined
          const res = cached || (await fetch(jpgPath))
          if (!res || (res as Response).ok === false) throw new Error("Resume JPG not found")
          const blob = await (res as Response).blob()
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = "Ansh_Shah_Resume.jpg"
          document.body.appendChild(a)
          a.click()
          a.remove()
          URL.revokeObjectURL(url)
          return
        } catch {
          router.push("/resume")
          return
        }
      }

      if (result.id === "scroll-to-top") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      if (updateUrl) {
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete("q")
        window.history.replaceState({}, "", newUrl.toString())
      }

      if (result.href?.startsWith("/#")) {
        if (window.location.pathname !== "/") {
          router.push(result.href)
        } else {
          const element = document.getElementById(result.href.substring(2))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      } else if (result.href) {
        router.push(result.href)
      }
    },
    [onClose, router, setTheme, theme, query, saveRecent],
  )

  useEffect(() => {
    if (isOpen) {
      loadRecent()
      try {
        const path = "/Ansh_Shah_Resume.jpg"
        fetch(path, { cache: "force-cache" }).catch(() => {})
        if (typeof caches !== "undefined") {
          caches
            .open("resume-cache-v1")
            .then((cache) => cache.add(path))
            .catch(() => {})
        }
      } catch {}

      let urlQuery = ""
      try {
        urlQuery = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
      } catch {}

      if (urlQuery) {
        setQuery(urlQuery)
        setFilteredResults(searchItems(urlQuery, setTheme))
      } else {
        setQuery("")
        setFilteredResults(searchData)
      }
      setSelectedIndex(0)
      setActiveTab("suggestions")
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = setTimeout(() => {
      if (!query.trim()) {
        setFilteredResults(searchData)
        setSelectedIndex(0)
      } else {
        const results = searchItems(query, setTheme)
        setFilteredResults(results)
        setSelectedIndex(0)
      }
    }, 150) // slightly longer debounce for stability
    return () => clearTimeout(id)
  }, [query, recentSearches]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          if (filteredResults.length === 0) return
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredResults.length)
          break
        case "ArrowUp":
          if (filteredResults.length === 0) return
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length)
          break
        case "Enter":
          e.preventDefault()
          if (filteredResults[selectedIndex]) {
            handleResultClick(filteredResults[selectedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredResults, selectedIndex, handleResultClick, onClose])

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!isOpen) return
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
      <div className="flex items-start justify-center pt-[10vh] px-4">
        {/* attach ref to container and make it responsive */}
        <div
          ref={containerRef}
          className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="h-5 w-5 text-gray-400 mr-2 sm:mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search projects, skills, experience..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-base sm:text-lg outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
              aria-label="Search"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <div role="tablist" aria-label="Search sections" className="flex items-center gap-2">
              <button
                role="tab"
                aria-selected={activeTab === "suggestions"}
                onClick={() => setActiveTab("suggestions")}
                className={`px-3 py-2 text-xs sm:text-sm rounded-md transition-colors ${
                  activeTab === "suggestions"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                Suggestions
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "history"}
                onClick={() => setActiveTab("history")}
                className={`px-3 py-2 text-xs sm:text-sm rounded-md transition-colors ${
                  activeTab === "history"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                History
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto" role="tabpanel" aria-labelledby={activeTab}>
            {activeTab === "history" ? (
              <div className="py-2">
                {recentSearches.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No recent searches</div>
                ) : (
                  recentSearches.map((s, i) => (
                    <button
                      key={`history-${i}-${s}`}
                      onClick={() => {
                        setQuery(s)
                        const results = searchItems(s, setTheme)
                        setActiveTab("suggestions")
                        setFilteredResults(results)
                        setSelectedIndex(0)
                      }}
                      className="w-full px-4 sm:px-6 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex-shrink-0 text-gray-400">
                        <Search className="h-4 w-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{s}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Recent search</div>
                      </div>
                      <div className="text-[10px] sm:text-xs px-2 py-1 rounded text-white bg-gray-500">History</div>
                    </button>
                  ))
                )}
              </div>
            ) : (
              <div className="py-1 sm:py-2">
                {filteredResults.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full px-4 sm:px-6 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      index === selectedIndex ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                    aria-selected={index === selectedIndex}
                    role="option"
                  >
                    <div className="flex-shrink-0 text-gray-400">{result.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{result.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{result.description}</div>
                    </div>
                    <div
                      className={`text-[10px] sm:text-xs px-2 py-1 rounded text-white ${
                        result.category === "Actions"
                          ? "bg-indigo-500"
                          : result.category === "Navigation"
                            ? "bg-blue-500"
                            : result.category === "Projects"
                              ? "bg-purple-500"
                              : result.category.includes("Skills")
                                ? "bg-green-500"
                                : result.category === "Education"
                                  ? "bg-orange-500"
                                  : result.category === "Experience"
                                    ? "bg-red-500"
                                    : result.category === "Coursework"
                                      ? "bg-cyan-500"
                                      : "bg-gray-500"
                      }`}
                    >
                      {result.category}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    ↵
                  </kbd>
                  <span>Select</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">
                  esc
                </kbd>
                <span>Close</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpotlightSearch
