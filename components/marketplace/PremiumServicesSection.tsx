"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Crown,
  Star,
  Clock,
  Shield,
  Award,
  Sparkles,
  Users,
  MapPin,
  Phone,
  Calendar,
  ChevronRight,
  ExternalLink,
  Heart,
  Share2,
  Verified,
  Diamond,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PremiumService {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    premiumProvider: boolean;
  };
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  luxuryRating: number;
  duration: string;
  location: string;
  availability: string;
  images: string[];
  features: string[];
  tags: string[];
  isExclusive?: boolean;
  isNew?: boolean;
  bookingsThisMonth: number;
}

const premiumServices: PremiumService[] = [
  {
    id: "s1",
    name: "Royal Spa & Wellness Retreat",
    description: "Luxurious full-body wellness experience with traditional Zambian healing techniques and premium organic products",
    category: "Health & Wellness",
    provider: {
      id: "p1",
      name: "Royal Wellness Center",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80",
      verified: true,
      premiumProvider: true
    },
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviewCount: 127,
    luxuryRating: 5,
    duration: "3 hours",
    location: "Lusaka Premium District",
    availability: "Available Today",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
    ],
    features: ["Organic Products", "Traditional Techniques", "Private Suite", "Refreshments"],
    tags: ["Luxury", "Wellness", "Traditional", "Organic"],
    isExclusive: true,
    bookingsThisMonth: 89
  },
  {
    id: "s2",
    name: "Executive Photography Session",
    description: "Professional portrait and lifestyle photography with premium styling, makeup, and luxury locations",
    category: "Photography",
    provider: {
      id: "p2",
      name: "Elite Portrait Studios",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      verified: true,
      premiumProvider: true
    },
    price: 849.99,
    originalPrice: 1199.99,
    rating: 5.0,
    reviewCount: 203,
    luxuryRating: 5,
    duration: "4 hours",
    location: "Multiple Premium Locations",
    availability: "Next Week",
    images: [
      "https://images.unsplash.com/photo-1554774853-719586f82d77?w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
    ],
    features: ["Professional Styling", "Makeup Artist", "Multiple Outfits", "Digital Gallery"],
    tags: ["Executive", "Professional", "Portrait", "Styling"],
    isNew: true,
    bookingsThisMonth: 45
  },
  {
    id: "s3",
    name: "Private Chef Experience",
    description: "World-class culinary experience with internationally trained chef preparing gourmet Zambian fusion cuisine",
    category: "Culinary Arts",
    provider: {
      id: "p3",
      name: "Gourmet Chef Collective",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&q=80",
      verified: true,
      premiumProvider: true
    },
    price: 459.99,
    originalPrice: 599.99,
    rating: 4.8,
    reviewCount: 156,
    luxuryRating: 4,
    duration: "5 hours",
    location: "Your Location",
    availability: "Book in Advance",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
    ],
    features: ["Personal Chef", "Premium Ingredients", "Multi-Course Menu", "Wine Pairing"],
    tags: ["Gourmet", "Private", "Fusion", "Wine"],
    bookingsThisMonth: 67
  }
];

export function PremiumServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-purple-50/30 to-pink-50/40"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl rounded-full px-6 py-3 border border-purple-200/50 shadow-lg mb-6">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-purple-900 font-semibold">Premium Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-800 bg-clip-text text-transparent mb-4">
            Luxury Service Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Indulge in world-class services delivered by certified premium providers with exceptional attention to detail
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {premiumServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Floating Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-indigo-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
              
              {/* Glassmorphism Card */}
              <Card className="overflow-hidden bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full">
                {/* Premium Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                  <Badge className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-3 py-1.5 shadow-lg border border-white/30 text-sm font-bold rounded-xl">
                    <Crown className="h-3 w-3 mr-1.5" />
                    Premium
                  </Badge>
                  {service.isExclusive && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg">
                      <Diamond className="h-2.5 w-2.5 mr-1" />
                      Exclusive
                    </Badge>
                  )}
                  {service.isNew && (
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg animate-pulse">
                      NEW
                    </Badge>
                  )}
                </div>

                {/* Luxury Rating */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-purple-100/50">
                    <Diamond className="h-3.5 w-3.5 text-purple-600" />
                    <span className="text-xs font-bold text-purple-900">{service.luxuryRating}/5</span>
                  </div>
                </div>

                {/* Service Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-50 to-indigo-50 overflow-hidden">
                  <Image
                    src={service.images[0]}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white text-gray-900 font-medium"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white text-gray-900 font-medium"
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Badge className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 text-xs border border-white/50">
                      {service.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Provider Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={service.provider.avatar}
                        alt={service.provider.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover ring-2 ring-purple-100"
                      />
                      {service.provider.verified && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                          <Verified className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{service.provider.name}</p>
                      {service.provider.premiumProvider && (
                        <Badge className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 border border-purple-200">
                          <Crown className="h-2 w-2 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Service Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight group-hover:text-purple-800 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Features */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 3).map((feature) => (
                      <Badge 
                        key={feature} 
                        variant="outline" 
                        className="text-xs border-purple-200 text-purple-700 bg-purple-50/50 rounded-full px-2.5 py-0.5"
                      >
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs border-gray-200 text-gray-500 bg-gray-50 rounded-full px-2.5 py-0.5"
                      >
                        +{service.features.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span className="truncate">{service.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="truncate">{service.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>{service.bookingsThisMonth} bookings</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-purple-600">
                      K{service.price.toFixed(2)}
                    </span>
                    {service.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-400 line-through">
                          K{service.originalPrice.toFixed(2)}
                        </span>
                        <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs">
                          Save K{(service.originalPrice - service.price).toFixed(2)}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(service.rating) 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">{service.rating}</span>
                      <span className="text-sm text-gray-500">({service.reviewCount})</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 py-3 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 hover:text-purple-800 rounded-xl transition-all duration-300"
                      asChild
                    >
                      <Link href={`/services/${service.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/services">
              <Sparkles className="h-5 w-5 mr-2" />
              Explore All Premium Services
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
