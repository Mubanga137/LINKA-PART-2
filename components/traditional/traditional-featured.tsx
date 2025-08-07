"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Crown, Heart, ArrowRight } from "lucide-react"

const featuredItems = [
  {
    title: "Royal Lozi Ceremonial Robe",
    description: "Authentic ceremonial attire from the Lozi kingdom",
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=400&h=300&fit=crop",
    price: "ZMW 450",
    rating: 4.9,
    category: "Ceremonial"
  },
  {
    title: "Bemba Traditional Wedding Set",
    description: "Complete traditional wedding outfit for grooms",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    price: "ZMW 680",
    rating: 4.8,
    category: "Wedding"
  },
  {
    title: "Contemporary Chitenge Collection",
    description: "Modern interpretation of traditional patterns",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
    price: "ZMW 195",
    rating: 4.7,
    category: "Modern"
  }
]

export function TraditionalFeatured() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-orange-100 text-orange-700 mb-4">
            <Crown className="h-4 w-4 mr-2" />
            Featured Collection
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Heritage Highlights
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our most celebrated traditional pieces, each telling a story of Zambian heritage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/products/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-white">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{item.description}</p>
                    <div className="flex items-center space-x-1 mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-slate-500">(45+ reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">
                        {item.price}
                      </span>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
