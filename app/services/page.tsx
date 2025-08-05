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
  Truck,
  Scissors,
  Music,
  Camera,
  Home,
  DollarSign,
  Star,
  ChevronRight,
  Users,
  Sparkles
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
    features: ["Custom Designs", "Quick Alterations", "Traditional Wear", "Modern Fashion"],
    stats: { tailors: "65+", orders: "150+/month" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-8">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Professional Services
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Connect with skilled service providers across Zambia for all your personal and business needs.
              </p>
            </div>
          </div>
        </section>

        {/* Service Categories Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Categories</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Discover professional services across various categories
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformServices.map((service) => (
                <Link href={service.href} key={service.id}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                      {/* Image Header */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <service.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/95 text-slate-700 px-3 py-1 rounded-xl shadow-lg">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {service.rating}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-slate-900 mb-3">
                          {service.name}
                        </h3>

                        <p className="text-slate-600 mb-6">{service.description}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-gray-50 rounded-xl">
                            <div className="text-lg font-bold text-slate-900">
                              {Object.values(service.stats)[0]}
                            </div>
                            <div className="text-xs text-slate-500">
                              {Object.keys(service.stats)[0]}
                            </div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-xl">
                            <div className="text-lg font-bold text-slate-900">
                              {Object.values(service.stats)[1]}
                            </div>
                            <div className="text-xs text-slate-500">
                              {Object.keys(service.stats)[1]}
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <p className="text-xs text-slate-500 mb-2">Popular Services:</p>
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
                          <div className="text-sm text-slate-500 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {service.providers} providers
                          </div>
                          <div className="flex items-center text-blue-600">
                            <span className="text-sm font-medium">View Services</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/health-wellness">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
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
