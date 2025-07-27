"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Play, 
  Search, 
  Star, 
  Users, 
  TrendingUp, 
  Filter,
  ShoppingCart,
  CreditCard,
  Smartphone,
  Download,
  Monitor,
  Music,
  Video,
  Tv
} from "lucide-react"

const streamingServices = [
  {
    id: 1,
    name: "Netflix Premium",
    provider: "Netflix",
    category: "Video Streaming",
    price: 45,
    originalPrice: 55,
    currency: "ZMW",
    period: "month",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviews: 1247,
    users: "2.8K",
    features: ["4K Ultra HD", "Multiple Devices", "Offline Downloads", "No Ads"],
    description: "Access thousands of movies, TV shows, and documentaries in 4K quality",
    availability: "Instant Activation",
    discount: 18,
    isPopular: true,
    compatibility: ["Smart TV", "Mobile", "Laptop", "Tablet"]
  },
  {
    id: 2,
    name: "Spotify Premium",
    provider: "Spotify",
    category: "Music Streaming",
    price: 25,
    currency: "ZMW",
    period: "month",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    reviews: 892,
    users: "3.2K",
    features: ["Ad-Free Music", "Offline Downloads", "High Quality Audio", "Unlimited Skips"],
    description: "Listen to millions of songs and podcasts without interruptions",
    availability: "Instant Activation",
    isPopular: false,
    compatibility: ["Mobile", "Desktop", "Smart Speaker", "Car"]
  },
  {
    id: 3,
    name: "YouTube Premium",
    provider: "YouTube",
    category: "Video Streaming",
    price: 30,
    originalPrice: 35,
    currency: "ZMW",
    period: "month",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    reviews: 654,
    users: "1.9K",
    features: ["Ad-Free Videos", "Background Play", "YouTube Music", "Downloads"],
    description: "Enjoy YouTube without ads and access YouTube Music premium features",
    availability: "Instant Activation",
    discount: 14,
    isPopular: false,
    compatibility: ["Mobile", "Desktop", "Smart TV", "Tablet"]
  },
  {
    id: 4,
    name: "Showmax",
    provider: "Showmax",
    category: "Video Streaming",
    price: 35,
    currency: "ZMW",
    period: "month",
    image: "https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=400&h=300&fit=crop&crop=center",
    rating: 4.6,
    reviews: 387,
    users: "850",
    features: ["African Content", "International Series", "Live Sports", "Multiple Profiles"],
    description: "Stream the best of African and international entertainment",
    availability: "Instant Activation",
    isPopular: false,
    compatibility: ["Smart TV", "Mobile", "Laptop", "Tablet"]
  },
  {
    id: 5,
    name: "Apple Music",
    provider: "Apple",
    category: "Music Streaming",
    price: 28,
    currency: "ZMW",
    period: "month",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center",
    rating: 4.5,
    reviews: 423,
    users: "670",
    features: ["Lossless Audio", "Spatial Audio", "Live Radio", "Music Videos"],
    description: "Experience music in exceptional audio quality with millions of songs",
    availability: "Instant Activation",
    isPopular: false,
    compatibility: ["iPhone", "Android", "Desktop", "Smart Speaker"]
  },
  {
    id: 6,
    name: "Amazon Prime Video",
    provider: "Amazon",
    category: "Video Streaming",
    price: 40,
    currency: "ZMW",
    period: "month",
    image: "https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=400&h=300&fit=crop&crop=center",
    rating: 4.4,
    reviews: 298,
    users: "520",
    features: ["Prime Originals", "Movie Rentals", "Live Sports", "Free Shipping"],
    description: "Stream exclusive shows and movies with additional Prime benefits",
    availability: "Instant Activation",
    isPopular: false,
    compatibility: ["Smart TV", "Mobile", "Desktop", "Fire TV"]
  }
]

const categories = ["All", "Video Streaming", "Music Streaming"]
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" }
]

export default function StreamingServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const filteredServices = streamingServices
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.provider.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return b.users.replace(/[^\d]/g, '') - a.users.replace(/[^\d]/g, '')
      }
    })

  const handlePurchase = (service: typeof streamingServices[0]) => {
    // Implementation for purchase/subscription process
    console.log("Purchasing:", service.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=600&fit=crop&crop=center"
            alt="Streaming Services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm border border-white/20 mb-6">
            <Play className="mr-2 h-4 w-4" />
            Premium Streaming Services
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stream Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Favorites</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get instant access to premium streaming services. Pay with mobile money and start watching immediately.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Smartphone className="mr-2 h-5 w-5" />
              Pay with Mobile Money
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Monitor className="mr-2 h-5 w-5" />
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search streaming services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={selectedCategory === category ? 
                      "bg-blue-600 hover:bg-blue-700" : 
                      "hover:bg-blue-50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>{filteredServices.length} services found</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-1 text-green-600" />
                  Mobile Money Accepted
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1 text-blue-600" />
                  Instant Activation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {service.isPopular && (
                        <Badge className="bg-orange-500 text-white font-bold">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          POPULAR
                        </Badge>
                      )}
                      {service.discount && (
                        <Badge className="bg-red-500 text-white font-bold">
                          -{service.discount}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Provider Logo */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                      {service.category === "Music Streaming" ? (
                        <Music className="h-6 w-6 text-gray-700" />
                      ) : (
                        <Video className="h-6 w-6 text-gray-700" />
                      )}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="lg"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Subscribe Now
                      </Button>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-bold text-gray-900">{service.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{service.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {service.users} users
                      </div>
                      <div className="text-green-600 font-medium">
                        {service.availability}
                      </div>
                    </div>

                    {/* Compatibility */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Compatible with:</div>
                      <div className="flex flex-wrap gap-1">
                        {service.compatibility.map((device, index) => (
                          <span key={index} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                            {device}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {service.currency} {service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {service.currency} {service.originalPrice}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">/{service.period}</span>
                      </div>
                      <Button
                        onClick={() => handlePurchase(service)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Subscribe
                      </Button>
                    </div>

                    {/* Payment Options */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Payment:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            MTN Money
                          </span>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            Airtel Money
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Bank Card
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Streaming Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the best streaming experience with instant activation and local payment options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Money Payment</h3>
              <p className="text-gray-600">Pay instantly with MTN Money or Airtel Money. No credit card required.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Activation</h3>
              <p className="text-gray-600">Start streaming immediately after payment. No waiting periods.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Billing</h3>
              <p className="text-gray-600">Monthly subscriptions with easy cancellation. No long-term contracts.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
