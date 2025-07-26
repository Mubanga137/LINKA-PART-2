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
    <div className="min-h-screen bg-gray-50">
      <MarketplaceMainHeader />

      <main>
        {/* Simple Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <MarketplaceHeader
              totalProducts={totalProducts}
              currentFilters={filters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-6">
                <MarketplaceFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isLoading={isLoading}
                />
              </div>
            </aside>

            {/* Products Grid */}
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
      </main>

      <Footer />
    </div>
  )
}
