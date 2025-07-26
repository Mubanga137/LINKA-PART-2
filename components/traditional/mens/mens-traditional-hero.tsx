"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Crown,
  Star,
  Heart,
  Shirt,
  Palette
} from "lucide-react"

export function MensTraditionalHero() {
  const stats = [
    { label: "Traditional Items", value: "85+", icon: Shirt },
    { label: "Cultural Patterns", value: "15+", icon: Palette },
    { label: "Regions Represented", value: "8+", icon: Crown },
    { label: "Customer Rating", value: "4.8", icon: Star },
  ]

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-16 right-16 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-white/10 text-white border-white/20 mb-6">
              <Users className="h-4 w-4 mr-2" />
              Men's Traditional Fashion
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Distinguished
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-white bg-clip-text text-transparent">
                Heritage Style
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Embrace the rich cultural heritage of Zambia with our authentic men's traditional wear. 
              From ceremonial attire to contemporary African prints, discover pieces that honor our traditions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-50">
                <Crown className="h-5 w-5 mr-2" />
                Browse Collection
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Heart className="h-5 w-5 mr-2" />
                View Favorites
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
