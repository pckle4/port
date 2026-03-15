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
  const docEl = document.documentElement
  const body = document.body
  const previousDocScrollBehavior = docEl.style.scrollBehavior
  const previousBodyScrollBehavior = body?.style.scrollBehavior ?? null
  const restoreScrollBehavior = () => {
    docEl.style.scrollBehavior = previousDocScrollBehavior
    if (body && previousBodyScrollBehavior !== null) {
      body.style.scrollBehavior = previousBodyScrollBehavior
    }
  }

  // Prevent CSS `scroll-behavior: smooth` from fighting our frame-by-frame animation.
  docEl.style.scrollBehavior = "auto"
  if (body) {
    body.style.scrollBehavior = "auto"
  }

  if (prefersReducedMotion) {
    const targetRect = element.getBoundingClientRect()
    const targetPosition = targetRect.top + window.pageYOffset - offset
    window.scrollTo({ top: targetPosition, behavior: "auto" })
    restoreScrollBehavior()
    return
  }

  let start = window.pageYOffset
  const clampedDuration = Math.max(320, Math.min(960, duration))
  const startTime = performance.now()

  let lastTargetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset

  const easeOutExpo = (t: number) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(1, elapsed / clampedDuration)
    const eased = easeOutExpo(progress)

    // Recalculate target position to check for layout shifts (e.g. lazy-loaded content popping in)
    const currentTargetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
    
    // If the target moved, shift our start position by the same amount to prevent jarring jumps
    if (Math.abs(currentTargetPosition - lastTargetPosition) > 2) {
      start += (currentTargetPosition - lastTargetPosition)
      lastTargetPosition = currentTargetPosition
    }

    const distance = currentTargetPosition - start
    window.scrollTo({ top: start + distance * eased })

    if (progress < 1) {
      window.requestAnimationFrame(step)
    } else {
      // Final correction to ensure exact alignment
      const finalRect = element.getBoundingClientRect()
      window.scrollTo({ top: finalRect.top + window.pageYOffset - offset, behavior: "auto" })
      restoreScrollBehavior()
    }
  }

  window.requestAnimationFrame(step)
}
export function smoothScrollTo(id: string, options: SmoothScrollOptions = {}) {
  const element = document.getElementById(id)
  if (element) {
    smoothScrollToElement(element, options)
  }
}

/** Scroll to element by id, retrying when it's not yet in DOM (e.g. lazy-loaded sections) */
export function smoothScrollToWithRetry(
  id: string,
  options: SmoothScrollOptions & { maxRetries?: number; retryInterval?: number; retryIntervalMs?: number } = {}
) {
  const { maxRetries = 25, retryInterval = 80, retryIntervalMs, ...scrollOptions } = options
  const interval = retryIntervalMs ?? retryInterval
  let attempts = 0

  const tryScroll = () => {
    const element = document.getElementById(id)
    if (element) {
      smoothScrollToElement(element, scrollOptions)
      return
    }
    attempts++
    if (attempts < maxRetries) {
      setTimeout(tryScroll, interval)
    }
  }

  tryScroll()
}
