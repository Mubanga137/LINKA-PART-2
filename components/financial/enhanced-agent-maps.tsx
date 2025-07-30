"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Layers,
  ZoomIn,
  ZoomOut,
  Locate
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
  status: 'open' | 'closed' | 'busy'
  cashAvailable: boolean
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Stanbic Bank - Garden City",
    type: "Bank Branch",
    services: ["Savings Accounts", "Loans", "Foreign Exchange", "Investment Services"],
    location: {
      address: "Garden City Mall, Yusuf Lule Road",
      district: "Kampala",
      coordinates: { lat: 0.3476, lng: 32.6057 }
    },
    contact: {
      phone: "+256 414 230 581",
      email: "gardencity@stanbic.co.ug"
    },
    hours: "Mon-Fri: 8:30-16:30, Sat: 8:30-13:00",
    rating: 4.6,
    reviews: 128,
    verified: true,
    distance: 0.8,
    status: 'open',
    cashAvailable: true
  },
  {
    id: "2",
    name: "MTN Mobile Money - Nakawa",
    type: "Mobile Money Agent",
    services: ["Send Money", "Cash In/Out", "Bill Payments", "Airtime"],
    location: {
      address: "Nakawa Market, Shop 23",
      district: "Kampala",
      coordinates: { lat: 0.3367, lng: 32.6225 }
    },
    contact: {
      phone: "+256 700 123 456"
    },
    hours: "Daily: 6:00-20:00",
    rating: 4.3,
    reviews: 67,
    verified: true,
    distance: 1.2,
    status: 'open',
    cashAvailable: true
  },
  {
    id: "3",
    name: "DFCU Bank - Ntinda",
    type: "Bank Branch",
    services: ["Personal Banking", "Business Banking", "Investment Services", "Insurance"],
    location: {
      address: "Ntinda Shopping Complex",
      district: "Kampala",
      coordinates: { lat: 0.3676, lng: 32.6156 }
    },
    contact: {
      phone: "+256 414 307 100",
      email: "ntinda@dfcu.co.ug"
    },
    hours: "Mon-Fri: 8:00-17:00, Sat: 8:00-13:00",
    rating: 4.7,
    reviews: 245,
    verified: true,
    distance: 2.1,
    status: 'open',
    cashAvailable: true
  },
  {
    id: "4",
    name: "Airtel Money Agent - Wandegeya",
    type: "Mobile Money Agent",
    services: ["Money Transfer", "Bill Payments", "Merchant Payments"],
    location: {
      address: "Wandegeya Market, Stall 45",
      district: "Kampala",
      coordinates: { lat: 0.3376, lng: 32.5694 }
    },
    contact: {
      phone: "+256 750 987 654"
    },
    hours: "Daily: 7:00-19:00",
    rating: 4.5,
    reviews: 34,
    verified: true,
    distance: 3.4,
    status: 'busy',
    cashAvailable: false
  }
]

