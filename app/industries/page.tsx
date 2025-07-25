import { IndustriesHeroSection } from "@/components/industries/industries-hero-section"
import { IndustriesGrid } from "@/components/industries/industries-grid"
import { IndustryStats } from "@/components/industries/industry-stats"
import { IndustryTestimonials } from "@/components/industries/industry-testimonials"
import { IndustryPartners } from "@/components/industries/industry-partners"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Header />
      <main>
        <IndustriesHeroSection />
        <IndustriesGrid />
        <IndustryStats />
        <IndustryTestimonials />
        <IndustryPartners />
      </main>
      <Footer />
    </div>
  )
}
