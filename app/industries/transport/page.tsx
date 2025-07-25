"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  MapPin,
  Clock,
  Star,
  Shield,
  Route,
  Package,
  Users,
  BarChart3,
  CheckCircle,
  Phone,
  Calendar,
  DollarSign,
  Award,
  Navigation,
  Fuel,
  ArrowRight,
} from "lucide-react"

const transportServices = [
  {
    name: "Local Delivery",
    description: "Same-day delivery within city limits",
    icon: Truck,
    basePrice: 25,
    features: ["Same-day delivery", "Real-time tracking", "SMS updates"],
    coverage: "All major cities",
  },
  {
    name: "Inter-City Transport",
    description: "Reliable transport between major Zambian cities",
    icon: Route,
    basePrice: 150,
    features: ["Next-day delivery", "Insurance included", "Scheduled pickups"],
    coverage: "10 provinces",
  },
  {
    name: "Bulk Cargo",
    description: "Large shipments and commercial cargo",
    icon: Package,
    basePrice: 500,
    features: ["Weight-based pricing", "Specialized handling", "Business accounts"],
    coverage: "Nationwide",
  },
  {
    name: "Express Service",
    description: "Urgent deliveries with priority handling",
    icon: Shield,
    basePrice: 75,
    features: ["4-hour delivery", "Priority handling", "Guaranteed delivery"],
    coverage: "Selected routes",
  },
]

const transportProviders = [
  {
    id: 1,
    name: "Swift Transport Zambia",
    location: "Lusaka",
    rating: 4.9,
    reviews: 1234,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Local Delivery", "Inter-City", "Express"],
    vehicles: "25+ vehicles",
    experience: "8 years",
    coverage: ["Lusaka", "Ndola", "Kitwe", "Livingstone"],
    speciality: "E-commerce deliveries",
    badge: "Top Rated",
    features: ["GPS Tracking", "Insurance", "24/7 Support"],
  },
  {
    id: 2,
    name: "Copper Belt Logistics",
    location: "Ndola",
    rating: 4.8,
    reviews: 987,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Bulk Cargo", "Inter-City", "Warehousing"],
    vehicles: "40+ trucks",
    experience: "12 years",
    coverage: ["Ndola", "Kitwe", "Chingola", "Luanshya"],
    speciality: "Industrial transport",
    badge: "Verified",
    features: ["Heavy Cargo", "Secure Storage", "Business Accounts"],
  },
  {
    id: 3,
    name: "Capital City Couriers",
    location: "Lusaka",
    rating: 4.7,
    reviews: 756,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Local Delivery", "Express", "Documents"],
    vehicles: "15+ bikes/vans",
    experience: "5 years",
    coverage: ["Lusaka Metropolitan"],
    speciality: "Same-day delivery",
    badge: "Fast Service",
    features: ["Motorbike Delivery", "Document Handling", "Cash Collection"],
  },
  {
    id: 4,
    name: "Southern Route Express",
    location: "Livingstone",
    rating: 4.6,
    reviews: 543,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Inter-City", "Tourism", "Cross-Border"],
    vehicles: "20+ vehicles",
    experience: "10 years",
    coverage: ["Livingstone", "Choma", "Mazabuka", "Monze"],
    speciality: "Tourism & hospitality",
    badge: "Tourist Friendly",
    features: ["Tourist Packages", "Border Crossing", "Hotel Partnerships"],
  },
]

