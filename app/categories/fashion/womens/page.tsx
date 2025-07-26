"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WomensFashionHero } from "@/components/fashion/womens/womens-fashion-hero"
import { WomensCategories } from "@/components/fashion/womens/womens-categories"
import { WomensProductGrid } from "@/components/fashion/womens/womens-product-grid"
import { WomensStyleGuide } from "@/components/fashion/womens/womens-style-guide"

export interface WomensProductFilter {
  category?: string
  priceRange?: { min: number; max: number }
  size?: string
  color?: string
  brand?: string
  rating?: number
  occasion?: string
  inStock?: boolean
}

export default function WomensFashionPage() {
  const [filters, setFilters] = useState<WomensProductFilter>({})
  const [sortBy, setSortBy] = useState("newest")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />
      
      <main>
        <WomensFashionHero />
        <WomensCategories onCategorySelect={(category) => setFilters({ ...filters, category })} />
        <WomensProductGrid 
          filters={filters} 
          sortBy={sortBy}
          onFiltersChange={setFilters}
          onSortChange={setSortBy}
        />
        <WomensStyleGuide />
      </main>

      <Footer />
    </div>
  )
}
