"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShopCustomerHeader } from "@/components/shop/shop-customer-header"
import { ShopFilters } from "@/components/shop/shop-filters"
import { ProductGrid } from "@/components/shop/product-grid"
import { ShopStats } from "@/components/shop/shop-stats"
import { productService, ProductFilters, ProductSortOptions } from "@/services/product-service"
import { Product } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, Filter, X } from "lucide-react"

export default function ShopPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<ProductFilters>({})
  const [sortOptions, setSortOptions] = useState<ProductSortOptions>({
    sortBy: 'newest',
    order: 'desc'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const itemsPerPage = 12

  // Redirect if not a customer
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/shop')
      return
    }
    if (user.role !== 'customer') {
      router.push('/')
      return
    }
  }, [user, router])

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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setFilters({ ...filters, searchQuery: searchQuery.trim() })
      setCurrentPage(1)
    }
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    const { searchQuery: _, ...restFilters } = filters
    setFilters(restFilters)
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  if (!user || user.role !== 'customer') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <ShopCustomerHeader />
      
      {/* Hero Section - Focused on Shopping */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Shop Premium Products
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Browse our curated collection of quality products from trusted local vendors. Find exactly what you need with easy search and filtering.
            </p>
            
            {/* Prominent Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search for products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-12 pr-24 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-yellow-400 shadow-xl"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-6"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        {/* Shopping Stats */}
        <ShopStats totalProducts={totalProducts} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full mb-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <aside className={`lg:w-80 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <ShopFilters 
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isLoading={isLoading}
              />
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid 
              products={products}
              isLoading={isLoading}
              sortOptions={sortOptions}
              onSortChange={handleSortChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalProducts={totalProducts}
            />
          </div>
        </div>
      </main>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <ShopFilters 
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
