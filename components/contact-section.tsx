"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Terminal, User, AtSign, Clock, Globe, Zap, Heart, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captcha: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "ansh@portfolio:~$ whoami",
    "Full Stack Developer & UI/UX Designer",
    "ansh@portfolio:~$ status",
    "Available for new projects and collaborations",
    "ansh@portfolio:~$ contact --help",
    "Use the form below to send me a message...",
    "ansh@portfolio:~$ _",
  ])

  const sectionRef = useRef<HTMLDivElement>(null)

  // Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operations = ["+", "-", "*"]
    const operation = operations[Math.floor(Math.random() * operations.length)]

    let answer = 0
    let question = ""

    switch (operation) {
      case "+":
        answer = num1 + num2
        question = `${num1} + ${num2}`
        break
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`
        break
      case "*":
        const smallNum1 = Math.floor(Math.random() * 5) + 1
        const smallNum2 = Math.floor(Math.random() * 5) + 1
        answer = smallNum1 * smallNum2
        question = `${smallNum1} × ${smallNum2}`
        break
    }

    setCaptchaQuestion({ question, answer })
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate captcha
    if (Number.parseInt(formData.captcha) !== captchaQuestion.answer) {
      setTerminalLines((prev) => [
        ...prev.slice(0, -1),
        `ansh@portfolio:~$ validate-captcha`,
        "❌ Captcha verification failed. Please try again.",
        "ansh@portfolio:~$ _",
      ])
      generateCaptcha()
      setFormData((prev) => ({ ...prev, captcha: "" }))
      return
    }

    setIsSubmitting(true)

    // Add terminal feedback
    setTerminalLines((prev) => [
      ...prev.slice(0, -1),
      `ansh@portfolio:~$ send-message --to="ansh" --from="${formData.name}"`,
      "Sending message...",
      "ansh@portfolio:~$ _",
    ])

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus("success")

      // Update terminal with success and details
      const currentTime = new Date()
      const timeString = currentTime.toLocaleTimeString()
      const dateString = currentTime.toLocaleDateString()

      setTerminalLines((prev) => [
        ...prev.slice(0, -2),
        "Message sent successfully! ✅",
        "",
        "📧 MESSAGE DETAILS:",
        `├─ From: ${formData.name} <${formData.email}>`,
        `├─ Subject: ${formData.subject}`,
        `├─ Time: ${timeString}`,
        `├─ Date: ${dateString}`,
        `├─ Status: DELIVERED`,
        `└─ ID: MSG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        "",
        "Thank you for reaching out! I'll get back to you soon. 🚀",
        "Your message has been sent to my email inbox.",
        "ansh@portfolio:~$ _",
      ])
    } catch (error) {
      setSubmitStatus("error")
      setTerminalLines((prev) => [
        ...prev.slice(0, -2),
        "❌ Network error. Please check your connection and try again.",
        "ansh@portfolio:~$ _",
      ])
    } finally {
      setIsSubmitting(false)
    }

    // Reset form after success
    if (submitStatus !== "error") {
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "", captcha: "" })
        setSubmitStatus("idle")
        generateCaptcha()
        setTerminalLines([
          "ansh@portfolio:~$ whoami",
          "Full Stack Developer & UI/UX Designer",
          "ansh@portfolio:~$ status",
          "Available for new projects and collaborations",
          "ansh@portfolio:~$ contact --help",
          "Use the form below to send me a message...",
          "ansh@portfolio:~$ _",
        ])
      }, 5000)
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
      description: "Send me an email anytime",
      color: "purple",
      href: "mailto:theanshshah@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Vadodara, Gujarat",
      description: "Available for remote work",
      color: "green",
      href: "#",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "I'll get back to you quickly",
      color: "orange",
      href: "#",
    },
    {
      icon: Globe,
      title: "Timezone",
      value: "IST (UTC+5:30)",
      description: "India Standard Time",
      color: "blue",
      href: "#",
    },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring
              your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Terminal */}
              <div>
                <Card className="bg-black border-gray-700 shadow-2xl">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Terminal className="h-4 w-4" />
                        <span className="text-sm font-mono">ansh@portfolio:~</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="font-mono text-xs sm:text-sm space-y-1 h-40 sm:h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      {terminalLines.map((line, index) => (
                        <div
                          key={index}
                          className={`${
                            line.startsWith("ansh@portfolio:~$")
                              ? "text-green-400"
                              : line.includes("✅")
                                ? "text-green-300"
                                : line.includes("❌")
                                  ? "text-red-300"
                                  : line.includes("📧") || line.includes("├─") || line.includes("└─")
                                    ? "text-cyan-300"
                                    : line.includes("Sending") ||
                                        line.includes("Thank you") ||
                                        line.includes("Your message")
                                      ? "text-yellow-300"
                                      : "text-gray-300"
                          }`}
                        >
                          {line}
                          {index === terminalLines.length - 1 && (
                            <span className="animate-pulse text-green-400">|</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-600" />
                  Get In Touch
                </h3>

                <div className="grid gap-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="group p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg cursor-pointer"
                      onClick={() => info.href !== "#" && window.open(info.href, "_blank")}
                    >
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                        ${
                          info.color === "purple"
                            ? "bg-purple-100 dark:bg-purple-900/30"
                            : info.color === "green"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : info.color === "orange"
                                ? "bg-orange-100 dark:bg-orange-900/30"
                                : "bg-blue-100 dark:bg-blue-900/30"
                        }`}
                      >
                        <info.icon
                          className={`h-6 w-6 sm:h-7 sm:w-7 
                          ${
                            info.color === "purple"
                              ? "text-purple-600"
                              : info.color === "green"
                                ? "text-green-600"
                                : info.color === "orange"
                                  ? "text-orange-600"
                                  : "text-blue-600"
                          }`}
                        />
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
                        {info.title}
                      </h4>
                      <p className="font-medium mb-1 text-sm sm:text-base">{info.value}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-background to-muted/30 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
                <CardHeader className="pb-4 sm:pb-6 relative">
                  <CardTitle className="text-xl sm:text-2xl flex items-center">
                    <Send className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-600" />
                    Send me a message
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Fill out the form below and I'll get back to you as soon as possible. All fields are required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  {submitStatus === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out! I've received your message and will get back to you within 24 hours.
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>I appreciate you taking the time to contact me!</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm"
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
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm"
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
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Hi Ansh, I'd love to discuss a potential project with you. I'm looking for someone who can help me build..."
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="resize-none rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm"
                        />
                      </div>

                      {/* Math Captcha */}
                      <div className="space-y-2">
                        <label htmlFor="captcha" className="text-sm font-medium">
                          Security Check: What is {captchaQuestion.question}?
                        </label>
                        <Input
                          id="captcha"
                          name="captcha"
                          type="number"
                          placeholder="Enter the answer"
                          value={formData.captcha}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none rounded-2xl shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {isSubmitting ? (
                          <div className="flex items-center relative z-10">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </div>
                        ) : (
                          <div className="flex items-center relative z-10">
                            <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
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
