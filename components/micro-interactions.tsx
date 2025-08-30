"use client"

import { useEffect } from "react"

export function MicroInteractions() {
  useEffect(() => {
    // Simple button click ripple effect without GSAP
    const buttons = document.querySelectorAll("button, .clickable")

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement("span")
        ripple.className = "micro-ripple absolute rounded-full bg-white/30 pointer-events-none"
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"
        ripple.style.width = "0px"
        ripple.style.height = "0px"
        ripple.style.transform = "translate(-50%, -50%)"

        button.appendChild(ripple)

        // Animate with CSS transitions
        requestAnimationFrame(() => {
          ripple.style.width = "100px"
          ripple.style.height = "100px"
          ripple.style.opacity = "0"
          ripple.style.transition = "all 0.6s ease-out"
        })

        setTimeout(() => ripple.remove(), 600)
      })
    })

    // Simple hover magnetic effect for cards
    const cards = document.querySelectorAll(".magnetic-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
        card.style.transition = "transform 0.3s ease-out"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translate(0, 0)"
        card.style.transition = "transform 0.5s ease-out"
      })
    })

    // Simple parallax scroll effect
    const parallaxElements = document.querySelectorAll(".parallax-element")

    const handleScroll = () => {
      const scrollY = window.scrollY

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        element.style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
