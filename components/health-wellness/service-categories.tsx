"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Stethoscope,
  Brain,
  Dumbbell,
  Ambulance,
  Heart,
  Flower,
  Leaf,
  Home,
  TestTube,
  Pill,
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Shield,
  Users,
  Phone,
  Calendar,
  DollarSign
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface HealthService {
  id: string
  name: string
  category: string
  description: string
  providerName: string
  providerAvatar?: string
  rating: number
  reviews: number
  price: number
  duration: string
  availability: string[]
  location: string
  distance: number
  isVerified: boolean
  specialties: string[]
  languages: string[]
  homeVisit: boolean
  telemedicine: boolean
  features: string[]
}

const serviceCategories = [
  {
    id: "general-practitioners",
    name: "General Practitioners",
    icon: Stethoscope,
    color: "from-blue-500 to-cyan-600",
    description: "Book consultations with doctors",
    count: 45
  },
  {
    id: "mental-health", 
    name: "Mental Health",
    icon: Brain,
    color: "from-purple-500 to-pink-600",
    description: "Therapists, counselors, psychiatrists",
    count: 28
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy & Rehab",
    icon: Dumbbell,
    color: "from-green-500 to-teal-600",
    description: "Rehab centers, mobile physiotherapists",
    count: 32
  },
  {
    id: "emergency",
    name: "Ambulance & Emergency", 
    icon: Ambulance,
    color: "from-red-500 to-orange-600",
    description: "Real-time ambulance booking with live map",
    count: 12,
    urgent: true
  },
  {
    id: "fitness",
    name: "Fitness & Yoga",
    icon: Heart,
    color: "from-orange-500 to-yellow-600", 
    description: "Trainers, yoga instructors, fitness classes",
    count: 67
  },
  {
    id: "spa-massage",
    name: "Massage & Spa",
    icon: Flower,
    color: "from-pink-500 to-rose-600",
    description: "Spa treatments, home service massage therapists",
    count: 23
  },
  {
    id: "traditional-healing",
    name: "Herbal/Traditional Healing",
    icon: Leaf,
    color: "from-green-600 to-emerald-600",
    description: "Certified herbalists and wellness experts", 
    count: 18
  },
  {
    id: "home-care",
    name: "Nurses & Home Care",
    icon: Home,
    color: "from-indigo-500 to-blue-600",
    description: "Home-based nurses, caregivers for the elderly",
    count: 34
  },
  {
    id: "diagnostic-labs",
    name: "Diagnostic Labs",
    icon: TestTube,
    color: "from-teal-500 to-cyan-600",
    description: "Book lab tests, get home sample pickups",
    count: 15
  },
  {
    id: "pharmacies",
    name: "Pharmacies",
    icon: Pill,
    color: "from-red-600 to-pink-600",
    description: "Find nearby pharmacies, request delivery",
    count: 89
  }
]

const generateMockServices = (category: string, userLocation: string): HealthService[] => {
  const services: HealthService[] = []
  const count = Math.floor(Math.random() * 8) + 3
  
  for (let i = 0; i < count; i++) {
    services.push({
      id: `${category}-${i + 1}`,
      name: `${category.replace('-', ' ')} Service ${i + 1}`,
      category,
      description: `Professional ${category.replace('-', ' ')} services with quality care`,
      providerName: `Dr. ${['John', 'Sarah', 'David', 'Mary', 'James', 'Grace'][i % 6]} ${['Mwanza', 'Banda', 'Tembo', 'Phiri', 'Musonda', 'Kunda'][i % 6]}`,
      rating: 4.2 + Math.random() * 0.8,
      reviews: Math.floor(Math.random() * 200) + 20,
      price: Math.floor(Math.random() * 300) + 50,
      duration: ['30 min', '45 min', '60 min', '90 min'][Math.floor(Math.random() * 4)],
      availability: ['Today', 'Tomorrow', 'This Week'],
      location: i < 3 ? userLocation : ['Ndola', 'Kitwe', 'Livingstone'][i % 3],
      distance: i < 3 ? Math.random() * 5 + 1 : Math.random() * 50 + 10,
      isVerified: Math.random() > 0.3,
      specialties: ['General Care', 'Emergency', 'Consultation', 'Treatment'].slice(0, Math.floor(Math.random() * 3) + 1),
      languages: ['English', 'Bemba', 'Nyanja'].slice(0, Math.floor(Math.random() * 2) + 1),
      homeVisit: Math.random() > 0.5,
      telemedicine: Math.random() > 0.4,
      features: ['Online Booking', 'Same Day', 'Insurance Accepted'].filter(() => Math.random() > 0.5)
    })
  }
  
  return services.sort((a, b) => a.distance - b.distance)
}

