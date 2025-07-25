"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Filter,
  ChevronDown,
  ChevronUp,
  Home,
  Building,
  TreePine,
  Waves,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Tv,
  Wind,
  X,
} from "lucide-react"

const popularDestinations = [
  { name: "Lusaka Central", properties: 245, image: "lusaka-central" },
  { name: "Livingstone", properties: 189, image: "livingstone-victoria-falls" },
  { name: "Ndola", properties: 156, image: "ndola-copperbelt" },
  { name: "Kitwe", properties: 134, image: "kitwe-mining" },
  { name: "Kabwe", properties: 98, image: "kabwe-central" },
  { name: "Chingola", properties: 87, image: "chingola-copper" },
]

const propertyTypes = [
  { id: "apartment", label: "Apartment", icon: Building },
  { id: "house", label: "House", icon: Home },
  { id: "lodge", label: "Lodge", icon: TreePine },
  { id: "resort", label: "Resort", icon: Waves },
]

const amenities = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "breakfast", label: "Breakfast", icon: Coffee },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "tv", label: "TV", icon: Tv },
  { id: "ac", label: "Air Conditioning", icon: Wind },
]

export function RentalsSearch() {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  })
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState("recommended")

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]))
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedAmenities([])
    setPriceRange([0, 2000])
    setSortBy("recommended")
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Stay in Zambia
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Search through 1,250+ verified properties across 12 cities
          </p>
        </div>

        {/* Main Search Form */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl shadow-slate-900/10 border-white/20 mb-8 sm:mb-12">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  Where
                </label>
                <Input
                  placeholder="Search destinations"
                  value={searchData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
                />
              </div>

              {/* Check-in */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                  Check-in
                </label>
                <Input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
                />
              </div>

              {/* Check-out */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                  Check-out
                </label>
                <Input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => handleInputChange("checkOut", e.target.value)}
                  className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 text-sm sm:text-base"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-emerald-500" />
                  Guests
                </label>
                <select
                  value={searchData.guests}
                  onChange={(e) => handleInputChange("guests", Number.parseInt(e.target.value))}
                  className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} guest{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all text-sm sm:text-base"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                <span className="text-sm font-medium text-slate-700">Quick filters:</span>
                {["Instant Book", "Free Cancellation", "Superhost", "Pet Friendly", "Pool"].map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    className="bg-white/80 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-xs sm:text-sm"
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              {/* Advanced Filters Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-slate-600 hover:text-slate-900 self-start"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                  {showAdvanced ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </Button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>

                  {(selectedTypes.length > 0 || selectedAmenities.length > 0) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-6">
                {/* Property Types */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Property Type</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {propertyTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedTypes.includes(type.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleType(type.id)}
                        className={`flex items-center justify-center p-3 h-auto ${
                          selectedTypes.includes(type.id)
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <type.icon className="h-4 w-4 mr-2" />
                        <span className="text-xs sm:text-sm">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {amenities.map((amenity) => (
                      <Button
                        key={amenity.id}
                        variant={selectedAmenities.includes(amenity.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`flex items-center justify-center p-3 h-auto ${
                          selectedAmenities.includes(amenity.id)
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <amenity.icon className="h-4 w-4 mr-2" />
                        <span className="text-xs sm:text-sm">{amenity.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Price Range (per night)</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">ZMW</span>
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                        className="w-20 text-sm"
                        min="0"
                      />
                    </div>
                    <span className="text-slate-500">to</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">ZMW</span>
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-20 text-sm"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Destinations */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
            Popular Destinations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {popularDestinations.map((destination, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="font-bold text-lg sm:text-xl mb-1">{destination.name}</h4>
                        <p className="text-sm opacity-90">{destination.properties} properties</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
