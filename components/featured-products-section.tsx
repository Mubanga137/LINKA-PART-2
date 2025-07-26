"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Heart, ShoppingCart, Eye, Zap } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Artisan Coffee Blend",
    vendor: "Local Roasters Co.",
    location: "Downtown",
    price: 124.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 127,
    badge: "Best Seller",
    badgeColor: "from-orange-500 to-red-500",
    hoverColor: "from-orange-400 to-red-400",
  },
  {
    id: 2,
    name: "Handcrafted Leather Wallet",
    vendor: "Craftsman's Corner",
    location: "Arts District",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.9,
    reviews: 89,
    badge: "Local Favorite",
    badgeColor: "from-purple-500 to-indigo-500",
    hoverColor: "from-purple-400 to-indigo-400",
  },
  {
    id: 3,
    name: "Organic Honey Set",
    vendor: "Bee Happy Farm",
    location: "Countryside",
    price: 174.99,
    rating: 4.7,
    reviews: 203,
    badge: "New Arrival",
    badgeColor: "from-green-500 to-emerald-500",
    hoverColor: "from-green-400 to-emerald-400",
  },
  {
    id: 4,
    name: "Vintage Style Lamp",
    vendor: "Retro Home Decor",
    location: "Historic Quarter",
    price: 749.99,
    originalPrice: 899.99,
    rating: 4.6,
    reviews: 56,
    badge: "Limited Edition",
    badgeColor: "from-pink-500 to-rose-500",
    hoverColor: "from-pink-400 to-rose-400",
  },
]

export function FeaturedProductsSection() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Featured{" "}
            </span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Local
            </span>
            <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
              {" "}
              Products
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products from local retailers in your area. Each purchase supports your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-shadow duration-200 bg-white overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  {/* Animated Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">




                    {/* Product Image */}
                    <div className="relative">
                      <Image
                        src="/placeholder.svg"
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-20 h-20 text-slate-400"
                      />
                    </div>


                  </div>

                  {/* Animated Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.badgeColor} shadow-lg`}
                  >
                    {product.badge}
                  </div>


                </div>

                <div className="p-6 relative">
                  {/* Animated Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1.5 text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {product.rating}
                      </span>
                      <span className="ml-1 text-sm text-slate-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {product.location}
                    </div>
                  </div>

                  {/* Product Name with Hover Effect */}
                  <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-indigo-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 font-medium group-hover:text-slate-800 transition-colors">
                    {product.vendor}
                  </p>

                  {/* Animated Price and Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        ZMW {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-500 line-through group-hover:text-red-500 transition-colors">
                          ZMW {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>


                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Call-to-Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-pink-100 px-8 py-4 text-orange-700 border border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer group">
            <span className="text-lg font-medium">Explore all products</span>
            <span className="ml-2 text-2xl">🛍️</span>
          </div>
        </div>
      </div>
    </section>
  )
}
