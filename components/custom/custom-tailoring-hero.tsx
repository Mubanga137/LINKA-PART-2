"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Scissors, Palette, Ruler, Star, Users } from "lucide-react";

const processSteps = [
  { icon: Upload, label: "Upload Design", description: "Share your vision" },
  { icon: Ruler, label: "Measurements", description: "Perfect fit guaranteed" },
  { icon: Palette, label: "Choose Materials", description: "Premium fabrics" },
  { icon: Scissors, label: "Expert Crafting", description: "Skilled tailors" }
];

const quickStats = [
  { icon: Scissors, label: "Master Tailors", value: "50+" },
  { icon: Star, label: "Success Rate", value: "99%" },
  { icon: Users, label: "Happy Clients", value: "2,500+" },
  { icon: Palette, label: "Custom Designs", value: "10,000+" }
];

export default function CustomTailoringHero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-2000" />
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
              <Badge className="bg-purple-600 text-white mb-4">
                Custom Tailoring Studio
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Bring Your
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Vision to Life
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Upload your designs, share your measurements, and work with expert tailors 
                to create perfectly fitted, one-of-a-kind garments that reflect your unique style.
              </p>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <step.icon className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="text-sm font-medium mb-1">{step.label}</div>
                  <div className="text-xs text-gray-400">{step.description}</div>
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
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Upload className="h-5 w-5 mr-2" />
                Start Custom Design
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Scissors className="h-5 w-5 mr-2" />
                View Portfolio
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
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/20">
                <img
                  src="/api/placeholder/500/500"
                  alt="Custom Tailoring Design Process"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Stats Grid */}
              <div className="absolute -top-4 -right-4 grid grid-cols-2 gap-2">
                {quickStats.slice(0, 2).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white text-gray-900 rounded-lg p-3 shadow-xl text-center"
                  >
                    <stat.icon className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                    <div className="text-lg font-bold text-purple-600">{stat.value}</div>
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
                    <stat.icon className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                    <div className="text-lg font-bold text-purple-600">{stat.value}</div>
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
