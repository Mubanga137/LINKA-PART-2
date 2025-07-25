"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Star,
  ShoppingCart,
  MapPin,
  Eye,
  Gift,
  Diamond,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react"

const jewelryProducts = [
  {
    id: 1,
    name: "Traditional Copper Wire Necklace",
    vendor: "Mwanza Copper Crafts",
    location: "Lusaka",
    price: 145,
    originalPrice: 180,
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Bestseller",
    inStock: true,
    fastDelivery: true,
    customizable: true,
    materials: ["Copper Wire", "Traditional Beads"],
  },
  {
    id: 2,
    name: "Beaded Earrings Set",
    vendor: "Heritage Beadwork",
    location: "Ndola",
    price: 85,
    rating: 4.8,
    reviews: 43,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    inStock: true,
    fastDelivery: false,
    customizable: true,
    materials: ["Glass Beads", "Brass"],
  },
  {
    id: 3,
    name: "Zambian Malachite Bracelet",
    vendor: "Gemstone Gallery",
    location: "Kitwe",
    price: 220,
    originalPrice: 280,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Limited",
    inStock: true,
    fastDelivery: true,
    customizable: false,
    materials: ["Malachite", "Silver"],
  },
  {
    id: 4,
    name: "Traditional Wedding Ring Set",
    vendor: "Cultural Crafts Co.",
    location: "Livingstone",
    price: 320,
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Premium",
    inStock: true,
    fastDelivery: true,
    customizable: true,
    materials: ["Brass", "Traditional Patterns"],
  },
  {
    id: 5,
    name: "Tribal Ankle Jewelry",
    vendor: "Tradition Keepers",
    location: "Kabwe",
    price: 95,
    rating: 4.6,
    reviews: 34,
    image: "/placeholder.svg?height=300&width=300",
    inStock: false,
    fastDelivery: false,
    customizable: true,
    materials: ["Fiber", "Beads"],
  },
  {
    id: 6,
    name: "Modern Copper Cuff",
    vendor: "Contemporary Crafts",
    location: "Lusaka",
    price: 175,
    originalPrice: 210,
    rating: 4.8,
    reviews: 56,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Trending",
    inStock: true,
    fastDelivery: true,
    customizable: false,
    materials: ["Copper", "Modern Design"],
  },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
]

export function JewelryProducts() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Products Header */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Jewelry & Accessories
              </h2>
              <p className="text-slate-600">
                Showing {jewelryProducts.length} of 450+ beautiful pieces
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-slate-200 rounded-lg">
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  onClick={() => setViewMode("grid")}
                  className="rounded-l-lg rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "default" : "ghost"}
                  onClick={() => setViewMode("list")}
                  className="rounded-r-lg rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === "grid" 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {jewelryProducts.map((product) => (
          <Card
            key={product.id}
            className={`group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
              !product.inStock ? 'opacity-75' : ''
            }`}
          >
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                    viewMode === "grid" ? "h-64" : "h-48"
                  }`}
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.badge && (
                    <Badge className={`font-bold ${
                      product.badge === "Bestseller" ? "bg-emerald-500 text-white" :
                      product.badge === "New" ? "bg-blue-500 text-white" :
                      product.badge === "Limited" ? "bg-red-500 text-white" :
                      product.badge === "Premium" ? "bg-purple-500 text-white" :
                      "bg-amber-500 text-white"
                    }`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="bg-red-100 text-red-700">
                      Save ZMW {product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${
                      favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-slate-600'
                    }`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm"
                  >
                    <Eye className="h-4 w-4 text-slate-600" />
                  </Button>
                </div>

                {/* Features Icons */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {product.customizable && (
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Diamond className="h-4 w-4 text-amber-600" />
                    </div>
                  )}
                  {product.fastDelivery && (
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Gift className="h-4 w-4 text-emerald-600" />
                    </div>
                  )}
                </div>

                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge className="bg-red-500 text-white text-lg px-6 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{product.vendor}</span>
                      <span>•</span>
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
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
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Materials */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.materials.map((material, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-amber-100 text-amber-700 text-xs"
                    >
                      {material}
                    </Badge>
                  ))}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-900">
                      ZMW {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ZMW {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    disabled={!product.inStock}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button
          size="lg"
          variant="outline"
          className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90"
        >
          Load More Products
        </Button>
      </div>
    </div>
  )
}
