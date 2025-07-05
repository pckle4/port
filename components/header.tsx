"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Code, FileText, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { gsap } from "gsap"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const underlineRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Hand-drawn underline animation
    if (underlineRef.current) {
      gsap.set(underlineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        opacity: 0,
      })

      const tl = gsap.timeline({ delay: 2 })
      tl.to(underlineRef.current, {
        opacity: 1,
        duration: 0.3,
      })
        .to(underlineRef.current, {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(underlineRef.current, {
          scaleY: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        })
    }
  }, [])

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "Resume", href: "/resume" },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`header fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "header-scrolled bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link
              ref={logoRef}
              href="#home"
              onClick={() => handleNavClick("#home")}
              className="brand-logo relative flex items-center space-x-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform group z-10"
            >
              <div className="relative">
                <Code className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 group-hover:rotate-12 transition-transform drop-shadow-lg" />
                <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
              <div className="relative">
                <span className="font-extrabold tracking-tight drop-shadow-sm">Ansh Shah</span>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground/80 -mt-1">
                  Craving For Crafting !!
                </div>
                {/* Hand-drawn underline */}
                <div
                  ref={underlineRef}
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-full opacity-0"
                  style={{
                    background: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #8b5cf6 100%)",
                    filter: "url(#roughPaper)",
                    transform: "rotate(-1deg)",
                  }}
                />
                {/* SVG Filter for hand-drawn effect */}
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <filter id="roughPaper">
                      <feTurbulence baseFrequency="0.04" numOctaves="5" result="noise" seed="1" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="nav-link text-foreground/80 hover:text-foreground transition-colors duration-200 relative group flex items-center space-x-1"
              >
                {item.name === "Resume" && <FileText className="h-4 w-4" />}
                <span>{item.name}</span>
                <span className="nav-link-underline absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors duration-200 py-2"
                >
                  {item.name === "Resume" && <FileText className="h-4 w-4" />}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
