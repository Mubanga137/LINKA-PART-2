"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  Shield,
  Zap,
  Flame,
  Rocket,
  Crown,
  Diamond,
  Layers,
  MousePointer
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
        return "bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse";
      case "New":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "Popular":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "Sale":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-bounce";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Floating particles animation variants
  const particleVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Card hover animation variants
  const cardVariants = {
    initial: { 
      scale: 1, 
      y: 0, 
      rotateY: 0,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    hover: { 
      scale: 1.05, 
      y: -12,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 25px -12px rgba(0, 0, 0, 0.15)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        duration: 0.3
      }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Icon animation variants
  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -10, 10, -5, 0],
      scale: [1, 1.1, 1.05, 1.1, 1],
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  // Gradient animation variants
  const gradientVariants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: { 
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="space-y-8 relative"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            animate="animate"
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            transition={{ delay: i * 0.2 }}
            className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
          />
        ))}
      </div>

      {/* Header with Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-3"
          >
            <motion.span
              animate={{
                background: [
                  "linear-gradient(45deg, #1e40af, #7c3aed, #dc2626)",
                  "linear-gradient(45deg, #7c3aed, #dc2626, #1e40af)",
                  "linear-gradient(45deg, #dc2626, #1e40af, #7c3aed)",
                  "linear-gradient(45deg, #1e40af, #7c3aed, #dc2626)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-purple-700 to-blue-600"
              style={{ backgroundSize: "300% 300%" }}
            >
              Explore Professional Services
            </motion.span>
            <motion.span
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block ml-3"
            >
              ✨
            </motion.span>
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/services">
            <Button 
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="relative z-10 flex items-center gap-2">
                View All Services
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </span>
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
          className="flex flex-col sm:flex-row gap-4 items-center relative z-10"
        >
          <div className="relative flex-1 max-w-md">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-slate-400" />
            </motion.div>
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/90 backdrop-blur-sm border-slate-200 focus:border-purple-300 transition-colors shadow-lg"
            />
          </div>
          
          <div className="flex gap-2">
            {["all", "trending", "verified"].map((filter) => (
              <motion.div
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter as any)}
                  className={`transition-all duration-300 ${
                    selectedFilter === filter 
                      ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg" 
                      : "bg-white/90 backdrop-blur-sm border-slate-200 hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  {filter === "all" && <Filter className="h-4 w-4 mr-1" />}
                  {filter === "trending" && <Flame className="h-4 w-4 mr-1" />}
                  {filter === "verified" && <Shield className="h-4 w-4 mr-1" />}
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Enhanced Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        <AnimatePresence>
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -40 }}
              transition={{
                delay: 1.8 + index * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 120,
                damping: 18
              }}
              className="group relative"
              onHoverStart={() => setHoveredCard(service.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 blur-xl`}
                animate={{
                  opacity: hoveredCard === service.id ? 0.3 : 0,
                  scale: hoveredCard === service.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              <Link href={service.href}>
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className={`relative h-full cursor-pointer bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden ${
                    service.isSpecial ? 'ring-2 ring-emerald-200 ring-opacity-50' : ''
                  }`}
                >
                  <Card className="h-full border-0 shadow-none bg-transparent">
                    <CardContent className="p-0">
                      {/* Enhanced Image Header */}
                      <div className="relative h-48 overflow-hidden">
                        {/* Animated background gradient */}
                        <motion.div
                          variants={gradientVariants}
                          initial="initial"
                          animate="animate"
                          className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-60`}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                        
                        {/* Main image */}
                        <motion.img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {/* Overlay effects */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"
                          whileHover={{ opacity: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Animated service icon */}
                        <div className="absolute top-4 left-4">
                          <motion.div 
                            variants={iconVariants}
                            initial="initial"
                            whileHover="hover"
                            className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}
                          >
                            {/* Icon glow effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              animate={{
                                x: [-100, 100],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <service.icon className="h-7 w-7 text-white relative z-10" />
                          </motion.div>
                        </div>
                        
                        {/* Animated rating badge */}
                        <div className="absolute top-4 right-4">
                          <motion.div
                            whileHover={{ 
                              scale: 1.1,
                              rotate: [0, -5, 5, 0]
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Badge className="bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-xl shadow-lg border border-white/50">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="mr-1"
                              >
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              </motion.div>
                              {service.rating}
                            </Badge>
                          </motion.div>
                        </div>

                        {/* Enhanced trending badge */}
                        {service.trending && (
                          <div className="absolute bottom-4 left-4">
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 260, 
                                damping: 20,
                                delay: 0.3 + index * 0.1
                              }}
                              whileHover={{
                                scale: 1.1,
                                rotate: [0, -10, 10, 0]
                              }}
                            >
                              <Badge className={`${getTrendingBadgeStyle(service.trending)} px-3 py-1 rounded-xl shadow-lg font-semibold text-xs relative overflow-hidden`}>
                                {service.trending === "Hot" && (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="mr-1"
                                  >
                                    <Flame className="h-3 w-3" />
                                  </motion.div>
                                )}
                                {service.trending === "New" && <Sparkles className="h-3 w-3 mr-1" />}
                                {service.trending === "Sale" && <Zap className="h-3 w-3 mr-1" />}
                                {service.trending}
                              </Badge>
                            </motion.div>
                          </div>
                        )}

                        {/* Enhanced verified badge */}
                        {service.verified && (
                          <div className="absolute bottom-4 right-4">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 260, 
                                damping: 20,
                                delay: 0.5 + index * 0.1
                              }}
                              whileHover={{ 
                                scale: 1.15,
                                rotate: [0, -15, 15, 0]
                              }}
                            >
                              <Badge className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg shadow-lg relative overflow-hidden">
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.7, 1]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="mr-1"
                                >
                                  <Shield className="h-3 w-3" />
                                </motion.div>
                                Verified
                              </Badge>
                            </motion.div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Content */}
                      <div className="p-6 relative">
                        {/* Floating decorative elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <motion.h3 
                            className="font-bold text-xl text-slate-900 line-clamp-1 flex-1"
                            whileHover={{
                              background: "linear-gradient(45deg, #7c3aed, #3b82f6)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text"
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {service.name}
                          </motion.h3>
                          {service.isSpecial && (
                            <motion.div
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 3, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Crown className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                            </motion.div>
                          )}
                        </div>

                        <p className="text-slate-600 mb-4 leading-relaxed line-clamp-2 text-sm">
                          {service.description}
                        </p>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {Object.entries(service.stats).map(([key, value], statIndex) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + statIndex * 0.05 }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgba(147, 51, 234, 0.1)"
                              }}
                              className="text-center p-3 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200/50 transition-all duration-300 group-hover:border-purple-200 relative overflow-hidden"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                              <div className="relative z-10">
                                <motion.div 
                                  className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {value}
                                </motion.div>
                                <div className="text-xs text-slate-500 font-medium">
                                  {key}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Enhanced Features */}
                        <div className="mb-4">
                          <p className="text-xs text-slate-500 mb-2 font-medium">Key Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {service.features.slice(0, 2).map((feature, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                whileHover={{ 
                                  scale: 1.05,
                                  backgroundColor: "rgba(59, 130, 246, 0.1)"
                                }}
                              >
                                <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 hover:bg-blue-100 transition-colors duration-200">
                                  {feature}
                                </Badge>
                              </motion.div>
                            ))}
                            {service.features.length > 2 && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ 
                                  scale: 1.1,
                                  backgroundColor: "rgba(59, 130, 246, 0.15)"
                                }}
                              >
                                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200">
                                  +{service.features.length - 2} more
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Enhanced Action */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 relative z-10">
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ 
                                duration: 4, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Users className="h-4 w-4" />
                            </motion.div>
                            {service.providers} providers
                          </div>
                          <motion.div 
                            className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-sm font-medium mr-1">View Services</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enhanced No Results State */}
      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Search className="h-12 w-12 text-slate-400 relative z-10" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No services found</h3>
          <p className="text-slate-600 mb-6">Try adjusting your search terms or filters</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced Statistics Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border border-purple-100 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-full h-full bg-gradient-to-r from-purple-400 to-blue-400"
            style={{
              maskImage: "radial-gradient(circle, transparent 20%, black 40%, transparent 60%)"
            }}
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
          {[
            { number: "550+", label: "Service Providers", color: "from-purple-600 to-blue-600", icon: Users },
            { number: "1,500+", label: "Monthly Bookings", color: "from-emerald-600 to-green-600", icon: Target },
            { number: "4.7★", label: "Average Rating", color: "from-orange-600 to-red-600", icon: Star },
            { number: "24/7", label: "Support Available", color: "from-pink-600 to-purple-600", icon: Clock }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              />
              <div className="relative z-10 p-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  className="mb-2"
                >
                  <stat.icon className="h-6 w-6 mx-auto text-slate-600" />
                </motion.div>
                <motion.div 
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
