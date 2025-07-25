import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RetailersHeroSection } from "@/components/retailers/retailers-hero-section"
import { RetailersOverviewSection } from "@/components/retailers/retailers-overview-section"
import { RetailersBenefitsSection } from "@/components/retailers/retailers-benefits-section"
import { RetailersSuccessSection } from "@/components/retailers/retailers-success-section"
import { RetailersRequirementsSection } from "@/components/retailers/retailers-requirements-section"
import { RetailersProcessSection } from "@/components/retailers/retailers-process-section"
import { RetailersSupportSection } from "@/components/retailers/retailers-support-section"
import { RetailersCtaSection } from "@/components/retailers/retailers-cta-section"

export default function RetailersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      <main>
        <RetailersHeroSection />
        <RetailersOverviewSection />
        <RetailersBenefitsSection />
        <RetailersSuccessSection />
        <RetailersRequirementsSection />
        <RetailersProcessSection />
        <RetailersSupportSection />
        <RetailersCtaSection />
      </main>
      <Footer />
    </div>
  )
}
