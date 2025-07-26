"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code, FileText, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { EnhancedMobileGlowMenu } from "@/components/enhanced-mobile-glow-menu"
import { GlowMenu } from "@/components/glow-menu"
import { EnhancedSearchBar } from "@/components/enhanced-search-bar"

export function EnhancedHeader() {
  const [activeItem, setActiveItem] = useState("home")
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/resume") {
      setActiveItem("resume")
    } else if (pathname === "/") {
      setActiveItem("home")
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        const sections = ["home", "about", "skills", "projects", "contact"]
        // Fixed mobile gap to 8px (134px total: 120px header + 14px gap)
        const scrollPosition = window.scrollY + (window.innerWidth < 768 ? 128 : 134)

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const offsetTop = element.offsetTop
            const offsetHeight = element.offsetHeight

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              if (activeItem !== section) {
                setActiveItem(section)
              }
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeItem, pathname])

  const navigation = [
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Contact", href: "/#contact", id: "contact" },
    { name: "Resume", href: "/resume", id: "resume", icon: <FileText className="h-4 w-4" /> },
  ]

  const handleNavClick = (href: string, id: string) => {
    setActiveItem(id)

    if (href.startsWith("/#")) {
      if (pathname !== "/") {
        window.location.href = href
      } else {
        const element = document.getElementById(href.substring(2))
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else if (href === "/") {
      window.location.href = href
    }
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg py-1 sm:py-2 md:py-3">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 font-bold hover:scale-105 transition-all duration-300 group"
            >
              <Code className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-all duration-300" />
              <div>
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Ansh Shah
                </span>
                <div className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 -mt-1">
                  Craving For Crafting !!
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <GlowMenu items={navigation} activeItem={activeItem} onItemClick={handleNavClick} />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowSearch(true)}
                className="p-1 sm:p-1.5 md:p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300"
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
              </button>
              <ThemeToggle />
              <EnhancedMobileGlowMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4"
          onClick={() => setShowSearch(false)}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <EnhancedSearchBar onClose={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </>
  )
}
