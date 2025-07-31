"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Smartphone, 
  MapPin, 
  Star, 
  Phone,
  Clock,
  Search,
  ArrowRight,
  CheckCircle,
  Navigation,
  Banknote,
  Send,
  CreditCard,
  Users
} from "lucide-react"

export default function MobileMoneyAgentsPage() {
  const [searchLocation, setSearchLocation] = useState("")

  const nearbyAgents = [
    {
      name: "Grace Mobile Money Services",
      type: "MTN Agent",
      rating: 4.8,
      reviews: 156,
      distance: "0.2 km",
      address: "Plot 45, Kampala Road, Kampala",
      phone: "+256 700 123 456",
      hours: "6:00 AM - 10:00 PM",
      services: ["MTN Mobile Money", "Airtime", "Data Bundles"],
      cashAvailable: true,
      verified: true
    },
    {
      name: "City Center Mobile Hub",
      type: "Multi-Network Agent",
      rating: 4.6,
      reviews: 203,
      distance: "0.4 km",
      address: "Shop 12, Garden City Mall, Kampala",
      phone: "+256 701 234 567",
      hours: "8:00 AM - 9:00 PM",
      services: ["MTN Mobile Money", "Airtel Money", "Airtime", "Bill Payments"],
      cashAvailable: true,
      verified: true
    },
    {
      name: "Quick Cash Point",
      type: "Airtel Agent",
      rating: 4.7,
      reviews: 89,
      distance: "0.6 km",
      address: "Plot 78, Buganda Road, Kampala",
      phone: "+256 702 345 678",
      hours: "7:00 AM - 8:00 PM",
      services: ["Airtel Money", "Airtime", "Utility Bills"],
      cashAvailable: false,
      verified: true
    },
    {
      name: "Downtown Money Services",
      type: "MTN Agent",
      rating: 4.5,
      reviews: 124,
      distance: "0.8 km",
      address: "Plot 23, Namirembe Road, Kampala",
      phone: "+256 703 456 789",
      hours: "6:30 AM - 9:30 PM",
      services: ["MTN Mobile Money", "Western Union", "Money Gram"],
      cashAvailable: true,
      verified: true
    }
  ]

  const quickActions = [
    { title: "Send Money", icon: Send, color: "from-blue-500 to-indigo-600" },
    { title: "Pay Bills", icon: CreditCard, color: "from-green-500 to-emerald-600" },
    { title: "Buy Airtime", icon: Smartphone, color: "from-purple-500 to-violet-600" },
    { title: "Withdraw Cash", icon: Banknote, color: "from-orange-500 to-red-600" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-8">
            <span>Finance</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-white font-medium">Mobile Money Agents</span>
          </div>

          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Mobile Money Agents
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Find nearby MTN and Airtel agents for all your mobile money transactions
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        {/* Search Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-3 text-white">
                    <Search className="h-6 w-6" />
                    <span className="text-lg font-medium">Enter location or area...</span>
                  </div>
                  <div className="flex-1 max-w-md">
                    <Input
                      placeholder="Search by location..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-white/60 h-12"
                    />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                    <Navigation className="h-5 w-5 mr-2" />
                    Find Agents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Available Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Available Services</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Service cards with different background colors matching reference */}
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 text-center border border-yellow-300">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Send Money</h3>
                <p className="text-sm text-slate-600">Transfer funds instantly</p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 text-center border border-green-300">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Pay Bills</h3>
                <p className="text-sm text-slate-600">Utilities and services</p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 text-center border border-blue-300">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Buy Airtime</h3>
                <p className="text-sm text-slate-600">Top up your phone</p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 text-center border border-purple-300">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Banknote className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Withdraw Cash</h3>
                <p className="text-sm text-slate-600">Get cash from agents</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Locations Map */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl mb-12">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6" />
                    <CardTitle className="text-white">Agent Locations Map</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-sm">Live Updates</span>
                  </div>
                </div>
                <p className="text-white/80">Interactive map with real-time agent availability</p>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 rounded-xl h-96 relative overflow-hidden">
                  {/* Mock Interactive Map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100">
                    {/* Map Grid */}
                    <div className="grid grid-cols-8 grid-rows-6 h-full opacity-20">
                      {[...Array(48)].map((_, i) => (
                        <div key={i} className="border border-slate-300"></div>
                      ))}
                    </div>

                    {/* Agent Markers */}
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-green-500 rounded-full shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium text-slate-700 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        MTN Agent - Cash Available
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium text-slate-700 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        Airtel Agent - Open Now
                      </div>
                    </div>
                    <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-orange-500 rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium text-slate-700 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        Multi-Network - Low Cash
                      </div>
                    </div>
                    <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-green-500 rounded-full shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium text-slate-700 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        Bank Agent - Full Service
                      </div>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 p-0">
                      <span className="text-white font-bold">+</span>
                    </Button>
                    <Button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 p-0">
                      <span className="text-white font-bold">-</span>
                    </Button>
                  </div>

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex flex-col gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Cash Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Open Now</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>Low Cash</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Features */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Navigation className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-white/80 text-sm">GPS Navigation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-white/80 text-sm">Real-time Status</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-white/80 text-sm">Direct Contact</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nearby Agents */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Nearby Agents</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {nearbyAgents.map((agent, index) => (
                <Card key={index} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                          {agent.verified && (
                            <Badge className="bg-green-500 text-white text-xs">Verified</Badge>
                          )}
                        </div>
                        <p className="text-white/80 text-sm mb-3">{agent.type}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold text-white">{agent.rating}</span>
                            <span className="text-white/60 text-sm">({agent.reviews})</span>
                          </div>
                          <span className="text-blue-400 font-semibold text-sm">{agent.distance} away</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-white/60 mt-1" />
                        <span className="text-white/80 text-sm">{agent.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-white/60" />
                        <span className="text-white/80 text-sm">{agent.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-white/60" />
                        <span className="text-white/80 text-sm">{agent.hours}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-white/80 text-sm mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.services.map((service, serviceIndex) => (
                          <Badge key={serviceIndex} className="bg-white/20 text-white text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${agent.cashAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-white/80 text-sm">
                          {agent.cashAvailable ? 'Cash Available' : 'Low Cash'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Quick Actions</h2>
              <p className="text-white/90">Common mobile money transactions</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white">{action.title}</h3>
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
