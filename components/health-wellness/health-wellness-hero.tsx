"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Filter, Heart, Shield, Clock, Users, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface HealthWellnessHeroProps {
  onSearch?: (query: string, filters: SearchFilters) => void
}

interface SearchFilters {
  category: string
  location: string
  priceRange: string
  availability: string
}

const healthCategories = [
  "All Services",
  "General Practitioners", 
  "Mental Health",
  "Physiotherapy & Rehab",
  "Ambulance & Emergency",
  "Fitness & Yoga",
  "Massage & Spa", 
  "Herbal/Traditional Healing",
  "Nurses & Home Care",
  "Diagnostic Labs",
  "Pharmacies"
]

const quickStats = [
  { icon: Heart, label: "Healthcare Providers", value: "500+", color: "text-red-500" },
  { icon: Shield, label: "Verified Professionals", value: "98%", color: "text-green-500" },
  { icon: Clock, label: "Avg Response Time", value: "< 30min", color: "text-blue-500" },
  { icon: Users, label: "Happy Patients", value: "10K+", color: "text-purple-500" }
]

export function HealthWellnessHero({ onSearch }: HealthWellnessHeroProps) {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    category: "All Services",
    location: "",
    priceRange: "Any",
    availability: "Any"
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (user?.location) {
      setFilters(prev => ({ ...prev, location: user.location || "" }))
    }
  }, [user])

  const handleSearch = () => {
    onSearch?.(searchQuery, filters)
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm text-slate-700 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 mb-8">
            <Heart className="mr-2 h-4 w-4 text-red-500 animate-pulse" />
            Your Health, Our Priority - 24/7 Care Available
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x">
              Health & Wellness
            </span>
            <br />
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find trusted healthcare professionals, book appointments, and access emergency services 
            in your area. From doctors to traditional healers, we connect you with quality care.
            {user?.location && (
              <span className="block mt-2 text-blue-600 font-medium">
                <MapPin className="inline h-4 w-4 mr-1" />
                Serving {user.location} and surrounding areas
              </span>
            )}
          </p>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              {/* Main Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search for doctors, services, or specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-3 text-lg border-slate-200 focus:border-blue-500 rounded-xl"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="px-6 py-3 border-slate-200 hover:bg-slate-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  onClick={handleSearch}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Search Services
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 animate-fade-in-up">
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Service Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {healthCategories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any Price</SelectItem>
                      <SelectItem value="0-100">ZMW 0 - 100</SelectItem>
                      <SelectItem value="100-300">ZMW 100 - 300</SelectItem>
                      <SelectItem value="300-500">ZMW 300 - 500</SelectItem>
                      <SelectItem value="500+">ZMW 500+</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any Time</SelectItem>
                      <SelectItem value="today">Available Today</SelectItem>
                      <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="emergency">Emergency Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Quick Access Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { label: "Emergency Services", icon: "🚑", urgent: true },
              { label: "Same Day Booking", icon: "⚡", urgent: false },
              { label: "Home Visits", icon: "🏠", urgent: false },
              { label: "Telemedicine", icon: "💻", urgent: false },
              { label: "Lab Tests", icon: "🧪", urgent: false }
            ].map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`px-4 py-2 text-sm font-medium cursor-pointer hover:scale-105 transition-all duration-300 ${
                  badge.urgent 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 animate-pulse' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <span className="mr-2">{badge.icon}</span>
                {badge.label}
              </Badge>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 ${stat.color} bg-white rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
