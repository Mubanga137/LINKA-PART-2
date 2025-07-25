"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  Palette,
  Hammer,
  Lightbulb,
  Sofa,
  TreePine,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Shield,
  Award,
  Users,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "interior-design",
    icon: Palette,
    title: "Interior Design",
    description: "Professional interior design services for homes and offices",
    providers: 45,
    avgRating: 4.8,
    startingPrice: 500,
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-50",
    features: ["Space Planning", "Color Consultation", "Furniture Selection", "3D Visualization"],
  },
  {
    id: "home-renovation",
    icon: Hammer,
    title: "Home Renovation",
    description: "Complete home renovation and remodeling services",
    providers: 67,
    avgRating: 4.7,
    startingPrice: 2500,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    features: ["Kitchen Remodeling", "Bathroom Renovation", "Room Extensions", "Flooring"],
  },
  {
    id: "lighting-solutions",
    icon: Lightbulb,
    title: "Lighting Solutions",
    description: "Modern lighting design and installation services",
    providers: 32,
    avgRating: 4.9,
    startingPrice: 300,
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-50 to-orange-50",
    features: ["LED Installation", "Smart Lighting", "Outdoor Lighting", "Emergency Lighting"],
  },
  {
    id: "furniture-custom",
    icon: Sofa,
    title: "Custom Furniture",
    description: "Handcrafted furniture made to your specifications",
    providers: 28,
    avgRating: 4.8,
    startingPrice: 800,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    features: ["Custom Design", "Quality Materials", "Local Craftsmanship", "Delivery Included"],
  },
  {
    id: "landscaping",
    icon: TreePine,
    title: "Landscaping",
    description: "Garden design and landscaping services",
    providers: 23,
    avgRating: 4.6,
    startingPrice: 600,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    features: ["Garden Design", "Plant Selection", "Irrigation Systems", "Maintenance"],
  },
  {
    id: "short-term-rentals",
    icon: Home,
    title: "Short-Term Rentals",
    description: "Fully furnished apartments and houses for short stays",
    providers: 156,
    avgRating: 4.8,
    startingPrice: 180,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50",
    features: ["Instant Booking", "Verified Hosts", "Mobile Payments", "24/7 Support"],
    isNew: true,
  },
]

const featuredProviders = [
  {
    name: "Mwamba Design Studio",
    service: "Interior Design",
    rating: 4.9,
    reviews: 127,
    location: "Kabulonga, Lusaka",
    specialties: ["Modern Design", "Traditional Fusion", "Office Spaces"],
    completedProjects: 89,
  },
  {
    name: "Lusaka Home Builders",
    service: "Home Renovation",
    rating: 4.8,
    reviews: 203,
    location: "Chilenje, Lusaka",
    specialties: ["Kitchen Remodeling", "Bathroom Renovation", "Extensions"],
    completedProjects: 156,
  },
  {
    name: "Bright Lights Zambia",
    service: "Lighting Solutions",
    rating: 4.9,
    reviews: 94,
    location: "Cairo Road, Lusaka",
    specialties: ["Smart Lighting", "LED Systems", "Outdoor Lighting"],
    completedProjects: 234,
  },
]

export function HomeDecorServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Home & Decor
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform your space with professional services from verified local providers
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setSelectedService(service.id)}
              onMouseLeave={() => setSelectedService(null)}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="relative">
                  {/* New Badge */}
                  {service.isNew && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      NEW
                    </div>
                  )}

                  {/* Service Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Service Info */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">{service.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-emerald-600">{service.providers}</div>
                      <div className="text-xs sm:text-sm text-slate-500">Providers</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-lg sm:text-xl font-bold text-slate-900">{service.avgRating}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500">Avg Rating</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs sm:text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-slate-900">
                        From ZMW {service.startingPrice.toLocaleString()}
                      </span>
                    </div>
                    {service.id === "short-term-rentals" ? (
                      <Link href="/services/short-term-rentals">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                        >
                          Explore
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                      >
                        Get Quote
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {selectedService === service.id && (
                    <div className="mt-6 pt-6 border-t border-slate-200 animate-fade-in">
                      <div className="text-sm text-slate-600">
                        <div className="flex items-center mb-2">
                          <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                          Typical project: 1-2 weeks
                        </div>
                        <div className="flex items-center mb-2">
                          <Shield className="h-4 w-4 mr-2 text-emerald-500" />
                          All providers verified
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-2 text-emerald-500" />
                          Quality guarantee included
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Providers */}
        <div>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Featured
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Service Providers
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Top-rated professionals ready to transform your space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredProviders.map((provider, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-white/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mr-4">
                      <span className="text-white font-bold">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base sm:text-lg">{provider.name}</div>
                      <div className="text-emerald-600 text-sm font-medium">{provider.service}</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-bold text-slate-900">{provider.rating}</span>
                    <span className="ml-1 text-sm text-slate-500">({provider.reviews} reviews)</span>
                    <div className="ml-auto flex items-center text-sm text-slate-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {provider.location}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-slate-700 mb-2">Specialties:</div>
                    <div className="flex flex-wrap gap-1">
                      {provider.specialties.map((specialty, idx) => (
                        <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="h-4 w-4 mr-1" />
                      {provider.completedProjects} projects completed
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 sm:p-12 border border-emerald-200/50">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Ready to Transform Your Space?</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Get connected with verified professionals in your area and bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 text-base shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3 text-base bg-transparent"
              >
                Browse All Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
