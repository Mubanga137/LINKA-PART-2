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
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Local
            </span>
            <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
              {" "}
              Products
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Discover amazing products from local retailers in your area. Each purchase supports your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-4 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  {/* Animated Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                    {/* Animated Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.hoverColor} opacity-0 group-hover:opacity-20 transition-all duration-500`}
                    />

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <Zap className="h-4 w-4 text-orange-500" />
                      </div>
                    </div>

                    {/* Product Image with Hover Effect */}
                    <div className="relative group-hover:scale-110 transition-transform duration-700">
                      <Image
                        src="/placeholder.svg"
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-20 h-20 text-slate-400 group-hover:animate-pulse"
                      />

                      {/* Animated Ring */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/50 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                  </div>

                  {/* Animated Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.badgeColor} shadow-lg group-hover:scale-110 group-hover:animate-pulse transition-all duration-300`}
                  >
                    {product.badge}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200 hover:text-red-500"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6 relative">
                  {/* Animated Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:animate-spin transition-all duration-300" />
                      <span className="ml-1.5 text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {product.rating}
                      </span>
                      <span className="ml-1 text-sm text-slate-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                      <MapPin className="h-3.5 w-3.5 mr-1 group-hover:animate-bounce" />
                      {product.location}
                    </div>
                  </div>

                  {/* Product Name with Hover Effect */}
                  <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-indigo-600 transition-colors duration-300 group-hover:animate-pulse">
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
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:scale-110 group-hover:animate-bounce"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${product.badgeColor} transition-all duration-1000 ease-out ${
                          hoveredProduct === product.id ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                    <div className="flex items-center text-sm text-slate-600 mt-2 group-hover:text-slate-800 transition-colors">
                      <span className="group-hover:animate-pulse">✨ Popular choice</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Call-to-Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-pink-100 px-8 py-4 text-orange-700 border border-orange-200/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <span className="text-lg font-medium group-hover:animate-pulse">Explore all products</span>
            <span className="ml-2 text-2xl group-hover:animate-bounce">🛍️</span>
          </div>
        </div>
      </div>
    </section>
  )
}
