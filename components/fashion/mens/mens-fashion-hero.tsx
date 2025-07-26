"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shirt,
  Crown,
  Briefcase,
  Star,
  TrendingUp
} from "lucide-react"

export function MensFashionHero() {
  const stats = [
    { label: "Men's Items", value: "450+", icon: Shirt },
    { label: "Brands", value: "25+", icon: Crown },
    { label: "Happy Customers", value: "2,500+", icon: Users },
    { label: "Avg Rating", value: "4.8", icon: Star },
  ]

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
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
          className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-400/15 rounded-full blur-3xl"
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
              <Users className="h-4 w-4 mr-2" />
              Men's Fashion Collection
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Elevate Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-white bg-clip-text text-transparent">
                Style Game
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Discover premium men's fashion from casual wear to formal attire. 
              From traditional Zambian styles to contemporary designs, find the perfect look for every occasion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-50 shadow-lg">
                <Shirt className="h-5 w-5 mr-2" />
                Shop All Men's
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Briefcase className="h-5 w-5 mr-2" />
                Business Collection
              </Button>
            </div>

            {/* Quick Categories */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="#formal" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <Crown className="h-6 w-6 text-blue-300 mb-2" />
                  <h3 className="text-white font-semibold">Formal Wear</h3>
                  <p className="text-blue-200 text-sm">Suits & Business Attire</p>
                </div>
              </Link>
              <Link href="#casual" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <Shirt className="h-6 w-6 text-blue-300 mb-2" />
                  <h3 className="text-white font-semibold">Casual Wear</h3>
                  <p className="text-blue-200 text-sm">Everyday Comfort</p>
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop"
                alt="Men's Fashion"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-6 right-6"
              >
                <Badge className="bg-orange-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
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
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
