"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { X, Filter, Search, Star, MapPin, Truck, Clock, ChevronDown, Sparkles, Zap } from "lucide-react"
import { ProductFilters } from "@/services/product-service"
import { useRef } from "react"

interface MarketplaceFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  isLoading: boolean
}

const CATEGORIES = [
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories', count: 680, emoji: '💍', color: 'from-purple-500 to-pink-500' },
  { id: 'fashion-textiles', name: 'Fashion & Textiles', count: 2100, emoji: '👗', color: 'from-blue-500 to-indigo-500' },
  { id: 'food-beverages', name: 'Food & Beverages', count: 1800, emoji: '🍯', color: 'from-orange-500 to-red-500' },
  { id: 'agriculture-natural', name: 'Agriculture & Natural', count: 1350, emoji: '🌱', color: 'from-green-500 to-emerald-500' },
  { id: 'tools-hardware', name: 'Tools & Hardware', count: 1100, emoji: '🔨', color: 'from-gray-500 to-slate-500' },
  { id: 'art-culture', name: 'Art & Culture', count: 420, emoji: '🎨', color: 'from-pink-500 to-rose-500' },
  { id: 'traditional-crafts', name: 'Traditional Crafts', count: 1200, emoji: '🏺', color: 'from-amber-500 to-orange-500' },
  { id: 'home-decor', name: 'Home & Decor', count: 950, emoji: '🏠', color: 'from-teal-500 to-cyan-500' },
]

const POPULAR_TAGS = [
  { id: 'handmade', label: 'Handmade', emoji: '🔥', color: 'from-red-500 to-orange-500' },
  { id: 'organic', label: 'Organic', emoji: '🌿', color: 'from-green-500 to-emerald-500' },
  { id: 'traditional', label: 'Traditional', emoji: '⭐', color: 'from-yellow-500 to-amber-500' },
  { id: 'premium', label: 'Premium', emoji: '💎', color: 'from-blue-500 to-indigo-500' },
  { id: 'local', label: 'Local', emoji: '📍', color: 'from-purple-500 to-pink-500' },
  { id: 'certified', label: 'Certified', emoji: '✅', color: 'from-green-500 to-teal-500' },
  { id: 'sustainable', label: 'Sustainable', emoji: '♻️', color: 'from-teal-500 to-green-500' },
  { id: 'artisan', label: 'Artisan', emoji: '👨‍🎨', color: 'from-orange-500 to-red-500' },
  { id: 'trending', label: 'Trending', emoji: '📈', color: 'from-pink-500 to-purple-500' },
  { id: 'new', label: 'New', emoji: '✨', color: 'from-blue-500 to-cyan-500' },
  { id: 'bestseller', label: 'Bestseller', emoji: '🏆', color: 'from-yellow-500 to-orange-500' },
  { id: 'eco-friendly', label: 'Eco-Friendly', emoji: '🌍', color: 'from-green-500 to-blue-500' }
]

const DELIVERY_OPTIONS = [
  { id: 'same-day', label: 'Same Day', icon: Zap, color: 'from-orange-500 to-red-500' },
  { id: 'next-day', label: 'Next Day', icon: Truck, color: 'from-blue-500 to-indigo-500' },
  { id: 'free-shipping', label: 'Free Shipping', icon: Sparkles, color: 'from-green-500 to-emerald-500' },
  { id: 'pickup', label: 'Store Pickup', icon: MapPin, color: 'from-purple-500 to-pink-500' },
]

