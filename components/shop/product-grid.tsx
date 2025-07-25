"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ShoppingCart, MapPin, Truck, Shield, Eye } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Traditional Chitenge Dress",
    vendor: "Mwamba Fashion House",
    location: "Lusaka Central",
    price: 250,
    originalPrice: 320,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    badgeColor: "from-emerald-500 to-green-600",
    features: ["Free Delivery", "Authentic", "Handmade"],
    discount: 22,
  },
  {
    id: 2,
    name: "Copper Wire Elephant Sculpture",
    vendor: "Lusaka Copper Crafts",
    location: "Chilenje",
    price: 180,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Local Favorite",
    badgeColor: "from-orange-500 to-red-500",
    features: ["Handcrafted", "Local Art", "Gift Ready"],
  },
  {
    id: 3,
    name: "Organic Honey & Spice Set",
    vendor: "Zambian Bee Farm Co.",
    location: "Woodlands",
    price: 95,
    originalPrice: 120,
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New Arrival",
    badgeColor: "from-amber-500 to-orange-600",
    features: ["Organic", "Local Honey", "Same Day"],
    discount: 21,
  },
  {
    id: 4,
    name: "Handwoven Basket Collection",
    vendor: "Traditional Weavers Guild",
    location: "Roma",
    price: 145,
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Artisan Made",
    badgeColor: "from-purple-500 to-indigo-600",
    features: ["Eco-Friendly", "Fair Trade", "Unique"],
  },
  {
    id: 5,
    name: "Kalimba (Thumb Piano)",
    vendor: "Zambian Music Crafts",
    location: "Kabulonga",
    price: 75,
    originalPrice: 95,
    rating: 4.6,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Cultural",
    badgeColor: "from-blue-500 to-cyan-600",
    features: ["Authentic", "Tuned", "Gift Box"],
    discount: 21,
  },
  {
    id: 6,
    name: "Zambian Coffee Beans (1kg)",
    vendor: "Highlands Coffee Roasters",
    location: "Avondale",
    price: 120,
    rating: 4.8,
    reviews: 198,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Premium",
    badgeColor: "from-amber-600 to-yellow-600",
    features: ["Fresh Roasted", "Single Origin", "Fair Trade"],
  },
  {
    id: 7,
    name: "Wooden Giraffe Carving",
    vendor: "Safari Wood Art",
    location: "Lusaka Central",
    price: 200,
    originalPrice: 250,
    rating: 4.7,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Limited",
    badgeColor: "from-rose-500 to-pink-600",
    features: ["Hand Carved", "Mahogany Wood", "Unique"],
    discount: 20,
  },
  {
    id: 8,
    name: "Traditional Nshima Pot Set",
    vendor: "Clay Masters Pottery",
    location: "Chilenje",
    price: 85,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Authentic",
    badgeColor: "from-emerald-600 to-teal-600",
    features: ["Clay Made", "Traditional", "Food Safe"],
  },
]

export function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Local Products</h2>
          <p className="text-slate-600">Discover authentic Zambian crafts and products from local vendors</p>
        </div>
        <div className="text-sm text-slate-500">
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-12">
        {products.map((product, index) => (
          <Card
            key={product.id}
            className="group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Product Badge */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.badgeColor} shadow-lg`}
                  >
                    {product.badge}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => toggleFavorite(product.id)}
                        className={`shadow-lg backdrop-blur-sm ${
                          favorites.includes(product.id)
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white/90 text-slate-900 hover:bg-white"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-slate-700 font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating & Location */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1.5 text-sm font-bold text-slate-900">{product.rating}</span>
                    <span className="ml-1 text-sm text-slate-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                    {product.location}
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>

                {/* Vendor */}
                <p className="text-sm text-slate-600 mb-4 font-medium flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-emerald-500" />
                  {product.vendor}
                </p>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-slate-900">ZMW {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">ZMW {product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Delivery Info */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center text-sm text-slate-600">
                    <Truck className="h-4 w-4 mr-2 text-emerald-500" />
                    <span>Free delivery • Same day available</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" disabled={currentPage === 1}>
          Previous
        </Button>
        {[1, 2, 3, 4, 5].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            {page}
          </Button>
        ))}
        <Button variant="outline">Next</Button>
      </div>
    </div>
  )
}
