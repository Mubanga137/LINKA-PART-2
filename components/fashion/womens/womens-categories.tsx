"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Crown,
  Palette,
  Briefcase,
  Sparkles,
  Watch
} from "lucide-react"

interface WomensCategoriesProps {
  onCategorySelect: (category: string) => void
}

const categories = [
  {
    id: "dresses",
    name: "Dresses",
    description: "Elegant dresses for every occasion",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=200&fit=crop",
    count: "185+ items",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "tops",
    name: "Tops & Blouses",
    description: "Stylish tops and elegant blouses",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=200&fit=crop",
    count: "156+ items",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    id: "traditional",
    name: "African Prints",
    description: "Beautiful Ankara and traditional wear",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop",
    count: "94+ items",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "accessories",
    name: "Jewelry & Accessories",
    description: "Handbags, jewelry, and accessories",
    icon: Watch,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=200&fit=crop",
    count: "127+ items",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "business",
    name: "Business Wear",
    description: "Professional attire for the workplace",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop",
    count: "78+ items",
    gradient: "from-slate-600 to-gray-700"
  },
  {
    id: "shoes",
    name: "Shoes & Footwear",
    description: "Elegant heels, flats, and casual shoes",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=200&fit=crop",
    count: "89+ items",
    gradient: "from-blue-500 to-cyan-600"
  }
]

export function WomensCategories({ onCategorySelect }: WomensCategoriesProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From everyday essentials to special occasion wear, find your perfect style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="cursor-pointer group"
              onClick={() => onCategorySelect(category.id)}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center mr-3`}>
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                          <Badge className="bg-white/20 text-white text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-200">{category.description}</p>
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
