"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TraditionalHero } from "@/components/traditional/traditional-hero"
import { TraditionalCategories } from "@/components/traditional/traditional-categories"
import { TraditionalFeatured } from "@/components/traditional/traditional-featured"
import { TraditionalHeritage } from "@/components/traditional/traditional-heritage"

export default function TraditionalWearPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      <main>
        <TraditionalHero />
        <TraditionalCategories />
        <TraditionalFeatured />
        <TraditionalHeritage />
      </main>

      <Footer />
    </div>
  )
}
