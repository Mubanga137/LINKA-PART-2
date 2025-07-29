"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { MarketplaceMainHeader } from "@/components/marketplace/marketplace-main-header"
import { Footer } from "@/components/footer"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header"
import { FlashSalesBanner } from "@/components/marketplace/flash-sales-banner"
import { productService, ProductFilters, ProductSortOptions } from "@/services/product-service"
import { Product } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Filter, 
  X, 
  Sparkles, 
  TrendingUp, 
  Crown, 
  Shield,
  Zap,
  Clock,
  Star,
  Gift,
  Truck,
  Phone
} from "lucide-react"

const TRUST_INDICATORS = [
  { icon: Shield, text: "100% Secure", color: "text-green-600" },
  { icon: Truck, text: "Fast Delivery", color: "text-blue-600" },
  { icon: Star, text: "Quality Products", color: "text-yellow-600" },
  { icon: Phone, text: "24/7 Support", color: "text-purple-600" }
]

const FEATURED_CATEGORIES = [
  { id: "trending", name: "Trending Now", icon: "🔥", gradient: "from-red-500 to-orange-500" },
  { id: "new", name: "New Arrivals", icon: "✨", gradient: "from-blue-500 to-purple-500" },
  { id: "local", name: "Local Made", icon: "🇰🇪", gradient: "from-green-500 to-teal-500" },
  { id: "premium", name: "Premium", icon: "👑", gradient: "from-yellow-500 to-orange-500" },
]

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const itemsPerPage = 24

  // Initialize filters from URL params
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') || undefined,
    searchQuery: searchParams.get('q') || undefined,
    tags: searchParams.get('trending') === 'true' ? ['trending'] : 
          searchParams.get('tags') ? searchParams.get('tags')?.split(',') : undefined,
  })

  const [sortOptions, setSortOptions] = useState<ProductSortOptions>({
    sortBy: (searchParams.get('sort') as ProductSortOptions['sortBy']) || 'newest',
    order: 'desc'
  })

  // Load products
  useEffect(() => {
    loadProducts()
  }, [filters, sortOptions, currentPage])

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const offset = (currentPage - 1) * itemsPerPage
      const result = await productService.getProducts(
        filters,
        sortOptions,
        itemsPerPage,
        offset
      )
      setProducts(result.products)
      setTotalProducts(result.total)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSortChange = (newSort: ProductSortOptions) => {
    setSortOptions(newSort)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof ProductFilters] !== undefined
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceMainHeader />

      <main className="pb-12">
        {/* Trust Indicators Bar - Mobile */}
        <div className="lg:hidden bg-white border-b px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            {TRUST_INDICATORS.map((indicator, i) => (
              <div key={i} className={`flex items-center gap-1 ${indicator.color}`}>
                <indicator.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section with Flash Sales */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {/* Flash Sales Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <FlashSalesBanner />
            </motion.div>

            {/* Featured Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              {FEATURED_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFiltersChange({ ...filters, tags: [category.id] })}
                  className={`bg-gradient-to-r ${category.gradient} p-4 rounded-xl text-white text-center hover:scale-105 transition-transform duration-200 shadow-lg`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-semibold text-sm">{category.name}</div>
                </button>
              ))}
            </motion.div>

            {/* Trust Indicators - Desktop */}
            <div className="hidden lg:flex items-center justify-center gap-8 py-4 bg-gray-50 rounded-xl">
              {TRUST_INDICATORS.map((indicator, i) => (
                <div key={i} className={`flex items-center gap-2 ${indicator.color}`}>
                  <indicator.icon className="h-5 w-5" />
                  <span className="font-medium">{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Marketplace Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl border shadow-sm p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Discover Amazing Products
                </h1>
                <p className="text-gray-600">
                  Shop from verified local and international sellers with confidence
                </p>
              </div>
              
              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (!value) return null
                    
                    const filterLabel = Array.isArray(value) 
                      ? value.join(', ') 
                      : typeof value === 'object' 
                        ? `K${value.min}-K${value.max}`
                        : value
                    
                    return (
                      <Badge 
                        key={key} 
                        variant="secondary" 
                        className="flex items-center gap-1 bg-orange-100 text-orange-800"
                      >
                        {key}: {filterLabel}
                        <button 
                          onClick={() => {
                            const newFilters = { ...filters }
                            delete newFilters[key as keyof ProductFilters]
                            handleFiltersChange(newFilters)
                          }}
                          className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  })}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(true)}
              className="w-full flex items-center justify-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Filter className="h-4 w-4" />
              Filters & Search
              {hasActiveFilters && (
                <Badge className="bg-orange-500 text-white ml-2">
                  {Object.keys(filters).filter(k => filters[k as keyof ProductFilters]).length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="sticky top-6">
                <MarketplaceFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isLoading={isLoading}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              <MarketplaceGrid
                products={products}
                isLoading={isLoading}
                sortOptions={sortOptions}
                onSortChange={handleSortChange}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalProducts={totalProducts}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </section>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowMobileFilters(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b bg-orange-500 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <MarketplaceFilters
                  filters={filters}
                  onFiltersChange={(newFilters) => {
                    handleFiltersChange(newFilters)
                    setShowMobileFilters(false)
                  }}
                  isLoading={isLoading}
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white"
          >
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-2xl font-bold mb-2">Join Over 10,000+ Happy Customers</h2>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Start selling your products or discover unique items from verified local and international sellers. 
              Safe, secure, and designed for African entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Crown className="h-5 w-5 mr-2" />
                Become a Seller
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Gift className="h-5 w-5 mr-2" />
                Explore More
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
