"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
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

  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 300], [0, -50])
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

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
    setCurrentPage(1)
  }

  const handleSortChange = (newSort: ProductSortOptions) => {
    setSortOptions(newSort)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 -right-20 w-80 h-80 bg-gradient-to-br from-orange-400/15 to-orange-600/25 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/15 rounded-full blur-3xl"
          animate={{
            rotate: [0, -180, -360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <MarketplaceMainHeader />
      
      <main className="relative z-10">
        {/* Enhanced Page Header with Parallax */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative"
        >
          <MarketplaceHeader 
            totalProducts={totalProducts}
            currentFilters={filters}
          />
        </motion.div>

        {/* Main Content Area */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Vibrant Stats Section */}
          <motion.div 
            className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: '🏪', value: `${Math.floor(totalProducts / 10)}+`, label: 'Active Vendors', bg: 'from-blue-500 to-blue-600', delay: 0.1 },
              { icon: '📦', value: totalProducts.toLocaleString(), label: 'Products', bg: 'from-orange-500 to-orange-600', delay: 0.2 },
              { icon: '⚡', value: '24hrs', label: 'Fast Delivery', bg: 'from-blue-600 to-purple-600', delay: 0.3 },
              { icon: '⭐', value: '4.8★', label: 'Rating', bg: 'from-orange-600 to-red-500', delay: 0.4 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg shadow-blue-500/10 border border-white/50 cursor-pointer overflow-hidden"
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  shadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-5`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative flex items-center space-x-3">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.bg} rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-white text-lg">{stat.icon}</span>
                  </motion.div>
                  <div>
                    <motion.div 
                      className="text-xl md:text-2xl font-bold text-gray-900"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: stat.delay + 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Animated Filters Sidebar */}
            <motion.aside 
              className="lg:w-80 flex-shrink-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="sticky top-24">
                <MarketplaceFilters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isLoading={isLoading}
                />
              </div>
            </motion.aside>
            
            {/* Animated Products Grid */}
            <motion.div 
              className="flex-1"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
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
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Action Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.button
            className="group w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center text-white font-bold text-lg"
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              shadow: "0 10px 30px rgba(249, 115, 22, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ↑
            </motion.span>
            
            {/* Tooltip */}
            <motion.div
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              Back to Top
            </motion.div>
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  )
}
