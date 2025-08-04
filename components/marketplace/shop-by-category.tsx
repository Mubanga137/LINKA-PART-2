"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Truck,
  Scissors,
  Music,
  Camera,
  Home,
  DollarSign,
  Star,
  Grid3X3,
  ArrowRight,
  Users
} from "lucide-react";
import Link from "next/link";

// Service categories data
const serviceCategories = [
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
    tagline: "Your health, our priority"
  },
  {
    id: 2,
    name: "Transportation",
    icon: Truck,
    description: "Fast and reliable delivery services for packages, documents, and goods",
    providers: 85,
    rating: 4.7,
    href: "/services/courier-delivery",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["Same-day Delivery", "Package Tracking", "Nationwide Coverage", "Express Service"],
    stats: { drivers: "85+", deliveries: "200+/day" },
    tagline: "Swift delivery solutions"
  },
  {
    id: 3,
    name: "Fashion & Style",
    icon: Scissors,
    description: "Custom clothing, alterations, fashion design, and tailoring services",
    providers: 65,
    rating: 4.8,
    href: "/services/fashion-tailoring",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    features: ["Custom Designs", "Quick Alterations", "Traditional Wear", "Modern Fashion"],
    stats: { tailors: "65+", orders: "150+/month" },
    tagline: "Tailored to perfection"
  },
  {
    id: 4,
    name: "Entertainment",
    icon: Music,
    description: "Event planning, live entertainment, DJ services, and party equipment",
    providers: 55,
    rating: 4.7,
    href: "/services/entertainment-events",
    gradient: "from-pink-500 to-purple-600",
    bgGradient: "from-pink-50 to-purple-50",
    features: ["Event Planning", "Live Music", "DJ Services", "Equipment Rental"],
    stats: { entertainers: "55+", events: "100+/month" },
    tagline: "Make moments memorable"
  },
  {
    id: 5,
    name: "Photography",
    icon: Camera,
    description: "Professional photography, videography, and content creation services",
    providers: 40,
    rating: 4.8,
    href: "/services/photography-video",
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
    features: ["Event Photography", "Product Shoots", "Video Production", "Editing Services"],
    stats: { photographers: "40+", shoots: "75+/month" },
    tagline: "Capture perfect moments"
  },
  {
    id: 6,
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
    tagline: "Your home, our expertise"
  }
];

interface ShopByCategoryProps {
  showAll?: boolean;
  maxItems?: number;
}

export function ShopByCategorySection({ showAll = false, maxItems = 6 }: ShopByCategoryProps) {
  // Show limited items by default, all when showAll is true
  const displayCategories = showAll ? serviceCategories : serviceCategories.slice(0, maxItems);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25">
            <Grid3X3 className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shop by Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of professional services from verified local providers. 
            From healthcare to entertainment, find exactly what you need with just a click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayCategories.map((category, index) => (
            <div key={category.id} className="group cursor-pointer">
              <Link href={category.href}>
                <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg rounded-3xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-slate-50 group-hover:border-white/50">
                  <CardContent className="p-6 relative">
                    {/* Icon Badge */}
                    <div className="mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300`}>
                        <category.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-2 rounded-xl shadow-lg border-0">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {category.rating}
                      </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4 font-medium">
                      {category.tagline}
                    </p>

                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                        <div className="text-sm font-bold text-slate-900">
                          {Object.values(category.stats)[0]}
                        </div>
                        <div className="text-xs text-slate-500">
                          {Object.keys(category.stats)[0]}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                        <div className="text-sm font-bold text-slate-900">
                          {Object.values(category.stats)[1]}
                        </div>
                        <div className="text-xs text-slate-500">
                          {Object.keys(category.stats)[1]}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {category.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            {feature}
                          </Badge>
                        ))}
                        {category.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                            +{category.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{category.providers} providers</span>
                      </div>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="text-sm font-medium mr-1">Explore</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* Explore All Categories Button */}
        {!showAll && (
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border-0"
              asChild
            >
              <Link href="/services">
                <Grid3X3 className="mr-3 h-5 w-5" />
                Explore All Categories
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            
            <p className="text-gray-500 mt-4 text-sm">
              Discover all {serviceCategories.length} service categories and 550+ trusted providers
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
