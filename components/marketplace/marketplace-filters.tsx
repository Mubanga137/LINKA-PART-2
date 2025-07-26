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
import { X, Filter, Search, Star, MapPin, Truck, Clock, ChevronDown } from "lucide-react"
import { ProductFilters } from "@/services/product-service"

interface MarketplaceFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  isLoading: boolean
}

const CATEGORIES = [
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories', count: 680 },
  { id: 'fashion-textiles', name: 'Fashion & Textiles', count: 2100 },
  { id: 'food-beverages', name: 'Food & Beverages', count: 1800 },
  { id: 'agriculture-natural', name: 'Agriculture & Natural', count: 1350 },
  { id: 'tools-hardware', name: 'Tools & Hardware', count: 1100 },
  { id: 'art-culture', name: 'Art & Culture', count: 420 },
  { id: 'traditional-crafts', name: 'Traditional Crafts', count: 1200 },
  { id: 'home-decor', name: 'Home & Decor', count: 950 },
]

const POPULAR_TAGS = [
  'handmade', 'organic', 'traditional', 'premium', 'local', 'certified', 
  'sustainable', 'artisan', 'trending', 'new', 'bestseller', 'eco-friendly'
]

const DELIVERY_OPTIONS = [
  { id: 'same-day', label: 'Same Day Delivery' },
  { id: 'next-day', label: 'Next Day Delivery' },
  { id: 'free-shipping', label: 'Free Shipping' },
  { id: 'pickup', label: 'Store Pickup Available' },
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
    <div className="space-y-4">
      {/* Filter Header */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-gray-900 text-lg">
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">
                  {activeFiltersCount}
                </Badge>
              )}
            </CardTitle>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Categories Filter */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Categories</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {expandedSections.categories && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <div 
                  key={category.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => updateFilters({ category: category.id === localFilters.category ? undefined : category.id })}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={localFilters.category === category.id}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500">
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
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Price Range</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
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
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>K0</span>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-medium text-sm">
                  K{priceRange[0].toLocaleString()}
                </div>
                <span>K10,000+</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Rating Filter */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('rating')}
        >
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Customer Rating</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {expandedSections.rating && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div 
                  key={rating}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => updateFilters({ rating: rating === localFilters.rating ? undefined : rating })}
                >
                  <Checkbox
                    checked={localFilters.rating === rating}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
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
                    <span className="text-sm text-gray-600 ml-2">& up</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Delivery Options */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('delivery')}
        >
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Delivery</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.delivery ? 'rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {expandedSections.delivery && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {DELIVERY_OPTIONS.map((option) => (
                <div 
                  key={option.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Checkbox className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Popular Tags */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('tags')}
        >
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Popular Tags</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.tags ? 'rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {expandedSections.tags && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={localFilters.tags?.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    localFilters.tags?.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => {
                    const currentTags = localFilters.tags || []
                    const newTags = currentTags.includes(tag)
                      ? currentTags.filter(t => t !== tag)
                      : [...currentTags, tag]
                    updateFilters({ tags: newTags.length > 0 ? newTags : undefined })
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
