import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 sm:mb-12">About Me</h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <div className="w-44 h-44 sm:w-60 sm:h-60 bg-background rounded-full flex items-center justify-center">
                  <span className="text-4xl sm:text-6xl">👨‍💻</span>
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with experience creating digital solutions that make a difference.
                I specialize in modern web technologies and love bringing creative ideas to life.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, working on creative projects, and
                continuously learning about the latest developments in web development and design.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">15+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">2+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
