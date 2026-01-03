
import React, { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Heart,
  Code,
  Coffee,
  Zap,
  Terminal,
  AlertTriangle,
  ArrowUp,
  Sparkles,
  Globe,
  Shield,
} from "lucide-react"
import { EnhancedSystemInfo } from "./enhanced-system-info"



const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
  { name: "Resume", href: "/resume" },
]

const services = [
  { name: "Web Development", icon: Code },
  { name: "Mobile Apps", icon: MessageCircle },
  { name: "UI/UX Design", icon: Heart },
  { name: "Consulting", icon: MessageCircle },
]


const techStack = [
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Vite", color: "#646CFF" },
]

export default function EnhancedFooter() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showBackToTop, setShowBackToTop] = useState(false)


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <div className="w-full bg-[#050505] pt-10 pb-5 px-4 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#cc8b86,transparent)]"></div>
         </div>
         <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-[#0F0F0F] border border-amber-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden group">

                 <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <Terminal className="absolute top-0 right-0 w-24 h-24 text-amber-500/20 -rotate-12 translate-x-4 -translate-y-4" />
                    <Code className="absolute bottom-0 left-0 w-16 h-16 text-orange-500/10 rotate-12 -translate-x-4 translate-y-4" />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(245,158,11,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer"></div>
                 </div>

                 <div className="flex flex-col md:flex-row items-start md:items-center gap-5 relative z-10">
                     <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                        <Shield className="w-6 h-6 text-green-500" />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                           Verified Personal Portfolio
                           <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-500 uppercase tracking-wider font-mono whitespace-nowrap">
                              Legitimate Site
                           </span>
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                           This is Ansh Shah's personal portfolio website. <strong className="text-gray-300">Not affiliated with Netflix, Google, or any third-party brand.</strong>{" "}
                           Open-source educational project with no data collection. No login required.
                        </p>
                     </div>
                  </div>
            </div>
         </div>
      </div>

    <footer className="bg-[#050505] text-white relative overflow-hidden border-t border-white/10" style={{ contentVisibility: 'auto' }}>
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 sm:pt-12 sm:pb-8 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 lg:gap-10">
          <div className="lg:col-span-1 space-y-3 md:space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logoo%20light.png" 
                alt="Ansh Shah Logo" 
                className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-xl shadow-lg shadow-[#cc8b86]/20 transition-all duration-500 hover:scale-110 hover:rotate-3 img-lazy-load"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white inline-block select-none">
                  ANSH SHAH
                </h3>
                <div className="h-1 w-10 md:w-12 bg-[#cc8b86] rounded-full mt-1.5" />
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-medium">
              Passionate full-stack developer creating beautiful digital experiences with modern technologies.
            </p>


            <div className="hidden md:flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2.5 py-1 text-[10px] font-semibold rounded-full border transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: `${tech.color}40`, 
                    backgroundColor: `${tech.color}15`,
                    color: tech.color 
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>


          </div>

          <div className="hidden md:block">
            <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
              <Zap className="h-4 w-4 mr-2 text-yellow-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center text-sm text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 mr-3 group-hover:bg-[#cc8b86] group-hover:scale-150 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
              <Coffee className="h-4 w-4 mr-2 text-orange-400" />
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service.name}
                  className="group flex items-center text-sm text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 cursor-default"
                >
                  <div className="mr-3 p-1.5 rounded-md bg-white/5 group-hover:bg-[#a6808c]/20 transition-colors duration-300">
                    <service.icon className="h-4 w-4 text-[#a6808c]/70 group-hover:text-[#cc8b86] transition-colors" />
                  </div>
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6">
             <EnhancedSystemInfo />
             

          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-4 sm:mt-8 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-gray-500 text-xs md:text-sm order-2 md:order-1">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 md:h-4 md:w-4 mx-1 md:mx-1.5 text-red-500 animate-pulse" />
              <span>by Ansh Shah</span>
            </div>

            <div className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-500 order-1 md:order-2">
              <span className="hidden sm:inline hover:text-gray-300 transition-colors cursor-default">
                Privacy Policy
              </span>
              <span className="hidden sm:inline hover:text-gray-300 transition-colors cursor-default">
                Terms of Service
              </span>
              <div className="flex items-center">
                <Code className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-1.5" />
                Open Source
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-6 flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-[10px] md:text-xs text-gray-600">
               <p>© {currentTime.getFullYear()} Crafted with passion & coffee ☕</p>
               <span className="hidden sm:inline text-gray-800">•</span>
               <div className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 space-x-2 text-[9px] md:text-[10px] text-gray-500 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                  <span>{formatDate(currentTime)}</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                  <span className="text-green-500/80">IST</span>
               </div>
            </div>
            
            <div className="pt-1">
               <a 
                  href="https://nowhile.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit nowhile.com"
                  className="group relative inline-flex h-6 md:h-7 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform duration-300 hover:scale-105"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)] opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#050505] px-3 md:px-4 py-1 text-[9px] md:text-[10px] font-medium text-gray-400 backdrop-blur-3xl transition-colors group-hover:text-white group-hover:bg-black/80">
                    <span className="mr-1 md:mr-2 flex h-1.5 w-1.5 relative">
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                    </span>
                     <span className="font-bold ml-0.5 md:ml-1 text-indigo-400 group-hover:text-indigo-300 transition-colors">nowhile</span>
                    <Terminal className="ml-1 md:ml-1.5 h-2.5 w-2.5 md:h-3 md:w-3 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                  </span>
               </a>
            </div>
          </div>
        </div>
        

        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#cc8b86] text-white shadow-lg shadow-[#cc8b86]/30 transition-all duration-300 hover:bg-[#a6808c] hover:scale-110 hover:-translate-y-1 ${
            showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6808c]/50 to-transparent"></div>
      </div>
    </footer>
    </>
  )
}
