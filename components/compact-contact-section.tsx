"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, User, AtSign, MessageSquare, Phone, CheckCircle } from "lucide-react"

export function CompactContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")

      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" })
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "theanshshah@gmail.com",
      color: "purple",
      href: "mailto:theanshshah@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 958****734",
      color: "green",
      href: "tel:+919580000734",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Vadodara, Gujarat",
      color: "blue",
      href: "#",
    },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 relative overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div
              className={`space-y-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <Card
                    key={info.title}
                    className="group p-4 bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg cursor-pointer"
                    onClick={() => info.href !== "#" && window.open(info.href, "_blank")}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                            info.color === "purple"
                              ? "bg-purple-100 dark:bg-purple-900/30"
                              : info.color === "green"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-blue-100 dark:bg-blue-900/30"
                          }`}
                        >
                          <info.icon
                            className={`h-5 w-5 ${
                              info.color === "purple"
                                ? "text-purple-600 dark:text-purple-400"
                                : info.color === "green"
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-blue-600 dark:text-blue-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {info.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{info.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-6">
                  {submitStatus === "success" ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">Thank you for reaching out! I'll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-10 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium flex items-center">
                            <AtSign className="h-4 w-4 mr-1" />
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-10 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project..."
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="resize-none rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 rounded-lg shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
