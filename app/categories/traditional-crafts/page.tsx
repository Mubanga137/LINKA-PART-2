"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  Award,
  Palette,
  Hammer,
  Sparkles,
  TreePine,
  Users,
  Gift,
} from "lucide-react"

const categories = [
  { name: "Wood Carvings", icon: TreePine, count: 145, color: "amber" },
  { name: "Baskets & Weaving", icon: Crown, count: 89, color: "green" },
  { name: "Pottery & Ceramics", icon: Palette, count: 67, color: "orange" },
  { name: "Metal Crafts", icon: Hammer, count: 56, color: "blue" },
  { name: "Traditional Masks", icon: Users, count: 34, color: "purple" },
  { name: "Cultural Items", icon: Sparkles, count: 123, color: "pink" },
]

const products = [
  {
    id: 1,
    name: "Hand-carved Elephant Family",
    artisan: "Mwila Wood Carvers",
    location: "Livingstone",
    price: 280,
    originalPrice: 350,
    rating: 4.9,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wood Carvings",
    material: "Mukwa Wood",
    technique: "Traditional Carving",
    heritage: "Tonga Tradition",
    badge: "Authentic",
    inStock: true,
    features: ["Handcrafted", "Natural Wood", "Cultural Significance"],
  },
  {
    id: 2,
    name: "Traditional Bemba Mask",
    artisan: "Cultural Heritage Collective",
    location: "Kasama",
    price: 320,
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Masks",
    material: "Hardwood & Paint",
    technique: "Ancient Methods",
    heritage: "Bemba Culture",
    badge: "Ceremonial",
    inStock: true,
    features: ["Ritual Use", "Hand Painted", "Sacred Symbols"],
  },
  {
    id: 3,
    name: "Woven Grass Basket Set",
    artisan: "Village Weavers Co-op",
    location: "Mongu",
    price: 150,
    originalPrice: 180,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Baskets",
    material: "Natural Grass",
    technique: "Traditional Weaving",
    heritage: "Lozi Craft",
    badge: "Set of 3",
    inStock: true,
    features: ["Eco-friendly", "Handwoven", "Functional Art"],
  },
  {
    id: 4,
    name: "Copper Wire Sculpture",
    artisan: "Kitwe Copper Crafts",
    location: "Kitwe",
    price: 195,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Metal Crafts",
    material: "Pure Copper Wire",
    technique: "Wire Bending",
    heritage: "Modern Zambian",
    badge: "Contemporary",
    inStock: true,
    features: ["Copper Wire", "Artistic Design", "Zambian Symbol"],
  },
  {
    id: 5,
    name: "Clay Water Pot (Nsuko)",
    artisan: "Traditional Pottery Guild",
    location: "Chipata",
    price: 85,
    rating: 4.5,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pottery",
    material: "Local Clay",
    technique: "Hand Shaping",
    heritage: "Eastern Province",
    badge: "Functional",
    inStock: true,
    features: ["Natural Clay", "Water Cooling", "Traditional Use"],
  },
  {
    id: 6,
    name: "Kalimba (Thumb Piano)",
    artisan: "Melody Makers Traditional",
    location: "Lusaka",
    price: 120,
    originalPrice: 150,
    rating: 4.8,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cultural Items",
    material: "Wood & Metal",
    technique: "Traditional Assembly",
    heritage: "Shona Influence",
    badge: "Playable",
    inStock: true,
    features: ["Musical Instrument", "Handmade", "Authentic Sound"],
  },
]

const artisanStories = [
  {
    name: "Master Mwila",
    craft: "Wood Carving",
    location: "Livingstone",
    experience: "35 years",
    story: "Third generation wood carver specializing in wildlife sculptures using traditional Tonga techniques.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Mama Namukolo",
    craft: "Basket Weaving",
    location: "Mongu",
    experience: "28 years",
    story: "Expert in Lozi weaving traditions, teaching younger women the ancient art of grass basket making.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Bwalya Arts",
    craft: "Copper Crafts",
    location: "Kitwe",
    experience: "15 years",
    story: "Modern artist blending traditional techniques with contemporary designs using Zambia's copper heritage.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function TraditionalCraftsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 text-amber-700 border border-amber-200/50 mb-8">
                <Crown className="mr-2 h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium">Traditional Crafts</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Heritage Crafts &
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Cultural Treasures
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover authentic Zambian traditional crafts made by skilled artisans. 
                Each piece carries cultural heritage and generations of craftsmanship.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  <Crown className="mr-3 h-5 w-5" />
                  Explore Crafts
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Meet Artisans
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Craft Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedCategory === category.name.toLowerCase() ? 'ring-2 ring-amber-500 bg-amber-50' : 'bg-white/90'
                  }`}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-2">{category.name}</h3>
                        <Badge variant="secondary" className={`bg-${category.color}-100 text-${category.color}-700`}>
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

        {/* Products */}
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-amber-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedCategory === "all" ? "Featured Crafts" : `${selectedCategory} Collection`}
                </h2>
                <p className="text-slate-600">Authentic handcrafted treasures from Zambian artisans</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory !== "all" ? "opacity-100" : "opacity-0 pointer-events-none"}
              >
                View All Crafts
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
                      
                      {/* Badge */}
                      <Badge className={`absolute top-4 left-4 ${
                        product.badge === "Authentic" ? "bg-green-500 text-white" :
                        product.badge === "Ceremonial" ? "bg-purple-500 text-white" :
                        product.badge === "Set of 3" ? "bg-blue-500 text-white" :
                        product.badge === "Contemporary" ? "bg-orange-500 text-white" :
                        product.badge === "Functional" ? "bg-emerald-500 text-white" :
                        "bg-amber-500 text-white"
                      }`}>
                        {product.badge}
                      </Badge>

                      {/* Heritage Tag */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-xs font-medium text-slate-700">
                          {product.heritage}
                        </span>
                      </div>

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
                        <span>{product.artisan}</span>
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

                      {/* Craft Details */}
                      <div className="space-y-1 mb-4 text-sm text-slate-600">
                        <div>Material: {product.material}</div>
                        <div>Technique: {product.technique}</div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-amber-100 text-amber-700 text-xs"
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
          </div>
        </section>

        {/* Artisan Stories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Artisans</h2>
              <p className="text-lg text-slate-600">Stories behind the crafts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artisanStories.map((artisan, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={artisan.image} 
                      alt={artisan.name} 
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" 
                    />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{artisan.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                        {artisan.craft}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {artisan.experience}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      <MapPin className="h-3 w-3 text-slate-500" />
                      <span className="text-sm text-slate-600">{artisan.location}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{artisan.story}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Significance */}
        <section className="py-16 bg-amber-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Award className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Cultural Heritage</h3>
                  <p className="text-slate-600">Preserving centuries-old traditions and techniques</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Community Support</h3>
                  <p className="text-slate-600">Supporting local artisan communities and families</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Gift className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Perfect Gifts</h3>
                  <p className="text-slate-600">Unique, meaningful gifts with cultural significance</p>
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
