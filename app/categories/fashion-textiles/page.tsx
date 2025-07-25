"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shirt,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  Filter,
  Grid3X3,
  List,
  Palette,
  Scissors,
  Crown,
  Sparkles,
} from "lucide-react"

const categories = [
  { name: "Traditional Wear", icon: Crown, count: 156, color: "purple" },
  { name: "Modern Fashion", icon: Shirt, count: 234, color: "blue" },
  { name: "Textiles & Fabrics", icon: Palette, count: 189, color: "green" },
  { name: "Custom Tailoring", icon: Scissors, count: 67, color: "orange" },
  { name: "Accessories", icon: Sparkles, count: 145, color: "pink" },
]

const products = [
  {
    id: 1,
    name: "Traditional Chitenge Dress",
    designer: "Mwamba Fashion House",
    location: "Lusaka",
    price: 250,
    originalPrice: 320,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=300",
    category: "Traditional",
    material: "100% Cotton Chitenge",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Red", "Green"],
    badge: "Handmade",
    inStock: true,
    features: ["Authentic Pattern", "Comfortable Fit", "Cultural Design"],
  },
  {
    id: 2,
    name: "Modern African Print Blouse",
    designer: "Contemporary Threads",
    location: "Ndola",
    price: 180,
    rating: 4.8,
    reviews: 67,
    image: "/placeholder.svg?height=400&width=300",
    category: "Modern",
    material: "African Wax Print",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Orange", "Purple", "Yellow"],
    badge: "Trending",
    inStock: true,
    features: ["Contemporary Cut", "Vibrant Colors", "Quality Fabric"],
  },
  {
    id: 3,
    name: "Premium Chitenge Fabric",
    designer: "Textile Masters",
    location: "Kitwe",
    price: 95,
    originalPrice: 120,
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=400&width=300",
    category: "Textiles",
    material: "Premium Cotton",
    sizes: ["6 yards"],
    colors: ["Multi-pattern"],
    badge: "Premium",
    inStock: true,
    features: ["6-yard piece", "Authentic patterns", "High quality"],
  },
  {
    id: 4,
    name: "Custom Tailored Suit",
    designer: "Elite Tailors Zambia",
    location: "Livingstone",
    price: 450,
    rating: 4.9,
    reviews: 34,
    image: "/placeholder.svg?height=400&width=300",
    category: "Custom",
    material: "Wool Blend",
    sizes: ["Custom Fit"],
    colors: ["Navy", "Charcoal", "Black"],
    badge: "Bespoke",
    inStock: true,
    features: ["Perfect Fit", "Premium Materials", "Expert Craftsmanship"],
  },
  {
    id: 5,
    name: "Traditional Headwrap Set",
    designer: "Heritage Accessories",
    location: "Kabwe",
    price: 65,
    rating: 4.6,
    reviews: 123,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    material: "Silk Blend",
    sizes: ["One Size"],
    colors: ["Various"],
    badge: "Set of 3",
    inStock: true,
    features: ["Multiple styles", "Soft fabric", "Vibrant patterns"],
  },
  {
    id: 6,
    name: "Designer Evening Gown",
    designer: "Glamour by Grace",
    location: "Lusaka",
    price: 380,
    originalPrice: 450,
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=400&width=300",
    category: "Modern",
    material: "Silk & Beadwork",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Gold", "Silver", "Rose Gold"],
    badge: "Designer",
    inStock: true,
    features: ["Hand-beaded", "Elegant cut", "Special occasion"],
  },
]

export default function FashionTextilesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 text-pink-700 border border-pink-200/50 mb-8">
                <Shirt className="mr-2 h-5 w-5 text-pink-600" />
                <span className="text-sm font-medium">Fashion & Textiles</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Zambian Fashion &
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Premium Textiles
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover authentic Zambian fashion, traditional textiles, and modern designs. 
                From chitenge to contemporary wear, crafted by talented local designers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  <Shirt className="mr-3 h-5 w-5" />
                  Shop Fashion
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <Palette className="mr-3 h-5 w-5" />
                  Browse Textiles
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Fashion Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedCategory === category.name.toLowerCase() ? 'ring-2 ring-pink-500 bg-pink-50' : 'bg-white/90'
                  }`}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{category.name}</h3>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {category.count} items
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-pink-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedCategory === "all" ? "Featured Fashion" : `${selectedCategory} Collection`}
                </h2>
                <p className="text-slate-600">Handcrafted by talented Zambian designers</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory("all")}
                  className={selectedCategory !== "all" ? "opacity-100" : "opacity-0 pointer-events-none"}
                >
                  View All
                </Button>
                
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

            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                          viewMode === "grid" ? "h-80" : "h-64"
                        }`}
                      />
                      
                      {/* Badge */}
                      <Badge className={`absolute top-4 left-4 ${
                        product.badge === "Handmade" ? "bg-green-500 text-white" :
                        product.badge === "Trending" ? "bg-blue-500 text-white" :
                        product.badge === "Premium" ? "bg-purple-500 text-white" :
                        product.badge === "Bespoke" ? "bg-orange-500 text-white" :
                        product.badge === "Set of 3" ? "bg-amber-500 text-white" :
                        "bg-pink-500 text-white"
                      }`}>
                        {product.badge}
                      </Badge>

                      {/* Discount */}
                      {product.originalPrice && (
                        <Badge className="absolute top-4 right-4 bg-red-100 text-red-700">
                          Save ZMW {product.originalPrice - product.price}
                        </Badge>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>{product.designer}</span>
                        <span>•</span>
                        <span>{product.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
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

                      {/* Product Details */}
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="text-slate-600">Material: {product.material}</div>
                        <div className="flex items-center space-x-4">
                          <div className="text-slate-600">
                            Sizes: {product.sizes.join(", ")}
                          </div>
                          <div className="text-slate-600">
                            Colors: {product.colors.length}
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-pink-100 text-pink-700 text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
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
                          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
