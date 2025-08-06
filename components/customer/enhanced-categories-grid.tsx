"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  Stethoscope,
  Truck,
  Scissors,
  Music,
  Camera,
  Home,
  DollarSign,
  Search,
  ArrowRight,
  TrendingUp,
  Star,
  Users,
  Clock,
  Sparkles,
  Filter,
  ChevronRight,
  MapPin,
  Award,
  Target,
  Shield
} from "lucide-react";

interface ServiceCategory {
  id: number;
  name: string;
  icon: any;
  description: string;
  providers: number;
  rating: number;
  href: string;
  gradient: string;
  bgGradient: string;
  features: string[];
  stats: { [key: string]: string };
  image: string;
  isSpecial?: boolean;
  trending?: "Hot" | "New" | "Popular" | "Sale";
  verified?: boolean;
}

const platformServices: ServiceCategory[] = [
  {
    id: 1,
    name: "Health & Wellness",
    icon: Heart,
    description: "24/7 medical consultations, fitness training, wellness programs",
    providers: 120,
    rating: 4.9,
    href: "/services/health-wellness",
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
    features: ["24/7 Emergency", "Telemedicine", "Wellness Programs", "Home Visits"],
    stats: { providers: "120+", appointments: "500+/month" },
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    trending: "Hot",
    verified: true
  },
  {
    id: 2,
    name: "Financial Services",
    icon: DollarSign,
    description: "Banking, investments, insurance, and comprehensive financial solutions",
    providers: 95,
    rating: 4.6,
    href: "/financial-services",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    features: ["Banking Solutions", "Investment Planning", "Insurance Coverage", "Mobile Money"],
    stats: { providers: "95+", volume: "ZMW 2.5M+/month" },
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    isSpecial: true,
    trending: "Popular",
    verified: true
  },
  {
    id: 3,
    name: "Courier & Delivery",
    icon: Truck,
    description: "Fast and reliable delivery services for packages and documents",
    providers: 85,
    rating: 4.7,
    href: "/services/courier-delivery",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["Same-day Delivery", "Package Tracking", "Nationwide Coverage", "Express Service"],
    stats: { drivers: "85+", deliveries: "200+/day" },
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    trending: "New",
    verified: true
  },
  {
    id: 4,
    name: "Fashion & Tailoring",
    icon: Scissors,
    description: "Custom clothing, alterations, fashion design services",
    providers: 65,
    rating: 4.8,
    href: "/services/fashion-tailoring",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    features: ["Custom Designs", "Quick Alterations", "Traditional Wear", "Modern Fashion"],
    stats: { tailors: "65+", orders: "150+/month" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    trending: "Popular"
  },
  {
    id: 5,
    name: "Entertainment & Events",
    icon: Music,
    description: "Event planning, live entertainment, DJ services, party equipment",
    providers: 55,
    rating: 4.7,
    href: "/services/entertainment-events",
    gradient: "from-pink-500 to-purple-600",
    bgGradient: "from-pink-50 to-purple-50",
    features: ["Event Planning", "Live Music", "DJ Services", "Equipment Rental"],
    stats: { entertainers: "55+", events: "100+/month" },
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
    trending: "Sale"
  },
  {
    id: 6,
    name: "Photography & Video",
    icon: Camera,
    description: "Professional photography, videography, content creation",
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
    id: 7,
    name: "Home Services",
    icon: Home,
    description: "Cleaning, maintenance, repairs, and home improvement",
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
    id: 8,
    name: "General Health Services",
    icon: Stethoscope,
    description: "General medical consultations, health checkups, medical advice",
    providers: 75,
    rating: 4.7,
    href: "/services/general-health",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["General Consultations", "Health Checkups", "Medical Advice", "Prescription Services"],
    stats: { doctors: "75+", consultations: "300+/month" },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
  }
];

interface EnhancedCategoriesGridProps {
  showSearch?: boolean;
  maxCategories?: number;
}

export function EnhancedCategoriesGrid({ showSearch = true, maxCategories }: EnhancedCategoriesGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState(platformServices);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "trending" | "verified">("all");
  const router = useRouter();

  useEffect(() => {
    let filtered = platformServices;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter === "trending") {
      filtered = filtered.filter(service => service.trending);
    } else if (selectedFilter === "verified") {
      filtered = filtered.filter(service => service.verified);
    }

    // Apply max categories limit
    if (maxCategories) {
      filtered = filtered.slice(0, maxCategories);
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedFilter, maxCategories]);

  const getTrendingBadgeStyle = (trending?: string) => {
    switch (trending) {
      case "Hot":
        return "bg-gradient-to-r from-red-500 to-orange-500 text-white";
      case "New":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "Popular":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "Sale":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header with Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-700 to-blue-600 bg-clip-text text-transparent mb-3"
          >
            Explore Professional Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-slate-600 max-w-2xl text-lg"
          >
            Discover amazing services from verified local professionals across Zambia
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
        >
          <Link href="/services">
            <Button 
              variant="outline" 
              className="group bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 px-6 py-3"
            >
              View All Services
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Search and Filter Bar */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-purple-300 transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            {["all", "trending", "verified"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter as any)}
                className={`transition-all duration-300 ${
                  selectedFilter === filter 
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white" 
                    : "bg-white/80 backdrop-blur-sm border-slate-200 hover:border-purple-300"
                }`}
              >
                {filter === "all" && <Filter className="h-4 w-4 mr-1" />}
                {filter === "trending" && <TrendingUp className="h-4 w-4 mr-1" />}
                {filter === "verified" && <Shield className="h-4 w-4 mr-1" />}
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: 2.1 + index * 0.1, 
              duration: 0.6,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ scale: 1.02, y: -8 }}
            className="group"
          >
            <Link href={service.href}>
              <Card className={`h-full cursor-pointer transition-all duration-500 hover:shadow-2xl bg-white/90 backdrop-blur-xl border-white/50 rounded-3xl overflow-hidden group-hover:border-purple-200/50 ${
                service.isSpecial ? 'ring-2 ring-emerald-200 ring-opacity-50' : ''
              }`}>
                <CardContent className="p-0">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.bgGradient} opacity-40 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-blue-500/10 group-hover:via-purple-500/10 transition-colors duration-300"></div>
                    
                    {/* Service Icon */}
                    <div className="absolute top-4 left-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 hover:rotate-6 transition-all duration-300`}>
                        <service.icon className="h-7 w-7 text-white group-hover:animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1 animate-pulse" />
                        {service.rating}
                      </Badge>
                    </div>

                    {/* Trending Badge */}
                    {service.trending && (
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${getTrendingBadgeStyle(service.trending)} px-3 py-1 rounded-xl shadow-lg font-semibold text-xs`}>
                          {service.trending === "Hot" && <TrendingUp className="h-3 w-3 mr-1" />}
                          {service.trending}
                        </Badge>
                      </div>
                    )}

                    {/* Verified Badge */}
                    {service.verified && (
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg shadow-lg">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl text-slate-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-1">
                        {service.name}
                      </h3>
                      {service.isSpecial && (
                        <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-slate-600 mb-4 leading-relaxed line-clamp-2 text-sm">
                      {service.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group-hover:border-purple-200">
                        <div className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                          {Object.values(service.stats)[0]}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {Object.keys(service.stats)[0]}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group-hover:border-purple-200">
                        <div className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                          {Object.values(service.stats)[1]}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {Object.keys(service.stats)[1]}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2 font-medium">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                            +{service.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Users className="h-4 w-4" />
                        {service.providers} providers
                      </div>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="text-sm font-medium">View Services</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* No Results State */}
      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No services found</h3>
          <p className="text-slate-600 mb-6">Try adjusting your search terms or filters</p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Statistics Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border border-purple-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              550+
            </div>
            <div className="text-sm text-slate-600 font-medium">Service Providers</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
              1,500+
            </div>
            <div className="text-sm text-slate-600 font-medium">Monthly Bookings</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              4.7★
            </div>
            <div className="text-sm text-slate-600 font-medium">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm text-slate-600 font-medium">Support Available</div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
