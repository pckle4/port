
"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Send, CheckCircle, AlertCircle, Check, Copy, Terminal as TerminalIcon } from "lucide-react"
import { cn } from "../lib/utils"

const TerminalDisplay = ({ isVisible }: { isVisible: boolean }) => {
    const [showContent, setShowContent] = useState(false)
    
    useEffect(() => {
        if (!isVisible) return
        const timer = setTimeout(() => setShowContent(true), 400)
        return () => clearTimeout(timer)
    }, [isVisible])

    const copyEmail = () => {
        navigator.clipboard.writeText("theanshshah@gmail.com")
    }

    return (
        <div className="w-full rounded-lg bg-[#1a1b26] border border-gray-800 shadow-xl overflow-hidden font-mono text-[10px] sm:text-xs" style={{ contain: 'content' }}>
            <div className="bg-[#16161e] px-3 py-2 flex items-center justify-between border-b border-gray-800">
                <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                    <TerminalIcon className="w-3 h-3" />
                    <span>zsh</span>
                </div>
            </div>

            <div className="p-4 sm:p-5 h-[240px] sm:h-[300px] overflow-y-auto text-gray-300 relative">
                <div className="space-y-1">
                    <div className="flex items-center">
                        <span className="text-[#a6808c] dark:text-[#cc8b86] mr-2">➜</span>
                        <span className="text-[#7d4f50] dark:text-[#d1be9c] mr-2">~</span>
                        <span className="text-[#565264] dark:text-[#d6cfcb] font-medium">fetch_contact_info.sh</span>
                    </div>
                    <div className="text-green-500 mt-1">✓ Access Granted</div>
                    
                    {showContent && (
                        <div className="mt-4 animate-fade-in space-y-1">
                            <div className="text-yellow-400">{"{"}</div>
                            <div className="pl-4">
                                <span className="text-purple-400">"status"</span>: <span className="text-green-400">"available"</span>,
                            </div>
                            <div className="pl-4">
                                <span className="text-purple-400">"email"</span>: <span className="text-blue-400 cursor-pointer hover:underline" onClick={copyEmail}>"theanshshah@gmail.com"</span>,
                            </div>
                            <div className="pl-4">
                                <span className="text-purple-400">"location"</span>: <span className="text-orange-400">"Gujarat, India"</span>,
                            </div>
                            <div className="pl-4">
                                <span className="text-purple-400">"response_time"</span>: <span className="text-orange-400">"&lt; 24h"</span>
                            </div>
                            <div className="text-[#565264] dark:text-[#ccb7ae]">{"}"}</div>
                            
                            <div className="flex items-center mt-4">
                                <span className="text-[#a6808c] dark:text-[#cc8b86] mr-2">➜</span>
                                <span className="text-[#7d4f50] dark:text-[#d1be9c] mr-2">~</span>
                                <span className="w-2 h-4 bg-[#7d4f50] dark:bg-[#d6cfcb] animate-pulse"></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function CompactContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    message?: string
    captcha?: string
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const [mathCaptcha, setMathCaptcha] = useState({ question: "", answer: 0 })
  const [captchaInput, setCaptchaInput] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [hp, setHp] = useState("")

  const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const question = `${num1} + ${num2}`
    setMathCaptcha({ question, answer: num1 + num2 })
  }

  useEffect(() => {
    generateMathCaptcha()
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
    const isValid = parseInt(captchaInput) === mathCaptcha.answer
    setCaptchaValid(isValid)
    if (isValid && errors.captcha) {
        setErrors(prev => ({ ...prev, captcha: undefined }))
    }
  }, [captchaInput, mathCaptcha.answer])

  const validateForm = () => {
    const newErrors: typeof errors = {}
    let isValid = true

    if (!formData.name.trim()) {
        newErrors.name = "Required"
        isValid = false
    }

    if (!formData.email.trim()) {
        newErrors.email = "Required"
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email"
        isValid = false
    }

    if (!formData.message.trim()) {
        newErrors.message = "Required"
        isValid = false
    }

    if (!captchaValid) {
        newErrors.captcha = "Incorrect"
        isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (hp) { setSubmitStatus("error"); return; }
    if (!validateForm()) {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 2000)
        return
    }

    setIsSubmitting(true)

    try {
        const recipient = "nowhile@icloud.com"
        const subject = `Portfolio Contact from ${formData.name}`

        const body = `${formData.message}%0D%0A%0D%0A------------------------------------------------%0D%0AName: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AVia: Portfolio`
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}&reply-to=${encodeURIComponent(formData.email)}`

        setSubmitStatus("success")
        setTimeout(() => {
            setFormData({ name: "", email: "", message: "" })
            setCaptchaInput("")
            generateMathCaptcha()
            setSubmitStatus("idle")
            setErrors({})
        }, 5000)
    } catch (error) {
        setSubmitStatus("error")
    } finally {
        setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 relative overflow-hidden bg-[#e6ded8] dark:bg-[#231e1c]" style={{ scrollMarginTop: '96px' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#a6808c]/10 dark:bg-[#cc8b86]/5 rounded-full blur-3xl -z-10" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Badge variant="outline" className="mb-4 border-[#7d4f50]/30 text-[#7d4f50] dark:border-[#cc8b86]/30 dark:text-[#cc8b86] bg-[#7d4f50]/5 dark:bg-[#cc8b86]/10">
              Contact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[#565264] dark:text-white">
              Get in <span className="text-[#a6808c] dark:text-[#cc8b86]">Touch</span>
            </h2>
            <p className="text-[#7d4f50] dark:text-[#d6cfcb] max-w-lg mx-auto text-sm sm:text-base font-medium">
              Have a project in mind? Let's build something extraordinary together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            
            <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <TerminalDisplay isVisible={isVisible} />
              
              <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                          <h3 className="text-sm font-semibold">Open for Collaboration</h3>
                          <p className="text-xs text-muted-foreground">Available for freelance and full-time roles.</p>
                      </div>
                  </div>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <Card className="border border-border/50 bg-background/50 backdrop-blur-xl shadow-lg">
                <CardContent className="p-5 sm:p-6">
                  {submitStatus === "success" ? (
                    <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Opening Mail Client...</h4>
                      <Button variant="outline" size="sm" onClick={() => setSubmitStatus("idle")}>
                        Reset Form
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" tabIndex={-1} aria-hidden="true" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="contact-name" className="text-xs font-medium ml-1">Name</label>
                          <Input
                            id="contact-name"
                            name="name"
                            
                            value={formData.name}
                            onChange={handleChange}
                            className={cn("bg-secondary/40 border-transparent focus:bg-background transition-all", errors.name && "border-red-500")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="contact-email" className="text-xs font-medium ml-1">Email</label>
                          <Input
                            id="contact-email"
                            name="email"
                            type="email"
                            
                            value={formData.email}
                            onChange={handleChange}
                            className={cn("bg-secondary/40 border-transparent focus:bg-background transition-all", errors.email && "border-red-500")}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-message" className="text-xs font-medium ml-1">Message</label>
                        <Textarea
                          id="contact-message"
                          name="message"
                          
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className={cn("bg-secondary/40 border-transparent focus:bg-background resize-none transition-all", errors.message && "border-red-500")}
                        />
                      </div>

                      <div className="flex items-end gap-3">
                         <div className="flex-1 space-y-1.5">
                            <label htmlFor="contact-captcha" className="text-xs font-medium ml-1 text-muted-foreground">Security: {mathCaptcha.question} = ?</label>
                            <div className="relative">
                                <Input
                                    id="contact-captcha"
                                    type="number"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    placeholder="Sum"
                                    className={cn("bg-secondary/40 border-transparent focus:bg-background pr-8", errors.captcha && "border-red-500")}
                                    aria-describedby="captcha-status"
                                />
                                {captchaInput && (
                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2" id="captcha-status" role="status">
                                        {captchaValid ? <Check className="w-3.5 h-3.5 text-green-500" aria-label="Correct" /> : <AlertCircle className="w-3.5 h-3.5 text-red-500" aria-label="Incorrect" />}
                                    </div>
                                )}
                            </div>
                         </div>
                         <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 h-10 bg-gradient-to-r from-[#cc8b86] to-[#a6808c] hover:from-[#b87a75] hover:to-[#967480] text-white shadow-md group relative overflow-hidden animate-pulse-ring"
                          >
                            {isSubmitting ? "Sending..." : <><span className="mr-2">Send</span> <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" /></>}
                          </Button>
                      </div>
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
