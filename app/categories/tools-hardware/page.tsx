"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Wrench,
  Hammer,
  Drill,
  Settings,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  Truck,
  Shield,
  Award,
} from "lucide-react"

const toolCategories = [
  { name: "Hand Tools", icon: Hammer, count: 234, description: "Hammers, screwdrivers, pliers" },
  { name: "Power Tools", icon: Drill, count: 156, description: "Drills, saws, sanders" },
  { name: "Garden Tools", icon: Settings, count: 189, description: "Hoes, spades, watering tools" },
  { name: "Measuring Tools", icon: Wrench, count: 78, description: "Rulers, levels, calipers" },
  { name: "Safety Equipment", icon: Shield, count: 134, description: "Helmets, gloves, goggles" },
  { name: "Hardware", icon: Settings, count: 445, description: "Nails, screws, hinges" },
]

const featuredProducts = [
  {
    id: 1,
    name: "Professional Hammer Set",
    vendor: "Zambian Tool Works",
    location: "Kitwe",
    price: 180,
    originalPrice: 220,
    rating: 4.8,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Hand Tools",
    brand: "ZTW Pro",
    warranty: "2 years",
    badge: "Professional",
    inStock: true,
    features: ["Ergonomic Handle", "Anti-Shock", "Rust Resistant"],
  },
  {
    id: 2,
    name: "Cordless Drill Kit",
    vendor: "Power Tools Zambia",
    location: "Lusaka",
    price: 450,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Power Tools",
    brand: "PowerMax",
    warranty: "3 years",
    badge: "Bestseller",
    inStock: true,
    features: ["18V Battery", "LED Light", "30+ Accessories"],
  },
  {
    id: 3,
    name: "Garden Tool Set",
    vendor: "Green Thumb Supplies",
    location: "Ndola",
    price: 220,
    originalPrice: 280,
    rating: 4.7,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Garden Tools",
    brand: "GreenCraft",
    warranty: "1 year",
    badge: "Complete Set",
    inStock: true,
    features: ["5-Piece Set", "Wooden Handles", "Storage Bag"],
  },
  {
    id: 4,
    name: "Safety Equipment Bundle",
    vendor: "WorkSafe Zambia",
    location: "Livingstone",
    price: 150,
    rating: 4.6,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300",
    category: "Safety",
    brand: "SafeGuard",
    warranty: "6 months",
    badge: "Essential",
    inStock: true,
    features: ["Hard Hat", "Safety Goggles", "Work Gloves"],
  },
  {
    id: 5,
    name: "Precision Measuring Kit",
    vendor: "Accurate Tools Ltd",
    location: "Kabwe",
    price: 95,
    rating: 4.5,
    reviews: 34,
    image: "/placeholder.svg?height=300&width=300",
    category: "Measuring",
    brand: "PrecisionPro",
    warranty: "1 year",
    badge: "Accurate",
    inStock: true,
    features: ["Spirit Level", "Tape Measure", "Caliper"],
  },
  {
    id: 6,
    name: "Hardware Assortment Box",
    vendor: "Build Right Supplies",
    location: "Chingola",
    price: 85,
    originalPrice: 110,
    rating: 4.4,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Hardware",
    brand: "BuildMax",
    warranty: "N/A",
    badge: "Value Pack",
    inStock: true,
    features: ["500+ Pieces", "Organized Box", "Mixed Sizes"],
  },
]

const brands = [
  { name: "ZTW Pro", products: 45, logo: "/placeholder.svg" },
  { name: "PowerMax", products: 67, logo: "/placeholder.svg" },
  { name: "GreenCraft", products: 34, logo: "/placeholder.svg" },
  { name: "SafeGuard", products: 23, logo: "/placeholder.svg" },
]

export default function ToolsHardwarePage() {
  const [searchQuery, setSearchQuery] = useState("")
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
    ? featuredProducts 
    : featuredProducts.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm px-6 py-3 text-orange-700 border border-orange-200/50 mb-8">
                <Wrench className="mr-2 h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">Tools & Hardware</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Professional Tools &
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Quality Hardware
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Find everything you need for construction, repairs, and projects. 
                Quality tools and hardware from trusted Zambian suppliers.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search tools, hardware, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-white/90 backdrop-blur-sm border-white/30 shadow-lg"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                  >
                    Search
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  <Wrench className="mr-3 h-5 w-5" />
                  Shop Tools
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Browse Hardware
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Shop by Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedCategory === category.name.toLowerCase() ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-white/90'
                  }`}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-2">{category.name}</h3>
                        <p className="text-sm text-slate-600 mb-3">{category.description}</p>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          {category.count} items
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-orange-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedCategory === "all" ? "Featured Tools & Hardware" : `${selectedCategory} Products`}
                </h2>
                <p className="text-slate-600">
                  Showing {filteredProducts.length} of 1,200+ quality products
                </p>
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

            <div className={`grid gap-6 ${
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
                          viewMode === "grid" ? "h-64" : "h-48"
                        }`}
                      />
                      
                      {/* Badge */}
                      <Badge className={`absolute top-4 left-4 ${
                        product.badge === "Professional" ? "bg-blue-500 text-white" :
                        product.badge === "Bestseller" ? "bg-emerald-500 text-white" :
                        product.badge === "Complete Set" ? "bg-purple-500 text-white" :
                        product.badge === "Essential" ? "bg-red-500 text-white" :
                        product.badge === "Accurate" ? "bg-indigo-500 text-white" :
                        "bg-orange-500 text-white"
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
                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

                      {/* Brand & Warranty */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                          {product.brand}
                        </Badge>
                        <span className="text-sm text-slate-600">
                          Warranty: {product.warranty}
                        </span>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-orange-100 text-orange-700 text-xs"
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
                          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
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

        {/* Brands Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted Brands</h2>
              <p className="text-lg text-slate-600">Quality tools from reliable manufacturers</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brands.map((brand, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <img src={brand.logo} alt={brand.name} className="w-16 h-16 mx-auto mb-4 object-contain" />
                    <h3 className="font-bold text-slate-900 mb-2">{brand.name}</h3>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {brand.products} products
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Free Delivery</h3>
                  <p className="text-slate-600">On orders over ZMW 300 across Zambia</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Quality Guarantee</h3>
                  <p className="text-slate-600">All tools come with manufacturer warranty</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Support</h3>
                  <p className="text-slate-600">Professional advice and after-sales service</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
