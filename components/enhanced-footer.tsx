"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  MapPin,
  Heart,
  Code,
  Coffee,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedSystemInfo } from "@/components/enhanced-system-info"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ansh",
    icon: Github,
    color: "hover:text-gray-300",
    description: "View my code",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ansh",
    icon: Linkedin,
    color: "hover:text-blue-400",
    description: "Professional network",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
    color: "hover:text-cyan-400",
    description: "Follow my thoughts",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    color: "hover:text-pink-400",
    description: "Behind the scenes",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
    color: "hover:text-red-400",
    description: "Tech tutorials",
  },
  {
    name: "Email",
    href: "mailto:theanshshah@gmail.com",
    icon: Mail,
    color: "hover:text-green-400",
    description: "Send me a message",
  },
]

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: "/resume" },
]

const services = [
  { name: "Web Development", icon: Code },
  { name: "Mobile Apps", icon: MessageCircle },
  { name: "UI/UX Design", icon: Heart },
  { name: "Consulting", icon: MessageCircle },
]

export function EnhancedFooter() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const hiddenNumber = "+91 958****734"

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
    <footer className="bg-black text-white relative overflow-hidden mb-20 md:mb-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ansh Shah
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
              Passionate full-stack developer creating beautiful digital experiences with modern technologies. Let's
              build something amazing together.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className={`w-10 h-10 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10 group`}
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <Coffee className="h-5 w-5 mr-2 text-orange-400" />
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service.name}
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                >
                  <service.icon className="h-4 w-4 mr-2 text-purple-400" />
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & System Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-400" />
              Get In Touch
            </h4>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-sm">theanshshah@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MessageCircle className="h-4 w-4 mr-3 text-green-400" />
                <span className="text-sm">{hiddenNumber}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-3 text-purple-400" />
                <span className="text-sm">Vadodara, Gujarat</span>
              </div>
            </div>

            {/* Enhanced System Info Component */}
            <EnhancedSystemInfo />
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-400 animate-pulse" />
              <span>by a passionate developer</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <Code className="h-4 w-4 mr-1" />
                Open Source
              </span>
            </div>
          </div>

          {/* Copyright Disclaimer with Time */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800/50">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">© {currentTime.getFullYear()} Ansh Shah. All rights reserved.</p>
              <p className="text-xs text-gray-600 max-w-4xl mx-auto leading-relaxed">
                This portfolio showcases original work and creative projects. All designs, code implementations, and
                content are the intellectual property of Ansh Shah. Inspiration drawn from the developer community with
                gratitude.
              </p>
              <p className="text-xs text-gray-600">Crafted with passion, precision, and countless cups of coffee ☕</p>
              {/* Enhanced time display with seconds */}
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mt-4">
                <span className="font-mono bg-gray-800/50 px-2 py-1 rounded">{formatTime(currentTime)}</span>
                <span>•</span>
                <span>{formatDate(currentTime)}</span>
                <span>•</span>
                <span>IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </footer>
  )
}
