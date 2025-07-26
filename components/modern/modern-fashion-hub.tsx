"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, TrendingUp, Users, Award } from "lucide-react";
import Link from "next/link";

const quickSearchTags = [
  "Business Casual", "Streetwear", "Formal Wear", "Athleisure", "Smart Casual",
  "Evening Wear", "Denim", "Sneakers", "Blazers", "Designer"
];

const featuredCategories = [
  {
    title: "Men's Modern",
    description: "Contemporary styles for the modern gentleman",
    items: "450+ items",
    image: "/api/placeholder/300/200",
    href: "/categories/fashion-textiles/modern/mens"
  },
  {
    title: "Women's Modern",
    description: "Chic and sophisticated fashion forward pieces",
    items: "680+ items",
    image: "/api/placeholder/300/200",
    href: "/categories/fashion-textiles/modern/womens"
  },
  {
    title: "Kids Modern",
    description: "Trendy styles for the next generation",
    items: "320+ items",
    image: "/api/placeholder/300/200",
    href: "/categories/fashion-textiles/modern/kids"
  }
];

export default function ModernFashionHub() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-blue-400" />
            <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
              Modern Fashion
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Contemporary
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Style Hub
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover cutting-edge fashion, contemporary designs, and urban streetwear 
            that defines modern Zambian style and global trends
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-white">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <span className="text-2xl font-bold">1,450+</span>
              <span className="text-gray-300">Modern Pieces</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Users className="h-6 w-6 text-purple-400" />
              <span className="text-2xl font-bold">250+</span>
              <span className="text-gray-300">Fashion Brands</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award className="h-6 w-6 text-cyan-400" />
              <span className="text-2xl font-bold">98%</span>
              <span className="text-gray-300">Customer Satisfaction</span>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <Input
              placeholder="Search modern fashion, brands, styles..."
              className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-400 rounded-xl"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {quickSearchTags.map((tag, index) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-video relative">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-blue-600 text-white mb-2">
                        {category.items}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
