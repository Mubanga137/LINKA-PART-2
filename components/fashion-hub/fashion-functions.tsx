"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Sparkles,
  Scissors,
  Users,
  Heart,
  Crown,
  ChevronRight,
  Star,
  TrendingUp
} from "lucide-react"

interface FashionFunctionsProps {
  onFunctionSelect?: (functionId: string) => void
}

const fashionFunctions = [
  {
    id: "traditional",
    title: "Traditional Wear",
    description: "Authentic Zambian fashion celebrating our rich cultural heritage",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
    icon: Palette,
    categories: [
      { name: "Men's Traditional", path: "/categories/fashion-textiles/traditional/mens", items: "85+" },
      { name: "Women's Traditional", path: "/categories/fashion-textiles/traditional/womens", items: "120+" },
      { name: "Kids' Traditional", path: "/categories/fashion-textiles/traditional/kids", items: "45+" }
    ],
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    trending: true,
    featured: ["Chitenge Wraps", "Ankara Prints", "Traditional Jewelry"]
  },
  {
    id: "modern",
    title: "Modern Fashion",
    description: "Contemporary styles and cutting-edge fashion trends",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop",
    icon: Sparkles,
    categories: [
      { name: "Men's Modern", path: "/categories/fashion-textiles/modern/mens", items: "156+" },
      { name: "Women's Modern", path: "/categories/fashion-textiles/modern/womens", items: "234+" },
      { name: "Kids' Modern", path: "/categories/fashion-textiles/modern/kids", items: "78+" }
    ],
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    trending: true,
    featured: ["Designer Dresses", "Business Suits", "Casual Chic"]
  },
  {
    id: "textiles",
    title: "Textiles & Fabrics",
    description: "Premium fabrics and professional textile services",
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=400&fit=crop",
    icon: Scissors,
    categories: [
      { name: "Premium Fabrics", path: "/categories/fashion-textiles/textiles/fabrics", items: "200+" },
      { name: "Tailor Services", path: "/categories/fashion-textiles/textiles/tailors", items: "45+" },
      { name: "Fabric Care", path: "/categories/fashion-textiles/textiles/care", items: "25+" }
    ],
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    trending: false,
    featured: ["Ankara Fabrics", "Silk Materials", "Cotton Blends"]
  },
  {
    id: "custom",
    title: "Custom Tailoring",
    description: "Bespoke clothing and personalized fashion services",
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=600&h=400&fit=crop",
    icon: Users,
    categories: [
      { name: "Men's Tailoring", path: "/categories/fashion-textiles/custom/mens", items: "35+" },
      { name: "Women's Tailoring", path: "/categories/fashion-textiles/custom/womens", items: "42+" },
      { name: "Kids' Tailoring", path: "/categories/fashion-textiles/custom/kids", items: "18+" }
    ],
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    trending: true,
    featured: ["Bespoke Suits", "Wedding Dresses", "Formal Wear"]
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Unique accessories to complete your perfect look",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop",
    icon: Heart,
    categories: [
      { name: "Men's Accessories", path: "/categories/fashion-textiles/accessories/mens", items: "94+" },
      { name: "Women's Accessories", path: "/categories/fashion-textiles/accessories/womens", items: "156+" },
      { name: "Kids' Accessories", path: "/categories/fashion-textiles/accessories/kids", items: "67+" }
    ],
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    trending: false,
    featured: ["Copper Jewelry", "Leather Bags", "Traditional Crafts"]
  }
]

export function FashionFunctions({ onFunctionSelect }: FashionFunctionsProps) {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-purple-100 text-purple-700 mb-6">
              <Crown className="h-4 w-4 mr-2" />
              Fashion Functions
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
              Complete Fashion
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Ecosystem</span>
            </h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              From traditional heritage to modern trends, custom creations to premium accessories – 
              discover every aspect of Zambian fashion in one place
            </p>
          </motion.div>
        </div>

        {/* Functions Grid */}
        <div className="space-y-16">
          {fashionFunctions.map((func, index) => (
            <motion.div
              key={func.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                    {/* Image Section */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <img
                        src={func.image}
                        alt={func.title}
                        className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-6 left-6 space-y-2">
                        {func.trending && (
                          <Badge className="bg-orange-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        <Badge className="bg-white/90 text-slate-700">
                          {func.categories.reduce((total, cat) => total + parseInt(cat.items.replace('+', '')), 0)}+ Items
                        </Badge>
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-6 right-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${func.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <func.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <h3 className="text-4xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
                        {func.title}
                      </h3>
                      <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        {func.description}
                      </p>

                      {/* Featured Items */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Featured:</h4>
                        <div className="flex flex-wrap gap-2">
                          {func.featured.map((item, itemIndex) => (
                            <Badge key={itemIndex} variant="outline" className="border-purple-200 text-purple-700">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="space-y-3 mb-8">
                        {func.categories.map((category, catIndex) => (
                          <Link key={catIndex} href={category.path}>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-purple-50 transition-colors group/item">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 bg-gradient-to-r ${func.gradient} rounded-lg flex items-center justify-center mr-3`}>
                                  <Star className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-medium text-slate-900 group-hover/item:text-purple-600 transition-colors">
                                  {category.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {category.items} items
                                </Badge>
                                <ChevronRight className="h-4 w-4 text-slate-400 group-hover/item:text-purple-600 transition-colors" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Button 
                        className={`bg-gradient-to-r ${func.gradient} hover:opacity-90 transition-opacity text-white shadow-lg`}
                        size="lg"
                        onClick={() => onFunctionSelect?.(func.id)}
                      >
                        Explore {func.title}
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
