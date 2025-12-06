
import React, { useState, useEffect, useCallback, memo } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Code, FileText, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { SpotlightSearch } from "./spotlight-search"
import { cn } from "../lib/utils"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar"

const EnhancedHeader = memo(() => {
  const [activeItem, setActiveItem] = useState("home")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

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

  // Optimized Scroll Spy using Intersection Observer
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname === "/resume") setActiveItem("resume")
      return
    }

    const sections = ["home", "about", "skills", "projects", "contact"]
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Activates when section is roughly in the middle-top
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [pathname])

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
      
      if (href.startsWith("/#")) {
         const targetId = href.replace('/#', '');
         
         if (pathname === "/") {
            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
         } else {
            navigate({ pathname: "/", hash: targetId })
         }
      } else {
         navigate(href)
      }
    },
    [navigate, pathname]
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
              to="/"
              className="group relative flex items-center space-x-3 font-bold transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 rounded-lg px-1 -mx-1"
              aria-label="Go to homepage"
            >
              <div className="relative flex items-center justify-center">
                <Code className="relative z-10 h-8 w-8 text-purple-600 dark:text-purple-400 transition-transform duration-300 transform-gpu group-hover:scale-110 group-hover:-rotate-6" />
                <div className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-blue-600 group-hover:bg-clip-text">
                Ansh Shah
              </span>
            </Link>
          </NavbarLogo>

          <NavItems items={navigation} activeItem={activeItem} onItemClick={handleNavClick} />

          <div className="flex items-center gap-4">
            <button
              onClick={openSearch}
              className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-300 group hover:scale-110"
              title="Search (⌘K)"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300" />
            </button>
            <ThemeToggle />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
            <NavbarLogo>
              <Link to="/" className="flex items-center space-x-2 font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                  <Code className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  <span className="text-lg font-extrabold">Ansh Shah</span>
              </Link>
            </NavbarLogo>
            <div className="flex items-center gap-2">
              <button onClick={openSearch} className="p-2">
                <Search className="h-5 w-5" />
              </button>
              <ThemeToggle />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
            {navigation.map((item, idx) => (
              <button
                key={`mobile-link-${idx}`}
                onClick={() => handleNavClick(item.link, item.id)}
                className={cn(
                  "flex items-center gap-3 w-full text-left py-3 px-2 rounded-lg transition-all",
                  activeItem === item.id ? "bg-muted font-semibold" : "hover:bg-muted"
                )}
              >
                {item.icon && <span>{item.icon}</span>}
                <span className="text-lg">{item.name}</span>
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
