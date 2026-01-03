
"use client"

import React, { useEffect, useRef, useState, MouseEvent } from "react"
import { IconCloud } from "./icon-cloud"
import { cn } from "../lib/utils"

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nodedotjs",
  "postgresql",
  "mongodb",
  "tailwindcss",
  "docker",
  "git",
  "github",
  "python",
  "html5",
  "css3",
  "nextdotjs",
  "vercel",
  "vite",
  "figma",
  "apachekafka",
  "nginx",
  "graphql",
  "redis",
  "dotnet",
  "kubernetes",
  "linux",
  "android"
]

const skillCategories = [
  {
    title: "Frontend Development",
    description: "Architecting pixel-perfect, responsive user interfaces.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Three.js", "Android"],
    color: "from-[#cc8b86] to-[#a6808c]",
    icon: "🎨",
  },
  {
    title: "Backend Architecture",
    description: "Building scalable, high-performance server-side logic.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "C#", ".NET"],
    color: "from-[#706677] to-[#565264]",
    icon: "⚙️",
  },
  {
    title: "DevOps & Infrastructure",
    description: "Streamlining deployment and ensuring reliability.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    color: "from-[#7d4f50] to-[#aa998f]",
    icon: "☁️",
  },
  {
    title: "Design & UX Strategy",
    description: "Crafting intuitive digital experiences that convert.",
    skills: ["Figma", "UI/UX", "Prototyping", "Wireframing"],
    color: "from-[#d1be9c] to-[#ccb7ae]",
    icon: "✨",
  },
]

const MagicCard: React.FC<{ category: typeof skillCategories[0], index: number }> = ({ category, index }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);
  
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      

      requestAnimationFrame(() => {
          if (!divRef.current) return;
          const div = divRef.current;
          const rect = div.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          div.style.setProperty("--mouse-x", `${x}px`);
          div.style.setProperty("--mouse-y", `${y}px`);
      });
    };
  
    const handleFocus = () => {
      setOpacity(1);
    };
  
    const handleBlur = () => {
      setOpacity(0);
    };
  
    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/50 px-6 py-6 shadow-xl backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 dark:bg-gray-900/40 will-change-transform group"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(204, 139, 134, 0.15), transparent 40%)`,
          }}
        />
        
        <div className="relative z-10 w-full">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {category.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-100 transition-colors duration-300 group-hover:text-white">{category.title}</h3>
                </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-5 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">{category.description}</p>
            
            <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                    <span
                        key={skill}
                        className={cn(
                            "px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border transition-all duration-300",
                            "bg-white/5 border-white/5 text-gray-300",
                            "hover:bg-[#a6808c]/20 hover:text-white hover:border-[#a6808c]/40 hover:scale-105",
                            "cursor-default"
                        )}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>

        <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
                opacity,
                background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 40%)`,
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
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 sm:py-24 relative overflow-hidden bg-[#030303]" style={{ contain: 'layout style', scrollMarginTop: '96px' }}>
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-[#a6808c]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[#706677]/20 rounded-full blur-[100px]" />
        </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
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

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center">
              <div
                className={`relative w-full aspect-square max-w-[320px] sm:max-w-[450px] transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                {shouldRenderCloud && (
                  <div className="h-full w-full relative flex items-center justify-center rounded-full bg-zinc-900/40 border border-white/5 shadow-2xl shadow-[#a6808c]/5 backdrop-blur-sm">
                    <IconCloud iconSlugs={slugs} forcedTheme="dark" />
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
