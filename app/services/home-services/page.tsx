"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Home,
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Phone,
  Calendar,
  CheckCircle,
  ArrowRight,
  Hammer,
  Paintbrush,
  Zap,
  Droplets,
  Wrench,
  Shield,
  Users,
  Award,
  ThumbsUp,
  MessageCircle,
  Camera,
  TrendingUp,
  Heart,
  Bookmark,
  ExternalLink,
  DollarSign,
  Timer,
  Target,
  Truck,
  Package,
  Settings,
  RefreshCw,
  Lightbulb,
  Leaf,
  Sparkles,
  Crown,
  Building
} from "lucide-react";

export default function HomeServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Service categories
  const serviceCategories = [
    {
      id: "cleaning",
      name: "Cleaning Services",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-500",
      count: 24,
      avgPrice: "K 150",
      description: "Professional home and office cleaning"
    },
    {
      id: "maintenance", 
      name: "Home Maintenance",
      icon: Hammer,
      color: "from-orange-500 to-red-500",
      count: 18,
      avgPrice: "K 280",
      description: "Repairs and general maintenance"
    },
    {
      id: "electrical",
      name: "Electrical Services",
      icon: Zap,
      color: "from-yellow-500 to-orange-500", 
      count: 15,
      avgPrice: "K 320",
      description: "Wiring, installations, and repairs"
    },
    {
      id: "plumbing",
      name: "Plumbing Services",
      icon: Droplets,
      color: "from-blue-500 to-indigo-500",
      count: 12,
      avgPrice: "K 250",
      description: "Pipes, fixtures, and water systems"
    },
    {
      id: "painting",
      name: "Painting & Decorating",
      icon: Paintbrush,
      color: "from-purple-500 to-pink-500",
      count: 10,
      avgPrice: "K 400",
      description: "Interior and exterior painting"
    },
    {
      id: "gardening",
      name: "Gardening & Landscaping",
      icon: Leaf,
      color: "from-green-500 to-emerald-500",
      count: 8,
      avgPrice: "K 180",
      description: "Garden care and landscaping"
    }
  ];

  // Featured service providers
  const featuredProviders = [
    {
      id: "provider-1",
      name: "CleanPro Zambia",
      category: "cleaning",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=400&fit=crop&q=80",
      services: ["Deep Cleaning", "Regular Cleaning", "Office Cleaning"],
      priceRange: "K 120 - K 300",
      location: "Lusaka",
      verified: true,
      responseTime: "2 hours",
      completedJobs: 340,
      description: "Professional cleaning services with eco-friendly products",
      availability: "Available today",
      featured: true
    },
    {
      id: "provider-2", 
      name: "FixMaster Solutions",
      category: "maintenance",
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&h=400&fit=crop&q=80",
      services: ["General Repairs", "Furniture Assembly", "Door Installation"],
      priceRange: "K 200 - K 500",
      location: "Lusaka",
      verified: true,
      responseTime: "1 hour",
      completedJobs: 425,
      description: "Expert handyman services for all home repair needs",
      availability: "Available now",
      featured: true
    },
    {
      id: "provider-3",
      name: "PowerTech Electrical",
      category: "electrical", 
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=400&fit=crop&q=80",
      services: ["Wiring", "Solar Installation", "Electrical Repairs"],
      priceRange: "K 250 - K 800",
      location: "Lusaka",
      verified: true,
      responseTime: "3 hours",
      completedJobs: 180,
      description: "Licensed electricians with 10+ years experience",
      availability: "Available tomorrow",
      featured: true
    },
    {
      id: "provider-4",
      name: "AquaFlow Plumbing",
      category: "plumbing",
      rating: 4.7,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=500&h=400&fit=crop&q=80",
      services: ["Pipe Installation", "Leak Repairs", "Bathroom Renovation"],
      priceRange: "K 180 - K 600",
      location: "Lusaka",
      verified: true,
      responseTime: "4 hours",
      completedJobs: 267,
      description: "Professional plumbing with 24/7 emergency service",
      availability: "Available today",
      featured: true
    },
    {
      id: "provider-5",
      name: "ColorCraft Painters",
      category: "painting",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=400&fit=crop&q=80",
      services: ["Interior Painting", "Exterior Painting", "Wallpaper Installation"],
      priceRange: "K 300 - K 900",
      location: "Lusaka",
      verified: true,
      responseTime: "6 hours",
      completedJobs: 156,
      description: "Premium painting services with quality materials",
      availability: "Available in 2 days",
      featured: true
    },
    {
      id: "provider-6",
      name: "GreenSpace Gardens",
      category: "gardening",
      rating: 4.6,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop&q=80",
      services: ["Garden Maintenance", "Landscaping", "Tree Pruning"],
      priceRange: "K 150 - K 400",
      location: "Lusaka",
      verified: true,
      responseTime: "1 day",
      completedJobs: 123,
      description: "Professional garden care and landscaping experts",
      availability: "Available this week",
      featured: true
    }
  ];

  // Filter providers based on search and filters
  const filteredProviders = featuredProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || provider.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "price-low":
        const aPriceLow = parseInt(a.priceRange.split(" - ")[0].replace("K ", ""));
        const bPriceLow = parseInt(b.priceRange.split(" - ")[0].replace("K ", ""));
        return aPriceLow - bPriceLow;
      case "price-high":
        const aPriceHigh = parseInt(a.priceRange.split(" - ")[1].replace("K ", ""));
        const bPriceHigh = parseInt(b.priceRange.split(" - ")[1].replace("K ", ""));
        return bPriceHigh - aPriceHigh;
      case "response":
        return a.responseTime.localeCompare(b.responseTime);
      default:
        return b.completedJobs - a.completedJobs;
    }
  });

  // How it works steps
  const howItWorksSteps = [
    {
      step: 1,
      title: "Browse Services",
      description: "Choose from our wide range of home service categories",
      icon: Search,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "Select Provider",
      description: "Compare verified professionals and read reviews",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: 3,
      title: "Book & Schedule",
      description: "Choose your preferred time and confirm booking",
      icon: Calendar,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 4,
      title: "Get Service",
      description: "Professional arrives on time and completes the job",
      icon: CheckCircle,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-green-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-300/25 to-cyan-300/25 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <Home className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Home Services
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with trusted local professionals for all your home maintenance and repair needs
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="What service do you need?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-white border-gray-200 rounded-xl h-12"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-40 bg-white border-gray-200 rounded-xl h-12">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        <SelectItem value="lusaka">Lusaka</SelectItem>
                        <SelectItem value="ndola">Ndola</SelectItem>
                        <SelectItem value="kitwe">Kitwe</SelectItem>
                        <SelectItem value="livingstone">Livingstone</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 h-12 rounded-xl">
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Service Providers", value: "87+", icon: Users },
              { label: "Services Completed", value: "1,200+", icon: CheckCircle },
              { label: "Happy Customers", value: "850+", icon: ThumbsUp },
              { label: "Avg Response Time", value: "2 hrs", icon: Timer }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/50"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-gray-600 text-lg">Choose from our most requested home service categories</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">
                        {category.count} providers
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        From {category.avgPrice}
                      </span>
                      <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Providers</h2>
              <p className="text-gray-600">Top-rated professionals ready to help</p>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white/80 backdrop-blur-sm border border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="response">Fastest Response</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Overlay badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      {provider.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          <Crown className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {provider.verified && (
                        <Badge className="bg-green-500 text-white">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-gray-900">
                        {provider.availability}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{provider.rating}</span>
                        <span className="text-sm text-gray-500">({provider.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{provider.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Responds in {provider.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{provider.completedJobs} jobs completed</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {provider.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-lg text-gray-900">{provider.priceRange}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <MessageCircle className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                      <Button variant="outline" className="border-gray-200 hover:border-blue-300">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-blue-100 text-lg">Get professional home services in 4 simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl mx-auto flex items-center justify-center shadow-2xl`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-gray-900">{step.step}</span>
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-white/30 -translate-x-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-blue-100">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Service Provider?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust our verified professionals for their home service needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold px-8 py-3">
                <Search className="h-5 w-5 mr-2" />
                Find Service Provider
              </Button>
              <Button variant="outline" className="border-gray-300 hover:border-blue-300 font-semibold px-8 py-3">
                <Users className="h-5 w-5 mr-2" />
                Become a Provider
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
