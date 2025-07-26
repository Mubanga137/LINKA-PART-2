"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MarketplaceMainHeader } from "@/components/marketplace/marketplace-main-header"
import { Footer } from "@/components/footer"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header"
import { productService, ProductFilters, ProductSortOptions } from "@/services/product-service"
import { Product } from "@/contexts/cart-context"

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Initialize filters from URL params
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') || undefined,
    searchQuery: searchParams.get('q') || undefined,
    tags: searchParams.get('trending') === 'true' ? ['trending'] : undefined,
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
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleSortChange = (newSort: ProductSortOptions) => {
    setSortOptions(newSort)
    setCurrentPage(1) // Reset to first page when sort changes
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-gradient-to-br from-orange-300/10 to-red-400/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <MarketplaceMainHeader />
      
      <main className="relative z-10">
        {/* Enhanced Page Header with Ecosystem Feel */}
        <MarketplaceHeader 
          totalProducts={totalProducts}
          currentFilters={filters}
        />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Ecosystem Stats Bar */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-500/10 border border-white/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">🏪</span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">{Math.floor(totalProducts / 10)}+</div>
                <div className="text-sm font-medium text-blue-700">Active Vendors</div>
                <div className="text-xs text-blue-500">Growing daily</div>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-orange-500/10 border border-white/50 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">📦</span>
                </div>
                <div className="text-2xl font-bold text-orange-900 mb-1">{totalProducts.toLocaleString()}</div>
                <div className="text-sm font-medium text-orange-700">Products Available</div>
                <div className="text-xs text-orange-500">Fresh inventory</div>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-500/10 border border-white/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">24hrs</div>
                <div className="text-sm font-medium text-blue-700">Fast Delivery</div>
                <div className="text-xs text-blue-500">Express available</div>
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-orange-500/10 border border-white/50 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">⭐</span>
                </div>
                <div className="text-2xl font-bold text-orange-900 mb-1">4.8★</div>
                <div className="text-sm font-medium text-orange-700">Customer Rating</div>
                <div className="text-xs text-orange-500">Trusted quality</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Filters Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-32">
                <MarketplaceFilters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isLoading={isLoading}
                />
              </div>
            </aside>
            
            {/* Enhanced Products Grid */}
            <div className="flex-1">
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
        </div>

        {/* Floating Action Elements */}
        <div className="fixed bottom-8 right-8 z-30">
          <div className="flex flex-col space-y-4">
            {/* Quick Categories Floating Button */}
            <button className="group relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110">
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-white text-xl">🔍</span>
              <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-blue-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 whitespace-nowrap">
                Quick Search
              </div>
            </button>

            {/* Back to Top Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-110"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-white text-xl">↑</span>
              <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-orange-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 whitespace-nowrap">
                Back to Top
              </div>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