export function EnhancedAgentMaps() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [mapView, setMapView] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null)

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
    "all", "Kampala", "Wakiso", "Mukono", "Entebbe", "Jinja", "Mbarara"
  ]

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log("Location access denied")
        }
      )
    }
  }, [])

  const filteredAgents = mockAgents
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "closed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Enhanced Agent Locator</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Find financial service providers near you with real-time availability and interactive maps
        </p>
      </div>

      {/* Enhanced Search and Filters */}
      <Card className="bg-gradient-to-r from-slate-50 to-gray-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar with Location */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, location, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-24"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <Locate className="h-4 w-4 mr-1" />
                Near Me
              </Button>
            </div>

            {/* Advanced Filters */}
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
                  <Layers className="h-4 w-4 mr-1" />
                  Map
                </Button>
                <Button 
                  variant={!mapView ? "default" : "outline"}
                  onClick={() => setMapView(false)}
                  className="flex-1"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Map */}
        <div className="lg:col-span-2">
          {mapView ? (
            <Card className="h-[600px] relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Interactive Map
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Locate className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="h-[500px] bg-gradient-to-br from-blue-100 via-green-100 to-blue-100 relative overflow-hidden">
                  {/* Map Background */}
                  <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23000\" fill-opacity=\"0.02\"%3E%3Cpath d=\"M20 20c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm0 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16z\"/%3E%3C/g%3E%3C/svg%3E')] opacity-30"}></div>
                  
                  {/* Mock Map UI */}
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-700 mb-2">Interactive Map View</h3>
                      <p className="text-slate-600 max-w-md">
                        Live map showing {filteredAgents.length} financial service providers with real-time status
                      </p>
                    </div>
                  </div>

                  {/* Agent Markers Simulation */}
                  <div className="absolute top-20 left-20">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse cursor-pointer" onClick={() => setSelectedAgent(filteredAgents[0])}>
                      1
                    </div>
                  </div>
                  <div className="absolute top-32 right-32">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse cursor-pointer" onClick={() => setSelectedAgent(filteredAgents[1])}>
                      2
                    </div>
                  </div>
                  <div className="absolute bottom-32 left-40">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse cursor-pointer" onClick={() => setSelectedAgent(filteredAgents[2])}>
                      3
                    </div>
                  </div>

                  {/* User Location */}
                  {userLocation && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAgents.map((agent) => {
                const IconComponent = getServiceIcon(agent.type)
                return (
                  <Card key={agent.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedAgent(agent)}>
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
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                                <div className={`w-3 h-3 ${getStatusColor(agent.status)} rounded-full`}></div>
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
                            <div className="flex flex-wrap gap-2 mb-3">
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

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 ${agent.cashAvailable ? 'bg-green-400' : 'bg-red-400'} rounded-full`}></div>
                                  <span className="text-sm text-slate-600">
                                    {agent.cashAvailable ? 'Cash Available' : 'Low Cash'}
                                  </span>
                                </div>
                                <Badge className={`text-xs ${
                                  agent.status === 'open' ? 'bg-green-100 text-green-700' :
                                  agent.status === 'busy' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {agent.status.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                                  <Navigation className="h-4 w-4 mr-2" />
                                  Directions
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call
                                </Button>
                              </div>
                            </div>
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

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Selected Agent Details */}
          {selectedAgent && (
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Agent Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900">{selectedAgent.name}</h3>
                  <p className="text-sm text-slate-600">{selectedAgent.type}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Address:</strong> {selectedAgent.location.address}</p>
                  <p className="text-sm"><strong>Phone:</strong> {selectedAgent.contact.phone}</p>
                  <p className="text-sm"><strong>Hours:</strong> {selectedAgent.hours}</p>
                  <p className="text-sm"><strong>Distance:</strong> {selectedAgent.distance}km away</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Call Now</Button>
                  <Button size="sm" variant="outline" className="flex-1">Get Directions</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Area Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{filteredAgents.length}</div>
                <div className="text-sm text-slate-600">Agents Found</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bank Branches</span>
                  <span className="font-medium">
                    {filteredAgents.filter(a => a.type === "Bank Branch").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mobile Money</span>
                  <span className="font-medium">
                    {filteredAgents.filter(a => a.type === "Mobile Money Agent").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Currently Open</span>
                  <span className="font-medium text-green-600">
                    {filteredAgents.filter(a => a.status === "open").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Services */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium mb-2">24/7 Available:</p>
                <ul className="space-y-1 text-xs">
                  <li>• ATM Cash Withdrawals</li>
                  <li>• Mobile Money Transfers</li>
                  <li>• Emergency Support Hotlines</li>
                  <li>• Fraud Reporting: 0800-123-456</li>
                </ul>
              </div>
              <Button size="sm" variant="outline" className="w-full border-red-200 text-red-600">
                Emergency Contacts
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
