"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { X, Search, Star, Truck, ChevronDown, ChevronUp } from "lucide-react"
import { ProductFilters } from "@/services/product-service"

interface MarketplaceFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  isLoading: boolean
}

const CATEGORIES = [
  {
    id: 'fashion',
    name: 'Fashion & Style',
    emoji: '👗',
    subcategories: [
      { id: 'fashion-men', name: 'Men\'s Fashion', path: '/categories/fashion#men' },
      { id: 'fashion-women', name: 'Women\'s Fashion', path: '/categories/fashion#women' },
      { id: 'fashion-kids', name: 'Kids\' Fashion', path: '/categories/fashion#kids' },
      { id: 'fashion-textiles', name: 'Textiles & Tailoring', path: '/categories/fashion/textiles' }
    ]
  },
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories', emoji: '💍' },
  { id: 'food-beverages', name: 'Food & Beverages', emoji: '🍯' },
  { id: 'agriculture-natural', name: 'Agriculture & Natural', emoji: '🌱' },
  { id: 'tools-hardware', name: 'Tools & Hardware', emoji: '🔨' },
  { id: 'art-culture', name: 'Art & Culture', emoji: '🎨' },
  { id: 'traditional-crafts', name: 'Traditional Crafts', emoji: '🏺' },
  { id: 'home-decor', name: 'Home & Decor', emoji: '🏠' },
  { id: 'services', name: 'Services', emoji: '🛎️' },
]

export function MarketplaceFilters({ filters, onFiltersChange, isLoading }: MarketplaceFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '')
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    shipping: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, category: categoryId })
    } else {
      onFiltersChange({ ...filters, category: undefined })
    }
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    onFiltersChange({
      ...filters,
      priceRange: { min: values[0], max: values[1] }
    })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onFiltersChange({ ...filters, searchQuery: query || undefined })
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, rating })
    } else {
      onFiltersChange({ ...filters, rating: undefined })
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setPriceRange([0, 1000])
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof ProductFilters] !== undefined
  )

  return (
    <div className="space-y-4">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          onClick={clearFilters}
          variant="outline" 
          className="w-full"
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}

      {/* Categories */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('categories')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            Categories
            {expandedSections.categories ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.categories && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.category === category.id}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label 
                    htmlFor={category.id} 
                    className="text-sm cursor-pointer flex items-center gap-2"
                  >
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('price')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            Price Range
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
                disabled={isLoading}
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>K{priceRange[0]}</span>
                <span>K{priceRange[1]}</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('rating')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            Customer Rating
            {expandedSections.rating ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.rating && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={(checked) => 
                      handleRatingChange(rating, checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label 
                    htmlFor={`rating-${rating}`} 
                    className="text-sm cursor-pointer flex items-center gap-1"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>& up</span>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Shipping */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('shipping')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            Shipping
            {expandedSections.shipping ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.shipping && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-shipping"
                  checked={filters.tags?.includes('free-shipping') || false}
                  onCheckedChange={(checked) => {
                    const tags = filters.tags || []
                    if (checked) {
                      onFiltersChange({
                        ...filters,
                        tags: [...tags, 'free-shipping']
                      })
                    } else {
                      onFiltersChange({
                        ...filters,
                        tags: tags.filter(tag => tag !== 'free-shipping')
                      })
                    }
                  }}
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="free-shipping" 
                  className="text-sm cursor-pointer flex items-center gap-2"
                >
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </Label>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
