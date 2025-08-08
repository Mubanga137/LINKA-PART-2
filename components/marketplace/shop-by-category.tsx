"use client";

import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Truck, 
  Music, 
  Grid3X3, 
  ArrowRight, 
  Camera, 
  Scissors, 
  Home, 
  CreditCard,
  Star,
  Users,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ShopByCategoryProps {
  showAll?: boolean;
  maxItems?: number;
}

interface ServiceCategory {
  id: number;
  name: string;
  icon: React.ElementType;
  description: string;
  providers: number;
  rating: number;
  href: string;
  gradient: string;
  tagline: string;
  bgPattern: string;
  hoverGradient: string;
  iconBg: string;
}

export function ShopByCategorySection({ showAll = false, maxItems = 6 }: ShopByCategoryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const serviceCategories: ServiceCategory[] = [
    {
      id: 1,
      name: "Health & Wellness",
      icon: Heart,
      description: "Medical consultations, fitness training, yoga classes, and wellness programs",
      providers: 120,
      rating: 4.9,
      href: "/services/health-wellness",
      gradient: "from-red-500 to-pink-600",
      tagline: "Your health, our priority",
      bgPattern: "from-red-50 via-pink-50 to-rose-50",
      hoverGradient: "hover:from-red-100 hover:via-pink-100 hover:to-rose-100",
      iconBg: "from-red-500 to-pink-600"
    },
    {
      id: 2,
      name: "Transportation",
      icon: Truck,
      description: "Courier services, delivery, logistics, and transportation solutions",
      providers: 85,
      rating: 4.7,
      href: "/services/courier-delivery",
      gradient: "from-blue-500 to-indigo-600",
      tagline: "Fast, reliable delivery",
      bgPattern: "from-blue-50 via-indigo-50 to-sky-50",
      hoverGradient: "hover:from-blue-100 hover:via-indigo-100 hover:to-sky-100",
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      name: "Fashion & Tailoring",
      icon: Scissors,
      description: "Custom designs, alterations, traditional wear, and fashion consulting",
      providers: 95,
      rating: 4.8,
      href: "/services/fashion-tailoring",
      gradient: "from-pink-500 to-rose-600",
      tagline: "Style that fits perfectly",
      bgPattern: "from-pink-50 via-rose-50 to-fuchsia-50",
      hoverGradient: "hover:from-pink-100 hover:via-rose-100 hover:to-fuchsia-100",
      iconBg: "from-pink-500 to-rose-600"
    },
    {
      id: 4,
      name: "Entertainment",
      icon: Music,
      description: "Event planning, DJ services, live music, and entertainment booking",
      providers: 55,
      rating: 4.6,
      href: "/services/entertainment-events",
      gradient: "from-purple-500 to-violet-600",
      tagline: "Unforgettable experiences",
      bgPattern: "from-purple-50 via-violet-50 to-indigo-50",
      hoverGradient: "hover:from-purple-100 hover:via-violet-100 hover:to-indigo-100",
      iconBg: "from-purple-500 to-violet-600"
    },
    {
      id: 5,
      name: "Photography & Video",
      icon: Camera,
      description: "Professional photography, videography, and content creation services",
      providers: 75,
      rating: 4.9,
      href: "/services/photography-video",
      gradient: "from-green-500 to-emerald-600",
      tagline: "Capture every moment",
      bgPattern: "from-green-50 via-emerald-50 to-teal-50",
      hoverGradient: "hover:from-green-100 hover:via-emerald-100 hover:to-teal-100",
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: 6,
      name: "Home Services",
      icon: Home,
      description: "Cleaning, maintenance, repairs, and home improvement services",
      providers: 110,
      rating: 4.7,
      href: "/services/home-services",
      gradient: "from-orange-500 to-amber-600",
      tagline: "Making homes better",
      bgPattern: "from-orange-50 via-amber-50 to-yellow-50",
      hoverGradient: "hover:from-orange-100 hover:via-amber-100 hover:to-yellow-100",
      iconBg: "from-orange-500 to-amber-600"
    },
    {
      id: 7,
      name: "Financial Services",
      icon: CreditCard,
      description: "Banking, insurance, loans, mobile money, and financial consulting",
      providers: 65,
      rating: 4.8,
      href: "/services/financial-services",
      gradient: "from-blue-600 to-cyan-600",
      tagline: "Secure financial solutions",
      bgPattern: "from-blue-50 via-cyan-50 to-teal-50",
      hoverGradient: "hover:from-blue-100 hover:via-cyan-100 hover:to-teal-100",
      iconBg: "from-blue-600 to-cyan-600"
    }
  ];

  const displayedServices = showAll ? serviceCategories : serviceCategories.slice(0, maxItems);

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f1f5f9\" fill-opacity=\"0.4\"%3E%3Cpath d=\"m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of professional services from verified local providers.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">Trusted by 10,000+ customers</span>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {displayedServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                whileTap={{ scale: 0.98 }}
                className="transform-gpu"
              >
                <Link href={service.href} className="group block">
                  <div className={`
                    relative bg-gradient-to-br ${service.bgPattern} 
                    ${service.hoverGradient}
                    rounded-3xl p-8 text-center 
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-blue-500/20
                    border border-white/50 backdrop-blur-sm
                    overflow-hidden
                    group-focus:ring-4 group-focus:ring-blue-500/20 group-focus:outline-none
                  `}>
                    
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
                    
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <motion.div 
                        className={`w-20 h-20 bg-gradient-to-r ${service.iconBg} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        whileHover={{ 
                          rotate: 10,
                          scale: 1.1
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <IconComponent className="h-10 w-10 text-white drop-shadow-lg" />
                      </motion.div>

                      {/* Service Info */}
                      <motion.h3 
                        className="font-bold text-xl text-gray-900 mb-2 group-hover:text-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.name}
                      </motion.h3>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-700">
                        {service.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 font-medium">{service.providers}+ providers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 font-medium">{service.rating}</span>
                        </div>
                      </div>

                      {/* Tagline */}
                      <p className="text-xs text-gray-500 font-bold mb-4">
                        {service.tagline}
                      </p>

                      {/* CTA Button */}
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`
                          inline-flex items-center gap-2 px-4 py-2 
                          bg-gradient-to-r ${service.gradient}
                          text-white text-sm font-medium rounded-xl
                          shadow-md hover:shadow-lg transition-shadow
                        `}>
                          <span>Explore Services</span>
                          <ExternalLink className="h-4 w-4" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Explore All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="
                bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 
                hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 
                text-white px-12 py-6 rounded-2xl font-semibold 
                shadow-xl hover:shadow-2xl hover:shadow-purple-500/25
                transition-all duration-300 text-lg
                border border-white/20 backdrop-blur-sm
                focus:ring-4 focus:ring-purple-500/20 focus:outline-none
              "
              asChild
            >
              <Link href="/categories" className="group">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid3X3 className="mr-3 h-6 w-6" />
                </motion.div>
                Explore All Categories
                <motion.div
                  className="ml-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
