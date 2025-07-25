import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForRetailersHero } from "@/components/for-retailers/for-retailers-hero"
import { RetailerValueProposition } from "@/components/for-retailers/retailer-value-proposition"
import { RetailerSuccess } from "@/components/for-retailers/retailer-success"
import { RetailerTools } from "@/components/for-retailers/retailer-tools"
import { RetailerOnboarding } from "@/components/for-retailers/retailer-onboarding"
import { RetailerPricing } from "@/components/for-retailers/retailer-pricing"
import { RetailerSupport } from "@/components/for-retailers/retailer-support"
import { RetailerTestimonials } from "@/components/for-retailers/retailer-testimonials"
import { RetailerCTA } from "@/components/for-retailers/retailer-cta"

export default function ForRetailersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      <main>
        <ForRetailersHero />
        <RetailerValueProposition />
        <RetailerSuccess />
        <RetailerTools />
        <RetailerOnboarding />
        <RetailerPricing />
        <RetailerTestimonials />
        <RetailerSupport />
        <RetailerCTA />
      </main>
      <Footer />
    </div>
  )
}
