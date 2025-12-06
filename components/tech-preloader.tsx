
import React, { useEffect, useState } from "react"
import { Code, Cpu, Database, Globe, Zap, Hexagon } from "lucide-react"
import { cn } from "../lib/utils"

interface PreloaderProps {
  onComplete: () => void
}

export function TechPreloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"loading" | "merging" | "complete">("loading")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden"
    
    return () => {
      // Unlock scroll when unmounted
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    // Progress bar simulation - slightly slower to allow viewing time
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1 // Slower increment
      })
    }, 35) // Slower interval

    // Phase management - Extended timings
    const mergeTimer = setTimeout(() => {
      setPhase("merging")
    }, 3200) // Increased to 3.2s so user sees the loading state

    const completeTimer = setTimeout(() => {
      setPhase("complete")
      setTimeout(onComplete, 800) // Wait for exit animation
    }, 4200) // Total duration ~4.2s

    return () => {
      clearInterval(timer)
      clearTimeout(mergeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  if (phase === "complete") return null

  return (
    <div className={cn(
      "fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000",
      phase === "merging" ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative w-64 h-64 flex items-center justify-center scale-90 sm:scale-100">
        
        {/* Central Core */}
        <div className={cn(
          "absolute z-20 w-16 h-16 bg-white dark:bg-white rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-in-out",
          phase === "merging" ? "scale-[50] opacity-0" : "scale-100"
        )}>
          <Hexagon className="w-8 h-8 text-black fill-black animate-pulse" />
        </div>

        {/* Outer Ring 1 */}
        <div className={cn(
          "absolute inset-0 border border-gray-800 rounded-full transition-all duration-1000",
          phase === "merging" ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )} />

        {/* Rotating Tech Icons */}
        <div className={cn(
          "absolute inset-0 animate-spin-slow transition-all duration-1000 ease-in-out",
          phase === "merging" ? "scale-0 opacity-0 rotate-[360deg]" : "scale-100 opacity-100"
        )}>
          {/* North */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] p-2 border border-purple-500/30 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Code className="w-5 h-5 text-purple-500" />
          </div>
          {/* East */}
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] p-2 border border-blue-500/30 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <Database className="w-5 h-5 text-blue-500" />
          </div>
          {/* South */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#0a0a0a] p-2 border border-green-500/30 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <Cpu className="w-5 h-5 text-green-500" />
          </div>
          {/* West */}
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] p-2 border border-pink-500/30 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            <Globe className="w-5 h-5 text-pink-500" />
          </div>
        </div>

        {/* Orbit Lines */}
        <div className={cn(
           "absolute w-48 h-48 border border-gray-800/50 rounded-full animate-spin-slow transition-all duration-1000 delay-100",
           phase === "merging" ? "scale-0 opacity-0" : "scale-100"
        )} style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
        
        <div className={cn(
           "absolute w-32 h-32 border border-gray-700/50 rounded-full animate-spin-slow transition-all duration-1000 delay-75",
           phase === "merging" ? "scale-0 opacity-0" : "scale-100"
        )} style={{ animationDuration: '4s' }} />

      </div>

      {/* Loading Text & Bar */}
      <div className={cn(
        "mt-12 flex flex-col items-center gap-4 transition-all duration-700",
        phase === "merging" ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
      )}>
        <div className="flex items-center gap-2 font-mono text-sm tracking-[0.2em] text-gray-400">
          <Zap className="w-3 h-3 text-yellow-500 animate-bounce" />
          <span>SYSTEM_BOOT</span>
        </div>
        
        <div className="w-48 h-1 bg-gray-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="font-mono text-[10px] text-gray-600">
          {progress < 100 ? `${progress}%` : "READY"}
        </div>
      </div>
    </div>
  )
}