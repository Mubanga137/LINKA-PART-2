"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Users,
  Baby,
  Palette,
  Star,
  Heart
} from "lucide-react"

export function TraditionalHero() {
  const stats = [
    { label: "Traditional Items", value: "250+", icon: Crown },
    { label: "Heritage Designs", value: "45+", icon: Palette },
    { label: "Cultural Regions", value: "12+", icon: Star },
    { label: "Happy Customers", value: "2,800+", icon: Heart },
  ]

  return (
    <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-amber-700 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-16 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"
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
          className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400/15 rounded-full blur-3xl"
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
              <Crown className="h-4 w-4 mr-2" />
              Traditional Zambian Fashion
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Celebrate Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-white bg-clip-text text-transparent">
                Rich Heritage
              </span>
            </h1>

            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Discover authentic Zambian traditional wear that celebrates our diverse cultural heritage. 
              From beautiful chitenge wraps to intricate Ankara prints, embrace the beauty of our traditions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/categories/fashion-textiles/traditional/womens">
                <Button size="lg" className="bg-white text-orange-900 hover:bg-gray-50 shadow-lg">
                  <Users className="h-5 w-5 mr-2" />
                  Shop Women's Traditional
                </Button>
              </Link>
              <Link href="/categories/fashion-textiles/traditional/mens">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Crown className="h-5 w-5 mr-2" />
                  Men's Heritage Collection
                </Button>
              </Link>
            </div>

            {/* Quick Categories */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/categories/fashion-textiles/traditional/womens#chitenge" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <Palette className="h-6 w-6 text-yellow-300 mb-2" />
                  <h3 className="text-white font-semibold">Chitenge Fabrics</h3>
                  <p className="text-orange-200 text-sm">Traditional Wraps</p>
                </div>
              </Link>
              <Link href="/categories/fashion-textiles/traditional/kids" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <Baby className="h-6 w-6 text-yellow-300 mb-2" />
                  <h3 className="text-white font-semibold">Kids Heritage</h3>
                  <p className="text-orange-200 text-sm">Cultural Learning</p>
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
                src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=700&fit=crop"
                alt="Traditional Zambian Fashion"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent rounded-2xl" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-6 right-6"
              >
                <Badge className="bg-yellow-500 text-orange-900">
                  <Star className="h-3 w-3 mr-1" />
                  Heritage Collection
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
              <div className="text-orange-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
