"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setTheme(newTheme)

    // Add ultra smooth transition
    document.documentElement.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"

    setTimeout(() => {
      document.documentElement.style.transition = ""
    }, 500)
  }

  if (!mounted) {
    return (
      <div className="w-14 h-7 bg-gray-200 rounded-full relative">
        <div className="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        isDark ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`theme-toggle-slider absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-500 ease-in-out flex items-center justify-center ${
          isDark ? "translate-x-7" : "translate-x-0.5"
        }`}
      >
        {isDark ? <Moon className="h-3 w-3 text-purple-600" /> : <Sun className="h-3 w-3 text-yellow-500" />}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
