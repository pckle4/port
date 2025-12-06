
import React, { useEffect, useState } from "react"
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
} from "lucide-react"
import { EnhancedSystemInfo } from "./enhanced-system-info"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/theanshshah",
    icon: Github,
    color: "group-hover:text-white",
    bgColor: "hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/anshshahh",
    icon: Linkedin,
    color: "group-hover:text-blue-400",
    bgColor: "hover:bg-blue-900/30",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
    color: "group-hover:text-cyan-400",
    bgColor: "hover:bg-cyan-900/30",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    color: "group-hover:text-pink-400",
    bgColor: "hover:bg-pink-900/30",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
    color: "group-hover:text-red-400",
    bgColor: "hover:bg-red-900/30",
  },
  {
    name: "Email",
    href: "mailto:theanshshah@gmail.com",
    icon: Mail,
    color: "group-hover:text-green-400",
    bgColor: "hover:bg-green-900/30",
  },
]

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

export default function EnhancedFooter() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
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
    <footer className="bg-[#050505] text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent inline-block">
                Ansh Shah
              </h3>
              <div className="h-1 w-12 bg-purple-500 rounded-full mt-2" />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Passionate full-stack developer creating beautiful digital experiences with modern technologies. Let's
              build something amazing together.
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-2.5 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:scale-110 ${social.bgColor}`}
                  aria-label={social.name}
                >
                  <social.icon className={`h-5 w-5 text-gray-400 transition-colors ${social.color}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Hidden on Mobile */}
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
                    className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 mr-2 group-hover:bg-purple-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Hidden on Mobile */}
          <div className="hidden md:block">
            <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
              <Coffee className="h-4 w-4 mr-2 text-orange-400" />
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service.name}
                  className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <service.icon className="h-4 w-4 mr-2 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* System Info */}
          <div className="space-y-6">
             <EnhancedSystemInfo />
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-10 sm:mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-500 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1.5 text-red-500 animate-pulse" />
              <span>by Ansh Shah</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
              <Link to="#" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-1.5" />
                Open Source
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-3">
            <p className="text-xs text-gray-600">
               © {currentTime.getFullYear()} Ansh Shah. Crafted with passion, precision, and countless cups of coffee ☕
            </p>
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-900 border border-gray-800 space-x-3 text-[10px] text-gray-500 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>{formatDate(currentTime)}</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span className="text-green-500/80">IST</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-600/50 to-transparent"></div>
    </footer>
  )
}
