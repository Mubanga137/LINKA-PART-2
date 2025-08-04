import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PersonalizedProductCarousel } from "@/components/personalized-product-carousel"
import { VendorShowcase } from "@/components/vendor-showcase"
import { TrendingOffers } from "@/components/trending-offers"
import { ServicesPreviewSection } from "@/components/services-preview-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"
import { HomepageAccessGuard } from "@/components/homepage-access-guard"
import { AuthStatusBanner } from "@/components/auth-status-banner"
import { ClearAuthButton } from "@/components/clear-auth-button"
export default function HomePage() {
  return (
    <HomepageAccessGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <main>
          <div className="container mx-auto px-4 py-4">
            <AuthStatusBanner />
          </div>
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
    </HomepageAccessGuard>
  )
}
