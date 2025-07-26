"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EnhancedHeader } from "@/components/enhanced-header"
import { EnhancedFooter } from "@/components/enhanced-footer"
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Calendar,
  GraduationCap,
  Code,
  Briefcase,
  Award,
  ExternalLink,
  User,
  BookOpen,
  Cpu,
  Database,
  Globe,
  Monitor,
  GitBranch,
  Terminal,
  Layers,
  Download,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

const personalInfo = {
  name: "Ansh Shah",
  email: "theanshshah@gmail.com",
  linkedin: "linkedin.com/in/ansh",
  github: "github.com/ansh",
}

const education = {
  institution: "Sardar Vallabhbhai Patel Institute of Technology, Vasad",
  degree: "Bachelor of Engineering in Computer Engineering",
  duration: "Sep. 2022 – Jun 2026",
  location: "Vadodara, Gujarat",
  cgpa: "8.74",
}

const coursework = [
  { name: "Data Structures", icon: Layers },
  { name: "WordPress", icon: Globe },
  { name: "Algorithms Analysis", icon: Cpu },
  { name: "Database Management", icon: Database },
  { name: "OOP", icon: Code },
  { name: "Computer Networks", icon: Globe },
  { name: "DBMS", icon: Database },
  { name: "Computer Architecture", icon: Monitor },
]

const technicalSkills = {
  languages: ["Python", "Java", "C", "HTML/CSS", "JavaScript", "C++", "SQL"],
  tools: ["VS Code", "Eclipse", "Android Studio"],
  technologies: ["Linux", "Git", "GitHub", "WordPress"],
}

const projects = [
  {
    title: "Resume Generator",
    technologies: ["TypeScript", "Shadcn", "ReactJS"],
    date: "January 2025",
    liveDemo: "#",
    description: [
      "Developed a responsive resume generator web application using React, TypeScript, and Tailwind CSS to enable users to create professional resumes with an intuitive interface and real-time preview functionality.",
      "Implemented dynamic form validation and state management to ensure data integrity while allowing users to customize resume sections, formatting, and styling options seamlessly.",
      "Designed a component-based architecture with reusable UI elements and modular TypeScript interfaces to maintain code scalability and type safety throughout the application.",
      "Deployed the application on Vercel with optimized build configuration and responsive design principles, ensuring cross-device compatibility and fast loading times for enhanced user experience.",
    ],
  },
  {
    title: "P2P File Transfer app",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "January 2025",
    liveDemo: "#",
    description: [
      "Developed a peer-to-peer file transfer application using vanilla JavaScript that enables secure file sharing between users after establishing a direct connection.",
      "Implemented real-time chat functionality alongside file transfer capabilities, allowing users to communicate seamlessly during the file sharing process.",
      "Built connection management system with vanilla JavaScript to handle peer-to-peer networking and ensure reliable data transmission between connected users.",
    ],
  },
  {
    title: "QR Code Generator",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    date: "March 2025",
    liveDemo: "#",
    description: [
      "Built a versatile QR code generator using React, TypeScript, and Tailwind CSS supporting multiple data types including URLs, text, location coordinates, dates, and business contact information.",
      "Implemented dynamic QR code generation with real-time preview functionality, allowing users to instantly visualize and customize QR codes for various use cases.",
      "Designed responsive user interface with input validation and error handling to ensure seamless QR code creation across different devices and screen sizes.",
    ],
  },
]

const leadership = {
  title: "MECIA Hacks",
  role: "Technical Head",
  organization: "SVIT",
  date: "Sep 2024",
  description: [
    "Served as Tech Head for Media Hacks, leading frontend development and overseeing technical implementation of event management systems.",
    "Developed QR code-based attendance tracking system with scanner functionality to automatically log participant check-ins and check-outs.",
    "Maintained comprehensive attendance records and participant data through automated QR code scanning integration.",
  ],
}

