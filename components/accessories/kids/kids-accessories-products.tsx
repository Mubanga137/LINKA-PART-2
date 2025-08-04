"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

const mockProducts = [
  {
    id: 1,
    name: "Colorful Kids Backpack",
    price: 45,
    originalPrice: 60,
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=300&width=300&text=Kids+Backpack",
    category: "Bags"
  },
  {
    id: 2,
    name: "Rainbow Hair Clips Set",
    price: 15,
    originalPrice: null,
    rating: 4.9,
    reviews: 18,
    image: "/placeholder.svg?height=300&width=300&text=Hair+Clips",
    category: "Hair Accessories"
  },
  {
    id: 3,
    name: "Cute Animal Sunglasses",
    price: 25,
    originalPrice: 35,
    rating: 4.7,
    reviews: 32,
    image: "/placeholder.svg?height=300&width=300&text=Sunglasses",
    category: "Eyewear"
  },
  {
    id: 4,
    name: "Princess Jewelry Set",
    price: 30,
    originalPrice: null,
    rating: 4.8,
    reviews: 15,
    image: "/placeholder.svg?height=300&width=300&text=Jewelry+Set",
    category: "Jewelry"
  },
  {
    id: 5,
    name: "Superhero Watch",
    price: 55,
    originalPrice: 70,
    rating: 4.6,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300&text=Kids+Watch",
    category: "Watches"
  },
  {
    id: 6,
    name: "Colorful Hat Collection",
    price: 20,
    originalPrice: null,
    rating: 4.5,
    reviews: 12,
    image: "/placeholder.svg?height=300&width=300&text=Kids+Hat",
    category: "Hats"
  }
]

export default function KidsAccessoriesProducts() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Kids Accessories ({mockProducts.length} products)
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
              
              <div className="p-4">
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                
                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ZMW {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ZMW {product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
