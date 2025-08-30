"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, User, AtSign, MessageSquare, CheckCircle, Terminal, Code, Zap } from "lucide-react"

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

  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [mathCaptcha, setMathCaptcha] = useState({ question: "", answer: 0 })
  const [captchaInput, setCaptchaInput] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [hp, setHp] = useState("")

  const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const operators = ["+", "-", "*"]
    const operator = operators[Math.floor(Math.random() * operators.length)]

    let answer = 0
    let question = ""

    switch (operator) {
      case "+":
        answer = num1 + num2
        question = `${num1} + ${num2}`
        break
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`
        break
      case "*":
        const smallNum1 = Math.floor(Math.random() * 10) + 1
        const smallNum2 = Math.floor(Math.random() * 10) + 1
        answer = smallNum1 * smallNum2
        question = `${smallNum1} × ${smallNum2}`
        break
    }

    setMathCaptcha({ question, answer })
  }

  useEffect(() => {
    const commands = [
      "$ initializing secure connection...",
      "$ loading contact protocols...",
      "$ establishing encrypted channel...",
      "$ ready for communication >",
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < commands.length) {
        setTerminalLines((prev) => [...prev, commands[index]])
        index++
      } else {
        clearInterval(interval)
      }
    }, 800)

    generateMathCaptcha()

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setCaptchaValid(Number.parseInt(captchaInput) === mathCaptcha.answer)
  }, [captchaInput, mathCaptcha.answer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp) {
      setSubmitStatus("error")
      return
    }

    if (!captchaValid) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")

      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" })
        setCaptchaInput("")
        generateMathCaptcha()
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

  return (
    <section id="contact" className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #00ff00 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #0080ff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Initialize Connection
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Establishing secure communication channel...
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <Card className="bg-black/90 border-green-500/30 shadow-2xl shadow-green-500/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-green-500/30">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-green-400 text-sm font-mono ml-4">terminal@portfolio:~$</span>
                  </div>

                  <div className="p-4 h-64 overflow-y-auto font-mono text-sm">
                    {terminalLines.map((line, index) => (
                      <div key={index} className="text-green-400 mb-1 animate-pulse">
                        {line}
                      </div>
                    ))}

                    <div className="mt-4 space-y-2">
                      <div className="text-cyan-400">
                        <Terminal className="inline w-4 h-4 mr-2" />
                        Quick Access Panel
                      </div>
                      <div className="pl-6 space-y-1">
                        <div className="text-green-300 hover:text-green-100 cursor-pointer transition-colors">
                          <Mail className="inline w-3 h-3 mr-2" />
                          <a href="mailto:theanshshah@gmail.com">theanshshah@gmail.com</a>
                        </div>
                        <div className="text-blue-300 hover:text-blue-100 cursor-pointer transition-colors">
                          <Code className="inline w-3 h-3 mr-2" />
                          Status: Available for projects
                        </div>
                        <div className="text-purple-300 hover:text-purple-100 cursor-pointer transition-colors">
                          <Zap className="inline w-3 h-3 mr-2" />
                          Response time: &lt; 24h
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-green-400">
                      <span className="animate-pulse">█</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-6">
                  <p className="sr-only" aria-live="polite">
                    {submitStatus === "success"
                      ? "Message sent successfully"
                      : submitStatus === "error"
                        ? "There was an error. Please check and try again."
                        : ""}
                  </p>
                  {submitStatus === "success" ? (
                    <div className="text-center py-8" role="status" aria-live="polite">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">Thank you for reaching out! I'll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-10 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 motion-reduce:transition-none"
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
                            inputMode="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-10 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 motion-reduce:transition-none"
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
                          className="resize-none rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 motion-reduce:transition-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="captcha" className="text-sm font-medium flex items-center">
                          <Terminal className="h-4 w-4 mr-1" />
                          Security Check: What is {mathCaptcha.question}?
                        </label>
                        <Input
                          id="captcha"
                          type="number"
                          inputMode="numeric"
                          placeholder="Enter the answer"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          required
                          className={`h-10 rounded-lg border-2 transition-all duration-200 ${
                            captchaInput &&
                            (captchaValid
                              ? "border-green-500 focus:ring-green-500/20"
                              : "border-red-500 focus:ring-red-500/20")
                          } motion-reduce:transition-none`}
                          aria-invalid={!!captchaInput && !captchaValid}
                          aria-describedby={!captchaValid && captchaInput ? "captcha-error" : undefined}
                        />
                        {captchaInput && !captchaValid && (
                          <p id="captcha-error" className="text-red-500 text-xs">
                            Incorrect answer. Please try again.
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || !captchaValid}
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          // removed spinner; show text-only while submitting
                          <div className="flex items-center">Transmitting...</div>
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
