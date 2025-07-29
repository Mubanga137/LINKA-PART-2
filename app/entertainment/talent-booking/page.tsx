"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Calendar,
  Search, 
  Star, 
  MapPin,
  Clock,
  Users,
  Phone,
  Mail,
  Award,
  Music,
  Mic,
  Camera,
  Headphones,
  TrendingUp,
  Shield,
  CheckCircle,
  MessageSquare,
  Filter,
  Heart,
  Share2
} from "lucide-react"

const talents = [
  {
    id: 1,
    name: "DJ Splex",
    profession: "Professional DJ & Producer",
    category: "DJ",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=face",
    portfolioImages: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop&crop=center"
    ],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 250,
    eventRate: 1200,
    currency: "ZMW",
    location: "Lusaka",
    experience: "8 years",
    specialties: ["Afrobeat", "House Music", "Hip Hop", "Wedding Events", "Corporate Events"],
    availability: "Available",
    isVerified: true,
    isTopRated: true,
    completedGigs: 340,
    responseTime: "< 2 hours",
    languages: ["English", "Bemba", "Nyanja"],
    equipment: ["Professional Sound System", "Lighting Equipment", "Microphones", "Wireless Setup"],
    description: "Award-winning DJ with 8+ years experience in wedding, corporate, and club events. Specializing in Afrobeat and contemporary music.",
    nextAvailable: "2024-12-20",
    bookingDeposit: 300
  },
  {
    id: 2,
    name: "Sarah Mwanza & The Voices",
    profession: "Live Band & Vocalist",
    category: "Live Band",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b3c0?w=400&h=300&fit=crop&crop=face",
    portfolioImages: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop&crop=center"
    ],
    rating: 4.8,
    reviews: 89,
    hourlyRate: 400,
    eventRate: 2000,
    currency: "ZMW",
    location: "Kitwe",
    experience: "6 years",
    specialties: ["Gospel", "R&B", "Traditional Music", "Corporate Events", "Weddings"],
    availability: "Limited",
    isVerified: true,
    isTopRated: false,
    completedGigs: 156,
    responseTime: "< 4 hours",
    languages: ["English", "Bemba"],
    equipment: ["Full Band Setup", "Vocals", "Acoustic Guitar", "Bass Guitar", "Drums"],
    description: "Professional live band featuring soulful vocals and traditional Zambian music fusion. Perfect for weddings and corporate events.",
    nextAvailable: "2024-12-25",
    bookingDeposit: 500
  },
  {
    id: 3,
    name: "Chanda Cultural Dance Crew",
    profession: "Traditional & Modern Dance",
    category: "Dance Performers",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center",
    portfolioImages: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1546535094-34b9fc1f4b37?w=300&h=200&fit=crop&crop=center"
    ],
    rating: 4.7,
    reviews: 64,
    hourlyRate: 300,
    eventRate: 1500,
    currency: "ZMW",
    location: "Ndola",
    experience: "5 years",
    specialties: ["Traditional Zambian", "Contemporary Dance", "Cultural Shows", "Corporate Entertainment"],
    availability: "Available",
    isVerified: true,
    isTopRated: false,
    completedGigs: 98,
    responseTime: "< 6 hours",
    languages: ["English", "Bemba", "Lozi"],
    equipment: ["Traditional Costumes", "Props", "Sound System", "Cultural Instruments"],
    description: "Professional dance crew specializing in authentic Zambian traditional dances and modern contemporary performances.",
    nextAvailable: "2024-12-18",
    bookingDeposit: 400
  },
  {
    id: 4,
    name: "James Phiri",
    profession: "Event MC & Host",
    category: "MC/Host",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
    portfolioImages: [
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center"
    ],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 200,
    eventRate: 800,
    currency: "ZMW",
    location: "Lusaka",
    experience: "10 years",
    specialties: ["Weddings", "Corporate Events", "Conferences", "Comedy", "Product Launches"],
    availability: "Available",
    isVerified: true,
    isTopRated: true,
    completedGigs: 278,
    responseTime: "< 1 hour",
    languages: ["English", "Bemba", "Nyanja", "Tonga"],
    equipment: ["Wireless Microphone", "Professional Attire", "Presentation Equipment"],
    description: "Experienced event host and MC with over 10 years in the industry. Fluent in multiple local languages and specializes in keeping audiences engaged.",
    nextAvailable: "2024-12-15",
    bookingDeposit: 200
  },
  {
    id: 5,
    name: "Lusaka Comedy Collective",
    profession: "Stand-up Comedy Group",
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    portfolioImages: [
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center"
    ],
    rating: 4.6,
    reviews: 92,
    hourlyRate: 350,
    eventRate: 1800,
    currency: "ZMW",
    location: "Lusaka",
    experience: "4 years",
    specialties: ["Stand-up Comedy", "Corporate Entertainment", "Private Events", "Clean Comedy"],
    availability: "Available",
    isVerified: true,
    isTopRated: false,
    completedGigs: 85,
    responseTime: "< 3 hours",
    languages: ["English", "Bemba", "Nyanja"],
    equipment: ["Microphones", "Audio System", "Staging Setup"],
    description: "Professional comedy group providing clean, family-friendly entertainment for corporate and private events.",
    nextAvailable: "2024-12-22",
    bookingDeposit: 450
  },
  {
    id: 6,
    name: "Mike Tembo Photography",
    profession: "Event Photographer & Videographer",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    portfolioImages: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=300&h=200&fit=crop&crop=center"
    ],
    rating: 4.8,
    reviews: 134,
    hourlyRate: 180,
    eventRate: 1000,
    currency: "ZMW",
    location: "Lusaka",
    experience: "7 years",
    specialties: ["Wedding Photography", "Corporate Events", "Portrait Photography", "Event Videography"],
    availability: "Available",
    isVerified: true,
    isTopRated: true,
    completedGigs: 245,
    responseTime: "< 2 hours",
    languages: ["English", "Bemba"],
    equipment: ["Professional Cameras", "Lighting Equipment", "Drone", "Video Equipment"],
    description: "Award-winning photographer specializing in weddings and corporate events. Offering both photography and videography services.",
    nextAvailable: "2024-12-16",
    bookingDeposit: 250
  }
]

