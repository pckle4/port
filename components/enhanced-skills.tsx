
"use client"

import React, { useEffect, useRef, useState, MouseEvent } from "react"
import { IconCloud } from "./icon-cloud"
import { cn } from "../lib/utils"

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nodedotjs",
  "express",
  "prisma",
  "postgresql",
  "mongodb",
  "redis",
  "tailwindcss",
  "sass",
  "figma",
  "docker",
  "kubernetes",
  "git",
  "github",
  "aws",
  "python",
  "java",
  "go",
  "rust",
  "html5",
  "css3",
  "graphql",
  "firebase",
  "threedotjs",
  "nextdotjs",
  "vercel",
  "vite",
  "linux"
]

const skillCategories = [
  {
    title: "Frontend Development",
    description: "Architecting pixel-perfect, responsive user interfaces.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Three.js"],
    color: "from-purple-500 to-indigo-500",
    icon: "🎨",
  },
  {
    title: "Backend Architecture",
    description: "Building scalable, high-performance server-side logic.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"],
    color: "from-blue-500 to-cyan-500",
    icon: "⚙️",
  },
  {
    title: "DevOps & Infrastructure",
    description: "Streamlining deployment and ensuring reliability.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    color: "from-green-500 to-emerald-500",
    icon: "☁️",
  },
  {
    title: "Design & UX Strategy",
    description: "Crafting intuitive digital experiences that convert.",
    skills: ["Figma", "UI/UX", "Prototyping", "Wireframing"],
    color: "from-pink-500 to-rose-500",
    icon: "✨",
  },
]

// Magic Spotlight Card Component
function MagicCard({ category, index }: { category: typeof skillCategories[0], index: number }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
  
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
  
      const div = divRef.current;
      const rect = div.getBoundingClientRect();
  
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
  
    const handleFocus = () => {
      setIsFocused(true);
      setOpacity(1);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
      setOpacity(0);
    };
  
    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/50 px-6 py-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 dark:bg-gray-900/40"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 w-full">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-xl shadow-inner">
                    {category.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-100">{category.title}</h3>
                </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">{category.description}</p>
            
            <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                    <span
                        key={skill}
                        className={cn(
                            "px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border transition-all duration-300",
                            "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/10",
                            "group-hover:scale-105 cursor-default"
                        )}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>

        {/* Gradient Border Overlay */}
        <div
            className="pointer-events-none absolute inset-0 transition duration-300"
            style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
                maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                padding: '1px',
                borderRadius: 'inherit'
            }}
        />
      </div>
    );
}

export default function EnhancedSkills() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRenderCloud, setShouldRenderCloud] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setShouldRenderCloud(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 sm:py-24 relative overflow-hidden bg-[#030303]">
        {/* Background Mesh Gradient */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/30 rounded-full blur-[120px]" />
        </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Col: Skills Cards */}
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
                <div 
                    className={`transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Skills & Technologies
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
                        I specialize in building robust, scalable applications. My toolkit evolves continuously, but these are my core weapons of choice.
                    </p>
                </div>

                <div 
                    className={`grid sm:grid-cols-2 gap-4 transition-all duration-1000 delay-200 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    {skillCategories.map((category, index) => (
                        <MagicCard key={index} category={category} index={index} />
                    ))}
                </div>
            </div>

            {/* Right Col: Icon Cloud */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center">
              <div
                className={`relative w-full aspect-square max-w-[450px] transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                {shouldRenderCloud && (
                  <div className="h-full w-full relative flex items-center justify-center">
                    {/* Decorative Ring - Added pointer-events-none */}
                    <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }}></div>
                    <div className="absolute inset-4 border border-blue-500/20 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
                    
                    <IconCloud iconSlugs={slugs} />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
