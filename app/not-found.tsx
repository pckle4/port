"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <main className="min-h-[80dvh] flex items-center justify-center px-6 py-16">
      <section
        className={cn(
          "max-w-xl w-full text-center",
          "transition-opacity duration-300 ease-out",
          mounted ? "opacity-100" : "opacity-0",
        )}
        aria-labelledby="not-found-title"
      >
        <div
          className={cn(
            "relative mx-auto mb-6 h-20 w-20 rounded-full border",
            "border-border",
            "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out",
            "motion-safe:hover:scale-105",
          )}
          aria-hidden="true"
        >
          <div className={cn("absolute inset-0 rounded-full", "bg-muted/40", "motion-safe:animate-pulse")} />
          <span className="sr-only">Decorative</span>
        </div>

        <h1 id="not-found-title" className="text-4xl font-semibold tracking-tight text-balance mb-2">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
          The address you tried to visit doesn’t exist. It may have been moved, or the link could be broken.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/" prefetch>
            <Button className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5">
              Go Home
            </Button>
          </Link>

          <a href="#projects" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
            Browse Projects
          </a>

          <Link href="/resume" prefetch className="inline-flex">
            <Button
              variant="secondary"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5"
            >
              View Resume
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          <p className="leading-relaxed">
            Tip: Check the URL for typos or use the navigation to find what you’re looking for.
          </p>
        </div>
      </section>
    </main>
  )
}
