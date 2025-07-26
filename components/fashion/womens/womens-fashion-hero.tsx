"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Crown,
  Sparkles,
  Star,
  Users,
  Palette
} from "lucide-react"

export function WomensFashionHero() {
  const stats = [
    { label: "Women's Items", value: "680+", icon: Heart },
    { label: "Designers", value: "35+", icon: Crown },
    { label: "Happy Customers", value: "3,200+", icon: Users },
    { label: "Avg Rating", value: "4.9", icon: Star },
  ]

  return (
    <section className="relative bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-16 right-16 w-32 h-32 bg-pink-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-16 left-16 w-40 h-40 bg-purple-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-white/10 text-white border-white/20 mb-6">
              <Heart className="h-4 w-4 mr-2" />
              Women's Fashion Collection
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Express Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-white bg-clip-text text-transparent">
                Beautiful Self
              </span>
            </h1>

            <p className="text-xl text-pink-100 mb-8 leading-relaxed">
              Discover stunning women's fashion from elegant dresses to casual chic. 
              Embrace African heritage with modern Ankara prints and contemporary designs that celebrate your unique style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-white text-pink-900 hover:bg-gray-50 shadow-lg">
                <Sparkles className="h-5 w-5 mr-2" />
                Shop All Women's
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Crown className="h-5 w-5 mr-2" />
                Luxury Collection
              </Button>
            </div>

            {/* Quick Categories */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="#dresses" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <Heart className="h-6 w-6 text-pink-300 mb-2" />
                  <h3 className="text-white font-semibold">Dresses</h3>
                  <p className="text-pink-200 text-sm">Elegant & Casual</p>
                </div>
              </Link>
              <Link href="#accessories" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <Palette className="h-6 w-6 text-pink-300 mb-2" />
                  <h3 className="text-white font-semibold">Accessories</h3>
                  <p className="text-pink-200 text-sm">Bags, Jewelry & More</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=700&fit=crop"
                alt="Women's Fashion"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent rounded-2xl" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-6 right-6"
              >
                <Badge className="bg-pink-500 text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-pink-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
