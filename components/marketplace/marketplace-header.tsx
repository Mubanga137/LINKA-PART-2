"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  MapPin, 
  Filter,
  Grid3X3,
  List,
  Star
} from "lucide-react"
import { ProductFilters } from "@/services/product-service"

interface MarketplaceHeaderProps {
  totalProducts: number
  currentFilters: ProductFilters
}

export function MarketplaceHeader({ totalProducts, currentFilters }: MarketplaceHeaderProps) {
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
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {getPageDescription()}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for products, services, or retailers..."
              className="w-full pl-12 pr-12 py-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              defaultValue={currentFilters.searchQuery || ''}
            />
            <Button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700"
              size="sm"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Button variant="outline" size="sm" className="rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            Near Me
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Star className="h-4 w-4 mr-2" />
            Top Rated
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Free Delivery
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Same Day
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            On Sale
          </Button>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-slate-600">
              {totalProducts.toLocaleString()} products found
            </span>
            
            {hasActiveFilters() && (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  <Filter className="h-3 w-3 mr-1" />
                  Filters Applied
                </Badge>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-slate-600">View:</span>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <Button variant="ghost" size="sm" className="px-3 py-1">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="px-3 py-1">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
