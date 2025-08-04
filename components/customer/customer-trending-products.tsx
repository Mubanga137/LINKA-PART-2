"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  MapPin, 
  TrendingUp, 
  ArrowRight,
  Eye
} from "lucide-react"
import Link from "next/link"

// Mock trending products data
const mockTrendingProducts = [
  {
    id: "trending-1",
    name: "Handcrafted Copper Bracelet",
    image: "/placeholder.svg?height=200&width=200&text=Copper+Bracelet",
    price: 150,
    originalPrice: 200,
    rating: 4.8,
    reviewCount: 124,
    retailerName: "Copper Craft Jewelry",
    inStock: true
  },
  {
    id: "trending-2", 
    name: "Traditional Chitenge Dress",
    image: "/placeholder.svg?height=200&width=200&text=Chitenge+Dress",
    price: 280,
    originalPrice: 350,
    rating: 4.9,
    reviewCount: 89,
    retailerName: "Banda Fashion House",
    inStock: true
  },
  {
    id: "trending-3",
    name: "Wooden Elephant Sculpture",
    image: "/placeholder.svg?height=200&width=200&text=Wood+Sculpture",
    price: 450,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 67,
    retailerName: "African Art Gallery",
    inStock: true
  },
  {
    id: "trending-4",
    name: "Pure Zambian Honey - 1kg",
    image: "/placeholder.svg?height=200&width=200&text=Honey+Jar",
    price: 120,
    originalPrice: 150,
    rating: 4.9,
    reviewCount: 203,
    retailerName: "Phiri Organic Foods",
    inStock: true
  },
  {
    id: "trending-5",
    name: "Professional Hammer Set",
    image: "/placeholder.svg?height=200&width=200&text=Hammer+Set",
    price: 180,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 45,
    retailerName: "BuildPro Tools",
    inStock: true
  },
  {
    id: "trending-6",
    name: "Handwoven Basket Set",
    image: "/placeholder.svg?height=200&width=200&text=Basket+Set",
    price: 220,
    originalPrice: 280,
    rating: 4.8,
    reviewCount: 91,
    retailerName: "Mwanza Traditional Crafts",
    inStock: true
  },
  {
    id: "trending-7",
    name: "Organic Vegetable Seeds",
    image: "/placeholder.svg?height=200&width=200&text=Seeds+Pack",
    price: 85,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 156,
    retailerName: "Green Valley Seeds",
    inStock: true
  },
  {
    id: "trending-8",
    name: "Traditional Music Instrument",
    image: "/placeholder.svg?height=200&width=200&text=Music+Instrument",
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 34,
    retailerName: "Cultural Sounds",
    inStock: true
  }
]

export function CustomerTrendingProducts() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            <TrendingUp className="inline h-8 w-8 mr-2 text-red-500" />
            Trending Now
          </h2>
          <p className="text-xl text-slate-600">
            Popular products from verified sellers
          </p>
        </div>
        
        <Link href="/marketplace?trending=true">
          <div className="hidden md:flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Trending
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTrendingProducts.map((product, index) => (
          <Card key={product.id} className="group bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-red-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    #{index + 1}
                  </Badge>
                  {product.originalPrice && (
                    <Badge variant="destructive" className="bg-green-500 text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Favorite button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.has(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-slate-600'
                    }`} 
                  />
                </Button>

                {/* Quick view button */}
                <Link href={`/products/${product.id}`}>
                  <Button
                    size="sm"
                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-slate-900 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Retailer */}
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{product.retailerName}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-xl font-bold text-emerald-600">
                    ZMW {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ZMW {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="flex gap-2">
                  {product.inStock ? (
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        // Add to cart functionality can be added here
                        console.log(`Added ${product.name} to cart`)
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button disabled className="flex-1">
                      Out of Stock
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden mt-8 text-center">
        <Link href="/marketplace?trending=true">
          <div className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Trending
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  )
}
