"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingCart, Eye, Filter, Search, Store } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Modern Sofa Set",
    category: "Living Room",
    price: "ZMW 3,500",
    originalPrice: "ZMW 4,200",
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=300&width=400&text=Modern+Sofa+Set",
    retailer: "Lusaka Furniture Co.",
    location: "Chilenje, Lusaka",
    badge: "Best Seller",
    badgeColor: "bg-green-500",
    discount: "17% OFF",
  },
  {
    id: 2,
    name: "Dining Table & Chairs",
    category: "Dining Room",
    price: "ZMW 2,800",
    originalPrice: "ZMW 3,200",
    rating: 4.9,
    reviews: 18,
    image: "/placeholder.svg?height=300&width=400&text=Dining+Table+Set",
    retailer: "Woodlands Decor",
    location: "Woodlands, Lusaka",
    badge: "Premium",
    badgeColor: "bg-purple-500",
    discount: "12% OFF",
  },
  {
    id: 3,
    name: "Bedroom Wardrobe",
    category: "Bedroom",
    price: "ZMW 4,500",
    originalPrice: "ZMW 5,000",
    rating: 4.7,
    reviews: 31,
    image: "/placeholder.svg?height=300&width=400&text=Bedroom+Wardrobe",
    retailer: "Kabulonga Furniture",
    location: "Kabulonga, Lusaka",
    badge: "New Arrival",
    badgeColor: "bg-blue-500",
    discount: "10% OFF",
  },
  {
    id: 4,
    name: "Office Desk Setup",
    category: "Office",
    price: "ZMW 1,800",
    originalPrice: "ZMW 2,100",
    rating: 4.6,
    reviews: 15,
    image: "/placeholder.svg?height=300&width=400&text=Office+Desk+Setup",
    retailer: "CBD Office Solutions",
    location: "CBD, Lusaka",
    badge: "Popular",
    badgeColor: "bg-orange-500",
    discount: "14% OFF",
  },
  {
    id: 5,
    name: "Kitchen Cabinet Set",
    category: "Kitchen",
    price: "ZMW 6,200",
    originalPrice: "ZMW 7,500",
    rating: 4.9,
    reviews: 22,
    image: "/placeholder.svg?height=300&width=400&text=Kitchen+Cabinet+Set",
    retailer: "Olympia Kitchens",
    location: "Olympia, Lusaka",
    badge: "Premium",
    badgeColor: "bg-purple-500",
    discount: "17% OFF",
  },
  {
    id: 6,
    name: "Garden Furniture Set",
    category: "Outdoor",
    price: "ZMW 2,200",
    originalPrice: "ZMW 2,600",
    rating: 4.5,
    reviews: 12,
    image: "/placeholder.svg?height=300&width=400&text=Garden+Furniture+Set",
    retailer: "Roma Gardens",
    location: "Roma, Lusaka",
    badge: "Seasonal",
    badgeColor: "bg-green-500",
    discount: "15% OFF",
  },
]

export function HomeDecorProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Office", "Outdoor"]

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Featured{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover quality furniture and home decor from verified Zambian retailers
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-12 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-slate-200 bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <select className="px-3 py-2 border border-slate-200 rounded-md bg-white text-sm">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: Highest First</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-slate-200 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${product.badgeColor} text-white`}>{product.badge}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-500 text-white">{product.discount}</Badge>
                  </div>

                  {/* Favorite Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute bottom-3 right-3 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id) ? "text-red-500 fill-current" : "text-slate-600"
                      }`}
                    />
                  </Button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-500">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-slate-500">({product.reviews})</span>
                    </div>
                  </div>

                  {/* Retailer Info */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-700">{product.retailer}</p>
                    <p className="text-xs text-slate-500">{product.location}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900">{product.price}</span>
                        <span className="text-sm text-slate-500 line-through">{product.originalPrice}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Link href={`/vendors/${product.retailer.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-').replace(/^-|-$/g, '')}`}>
                        <Button size="sm" variant="outline">
                          <Store className="h-3 w-3 mr-1" />
                          Store
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 ease-out group-hover:w-full w-0" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg group bg-transparent"
          >
            <Search className="mr-2 h-5 w-5 group-hover:animate-spin" />
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  )
}
