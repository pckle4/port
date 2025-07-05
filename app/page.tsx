import { EnhancedHeader } from "@/components/enhanced-header"
import { MobileOptimizedHero } from "@/components/mobile-optimized-hero"
import { AboutSection } from "@/components/about-section"
import { EnhancedSkills } from "@/components/enhanced-skills"
import { MobileOptimizedProjects } from "@/components/mobile-optimized-projects"
import { ContactSection } from "@/components/contact-section"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { PerformanceOptimizedLayout } from "@/components/performance-optimized-layout"

export default function Page() {
  return (
    <PerformanceOptimizedLayout>
      <div className="min-h-screen">
        <EnhancedHeader />
        <main>
          <MobileOptimizedHero />
          <AboutSection />
          <EnhancedSkills />
          <MobileOptimizedProjects />
          <ContactSection />
        </main>
        <EnhancedFooter />
        <MobileNavigation />
      </div>
    </PerformanceOptimizedLayout>
  )
}
