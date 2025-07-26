"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Baby, Smile, Heart, Star, Filter, Grid3X3 } from "lucide-react";

const quickCategories = [
  { icon: Baby, label: "Toddlers", count: "80+" },
  { icon: Smile, label: "School Age", count: "120+" },
  { icon: Heart, label: "Playwear", count: "95+" },
  { icon: Star, label: "Special", count: "45+" }
];

export default function KidsModernHero() {
  return (
    <section className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={"absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"} />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-yellow-600 text-white mb-4">
                Kids Modern Fashion
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Fun & Stylish
                <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Kids Fashion
                </span>
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Discover playful, comfortable, and trendy fashion for your little ones. 
                From everyday wear to special occasions, we've got it all!
              </p>
            </motion.div>

            {/* Quick Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {quickCategories.map((category, index) => (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <category.icon className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
                  <div className="text-sm font-medium">{category.label}</div>
                  <div className="text-xs text-gray-200">{category.count}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                <Grid3X3 className="h-5 w-5 mr-2" />
                Shop Kids Collection
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Filter className="h-5 w-5 mr-2" />
                Filter by Age
              </Button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-white/20">
                <img
                  src="/api/placeholder/500/500"
                  alt="Modern Kids Fashion"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-lg p-4 shadow-xl">
                <div className="text-2xl font-bold text-yellow-600">320+</div>
                <div className="text-sm">Kids Styles</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 rounded-lg p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-bold">4.8</span>
                </div>
                <div className="text-sm">Parent Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
