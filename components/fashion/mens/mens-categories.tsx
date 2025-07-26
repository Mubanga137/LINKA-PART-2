"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Shirt,
  Watch,
  Footprints,
  Crown,
  Users
} from "lucide-react"

interface MensCategoriesProps {
  onCategorySelect: (category: string) => void
}

const categories = [
  {
    id: "formal",
    name: "Formal Wear",
    description: "Suits, blazers, and professional attire",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=300&h=200&fit=crop",
    count: "85+ items",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "casual",
    name: "Casual Wear",
    description: "T-shirts, jeans, and everyday comfort",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=200&fit=crop",
    count: "156+ items",
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Watches, belts, bags, and more",
    icon: Watch,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop",
    count: "94+ items",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Dress shoes, casual shoes, and sneakers",
    icon: Footprints,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
    count: "67+ items",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: "traditional",
    name: "Traditional Wear",
    description: "African prints and traditional styles",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop",
    count: "34+ items",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: "grooming",
    name: "Grooming",
    description: "Skincare, fragrances, and grooming essentials",
    icon: Users,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    count: "45+ items",
    gradient: "from-slate-500 to-gray-600"
  }
]

export function MensCategories({ onCategorySelect }: MensCategoriesProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From boardroom to weekend, find the perfect style for every occasion
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
