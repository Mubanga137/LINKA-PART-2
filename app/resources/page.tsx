import { ResourcesHeroSection } from "@/components/resources/resources-hero-section"
import { ResourcesCategories } from "@/components/resources/resources-categories"
import { FeaturedArticles } from "@/components/resources/featured-articles"
import { ResourcesGuides } from "@/components/resources/resources-guides"
import { ResourcesFAQ } from "@/components/resources/resources-faq"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        <ResourcesHeroSection />
        <ResourcesCategories />
        <FeaturedArticles />
        <ResourcesGuides />
        <ResourcesFAQ />
      </main>
      <Footer />
    </div>
  )
}
