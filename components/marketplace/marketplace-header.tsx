"use client"

import { useState } from "react"
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
  TrendingUp
} from "lucide-react"
import { ProductFilters } from "@/services/product-service"

interface MarketplaceHeaderProps {
  totalProducts: number
  currentFilters: ProductFilters
}

export function MarketplaceHeader({ totalProducts, currentFilters }: MarketplaceHeaderProps) {
  const [searchValue, setSearchValue] = useState(currentFilters.searchQuery || "")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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

    return 'Marketplace'
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

    return 'Discover products and services from local Zambian businesses'
  }

  const hasActiveFilters = () => {
    return currentFilters.category || 
           currentFilters.searchQuery || 
           currentFilters.tags?.length || 
           currentFilters.priceRange ||
           currentFilters.rating
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getPageTitle()}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {getPageDescription()}
          </p>

          {/* Clean Stats Display */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{totalProducts.toLocaleString()}</span>
              <span>Products</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{Math.floor(totalProducts / 10)}+</span>
              <span>Vendors</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">4.8★</span>
              <span>Rating</span>
            </div>
          </div>
        </div>

        {/* Clean Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for products, vendors, or categories..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-12 pr-24 py-4 text-lg border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <Button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Button variant="outline" size="sm" className="rounded-full border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <MapPin className="h-4 w-4 mr-2" />
            Near Me
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
            <Star className="h-4 w-4 mr-2" />
            Top Rated
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
            <Truck className="h-4 w-4 mr-2" />
            Free Delivery
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <Zap className="h-4 w-4 mr-2" />
            Fast Delivery
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
        </div>

        {/* Results Summary */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {totalProducts.toLocaleString()} products found
              </span>
              
              {hasActiveFilters() && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Filter className="h-3 w-3 mr-1" />
                  Filters Active
                </Badge>
              )}
            </div>

            {/* Clean View Mode Toggle */}
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="sm" 
                  className={`px-3 py-2 ${
                    viewMode === "grid" 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="sm" 
                  className={`px-3 py-2 ${
                    viewMode === "list" 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
