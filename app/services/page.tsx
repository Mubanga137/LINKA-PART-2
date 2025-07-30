"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Heart, 
  Stethoscope,
  CreditCard,
  Shield,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Building,
  Smartphone,
  MapPin,
  Clock,
  Award,
  ChevronRight
} from "lucide-react"

const services = [
  {
    id: 1,
    name: "Financial Services",
    icon: DollarSign,
    description: "Banking, investments, insurance, and financial advisory services",
    providers: 95,
    rating: 4.8,
    href: "/services/financial-services",
    gradient: "from-emerald-500 to-blue-600",
    bgGradient: "from-emerald-50 to-blue-50",
    features: ["Banking", "Investments", "Insurance", "Financial Planning"],
    stats: { providers: "95+", volume: "ZMW 2.5M+" }
  },
  {
    id: 2,
    name: "Health & Wellness",
    icon: Heart,
    description: "Healthcare services, medical consultations, and wellness programs",
    providers: 120,
    rating: 4.9,
    href: "/services/health-wellness",
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
    features: ["24/7 Emergency", "Telemedicine", "Wellness Programs", "Home Visits"],
    stats: { providers: "120+", appointments: "500+/month" }
  },
  {
    id: 3,
    name: "General Health Services",
    icon: Stethoscope,
    description: "General medical consultations and healthcare support",
    providers: 85,
    rating: 4.7,
    href: "/services/general-health",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["General Consultations", "Health Checkups", "Medical Advice", "Prescription Services"],
    stats: { doctors: "85+", consultations: "300+/month" }
  },
  {
    id: 4,
    name: "Fitness & Yoga",
    icon: Heart,
    description: "Fitness training, yoga classes, and wellness coaching",
    providers: 45,
    rating: 4.6,
    href: "/services/fitness-yoga",
    gradient: "from-green-500 to-teal-600",
    bgGradient: "from-green-50 to-teal-50",
    features: ["Personal Training", "Yoga Classes", "Group Sessions", "Wellness Coaching"],
    stats: { trainers: "45+", sessions: "200+/month" }
  },
  {
    id: 5,
    name: "Pharmacies",
    icon: Building,
    description: "Prescription medications and pharmaceutical services",
    providers: 60,
    rating: 4.5,
    href: "/services/pharmacies",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50",
    features: ["Prescription Delivery", "Medication Consultation", "Health Products", "Emergency Supply"],
    stats: { pharmacies: "60+", deliveries: "150+/day" }
  },
  {
    id: 6,
    name: "Short-term Rentals",
    icon: MapPin,
    description: "Accommodation and short-term rental services",
    providers: 35,
    rating: 4.4,
    href: "/services/short-term-rentals",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    features: ["Daily Rentals", "Weekly Stays", "Furnished Properties", "24/7 Support"],
    stats: { properties: "35+", bookings: "80+/month" }
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Professional Services
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Connect with trusted service providers across finance, healthcare, and lifestyle services in Zambia
              </p>
            </div>
          </div>
        </section>

        {/* Featured Service - Financial Services */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <Badge className="bg-emerald-100 text-emerald-700 mb-4">Featured Service</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Financial Services</h2>
              <p className="text-slate-600">Secure your financial future with comprehensive banking and investment services</p>
            </div>
            
            <Link href="/services/financial-services">
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center">
                          <DollarSign className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">Complete Financial Solutions</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-bold">4.8</span>
                            <span className="ml-2 text-sm text-slate-500">(1,250+ reviews)</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        Access a complete range of financial services including banking, investments, insurance, 
                        and professional financial advisory. All providers are licensed and regulated by Zambian authorities.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-white/80 rounded-lg">
                          <div className="font-bold text-emerald-600">95+</div>
                          <div className="text-xs text-slate-500">Licensed Providers</div>
                        </div>
                        <div className="text-center p-3 bg-white/80 rounded-lg">
                          <div className="font-bold text-blue-600">ZMW 2.5M+</div>
                          <div className="text-xs text-slate-500">Monthly Volume</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-emerald-600 group-hover:text-emerald-700">
                        <span className="font-medium">Explore Financial Services</span>
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="p-4 bg-white/80 rounded-xl border border-emerald-100">
                          <Building className="h-6 w-6 text-emerald-600 mb-2" />
                          <h4 className="font-medium text-slate-900 mb-1">Banking</h4>
                          <p className="text-sm text-slate-600">Savings, loans, mobile banking</p>
                        </div>
                        <div className="p-4 bg-white/80 rounded-xl border border-blue-100">
                          <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                          <h4 className="font-medium text-slate-900 mb-1">Investments</h4>
                          <p className="text-sm text-slate-600">Stocks, bonds, unit trusts</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/80 rounded-xl border border-purple-100">
                          <Shield className="h-6 w-6 text-purple-600 mb-2" />
                          <h4 className="font-medium text-slate-900 mb-1">Insurance</h4>
                          <p className="text-sm text-slate-600">Life, motor, health coverage</p>
                        </div>
                        <div className="p-4 bg-white/80 rounded-xl border border-indigo-100">
                          <Smartphone className="h-6 w-6 text-indigo-600 mb-2" />
                          <h4 className="font-medium text-slate-900 mb-1">Mobile Money</h4>
                          <p className="text-sm text-slate-600">Digital payments, transfers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* All Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">All Services</h2>
              <p className="text-slate-600">Browse our complete range of professional services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Link href={service.href} key={service.id}>
                  <Card 
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className={`p-6 bg-gradient-to-br ${service.bgGradient} rounded-xl mb-4 relative overflow-hidden`}>
                        <div className="relative z-10">
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-3`}>
                            <service.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{service.name}</h3>
                          <div className="flex items-center text-sm">
                            <span className="text-slate-600">{service.providers} providers</span>
                            <div className="flex items-center ml-3">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-bold">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>

                      {/* Features */}
                      <div className="mb-4">
                        <p className="text-xs text-slate-500 mb-2 font-medium">Key Features:</p>
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

                      {/* Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-blue-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">Available 24/7</span>
                        </div>
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                          <span className="text-sm font-medium">Explore</span>
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
        <section className="py-16 bg-gradient-to-r from-blue-100 to-emerald-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust our platform for their service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/financial-services">
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Start with Financial Services
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
