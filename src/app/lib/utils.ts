import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

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
  const { offset = 84, duration = 1500 } = options

  if (prefersReducedMotion) {
    const targetRect = element.getBoundingClientRect()
    const targetPosition = targetRect.top + window.pageYOffset - offset
    window.scrollTo({ top: targetPosition, behavior: "auto" })
    return
  }

  const durationInSeconds = duration / 1000
  const lenis = (window as any).lenis

  const onComplete = () => {
    document.body.classList.remove('is-navigating');
    element.classList.remove('animate-flash-highlight');
    void element.offsetWidth;
    element.classList.add('animate-flash-highlight');
    setTimeout(() => element.classList.remove('animate-flash-highlight'), 1600);
  }

  document.body.classList.add('is-navigating');

  if (lenis) {
    lenis.scrollTo(element, { 
      offset: -offset, 
      duration: durationInSeconds,
      easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // power3.inOut equivalent
      onComplete
    })
  } else {
    gsap.to(window, {
      duration: durationInSeconds,
      scrollTo: { y: element, offsetY: offset },
      ease: "power3.inOut",
      onComplete
    })
  }
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
