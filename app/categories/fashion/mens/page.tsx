"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MensFashionHero } from "@/components/fashion/mens/mens-fashion-hero"
import { MensCategories } from "@/components/fashion/mens/mens-categories"
import { MensProductGrid } from "@/components/fashion/mens/mens-product-grid"
import { MensSizeGuide } from "@/components/fashion/mens/mens-size-guide"
import { MensStyleTips } from "@/components/fashion/mens/mens-style-tips"

export interface ProductFilter {
  category?: string
  priceRange?: { min: number; max: number }
  size?: string
  color?: string
  brand?: string
  rating?: number
  inStock?: boolean
}

export default function MensFashionPage() {
  const [filters, setFilters] = useState<ProductFilter>({})
  const [sortBy, setSortBy] = useState("newest")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main>
        <MensFashionHero />
        <MensCategories onCategorySelect={(category) => setFilters({ ...filters, category })} />
        <MensProductGrid 
          filters={filters} 
          sortBy={sortBy}
          onFiltersChange={setFilters}
          onSortChange={setSortBy}
        />
        <MensSizeGuide />
        <MensStyleTips />
      </main>

      <Footer />
    </div>
  )
}
