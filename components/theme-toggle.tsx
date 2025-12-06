
import React from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

declare global {
  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      ready: Promise<void>
      finished: Promise<void>
      updateCallbackDone: Promise<void>
    }
  }
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "light" ? "dark" : "light"

    // Fallback for browsers without View Transition API
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    const x = e.clientX
    const y = e.clientY

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })

    await transition.ready

    // Smoother cubic-bezier easing
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Smoother ease-out
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full w-10 h-10 hover:bg-muted/50 transition-all duration-300 overflow-hidden group border border-transparent hover:border-border"
      title="Toggle Theme"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon (Light Mode) */}
        <Sun 
            className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-500 ease-spring-gentle dark:-rotate-90 dark:scale-0 text-amber-500 fill-amber-500/20" 
        />
        {/* Moon Icon (Dark Mode) */}
        <Moon 
            className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 ease-spring-gentle dark:rotate-0 dark:scale-100 text-blue-400 fill-blue-400/20" 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
      
      {/* Subtle ring effect on hover */}
      <div className="absolute inset-0 rounded-full ring-2 ring-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
    </Button>
  )
}
