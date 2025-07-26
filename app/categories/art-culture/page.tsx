"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Palette,
  Camera,
  Music,
  BookOpen,
  Drum,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  Eye,
  Users,
  TrendingUp,
  Award,
  Play,
} from "lucide-react"

const artCategories = [
  { name: "Paintings", icon: Palette, count: 156 },
  { name: "Sculptures", icon: Award, count: 89 },
  { name: "Traditional Masks", icon: Users, count: 67 },
  { name: "Musical Instruments", icon: Music, count: 45 },
  { name: "Photography", icon: Camera, count: 234 },
  { name: "Books & Literature", icon: BookOpen, count: 178 },
]

const artProducts = [
  {
    id: 1,
    name: "Zambezi River Landscape Painting",
    artist: "Mwila Art Studio",
    location: "Livingstone",
    price: 450,
    originalPrice: 550,
    rating: 4.9,
    reviews: 23,
    image: "/placeholder.svg?height=300&width=300",
    category: "Paintings",
    medium: "Oil on Canvas",
    size: "60cm x 80cm",
    badge: "Original",
    inStock: true,
  },
  {
    id: 2,
    name: "Traditional Bemba Mask",
    artist: "Cultural Heritage Collective",
    location: "Kasama",
    price: 280,
    rating: 4.8,
    reviews: 15,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculptures",
    medium: "Wood Carving",
    size: "25cm x 35cm",
    badge: "Authentic",
    inStock: true,
  },
  {
    id: 3,
    name: "Copper Wire Elephant Sculpture",
    artist: "Kitwe Copper Crafts",
    location: "Kitwe",
    price: 320,
    originalPrice: 380,
    rating: 4.7,
    reviews: 31,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculptures",
    medium: "Copper Wire",
    size: "40cm x 30cm",
    badge: "Handmade",
    inStock: true,
  },
  {
    id: 4,
    name: "Traditional Kalimba",
    artist: "Melody Makers",
    location: "Lusaka",
    price: 150,
    rating: 4.6,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=300",
    category: "Music",
    medium: "Wood & Metal",
    size: "15cm x 20cm",
    badge: "Playable",
    inStock: true,
  },
  {
    id: 5,
    name: "Victoria Falls Photography Collection",
    artist: "Nature Focus Photography",
    location: "Livingstone",
    price: 180,
    rating: 4.9,
    reviews: 56,
    image: "/placeholder.svg?height=300&width=300",
    category: "Photography",
    medium: "Digital Print",
    size: "A3 Framed",
    badge: "Limited Edition",
    inStock: true,
  },
  {
    id: 6,
    name: "Stories from the Copper Belt - Book",
    artist: "Zambian Writers Collective",
    location: "Ndola",
    price: 85,
    originalPrice: 100,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Literature",
    medium: "Hardcover",
    size: "300 pages",
    badge: "Bestseller",
    inStock: true,
  },
]

export default function ArtCulturePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = activeCategory === "all" 
    ? artProducts 
    : artProducts.filter(product => 
        product.category.toLowerCase().includes(activeCategory.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 text-purple-700 border border-purple-200/50 mb-8">
                <Palette className="mr-2 h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Art & Culture</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Celebrate Zambian
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Art & Culture
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover authentic Zambian art, traditional crafts, music, and cultural treasures 
                created by talented local artists and artisans.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  <Palette className="mr-3 h-5 w-5" />
                  Explore Art Collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <Music className="mr-3 h-5 w-5" />
                  Discover Music
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Art Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {artCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    activeCategory === category.name.toLowerCase() ? 'ring-2 ring-purple-500 bg-purple-50' : 'bg-white/90'
                  }`}
                  onClick={() => setActiveCategory(category.name.toLowerCase())}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-purple-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                {activeCategory === "all" ? "All Art & Culture" : `${activeCategory} Collection`}
              </h2>
              <Button
                variant="outline"
                onClick={() => setActiveCategory("all")}
                className={activeCategory !== "all" ? "opacity-100" : "opacity-0 pointer-events-none"}
              >
                View All
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
                        product.badge === "Original" ? "bg-emerald-500 text-white" :
                        product.badge === "Authentic" ? "bg-blue-500 text-white" :
                        product.badge === "Handmade" ? "bg-purple-500 text-white" :
                        product.badge === "Playable" ? "bg-orange-500 text-white" :
                        product.badge === "Limited Edition" ? "bg-red-500 text-white" :
                        "bg-amber-500 text-white"
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
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-2">
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
                          {product.category === "Music" && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm"
                            >
                              <Play className="h-4 w-4 text-slate-600" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>{product.artist}</span>
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

                      {/* Product Details */}
                      <div className="space-y-1 mb-4 text-sm text-slate-600">
                        <div>Medium: {product.medium}</div>
                        <div>Size: {product.size}</div>
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
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
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
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90"
              >
                Load More Artworks
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Artists */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Artists</h2>
              <p className="text-lg text-slate-600">Meet the talented artists behind these amazing works</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Mwila Art Studio", location: "Livingstone", works: 23, image: "/placeholder.svg" },
                { name: "Cultural Heritage Collective", location: "Kasama", works: 18, image: "/placeholder.svg" },
                { name: "Kitwe Copper Crafts", location: "Kitwe", works: 31, image: "/placeholder.svg" },
                { name: "Melody Makers", location: "Lusaka", works: 15, image: "/placeholder.svg" },
              ].map((artist, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <img src={artist.image} alt={artist.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="font-bold text-slate-900 mb-2">{artist.name}</h3>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <MapPin className="h-3 w-3 text-slate-500" />
                      <span className="text-sm text-slate-600">{artist.location}</span>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {artist.works} works
                    </Badge>
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
