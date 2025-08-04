"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Classic Leather Watch",
    brand: "Timepiece Co.",
    price: 450,
    originalPrice: 600,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300&text=Watch",
    category: "Watches",
    isNew: false,
    isTrending: true
  },
  {
    id: 2,
    name: "Designer Handbag",
    brand: "Luxury Bags",
    price: 320,
    originalPrice: null,
    rating: 4.9,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=300&text=Handbag",
    category: "Bags",
    isNew: true,
    isTrending: false
  },
  {
    id: 3,
    name: "Pearl Necklace Set",
    brand: "Elegant Jewelry",
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300&text=Necklace",
    category: "Jewelry",
    isNew: false,
    isTrending: true
  },
  {
    id: 4,
    name: "Premium Sunglasses",
    brand: "Vision Plus",
    price: 180,
    originalPrice: null,
    rating: 4.6,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=300&text=Sunglasses",
    category: "Eyewear",
    isNew: true,
    isTrending: false
  },
  {
    id: 5,
    name: "Leather Wallet",
    brand: "Craft Masters",
    price: 120,
    originalPrice: 160,
    rating: 4.8,
    reviews: 267,
    image: "/placeholder.svg?height=300&width=300&text=Wallet",
    category: "Wallets",
    isNew: false,
    isTrending: true
  },
  {
    id: 6,
    name: "Silk Scarf Collection",
    brand: "Fashion Forward",
    price: 95,
    originalPrice: null,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300&text=Scarf",
    category: "Scarves",
    isNew: true,
    isTrending: false
  }
]

export default function AccessoriesProducts() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of the finest accessories. 
            Each item is carefully chosen for quality, style, and value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-600 text-white">New</Badge>
                  )}
                  {product.isTrending && (
                    <Badge className="bg-orange-600 text-white">Trending</Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="bg-red-600 text-white">Sale</Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mb-4">
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
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </div>
  )
}
