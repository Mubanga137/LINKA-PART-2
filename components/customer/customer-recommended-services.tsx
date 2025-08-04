"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  MapPin, 
  Clock, 
  ArrowRight,
  Zap
} from "lucide-react"
import Link from "next/link"

// Mock recommended services data
const mockRecommendedServices = [
  {
    id: "service-1",
    name: "Professional Hair Styling",
    image: "/placeholder.svg?height=120&width=300&text=Hair+Styling",
    price: 85,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 143,
    retailerName: "Beauty Plus Salon",
    retailerLocation: "Lusaka Central",
    estimatedDays: "Same day",
    features: ["Expert stylists", "Premium products", "Modern equipment"]
  },
  {
    id: "service-2",
    name: "Home Cleaning Service",
    image: "/placeholder.svg?height=120&width=300&text=Home+Cleaning",
    price: 120,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 267,
    retailerName: "Clean Pro Services",
    retailerLocation: "Chelstone",
    estimatedDays: "Next day",
    features: ["Eco-friendly", "Insured staff", "Flexible timing"]
  },
  {
    id: "service-3",
    name: "Mobile Phone Repair",
    image: "/placeholder.svg?height=120&width=300&text=Phone+Repair",
    price: 95,
    originalPrice: 130,
    rating: 4.7,
    reviewCount: 89,
    retailerName: "TechFix Solutions",
    retailerLocation: "Town Centre",
    estimatedDays: "2-3 hours",
    features: ["Quick repair", "Warranty", "Genuine parts"]
  },
  {
    id: "service-4",
    name: "Catering for Events",
    image: "/placeholder.svg?height=120&width=300&text=Event+Catering",
    price: 45,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 156,
    retailerName: "Taste of Zambia Catering",
    retailerLocation: "Kabulonga",
    estimatedDays: "2-3 days",
    features: ["Local cuisine", "Party planning", "Affordable rates"]
  },
  {
    id: "service-5",
    name: "Car Wash & Detailing",
    image: "/placeholder.svg?height=120&width=300&text=Car+Wash",
    price: 65,
    originalPrice: 85,
    rating: 4.6,
    reviewCount: 198,
    retailerName: "Sparkle Auto Care",
    retailerLocation: "Woodlands",
    estimatedDays: "2-4 hours",
    features: ["Interior cleaning", "Wax finish", "Mobile service"]
  },
  {
    id: "service-6",
    name: "Computer Repair & Setup",
    image: "/placeholder.svg?height=120&width=300&text=Computer+Repair",
    price: 150,
    originalPrice: 200,
    rating: 4.8,
    reviewCount: 75,
    retailerName: "Digital Solutions Hub",
    retailerLocation: "Independence Ave",
    estimatedDays: "1-2 days",
    features: ["Data recovery", "Virus removal", "Hardware upgrade"]
  }
]

export function CustomerRecommendedServices() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            <Zap className="inline h-8 w-8 mr-2 text-yellow-500" />
            Recommended for You
          </h2>
          <p className="text-xl text-slate-600">
            Based on your interests and activity
          </p>
        </div>
        
        <Link href="/services?recommended=true">
          <div className="hidden md:flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Recommendations
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRecommendedServices.map((service) => (
          <Card key={service.id} className="group bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-0">
              {/* Service Image */}
              <div className="relative">
                <Link href={`/services/${service.id}`}>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Recommended Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-yellow-500 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                </div>

                {/* Service Time */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-slate-700">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.estimatedDays}
                  </Badge>
                </div>
              </div>

              {/* Service Info */}
              <div className="p-4">
                <Link href={`/services/${service.id}`}>
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {service.name}
                  </h3>
                </Link>

                {/* Provider */}
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{service.retailerName}, {service.retailerLocation}</span>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-slate-900">{service.rating}</span>
                    <span className="text-sm text-slate-600">({service.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-emerald-600">
                      ZMW {service.price.toLocaleString()}
                    </div>
                    {service.originalPrice && (
                      <div className="text-sm text-slate-500 line-through">
                        ZMW {service.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <Link href={`/services/${service.id}`}>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Features */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {service.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {service.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden mt-8 text-center">
        <Link href="/services?recommended=true">
          <div className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Recommendations
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  )
}
