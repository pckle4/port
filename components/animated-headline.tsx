"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

interface AnimatedHeadlineProps {
  words: string[]
  className?: string
}

export function AnimatedHeadline({ words, className = "" }: AnimatedHeadlineProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const tl = gsap.timeline({ repeat: -1 })

    words.forEach((word, index) => {
      tl.to(textRef.current, {
        duration: 0.1,
        text: word,
        ease: "none",
      })
        .to(textRef.current, {
          duration: 2,
          ease: "none",
        })
        .to(textRef.current, {
          duration: 0.1,
          text: "",
          ease: "none",
        })
    })

    return () => {
      tl.kill()
    }
  }, [words])

  return (
    <span
      ref={textRef}
      className={`inline-block min-w-[200px] text-left bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent ${className}`}
    >
      {words[0]}
    </span>
  )
}
