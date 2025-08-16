"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
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
  DollarSign,
  ExternalLink,
  TrendingUp,
  Shield,
  Timer
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
    hoverGradient: "hover:from-red-100 hover:to-pink-100",
    features: ["24/7 Emergency", "Telemedicine", "Wellness Programs", "Home Visits"],
    stats: { providers: "120+", appointments: "500+/month" },
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    brandColor: "#ff6f61",
    shadowColor: "hover:shadow-red-500/25"
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
    hoverGradient: "hover:from-blue-100 hover:to-indigo-100",
    features: ["Same-day Delivery", "Package Tracking", "Nationwide Coverage", "Express Service"],
    stats: { drivers: "85+", deliveries: "200+/day" },
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    brandColor: "#0d6efd",
    shadowColor: "hover:shadow-blue-500/25"
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
    hoverGradient: "hover:from-purple-100 hover:to-pink-100",
    features: ["Custom Designs", "Quick Alterations", "Traditional Wear", "Modern Fashion"],
    stats: { tailors: "65+", orders: "150+/month" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    brandColor: "#ff6f61",
    shadowColor: "hover:shadow-purple-500/25"
  },
  {
    id: 4,
    name: "Entertainment Hub",
    icon: Gamepad2,
    description: "Gaming, movies, music, live events, and premium entertainment experiences",
    providers: 250,
    rating: 4.9,
    href: "/services/entertainment-events",
    gradient: "from-pink-500 via-purple-500 to-blue-500",
    bgGradient: "from-pink-50 via-purple-50 to-blue-50",
    hoverGradient: "hover:from-pink-100 hover:via-purple-100 hover:to-blue-100",
    features: ["Gaming Tournaments", "Movie Streaming", "Live Music", "Premium Events", "VIP Subscriptions", "+10 more"],
    stats: { creators: "250+", "entertainment hours": "10K+/month" },
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    brandColor: "#6366f1",
    shadowColor: "hover:shadow-purple-500/25",
    isPremiumHub: true,
    hubCategories: ["Gaming", "Movies", "Music", "Events", "Subscriptions"]
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
    hoverGradient: "hover:from-teal-100 hover:to-cyan-100",
    features: ["Event Photography", "Product Shoots", "Video Production", "Editing Services"],
    stats: { photographers: "40+", shoots: "75+/month" },
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    brandColor: "#4caf50",
    shadowColor: "hover:shadow-teal-500/25"
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
    hoverGradient: "hover:from-blue-100 hover:to-indigo-100",
    features: ["General Consultations", "Health Checkups", "Medical Advice", "Prescription Services"],
    stats: { doctors: "75+", consultations: "300+/month" },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    brandColor: "#0d6efd",
    shadowColor: "hover:shadow-blue-500/25"
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
    hoverGradient: "hover:from-green-100 hover:to-teal-100",
    features: ["Personal Training", "Yoga Classes", "Group Sessions", "Wellness Coaching"],
    stats: { trainers: "50+", sessions: "200+/month" },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    brandColor: "#4caf50",
    shadowColor: "hover:shadow-green-500/25"
  },
  {
    id: 8,
    name: "Home Services",
    icon: Home,
    description: "Cleaning, maintenance, repairs, and home improvement services",
    providers: 60,
    rating: 4.5,
    href: "/services/home-services",
    gradient: "from-orange-500 to-amber-600",
    bgGradient: "from-orange-50 to-amber-50",
    hoverGradient: "hover:from-orange-100 hover:to-amber-100",
    features: ["House Cleaning", "Maintenance", "Repairs", "Home Improvement"],
    stats: { professionals: "60+", jobs: "120+/month" },
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    brandColor: "#ff6f61",
    shadowColor: "hover:shadow-orange-500/25"
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
    hoverGradient: "hover:from-emerald-100 hover:to-green-100",
    features: ["Banking Solutions", "Investment Planning", "Insurance Coverage", "+5 more"],
    stats: { providers: "95+", volume: "ZMW 2.5M+/month" },
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    isSpecial: true,
    brandColor: "#4caf50",
    shadowColor: "hover:shadow-emerald-500/25"
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.8,
    rotateX: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 1.2
    }
  }
}

