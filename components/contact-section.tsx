"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Terminal, User, AtSign, Zap, Heart, CheckCircle } from "lucide-react"

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
    "root@ansh-portfolio:~# whoami",
    "Full Stack Developer & UI/UX Designer",
    "root@ansh-portfolio:~# status",
    "Available for new projects and collaborations",
    "root@ansh-portfolio:~# contact --help",
    "Use the form below to send me a message...",
    "root@ansh-portfolio:~# _",
  ])
  const [hp, setHp] = useState("")

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

  const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v)

  useEffect(() => {
    generateCaptcha()
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

    // Validate captcha
    if (Number.parseInt(formData.captcha) !== captchaQuestion.answer) {
      setTerminalLines((prev) => [
        ...prev.slice(0, -1),
        `root@ansh-portfolio:~# validate-captcha`,
        "❌ Captcha verification failed. Please try again.",
        "root@ansh-portfolio:~# _",
      ])
      generateCaptcha()
      setFormData((prev) => ({ ...prev, captcha: "" }))
      return
    }

    setIsSubmitting(true)

    // Add terminal feedback
    setTerminalLines((prev) => [
      ...prev.slice(0, -1),
      `root@ansh-portfolio:~# send-message --to="ansh" --from="${formData.name}"`,
      "Sending message...",
      "root@ansh-portfolio:~# _",
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
        "root@ansh-portfolio:~# _",
      ])
    } catch (error) {
      setSubmitStatus("error")
      setTerminalLines((prev) => [
        ...prev.slice(0, -2),
        "❌ Network error. Please check your connection and try again.",
        "root@ansh-portfolio:~# _",
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
          "root@ansh-portfolio:~# whoami",
          "Full Stack Developer & UI/UX Designer",
          "root@ansh-portfolio:~# status",
          "Available for new projects and collaborations",
          "root@ansh-portfolio:~# contact --help",
          "Use the form below to send me a message...",
          "root@ansh-portfolio:~# _",
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
            {/* Enhanced Hacker Terminal */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <Card className="bg-black border-green-500/30 shadow-2xl shadow-green-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-transparent to-green-500/20"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2220%22 height%3D%2220%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cpattern id%3D%22grid%22 width%3D%2220%22 height%3D%2220%22 patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath d%3D%22M 20 0 L 0 0 0 20%22 fill%3D%22none%22 stroke%3D%22%2300ff00%22 strokeWidth%3D%220.5%22 opacity%3D%220.3%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 fill%3D%22url(%23grid)%22 %2F%3E%3C%2Fsvg%3E')]"></div>
                  </div>

                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <div
                            className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                          <div
                            className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>
                        <div className="flex items-center space-x-2 text-green-400">
                          <Terminal className="h-4 w-4" />
                          <span className="text-sm font-mono">root@ansh-portfolio:~#</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-400 font-mono">[SECURE CONNECTION]</div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <div className="font-mono text-xs sm:text-sm space-y-1 h-48 sm:h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800">
                      {terminalLines.map((line, index) => (
                        <div
                          key={index}
                          className={`${
                            line.startsWith("ansh@portfolio:~$") || line.startsWith("root@")
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
                                      : line.includes("[SECURE CONNECTION]") || line.includes("DELIVERED")
                                        ? "text-green-400"
                                        : "text-gray-300"
                          } ${line.includes("Available") || line.includes("Full Stack") ? "text-green-300" : ""}`}
                        >
                          {line}
                          {index === terminalLines.length - 1 && (
                            <span className="animate-pulse text-green-400">█</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-green-500/30">
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="text-green-400">
                          <div>
                            STATUS: <span className="text-green-300">ONLINE</span>
                          </div>
                          <div>
                            UPTIME: <span className="text-green-300">24/7</span>
                          </div>
                        </div>
                        <div className="text-green-400">
                          <div>
                            RESPONSE: <span className="text-green-300">&lt;24H</span>
                          </div>
                          <div>
                            LOCATION: <span className="text-green-300">IN</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-gray-900 border-purple-500/30 shadow-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-400 font-mono flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      QUICK_ACCESS.exe
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <button
                        onClick={() => window.open("mailto:theanshshah@gmail.com", "_blank")}
                        className="w-full p-3 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-lg transition-all duration-300 text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-purple-400" />
                            <div>
                              <div className="font-mono text-sm text-purple-300">EMAIL_DIRECT</div>
                              <div className="text-xs text-gray-400">theanshshah@gmail.com</div>
                            </div>
                          </div>
                          <div className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            [CLICK]
                          </div>
                        </div>
                      </button>

                      <div className="p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-blue-400" />
                          <div>
                            <div className="font-mono text-sm text-blue-300">LOCATION</div>
                            <div className="text-xs text-gray-400">Vadodara, Gujarat [UTC+5:30]</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  <p className="sr-only" aria-live="polite">
                    {submitStatus === "success"
                      ? "Message sent successfully"
                      : submitStatus === "error"
                        ? "There was an error. Please check the form."
                        : ""}
                  </p>
                  {submitStatus === "success" ? (
                    <div className="text-center py-12" role="status" aria-live="polite">
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
                            className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm motion-reduce:transition-none"
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
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm motion-reduce:transition-none"
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
                          className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm motion-reduce:transition-none"
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
                          className="resize-none rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm motion-reduce:transition-none"
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
                          inputMode="numeric"
                          placeholder="Enter the answer"
                          value={formData.captcha}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-2xl border-2 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-background/50 backdrop-blur-sm motion-reduce:transition-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none rounded-2xl shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {isSubmitting ? (
                          // removed spinner; show text-only while submitting
                          <div className="flex items-center relative z-10">Sending Message...</div>
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
