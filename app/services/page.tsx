"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Stethoscope,
  MapPin,
  Truck,
  Scissors,
  Music,
  Camera,
  Gamepad2,
  Palette,
  Coffee,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
  Clock,
  Award,
  Sparkles,
  Home,
  DollarSign
} from "lucide-react"

const platformServices = [
  {
    id: 1,
    name: "Health & Wellness",
    icon: Heart,
    description: "Medical consultations, fitness training, yoga classes, and wellness programs",
    providers: 120,
    rating: 4.9,
    href: "/services/health-wellness",
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
    features: ["24/7 Emergency", "Telemedicine", "Wellness Programs", "Home Visits"],
    stats: { providers: "120+", appointments: "500+/month" },
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Courier & Delivery",
    icon: Truck,
    description: "Fast and reliable delivery services for packages, documents, and goods",
    providers: 85,
    rating: 4.7,
    href: "/services/courier-delivery",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["Same-day Delivery", "Package Tracking", "Nationwide Coverage", "Express Service"],
    stats: { drivers: "85+", deliveries: "200+/day" },
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Fashion & Tailoring",
    icon: Scissors,
    description: "Custom clothing, alterations, fashion design, and tailoring services",
    providers: 65,
    rating: 4.8,
    href: "/services/fashion-tailoring",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    features: ["Custom Designs", "Quick Alterations", "Traditional Wear", "Modern Fashion"],
    stats: { tailors: "65+", orders: "150+/month" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  },

  {
    id: 4,
    name: "Entertainment & Events",
    icon: Music,
    description: "Event planning, live entertainment, DJ services, and party equipment",
    providers: 55,
    rating: 4.7,
    href: "/services/entertainment-events",
    gradient: "from-pink-500 to-purple-600",
    bgGradient: "from-pink-50 to-purple-50",
    features: ["Event Planning", "Live Music", "DJ Services", "Equipment Rental"],
    stats: { entertainers: "55+", events: "100+/month" },
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Photography & Video",
    icon: Camera,
    description: "Professional photography, videography, and content creation services",
    providers: 40,
    rating: 4.8,
    href: "/services/photography-video",
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
    features: ["Event Photography", "Product Shoots", "Video Production", "Editing Services"],
    stats: { photographers: "40+", shoots: "75+/month" },
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "General Health Services",
    icon: Stethoscope,
    description: "General medical consultations, health checkups, and medical advice",
    providers: 75,
    rating: 4.7,
    href: "/services/general-health",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["General Consultations", "Health Checkups", "Medical Advice", "Prescription Services"],
    stats: { doctors: "75+", consultations: "300+/month" },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Fitness & Yoga",
    icon: Heart,
    description: "Personal training, yoga classes, group fitness, and wellness coaching",
    providers: 50,
    rating: 4.6,
    href: "/services/fitness-yoga",
    gradient: "from-green-500 to-teal-600",
    bgGradient: "from-green-50 to-teal-50",
    features: ["Personal Training", "Yoga Classes", "Group Sessions", "Wellness Coaching"],
    stats: { trainers: "50+", sessions: "200+/month" },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Home Services",
    icon: Home,
    description: "Cleaning, maintenance, repairs, and home improvement services",
    providers: 60,
    rating: 4.5,
    href: "/services/home-services",
    gradient: "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-50 to-blue-50",
    features: ["House Cleaning", "Maintenance", "Repairs", "Home Improvement"],
    stats: { professionals: "60+", jobs: "120+/month" },
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Financial Services",
    icon: DollarSign,
    description: "Banking, investments, insurance, and comprehensive financial solutions",
    providers: 95,
    rating: 4.6,
    href: "/financial-services",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    features: ["Banking Solutions", "Investment Planning", "Insurance Coverage", "+5 more"],
    stats: { providers: "95+", volume: "ZMW 2.5M+/month" },
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    isSpecial: true
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Services
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Connect with skilled service providers across Zambia for all your personal and business needs. 
                From health and wellness to entertainment, courier services to home maintenance – find trusted professionals ready to serve you.
              </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-blue-600">550+</div>
                <div className="text-sm text-slate-600">Service Providers</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-purple-600">9</div>
                <div className="text-sm text-slate-600">Service Categories</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-green-600">1,500+</div>
                <div className="text-sm text-slate-600">Monthly Bookings</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-orange-600">4.7</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* General Overview */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border border-blue-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">How Our Services Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Browse & Choose</h3>
                  <p className="text-slate-600 text-sm">Explore service categories and find the right professional for your needs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Book & Schedule</h3>
                  <p className="text-slate-600 text-sm">Schedule appointments at your convenience with verified providers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Get Quality Service</h3>
                  <p className="text-slate-600 text-sm">Receive professional service from rated and reviewed providers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Categories</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Discover professional services across various categories, all delivered by trusted and verified providers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformServices.map((service, index) => (
                <Link href={service.href} key={service.id}>
                  {service.isSpecial ? (
                    /* Special Financial Services Card Design */
                    <Card
                      className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 bg-white border border-gray-200 rounded-xl overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-0">
                        {/* Image Header with overlays */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Favorite button */}
                          <div className="absolute top-3 left-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                              <Heart className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          {/* Rating badge */}
                          <div className="absolute top-3 right-3">
                            <div className="bg-white/90 px-2 py-1 rounded-lg flex items-center shadow-sm">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium text-slate-700">{service.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="font-bold text-xl text-slate-900 mb-2">
                            {service.name}
                          </h3>

                          <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center">
                              <div className="text-lg font-bold text-slate-900">
                                {Object.values(service.stats)[0]}
                              </div>
                              <div className="text-sm text-slate-500">
                                {Object.keys(service.stats)[0]}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-slate-900">
                                {Object.values(service.stats)[1]}
                              </div>
                              <div className="text-sm text-slate-500">
                                {Object.keys(service.stats)[1]}
                              </div>
                            </div>
                          </div>

                          {/* Popular Services */}
                          <div className="mb-6">
                            <p className="text-sm text-slate-600 mb-3 font-medium">Popular Services:</p>
                            <div className="flex flex-wrap gap-2">
                              {service.features.map((feature, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Bottom section */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-sm text-slate-600">
                              {service.providers} providers
                            </div>
                            <div className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                              <span className="text-sm font-medium mr-1">View Services</span>
                              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    /* Regular Service Card Design */
                    <Card
                      className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-0">
                        {/* Image Header */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${service.bgGradient} opacity-80`}></div>
                          <div className="absolute top-4 left-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                              <service.icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 text-slate-700">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              {service.rating}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {service.name}
                          </h3>

                          <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                              <div className="text-sm font-bold text-slate-900">
                                {Object.values(service.stats)[0]}
                              </div>
                              <div className="text-xs text-slate-500">
                                {Object.keys(service.stats)[0]}
                              </div>
                            </div>
                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                              <div className="text-sm font-bold text-slate-900">
                                {Object.values(service.stats)[1]}
                              </div>
                              <div className="text-xs text-slate-500">
                                {Object.keys(service.stats)[1]}
                              </div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <p className="text-xs text-slate-500 mb-2 font-medium">Popular Services:</p>
                            <div className="flex flex-wrap gap-1">
                              {service.features.slice(0, 2).map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {service.features.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{service.features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Action */}
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                              {service.providers} providers
                            </div>
                            <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                              <span className="text-sm font-medium">View Services</span>
                              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Services CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-100 to-blue-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Looking for Financial Products?</h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Need banking, loans, insurance, or investment services? Visit our dedicated Financial Services section 
                for comprehensive financial solutions from licensed providers.
              </p>
              <Link href="/financial-services">
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Go to Financial Services
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust our platform for their service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/health-wellness">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8">
                  <Heart className="h-5 w-5 mr-2" />
                  Book Health Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