export default function ServicesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <Header />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
            style={{
              top: `${(i * 12 + 10) % 90}%`,
              left: `${(i * 15 + 5) % 85}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <main className="py-8 relative z-10">
        {/* Enhanced Hero Section */}
        <motion.section 
          className="py-20 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div className="text-center mb-16" variants={headerVariants}>
              <motion.div className="relative mb-12">
                <motion.div 
                  className="w-32 h-32 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 360,
                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <Sparkles className="h-16 w-16 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -inset-8 bg-gradient-to-r from-violet-400 via-pink-400 to-purple-400 rounded-full opacity-20 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-8"
                variants={headerVariants}
              >
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Professional Services
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12"
                variants={headerVariants}
              >
                Connect with skilled service providers across Zambia for all your personal and business needs.
                From health and wellness to entertainment, courier services to home maintenance – find trusted professionals ready to serve you.
              </motion.p>

              {/* Enhanced Stats Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                variants={containerVariants}
              >
                {[
                  { value: "550+", label: "Service Providers", color: "from-blue-600 to-indigo-600", bg: "from-blue-50 to-indigo-100" },
                  { value: "9", label: "Service Categories", color: "from-purple-600 to-violet-600", bg: "from-purple-50 to-violet-100" },
                  { value: "1,500+", label: "Monthly Bookings", color: "from-emerald-600 to-green-600", bg: "from-emerald-50 to-green-100" },
                  { value: "4.7", label: "Average Rating", color: "from-orange-600 to-amber-600", bg: "from-orange-50 to-amber-100" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)"
                    }}
                    className={`text-center p-6 bg-gradient-to-br ${stat.bg} backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg cursor-pointer`}
                  >
                    <motion.div 
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-slate-700 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Service Categories Grid */}
        <motion.section 
          className="py-20"
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={headerVariants}>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Service Categories</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Discover professional services across various categories, all delivered by trusted and verified providers
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {platformServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    rotateY: 5,
                    z: 50
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="transform-gpu"
                >
                  <Link href={service.href} className="block">
                    <Card
                      className={`
                        group cursor-pointer transition-all duration-500 
                        bg-gradient-to-br from-white via-white to-gray-50/50 
                        ${service.hoverGradient}
                        backdrop-blur-sm border border-white/60 
                        hover:border-purple-200/50 rounded-3xl overflow-hidden 
                        shadow-lg hover:shadow-2xl ${service.shadowColor}
                        relative
                      `}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
                      
                      {/* Special Badge for Featured Services */}
                      {service.isSpecial && (
                        <motion.div 
                          className="absolute top-4 left-4 z-20"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-xl shadow-lg">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </motion.div>
                      )}

                      <CardContent className="p-0">
                        {/* Enhanced Image Header */}
                        <div className="relative h-52 overflow-hidden rounded-t-3xl">
                          <motion.img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          
                          {/* Gradient Overlays */}
                          <div className={`absolute inset-0 bg-gradient-to-t ${service.bgGradient} opacity-40 group-hover:opacity-20 transition-opacity duration-300`}></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-blue-500/10 group-hover:via-purple-500/15 transition-colors duration-300"></div>
                          
                          {/* Enhanced Icon */}
                          <motion.div 
                            className="absolute top-6 left-6"
                            whileHover={{ 
                              scale: 1.2, 
                              rotate: 360,
                              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)"
                            }}
                            transition={{ duration: 0.8 }}
                          >
                            <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                              <service.icon className="h-8 w-8 text-white" />
                            </div>
                          </motion.div>
                          
                          {/* Enhanced Rating Badge */}
                          <motion.div 
                            className="absolute top-6 right-6"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center shadow-lg">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-2" />
                              <span className="text-sm font-bold text-slate-700">{service.rating}</span>
                            </div>
                          </motion.div>

                          {/* Trust Badge */}
                          <motion.div 
                            className="absolute bottom-4 left-6"
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center">
                              <Shield className="h-3 w-3 text-white mr-1" />
                              <span className="text-xs text-white font-medium">Verified</span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Enhanced Content */}
                        <div className="p-8">
                          <motion.h3 
                            className="font-bold text-2xl text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            {service.name}
                          </motion.h3>

                          <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                          {/* Enhanced Stats Grid */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <motion.div 
                              className="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200/50 group-hover:border-purple-200 group-hover:shadow-lg transition-all duration-300"
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              <div className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                                {Object.values(service.stats)[0]}
                              </div>
                              <div className="text-xs text-slate-500 font-medium">
                                {Object.keys(service.stats)[0]}
                              </div>
                            </motion.div>
                            <motion.div 
                              className="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200/50 group-hover:border-purple-200 group-hover:shadow-lg transition-all duration-300"
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              <div className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                                {Object.values(service.stats)[1]}
                              </div>
                              <div className="text-xs text-slate-500 font-medium">
                                {Object.keys(service.stats)[1]}
                              </div>
                            </motion.div>
                          </div>

                          {/* Enhanced Features */}
                          <div className="mb-6">
                            <p className="text-sm text-slate-500 mb-3 font-medium">Popular Services:</p>
                            <div className="flex flex-wrap gap-2">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <motion.div
                                  key={idx}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-purple-100 hover:to-blue-100 transition-all duration-300"
                                  >
                                    {feature}
                                  </Badge>
                                </motion.div>
                              ))}
                              {service.features.length > 3 && (
                                <Badge variant="secondary" className="text-xs px-3 py-1">
                                  +{service.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Enhanced CTA */}
                          <motion.div 
                            className="flex items-center justify-between pt-4 border-t border-gray-100"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="text-sm text-slate-500 flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              {service.providers} providers
                            </div>
                            <motion.div 
                              className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium"
                              whileHover={{ x: 5 }}
                            >
                              <span className="text-sm mr-2">View Services</span>
                              <ExternalLink className="h-4 w-4" />
                            </motion.div>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced CTA Section */}
        <motion.section 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div variants={headerVariants}>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust our platform for their service needs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/services/health-wellness">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Heart className="h-5 w-5 mr-2" />
                      Book Health Services
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <Button variant="outline" className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-xl transition-all duration-300">
                      Contact Support
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
