"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code, FileText, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SpotlightSearch } from "@/components/spotlight-search"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"

const EnhancedHeader = memo(() => {
  const [activeItem, setActiveItem] = useState("home")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setIsSearchOpen(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (pathname === "/resume") {
      setActiveItem("resume")
    } else if (pathname === "/") {
      setActiveItem("home")
    }
  }, [pathname])

  const handleScroll = useCallback(() => {
    if (pathname === "/") {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 134

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveItem(section)
            break
          }
        }
      }
    }
  }, [pathname])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const navigation = [
    { name: "Home", link: "/", id: "home" },
    { name: "About", link: "/#about", id: "about" },
    { name: "Skills", link: "/#skills", id: "skills" },
    { name: "Projects", link: "/#projects", id: "projects" },
    { name: "Contact", link: "/#contact", id: "contact" },
    { name: "Resume", link: "/resume", id: "resume", icon: <FileText className="h-4 w-4" /> },
  ]

  const handleNavClick = useCallback(
    (href: string, id: string) => {
      setActiveItem(id)
      setIsMobileMenuOpen(false)

      if (href === "/resume") {
        window.location.href = href
      } else if (href.startsWith("/#")) {
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
    },
    [pathname],
  )

  const openSearch = useCallback(() => setIsSearchOpen(true), [])
  const closeSearch = useCallback(() => setIsSearchOpen(false), [])
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), [])
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <>
      <Navbar>
        <NavBody>
          <NavbarLogo>
            <Link
              href="/"
              className="group relative flex items-center space-x-3 font-bold transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 rounded-lg px-1 -mx-1 motion-reduce:transform-none motion-reduce:transition-none"
              aria-label="Go to homepage"
            >
              <div className="relative flex items-center justify-center">
                {/* Icon */}
                <Code className="relative z-10 h-8 w-8 text-purple-600 dark:text-purple-400 transition-transform duration-300 transform-gpu group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transform-none" />
                {/* Soft glow ring (only on hover) */}
                <div className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                {/* Inner subtle highlight (only on hover) */}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-blue-500/40 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              {/* Wordmark */}
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-blue-600 group-hover:bg-clip-text">
                Ansh Shah
              </span>
            </Link>
          </NavbarLogo>

          <NavItems items={navigation} activeItem={activeItem} onItemClick={handleNavClick} />

          <div className="flex items-center gap-4">
            <button
              onClick={openSearch}
              className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
              title="Search (⌘K)"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300 group-hover:scale-110" />
            </button>
            <ThemeToggle />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

            <NavbarLogo>
              <Link
                href="/"
                className="group relative flex items-center space-x-2 font-bold transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 rounded-lg px-1 -mx-1 motion-reduce:transform-none motion-reduce:transition-none"
                aria-label="Go to homepage"
              >
                <div className="relative flex items-center justify-center">
                  <Code className="relative z-10 h-7 w-7 text-purple-600 dark:text-purple-400 transition-transform duration-300 transform-gpu group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transform-none" />
                  <div className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-blue-500/40 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                <span className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-blue-600 group-hover:bg-clip-text">
                  Ansh Shah
                </span>
              </Link>
            </NavbarLogo>

            <div className="flex items-center gap-2">
              <button
                onClick={openSearch}
                className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-300 group hover:scale-110"
                title="Search (⌘K)"
              >
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300 group-hover:scale-110" />
              </button>
              <ThemeToggle />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
            {navigation.map((item, idx) => (
              <button
                key={`mobile-link-${idx}`}
                onClick={() => handleNavClick(item.link, item.id)}
                className="flex items-center gap-3 w-full text-left py-3 px-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 group hover:scale-105 hover:shadow-md"
              >
                {item.icon && (
                  <span className="group-hover:rotate-12 transition-transform duration-300">{item.icon}</span>
                )}
                <span className="text-lg font-medium">{item.name}</span>
              </button>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <SpotlightSearch isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  )
})

EnhancedHeader.displayName = "EnhancedHeader"

export { EnhancedHeader }
