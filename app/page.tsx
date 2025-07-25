import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturedProductsSection } from "@/components/featured-products-section"
import { AnimatedMockupGallery } from "@/components/animated-mockup-gallery"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FeaturedProductsSection />
        <AnimatedMockupGallery />
      </main>
      <Footer />
    </div>
  )
}
