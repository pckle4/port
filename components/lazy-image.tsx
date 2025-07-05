"use client"

import { useState, useRef, useEffect } from "react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
}

export function LazyImage({ src, alt, className = "", placeholder }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`lazy-image-container relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="lazy-image-placeholder absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
      {isInView && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`lazy-image transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  )
}
