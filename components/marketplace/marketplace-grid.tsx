"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  ShoppingCart,
  Heart,
  MapPin,
  Truck,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Eye,
  ArrowUpDown
} from "lucide-react"
import { Product } from "@/contexts/cart-context"
import { useCart } from "@/contexts/cart-context"
import { ProductSortOptions } from "@/services/product-service"

interface MarketplaceGridProps {
  products: Product[]
  isLoading: boolean
  sortOptions: ProductSortOptions
  onSortChange: (sort: ProductSortOptions) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalProducts: number
  itemsPerPage: number
}

export function MarketplaceGrid({
  products,
  isLoading,
  sortOptions,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
  totalProducts,
  itemsPerPage
}: MarketplaceGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const sortOptions_array = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'recommended', label: 'Recommended' },
  ]

  // Mock product enhancements
  const enhanceProduct = (product: Product) => ({
    ...product,
    isNew: Math.random() > 0.8,
    hasFreeship: Math.random() > 0.6,
    discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : null,
    originalPrice: product.price * (1 + Math.random() * 0.3),
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-900">
                {totalProducts.toLocaleString()} products
              </span>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <Select value={sortOptions.sortBy} onValueChange={(value) => onSortChange({ ...sortOptions, sortBy: value as any })}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions_array.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 ${
                    viewMode === "grid" 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 ${
                    viewMode === "list" 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {products.map((product) => {
          const enhanced = enhanceProduct(product)
          return (
            <Card
              key={product.id}
              className="group bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
                {enhanced.isNew && (
                  <Badge className="bg-green-600 text-white text-xs">
                    New
                  </Badge>
                )}
                {enhanced.discount && (
                  <Badge className="bg-red-600 text-white text-xs font-medium">
                    -{enhanced.discount}%
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className={`absolute top-3 right-3 z-10 flex flex-col space-y-1 transition-opacity duration-200 ${
                hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white shadow-sm p-2">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white shadow-sm p-2">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50">
                <div className="aspect-square p-8">
                  <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <span className="text-4xl">
                      {enhanced.category === 'jewelry-accessories' ? '💍' : 
                       enhanced.category === 'fashion-textiles' ? '👗' : 
                       enhanced.category === 'food-beverages' ? '🍯' : '📦'}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Vendor Info */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">V</span>
                  </div>
                  <span className="text-sm text-gray-600">{enhanced.vendor || 'Local Vendor'}</span>
                  <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>

                {/* Product Title */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {enhanced.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(enhanced.rating || 4.5)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {(enhanced.rating || 4.5).toFixed(1)} ({Math.floor(Math.random() * 200) + 50})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">
                    K{enhanced.price.toLocaleString()}
                  </span>
                  {enhanced.discount && (
                    <span className="text-sm text-gray-500 line-through">
                      K{enhanced.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {enhanced.hasFreeship && (
                    <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                      <Truck className="h-3 w-3 mr-1" />
                      Free Ship
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs text-blue-700 border-blue-200">
                    <MapPin className="h-3 w-3 mr-1" />
                    Local
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link href={`/products/${enhanced.id}`} className="flex-1">
                    <Button variant="outline" className="w-full text-sm">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleAddToCart(enhanced)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts.toLocaleString()} products
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + Math.max(1, currentPage - 2)
                    return (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className={`${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
