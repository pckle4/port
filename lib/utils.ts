import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type SmoothScrollOptions = {
  offset?: number
  duration?: number
}

export function smoothScrollToElement(element: HTMLElement, options: SmoothScrollOptions = {}) {
  if (typeof window === "undefined" || !element) return

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  const { offset = 84, duration = 620 } = options
  const targetRect = element.getBoundingClientRect()
  const targetPosition = targetRect.top + window.pageYOffset - offset

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetPosition, behavior: "auto" })
    return
  }

  const start = window.pageYOffset
  const distance = targetPosition - start
  const clampedDuration = Math.max(320, Math.min(960, duration))
  const startTime = performance.now()

  const easeOutExpo = (t: number) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(1, elapsed / clampedDuration)
    const eased = easeOutExpo(progress)

    window.scrollTo({ top: start + distance * eased })

    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}