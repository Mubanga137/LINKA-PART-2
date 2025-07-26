"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MensTraditionalHero } from "@/components/traditional/mens/mens-traditional-hero"
import { MensTraditionalProducts } from "@/components/traditional/mens/mens-traditional-products"
import { MensTraditionalFilters } from "@/components/traditional/mens/mens-traditional-filters"
import { MobileCheckout } from "@/components/checkout/mobile-checkout"

export interface TraditionalFilter {
  category?: string
  priceRange?: { min: number; max: number }
  size?: string
  color?: string
  region?: string
  pattern?: string
  rating?: number
  inStock?: boolean
}

export default function MensTraditionalPage() {
  const [filters, setFilters] = useState<TraditionalFilter>({})
  const [sortBy, setSortBy] = useState("newest")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [showCheckout, setShowCheckout] = useState(false)

  const handleAddToCart = (product: any) => {
    setCartItems(prev => [...prev, { ...product, quantity: 1 }])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main>
        <MensTraditionalHero />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-6">
                <MensTraditionalFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <MensTraditionalProducts
                filters={filters}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onAddToCart={handleAddToCart}
                cartItemCount={cartItems.length}
                onCheckout={() => setShowCheckout(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Checkout */}
      {showCheckout && (
        <MobileCheckout
          items={cartItems}
          onClose={() => setShowCheckout(false)}
          onUpdateQuantity={(index, quantity) => {
            setCartItems(prev => prev.map((item, i) => 
              i === index ? { ...item, quantity } : item
            ))
          }}
          onRemoveItem={(index) => {
            setCartItems(prev => prev.filter((_, i) => i !== index))
          }}
        />
      )}

      <Footer />
    </div>
  )
}
