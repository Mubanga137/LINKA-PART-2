"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  Heart,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Eye,
  Shield,
  Award,
  Clock,
  ChevronDown,
  Filter,
} from "lucide-react"
import Image from "next/image"

const properties = [
  {
    id: 1,
    name: "Luxury Villa with Pool",
    host: "Sarah Mwanza",
    location: "Kabulonga, Lusaka",
    price: 850,
    originalPrice: 1000,
    rating: 4.9,
    reviews: 127,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center",
    badges: ["Superhost", "Instant Book"],
    amenities: ["wifi", "parking", "pool", "kitchen", "ac", "tv"],
    category: "luxury",
    isWishlisted: false,
    discount: 15,
  },
  {
    id: 2,
    name: "Cozy Downtown Apartment",
    host: "James Banda",
    location: "Cairo Road, Lusaka",
    price: 320,
    rating: 4.7,
    reviews: 89,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&crop=center",
    badges: ["Great Value"],
    amenities: ["wifi", "kitchen", "tv", "ac"],
    category: "apartment",
    isWishlisted: true,
  },
  {
    id: 3,
    name: "Safari Lodge Experience",
    host: "Grace Mulenga",
    location: "Livingstone",
    price: 650,
    rating: 4.8,
    reviews: 156,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop&crop=center",
    badges: ["Unique Stay", "Superhost"],
    amenities: ["wifi", "parking", "restaurant", "pool", "safari"],
    category: "lodge",
    isWishlisted: false,
  },
  {
    id: 4,
    name: "Modern Studio Near Airport",
    host: "Peter Phiri",
    location: "Airport Area, Lusaka",
    price: 180,
    originalPrice: 220,
    rating: 4.5,
    reviews: 67,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop&crop=center",
    badges: ["Budget Friendly"],
    amenities: ["wifi", "parking", "kitchen", "tv"],
    category: "studio",
    isWishlisted: false,
    discount: 18,
  },
  {
    id: 5,
    name: "Traditional Zambian House",
    host: "Mary Tembo",
    location: "Chilenje, Lusaka",
    price: 280,
    rating: 4.6,
    reviews: 94,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center",
    badges: ["Cultural Experience"],
    amenities: ["wifi", "parking", "kitchen", "garden"],
    category: "house",
    isWishlisted: true,
  },
  {
    id: 6,
    name: "Riverside Resort Suite",
    host: "David Mwila",
    location: "Kafue River, Lusaka",
    price: 480,
    rating: 4.9,
    reviews: 203,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center",
    badges: ["Superhost", "Scenic View"],
    amenities: ["wifi", "parking", "restaurant", "pool", "spa", "boat"],
    category: "resort",
    isWishlisted: false,
  },
]

const categories = [
  { id: "all", label: "All Properties", count: properties.length },
  { id: "apartment", label: "Apartments", count: properties.filter((p) => p.category === "apartment").length },
  { id: "house", label: "Houses", count: properties.filter((p) => p.category === "house").length },
  { id: "lodge", label: "Lodges", count: properties.filter((p) => p.category === "lodge").length },
  { id: "luxury", label: "Luxury", count: properties.filter((p) => p.category === "luxury").length },
]

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
]

export function RentalsListings() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recommended")
  const [wishlist, setWishlist] = useState<number[]>([2, 5])
  const [expandedProperty, setExpandedProperty] = useState<number | null>(null)

  const toggleWishlist = (propertyId: number) => {
    setWishlist((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const filteredProperties = properties.filter(
    (property) => selectedCategory === "all" || property.category === selectedCategory,
  )

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Featured</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Properties
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover handpicked accommodations from verified hosts across Zambia
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 sm:mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                } text-xs sm:text-sm`}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>

          {/* Sort and Results */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm sm:text-base text-slate-600">
              Showing {sortedProperties.length} of {properties.length} properties
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="outline" size="sm" className="sm:hidden bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {sortedProperties.map((property, index) => (
            <Card
              key={property.id}
              className="group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Discount Badge */}
                    {property.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{property.discount}%
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-1">
                      {property.badges.slice(0, 2).map((badge, idx) => (
                        <div
                          key={idx}
                          className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                            badge === "Superhost"
                              ? "bg-gradient-to-r from-orange-500 to-red-500"
                              : badge === "Instant Book"
                                ? "bg-gradient-to-r from-emerald-500 to-green-600"
                                : "bg-gradient-to-r from-purple-500 to-indigo-600"
                          }`}
                        >
                          {badge}
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm"
                          onClick={() => setExpandedProperty(expandedProperty === property.id ? null : property.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toggleWishlist(property.id)}
                          className={`shadow-lg backdrop-blur-sm ${
                            wishlist.includes(property.id)
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-white/90 text-slate-900 hover:bg-white"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${wishlist.includes(property.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>

                    {/* Amenities Preview */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex space-x-1">
                        {property.amenities.slice(0, 4).map((amenity, idx) => {
                          const icons = { wifi: Wifi, parking: Car, kitchen: Utensils, tv: Tv, ac: Wind, pool: Users }
                          const Icon = icons[amenity as keyof typeof icons] || Wifi
                          return (
                            <div
                              key={idx}
                              className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg"
                            >
                              <Icon className="h-3 w-3 text-slate-600" />
                            </div>
                          )
                        })}
                        {property.amenities.length > 4 && (
                          <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-xs font-bold text-slate-600">+{property.amenities.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Rating & Location */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1.5 text-sm font-bold text-slate-900">{property.rating}</span>
                        <span className="ml-1 text-sm text-slate-500">({property.reviews})</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                        {property.location}
                      </div>
                    </div>

                    {/* Property Name */}
                    <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {property.name}
                    </h3>

                    {/* Host */}
                    <p className="text-sm text-slate-600 mb-4 font-medium flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-emerald-500" />
                      Hosted by {property.host}
                    </p>

                    {/* Property Details */}
                    <div className="flex items-center text-sm text-slate-600 mb-4 space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {property.guests} guests
                      </div>
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.bathrooms} bath{property.bathrooms > 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedProperty === property.id && (
                      <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-slate-900 mb-2">Amenities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {property.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-slate-600 border">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-slate-900">ZMW {property.price}</span>
                        {property.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">ZMW {property.originalPrice}</span>
                        )}
                        <span className="text-sm text-slate-500">per night</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </div>

                    {/* Booking Info */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center text-sm text-slate-600">
                        <Award className="h-4 w-4 mr-2 text-emerald-500" />
                        <span>Free cancellation • Instant confirmation</span>
                      </div>
                    </div>
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
            className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-8 py-3 text-base bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <ChevronDown className="h-5 w-5 mr-2" />
            Load More Properties
          </Button>
        </div>
      </div>
    </section>
  )
}
