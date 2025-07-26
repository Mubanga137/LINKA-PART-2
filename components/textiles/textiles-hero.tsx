"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Palette, Scissors, Users, Calendar, Award } from "lucide-react";

const fabricTypes = [
  "Cotton", "Silk", "Linen", "Wool", "Denim", "Chiffon", "Lace", "Velvet"
];

const quickStats = [
  { icon: Palette, label: "Fabric Types", value: "200+" },
  { icon: Scissors, label: "Expert Tailors", value: "150+" },
  { icon: Users, label: "Happy Customers", value: "5,000+" },
  { icon: Award, label: "Quality Rating", value: "4.9/5" }
];

export default function TextilesHero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-emerald-600 text-white mb-4">
                Textiles & Fabrics
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Premium Fabrics
                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Expert Tailors
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover the finest fabrics from around the world and connect with skilled 
                tailors who bring your vision to life with precision and artistry.
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search fabrics, patterns, or tailors..."
                  className="pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-400 rounded-xl"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700">
                  Search
                </Button>
              </div>

              {/* Fabric Type Tags */}
              <div className="flex flex-wrap gap-2">
                {fabricTypes.map((type, index) => (
                  <motion.button
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white hover:bg-white/20 transition-colors"
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Palette className="h-5 w-5 mr-2" />
                Browse Fabrics
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Calendar className="h-5 w-5 mr-2" />
                Book a Tailor
              </Button>
            </motion.div>
          </div>

          {/* Hero Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/20">
                <img
                  src="/api/placeholder/500/500"
                  alt="Premium Textiles and Fabrics"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 grid grid-cols-2 gap-2">
                {quickStats.slice(0, 2).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white text-gray-900 rounded-lg p-3 shadow-xl text-center"
                  >
                    <stat.icon className="h-6 w-6 mx-auto mb-1 text-emerald-600" />
                    <div className="text-lg font-bold text-emerald-600">{stat.value}</div>
                    <div className="text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute -bottom-4 -left-4 grid grid-cols-2 gap-2">
                {quickStats.slice(2).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white text-gray-900 rounded-lg p-3 shadow-xl text-center"
                  >
                    <stat.icon className="h-6 w-6 mx-auto mb-1 text-emerald-600" />
                    <div className="text-lg font-bold text-emerald-600">{stat.value}</div>
                    <div className="text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
