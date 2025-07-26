"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Gem, 
  Shirt, 
  Coffee, 
  Leaf, 
  Hammer, 
  Palette, 
  Package, 
  Home,
  Music,
  Truck,
  TrendingUp,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 'jewelry-accessories',
    name: 'Jewelry & Accessories',
    description: 'Handcrafted jewelry, copper accessories, and precious stones',
    icon: Gem,
    href: '/marketplace?category=jewelry-accessories',
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50',
    products: '680+',
    trending: true
  },
  {
    id: 'fashion-textiles',
    name: 'Fashion & Textiles',
    description: 'Chitenge fabrics, modern clothing, and traditional wear',
    icon: Shirt,
    href: '/marketplace?category=fashion-textiles',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50',
    products: '2,100+',
    trending: true
  },
  {
    id: 'food-beverages',
    name: 'Food & Beverages',
    description: 'Local spices, organic honey, traditional foods',
    icon: Coffee,
    href: '/marketplace?category=food-beverages',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    products: '1,800+',
    trending: false
  },
  {
    id: 'agriculture-natural',
    name: 'Agriculture & Natural',
    description: 'Seeds, farming supplies, natural products',
    icon: Leaf,
    href: '/marketplace?category=agriculture-natural',
    color: 'from-lime-500 to-green-600',
    bgColor: 'from-lime-50 to-green-50',
    products: '1,350+',
    trending: false
  },
  {
    id: 'tools-hardware',
    name: 'Tools & Hardware',
    description: 'Quality tools, hardware supplies, construction materials',
    icon: Hammer,
    href: '/marketplace?category=tools-hardware',
    color: 'from-slate-500 to-gray-600',
    bgColor: 'from-slate-50 to-gray-50',
    products: '1,100+',
    trending: false
  },
  {
    id: 'art-culture',
    name: 'Art & Culture',
    description: 'Musical instruments, paintings, cultural art pieces',
    icon: Palette,
    href: '/marketplace?category=art-culture',
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'from-teal-50 to-cyan-50',
    products: '420+',
    trending: false
  },
  {
    id: 'traditional-crafts',
    name: 'Traditional Crafts',
    description: 'Authentic crafts, wood carvings, cultural artifacts',
    icon: Music,
    href: '/marketplace?category=traditional-crafts',
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    products: '1,200+',
    trending: false
  },
  {
    id: 'home-decor',
    name: 'Home & Decor',
    description: 'Furniture, home accessories, interior decoration',
    icon: Home,
    href: '/marketplace?category=home-decor',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    products: '950+',
    trending: false
  }
]

export function CategoryGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Shop by Category
          </h2>
          <p className="text-xl text-slate-600">
            Discover amazing products from local Zambian businesses
          </p>
        </div>
        
        <Link href="/marketplace">
          <div className="hidden md:flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Categories
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <Card className="group bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className={`p-6 bg-gradient-to-br ${category.bgColor} relative overflow-hidden`}>
                  {/* Trending Badge */}
                  {category.trending && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                  )}

                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 rounded-full animate-float"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/20 rounded-full animate-bounce-slow"></div>
                  </div>

                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <category.icon className="h-8 w-8 text-white group-hover:animate-bounce" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{category.products} products</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 mb-4 leading-relaxed group-hover:text-slate-800 transition-colors">
                    {category.description}
                  </p>

                  {/* Explore Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-emerald-600 hover:text-emerald-700 group-hover:scale-110 transition-all flex items-center font-medium">
                      <span className="mr-1">Explore</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out group-hover:w-full w-0`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden mt-8 text-center">
        <Link href="/marketplace">
          <div className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Categories
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  )
}
