"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Code2, Briefcase, Mail, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AnimatedHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()

  const navigationItems = [
    { id: "home", icon: Home, href: "/", label: "Home" },
    { id: "about", icon: User, href: "/#about", label: "About" },
    { id: "skills", icon: Code2, href: "/#skills", label: "Skills" },
    { id: "projects", icon: Briefcase, href: "/#projects", label: "Projects" },
    { id: "contact", icon: Mail, href: "/#contact", label: "Contact" },
    { id: "resume", icon: FileText, href: "/resume", label: "Resume" },
  ]

  useEffect(() => {
    // Set active section based on current route
    if (pathname === "/resume") {
      setActiveSection("resume")
    } else if (pathname === "/") {
      setActiveSection("home")
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      // Only update active section on home page
      if (pathname === "/" && !isOpen) {
        const sections = ["home", "about", "skills", "projects", "contact"]
        const scrollPosition = window.scrollY + 100

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const offsetTop = element.offsetTop
            const offsetHeight = element.offsetHeight

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname, isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id)
    setIsOpen(false)

    if (href.startsWith("/#")) {
      // Navigate to home page section
      if (pathname !== "/") {
        window.location.href = href
      } else {
        setTimeout(() => {
          const element = document.getElementById(href.substring(2))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 300)
      }
    }
  }

  return (
    <>
      {/* Glowing Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`md:hidden relative z-50 w-12 h-12 p-0 rounded-full transition-all duration-300 overflow-hidden ${
          isOpen
            ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg"
            : "hover:bg-gradient-to-r hover:from-purple-600/20 hover:via-blue-600/20 hover:to-cyan-600/20"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Glowing background */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-100"
              : "bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-cyan-600/50 opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* Outer glow */}
        <div
          className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-purple-600/60 via-blue-600/60 to-cyan-600/60 opacity-100 scale-110 animate-pulse"
              : "bg-gradient-to-r from-purple-600/40 via-blue-600/40 to-cyan-600/40 opacity-0"
          }`}
        />

        {/* Hamburger lines with glow */}
        <div className="w-6 h-6 flex flex-col justify-center items-center relative z-10">
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ease-out ${
              isOpen
                ? "rotate-45 translate-y-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "-translate-y-1 bg-current"
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ease-out ${
              isOpen ? "opacity-0" : "opacity-100 bg-current"
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ease-out ${
              isOpen
                ? "-rotate-45 -translate-y-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "translate-y-1 bg-current"
            }`}
          />
        </div>

        {/* Sparkle effects when open */}
        {isOpen && (
          <>
            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping opacity-75" />
            <div
              className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}
      </Button>

      {/* Glowing Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Enhanced Mobile Menu with Glow */}
      <div
        className={`fixed top-0 right-0 h-auto max-h-screen w-72 max-w-[85vw] z-40 md:hidden transition-all duration-300 ease-out rounded-bl-3xl overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10" />
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-xl" />

        {/* Menu content */}
        <div className="relative z-10">
          {/* Glowing Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20">
            <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Navigation
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-purple-600/20 hover:via-blue-600/20 hover:to-cyan-600/20 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Glowing Navigation Items */}
          <nav className="p-6">
            <div className="space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-purple-600/10 hover:via-blue-600/10 hover:to-cyan-600/10"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? "slideInRight 0.3s ease-out forwards" : "none",
                    }}
                  >
                    {/* Glowing background for active item */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-100" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-cyan-600/50 blur-lg animate-pulse" />
                      </>
                    )}

                    {/* Icon with glow */}
                    <Icon
                      className={`h-5 w-5 transition-all duration-300 relative z-10 ${
                        isActive
                          ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "group-hover:scale-110 group-hover:text-purple-600"
                      }`}
                    />

                    {/* Label */}
                    <span className="font-semibold relative z-10 text-base">{item.label}</span>

                    {/* Active indicator with glow */}
                    {isActive && (
                      <>
                        <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-75" />
                        <div
                          className="absolute bottom-2 right-6 w-1 h-1 bg-white rounded-full animate-ping opacity-75"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </>
                    )}

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Bottom glow accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-50" />
      </div>
    </>
  )
}
