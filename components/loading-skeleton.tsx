"use client"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular" | "card"
}

export function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const baseClasses =
    "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"

  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-xl",
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 2s infinite linear",
      }}
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="project-card max-w-sm mx-auto p-0 overflow-hidden">
      <Skeleton variant="rectangular" className="h-40 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton variant="text" className="h-6 w-32" />
          <Skeleton variant="text" className="h-4 w-16" />
        </div>
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-3/4" />
        <div className="flex gap-2">
          <Skeleton variant="rectangular" className="h-6 w-16" />
          <Skeleton variant="rectangular" className="h-6 w-20" />
          <Skeleton variant="rectangular" className="h-6 w-14" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton variant="rectangular" className="h-8 flex-1" />
          <Skeleton variant="rectangular" className="h-8 flex-1" />
        </div>
      </div>
    </div>
  )
}

export function ContactCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-muted/50">
      <Skeleton variant="circular" className="w-12 h-12 mb-4" />
      <Skeleton variant="text" className="h-5 w-24 mb-2" />
      <Skeleton variant="text" className="h-4 w-32 mb-1" />
      <Skeleton variant="text" className="h-3 w-28" />
    </div>
  )
}
