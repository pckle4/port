
"use client"

import React, { useEffect, useMemo, useRef, useState, Suspense } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { EnhancedHeader } from "./enhanced-header"
import EnhancedFooter from "./enhanced-footer"
import {
  Mail,
  Linkedin,
  Github,
  GraduationCap,
  Code,
  Briefcase,
  ExternalLink,
  Download,
  ArrowLeft,
  MapPin,
  BookOpen,
  Cpu,
  Trophy,
  Rocket,
  Layers,
  Globe,
  Star,
  Terminal,
  Database,
  Layout,
  Smartphone,
  Server,
  Wrench,
  CheckCircle2,
  Loader2,
  Check,
  Calendar,
  Building2,
  Award,
  FileText,
  User
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    linkedin: string
    github: string
  }
  education: {
    institution: string
    degree: string
    duration: string
    location: string
  }
  coursework: string[]
  technicalSkills: {
    languages: string
    tools: string
    technologies: string
  }
  projects: {
    title: string
    tech: string
    date: string
    link: string
    points: string[]
    icon?: React.ElementType
  }[]
  leadership: {
    title: string
    role: string
    org: string
    date: string
    points: string[]
  }[]
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "Ansh Shah",
    email: "theanshshah@gmail.com",
    linkedin: "linkedin.com/in/anshshahh",
    github: "github.com/theanshshah",
  },
  education: {
    institution: "Sardar Vallabhbhai Patel Institute of Technology, Vasad",
    degree: "Bachelor of Engineering in Computer Engineering",
    duration: "Sep. 2022 – Jun 2026",
    location: "Vadodara, Gujarat",
  },
  coursework: [
    "Data Structures",
    "Algorithms Analysis",
    "Database Management",
    "OOP",
    "Computer Networks",
    "DBMS",
    "OS",
    "Computer Architecture",
  ],
  technicalSkills: {
    languages: "Java, C, C#, HTML/CSS, JavaScript, TypeScript, C++, SQL",
    tools: "VS Code, Eclipse, Android Studio, Git, Docker, Kubernetes",
    technologies: "Linux, GitHub, WordPress, React, Node.js, .NET, Next.js",
  },
  projects: [
    {
      title: "Link File Sharing",
      tech: "React, Tailwind CSS",
      date: "November 2025",
      link: "https://l.nowhile.com",
      icon: Globe,
      points: [
        "Architected a lightweight, frontend-only file sharing solution using React and Tailwind CSS, completely eliminating the need for backend infrastructure or external databases.",
        "Implemented secure client-side logic to handle file processing and link generation, ensuring user data privacy and instant performance without server latency.",
        "Designed a minimalist, highly responsive user interface that focuses on speed and accessibility across all device types.",
      ],
    },
    {
      title: "Resume Generator",
      tech: "TypeScript, Shadcn, ReactJS",
      date: "January 2025",
      link: "https://resume.nowhile.com",
      icon: Layout,
      points: [
        "Developed a responsive resume generator web application using React, TypeScript, and Tailwind CSS to enable users to create professional resumes with an intuitive interface and real-time preview functionality.",
        "Implemented dynamic form validation and state management to ensure data integrity while allowing users to customize resume sections, formatting, and styling options seamlessly.",
        "Designed a component-based architecture with reusable UI elements and modular TypeScript interfaces to maintain code scalability and type safety throughout the application.",
        "Deployed the application on Vercel with optimized build configuration and responsive design principles, ensuring cross-device compatibility and fast loading times for enhanced user experience.",
      ],
    },
    {
      title: "P2P File Transfer app",
      tech: "HTML, CSS, Javascript",
      date: "January 2025",
      link: "https://file.nowhile.com",
      icon: Server,
      points: [
        "Developed a peer-to-peer file transfer application using vanilla JavaScript that enables secure file sharing between users after establishing a direct connection.",
        "Implemented real-time chat functionality alongside file transfer capabilities, allowing users to communicate seamlessly during the file sharing process.",
        "Built connection management system with vanilla JavaScript to handle peer-to-peer networking and ensure reliable data transmission between connected users.",
      ],
    },
    {
      title: "QR Code Generator",
      tech: "React, Typescript, Tailwind CSS",
      date: "March 2025",
      link: "https://qr.nowhile.com",
      icon: Smartphone,
      points: [
        "Built a versatile QR code generator using React, TypeScript, and Tailwind CSS supporting multiple data types including URLs, text, location coordinates, dates, and business contact information.",
        "Implemented 10+ types of dynamic QR code generation with real-time preview functionality, allowing users to instantly visualize and customize QR codes for various use cases.",
        "Designed responsive user interface with input validation and error handling to ensure seamless QR code creation across different devices and screen sizes.",
      ],
    },
  ],
  leadership: [
    {
      title: "MECIA Hacks",
      role: "Technical Head",
      org: "SVIT",
      date: "Sep 2024",
      points: [
        "Served as Tech Head for MECIA Hacks, leading frontend development and overseeing technical implementation of event management systems. Managed Over 250+ Students overall.",
        "Developed QR code-based attendance tracking system with scanner functionality to automatically log participant check-ins and check-outs.",
        "Maintained comprehensive attendance records and participant data through automated QR code scanning integration.",
      ],
    },
  ],
}

