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
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Zap
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

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-40 h-40 bg-orange-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-orange-300/20 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Page Title Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <ShoppingBag className="h-16 w-16 text-orange-400 animate-bounce-slow" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {getPageTitle()}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
            {getPageDescription()}
          </p>

          {/* Live Stats */}
          <div className="flex items-center justify-center mt-8 space-x-8">
            <div className="group text-center">
              <div className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform duration-300">
                {totalProducts.toLocaleString()}
              </div>
              <div className="text-sm text-blue-200">Products</div>
            </div>
            <div className="w-px h-8 bg-blue-400/30"></div>
            <div className="group text-center">
              <div className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform duration-300">
                {Math.floor(totalProducts / 10)}+
              </div>
              <div className="text-sm text-blue-200">Vendors</div>
            </div>
            <div className="w-px h-8 bg-blue-400/30"></div>
            <div className="group text-center">
              <div className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform duration-300">
                4.8★
              </div>
              <div className="text-sm text-blue-200">Rating</div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-xl shadow-black/10">
              <div className="flex items-center">
                <Search className="ml-4 h-6 w-6 text-blue-500" />
                <Input
                  type="text"
                  placeholder="Search for products, vendors, or categories..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-lg placeholder:text-slate-400 focus:ring-0 px-4 py-4"
                />
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button variant="outline" size="sm" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
            <MapPin className="h-4 w-4 mr-2" />
            Near Me
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
            <Star className="h-4 w-4 mr-2 text-yellow-400" />
            Top Rated
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
            <Zap className="h-4 w-4 mr-2 text-orange-400" />
            Fast Delivery
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
            <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
            Trending
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
            🔥 Hot Deals
          </Button>
        </div>

        {/* Results Summary Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-white font-medium">
                <span className="text-orange-400 font-bold">{totalProducts.toLocaleString()}</span> products found
              </span>
              
              {hasActiveFilters() && (
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 hover:bg-orange-500/30 transition-colors duration-300">
                    <Filter className="h-3 w-3 mr-1" />
                    Filters Active
                  </Badge>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-blue-200">View:</span>
              <div className="flex bg-white/10 rounded-lg overflow-hidden border border-white/20">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="sm" 
                  className={`px-4 py-2 transition-all duration-300 ${
                    viewMode === "grid" 
                      ? "bg-orange-500 text-white shadow-lg" 
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="sm" 
                  className={`px-4 py-2 transition-all duration-300 ${
                    viewMode === "list" 
                      ? "bg-orange-500 text-white shadow-lg" 
                      : "text-white hover:bg-white/20"
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

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,106.7C672,85,768,75,864,74.7C960,75,1056,85,1152,90.7L1200,96L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="rgb(248 250 252)" />
        </svg>
      </div>
    </div>
  )
}
