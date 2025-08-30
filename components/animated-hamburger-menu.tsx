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
      <Button
        variant="ghost"
        size="icon"
        className={`md:hidden relative z-50 w-10 h-10 p-0 rounded-lg transition-all duration-300 ${
          isOpen ? "bg-foreground text-background" : "hover:bg-muted"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-5 h-5 flex flex-col justify-center items-center">
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
            }`}
          />
        </div>
      </Button>

      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-auto max-h-screen w-64 max-w-[80vw] z-40 md:hidden transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-lg">Menu</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-8 h-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
