"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Search, 
  Star, 
  Truck, 
  ChevronDown, 
  ChevronUp, 
  Filter,
  MapPin,
  Clock,
  Shield,
  Award,
  Zap,
  TrendingUp,
  Heart,
  Package,
  Users,
  Sparkles,
  Globe,
  CheckCircle,
  RefreshCw
} from "lucide-react"
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
    count: 1240,
    trending: true,
    subcategories: [
      { id: 'fashion-men', name: 'Men\'s Fashion', count: 320 },
      { id: 'fashion-women', name: 'Women\'s Fashion', count: 680 },
      { id: 'fashion-kids', name: 'Kids\' Fashion', count: 240 },
      { id: 'fashion-textiles', name: 'Textiles & Tailoring', count: 156 }
    ]
  },
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories', emoji: '💍', count: 890, featured: true },
  { id: 'food-beverages', name: 'Food & Beverages', emoji: '🍯', count: 560 },
  { id: 'agriculture-natural', name: 'Agriculture & Natural', emoji: '🌱', count: 780 },
  { id: 'tools-hardware', name: 'Tools & Hardware', emoji: '🔨', count: 445 },
  { id: 'art-culture', name: 'Art & Culture', emoji: '🎨', count: 334 },
  { id: 'traditional-crafts', name: 'Traditional Crafts', emoji: '🏺', count: 267 },
  { id: 'home-decor', name: 'Home & Decor', emoji: '🏠', count: 623 },
  { id: 'services', name: 'Services', emoji: '🛎️', count: 890, hot: true },
]

