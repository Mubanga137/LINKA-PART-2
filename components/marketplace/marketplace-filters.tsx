"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { X, Filter, Search, Star, MapPin, Truck, Clock, Sparkles, Zap, Heart } from "lucide-react"
import { ProductFilters } from "@/services/product-service"

interface MarketplaceFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  isLoading: boolean
}

const CATEGORIES = [
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories', count: 680, emoji: '💍' },
  { id: 'fashion-textiles', name: 'Fashion & Textiles', count: 2100, emoji: '👗' },
  { id: 'food-beverages', name: 'Food & Beverages', count: 1800, emoji: '🍯' },
  { id: 'agriculture-natural', name: 'Agriculture & Natural', count: 1350, emoji: '🌱' },
  { id: 'tools-hardware', name: 'Tools & Hardware', count: 1100, emoji: '🔨' },
  { id: 'art-culture', name: 'Art & Culture', count: 420, emoji: '🎨' },
  { id: 'traditional-crafts', name: 'Traditional Crafts', count: 1200, emoji: '🏺' },
  { id: 'home-decor', name: 'Home & Decor', count: 950, emoji: '🏠' },
]

const POPULAR_TAGS = [
  { id: 'handmade', label: 'Handmade', emoji: '🔥' },
  { id: 'organic', label: 'Organic', emoji: '🌿' },
  { id: 'traditional', label: 'Traditional', emoji: '⭐' },
  { id: 'premium', label: 'Premium', emoji: '💎' },
  { id: 'local', label: 'Local', emoji: '📍' },
  { id: 'certified', label: 'Certified', emoji: '✅' },
  { id: 'sustainable', label: 'Sustainable', emoji: '♻️' },
  { id: 'artisan', label: 'Artisan', emoji: '👨‍🎨' },
  { id: 'trending', label: 'Trending', emoji: '📈' },
  { id: 'new', label: 'New', emoji: '✨' },
  { id: 'bestseller', label: 'Bestseller', emoji: '🏆' },
  { id: 'eco-friendly', label: 'Eco-Friendly', emoji: '🌍' }
]

const DELIVERY_OPTIONS = [
  { id: 'same-day', label: 'Same Day', icon: Zap, color: 'text-orange-600' },
  { id: 'next-day', label: 'Next Day', icon: Truck, color: 'text-blue-600' },
  { id: 'free-shipping', label: 'Free Shipping', icon: Heart, color: 'text-green-600' },
  { id: 'pickup', label: 'Store Pickup', icon: MapPin, color: 'text-purple-600' },
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
    delivery: true,
    tags: true
  })

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

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-blue-900">
              <Filter className="h-5 w-5 mr-2 text-orange-500" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white animate-pulse">
                  {activeFiltersCount}
                </Badge>
              )}
            </CardTitle>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-all duration-300"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Categories Filter */}
      <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <CardTitle className="flex items-center justify-between text-blue-900">
            <span className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-orange-500" />
              Categories
            </span>
            <span className={`transition-transform duration-300 ${expandedSections.categories ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </CardTitle>
        </CardHeader>
        {expandedSections.categories && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <div 
                  key={category.id}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                  onClick={() => updateFilters({ category: category.id === localFilters.category ? undefined : category.id })}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={localFilters.category === category.id}
                      className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <span className="text-2xl">{category.emoji}</span>
                    <div>
                      <div className="font-medium text-blue-900 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </div>
                      <div className="text-xs text-blue-600">
                        {category.count.toLocaleString()} items
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Price Range Filter */}
      <Card className="bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <CardTitle className="flex items-center justify-between text-blue-900">
            <span className="flex items-center">
              💰 Price Range
            </span>
            <span className={`transition-transform duration-300 ${expandedSections.price ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </CardTitle>
        </CardHeader>
        {expandedSections.price && (
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
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full font-semibold">
                  Up to K{priceRange[0].toLocaleString()}
                </div>
                <span className="text-blue-700">K10,000+</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Rating Filter */}
      <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('rating')}
        >
          <CardTitle className="flex items-center justify-between text-blue-900">
            <span className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Customer Rating
            </span>
            <span className={`transition-transform duration-300 ${expandedSections.rating ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </CardTitle>
        </CardHeader>
        {expandedSections.rating && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div 
                  key={rating}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-300"
                  onClick={() => updateFilters({ rating: rating === localFilters.rating ? undefined : rating })}
                >
                  <Checkbox
                    checked={localFilters.rating === rating}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-blue-700 ml-2">& up</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Delivery Options */}
      <Card className="bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('delivery')}
        >
          <CardTitle className="flex items-center justify-between text-blue-900">
            <span className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-orange-500" />
              Delivery
            </span>
            <span className={`transition-transform duration-300 ${expandedSections.delivery ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </CardTitle>
        </CardHeader>
        {expandedSections.delivery && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 gap-3">
              {DELIVERY_OPTIONS.map((option) => (
                <div 
                  key={option.id}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 cursor-pointer transition-all duration-300 group"
                >
                  <Checkbox className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                  <option.icon className={`h-5 w-5 ${option.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="font-medium text-blue-900 group-hover:text-orange-600 transition-colors">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Popular Tags */}
      <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('tags')}
        >
          <CardTitle className="flex items-center justify-between text-blue-900">
            <span className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-orange-500" />
              Popular Tags
            </span>
            <span className={`transition-transform duration-300 ${expandedSections.tags ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </CardTitle>
        </CardHeader>
        {expandedSections.tags && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={localFilters.tags?.includes(tag.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    localFilters.tags?.includes(tag.id)
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'hover:bg-blue-50 hover:border-orange-300 hover:text-orange-600'
                  }`}
                  onClick={() => {
                    const currentTags = localFilters.tags || []
                    const newTags = currentTags.includes(tag.id)
                      ? currentTags.filter(t => t !== tag.id)
                      : [...currentTags, tag.id]
                    updateFilters({ tags: newTags.length > 0 ? newTags : undefined })
                  }}
                >
                  <span className="mr-1">{tag.emoji}</span>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
