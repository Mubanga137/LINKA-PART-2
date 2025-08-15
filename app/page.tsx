import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PersonalizedProductCarousel } from "@/components/personalized-product-carousel"
import { VendorShowcase } from "@/components/vendor-showcase"
import { TrendingOffers } from "@/components/trending-offers"
import { ServicesPreviewSection } from "@/components/services-preview-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <VendorShowcase
          title="Featured Local Vendors"
          subtitle="Support amazing businesses in your community"
          maxVendors={6}
        />
        <ServicesPreviewSection />
        <TrendingOffers maxOffers={6} layout="grid" />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
