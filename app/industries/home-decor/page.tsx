import { HomeDecorHero } from "@/components/industries/home-decor/home-decor-hero"
import { HomeDecorServices } from "@/components/industries/home-decor/home-decor-services"
import { HomeDecorSearch } from "@/components/industries/home-decor/home-decor-search"
import { HomeDecorFeatures } from "@/components/industries/home-decor/home-decor-features"
import { HomeDecorProducts } from "@/components/industries/home-decor/home-decor-products"
import { HomeDecorTestimonials } from "@/components/industries/home-decor/home-decor-testimonials"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomeDecorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        <HomeDecorHero />
        <HomeDecorServices />
        <HomeDecorSearch />
        <HomeDecorFeatures />
        <HomeDecorProducts />
        <HomeDecorTestimonials />
      </main>
      <Footer />
    </div>
  )
}
