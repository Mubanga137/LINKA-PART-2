"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  Heart,
  ShoppingBag,
  Palette,
  Scissors
} from "lucide-react"

export function FashionHero() {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    { label: "Fashion Items", value: "2,500+", icon: ShoppingBag },
    { label: "Local Designers", value: "150+", icon: Users },
    { label: "Happy Customers", value: "5,000+", icon: Star },
    { label: "Avg Rating", value: "4.8", icon: Heart },
  ]

  const quickSearches = [
    "Ankara Dresses", "Men's Suits", "Kids School Wear", "Traditional Chitenge", 
    "Wedding Attire", "Casual Wear", "Jewelry", "Handbags"
  ]

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-20 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-pink-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl"
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
        <div className="text-center mb-12">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Zambia's Premier Fashion Destination
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
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
            className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Discover the latest trends in Zambian fashion. From traditional chitenge to contemporary designs,
            find clothing and accessories that celebrate our culture and style.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <div className="flex items-center">
                  <Search className="ml-4 h-6 w-6 text-purple-200" />
                  <Input
                    type="text"
                    placeholder="Search for fashion items, brands, or styles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 bg-transparent text-white placeholder:text-purple-200 focus:ring-0 px-4 py-4 text-lg"
                  />
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold">
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
            className="flex flex-wrap justify-center gap-3 mb-12"
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
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 cursor-pointer transition-all duration-200 px-4 py-2"
                >
                  {term}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/categories/fashion/mens">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-50 shadow-lg">
                <Users className="h-5 w-5 mr-2" />
                Shop Men's Fashion
              </Button>
            </Link>
            <Link href="/categories/fashion/womens">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-50 shadow-lg">
                <Heart className="h-5 w-5 mr-2" />
                Shop Women's Fashion
              </Button>
            </Link>
            <Link href="/categories/fashion/kids">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Sparkles className="h-5 w-5 mr-2" />
                Kids Collection
              </Button>
            </Link>
            <Link href="/categories/fashion/textiles">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Scissors className="h-5 w-5 mr-2" />
                Custom Textiles
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-purple-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