const splitSkills = (str: string) => str.split(',').map(s => s.trim());

export default function ResumePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [resumeData] = useState<ResumeData>(defaultResumeData)
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle')
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (downloadState !== 'idle') return
    
    setDownloadState('downloading')
    
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Ansh_Shah_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    setDownloadState('done')
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    setDownloadState('idle')
  }

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

  return (
    <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden">
      <div className="">
        <Suspense fallback={null}>
          <EnhancedHeader />
        </Suspense>
      </div>

      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
         <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <section className="py-12 pt-28 sm:pt-32 relative">
        <div
          ref={sectionRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className={`mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button variant="ghost" className="rounded-full hover:bg-muted/50 group px-4" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                  </Link>
                </Button>
                
                <Button
                  onClick={handleDownload}
                  disabled={downloadState === 'downloading'}
                  className={cn(
                    "rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 min-w-[180px]",
                    downloadState === 'done' 
                      ? "bg-green-600 hover:bg-green-600 text-white" 
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  {downloadState === 'idle' && (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </>
                  )}
                  {downloadState === 'downloading' && (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Downloading...
                    </>
                  )}
                  {downloadState === 'done' && (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Downloaded!
                    </>
                  )}
                </Button>
            </div>

            <div
              className={`text-center mb-10 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-block p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4 backdrop-blur-sm border border-white/10 shadow-xl">
                 <User className="w-12 h-12 text-foreground/80" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                {resumeData.personalInfo.name}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base mt-6">
                 <a href={`mailto:${resumeData.personalInfo.email}`} className="group flex items-center text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-full bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10" aria-label="Send email">
                    <div className="p-1.5 bg-purple-500/10 rounded-full mr-2 group-hover:bg-purple-500/20 transition-colors">
                        <Mail className="h-4 w-4 text-purple-500" />
                    </div>
                    {resumeData.personalInfo.email}
                 </a>
                 <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="group flex items-center text-muted-foreground hover:text-blue-500 transition-all px-4 py-2 rounded-full bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10" aria-label="View LinkedIn profile">
                    <div className="p-1.5 bg-blue-500/10 rounded-full mr-2 group-hover:bg-blue-500/20 transition-colors">
                        <Linkedin className="h-4 w-4 text-blue-500" />
                    </div>
                    LinkedIn
                 </a>
                 <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="group flex items-center text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-full bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/10" aria-label="View GitHub profile">
                    <div className="p-1.5 bg-gray-500/10 rounded-full mr-2 group-hover:bg-gray-500/20 transition-colors">
                        <Github className="h-4 w-4 text-foreground" />
                    </div>
                    GitHub
                 </a>
              </div>
            </div>

            <div className="grid gap-8">
              
              <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl shadow-sm">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold">Education</h3>
                </div>
                
                <Card className="group overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-125">
                         <GraduationCap className="h-24 w-24 text-blue-500" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-2 mb-4">
                        <div>
                            <h3 className="font-bold text-lg md:text-xl text-foreground/90">{resumeData.education.institution}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                <p className="text-muted-foreground font-medium">{resumeData.education.degree}</p>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-start md:items-end mt-2 md:mt-0">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mb-2">
                                <Calendar className="w-3 h-3 mr-1.5" />
                                {resumeData.education.duration}
                            </span>
                            <span className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {resumeData.education.location}
                            </span>
                        </div>
                        </div>
                        
                        <div className="mt-6">
                            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                                <Layers className="h-3 w-3" />
                                Relevant Coursework
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.coursework.map((course, i) => (
                                    <span key={i} className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium bg-secondary/50 border border-border/50 text-foreground/80 hover:bg-secondary transition-colors cursor-default">
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl shadow-sm">
                        <Cpu className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold">Technical Skills</h3>
                </div>

                <Card className="group border-border/50 bg-background/50 backdrop-blur-sm hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
                  <CardContent className="p-6 grid gap-6">
                    <div className="flex flex-col md:flex-row gap-4">
                         <div className="w-40 shrink-0 flex items-center gap-2 font-semibold text-sm text-foreground/90">
                            <div className="p-1.5 bg-pink-100/50 dark:bg-pink-900/20 rounded-lg">
                                <Terminal className="h-4 w-4 text-pink-500" />
                            </div>
                            Languages
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {splitSkills(resumeData.technicalSkills.languages).map((skill, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-pink-500/5 border border-pink-500/20 text-pink-600 dark:text-pink-300">
                                    {skill}
                                </span>
                            ))}
                         </div>
                    </div>

                    <div className="h-px bg-border/40" />

                    <div className="flex flex-col md:flex-row gap-4">
                         <div className="w-40 shrink-0 flex items-center gap-2 font-semibold text-sm text-foreground/90">
                            <div className="p-1.5 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg">
                                <Wrench className="h-4 w-4 text-orange-500" />
                            </div>
                            Tools
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {splitSkills(resumeData.technicalSkills.tools).map((skill, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-orange-500/5 border border-orange-500/20 text-orange-600 dark:text-orange-300">
                                    {skill}
                                </span>
                            ))}
                         </div>
                    </div>

                    <div className="h-px bg-border/40" />

                     <div className="flex flex-col md:flex-row gap-4">
                         <div className="w-40 shrink-0 flex items-center gap-2 font-semibold text-sm text-foreground/90">
                            <div className="p-1.5 bg-cyan-100/50 dark:bg-cyan-900/20 rounded-lg">
                                <Globe className="h-4 w-4 text-cyan-500" />
                            </div>
                            Technologies
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {splitSkills(resumeData.technicalSkills.technologies).map((skill, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-cyan-500/5 border border-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                                    {skill}
                                </span>
                            ))}
                         </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-pink-100 dark:bg-pink-900/30 rounded-xl shadow-sm">
                        <Rocket className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold">Projects</h3>
                </div>

                <div className="grid gap-4">
                    {resumeData.projects.map((project, idx) => (
                        <Card key={idx} className="group border-border/50 bg-background/50 backdrop-blur-sm hover:border-pink-500/30 hover:shadow-md transition-all duration-300">
                            <CardContent className="p-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="p-2 rounded-lg bg-secondary group-hover:bg-pink-500/10 group-hover:text-pink-600 transition-colors">
                                            {project.icon ? <project.icon className="h-5 w-5" /> : <Code className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-foreground group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors flex items-center gap-2">
                                                {project.title}
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="inline-flex items-center justify-center p-1 rounded-full text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10 transition-colors"
                                                    title="View Live"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                </a>
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">{project.tech}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full border border-border/50 self-start sm:self-center flex items-center">
                                        <Calendar className="w-3 h-3 mr-1.5 opacity-70" />
                                        {project.date}
                                    </span>
                                </div>
                                <div className="pl-2 border-l-2 border-pink-500/20 group-hover:border-pink-500/50 transition-colors ml-4 sm:ml-6 mt-3">
                                    <ul className="space-y-2">
                                        {project.points.map((point, i) => (
                                            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 mr-2 mt-1 text-pink-500/70 shrink-0" />
                                                <span className="opacity-90">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                      <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tech.split(',').map((tag, tagIdx) => (
                                        <span key={tagIdx} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30">
                                          {tag.trim()}
                                        </span>
                                        ))}
                                      </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
              </div>

              <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl shadow-sm">
                        <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold">Leadership</h3>
                </div>

                {resumeData.leadership.map((item, idx) => (
                  <Card key={idx} className="border-border/50 bg-background/60 backdrop-blur-sm hover:border-yellow-500/30 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
                        <div>
                          <h4 className="font-bold text-lg flex items-center gap-2">
                            {item.title}
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
                              {item.role}
                            </span>
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                            {item.org}
                          </p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <span className="inline-flex items-center text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md border border-border/50">
                            <Calendar className="w-3 h-3 mr-1.5 opacity-70" />
                            {item.date}
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-3">
                        {item.points.map((point, i) => (
                          <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start">
                            <Star className="w-3.5 h-3.5 mr-2 mt-1 text-yellow-500 shrink-0 fill-yellow-500" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="">
        <EnhancedFooter />
      </div>
    </div>
  )
}
