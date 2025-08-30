"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  MapPin,
  Send,
  User,
  AtSign,
  Clock,
  CheckCircle,
  MessageSquare,
  Phone,
  Calendar,
  Zap,
  Star,
  Heart,
} from "lucide-react"

export function EnhancedContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const [hp, setHp] = useState("") // honeypot
  const sectionRef = useRef<HTMLDivElement>(null)

  const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v)

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
    if (hp) {
      setSubmitStatus("error")
      return
    }
    if (!formData.name || !isValidEmail(formData.email) || !formData.subject || !formData.message) {
      setSubmitStatus("error")
      return
    }
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
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
      description: "Drop me a line anytime",
      color: "purple",
      href: "mailto:theanshshah@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 958****734",
      description: "Call for urgent matters",
      color: "green",
      href: "tel:+919580000734",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Vadodara, Gujarat",
      description: "Available for remote work",
      color: "blue",
      href: "#",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "Quick turnaround guaranteed",
      color: "orange",
      href: "#",
    },
  ]

  const stats = [
    { label: "Projects Completed", value: "15+", icon: Star },
    { label: "Happy Clients", value: "10+", icon: Heart },
    { label: "Response Rate", value: "100%", icon: Zap },
    { label: "Years Experience", value: "2+", icon: Calendar },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/5 dark:to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
            </p>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center p-4 bg-background/50 dark:bg-background/50 backdrop-blur-sm border border-border/50"
              >
                <CardContent className="p-0">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div
              className={`space-y-6 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
                  Get In Touch
                </h3>

                <div className="grid gap-4">
                  {contactInfo.map((info, index) => (
                    <Card
                      key={info.title}
                      className="group p-4 sm:p-6 bg-background/50 dark:bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg cursor-pointer"
                      onClick={() => info.href !== "#" && window.open(info.href, "_blank")}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                              info.color === "purple"
                                ? "bg-purple-100 dark:bg-purple-900/30"
                                : info.color === "green"
                                  ? "bg-green-100 dark:bg-green-900/30"
                                  : info.color === "blue"
                                    ? "bg-blue-100 dark:bg-blue-900/30"
                                    : "bg-orange-100 dark:bg-orange-900/30"
                            }`}
                          >
                            <info.icon
                              className={`h-6 w-6 ${
                                info.color === "purple"
                                  ? "text-purple-600 dark:text-purple-400"
                                  : info.color === "green"
                                    ? "text-green-600 dark:text-green-400"
                                    : info.color === "blue"
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-orange-600 dark:text-orange-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {info.title}
                            </h4>
                            <p className="font-medium mb-1 text-sm sm:text-base">{info.value}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <Card className="shadow-xl border-0 bg-background/80 dark:bg-background/80 backdrop-blur-xl overflow-hidden">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center">
                    <Send className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
                    Send Message
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="sr-only" aria-live="polite">
                    {submitStatus === "success"
                      ? "Message sent successfully"
                      : submitStatus === "error"
                        ? "There was an error. Please check the form and try again."
                        : ""}
                  </p>
                  {submitStatus === "success" ? (
                    <div className="text-center py-8" role="status" aria-live="polite">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-4">
                        Thank you for reaching out! I'll get back to you within 24 hours.
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>I appreciate you taking the time to contact me!</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                      <input
                        type="text"
                        name="website"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            Full Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            aria-invalid={submitStatus === "error" && !formData.name}
                            className="h-11 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 motion-reduce:transition-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium flex items-center">
                            <AtSign className="h-4 w-4 mr-1" />
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            inputMode="email"
                            placeholder="john@example.com"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            aria-invalid={submitStatus === "error" && !isValidEmail(formData.email)}
                            className="h-11 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 motion-reduce:transition-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Project Collaboration Opportunity"
                          autoComplete="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="h-11 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 motion-reduce:transition-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Hi Ansh, I'd love to discuss a potential project with you..."
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="resize-none rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 motion-reduce:transition-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 rounded-xl shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          // removed spinner; show text-only while submitting
                          <div className="flex items-center">Sending...</div>
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
