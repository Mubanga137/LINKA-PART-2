"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Plus, Heart } from "lucide-react"
import Image from "next/image"

const recommendations = [
  {
    id: 1,
    name: "Matching Chitenge Headwrap",
    vendor: "Mwamba Fashion House",
    price: 45,
    originalPrice: 60,
    rating: 4.8,
    reviews: 23,
    image: "/placeholder.svg?height=200&width=200",
    reason: "Pairs perfectly with your Chitenge dress",
  },
  {
    id: 2,
    name: "Copper Bracelet Set",
    vendor: "Lusaka Copper Crafts",
    price: 35,
    rating: 4.9,
    reviews: 45,
    image: "/placeholder.svg?height=200&width=200",
    reason: "From the same artisan",
  },
  {
    id: 3,
    name: "Natural Beeswax Candles",
    vendor: "Zambian Bee Farm Co.",
    price: 25,
    originalPrice: 35,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=200",
    reason: "Complete your honey collection",
  },
  {
    id: 4,
    name: "Traditional Wooden Spoon Set",
    vendor: "Heritage Crafts Zambia",
    price: 18,
    rating: 4.6,
    reviews: 34,
    image: "/placeholder.svg?height=200&width=200",
    reason: "Perfect for your kitchen essentials",
  },
]

export function CartRecommendations() {
  const [addingToCart, setAddingToCart] = useState<number | null>(null)

  const addToCart = async (productId: number) => {
    setAddingToCart(productId)
    // Simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 800))
    setAddingToCart(null)
  }

  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          You might also <span className="text-blue-600">like</span>
        </h2>
        <p className="text-lg text-slate-600">Handpicked recommendations based on your cart items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <Card
            key={product.id}
            className="group bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Save ZMW {product.originalPrice - product.price}
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 text-slate-900 hover:bg-white shadow-lg hover:scale-110 transition-all"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Reason Badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full text-center font-medium">
                      {product.reason}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs font-bold text-slate-900">{product.rating}</span>
                    <span className="ml-1 text-xs text-slate-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs text-slate-600 mb-3">{product.vendor}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-slate-900">ZMW {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">ZMW {product.originalPrice}</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    onClick={() => addToCart(product.id)}
                    disabled={addingToCart === product.id}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
                  >
                    {addingToCart === product.id ? (
                      <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
