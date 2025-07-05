import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar, Star, Eye } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"

const projects = [
  {
    title: "Resume Generator",
    description: "A responsive resume generator web application using React, TypeScript, and Tailwind CSS.",
    image: "/projects/resume-generator.jpeg",
    technologies: ["TypeScript", "React", "Tailwind CSS"],
    date: "Jan 2025",
    liveUrl: "#",
    githubUrl: "#",
    features: ["Dynamic form validation", "Real-time preview", "PDF export"],
    status: "Completed",
    category: "Web App",
  },
  {
    title: "P2P File Transfer",
    description: "Peer-to-peer file transfer application with real-time chat functionality.",
    image: "/projects/file-transfer.jpeg",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Jan 2025",
    liveUrl: "#",
    githubUrl: "#",
    features: ["Real-time chat", "P2P connection", "Secure transfer"],
    status: "Completed",
    category: "Networking",
  },
  {
    title: "QR Code Generator",
    description: "Versatile QR code generator supporting multiple data types and formats.",
    image: "/projects/qr-generator.jpeg",
    technologies: ["React", "TypeScript", "CSS"],
    date: "Mar 2025",
    liveUrl: "#",
    githubUrl: "#",
    features: ["Multiple formats", "Real-time preview", "Download options"],
    status: "Completed",
    category: "Utility",
  },
]

export function OptimizedProjects() {
  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-muted/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden relative max-w-sm mx-auto"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-40">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    width={320}
                    height={160}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-black/20 text-white border-0 backdrop-blur-sm text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="secondary"
                      className={`border-0 backdrop-blur-sm text-xs ${
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 w-8 h-8 p-0"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 w-8 h-8 p-0"
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-xs">{project.date}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className={`text-xs transition-all duration-300 hover:scale-105 cursor-default ${
                          techIndex % 4 === 0
                            ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                            : techIndex % 4 === 1
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                              : techIndex % 4 === 2
                                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                                : "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-muted-foreground flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start">
                          <span className="text-primary mr-2 mt-0.5 text-xs">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-8"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span className="text-xs">Demo</span>
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 h-8"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        <span className="text-xs">Code</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