const routes = [
  { from: "Lusaka", to: "Ndola", distance: "320km", duration: "4-5 hours", price: "ZMW 180" },
  { from: "Lusaka", to: "Livingstone", distance: "470km", duration: "6-7 hours", price: "ZMW 250" },
  { from: "Ndola", to: "Kitwe", distance: "65km", duration: "1-2 hours", price: "ZMW 80" },
  { from: "Lusaka", to: "Kabwe", distance: "150km", duration: "2-3 hours", price: "ZMW 120" },
  { from: "Kitwe", to: "Chingola", distance: "45km", duration: "1 hour", price: "ZMW 60" },
  { from: "Livingstone", to: "Choma", distance: "180km", duration: "2-3 hours", price: "ZMW 140" },
]

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState("services")
  const [selectedService, setSelectedService] = useState("all")
  const [userType, setUserType] = useState<"shipper" | "provider">("shipper")

  const filteredProviders = selectedService === "all" 
    ? transportProviders 
    : transportProviders.filter(provider => 
        provider.services.some(service => 
          service.toLowerCase().includes(selectedService.toLowerCase())
        )
      )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-6 py-3 text-green-700 border border-green-200/50 mb-8">
                <Truck className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Transport & Logistics</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Reliable Transport
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Across Zambia
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Connect with trusted transport providers for deliveries, cargo, and logistics services. 
                From local deliveries to inter-city transport, we've got you covered.
              </p>

              {/* User Type Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-2 shadow-lg">
                  <Button
                    variant={userType === "shipper" ? "default" : "ghost"}
                    onClick={() => setUserType("shipper")}
                    className="px-8 py-3 rounded-xl"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    I Need Transport
                  </Button>
                  <Button
                    variant={userType === "provider" ? "default" : "ghost"}
                    onClick={() => setUserType("provider")}
                    className="px-8 py-3 rounded-xl"
                  >
                    <Truck className="mr-2 h-5 w-5" />
                    I Provide Transport
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  {userType === "shipper" ? (
                    <>
                      <Navigation className="mr-3 h-5 w-5" />
                      Book Transport Now
                    </>
                  ) : (
                    <>
                      <Truck className="mr-3 h-5 w-5" />
                      Join as Provider
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <Route className="mr-3 h-5 w-5" />
                  Check Routes & Prices
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-12">
                <TabsTrigger value="services" className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="providers" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Providers
                </TabsTrigger>
                <TabsTrigger value="routes" className="flex items-center">
                  <Route className="h-4 w-4 mr-2" />
                  Routes & Pricing
                </TabsTrigger>
                <TabsTrigger value="tracking" className="flex items-center">
                  <Navigation className="h-4 w-4 mr-2" />
                  Track Shipment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="services">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {transportServices.map((service, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">{service.name}</h3>
                        <p className="text-slate-600 text-center mb-6">{service.description}</p>
                        
                        <div className="text-center mb-6">
                          <div className="text-2xl font-bold text-green-600">
                            From ZMW {service.basePrice}
                          </div>
                          <div className="text-sm text-slate-500">{service.coverage}</div>
                        </div>

                        <div className="space-y-2 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                          Book {service.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="providers">
                {/* Service Filter */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                  <Button
                    variant={selectedService === "all" ? "default" : "outline"}
                    onClick={() => setSelectedService("all")}
                  >
                    All Services
                  </Button>
                  {["Local Delivery", "Inter-City", "Express", "Bulk Cargo"].map((service) => (
                    <Button
                      key={service}
                      variant={selectedService === service.toLowerCase() ? "default" : "outline"}
                      onClick={() => setSelectedService(service.toLowerCase())}
                    >
                      {service}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredProviders.map((provider) => (
                    <Card
                      key={provider.id}
                      className="group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        {/* Provider Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          <Badge className={`absolute top-4 left-4 ${
                            provider.badge === "Top Rated" ? "bg-yellow-500 text-white" :
                            provider.badge === "Verified" ? "bg-blue-500 text-white" :
                            provider.badge === "Fast Service" ? "bg-green-500 text-white" :
                            "bg-purple-500 text-white"
                          }`}>
                            {provider.badge}
                          </Badge>
                        </div>

                        {/* Provider Info */}
                        <div className="p-6">
                          <h3 className="font-bold text-slate-900 text-xl mb-2">{provider.name}</h3>
                          
                          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                            <MapPin className="h-3 w-3" />
                            <span>{provider.location}</span>
                            <span>•</span>
                            <span>{provider.experience} experience</span>
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(provider.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-600">
                              {provider.rating} ({provider.reviews} reviews)
                            </span>
                          </div>

                          {/* Details */}
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <div className="text-slate-600">Fleet Size</div>
                              <div className="font-medium">{provider.vehicles}</div>
                            </div>
                            <div>
                              <div className="text-slate-600">Speciality</div>
                              <div className="font-medium">{provider.speciality}</div>
                            </div>
                          </div>

                          {/* Services */}
                          <div className="mb-4">
                            <div className="text-sm text-slate-600 mb-2">Services:</div>
                            <div className="flex flex-wrap gap-1">
                              {provider.services.map((service, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-green-100 text-green-700 text-xs"
                                >
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Coverage */}
                          <div className="mb-6">
                            <div className="text-sm text-slate-600 mb-2">Coverage:</div>
                            <div className="text-sm text-slate-700">
                              {provider.coverage.join(", ")}
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-6">
                            <div className="space-y-2">
                              {provider.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-sm text-slate-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                              <Phone className="h-4 w-4 mr-2" />
                              Contact
                            </Button>
                            <Button variant="outline" className="flex-1">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="routes">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {routes.map((route, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-slate-900">{route.from}</h3>
                          <ArrowRight className="h-5 w-5 text-slate-400" />
                          <h3 className="font-bold text-slate-900">{route.to}</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Route className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600">Distance</span>
                            </div>
                            <span className="font-medium">{route.distance}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600">Duration</span>
                            </div>
                            <span className="font-medium">{route.duration}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600">From</span>
                            </div>
                            <span className="font-bold text-green-600">{route.price}</span>
                          </div>
                        </div>

                        <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                          Book This Route
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tracking">
                <Card className="bg-white/90 backdrop-blur-sm border-white/30 max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                      Track Your Shipment
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tracking Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your tracking number"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                        <Navigation className="mr-2 h-4 w-4" />
                        Track Shipment
                      </Button>

                      <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-900 mb-4">Sample Tracking Status</h4>
                        <div className="space-y-4">
                          {[
                            { status: "Package Picked Up", time: "10:30 AM", location: "Lusaka" },
                            { status: "In Transit", time: "2:15 PM", location: "En route to Ndola" },
                            { status: "Out for Delivery", time: "8:00 AM", location: "Ndola" },
                            { status: "Delivered", time: "11:45 AM", location: "Ndola" },
                          ].map((update, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className={`w-3 h-3 rounded-full ${
                                index < 3 ? 'bg-green-500' : 'bg-slate-300'
                              }`} />
                              <div className="flex-1">
                                <div className="font-medium text-slate-900">{update.status}</div>
                                <div className="text-sm text-slate-600">{update.time} - {update.location}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