export function ServiceCategories() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [services, setServices] = useState<HealthService[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    priceRange: "any",
    availability: "any",
    serviceType: "any"
  })

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId)
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const userLocation = user?.location || "Lusaka"
      const mockServices = generateMockServices(categoryId, userLocation)
      setServices(mockServices)
      setIsLoading(false)
    }, 1500)
  }

  const filteredServices = services.filter(service => {
    const matchesSearch = searchQuery === "" || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesPrice = filters.priceRange === "any" ||
      (filters.priceRange === "0-100" && service.price <= 100) ||
      (filters.priceRange === "100-300" && service.price > 100 && service.price <= 300) ||
      (filters.priceRange === "300+" && service.price > 300)
    
    return matchesSearch && matchesPrice
  })

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Health Services
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our comprehensive range of healthcare services. From emergency care to wellness treatments, 
            find trusted professionals in your area.
          </p>
        </div>

        {!selectedCategory ? (
          // Category Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className={`group cursor-pointer hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-4 hover:scale-105 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden ${
                    category.urgent ? 'ring-2 ring-red-500 animate-pulse' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    {/* Category Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Category Name */}
                    <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>

                    {/* Provider Count */}
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-slate-900">{category.count} providers</span>
                    </div>

                    {/* Urgent Badge */}
                    {category.urgent && (
                      <Badge className="mt-3 bg-red-500 text-white animate-pulse">
                        🚨 Emergency Service
                      </Badge>
                    )}

                    {/* Hover Effect Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          // Service Listings
          <div className="space-y-6">
            {/* Back Button & Category Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null)
                    setServices([])
                    setSearchQuery("")
                  }}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  ← Back to Categories
                </Button>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {serviceCategories.find(c => c.id === selectedCategory)?.name}
                  </h3>
                  <p className="text-slate-600">
                    {isLoading ? 'Loading services...' : `${filteredServices.length} services found`}
                  </p>
                </div>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search providers, specialties, or services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 border-slate-200 focus:border-blue-500"
                  />
                </div>
                
                <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
                  <SelectTrigger className="w-full md:w-48 border-slate-200">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="0-100">ZMW 0 - 100</SelectItem>
                    <SelectItem value="100-300">ZMW 100 - 300</SelectItem>
                    <SelectItem value="300+">ZMW 300+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                  <SelectTrigger className="w-full md:w-48 border-slate-200">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="today">Available Today</SelectItem>
                    <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Service Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded"></div>
                        <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                        <div className="h-8 bg-slate-200 rounded mt-4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      {/* Provider Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {service.providerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {service.providerName}
                          </h4>
                          <p className="text-sm text-slate-600">{service.name}</p>
                        </div>
                        {service.isVerified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      {/* Service Info */}
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {service.specialties.slice(0, 3).map((specialty, specIndex) => (
                          <Badge key={specIndex} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      {/* Service Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.homeVisit && (
                          <div className="flex items-center text-xs text-green-600">
                            <Home className="h-3 w-3 mr-1" />
                            Home Visit
                          </div>
                        )}
                        {service.telemedicine && (
                          <div className="flex items-center text-xs text-blue-600">
                            <Phone className="h-3 w-3 mr-1" />
                            Telemedicine
                          </div>
                        )}
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{service.rating.toFixed(1)}</span>
                            <span className="ml-1 text-sm text-slate-500">({service.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {service.distance < 10 ? `${service.distance.toFixed(1)}km` : service.location}
                        </div>
                      </div>

                      {/* Pricing & Availability */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-bold text-slate-900">ZMW {service.price}</span>
                          <span className="text-sm text-slate-500">/ {service.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Available Today
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                        <Button variant="outline" size="sm" className="px-3">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No services found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search criteria or filters to find more results.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setFilters({
                      priceRange: "any",
                      availability: "any", 
                      serviceType: "any"
                    })
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
