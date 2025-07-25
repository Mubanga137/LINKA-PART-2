import { RetailerHeroSection } from "@/components/retailer/retailer-hero-section"
import { RetailerBenefitsSection } from "@/components/retailer/retailer-benefits-section"
import { RetailerRequirementsSection } from "@/components/retailer/retailer-requirements-section"
import { RetailerSignupForm } from "@/components/retailer/retailer-signup-form"
import { RetailerTestimonialsSection } from "@/components/retailer/retailer-testimonials-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BecomeRetailerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      <main>
        <RetailerHeroSection />
        <RetailerBenefitsSection />
        <RetailerRequirementsSection />
        <RetailerTestimonialsSection />
        <RetailerSignupForm />
      </main>
      <Footer />
    </div>
  )
}
