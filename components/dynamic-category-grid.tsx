"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ShoppingBag, TrendingUp, Users, ArrowRight, Filter, Search } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

interface Category {
  id: string
  name: string
  description: string
  imageUrl: string
  productCount: number
  localVendors: number
  averagePrice: number
  trendingScore: number
  location: string
  distance: number
  popularItems: string[]
  gradient: string
  iconEmoji: string
  isPopular: boolean
  hasLocalSpecialty: boolean
}

interface DynamicCategoryGridProps {
  title?: string
  subtitle?: string
  showFilters?: boolean
  maxCategories?: number
  layout?: 'grid' | 'masonry'
}

const generateLocationBasedCategories = (userLocation: string = "Lusaka"): Category[] => {
  const baseCategories = [
    {
      name: "Traditional Crafts",
      description: "Authentic handmade Zambian crafts and artifacts",
      imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=400&fit=crop",
      iconEmoji: "🏺",
      gradient: "from-amber-500 to-orange-600",
      popularItems: ["Wooden sculptures", "Baskets", "Pottery"]
    },
    {
      name: "Fresh Produce",
      description: "Farm-fresh vegetables and fruits from local farmers",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
      iconEmoji: "🥬",
      gradient: "from-green-500 to-emerald-600",
      popularItems: ["Organic vegetables", "Fresh fruits", "Herbs"]
    },
    {
      name: "Fashion & Textiles",
      description: "Modern and traditional clothing and fabric",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
      iconEmoji: "👕",
      gradient: "from-purple-500 to-pink-600",
      popularItems: ["Chitenge fabric", "Modern wear", "Accessories"]
    },
    {
      name: "Electronics",
      description: "Tech gadgets and electronics from local retailers",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop",
      iconEmoji: "📱",
      gradient: "from-blue-500 to-indigo-600",
      popularItems: ["Smartphones", "Accessories", "Home tech"]
    },
    {
      name: "Food & Beverages",
      description: "Local delicacies and traditional beverages",
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop",
      iconEmoji: "🍯",
      gradient: "from-yellow-500 to-orange-600",
      popularItems: ["Honey", "Spices", "Traditional snacks"]
    },
    {
      name: "Jewelry & Accessories",
      description: "Beautiful copper jewelry and handmade accessories",
      imageUrl: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500&h=400&fit=crop",
      iconEmoji: "💎",
      gradient: "from-rose-500 to-red-600",
      popularItems: ["Copper jewelry", "Beaded accessories", "Watches"]
    },
    {
      name: "Home & Living",
      description: "Furniture and home decor from local artisans",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop",
      iconEmoji: "🏠",
      gradient: "from-teal-500 to-cyan-600",
      popularItems: ["Wooden furniture", "Decor items", "Textiles"]
    },
    {
      name: "Agriculture & Tools",
      description: "Farming equipment and agricultural products",
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=400&fit=crop",
      iconEmoji: "🌾",
      gradient: "from-green-600 to-lime-600",
      popularItems: ["Farming tools", "Seeds", "Equipment"]
    }
  ]

  return baseCategories.map((category, index) => ({
    id: `category-${index + 1}`,
    ...category,
    productCount: Math.floor(Math.random() * 500 + 50),
    localVendors: Math.floor(Math.random() * 25 + 5),
    averagePrice: Math.floor(Math.random() * 300 + 50),
    trendingScore: Math.random() * 100,
    location: userLocation,
    distance: Math.random() * 10 + 1,
    isPopular: Math.random() > 0.5,
    hasLocalSpecialty: Math.random() > 0.6
  }))
}

export function DynamicCategoryGrid({
  title = "Shop by Category",
  subtitle = "Discover local products tailored to your location",
  showFilters = true,
  maxCategories = 8,
  layout = 'grid'
}: DynamicCategoryGridProps) {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'nearby' | 'trending'>('all')
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const userLocation = user?.location || "Lusaka"
      const dynamicCategories = generateLocationBasedCategories(userLocation)
      
      setCategories(dynamicCategories.slice(0, maxCategories))
      setFilteredCategories(dynamicCategories.slice(0, maxCategories))
      setIsLoading(false)
    }

    loadCategories()
  }, [user, maxCategories])

  useEffect(() => {
    let filtered = [...categories]
    
    switch (selectedFilter) {
      case 'popular':
        filtered = filtered.filter(cat => cat.isPopular)
        break
      case 'nearby':
        filtered = filtered.sort((a, b) => a.distance - b.distance).slice(0, 6)
        break
      case 'trending':
        filtered = filtered.sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 6)
        break
      default:
        break
    }
    
    setFilteredCategories(filtered)
  }, [selectedFilter, categories])

  const filters = [
    { id: 'all', label: 'All Categories', icon: ShoppingBag },
    { id: 'popular', label: 'Popular', icon: Users },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'trending', label: 'Trending', icon: TrendingUp }
  ]

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse max-w-lg mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            {subtitle}
            {user?.location && (
              <span className="block mt-2 text-indigo-600 font-medium">
                <MapPin className="inline h-4 w-4 mr-1" />
                Showing categories in {user.location}
              </span>
            )}
          </p>

          {/* Filters */}
          {showFilters && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {filters.map((filter) => {
                const Icon = filter.icon
                return (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id as any)}
                    className={`transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-white/80 backdrop-blur-sm hover:bg-white hover:border-indigo-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {filter.label}
                  </Button>
                )
              })}
            </div>
          )}
        </div>

        {/* Category Grid */}
        <div className={`grid gap-6 ${
          layout === 'masonry' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredCategories.map((category, index) => (
            <Card
              key={category.id}
              className={`group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-3 hover:scale-105 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden cursor-pointer ${
                layout === 'masonry' && index % 3 === 1 ? 'md:mt-8' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  {/* Dynamic Category Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                    
                    {/* Category Icon */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                      {category.iconEmoji}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      {category.isPopular && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold animate-pulse">
                          🔥 Popular
                        </Badge>
                      )}
                      {category.hasLocalSpecialty && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold">
                          ⭐ Local Specialty
                        </Badge>
                      )}
                    </div>

                    {/* Hover Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                      <Button className="bg-white/95 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200">
                        <Search className="h-4 w-4 mr-2" />
                        Explore Category
                      </Button>
                    </div>

                    {/* Distance Indicator */}
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {category.distance.toFixed(1)}km away
                    </div>
                  </div>
                </div>

                {/* Category Information */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="h-4 w-4 mr-1" />
                      {category.localVendors} vendors
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Popular Items */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2 font-medium">Popular items:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.popularItems.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">{category.productCount}</p>
                      <p className="text-xs text-slate-500">Products</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">ZMW {category.averagePrice}</p>
                      <p className="text-xs text-slate-500">Avg. Price</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <p className="text-lg font-bold text-green-600">{Math.round(category.trendingScore)}</p>
                      </div>
                      <p className="text-xs text-slate-500">Trending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
