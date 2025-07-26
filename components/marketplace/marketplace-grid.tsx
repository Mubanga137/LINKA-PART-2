"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
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
  ArrowUpDown,
  Zap,
  TrendingUp,
  Sparkles,
  Share
} from "lucide-react"
import { Product } from "@/contexts/cart-context"
import { useCart } from "@/contexts/cart-context"
import { ProductSortOptions } from "@/services/product-service"
import { useRef } from "react"

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

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const sortOptions_array = [
    { value: 'newest', label: 'Newest First', icon: '🆕', color: 'from-blue-500 to-indigo-500' },
    { value: 'popular', label: 'Most Popular', icon: '🔥', color: 'from-red-500 to-orange-500' },
    { value: 'price-low', label: 'Price: Low to High', icon: '💰', color: 'from-green-500 to-emerald-500' },
    { value: 'price-high', label: 'Price: High to Low', icon: '💎', color: 'from-purple-500 to-pink-500' },
    { value: 'rating', label: 'Highest Rated', icon: '⭐', color: 'from-yellow-500 to-amber-500' },
    { value: 'recommended', label: 'Recommended', icon: '✨', color: 'from-teal-500 to-cyan-500' },
  ]

  // Enhanced product data
  const enhanceProduct = (product: Product) => ({
    ...product,
    isNew: Math.random() > 0.8,
    isTrending: Math.random() > 0.85,
    hasFreeship: Math.random() > 0.6,
    fastDelivery: Math.random() > 0.5,
    discount: Math.random() > 0.8 ? Math.floor(Math.random() * 25) + 5 : null,
    originalPrice: product.price * (1 + Math.random() * 0.4),
    vendorRating: 4.2 + Math.random() * 0.8,
    salesCount: Math.floor(Math.random() * 500) + 50,
    categoryColor: getCategoryColor(product.category),
  })

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'jewelry-accessories': 'from-purple-500 to-pink-500',
      'fashion-textiles': 'from-blue-500 to-indigo-500',
      'food-beverages': 'from-orange-500 to-red-500',
      'agriculture-natural': 'from-green-500 to-emerald-500',
      'tools-hardware': 'from-gray-500 to-slate-500',
      'art-culture': 'from-pink-500 to-rose-500',
      'traditional-crafts': 'from-amber-500 to-orange-500',
      'home-decor': 'from-teal-500 to-cyan-500',
    }
    return colors[category || ''] || 'from-blue-500 to-indigo-500'
  }

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
    }
    return emojis[category || ''] || '📦'
  }

  if (isLoading) {
    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Loading Control Bar */}
        <Card className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-lg">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gradient-to-r from-blue-200 to-orange-200 rounded-lg w-1/3"></div>
            </div>
          </CardContent>
        </Card>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-white/90 to-blue-50/90 rounded-2xl p-6 space-y-4 border border-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="aspect-square bg-gradient-to-br from-blue-200 to-orange-200 rounded-xl animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-blue-200 to-orange-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-blue-200 to-orange-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      ref={ref}
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Enhanced Control Bar */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 overflow-hidden">
          <CardContent className="p-6">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 opacity-0 hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </motion.div>
                <span className="font-semibold text-blue-900">
                  <motion.span
                    className="text-orange-600 text-lg"
                    animate={{ 
                      color: ["#ea580c", "#f97316", "#ea580c"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {totalProducts.toLocaleString()}
                  </motion.span>
                  <span className="text-blue-600 ml-1">products found</span>
                </span>
                <div className="text-sm text-blue-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Enhanced Sort Dropdown */}
                <Select value={sortOptions.sortBy} onValueChange={(value) => onSortChange({ ...sortOptions, sortBy: value as any })}>
                  <SelectTrigger className="w-48 bg-white/80 border-white/50 hover:bg-white transition-all duration-300 shadow-sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border-white/50">
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

                {/* Animated View Mode Toggle */}
                <div className="flex bg-white/80 rounded-xl overflow-hidden border border-white/50 shadow-sm">
                  {(['grid', 'list'] as const).map((mode) => (
                    <motion.div key={mode} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={viewMode === mode ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-2 transition-all duration-300 ${
                          viewMode === mode 
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" 
                            : "hover:bg-blue-50"
                        }`}
                      >
                        {mode === 'grid' ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Animated Products Grid */}
      <motion.div 
        className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-6"
        }
        variants={containerVariants}
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => {
            const enhanced = enhanceProduct(product)
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Card className="group relative bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden">
                  {/* Animated Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${enhanced.categoryColor} opacity-0 group-hover:opacity-5`}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Product Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
                    <AnimatePresence>
                      {enhanced.isNew && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        >
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                            <Sparkles className="h-3 w-3 mr-1" />
                            New
                          </Badge>
                        </motion.div>
                      )}
                      {enhanced.isTrending && (
                        <motion.div
                          initial={{ scale: 0, x: -20 }}
                          animate={{ scale: 1, x: 0 }}
                          exit={{ scale: 0, x: -20 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg animate-pulse">
                            🔥 Trending
                          </Badge>
                        </motion.div>
                      )}
                      {enhanced.discount && (
                        <motion.div
                          initial={{ scale: 0, y: -20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0, y: -20 }}
                          whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                        >
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg font-bold">
                            -{enhanced.discount}% OFF
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Quick Actions */}
                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        className="absolute top-3 right-3 z-10 flex flex-col space-y-2"
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {[
                          { icon: Heart, color: 'text-red-500', bg: 'hover:bg-red-50' },
                          { icon: Eye, color: 'text-blue-500', bg: 'hover:bg-blue-50' },
                          { icon: Share, color: 'text-purple-500', bg: 'hover:bg-purple-50' }
                        ].map((action, idx) => (
                          <motion.div
                            key={`${product.id}-action-${idx}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className={`bg-white/90 hover:bg-white shadow-lg ${action.bg} transition-all duration-300 p-2`}
                            >
                              <action.icon className={`h-4 w-4 ${action.color}`} />
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <motion.div 
                      className="aspect-square bg-gradient-to-br from-blue-100 to-orange-100 p-8"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full h-full bg-white rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
                        <motion.span 
                          className="text-6xl"
                          animate={hoveredProduct === product.id ? { 
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0]
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {getCategoryEmoji(enhanced.category)}
                        </motion.span>
                        
                        {/* Floating particles on hover */}
                        <AnimatePresence>
                          {hoveredProduct === product.id && (
                            <>
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-2 h-2 bg-orange-400 rounded-full"
                                  initial={{ 
                                    x: Math.random() * 100,
                                    y: Math.random() * 100,
                                    scale: 0,
                                    opacity: 0
                                  }}
                                  animate={{ 
                                    y: -20,
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                  }}
                                  transition={{ 
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    repeat: Infinity
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                    
                    {/* Overlay with Add to Cart */}
                    <AnimatePresence>
                      {hoveredProduct === product.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="absolute bottom-4 left-4 right-4"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <Button 
                              onClick={() => handleAddToCart(enhanced)}
                              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <CardContent className="p-6">
                    {/* Vendor Info */}
                    <motion.div 
                      className="flex items-center space-x-2 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <motion.div 
                        className={`w-6 h-6 bg-gradient-to-br ${enhanced.categoryColor} rounded-full flex items-center justify-center`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white text-xs font-bold">V</span>
                      </motion.div>
                      <span className="text-sm text-blue-600 font-medium">{enhanced.vendor || 'Local Vendor'}</span>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                        ✓ Verified
                      </Badge>
                    </motion.div>

                    {/* Product Title */}
                    <motion.h3 
                      className="font-bold text-blue-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {enhanced.name}
                    </motion.h3>

                    {/* Rating */}
                    <motion.div 
                      className="flex items-center space-x-2 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                i < Math.floor(enhanced.rating || 4.5)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-sm text-blue-600">
                        {(enhanced.rating || 4.5).toFixed(1)} ({enhanced.salesCount})
                      </span>
                    </motion.div>

                    {/* Price */}
                    <motion.div 
                      className="flex items-center space-x-2 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <motion.span 
                        className="text-2xl font-bold text-blue-900"
                        whileHover={{ scale: 1.05 }}
                      >
                        K{enhanced.price.toLocaleString()}
                      </motion.span>
                      <AnimatePresence>
                        {enhanced.discount && (
                          <motion.span 
                            className="text-sm text-gray-500 line-through"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                          >
                            K{enhanced.originalPrice.toLocaleString()}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Features */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <AnimatePresence>
                        {enhanced.hasFreeship && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                              <Truck className="h-3 w-3 mr-1" />
                              Free Ship
                            </Badge>
                          </motion.div>
                        )}
                        {enhanced.fastDelivery && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50">
                              <Zap className="h-3 w-3 mr-1" />
                              Fast
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                        <MapPin className="h-3 w-3 mr-1" />
                        Local
                      </Badge>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex space-x-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <Link href={`/products/${enhanced.id}`} className="flex-1">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-300">
                            View Details
                          </Button>
                        </motion.div>
                      </Link>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={() => handleAddToCart(enhanced)}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts.toLocaleString()} products
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                  </motion.div>
                  
                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + Math.max(1, currentPage - 2)
                      return (
                        <motion.div 
                          key={page}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
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
                        </motion.div>
                      )
                    })}
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
