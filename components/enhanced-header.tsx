
import React, { useState, useEffect, useCallback, memo, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FileText, Search, Home, User, Wrench, Folder, MessageCircle } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn, smoothScrollToElement } from "../lib/utils"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarContext,
} from "./ui/resizable-navbar"

const AdaptiveLogo = () => {
  const { isScrolled } = useContext(NavbarContext)

  return (
    <div className={cn(
      "transition-all duration-300",
      isScrolled ? "" : "relative w-12 h-12 flex items-center justify-center"
    )}>
      <img 
        src="/images/logoo%20light.png" 
        alt="Ansh Shah Logo" 
        className={cn(
          "object-contain rounded-xl transition-all duration-300 drop-shadow-2xl z-50 pointer-events-none",
          isScrolled 
            ? "h-12 w-auto group-hover:scale-105" 
            : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 max-w-none group-hover:scale-110"
        )}
        loading="eager"
      />
    </div>
  )
}

const SpotlightSearch = React.lazy(() => import("./spotlight-search").then(module => ({ default: module.SpotlightSearch })))

const EnhancedHeader = memo(() => {
  const [activeItem, setActiveItem] = useState("home")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      e.stopPropagation()
      setIsSearchOpen(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (pathname !== "/") {
      if (pathname === "/resume") setActiveItem("resume")
      return
    }

    const sections = ["home", "about", "skills", "projects", "contact"]
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
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
    { name: "Home", link: "/", id: "home", icon: <Home className="h-4 w-4" /> },
    { name: "About", link: "/#about", id: "about", icon: <User className="h-4 w-4" /> },
    { name: "Skills", link: "/#skills", id: "skills", icon: <Wrench className="h-4 w-4" /> },
    { name: "Projects", link: "/#projects", id: "projects", icon: <Folder className="h-4 w-4" /> },
    { name: "Contact", link: "/#contact", id: "contact", icon: <MessageCircle className="h-4 w-4" /> },
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
             smoothScrollToElement(element)
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
              className="group relative flex items-center gap-2.5 font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/60 rounded-lg px-1 -mx-1"
              aria-label="Go to homepage"
            >
              <AdaptiveLogo />
            </Link>
          </NavbarLogo>

          <NavItems items={navigation} activeItem={activeItem} onItemClick={handleNavClick} />

          <div className="flex items-center gap-4">
            <button
              onClick={openSearch}
              className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-300 group hover:scale-110"
              title="Search (⌘K)"
              aria-label="Open search (⌘K)"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-[#cc8b86] dark:group-hover:text-[#a6808c] transition-all duration-300" />
            </button>
            <ThemeToggle />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
            <NavbarLogo>
              <Link to="/" className="flex items-center font-bold group" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="text-base font-black tracking-widest text-black dark:text-white">
                    NOWHILE
                  </span>
              </Link>
            </NavbarLogo>
            <div className="flex items-center gap-2">
              <button onClick={openSearch} className="p-2" aria-label="Open search">
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

      {isSearchOpen && (
        <React.Suspense fallback={null}>
          <SpotlightSearch isOpen={isSearchOpen} onClose={closeSearch} />
        </React.Suspense>
      )}
    </>
  )
})

EnhancedHeader.displayName = "EnhancedHeader"

export { EnhancedHeader }