export default function ResumePage() {
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
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleDownloadPDF = () => {
    // Create a comprehensive resume content for PDF
    const resumeContent = `
ANSH SHAH
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}

EDUCATION
${education.institution}
${education.degree} (CGPA: ${education.cgpa})
${education.duration} | ${education.location}

RELEVANT COURSEWORK
${coursework.map((course) => `• ${course.name}`).join("\n")}

TECHNICAL SKILLS
Languages: ${technicalSkills.languages.join(", ")}
Developer Tools: ${technicalSkills.tools.join(", ")}
Technologies/Frameworks: ${technicalSkills.technologies.join(", ")}

PROJECTS
${projects
  .map(
    (project) => `
${project.title} | ${project.technologies.join(", ")} | ${project.date}
${project.description.map((desc) => `• ${desc}`).join("\n")}
`,
  )
  .join("\n")}

LEADERSHIP / EXTRACURRICULAR
${leadership.title} | ${leadership.role} | ${leadership.organization} | ${leadership.date}
${leadership.description.map((desc) => `• ${desc}`).join("\n")}
    `

    // Create and download the file
    const blob = new Blob([resumeContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Ansh_Shah_Resume.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      <section className="py-12 pt-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 dark:from-purple-950/5 dark:via-blue-950/5 dark:to-cyan-950/5" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div
              className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="flex items-center justify-between mb-8">
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Portfolio
                  </Link>
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Resume
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                Full Stack Developer & Computer Engineering Student
              </p>
            </div>

            <div className="grid gap-8">
              {/* Personal Information */}
              <Card
                className={`shadow-lg border-0 bg-gradient-to-br from-background to-muted/30 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl sm:text-2xl">
                    <User className="h-6 w-6 mr-2 text-purple-600" />
                    {personalInfo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="text-sm sm:text-base">{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                      <span className="text-sm sm:text-base">{personalInfo.linkedin}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <span className="text-sm sm:text-base">{personalInfo.github}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card
                className={`shadow-lg border-0 bg-gradient-to-br from-background to-muted/30 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">{education.institution}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">{education.degree}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{education.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{education.location}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        >
                          CGPA: {education.cgpa}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Relevant Coursework */}
              <Card
                className={`shadow-lg border-0 bg-gradient-to-br from-background to-muted/30 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <BookOpen className="h-6 w-6 mr-2 text-orange-600" />
                    Relevant Coursework
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {coursework.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <course.icon className="h-4 w-4 text-purple-600" />
                        <span className="text-xs sm:text-sm font-medium">{course.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technical Skills */}
              <Card
                className={`shadow-lg border-0 bg-gradient-to-br from-background to-muted/30 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Code className="h-6 w-6 mr-2 text-green-600" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                      <Terminal className="h-4 w-4 mr-2 text-blue-600" />
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.languages.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-xs sm:text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                      <Monitor className="h-4 w-4 mr-2 text-purple-600" />
                      Developer Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.tools.map((tool) => (
                        <Badge
                          key={tool}
                          variant="outline"
                          className="bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-xs sm:text-sm"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                      <GitBranch className="h-4 w-4 mr-2 text-green-600" />
                      Technologies/Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-xs sm:text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card
                className={`shadow-lg border-0 bg-gradient-to-br from-background to-muted/30 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Briefcase className="h-6 w-6 mr-2 text-cyan-600" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {projects.map((project, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-base sm:text-lg font-semibold">{project.title}</h3>
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <ExternalLink className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs sm:text-sm text-muted-foreground">{project.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {project.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start space-x-2 text-muted-foreground">
                            <span className="text-purple-600 mt-1.5">•</span>
                            <span className="text-xs sm:text-sm leading-relaxed">{desc}</span>
                          </li>
                        ))}
                      </ul>
                      {index < projects.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Leadership */}
              <Card
                className={`shadow-lg border-0 bg-gradient-to-br from-background to-muted/30 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Award className="h-6 w-6 mr-2 text-yellow-600" />
                    Leadership / Extracurricular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold">{leadership.title}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          {leadership.role} • {leadership.organization}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{leadership.date}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {leadership.description.map((desc, index) => (
                        <li key={index} className="flex items-start space-x-2 text-muted-foreground">
                          <span className="text-yellow-600 mt-1.5">•</span>
                          <span className="text-xs sm:text-sm leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <EnhancedFooter />
    </div>
  )
}
