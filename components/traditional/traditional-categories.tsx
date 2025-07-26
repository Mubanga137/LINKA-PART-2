"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Heart,
  Baby,
  Crown,
  Star,
  ArrowRight
} from "lucide-react"

const categories = [
  {
    id: "womens",
    title: "Women's Traditional",
    description: "Elegant chitenge dresses, traditional wraps, and cultural accessories",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=400&fit=crop",
    icon: Heart,
    href: "/categories/fashion-textiles/traditional/womens",
    items: "120+ items",
    featured: ["Chitenge Dresses", "Traditional Wraps", "Cultural Jewelry"],
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "mens",
    title: "Men's Traditional",
    description: "Distinguished traditional shirts, ceremonial wear, and heritage accessories",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
    icon: Users,
    href: "/categories/fashion-textiles/traditional/mens",
    items: "85+ items",
    featured: ["Ankara Shirts", "Traditional Suits", "Cultural Accessories"],
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "kids",
    title: "Kids' Traditional",
    description: "Adorable traditional outfits that celebrate our heritage from an early age",
    image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500&h=400&fit=crop",
    icon: Baby,
    href: "/categories/fashion-textiles/traditional/kids",
    items: "45+ items",
    featured: ["Mini Chitenge", "Cultural Costumes", "Heritage Accessories"],
    gradient: "from-yellow-500 to-orange-600"
  }
]

export function TraditionalCategories() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Traditional Fashion
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> by Category</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our authentic collection of traditional Zambian fashion for the entire family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Icon & Badge */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-white/90 text-slate-700">
                        {category.items}
                      </Badge>
                    </div>

                    {/* Heritage Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Heritage
                      </Badge>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-gray-200 mb-4">{category.description}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Featured Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">Featured Items:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.featured.map((item, itemIndex) => (
                          <Badge key={itemIndex} variant="outline" className="border-orange-200 text-orange-700">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link href={category.href}>
                      <Button className={`w-full bg-gradient-to-r ${category.gradient} hover:opacity-90 transition-opacity`}>
                        Explore {category.title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
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
