import { EnhancedHeader } from "@/components/enhanced-header"
import { OptimizedMobileHero } from "@/components/optimized-mobile-hero"
import { AboutSection } from "@/components/about-section"
import { EnhancedSkills } from "@/components/enhanced-skills"
import { MobileOptimizedProjects } from "@/components/mobile-optimized-projects"
import { CompactContactSection } from "@/components/compact-contact-section"
import { EnhancedFooter } from "@/components/enhanced-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      <main>
        <OptimizedMobileHero />
        <AboutSection />
        <EnhancedSkills />
        <MobileOptimizedProjects />
        <CompactContactSection />
      </main>
      <EnhancedFooter />
    </div>
  )
}
