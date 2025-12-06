
import React, { useRef } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

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
  const isTransitioning = useRef(false)

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent double clicks during transition
    if (isTransitioning.current) return
    
    const newTheme = theme === "light" ? "dark" : "light"
    const button = e.currentTarget
    
    // Fallback for browsers without View Transition API or if prefers-reduced-motion
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!document.startViewTransition || isReducedMotion) {
      setTheme(newTheme)
      return
    }

    isTransitioning.current = true

    // Get exact center of the button for the ripple origin
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    // Calculate distance to furthest corner
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

    // Animate the clip-path
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500, // Snappier duration for mobile
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Smooth exponential ease-out
        pseudoElement: "::view-transition-new(root)",
      }
    )
    
    // Cleanup
    transition.finished.finally(() => {
        isTransitioning.current = false
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full w-10 h-10 transition-all duration-300 overflow-hidden group",
        "border border-transparent hover:border-border",
        // Mobile optimization: Use active state for better touch feedback
        "active:scale-95",
        // Mobile optimization: Prevent sticky hover states on touch devices
        "hover:bg-muted/50 data-[state=open]:bg-muted/50"
      )}
      title="Toggle Theme"
      aria-label="Toggle theme"
    >
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {/* Sun Icon (Light Mode) */}
        <Sun 
            style={{ width: '1.25rem', height: '1.25rem' }}
            className={cn(
                "absolute h-5 w-5 text-amber-500 fill-amber-500/20",
                // Only animate if NOT inside a view transition to avoid double-movement artifacts
                "transition-all duration-500 ease-spring-gentle", 
                "rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
            )} 
        />
        {/* Moon Icon (Dark Mode) */}
        <Moon 
            style={{ width: '1.25rem', height: '1.25rem' }}
            className={cn(
                "absolute h-5 w-5 text-blue-400 fill-blue-400/20",
                // Only animate if NOT inside a view transition
                "transition-all duration-500 ease-spring-gentle", 
                "rotate-90 scale-0 dark:rotate-0 dark:scale-100"
            )} 
        />
      </div>
      
      {/* Subtle ring effect on hover (Desktop only) */}
      <div className="absolute inset-0 rounded-full ring-2 ring-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 hidden sm:block" />
    </Button>
  )
}
