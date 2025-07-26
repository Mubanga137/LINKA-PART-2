"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  MapPin, 
  Filter,
  Grid3X3,
  List,
  Star,
  Truck,
  Zap,
  TrendingUp,
  Sparkles,
  ShoppingBag
} from "lucide-react"
import { ProductFilters } from "@/services/product-service"
import { useRef } from "react"

interface MarketplaceHeaderProps {
  totalProducts: number
  currentFilters: ProductFilters
}

export function MarketplaceHeader({ totalProducts, currentFilters }: MarketplaceHeaderProps) {
  const [searchValue, setSearchValue] = useState(currentFilters.searchQuery || "")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getPageTitle = () => {
    if (currentFilters.category) {
      const categoryNames: Record<string, string> = {
        'jewelry-accessories': 'Jewelry & Accessories',
        'fashion-textiles': 'Fashion & Textiles',
        'food-beverages': 'Food & Beverages',
        'agriculture-natural': 'Agriculture & Natural',
        'tools-hardware': 'Tools & Hardware',
        'art-culture': 'Art & Culture',
        'traditional-crafts': 'Traditional Crafts',
        'home-decor': 'Home & Decor'
      }
      return categoryNames[currentFilters.category] || 'Marketplace'
    }
    
    if (currentFilters.searchQuery) {
      return `Search results for "${currentFilters.searchQuery}"`
    }

    if (currentFilters.tags?.includes('trending')) {
      return 'Trending Products'
    }

    return 'Linka Marketplace'
  }

  const getPageDescription = () => {
    if (currentFilters.category) {
      return 'Discover amazing products from verified local sellers'
    }
    
    if (currentFilters.searchQuery) {
      return `Found ${totalProducts.toLocaleString()} products matching your search`
    }

    if (currentFilters.tags?.includes('trending')) {
      return 'Most popular products right now'
    }

    return 'Discover products and services from local Zambian businesses in our vibrant marketplace ecosystem'
  }

  const hasActiveFilters = () => {
    return currentFilters.category || 
           currentFilters.searchQuery || 
           currentFilters.tags?.length || 
           currentFilters.priceRange ||
           currentFilters.rating
  }

  const quickFilters = [
    { icon: MapPin, label: 'Near Me', color: 'from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700' },
    { icon: Star, label: 'Top Rated', color: 'from-yellow-500 to-yellow-600', hoverColor: 'hover:from-yellow-600 hover:to-yellow-700' },
    { icon: Truck, label: 'Free Delivery', color: 'from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700' },
    { icon: Zap, label: 'Fast Delivery', color: 'from-orange-500 to-orange-600', hoverColor: 'hover:from-orange-600 hover:to-orange-700' },
    { icon: TrendingUp, label: 'Trending', color: 'from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700' }
  ]

  return (
    <motion.div 
      ref={ref}
      className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Patterns */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-16 left-1/3 w-40 h-40 bg-purple-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Page Title Section */}
        <motion.div 
          className="text-center mb-10"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <ShoppingBag className="h-16 w-16 text-orange-400" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-orange-200 bg-clip-text text-transparent">
              {getPageTitle()}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {getPageDescription()}
          </motion.p>

          {/* Live Stats */}
          <motion.div 
            className="flex items-center justify-center mt-8 space-x-8"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { value: totalProducts.toLocaleString(), label: 'Products' },
              { value: `${Math.floor(totalProducts / 10)}+`, label: 'Vendors' },
              { value: '4.8★', label: 'Rating' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="group text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-2xl font-bold text-orange-400"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div 
          className="max-w-3xl mx-auto mb-10"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-orange-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className={`relative bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-xl transition-all duration-300 ${
                isSearchFocused 
                  ? 'ring-4 ring-orange-400/50 shadow-2xl shadow-orange-500/20' 
                  : 'shadow-black/10'
              }`}
              animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
            >
              <div className="flex items-center">
                <motion.div
                  animate={isSearchFocused ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Search className="ml-4 h-6 w-6 text-blue-500" />
                </motion.div>
                <Input
                  type="text"
                  placeholder="Search for products, vendors, or categories..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 border-0 bg-transparent text-lg placeholder:text-slate-400 focus:ring-0 px-4 py-4"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
                  >
                    <motion.div
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Search
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quick Filter Pills */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {quickFilters.map((filter, index) => (
            <motion.div
              key={filter.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className={`rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white ${filter.hoverColor} hover:scale-105 transition-all duration-300 hover:shadow-lg hover:border-white/40`}
              >
                <filter.icon className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Results Summary Bar */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ bg: "rgba(255, 255, 255, 0.15)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <motion.span 
                className="text-white font-medium"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <motion.span 
                  className="text-orange-400 font-bold text-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {totalProducts.toLocaleString()}
                </motion.span> products found
              </motion.span>
              
              <AnimatePresence>
                {hasActiveFilters() && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 hover:bg-orange-500/30 transition-colors duration-300">
                      <Filter className="h-3 w-3 mr-1" />
                      Filters Active
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Mode Toggle */}
            <motion.div 
              className="hidden md:flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span className="text-sm text-blue-200">View:</span>
              <div className="flex bg-white/10 rounded-lg overflow-hidden border border-white/20">
                {(['grid', 'list'] as const).map((mode) => (
                  <motion.div key={mode} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant={viewMode === mode ? "default" : "ghost"} 
                      size="sm" 
                      className={`px-4 py-2 transition-all duration-300 ${
                        viewMode === mode 
                          ? "bg-orange-500 text-white shadow-lg" 
                          : "text-white hover:bg-white/20"
                      }`}
                      onClick={() => setViewMode(mode)}
                    >
                      {mode === 'grid' ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave Effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
          <motion.path 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,106.7C672,85,768,75,864,74.7C960,75,1056,85,1152,90.7L1200,96L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="rgb(248 250 252)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
