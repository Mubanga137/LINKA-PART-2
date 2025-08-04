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
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// Service categories data from the services page
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
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    tagline: "Capture perfect moments"
  },
  {
    id: 6,
    name: "Medical Care",
    icon: Stethoscope,
    description: "General medical consultations, health checkups, and medical advice",
    providers: 75,
    rating: 4.7,
    href: "/services/general-health",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["General Consultations", "Health Checkups", "Medical Advice", "Prescription Services"],
    stats: { doctors: "75+", consultations: "300+/month" },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    tagline: "Quality healthcare for all"
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
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    tagline: "Transform your wellness"
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
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    tagline: "Your home, our expertise"
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
    tagline: "Secure your financial future",
    isSpecial: true
  }
];

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
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const sparkleVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: { 
    scale: [0, 1, 0], 
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
};

interface ShopByCategoryProps {
  showAll?: boolean;
  maxItems?: number;
}

export function ShopByCategorySection({ showAll = false, maxItems = 6 }: ShopByCategoryProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Show limited items by default, all when showAll is true
  const displayCategories = showAll ? serviceCategories : serviceCategories.slice(0, maxItems);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
            style={{ 
              animationDelay: `${i * 0.8}s`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            className="absolute w-6 h-6 text-blue-400 opacity-40"
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25"
          >
            <Grid3X3 className="h-10 w-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shop by Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of professional services from verified local providers. 
            From healthcare to entertainment, find exactly what you need with just a click.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotateY: 5,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group cursor-pointer"
            >
              <Link href={category.href}>
                <Card className={`
                  relative overflow-hidden
                  hover:shadow-2xl transition-all duration-500
                  border-0 shadow-lg rounded-3xl
                  bg-gradient-to-br from-white/95 to-white/90
                  backdrop-blur-sm
                  hover:bg-gradient-to-br hover:from-white hover:to-slate-50
                  group-hover:border-white/50
                  ${category.isSpecial ? 'ring-2 ring-emerald-200/50 hover:ring-emerald-300' : ''}
                `}>
                  <CardContent className="p-0 relative">
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden rounded-t-3xl">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.bgGradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10 group-hover:via-purple-500/5 transition-colors duration-300"></div>
                      
                      {/* Icon Badge */}
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                          transition: { duration: 0.8 }
                        }}
                        className="absolute top-4 left-4"
                      >
                        <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300`}>
                          <category.icon className="h-7 w-7 text-white" />
                        </div>
                      </motion.div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-2 rounded-xl shadow-lg border-0">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {category.rating}
                        </Badge>
                      </div>

                      {/* Special Badge for Financial Services */}
                      {category.isSpecial && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="absolute bottom-4 left-4"
                        >
                          <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full shadow-lg">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        </motion.div>
                      )}

                      {/* Floating Elements */}
                      <AnimatePresence>
                        {hoveredCard === category.id && (
                          <>
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute top-8 right-8 w-3 h-3 bg-white/60 rounded-full"
                              animate={{
                                y: [0, -15, 0],
                                opacity: [0.6, 1, 0.6]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute bottom-8 right-12 w-2 h-2 bg-white/40 rounded-full"
                              animate={{
                                y: [0, -10, 0],
                                opacity: [0.4, 0.8, 0.4]
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                              }}
                            />
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <motion.h3
                        className="font-bold text-xl text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {category.name}
                      </motion.h3>

                      <motion.p
                        className="text-sm text-gray-500 mb-4 font-medium"
                        whileHover={{ scale: 1.02 }}
                      >
                        {category.tagline}
                      </motion.p>

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
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore All Categories Button */}
        {!showAll && (
          <motion.div variants={itemVariants} className="text-center">
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border-0"
                asChild
              >
                <Link href="/services">
                  <Grid3X3 className="mr-3 h-5 w-5" />
                  Explore All Categories
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 mt-4 text-sm"
            >
              Discover all {serviceCategories.length} service categories and 550+ trusted providers
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
