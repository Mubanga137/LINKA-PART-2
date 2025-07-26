"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  ArrowUpDown,
  Shield,
  Clock,
  MapPin
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
  const { addToCart } = useCart()

  const sortOptions_array = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rating' },
    { value: 'recommended', label: 'Recommended' },
  ]

  const getCategoryEmoji = (category?: string) => {
    const emojis: Record<string, string> = {
      'jewelry-accessories': '💍',
      'fashion-textiles': '👗',
      'food-beverages': '🍯',
      'agriculture-natural': '🌱',
      'tools-hardware': '🔨',
      'art-culture': '🎨',
      'traditional-crafts': '🏺',
      'home-decor': '🏠',
      'services': '🛎️',
    }
    return emojis[category || ''] || '📦'
  }

  const formatPrice = (price: number) => {
    return `K${price.toLocaleString()}`
  }

  const getDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading header */}
        <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        
        {/* Loading grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {totalProducts.toLocaleString()} products
          </span>
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
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

          {/* View Mode */}
          <div className="flex bg-gray-100 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid - AliExpress Style */}
      <div className={`grid gap-4 ${
        viewMode === 'grid' 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
          : 'grid-cols-1'
      }`}>
        {products.map((product) => {
          const discount = getDiscountPercent(product.price, product.originalPrice)
          
          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full">
                <div className="relative">
                  {/* Product Image */}
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.category === 'services' && (
                      <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5">
                        Service
                      </Badge>
                    )}
                    {discount && (
                      <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                        -{discount}%
                      </Badge>
                    )}
                    {product.shippingInfo.freeShipping && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        Free Ship
                      </Badge>
                    )}
                  </div>

                  {/* Heart Icon */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 h-auto bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-3">
                  {/* Product Title */}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer mb-2 leading-tight">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-orange-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Rating & Sales */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Seller & Location */}
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{product.retailerLocation}</span>
                  </div>

                  {/* Shipping/Service Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    {product.category === 'services' ? (
                      <>
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>Bookable</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {product.shippingInfo.estimatedDays === 0 ? 'Same day' : `${product.shippingInfo.estimatedDays} days`}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          <span>
                            {product.shippingInfo.freeShipping ? 'Free' : `K${product.shippingInfo.shippingCost}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{product.shippingInfo.estimatedDays} days</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 h-8"
                    size="sm"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + Math.max(1, currentPage - 2)
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={page === currentPage ? "bg-orange-500 hover:bg-orange-600" : ""}
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
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
