
import React, { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouch(false)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      
      const { clientX, clientY } = e
      
      // Move the main cursor dot instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }
      
      // Move the trailer with a slight delay (handled by CSS transition)
      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }
    }

    const onMouseDown = () => {
      if (cursorRef.current) cursorRef.current.style.transform += " scale(0.8)"
      if (trailerRef.current) trailerRef.current.style.transform += " scale(0.8)"
    }

    const onMouseUp = (e: MouseEvent) => {
        // Trigger re-render or reset transform via logic if needed, 
        // but simplest is to let the next mousemove reset the scale via the translate3d overwrite
        // or toggle a class.
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check for interactive elements
      const isInteractive = 
        target.matches("button, a, input, textarea, .interactive") ||
        target.closest("button, a, input, textarea, .interactive") !== null ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsHovering(!!isInteractive)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    // Hide default cursor
    if (!isTouch) {
        document.documentElement.style.cursor = 'none';
        document.querySelectorAll('a, button, input').forEach((el) => {
            (el as HTMLElement).style.cursor = 'none';
        });
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      
      // Restore cursor
      document.documentElement.style.cursor = 'auto';
    }
  }, [isTouch, isVisible])

  if (isTouch) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Main Dot */}
      <div
        ref={cursorRef}
        className={cn(
          "absolute top-0 left-0 w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-difference z-[10000]",
          "transition-opacity duration-300 ease-in-out will-change-transform",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />
      
      {/* Trailer Ring */}
      <div
        ref={trailerRef}
        className={cn(
          "absolute top-0 left-0 w-8 h-8 border-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none box-border z-[9999]",
          "transition-all duration-200 ease-out will-change-transform",
          isVisible ? "opacity-100" : "opacity-0",
          isHovering 
            ? "w-16 h-16 border-purple-500/50 bg-purple-500/10 scale-110" 
            : "border-purple-500/30 scale-100"
        )}
      />
    </div>
  )
}
