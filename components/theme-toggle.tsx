"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }

    document.documentElement.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"

    setTimeout(() => {
      document.documentElement.style.transition = ""
    }, 500)
  }

  if (!mounted) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <Sun className="h-4 w-4 text-gray-400" />
      </div>
    )
  }

  const getIcon = () => {
    if (theme === "light") {
      return <Sun className="h-4 w-4 text-yellow-500" />
    } else if (theme === "dark") {
      return <Moon className="h-4 w-4 text-blue-400" />
    } else {
      return <Monitor className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center"
      title={`Current theme: ${theme}. Click to cycle through themes.`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme (current: {theme})</span>
    </button>
  )
}
