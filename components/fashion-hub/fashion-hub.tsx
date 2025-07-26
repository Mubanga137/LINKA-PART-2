"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Sparkles,
  Palette,
  Scissors,
  Users,
  Heart,
  Star,
  TrendingUp
} from "lucide-react"

export function FashionHub() {
  const quickSearches = [
    "Traditional Chitenge", "Modern Dresses", "Custom Suits", "Ankara Fabrics", 
    "Wedding Attire", "Kids School Wear", "Leather Accessories", "Copper Jewelry"
  ]

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-16 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-48 right-24 w-24 h-24 bg-pink-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="bg-white/10 text-white border-white/20 mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Zambia's Complete Fashion Destination
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Fashion &
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-white bg-clip-text text-transparent">
                Style Hub
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-purple-100 mb-12 max-w-5xl mx-auto leading-relaxed"
          >
            Discover Traditional Wear, Modern Fashion, Premium Textiles, Custom Tailoring, and Unique Accessories. 
            From heritage to contemporary, we celebrate Zambian style.
          </motion.p>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-3 border border-white/20">
                <div className="flex items-center">
                  <Search className="ml-4 h-7 w-7 text-purple-200" />
                  <Input
                    type="text"
                    placeholder="Search fashion items, fabrics, tailors, or accessories..."
                    className="flex-1 border-0 bg-transparent text-white placeholder:text-purple-200 focus:ring-0 px-6 py-5 text-xl"
                  />
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Search Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {quickSearches.map((term, index) => (
              <motion.div
                key={term}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <Badge 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 cursor-pointer transition-all duration-200 px-6 py-3 text-sm"
                >
                  {term}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Function Cards Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto"
          >
            {[
              { name: "Traditional", icon: Palette, path: "/categories/fashion-textiles/traditional" },
              { name: "Modern", icon: Sparkles, path: "/categories/fashion-textiles/modern" },
              { name: "Textiles", icon: Scissors, path: "/categories/fashion-textiles/textiles" },
              { name: "Tailoring", icon: Users, path: "/categories/fashion-textiles/custom" },
              { name: "Accessories", icon: Heart, path: "/categories/fashion-textiles/accessories" }
            ].map((func, index) => (
              <motion.div
                key={func.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="group"
              >
                <Link href={func.path}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <func.icon className="h-8 w-8 text-white mx-auto mb-3" />
                    <h3 className="text-white font-semibold text-lg">{func.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
