"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, User, Code2, Briefcase, Mail, FileText } from "lucide-react"

export function MobileNavigation() {
  const [activeSection, setActiveSection] = useState("home")

  const navigationItems = [
    { id: "home", icon: Home, href: "#home", label: "Home" },
    { id: "about", icon: User, href: "#about", label: "About" },
    { id: "skills", icon: Code2, href: "#skills", label: "Skills" },
    { id: "projects", icon: Briefcase, href: "#projects", label: "Projects" },
    { id: "contact", icon: Mail, href: "#contact", label: "Contact" },
    { id: "resume", icon: FileText, href: "/resume", label: "Resume" },
  ]

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id)
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <div className="bg-background/90 backdrop-blur-2xl border border-border/20 rounded-full px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-center gap-4">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`relative p-3 rounded-full transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/30 hover:scale-105"
                }`}
                title={item.label}
              >
                <Icon
                  className={`h-6 w-6 transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                  strokeWidth={2.5}
                />

                {/* Active indicator */}
                {isActive && (
                  <>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse"></div>
                  </>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )
          })}
        </div>

        {/* Navigation background glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-cyan-600/5 -z-10"></div>
      </div>
    </nav>
  )
}
