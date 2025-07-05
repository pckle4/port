"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Zap,
  Target,
  Users,
  TrendingUp,
} from "lucide-react"

// Floating animation component
function FloatingIcon({ icon: Icon, delay = 0, className = "" }) {
  return (
    <div
      className={`absolute animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "4s",
      }}
    >
      <Icon className="h-6 w-6 text-purple-400/30" />
    </div>
  )
}

// Section highlight component
function SectionHighlight({ children, isActive, color = "purple" }) {
  const colorClasses = {
    purple: "from-purple-500/20 to-blue-500/20 border-purple-500/50",
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/50",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/50",
    orange: "from-orange-500/20 to-red-500/20 border-orange-500/50",
    pink: "from-pink-500/20 to-purple-500/20 border-pink-500/50",
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/50",
  }

  return (
    <div className="relative">
      {children}
      {isActive && (
        <>
          <div
            className={`absolute -inset-4 bg-gradient-to-r ${colorClasses[color]} rounded-xl blur-lg animate-pulse`}
          />
          <div className={`absolute -inset-2 border-2 ${colorClasses[color].split(" ")[2]} rounded-lg animate-pulse`} />
        </>
      )}
    </div>
  )
}

export function AnimatedResumeSection() {
  const [highlightedSection, setHighlightedSection] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Section highlighting rotation
    const interval = setInterval(() => {
      setHighlightedSection((prev) => (prev + 1) % 6) // 6 sections
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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

  const skills = [
    { name: "React", level: 95, color: "bg-blue-500" },
    { name: "TypeScript", level: 90, color: "bg-blue-600" },
    { name: "Next.js", level: 88, color: "bg-gray-800" },
    { name: "Node.js", level: 85, color: "bg-green-600" },
    { name: "Python", level: 82, color: "bg-yellow-500" },
    { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
  ]

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2023 - Present",
      description: "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
      achievements: ["Increased app performance by 40%", "Led team of 5 developers", "Implemented CI/CD pipeline"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      period: "2021 - 2023",
      description: "Developed responsive web applications and improved user experience across multiple platforms.",
      achievements: ["Built 15+ responsive websites", "Reduced load time by 60%", "Mentored junior developers"],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      period: "2017 - 2021",
      gpa: "3.8/4.0",
      achievements: ["Dean's List", "Programming Competition Winner", "CS Society President"],
    },
  ]

  const projects = [
    {
      name: "E-commerce Platform",
      tech: ["React", "Node.js", "MongoDB"],
      description: "Full-stack e-commerce solution with payment integration",
      link: "#",
    },
    {
      name: "Task Management App",
      tech: ["Next.js", "TypeScript", "Prisma"],
      description: "Collaborative task management with real-time updates",
      link: "#",
    },
    {
      name: "Weather Dashboard",
      tech: ["Vue.js", "Express", "API Integration"],
      description: "Real-time weather monitoring with data visualization",
      link: "#",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon icon={Code} delay={0} className="top-20 left-20" />
        <FloatingIcon icon={Star} delay={1} className="top-32 right-32" />
        <FloatingIcon icon={Zap} delay={2} className="bottom-40 left-40" />
        <FloatingIcon icon={Target} delay={0.5} className="bottom-32 right-20" />
        <FloatingIcon icon={Users} delay={1.5} className="top-1/2 left-10" />
        <FloatingIcon icon={TrendingUp} delay={2.5} className="top-1/3 right-10" />
      </div>

      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-blue-50/20 to-cyan-50/20 dark:from-purple-950/5 dark:via-blue-950/5 dark:to-cyan-950/5" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionHighlight isActive={highlightedSection === 0} color="purple">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Resume & Experience
              </h2>
            </SectionHighlight>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my professional journey, skills, and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <SectionHighlight isActive={highlightedSection === 1} color="blue">
                <Card
                  className={`transition-all duration-700 hover:shadow-lg ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm">theanshshah@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                      <Phone className="h-4 w-4 text-muted-foreground group-hover:text-green-600 transition-colors" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                      <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-red-600 transition-colors" />
                      <span className="text-sm">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                      <Globe className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                      <span className="text-sm">anshshah.dev</span>
                    </div>
                  </CardContent>
                </Card>
              </SectionHighlight>

              {/* Skills */}
              <SectionHighlight isActive={highlightedSection === 2} color="green">
                <Card
                  className={`transition-all duration-700 hover:shadow-lg ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-green-600" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: isVisible ? `${skill.level}%` : "0%",
                              transitionDelay: `${600 + index * 100}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </SectionHighlight>

              {/* Social Links */}
              <SectionHighlight isActive={highlightedSection === 3} color="orange">
                <Card
                  className={`transition-all duration-700 hover:shadow-lg ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-orange-600" />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start group hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
                      asChild
                    >
                      <a href="https://linkedin.com/in/ansh" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                        LinkedIn Profile
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start group hover:bg-gray-50 dark:hover:bg-gray-900/20 bg-transparent"
                      asChild
                    >
                      <a href="https://github.com/ansh" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2 text-gray-800 dark:text-gray-200 group-hover:scale-110 transition-transform" />
                        GitHub Profile
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start group hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2 text-purple-600 group-hover:scale-110 transition-transform" />
                        Portfolio Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </SectionHighlight>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Experience */}
              <SectionHighlight isActive={highlightedSection === 4} color="pink">
                <Card
                  className={`transition-all duration-700 hover:shadow-lg ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-pink-600" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experiences.map((exp, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4 relative">
                        <div className="absolute -left-2 top-2 w-3 h-3 bg-pink-600 rounded-full" />
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-semibold text-lg">{exp.title}</h3>
                            <Badge variant="outline" className="w-fit">
                              <Calendar className="h-3 w-3 mr-1" />
                              {exp.period}
                            </Badge>
                          </div>
                          <p className="text-pink-600 font-medium">{exp.company}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-muted-foreground">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="text-sm text-muted-foreground flex items-start">
                                  <Star className="h-3 w-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </SectionHighlight>

              {/* Education */}
              <SectionHighlight isActive={highlightedSection === 5} color="cyan">
                <Card
                  className={`transition-all duration-700 hover:shadow-lg ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-cyan-600" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4 relative">
                        <div className="absolute -left-2 top-2 w-3 h-3 bg-cyan-600 rounded-full" />
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-semibold text-lg">{edu.degree}</h3>
                            <Badge variant="outline" className="w-fit">
                              <Calendar className="h-3 w-3 mr-1" />
                              {edu.period}
                            </Badge>
                          </div>
                          <p className="text-cyan-600 font-medium">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-muted-foreground">Achievements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {edu.achievements.map((achievement, achIndex) => (
                                <Badge key={achIndex} variant="secondary" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </SectionHighlight>

              {/* Projects */}
              <Card
                className={`transition-all duration-700 hover:shadow-lg ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    Featured Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 border border-muted rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20"
                          asChild
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Download Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Download Full Resume
                  <Zap className="h-4 w-4 ml-2 group-hover:animate-pulse" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
