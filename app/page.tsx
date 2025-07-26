import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PersonalizedProductCarousel } from "@/components/personalized-product-carousel"
import { DynamicCategoryGrid } from "@/components/dynamic-category-grid"
import { VendorShowcase } from "@/components/vendor-showcase"
import { TrendingOffers } from "@/components/trending-offers"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        <HeroSection />
        <TrendingOffers maxOffers={6} layout="grid" />
        <PersonalizedProductCarousel
          title="Recommended for You"
          subtitle="Curated products based on your location and browsing history"
          maxItems={8}
        />
        <DynamicCategoryGrid
          title="Shop by Category"
          subtitle="Discover local products tailored to your location"
          maxCategories={8}
          showFilters={true}
        />
        <VendorShowcase
          title="Featured Local Vendors"
          subtitle="Support amazing businesses in your community"
          maxVendors={6}
        />
        <PersonalizedProductCarousel
          title="Recently Viewed"
          subtitle="Continue shopping from where you left off"
          maxItems={6}
        />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