export function MarketplaceFilters({ 
  filters, 
  onFiltersChange, 
  isLoading 
}: MarketplaceFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters)
  const [priceRange, setPriceRange] = useState<[number]>([filters.priceRange?.max || 10000])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    delivery: false,
    tags: false
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    setLocalFilters(filters)
    setPriceRange([filters.priceRange?.max || 10000])
  }, [filters])

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...localFilters, ...newFilters }
    setLocalFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: ProductFilters = {}
    setLocalFilters(clearedFilters)
    setPriceRange([10000])
    onFiltersChange(clearedFilters)
  }

  const activeFiltersCount = Object.values(localFilters).filter(value => 
    value !== undefined && value !== null && 
    (Array.isArray(value) ? value.length > 0 : true)
  ).length

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
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
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Filter Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 overflow-hidden">
          <CardHeader className="pb-4 relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 opacity-0 hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <div className="relative flex items-center justify-between">
              <CardTitle className="flex items-center text-blue-900 text-lg">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Filter className="h-5 w-5 mr-2 text-orange-500" />
                </motion.div>
                Filters
                <AnimatePresence>
                  {activeFiltersCount > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white animate-pulse">
                        {activeFiltersCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardTitle>
              <AnimatePresence>
                {activeFiltersCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-all duration-300"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Categories Filter */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 overflow-hidden">
          <motion.div
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.02)" }}
            transition={{ duration: 0.2 }}
          >
            <CardHeader 
              className="pb-3 cursor-pointer"
              onClick={() => toggleSection('categories')}
            >
              <CardTitle className="flex items-center justify-between text-blue-900">
                <span className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5 mr-2 text-orange-500" />
                  </motion.div>
                  Categories
                </span>
                <motion.span
                  animate={{ rotate: expandedSections.categories ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </CardTitle>
            </CardHeader>
          </motion.div>
          
          <AnimatePresence>
            {expandedSections.categories && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {CATEGORIES.map((category, index) => (
                      <motion.div 
                        key={category.id}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all duration-300 cursor-pointer overflow-hidden relative"
                        onClick={() => updateFilters({ category: category.id === localFilters.category ? undefined : category.id })}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5`}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <div className="relative flex items-center space-x-3">
                          <Checkbox
                            checked={localFilters.category === category.id}
                            className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                          />
                          <motion.span 
                            className="text-2xl"
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.3 }}
                          >
                            {category.emoji}
                          </motion.span>
                          <div>
                            <div className="font-medium text-blue-900 group-hover:text-orange-600 transition-colors">
                              {category.name}
                            </div>
                            <motion.div 
                              className="text-xs text-blue-600"
                              animate={localFilters.category === category.id ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {category.count.toLocaleString()} items
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Price Range Filter */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-white/95 to-orange-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-orange-500/10 overflow-hidden">
          <motion.div
            whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.02)" }}
            transition={{ duration: 0.2 }}
          >
            <CardHeader 
              className="pb-3 cursor-pointer"
              onClick={() => toggleSection('price')}
            >
              <CardTitle className="flex items-center justify-between text-blue-900">
                <span className="flex items-center">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl mr-2"
                  >
                    💰
                  </motion.span>
                  Price Range
                </span>
                <motion.span
                  animate={{ rotate: expandedSections.price ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </CardTitle>
            </CardHeader>
          </motion.div>
          
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        onValueCommit={(value) => updateFilters({ priceRange: { min: 0, max: value[0] } })}
                        max={10000}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">K0</span>
                      <motion.div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        animate={{ 
                          boxShadow: [
                            "0 4px 6px rgba(249, 115, 22, 0.3)",
                            "0 8px 15px rgba(249, 115, 22, 0.4)",
                            "0 4px 6px rgba(249, 115, 22, 0.3)"
                          ]
                        }}
                        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                      >
                        Up to K{priceRange[0].toLocaleString()}
                      </motion.div>
                      <span className="text-blue-700">K10,000+</span>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Rating Filter */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 overflow-hidden">
          <motion.div
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.02)" }}
            transition={{ duration: 0.2 }}
          >
            <CardHeader 
              className="pb-3 cursor-pointer"
              onClick={() => toggleSection('rating')}
            >
              <CardTitle className="flex items-center justify-between text-blue-900">
                <span className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-5 w-5 mr-2 text-yellow-500 fill-current" />
                  </motion.div>
                  Customer Rating
                </span>
                <motion.span
                  animate={{ rotate: expandedSections.rating ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </CardTitle>
            </CardHeader>
          </motion.div>
          
          <AnimatePresence>
            {expandedSections.rating && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating, index) => (
                      <motion.div 
                        key={rating}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-300"
                        onClick={() => updateFilters({ rating: rating === localFilters.rating ? undefined : rating })}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Checkbox
                          checked={localFilters.rating === rating}
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2, delay: i * 0.05 }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  i < rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            </motion.div>
                          ))}
                          <span className="text-sm text-blue-700 ml-2">& up</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Delivery Options */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-white/95 to-orange-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-orange-500/10 overflow-hidden">
          <motion.div
            whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.02)" }}
            transition={{ duration: 0.2 }}
          >
            <CardHeader 
              className="pb-3 cursor-pointer"
              onClick={() => toggleSection('delivery')}
            >
              <CardTitle className="flex items-center justify-between text-blue-900">
                <span className="flex items-center">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Truck className="h-5 w-5 mr-2 text-orange-500" />
                  </motion.div>
                  Delivery
                </span>
                <motion.span
                  animate={{ rotate: expandedSections.delivery ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </CardTitle>
            </CardHeader>
          </motion.div>
          
          <AnimatePresence>
            {expandedSections.delivery && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-3">
                    {DELIVERY_OPTIONS.map((option, index) => (
                      <motion.div 
                        key={option.id}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 cursor-pointer transition-all duration-300 group relative overflow-hidden"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-5`}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <Checkbox className="relative z-10 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10"
                        >
                          <option.icon className="h-5 w-5 text-orange-500" />
                        </motion.div>
                        <span className="relative z-10 font-medium text-blue-900 group-hover:text-orange-600 transition-colors">
                          {option.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Popular Tags */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 overflow-hidden">
          <motion.div
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.02)" }}
            transition={{ duration: 0.2 }}
          >
            <CardHeader 
              className="pb-3 cursor-pointer"
              onClick={() => toggleSection('tags')}
            >
              <CardTitle className="flex items-center justify-between text-blue-900">
                <span className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5 mr-2 text-orange-500" />
                  </motion.div>
                  Popular Tags
                </span>
                <motion.span
                  animate={{ rotate: expandedSections.tags ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </CardTitle>
            </CardHeader>
          </motion.div>
          
          <AnimatePresence>
            {expandedSections.tags && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_TAGS.map((tag, index) => (
                      <motion.div
                        key={tag.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant={localFilters.tags?.includes(tag.id) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-300 relative overflow-hidden ${
                            localFilters.tags?.includes(tag.id)
                              ? `bg-gradient-to-r ${tag.color} text-white shadow-lg border-0`
                              : 'hover:bg-blue-50 hover:border-orange-300 hover:text-orange-600 border-gray-200'
                          }`}
                          onClick={() => {
                            const currentTags = localFilters.tags || []
                            const newTags = currentTags.includes(tag.id)
                              ? currentTags.filter(t => t !== tag.id)
                              : [...currentTags, tag.id]
                            updateFilters({ tags: newTags.length > 0 ? newTags : undefined })
                          }}
                        >
                          <motion.span 
                            className="mr-1"
                            animate={localFilters.tags?.includes(tag.id) ? { rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {tag.emoji}
                          </motion.span>
                          {tag.label}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  )
}
