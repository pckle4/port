import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-60 md:h-60 bg-background rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl md:text-6xl">👨‍💻</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with experience creating digital solutions that make a difference.
                I specialize in modern web technologies and love bringing creative ideas to life.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, working on creative projects, and
                continuously learning about the latest developments in web development and design.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Card>
                  <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">15+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">2+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
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
