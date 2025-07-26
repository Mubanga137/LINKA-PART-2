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
  SlidersHorizontal,
  Eye,
  GitCompare,
  Share,
  Zap,
  Clock,
  TrendingUp,
  Sparkles
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
    { value: 'newest', label: 'Newest First', icon: '🆕' },
    { value: 'popular', label: 'Most Popular', icon: '🔥' },
    { value: 'price-low', label: 'Price: Low to High', icon: '💰' },
    { value: 'price-high', label: 'Price: High to Low', icon: '💎' },
    { value: 'rating', label: 'Highest Rated', icon: '⭐' },
    { value: 'recommended', label: 'Recommended', icon: '✨' },
  ]

  // Mock product enhancements
  const enhanceProduct = (product: Product) => ({
    ...product,
    isNew: Math.random() > 0.7,
    isTrending: Math.random() > 0.8,
    hasFreeship: Math.random() > 0.6,
    fastDelivery: Math.random() > 0.5,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : null,
    originalPrice: product.price * (1 + Math.random() * 0.5),
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gradient-to-r from-blue-200 to-orange-200 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl p-6 space-y-4">
                  <div className="h-48 bg-gradient-to-br from-blue-200 to-orange-200 rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-orange-200 rounded"></div>
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-orange-200 rounded w-2/3"></div>
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
    <div className="space-y-8">
      {/* Enhanced Control Bar */}
      <Card className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-blue-900">
                  {totalProducts.toLocaleString()} 
                  <span className="text-blue-600 ml-1">products found</span>
                </span>
              </div>
              <div className="text-sm text-blue-600">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <Select value={sortOptions.sortBy} onValueChange={(value) => onSortChange({ ...sortOptions, sortBy: value as any })}>
                <SelectTrigger className="w-48 bg-white/80 border-white/50 hover:bg-white transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm">
                  {sortOptions_array.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-blue-50">
                      <span className="flex items-center">
                        <span className="mr-2">{option.icon}</span>
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex bg-white/80 rounded-xl overflow-hidden border border-white/50">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 transition-all duration-300 ${
                    viewMode === "grid" 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                      : "hover:bg-blue-50"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 transition-all duration-300 ${
                    viewMode === "list" 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                      : "hover:bg-blue-50"
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
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
        : "space-y-6"
      }>
        {products.map((product) => {
          const enhanced = enhanceProduct(product)
          return (
            <Card
              key={product.id}
              className="group relative bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                {enhanced.isNew && (
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg animate-pulse">
                    <Sparkles className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                )}
                {enhanced.isTrending && (
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                    🔥 Trending
                  </Badge>
                )}
                {enhanced.discount && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg font-bold">
                    -{enhanced.discount}%
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className={`absolute top-4 right-4 z-10 flex flex-col space-y-2 transition-all duration-300 ${
                hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}>
                <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all duration-300">
                  <Heart className="h-4 w-4 text-orange-500" />
                </Button>
                <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all duration-300">
                  <Eye className="h-4 w-4 text-blue-500" />
                </Button>
                <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all duration-300">
                  <Share className="h-4 w-4 text-purple-500" />
                </Button>
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-orange-100 p-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full bg-white rounded-2xl shadow-inner flex items-center justify-center">
                    <span className="text-6xl">{enhanced.category === 'jewelry-accessories' ? '💍' : enhanced.category === 'fashion-textiles' ? '👗' : enhanced.category === 'food-beverages' ? '🍯' : '📦'}</span>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button 
                      onClick={() => handleAddToCart(enhanced)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Vendor Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">{enhanced.vendor || 'Local Vendor'}</span>
                  <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                    Verified
                  </Badge>
                </div>

                {/* Product Title */}
                <h3 className="font-bold text-blue-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
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
                  <span className="text-sm text-blue-600">
                    {(enhanced.rating || 4.5).toFixed(1)} ({Math.floor(Math.random() * 200) + 50})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-blue-900">
                    K{enhanced.price.toLocaleString()}
                  </span>
                  {enhanced.discount && (
                    <span className="text-sm text-gray-500 line-through">
                      K{enhanced.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {enhanced.hasFreeship && (
                    <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                      <Truck className="h-3 w-3 mr-1" />
                      Free Ship
                    </Badge>
                  )}
                  {enhanced.fastDelivery && (
                    <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                      <Zap className="h-3 w-3 mr-1" />
                      Fast
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                    <MapPin className="h-3 w-3 mr-1" />
                    Local
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link href={`/products/${enhanced.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-300">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleAddToCart(enhanced)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <Card className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts.toLocaleString()} products
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="hover:bg-blue-50 transition-all duration-300 disabled:opacity-50"
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
                        className={`transition-all duration-300 ${
                          page === currentPage
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                            : "hover:bg-blue-50"
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
                  className="hover:bg-blue-50 transition-all duration-300 disabled:opacity-50"
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
