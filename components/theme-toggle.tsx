
import React, { useState, useEffect, useRef } from "react"
import { Moon, Sun, Monitor, ChevronDown, Check } from "lucide-react"
import { useTheme } from "./theme-provider"
import { cn } from "../lib/utils"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ]

  const activeTheme = themes.find((t) => t.name === theme) || themes[2]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-all duration-300 backdrop-blur-sm group"
        aria-label="Toggle theme"
      >
        <activeTheme.icon className="w-4 h-4 text-foreground transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-1 rounded-xl bg-popover border border-border shadow-lg shadow-black/5 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right flex flex-row gap-1">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t.name as "light" | "dark" | "system")
                setIsOpen(false)
              }}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                theme === t.name 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={t.label}
            >
              <t.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
