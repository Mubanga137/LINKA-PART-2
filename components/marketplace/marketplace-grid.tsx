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
  MapPin,
  Users,
  Eye,
  Zap,
  CheckCircle,
  Award,
  TrendingUp,
  ThumbsUp,
  Package,
  Phone,
  MessageCircle,
  Share2,
  AlertCircle,
  Timer,
  Flame,
  Camera,
  Store
} from "lucide-react"
import { Product } from "@/contexts/cart-context"
import { useCart } from "@/contexts/cart-context"
import { ProductSortOptions } from "@/services/product-service"
import { ResponsiveProductGrid } from "./ResponsiveProductGrid"

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

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onToggleWishlist: (productId: string) => void
  isWishlisted?: boolean
}

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false)
  
  // Mock multiple images for gallery effect
  const productImages = [
    product.image,
    product.image, // In real app, these would be different images
    product.image,
    product.image
  ]

  const getDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  const formatPrice = (price: number) => {
    return `K${price.toLocaleString()}`
  }

  const discount = getDiscountPercent(product.price, product.originalPrice)

  const handleWishlistClick = () => {
    setIsWishlistAnimating(true)
    onToggleWishlist(product.id)
    setTimeout(() => setIsWishlistAnimating(false), 600)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const isFlashSale = product.tags?.includes('flash-sale')
  const isChoice = product.tags?.includes('top-choice')
  const hasVideoReview = product.tags?.includes('video-review')

  // Generate store slug from vendor name
  const getStoreSlug = (vendorName: string) => {
    return vendorName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group h-full"
    >
      <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden h-full border-0 shadow-sm hover:shadow-orange-200/50">
        <div className="relative overflow-hidden">
          {/* Product Image Gallery */}
          <Link href={`/products/${product.id}`}>
            <div className="aspect-square bg-gray-50 cursor-pointer overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Image Navigation */}
              {productImages.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity px-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="bg-white/80 hover:bg-white p-1 h-8 w-8 rounded-full shadow-md"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="bg-white/80 hover:bg-white p-1 h-8 w-8 rounded-full shadow-md"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Image Indicators */}
              {productImages.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {productImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Quick Action Overlay */}
              <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col gap-1">
                  {isFlashSale && (
                    <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 animate-pulse">
                      <Flame className="h-2.5 w-2.5 mr-1" />
                      Flash Sale
                    </Badge>
                  )}
                  {discount && (
                    <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                      -{discount}%
                    </Badge>
                  )}
                  {product.shippingInfo.freeShipping && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700">
                      Free Ship
                    </Badge>
                  )}
                  {isChoice && (
                    <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5">
                      <Award className="h-2.5 w-2.5 mr-1" />
                      Choice
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-col gap-1">
                  {hasVideoReview && (
                    <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                      <Camera className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>

          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleWishlistClick}
            className={`absolute top-2 right-2 p-1.5 h-auto rounded-full transition-all ${
              isWishlisted 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-white/80 hover:bg-white text-gray-600'
            } ${
              isWishlistAnimating ? 'scale-125' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <motion.div
              animate={isWishlistAnimating ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.6 }}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.div>
          </Button>

          {/* Share Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-10 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 h-auto bg-white/80 hover:bg-white rounded-full"
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        <CardContent className="p-3 space-y-2">
          {/* Vendor Badge */}
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-2.5 w-2.5 text-blue-600" />
              </div>
              <span className="text-xs text-blue-600 font-medium">Verified</span>
            </div>
            {product.retailerName && (
              <span className="text-xs text-gray-500 truncate">by {product.retailerName}</span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer leading-tight font-medium">
              {product.name}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-orange-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating & Social Proof */}
          <div className="flex items-center justify-between">
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
              <span className="text-xs text-gray-600 font-medium">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Eye className="h-3 w-3" />
              <span>{150 + (product.id.charCodeAt(0) * 10) % 500}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-3 w-3" />
              <span className="truncate max-w-20">{product.retailerLocation}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Truck className="h-3 w-3" />
              <span>
                {product.shippingInfo.estimatedDays === 0 ? 'Same day' : `${product.shippingInfo.estimatedDays}d`}
              </span>
            </div>
          </div>

          {/* Flash Sale Timer */}
          {isFlashSale && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <div className="flex items-center gap-2 text-red-600">
                <Timer className="h-3 w-3" />
                <span className="text-xs font-medium">Ends in: 2h 34m</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-1">
            {/* Primary Action - Buy Now */}
            <Button
              onClick={() => onAddToCart(product)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 h-8 rounded-lg"
              size="sm"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              {product.category === 'services' ? 'Book Now' : 'Buy Now'}
            </Button>

            {/* Secondary Actions Row */}
            <div className="flex gap-2">
              {/* Visit Store Button - Only show for non-flash-sale items */}
              {!isFlashSale && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs border-orange-200 text-orange-600 hover:bg-orange-50 h-7"
                  asChild
                >
                  <Link href={`/vendors/${getStoreSlug(product.retailerName || 'unknown-vendor')}`}>
                    <Store className="h-3 w-3 mr-1" />
                    Visit Store
                  </Link>
                </Button>
              )}

              {/* Contact/Message Button */}
              <Button
                variant="outline"
                size="sm"
                className={`text-xs border-orange-200 text-orange-600 hover:bg-orange-50 h-7 ${
                  !isFlashSale ? 'px-2' : 'flex-1'
                }`}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                {!isFlashSale ? '' : 'Contact'}
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-4 pt-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              <span>Quality</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>Rated</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
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
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set())
  const { addToCart } = useCart()

  const sortOptions_array = [
    { value: 'newest', label: 'Latest', icon: <Clock className="h-3 w-3" /> },
    { value: 'popular', label: 'Popular', icon: <TrendingUp className="h-3 w-3" /> },
    { value: 'price-low', label: 'Price ↑', icon: <ArrowUpDown className="h-3 w-3" /> },
    { value: 'price-high', label: 'Price ↓', icon: <ArrowUpDown className="h-3 w-3" /> },
    { value: 'rating', label: 'Top Rated', icon: <Star className="h-3 w-3" /> },
    { value: 'recommended', label: 'For You', icon: <Zap className="h-3 w-3" /> },
  ]

  const handleToggleWishlist = (productId: string) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <div className="text-lg font-medium text-gray-600 mb-2">Loading amazing products...</div>
          <div className="text-sm text-gray-400">Discovering the best deals for you</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Enhanced Header Controls */}
      <div className="bg-white rounded-xl border shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                {totalProducts.toLocaleString()} products
              </span>
              <Badge variant="secondary" className="text-xs">
                Page {currentPage}/{totalPages}
              </Badge>
            </div>
            {products.length > 0 && (
              <div className="text-xs text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <Select value={sortOptions.sortBy} onValueChange={(value) => onSortChange({ ...sortOptions, sortBy: value as any })}>
              <SelectTrigger className="w-40 border-gray-200">
                <div className="flex items-center gap-2">
                  {sortOptions_array.find(opt => opt.value === sortOptions.sortBy)?.icon}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="w-40">
                {sortOptions_array.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-4 ${
        viewMode === 'grid' 
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' 
          : 'grid-cols-1'
      }`}>
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <OptimizedProductCard3D
                product={product}
                onAddToCart={addToCart}
                onToggleFavorite={handleToggleWishlist}
                isFavorite={wishlistedItems.has(product.id)}
                index={index}
                priority={index < 4}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-6 bg-white rounded-xl border shadow-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let page
              if (totalPages <= 7) {
                page = i + 1
              } else if (currentPage <= 4) {
                page = i + 1
              } else if (currentPage >= totalPages - 3) {
                page = totalPages - 6 + i
              } else {
                page = currentPage - 3 + i
              }
              
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 ${
                    page === currentPage 
                      ? "bg-orange-500 hover:bg-orange-600 text-white" 
                      : "hover:bg-orange-50 hover:text-orange-600"
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
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Trust Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-green-600" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-orange-600" />
            <span>Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-purple-600" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  )
}
