"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FashionHero } from "@/components/fashion/fashion-hero"
import { FashionCategories } from "@/components/fashion/fashion-categories"
import { FeaturedProducts } from "@/components/fashion/featured-products"
import { TrendingNow } from "@/components/fashion/trending-now"
import { FashionBrands } from "@/components/fashion/fashion-brands"
import { StyleGuide } from "@/components/fashion/style-guide"

export default function FashionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Header />
      
      <main>
        <FashionHero />
        <FashionCategories onCategorySelect={setSelectedCategory} />
        <FeaturedProducts category={selectedCategory} />
        <TrendingNow />
        <FashionBrands />
        <StyleGuide />
      </main>

      <Footer />
    </div>
  )
}
