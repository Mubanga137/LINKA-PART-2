"use client"

import { useState, useEffect } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shirt, 
  Coffee, 
  Home, 
  Gem, 
  Music,
  Hammer,
  Leaf,
  Palette,
  ArrowRight,
  TrendingUp,
  Eye,
  Heart
} from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Fashion & Textiles",
    description: "Chitenge fabrics, modern clothing & traditional wear",
    icon: Shirt,
    href: "/categories/fashion-textiles",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    hoverGradient: "from-purple-600 to-pink-700",
    products: "2,100+",
    trending: true,
    featured: ["Chitenge Dresses", "Modern Suits", "Traditional Wear"]
  },
  {
    id: 2,
    name: "Food & Beverages",
    description: "Local spices, organic honey & traditional foods",
    icon: Coffee,
    href: "/categories/food-beverages", 
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    hoverGradient: "from-green-600 to-emerald-700",
    products: "1,800+",
    trending: false,
    featured: ["Organic Honey", "Local Spices", "Traditional Foods"]
  },
  {
    id: 3,
    name: "Home & Decor",
    description: "Furniture, accessories & interior decoration",
    icon: Home,
    href: "/categories/home-decor",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50", 
    hoverGradient: "from-blue-600 to-indigo-700",
    products: "950+",
    trending: true,
    featured: ["Modern Furniture", "Wall Art", "Lighting"]
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    description: "Handcrafted jewelry & copper accessories",
    icon: Gem,
    href: "/categories/jewelry-accessories",
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-50",
    hoverGradient: "from-amber-600 to-yellow-700",
    products: "680+",
    trending: false,
    featured: ["Copper Jewelry", "Gemstones", "Handmade Items"]
  },
  {
    id: 5,
    name: "Art & Culture",
    description: "Musical instruments, paintings & cultural art",
    icon: Music,
    href: "/categories/art-culture",
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
    hoverGradient: "from-teal-600 to-cyan-700", 
    products: "420+",
    trending: true,
    featured: ["Traditional Music", "Paintings", "Sculptures"]
  },
  {
    id: 6,
    name: "Tools & Hardware",
    description: "Quality tools, hardware & construction materials",
    icon: Hammer,
    href: "/categories/tools-hardware",
    gradient: "from-slate-500 to-gray-600",
    bgGradient: "from-slate-50 to-gray-50",
    hoverGradient: "from-slate-600 to-gray-700",
    products: "1,100+", 
    trending: false,
    featured: ["Power Tools", "Hardware", "Construction"]
  },
  {
    id: 7,
    name: "Agriculture & Natural",
    description: "Seeds, farming supplies & organic goods",
    icon: Leaf,
    href: "/categories/agriculture-natural",
    gradient: "from-lime-500 to-green-600",
    bgGradient: "from-lime-50 to-green-50",
    hoverGradient: "from-lime-600 to-green-700",
    products: "1,350+",
    trending: true,
    featured: ["Organic Seeds", "Farm Tools", "Natural Products"]
  },
  {
    id: 8,
    name: "Traditional Crafts",
    description: "Authentic crafts, wood carvings & cultural items",
    icon: Palette,
    href: "/categories/traditional-crafts",
    gradient: "from-orange-500 to-red-600", 
    bgGradient: "from-orange-50 to-red-50",
    hoverGradient: "from-orange-600 to-red-700",
    products: "1,200+",
    trending: true,
    featured: ["Wood Carvings", "Pottery", "Baskets"]
  }
]

export function EnhancedCategoryGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            Shop by Category
          </h2>
          <p className="text-slate-600">Discover amazing products from local Zambian businesses</p>
        </div>
        <button 
          onClick={() => router.push('/marketplace')}
          className="group flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:gap-3"
        >
          View all categories
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className={`group cursor-pointer transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/50 overflow-hidden shadow-lg hover:shadow-2xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              transitionDelay: `${index * 100}ms`
            }}
            onClick={() => router.push(category.href)}
            onMouseEnter={() => setHoveredCard(category.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent className="p-0 relative overflow-hidden">
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Floating Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-2 right-2 w-16 h-16 bg-gradient-to-br ${category.gradient}/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700`}></div>
                <div className={`absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-br ${category.gradient}/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} style={{ transitionDelay: '200ms' }}></div>
              </div>

              {/* Header Section */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <category.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {category.trending && (
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-semibold px-2 py-1 animate-pulse">
                      Trending
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                  {category.description}
                </p>
              </div>

              {/* Stats Section */}
              <div className="relative px-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700">{category.products}</span>
                    <span className="text-xs text-slate-500">products</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span className="text-xs text-slate-500">Popular</span>
                  </div>
                </div>
              </div>

              {/* Featured Items Preview */}
              <div className={`relative px-6 pb-6 transition-all duration-300 overflow-hidden ${
                hoveredCard === category.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-slate-200/50 pt-4">
                  <p className="text-xs font-semibold text-slate-600 mb-2">Featured Items:</p>
                  <div className="space-y-1">
                    {category.featured.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${category.gradient} rounded-full`}></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="relative px-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Tap to explore
                  </div>
                  
                  <div className={`flex items-center gap-1 text-purple-600 group-hover:text-purple-700 transition-all duration-300 ${
                    hoveredCard === category.id ? 'translate-x-1' : ''
                  }`}>
                    <span className="text-sm font-semibold">Browse</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50">
                <div 
                  className={`h-full bg-gradient-to-r ${category.gradient} transition-all duration-700 ease-out ${
                    hoveredCard === category.id ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action */}
      <div className="mt-12 text-center">
        <button
          onClick={() => router.push('/marketplace')}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <TrendingUp className="h-5 w-5 group-hover:animate-bounce" />
          Explore All Categories
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
