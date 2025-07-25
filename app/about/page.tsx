import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHeroSection } from "@/components/about/about-hero-section"
import { AboutStorySection } from "@/components/about/about-story-section"
import { AboutValuesSection } from "@/components/about/about-values-section"
import { AboutImpactSection } from "@/components/about/about-impact-section"
import { AboutTimelineSection } from "@/components/about/about-timeline-section"
import { AboutTeamSection } from "@/components/about/about-team-section"
import { AboutContactSection } from "@/components/about/about-contact-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      <main>
        <AboutHeroSection />
        <AboutStorySection />
        <AboutValuesSection />
        <AboutImpactSection />
        <AboutTimelineSection />
        <AboutTeamSection />
        <AboutContactSection />
      </main>
      <Footer />
    </div>
  )
}