const TRENDING_FILTERS = [
  { label: 'Flash Sale', value: 'flash-sale', icon: '⚡', color: 'bg-red-100 text-red-700' },
  { label: 'Free Shipping', value: 'free-shipping', icon: '🚚', color: 'bg-green-100 text-green-700' },
  { label: 'New Arrivals', value: 'new', icon: '✨', color: 'bg-blue-100 text-blue-700' },
  { label: 'Top Rated', value: 'top-rated', icon: '⭐', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Local Made', value: 'local', icon: '🇰🇪', color: 'bg-purple-100 text-purple-700' },
]

const PRICE_RANGES = [
  { label: 'Under K100', min: 0, max: 100 },
  { label: 'K100 - K500', min: 100, max: 500 },
  { label: 'K500 - K1000', min: 500, max: 1000 },
  { label: 'K1000 - K5000', min: 1000, max: 5000 },
  { label: 'Above K5000', min: 5000, max: 50000 },
]

const LOCATIONS = [
  { name: 'Nairobi', count: 2340, popular: true },
  { name: 'Mombasa', count: 1890 },
  { name: 'Kisumu', count: 1234 },
  { name: 'Nakuru', count: 987 },
  { name: 'Eldoret', count: 756 },
  { name: 'Thika', count: 623 },
]

export function MarketplaceFilters({ filters, onFiltersChange, isLoading }: MarketplaceFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '')
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    trending: true,
    categories: true,
    price: true,
    rating: true,
    shipping: true,
    location: false,
    features: false
  })
  
  const searchRef = useRef<HTMLInputElement>(null)
  const searchTimeout = useRef<NodeJS.Timeout>()

  // Mock search suggestions - in real app, this would come from API
  const SEARCH_SUGGESTIONS = [
    'African dresses', 'Traditional jewelry', 'Handmade crafts', 'Local honey',
    'Maasai beads', 'Ankara fabric', 'Kenyan coffee', 'Wood carvings',
    'Kikoy shirts', 'Sisal baskets', 'African prints', 'Local spices'
  ]

  useEffect(() => {
    if (searchQuery.length > 1) {
      const suggestions = SEARCH_SUGGESTIONS.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

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
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      onFiltersChange({
        ...filters,
        priceRange: { min: values[0], max: values[1] }
      })
    }, 500)
  }

  const handleQuickPriceSelect = (min: number, max: number) => {
    setPriceRange([min, max])
    onFiltersChange({
      ...filters,
      priceRange: { min, max }
    })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      onFiltersChange({ ...filters, searchQuery: query || undefined })
    }, 300)
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, rating })
    } else {
      onFiltersChange({ ...filters, rating: undefined })
    }
  }

  const handleTagToggle = (tag: string) => {
    const tags = filters.tags || []
    const newTags = tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [...tags, tag]
    
    onFiltersChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined
    })
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, location })
    } else {
      onFiltersChange({ ...filters, location: undefined })
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setPriceRange([0, 5000])
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof ProductFilters] !== undefined
  )

  const activeFilterCount = Object.values(filters).filter(value => 
    value !== undefined && value !== null && 
    (Array.isArray(value) ? value.length > 0 : true)
  ).length

  return (
    <div className="space-y-4">
      {/* Mobile Filter Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-semibold">Filters</span>
          {activeFilterCount > 0 && (
            <Badge className="bg-orange-500 text-white">{activeFilterCount}</Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Search */}
      <Card className="overflow-visible">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              ref={searchRef}
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-4 h-11 border-gray-200 focus:border-orange-500"
            />
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50"
                >
                  <div className="p-2">
                    {searchSuggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSearchQuery(suggestion)
                          handleSearchChange(suggestion)
                          setShowSuggestions(false)
                        }}
                        className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-50 rounded text-sm"
                      >
                        <Search className="h-3 w-3 text-gray-400" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters - Trending */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('trending')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              Trending Now
            </div>
            {expandedSections.trending ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.trending && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {TRENDING_FILTERS.map((trend) => {
                const isActive = filters.tags?.includes(trend.value)
                return (
                  <motion.button
                    key={trend.value}
                    onClick={() => handleTagToggle(trend.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : `${trend.color} hover:shadow-sm`
                    }`}
                  >
                    <span>{trend.icon}</span>
                    <span>{trend.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button 
            onClick={clearFilters}
            variant="outline" 
            className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters ({activeFilterCount})
          </Button>
        </motion.div>
      )}

      {/* Categories */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('categories')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              Categories
            </div>
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
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
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
                        className="text-sm cursor-pointer flex items-center gap-2 flex-1"
                      >
                        <span className="text-lg">{category.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{category.name}</span>
                            {category.trending && (
                              <Badge className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5">
                                <TrendingUp className="h-2.5 w-2.5 mr-1" />
                                Hot
                              </Badge>
                            )}
                            {category.featured && (
                              <Badge className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5">
                                <Star className="h-2.5 w-2.5 mr-1" />
                                Featured
                              </Badge>
                            )}
                            {category.hot && (
                              <Badge className="bg-green-100 text-green-600 text-xs px-1.5 py-0.5">
                                <Zap className="h-2.5 w-2.5 mr-1" />
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{category.count} items</div>
                        </div>
                      </Label>
                    </div>
                  </div>

                  {/* Fashion subcategories */}
                  {category.id === 'fashion' && category.subcategories && filters.category === 'fashion' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-6 space-y-2 border-l-2 border-gray-100 pl-4"
                    >
                      {category.subcategories.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <span className="text-xs text-gray-600">{sub.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{sub.count}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
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
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-green-500" />
              Price Range
            </div>
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
              {/* Quick Price Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {PRICE_RANGES.map((range) => (
                  <Button
                    key={range.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPriceSelect(range.min, range.max)}
                    className={`text-xs ${
                      priceRange[0] === range.min && priceRange[1] === range.max
                        ? 'border-orange-500 text-orange-600 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
              
              <Separator />
              
              {/* Custom Range Slider */}
              <div className="space-y-3">
                <Label className="text-xs text-gray-600">Custom Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={10000}
                  min={0}
                  step={50}
                  className="w-full"
                  disabled={isLoading}
                />
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-orange-600">K{priceRange[0].toLocaleString()}</span>
                  <span className="font-medium text-orange-600">K{priceRange[1].toLocaleString()}</span>
                </div>
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
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Customer Rating
            </div>
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
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
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
                      className="text-sm cursor-pointer flex items-center gap-2"
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
                  <span className="text-xs text-gray-500">
                    ({Math.floor(Math.random() * 500) + 100})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('location')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-500" />
              Location
            </div>
            {expandedSections.location ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.location && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {LOCATIONS.map((location) => (
                <div key={location.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location.name}`}
                      checked={filters.location === location.name}
                      onCheckedChange={(checked) => 
                        handleLocationChange(location.name, checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <Label 
                      htmlFor={`location-${location.name}`} 
                      className="text-sm cursor-pointer flex items-center gap-2"
                    >
                      <span>{location.name}</span>
                      {location.popular && (
                        <Badge className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5">
                          Popular
                        </Badge>
                      )}
                    </Label>
                  </div>
                  <span className="text-xs text-gray-500">{location.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Features Filter */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection('features')}
        >
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Features
            </div>
            {expandedSections.features ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.features && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[
                { id: 'verified', label: 'Verified Sellers', icon: Shield },
                { id: 'fast-delivery', label: 'Fast Delivery', icon: Truck },
                { id: 'mobile-money', label: 'Mobile Money', icon: Globe },
                { id: 'quality-guaranteed', label: 'Quality Guaranteed', icon: Award },
                { id: 'customer-choice', label: 'Customer Choice', icon: Heart },
                { id: 'local-business', label: 'Local Business', icon: Users },
              ].map((feature) => {
                const Icon = feature.icon
                const isActive = filters.tags?.includes(feature.id)
                
                return (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature.id}
                      checked={isActive}
                      onCheckedChange={() => handleTagToggle(feature.id)}
                      disabled={isLoading}
                    />
                    <Label 
                      htmlFor={feature.id} 
                      className="text-sm cursor-pointer flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span>{feature.label}</span>
                    </Label>
                  </div>
                )
              })}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