const categories = ["All", "DJ", "Live Band", "Dance Performers", "MC/Host", "Comedy", "Photography"]
const locations = ["All Locations", "Lusaka", "Kitwe", "Ndola", "Livingstone", "Kabwe"]
const priceRanges = [
  { label: "All Prices", min: 0, max: 10000 },
  { label: "Under ZMW 500", min: 0, max: 500 },
  { label: "ZMW 500-1000", min: 500, max: 1000 },
  { label: "ZMW 1000-2000", min: 1000, max: 2000 },
  { label: "ZMW 2000+", min: 2000, max: 10000 }
]

export default function TalentBookingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTalent, setSelectedTalent] = useState<number | null>(null)
  const [favoriteTalents, setFavoriteTalents] = useState<number[]>([])

  const filteredTalents = talents
    .filter(talent => {
      const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           talent.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           talent.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || talent.category === selectedCategory
      const matchesLocation = selectedLocation === "All Locations" || talent.location === selectedLocation
      const matchesPrice = talent.eventRate >= selectedPriceRange.min && talent.eventRate <= selectedPriceRange.max
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.eventRate - b.eventRate
        case "price-high":
          return b.eventRate - a.eventRate
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience)
        case "gigs":
          return b.completedGigs - a.completedGigs
        default:
          return b.rating - a.rating
      }
    })

  const toggleFavorite = (talentId: number) => {
    setFavoriteTalents(prev => 
      prev.includes(talentId) 
        ? prev.filter(id => id !== talentId)
        : [...prev, talentId]
    )
  }

  const handleBooking = (talent: typeof talents[0]) => {
    console.log("Booking:", talent.name)
  }

  const handleContactTalent = (talent: typeof talents[0]) => {
    console.log("Contacting:", talent.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop&crop=center"
            alt="Entertainment Professionals"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm border border-white/20 mb-6">
            <Users className="mr-2 h-4 w-4" />
            Professional Entertainment Talent
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Top Talent</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Connect with verified performers, DJs, and entertainers for your events. Professional talent, instant booking, secure payments.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">200+</div>
              <div className="text-sm opacity-90">Verified Talents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm opacity-90">Events Booked</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">24h</div>
              <div className="text-sm opacity-90">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-white/20">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search talent, skills, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-300"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={selectedPriceRange.label}
                  onChange={(e) => setSelectedPriceRange(priceRanges.find(range => range.label === e.target.value) || priceRanges[0])}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="experience">Most Experienced</option>
                  <option value="gigs">Most Gigs</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredTalents.length} talents found</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-green-600" />
                  All Verified
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-blue-600" />
                  Instant Booking
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTalents.map((talent) => (
              <Card
                key={talent.id}
                className="group hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    {/* Talent Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={talent.image}
                        alt={talent.name}
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                      {talent.isVerified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {talent.isTopRated && (
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Talent Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {talent.name}
                          </h3>
                          <p className="text-gray-600 font-medium">{talent.profession}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {talent.category}
                            </Badge>
                            {talent.availability === "Available" ? (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Available
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                                Limited
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(talent.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Heart className={`h-5 w-5 ${favoriteTalents.includes(talent.id) ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <div className="flex items-center text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {talent.location}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-500">
                            <Award className="h-4 w-4 mr-1" />
                            {talent.experience}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {talent.responseTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center mr-4">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-bold text-gray-900">{talent.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({talent.reviews} reviews)</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {talent.completedGigs} gigs completed
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {talent.description}
                      </p>

                      {/* Specialties */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2">Specialties:</div>
                        <div className="flex flex-wrap gap-1">
                          {talent.specialties.slice(0, 3).map((specialty, index) => (
                            <span key={index} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                          {talent.specialties.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{talent.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="text-xs text-gray-500">Hourly Rate</div>
                            <div className="font-bold text-gray-900">{talent.currency} {talent.hourlyRate}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Event Rate</div>
                            <div className="text-lg font-bold text-purple-600">{talent.currency} {talent.eventRate}</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleContactTalent(talent)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button
                          onClick={() => handleBooking(talent)}
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      </div>

                      {/* Next Available */}
                      <div className="mt-3 text-xs text-gray-500 text-center">
                        Next available: {new Date(talent.nextAvailable).toLocaleDateString()} • 
                        Deposit: {talent.currency} {talent.bookingDeposit}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Portfolio (when clicked) */}
                  {selectedTalent === talent.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Portfolio</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {talent.portfolioImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`${talent.name} portfolio ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Equipment</h4>
                          <ul className="space-y-1">
                            {talent.equipment.map((item, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
                          <div className="flex flex-wrap gap-2">
                            {talent.languages.map((language, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Toggle Portfolio Button */}
                  <div className="mt-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTalent(selectedTalent === talent.id ? null : talent.id)}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      {selectedTalent === talent.id ? "Hide Details" : "View Portfolio & Details"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Book Through Linka?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We make it easy to find, book, and pay professional entertainment talent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Professionals</h3>
              <p className="opacity-90">All talent is ID-verified with portfolio reviews and background checks</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="opacity-90">Book instantly online with secure payments and clear contracts</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="opacity-90">Get help anytime with our dedicated customer support team</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
