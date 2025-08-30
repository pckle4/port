"use client"

import { useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  children: ReactNode
  className?: string
}

export function Navbar({ children, className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border-b border-gray-200/10 dark:border-gray-800/10",
        className,
      )}
    >
      {children}
    </nav>
  )
}

interface NavBodyProps {
  children: ReactNode
  className?: string
}

export function NavBody({ children, className }: NavBodyProps) {
  return <div className={cn("hidden lg:flex items-center justify-between px-6 py-4", className)}>{children}</div>
}

interface NavItem {
  name: string
  link: string
  icon?: ReactNode
}

interface NavItemsProps {
  items: NavItem[]
  className?: string
  activeItem?: string
  onItemClick?: (href: string, id: string) => void
}

export function NavItems({ items, className, activeItem, onItemClick }: NavItemsProps) {
  return (
    <div className={cn("flex items-center space-x-8", className)}>
      {items.map((item, idx) => (
        <button
          key={`nav-item-${idx}`}
          onClick={() => onItemClick?.(item.link, item.name.toLowerCase())}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
            "hover:text-purple-600 dark:hover:text-purple-400 hover:scale-105 hover:shadow-md hover:shadow-purple-500/20",
            "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-purple-500/10 before:to-blue-500/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
            activeItem === item.name.toLowerCase()
              ? "text-purple-600 dark:text-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-md shadow-purple-500/10"
              : "text-gray-700 dark:text-gray-300",
          )}
        >
          <span className="flex items-center gap-2 relative z-10 group-hover:scale-105 transition-transform duration-300">
            {item.icon && <span className="group-hover:rotate-12 transition-transform duration-300">{item.icon}</span>}
            {item.name}
          </span>
        </button>
      ))}
    </div>
  )
}

interface MobileNavProps {
  children: ReactNode
  className?: string
}

export function MobileNav({ children, className }: MobileNavProps) {
  return <div className={cn("lg:hidden", className)}>{children}</div>
}

interface NavbarLogoProps {
  className?: string
  children?: ReactNode
}

export function NavbarLogo({ className, children }: NavbarLogoProps) {
  return <div className={cn("flex items-center", className)}>{children}</div>
}

interface NavbarButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary"
  className?: string
  onClick?: () => void
}

export function NavbarButton({ children, variant = "primary", className, onClick }: NavbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all duration-300",
        variant === "primary"
          ? "bg-purple-600 hover:bg-purple-700 text-white"
          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100",
        className,
      )}
    >
      {children}
    </button>
  )
}

interface MobileNavHeaderProps {
  children: ReactNode
  className?: string
}

export function MobileNavHeader({ children, className }: MobileNavHeaderProps) {
  return <div className={cn("flex items-center justify-between px-4 py-4", className)}>{children}</div>
}

interface MobileNavToggleProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function MobileNavToggle({ isOpen, onClick, className }: MobileNavToggleProps) {
  return (
    <button
      onClick={onClick}
      className={cn("p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", className)}
    >
      {isOpen ? (
        <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      ) : (
        <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
}

interface MobileNavMenuProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function MobileNavMenu({ children, isOpen, onClose, className }: MobileNavMenuProps) {
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

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed top-[73px] left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 z-50",
          "max-h-[calc(100vh-73px)] overflow-y-auto shadow-xl shadow-black/10 dark:shadow-black/30",
          "animate-in slide-in-from-top-2 duration-300",
          className,
        )}
      >
        <div className="px-4 py-6 space-y-4">{children}</div>
      </div>
    </>
  )
}
