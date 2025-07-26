"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Users, Award } from "lucide-react"

const brands = [
  {
    name: "African Heritage",
    description: "Authentic traditional and modern African fashion",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    rating: 4.9,
    products: 156,
    location: "Lusaka, Zambia",
    verified: true,
    specialty: "Traditional Wear"
  },
  {
    name: "Executive Style",
    description: "Premium business and formal wear",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.8,
    products: 89,
    location: "Ndola, Zambia",
    verified: true,
    specialty: "Formal Wear"
  },
  {
    name: "Urban Zambia",
    description: "Contemporary casual and street fashion",
    logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 4.7,
    products: 234,
    location: "Kitwe, Zambia",
    verified: true,
    specialty: "Casual Wear"
  },
  {
    name: "Heritage Textiles",
    description: "Premium fabrics and custom tailoring",
    logo: "https://images.unsplash.com/photo-1494790108755-2616c27b1df7?w=100&h=100&fit=crop",
    rating: 4.9,
    products: 67,
    location: "Livingstone, Zambia",
    verified: true,
    specialty: "Textiles"
  }
]

export function FashionBrands() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-indigo-100 text-indigo-700 mb-4">
            <Award className="h-4 w-4 mr-2" />
            Featured Brands
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Top Fashion Brands in Zambia
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover collections from verified local brands and designers who are shaping Zambian fashion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    {brand.verified && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-blue-500 text-white rounded-full p-1">
                          ✓
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{brand.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{brand.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{brand.rating}</span>
                    </div>
                    
                    <div className="flex items-center justify-center text-xs text-slate-500">
                      <Users className="h-3 w-3 mr-1" />
                      {brand.products} products
                    </div>
                    
                    <div className="flex items-center justify-center text-xs text-slate-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {brand.location}
                    </div>
                  </div>

                  <Badge variant="outline" className="mb-4">
                    {brand.specialty}
                  </Badge>

                  <Button size="sm" className="w-full">
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
