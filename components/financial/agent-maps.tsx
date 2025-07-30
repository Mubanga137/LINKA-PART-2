"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MapPin, 
  Search, 
  Filter,
  Phone,
  Clock,
  Star,
  Navigation,
  Building,
  Smartphone,
  CreditCard,
  Shield,
  Users,
  TrendingUp
} from "lucide-react"

interface Agent {
  id: string
  name: string
  type: string
  services: string[]
  location: {
    address: string
    district: string
    coordinates: { lat: number; lng: number }
  }
  contact: {
    phone: string
    email?: string
  }
  hours: string
  rating: number
  reviews: number
  verified: boolean
  distance?: number
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Zanaco Arcades Branch",
    type: "Bank Branch",
    services: ["Savings Accounts", "Loans", "Foreign Exchange", "Investment Services"],
    location: {
      address: "Arcades Shopping Mall, Great East Road",
      district: "Lusaka",
      coordinates: { lat: -15.3875, lng: 28.3228 }
    },
    contact: {
      phone: "+260 211 229 229",
      email: "arcades@zanaco.co.zm"
    },
    hours: "Mon-Fri: 8:00-17:00, Sat: 8:00-13:00",
    rating: 4.6,
    reviews: 128,
    verified: true,
    distance: 2.3
  },
  {
    id: "2",
    name: "MTN Mobile Money Agent - Kamwala",
    type: "Mobile Money Agent",
    services: ["Send Money", "Cash In/Out", "Bill Payments", "Airtime"],
    location: {
      address: "Kamwala Market, Shop 45",
      district: "Lusaka",
      coordinates: { lat: -15.4067, lng: 28.2833 }
    },
    contact: {
      phone: "+260 977 123 456"
    },
    hours: "Daily: 6:00-20:00",
    rating: 4.3,
    reviews: 67,
    verified: true,
    distance: 1.8
  },
  {
    id: "3",
    name: "Stanbic Bank - Cairo Road",
    type: "Bank Branch",
    services: ["Personal Banking", "Business Banking", "Investment Services", "Insurance"],
    location: {
      address: "Cairo Road, City Centre",
      district: "Lusaka",
      coordinates: { lat: -15.4167, lng: 28.2833 }
    },
    contact: {
      phone: "+260 211 256 969",
      email: "cairoroad@stanbic.co.zm"
    },
    hours: "Mon-Fri: 8:00-16:30, Sat: 8:00-12:00",
    rating: 4.7,
    reviews: 245,
    verified: true,
    distance: 0.8
  },
  {
    id: "4",
    name: "Madison Insurance - Woodlands",
    type: "Insurance Agent",
    services: ["Motor Insurance", "Life Insurance", "Health Insurance", "Property Insurance"],
    location: {
      address: "Woodlands Shopping Centre",
      district: "Lusaka",
      coordinates: { lat: -15.3667, lng: 28.3167 }
    },
    contact: {
      phone: "+260 211 262 054",
      email: "woodlands@madison.co.zm"
    },
    hours: "Mon-Fri: 8:00-17:00",
    rating: 4.4,
    reviews: 89,
    verified: true,
    distance: 3.1
  },
  {
    id: "5",
    name: "Airtel Money Agent - Chilenje",
    type: "Mobile Money Agent",
    services: ["Money Transfer", "Bill Payments", "Merchant Payments", "International Transfer"],
    location: {
      address: "Chilenje Market, Stall 12",
      district: "Lusaka",
      coordinates: { lat: -15.3833, lng: 28.3000 }
    },
    contact: {
      phone: "+260 966 789 012"
    },
    hours: "Daily: 7:00-19:00",
    rating: 4.5,
    reviews: 34,
    verified: true,
    distance: 2.7
  },
  {
    id: "6",
    name: "FNB Business Centre - Levy Junction",
    type: "Bank Branch",
    services: ["Business Banking", "Trade Finance", "Asset Finance", "Cash Management"],
    location: {
      address: "Levy Junction Shopping Centre",
      district: "Lusaka",
      coordinates: { lat: -15.3500, lng: 28.3333 }
    },
    contact: {
      phone: "+260 211 375 000",
      email: "levyjunction@fnbzambia.co.zm"
    },
    hours: "Mon-Fri: 8:00-16:00",
    rating: 4.8,
    reviews: 156,
    verified: true,
    distance: 4.2
  }
]

