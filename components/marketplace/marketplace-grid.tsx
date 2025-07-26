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
  Compare,
  Share
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [compareList, setCompareList] = useState<Set<string>>(new Set())
  const { addToCart, getItemQuantity } = useCart()

  const handleSortChange = (value: string) => {
    const [sortBy, order] = value.split('-') as [ProductSortOptions['sortBy'], ProductSortOptions['order']]
    onSortChange({ sortBy, order })
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      const newCompareList = new Set(prev)
      if (newCompareList.has(productId)) {
        newCompareList.delete(productId)
      } else if (newCompareList.size < 4) { // Limit to 4 items for comparison
        newCompareList.add(productId)
      }
      return newCompareList
    })
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-slate-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded w-48 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="h-64 bg-slate-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts)

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <p className="text-slate-600">
            Showing {startItem}-{endItem} of {totalProducts.toLocaleString()} products
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View mode toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort dropdown */}
          <Select value={`${sortOptions.sortBy}-${sortOptions.order}`} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest-desc">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
              <SelectItem value="popularity-desc">Most Popular</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Compare Bar */}
      {compareList.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compare className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">
                {compareList.size} item{compareList.size !== 1 ? 's' : ''} selected for comparison
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Compare Now
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCompareList(new Set())}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-600">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {products.map((product) => (
            <Card 
              key={product.id} 
              className={`group bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                {/* Product Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        viewMode === 'list' ? 'h-full' : 'h-64'
                      }`}
                    />
                  </Link>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.originalPrice && (
                      <Badge variant="destructive" className="bg-red-500 text-white">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="secondary" className="bg-slate-500 text-white">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favorites.has(product.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-slate-600'
                        }`} 
                      />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                      onClick={() => toggleCompare(product.id)}
                      disabled={compareList.size >= 4 && !compareList.has(product.id)}
                    >
                      <Compare 
                        className={`h-4 w-4 ${
                          compareList.has(product.id) 
                            ? 'text-blue-600' 
                            : 'text-slate-600'
                        }`} 
                      />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                    >
                      <Share className="h-4 w-4 text-slate-600" />
                    </Button>
                  </div>

                  {/* Quick view button */}
                  {product.inStock && (
                    <Button
                      size="sm"
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Retailer */}
                    <div className="flex items-center text-sm text-slate-600 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{product.retailerName}, {product.retailerLocation}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="text-2xl font-bold text-emerald-600">
                        ZMW {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">
                          ZMW {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center text-sm text-slate-600 mb-4">
                      <Truck className="h-3 w-3 mr-1" />
                      {product.shippingInfo.freeShipping ? (
                        <span className="text-green-600 font-medium">Free Shipping</span>
                      ) : (
                        <span>Shipping: ZMW {product.shippingInfo.shippingCost}</span>
                      )}
                      <span className="ml-2">• {product.shippingInfo.estimatedDays} days</span>
                    </div>

                    {/* Features */}
                    {viewMode === 'list' && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {product.inStock ? (
                      <>
                        <Button
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {getItemQuantity(product.id) > 0 ? (
                            `In Cart (${getItemQuantity(product.id)})`
                          ) : (
                            'Add to Cart'
                          )}
                        </Button>
                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Button disabled className="flex-1">
                        Out of Stock
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + Math.max(1, currentPage - 2)
            if (pageNum > totalPages) return null
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}

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
