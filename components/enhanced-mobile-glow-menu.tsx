"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Code2, Briefcase, Mail, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EnhancedMobileGlowMenu() {
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
    if (pathname === "/resume") {
      setActiveSection("resume")
    } else if (pathname === "/") {
      setActiveSection("home")
    }
  }, [pathname])

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
      window.location.href = href
    } else {
      window.location.href = href
    }
  }

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`md:hidden w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-full transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white"
            : "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-3 h-3 sm:w-4 sm:h-4 flex flex-col justify-center items-center">
          <span
            className={`block h-0.5 w-3 sm:w-4 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-0.5 bg-white" : "-translate-y-0.5 bg-gray-700 dark:bg-gray-300"
            }`}
          />
          <span
            className={`block h-0.5 w-3 sm:w-4 transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100 bg-gray-700 dark:bg-gray-300"
            }`}
          />
          <span
            className={`block h-0.5 w-3 sm:w-4 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-0.5 bg-white" : "translate-y-0.5 bg-gray-700 dark:bg-gray-300"
            }`}
          />
        </div>
      </Button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 sm:w-72 z-40 md:hidden transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-cyan-50/50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20" />

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-sm sm:text-base bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Menu
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-6 h-6 sm:w-8 sm:h-8">
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 sm:p-4">
            <div className="space-y-1 sm:space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-semibold text-sm sm:text-base">{item.label}</span>
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
