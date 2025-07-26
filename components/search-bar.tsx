"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, ExternalLink, User, Code, Briefcase, Mail, FileText, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "section" | "project" | "skill" | "contact"
  href: string
  icon: React.ReactNode
}

const searchData: SearchResult[] = [
  {
    id: "home",
    title: "Home",
    description: "Welcome to my portfolio - Full Stack Developer",
    type: "section",
    href: "/",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "about",
    title: "About Me",
    description: "Learn more about my background and experience",
    type: "section",
    href: "/#about",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "skills",
    title: "Skills & Technologies",
    description: "My technical expertise and tools I work with",
    type: "section",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "projects",
    title: "Projects",
    description: "Showcase of my recent work and personal projects",
    type: "section",
    href: "/#projects",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch for collaborations and opportunities",
    type: "section",
    href: "/#contact",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: "resume",
    title: "Resume",
    description: "Download my complete resume and CV",
    type: "section",
    href: "/resume",
    icon: <FileText className="h-4 w-4" />,
  },
  // Projects
  {
    id: "resume-generator",
    title: "Resume Generator",
    description: "A responsive resume generator web application using React, TypeScript, and Tailwind CSS",
    type: "project",
    href: "https://nowhil.vercel.app",
    icon: <ExternalLink className="h-4 w-4" />,
  },
  {
    id: "p2p-file-transfer",
    title: "P2P File Transfer",
    description: "Peer-to-peer file transfer application with real-time chat functionality",
    type: "project",
    href: "https://nowhile.com/file",
    icon: <ExternalLink className="h-4 w-4" />,
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Versatile QR code generator supporting multiple data types and formats",
    type: "project",
    href: "https://qile.vercel.app",
    icon: <ExternalLink className="h-4 w-4" />,
  },
  // Skills
  {
    id: "react",
    title: "React",
    description: "Frontend library for building user interfaces",
    type: "skill",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Typed superset of JavaScript for better development experience",
    type: "skill",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "React framework for production-ready applications",
    type: "skill",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    type: "skill",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "nodejs",
    title: "Node.js",
    description: "JavaScript runtime for server-side development",
    type: "skill",
    href: "/#skills",
    icon: <Code className="h-4 w-4" />,
  },
  // Contact info
  {
    id: "email",
    title: "Email",
    description: "theanshshah@gmail.com - Send me a message",
    type: "contact",
    href: "mailto:theanshshah@gmail.com",
    icon: <Mail className="h-4 w-4" />,
  },
]

interface SearchBarProps {
  onClose: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      setSelectedIndex(-1)
      return
    }

    const filteredResults = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    )

    setResults(filteredResults.slice(0, 6)) // Reduced to 6 results for compact design
    setSelectedIndex(-1)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      handleResultClick(results[selectedIndex])
    }
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "project") {
      window.open(result.href, "_blank")
    } else if (result.href.startsWith("/#")) {
      // Navigate to home page section
      window.location.href = result.href
    } else {
      window.location.href = result.href
    }
    onClose()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "section":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
      case "project":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
      case "skill":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
      case "contact":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
    }
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl">
      <CardContent className="p-0">
        {/* Dark Mode Compatible Search Input */}
        <div className="relative p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <Search className="absolute left-5 sm:left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search projects, skills, sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 sm:pl-12 pr-4 h-10 sm:h-12 text-sm sm:text-base border-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 focus:border-0 rounded-xl"
          />
        </div>

        {/* Dark Mode Compatible Search Results */}
        {results.length > 0 && (
          <div className="max-h-64 sm:max-h-80 overflow-y-auto bg-white dark:bg-gray-900">
            {results.map((result, index) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result)}
                className={`flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 border-b border-gray-50 dark:border-gray-800 last:border-b-0 ${
                  selectedIndex === index ? "bg-purple-50 dark:bg-purple-900/20" : ""
                }`}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
                      <div className="text-purple-600 dark:text-purple-400">{result.icon}</div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                        {result.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(result.type)} hidden sm:inline-block`}
                      >
                        {result.type}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dark Mode Compatible No Results */}
        {query.trim() !== "" && results.length === 0 && (
          <div className="p-4 sm:p-6 text-center bg-white dark:bg-gray-900">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-2">
              No results found
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Try searching for "projects", "skills", "contact", or specific technologies
            </p>
          </div>
        )}

        {/* Dark Mode Compatible Search Tips */}
        {query.trim() === "" && (
          <div className="p-4 sm:p-6 bg-white dark:bg-gray-900">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              Quick Search
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["Projects", "Skills", "About", "Contact"].map((tip) => (
                <button
                  key={tip}
                  onClick={() => setQuery(tip.toLowerCase())}
                  className="p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {tip}
                </button>
              ))}
            </div>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Use{" "}
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                  ↑↓
                </kbd>{" "}
                to navigate,{" "}
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                  Enter
                </kbd>{" "}
                to select,{" "}
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                  Esc
                </kbd>{" "}
                to close
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
