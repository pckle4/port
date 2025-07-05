"use client"

import { useEffect } from "react"
import { gsap } from "gsap"

export function MicroInteractions() {
  useEffect(() => {
    // Button click ripple effect
    const buttons = document.querySelectorAll("button, .clickable")

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement("span")
        ripple.className = "micro-ripple"
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"

        button.appendChild(ripple)

        gsap.fromTo(
          ripple,
          {
            scale: 0,
            opacity: 0.6,
          },
          {
            scale: 4,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          },
        )
      })
    })

    // Hover magnetic effect for cards
    const cards = document.querySelectorAll(".magnetic-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(card, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        })
      })
    })

    // Parallax scroll effect
    const parallaxElements = document.querySelectorAll(".parallax-element")

    const handleScroll = () => {
      const scrollY = window.scrollY

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        gsap.to(element, {
          y: scrollY * speed,
          duration: 0.1,
          ease: "none",
        })
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
