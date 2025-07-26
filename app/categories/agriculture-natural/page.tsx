"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  Wheat,
  Fish,
  TreePine,
  Sun,
  Droplets,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react"

const categories = [
  { name: "Fresh Produce", icon: Leaf, count: 234, description: "Vegetables, fruits, herbs" },
  { name: "Grains & Seeds", icon: Wheat, count: 156, description: "Maize, rice, beans, seeds" },
  { name: "Fish & Seafood", icon: Fish, count: 89, description: "Fresh & dried fish, kapenta" },
  { name: "Natural Products", icon: TreePine, count: 145, description: "Honey, oils, herbs" },
  { name: "Farm Equipment", icon: Sun, count: 78, description: "Tools, irrigation, fertilizers" },
  { name: "Organic Certified", icon: CheckCircle, count: 198, description: "Certified organic products" },
]

const featuredProducts = [
  {
    id: 1,
    name: "Organic Kapenta (Dried Fish)",
    farmer: "Lake Tanganyika Fisheries",
    location: "Mpulungu",
    price: 85,
    originalPrice: 100,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fish",
    freshness: "2 days",
    certification: "Organic",
    badge: "Fresh Catch",
    inStock: true,
    features: ["Wild Caught", "Sun Dried", "No Preservatives"],
  },
  {
    id: 2,
    name: "Pure Zambian Honey",
    farmer: "Bee Paradise Farms",
    location: "Choma",
    price: 120,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    category: "Natural",
    freshness: "1 week",
    certification: "Pure",
    badge: "Premium",
    inStock: true,
    features: ["Raw Honey", "No Processing", "Multiple Flowers"],
  },
  {
    id: 3,
    name: "Fresh Maize (White)",
    farmer: "Kabwe Green Farms",
    location: "Kabwe",
    price: 25,
    originalPrice: 30,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Grains",
    freshness: "1 day",
    certification: "Fresh",
    badge: "Locally Grown",
    inStock: true,
    features: ["Freshly Harvested", "Pesticide Free", "High Quality"],
  },
  {
    id: 4,
    name: "Organic Vegetable Box",
    farmer: "Lusaka Organic Collective",
    location: "Lusaka",
    price: 150,
    rating: 4.9,
    reviews: 167,
    image: "/placeholder.svg?height=300&width=300",
    category: "Produce",
    freshness: "Same day",
    certification: "Organic",
    badge: "Mixed Box",
    inStock: true,
    features: ["10+ Vegetables", "Seasonal Selection", "Farm Fresh"],
  },
  {
    id: 5,
    name: "Indigenous Herbs Collection",
    farmer: "Traditional Medicine Co-op",
    location: "Chipata",
    price: 75,
    rating: 4.6,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Natural",
    freshness: "3 days",
    certification: "Traditional",
    badge: "Medicinal",
    inStock: true,
    features: ["Wild Harvested", "Traditional Use", "Dried Properly"],
  },
  {
    id: 6,
    name: "Groundnut Oil (Cold Pressed)",
    farmer: "Peanut Valley Processors",
    location: "Mkushi",
    price: 95,
    originalPrice: 110,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Natural",
    freshness: "2 weeks",
    certification: "Pure",
    badge: "Cold Pressed",
    inStock: true,
    features: ["No Chemicals", "Traditional Method", "500ml Bottle"],
  },
]

const seasonalProducts = [
  {
    name: "Mango Season",
    description: "Sweet mangoes from Southern Province",
    period: "Oct - Jan",
    image: "/placeholder.svg?height=200&width=300",
    available: true,
  },
  {
    name: "Maize Harvest",
    description: "Fresh maize from across Zambia",
    period: "Apr - Jul",
    image: "/placeholder.svg?height=200&width=300",
    available: true,
  },
  {
    name: "Fish Season",
    description: "Peak fishing season on our lakes",
    period: "May - Sep",
    image: "/placeholder.svg?height=200&width=300",
    available: true,
  },
]

export default function AgricultureNaturalPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-6 py-3 text-green-700 border border-green-200/50 mb-8">
                <Leaf className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Fresh From Zambian Farms</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Farm Fresh &
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Natural Products
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Direct from Zambian farms and natural sources. Fresh produce, organic foods, 
                and natural products supporting local farmers and communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  <Leaf className="mr-3 h-5 w-5" />
                  Shop Fresh Produce
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <Fish className="mr-3 h-5 w-5" />
                  Browse Natural Products
                </Button>
              </div>

              {/* Quality Assurance */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: CheckCircle, label: "Farm Fresh", desc: "Direct from farmers" },
                  { icon: Shield, label: "Quality Checked", desc: "Inspected products" },
                  { icon: Clock, label: "Same Day", desc: "Fast delivery" },
                  { icon: Award, label: "Best Prices", desc: "Fair to farmers" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="font-bold text-slate-900 mb-1">{item.label}</div>
                    <div className="text-sm text-slate-600">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Highlights */}
        <section className="py-16 bg-green-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Seasonal Highlights</h2>
              <p className="text-lg text-slate-600">Fresh seasonal products available now</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {seasonalProducts.map((item, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900">{item.name}</h3>
                        <Badge className={item.available ? "bg-green-500 text-white" : "bg-slate-500 text-white"}>
                          {item.available ? "Available" : "Coming Soon"}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{item.description}</p>
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Season: {item.period}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Product Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedCategory === category.name.toLowerCase() ? 'ring-2 ring-green-500 bg-green-50' : 'bg-white/90'
                  }`}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-2">{category.name}</h3>
                        <p className="text-sm text-slate-600 mb-3">{category.description}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {category.count} products
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
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-green-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedCategory === "all" ? "Featured Products" : `${selectedCategory} Products`}
                </h2>
                <p className="text-slate-600">Fresh, quality products from local farmers</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory !== "all" ? "opacity-100" : "opacity-0 pointer-events-none"}
              >
                View All Categories
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        <Badge className={`${
                          product.badge === "Fresh Catch" ? "bg-blue-500 text-white" :
                          product.badge === "Premium" ? "bg-purple-500 text-white" :
                          product.badge === "Locally Grown" ? "bg-green-500 text-white" :
                          product.badge === "Mixed Box" ? "bg-orange-500 text-white" :
                          product.badge === "Medicinal" ? "bg-red-500 text-white" :
                          "bg-amber-500 text-white"
                        }`}>
                          {product.badge}
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          {product.certification}
                        </Badge>
                      </div>

                      {/* Freshness Indicator */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-1">
                          <Droplets className="h-3 w-3 text-blue-500" />
                          <span className="text-xs font-medium text-slate-700">
                            Fresh: {product.freshness}
                          </span>
                        </div>
                      </div>

                      {/* Discount */}
                      {product.originalPrice && (
                        <Badge className="absolute bottom-4 left-4 bg-red-100 text-red-700">
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
                      <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>{product.farmer}</span>
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

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-green-100 text-green-700 text-xs"
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
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
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

        {/* Why Choose Local */}
        <section className="py-16 bg-green-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Local Farmers?</h2>
              <p className="text-lg text-slate-600">Supporting Zambian agriculture and communities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: "Farm Fresh Quality",
                  description: "Products delivered within 24-48 hours of harvest for maximum freshness and nutrition."
                },
                {
                  icon: Heart,
                  title: "Support Local Farmers",
                  description: "Every purchase directly supports Zambian farmers and rural communities."
                },
                {
                  icon: Shield,
                  title: "Sustainable Practices",
                  description: "Environmentally conscious farming methods that protect our natural resources."
                },
              ].map((benefit, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
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
