"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Star,
  MapPin,
  Clock,
  Calendar,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Filter,
  Search,
  Verified,
} from "lucide-react"

const talents = [
  {
    id: 1,
    name: "DJ Mo",
    profession: "Professional DJ",
    avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face",
    rating: 4.9,
    reviews: 127,
    hourlyRate: "ZMW 250-400",
    eventRate: "ZMW 800-1500",
    location: "Lusaka",
    experience: "8 years",
    specialties: ["Afrobeat", "House", "Hip Hop", "Wedding Events"],
    availability: "Available",
    isVerified: true,
    completedGigs: 340,
    responseTime: "< 2 hours",
    languages: ["English", "Bemba", "Nyanja"],
    equipment: ["Professional Sound System", "Lighting", "Microphones"],
    portfolio: [
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
    ],
  },
  {
    id: 2,
    name: "Sarah Mwanza",
    profession: "Live Band & Vocalist",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3c0?w=100&h=100&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    hourlyRate: "ZMW 300-500",
    eventRate: "ZMW 1200-2500",
    location: "Kitwe",
    experience: "6 years",
    specialties: ["Gospel", "R&B", "Traditional", "Corporate Events"],
    availability: "Booked until next week",
    isVerified: true,
    completedGigs: 156,
    responseTime: "< 4 hours",
    languages: ["English", "Bemba"],
    equipment: ["Full Band Setup", "Vocals", "Acoustic Guitar"],
    portfolio: [
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
    ],
  },
  {
    id: 3,
    name: "Chanda Dance Crew",
    profession: "Traditional & Modern Dance",
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=center",
    rating: 4.7,
    reviews: 64,
    hourlyRate: "ZMW 200-350",
    eventRate: "ZMW 600-1200",
    location: "Ndola",
    experience: "5 years",
    specialties: ["Traditional Zambian", "Contemporary", "Cultural Shows"],
    availability: "Available",
    isVerified: true,
    completedGigs: 98,
    responseTime: "< 6 hours",
    languages: ["English", "Bemba", "Lozi"],
    equipment: ["Traditional Costumes", "Props", "Sound System"],
    portfolio: [
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
    ],
  },
  {
    id: 4,
    name: "James Phiri",
    profession: "Event MC & Host",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4.9,
    reviews: 156,
    hourlyRate: "ZMW 180-300",
    eventRate: "ZMW 500-1000",
    location: "Lusaka",
    experience: "10 years",
    specialties: ["Weddings", "Corporate Events", "Conferences", "Comedy"],
    availability: "Available",
    isVerified: true,
    completedGigs: 278,
    responseTime: "< 1 hour",
    languages: ["English", "Bemba", "Nyanja", "Tonga"],
    equipment: ["Wireless Microphone", "Professional Attire"],
    portfolio: [
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
    ],
  },
]

export function TalentMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTalent, setSelectedTalent] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredTalents = talents.filter(
    (talent) =>
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Book</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Talent</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Connect with verified performers, DJs, and entertainers for your events
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search talent, skills, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <div className="text-sm text-slate-600">{filteredTalents.length} talents found</div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg">
                    <option>All Locations</option>
                    <option>Lusaka</option>
                    <option>Kitwe</option>
                    <option>Ndola</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg">
                    <option>All Categories</option>
                    <option>DJ</option>
                    <option>Live Band</option>
                    <option>Dance</option>
                    <option>MC/Host</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg">
                    <option>Any Price</option>
                    <option>Under ZMW 500</option>
                    <option>ZMW 500-1000</option>
                    <option>ZMW 1000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg">
                    <option>Any Time</option>
                    <option>Available Now</option>
                    <option>This Weekend</option>
                    <option>Next Week</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTalents.map((talent) => (
            <Card
              key={talent.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white border-slate-200 overflow-hidden"
              onClick={() => setSelectedTalent(selectedTalent === talent.id ? null : talent.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={talent.avatar || "/placeholder.svg"}
                      alt={talent.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {talent.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Verified className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                          {talent.name}
                        </h3>
                        <p className="text-slate-600">{talent.profession}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-bold text-slate-900">{talent.rating}</span>
                          <span className="text-slate-500 text-sm ml-1">({talent.reviews})</span>
                        </div>
                        <Badge
                          variant={talent.availability === "Available" ? "default" : "secondary"}
                          className={talent.availability === "Available" ? "bg-green-100 text-green-700" : ""}
                        >
                          {talent.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {talent.location}
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {talent.experience}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {talent.responseTime}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {talent.specialties.slice(0, 3).map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                      {talent.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          +{talent.specialties.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-purple-600">{talent.eventRate}</div>
                        <div className="text-sm text-slate-500">per event</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedTalent === talent.id && (
                  <div className="border-t border-slate-200 pt-6 space-y-6">
                    {/* Portfolio */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Portfolio</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {talent.portfolio.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`${talent.name} portfolio ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Equipment & Languages */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Equipment Provided</h4>
                        <ul className="space-y-1">
                          {talent.equipment.map((item, index) => (
                            <li key={index} className="text-sm text-slate-600 flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {talent.languages.map((language, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{talent.completedGigs}</div>
                        <div className="text-sm text-slate-500">Completed Gigs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{talent.rating}</div>
                        <div className="text-sm text-slate-500">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{talent.responseTime}</div>
                        <div className="text-sm text-slate-500">Response Time</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book for Event
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-8 py-4 text-purple-700 border border-purple-200/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Users className="mr-3 h-6 w-6 group-hover:animate-bounce" />
            <span className="text-lg font-medium">Join as a performer and start earning</span>
            <TrendingUp className="ml-3 h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