export function AgentMaps() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [mapView, setMapView] = useState(true)

  const serviceTypes = [
    { value: "all", label: "All Services", icon: MapPin },
    { value: "banking", label: "Banking", icon: Building },
    { value: "mobile-money", label: "Mobile Money", icon: Smartphone },
    { value: "insurance", label: "Insurance", icon: Shield },
    { value: "loans", label: "Loans", icon: CreditCard },
    { value: "investments", label: "Investments", icon: TrendingUp },
    { value: "advisory", label: "Advisory", icon: Users }
  ]

  const districts = [
    "all", "Lusaka", "Kitwe", "Ndola", "Kabwe", "Chingola", "Mufulira", "Livingstone"
  ]

  const filteredAgents = agents
    .filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.location.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesService = selectedService === "all" || 
                            agent.type.toLowerCase().includes(selectedService.toLowerCase())
      const matchesDistrict = selectedDistrict === "all" || 
                             agent.location.district === selectedDistrict
      return matchesSearch && matchesService && matchesDistrict
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return (a.distance || 0) - (b.distance || 0)
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "bank branch":
        return Building
      case "mobile money agent":
        return Smartphone
      case "insurance agent":
        return Shield
      default:
        return MapPin
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Find Nearby Agents</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Locate banks, mobile money agents, insurance providers, and financial advisors near you
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-r from-slate-50 to-gray-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, location, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      <div className="flex items-center gap-2">
                        <service.icon className="h-4 w-4" />
                        {service.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district === "all" ? "All Districts" : district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button 
                  variant={mapView ? "default" : "outline"}
                  onClick={() => setMapView(true)}
                  className="flex-1"
                >
                  Map View
                </Button>
                <Button 
                  variant={!mapView ? "default" : "outline"}
                  onClick={() => setMapView(false)}
                  className="flex-1"
                >
                  List View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map/Results */}
        <div className="lg:col-span-2">
          {mapView ? (
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Interactive Map</h3>
                    <p className="text-slate-600 max-w-md">
                      Interactive map showing {filteredAgents.length} financial service providers in your area
                    </p>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                      {filteredAgents.slice(0, 6).map((agent) => {
                        const IconComponent = getServiceIcon(agent.type)
                        return (
                          <div key={agent.id} className="bg-white p-3 rounded-lg shadow-sm border">
                            <IconComponent className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-xs font-medium text-slate-700 truncate">{agent.name}</p>
                            <p className="text-xs text-slate-500">{agent.distance}km away</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAgents.map((agent) => {
                const IconComponent = getServiceIcon(agent.type)
                return (
                  <Card key={agent.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                {agent.name}
                                {agent.verified && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-sm text-slate-600">{agent.type}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-medium">{agent.rating}</span>
                                <span className="text-sm text-slate-500">({agent.reviews})</span>
                              </div>
                              {agent.distance && (
                                <p className="text-sm text-slate-500">{agent.distance}km away</p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin className="h-4 w-4" />
                              {agent.location.address}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Phone className="h-4 w-4" />
                              {agent.contact.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="h-4 w-4" />
                              {agent.hours}
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm font-medium text-slate-700 mb-2">Services:</p>
                            <div className="flex flex-wrap gap-2">
                              {agent.services.slice(0, 3).map((service, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                              {agent.services.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{agent.services.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                              <Navigation className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700">Area Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{filteredAgents.length}</div>
                <div className="text-sm text-slate-600">Service Providers Found</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bank Branches</span>
                  <span className="font-medium">
                    {filteredAgents.filter(a => a.type === "Bank Branch").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mobile Money Agents</span>
                  <span className="font-medium">
                    {filteredAgents.filter(a => a.type === "Mobile Money Agent").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Insurance Agents</span>
                  <span className="font-medium">
                    {filteredAgents.filter(a => a.type === "Insurance Agent").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Rated */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Highest Rated Nearby
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredAgents
                .slice()
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map((agent) => {
                  const IconComponent = getServiceIcon(agent.type)
                  return (
                    <div key={agent.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{agent.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-medium">{agent.rating}</span>
                          </div>
                          <span className="text-xs text-slate-500">{agent.distance}km</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </CardContent>
          </Card>

          {/* Emergency Services */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Emergency Financial Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium mb-2">24/7 Services Available:</p>
                <ul className="space-y-1 text-xs">
                  <li>• ATM Cash Withdrawals</li>
                  <li>• Mobile Money Transfers</li>
                  <li>• Emergency Insurance Claims</li>
                  <li>• Fraud Reporting Hotlines</li>
                </ul>
              </div>
              <Button size="sm" variant="outline" className="w-full border-red-200 text-red-600">
                View Emergency Contacts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No agents found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or expanding your search area.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { AgentMaps }
