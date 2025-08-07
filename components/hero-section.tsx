"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react"

// Optimized floating particles with reduced count
function FloatingParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: (i * 20) + Math.random() * 10,
    y: (i * 15) + Math.random() * 10,
    delay: i * 0.5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-indigo-400/30 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export const HeroSection = memo(function HeroSection() {
  // Removed mouse tracking for better performance

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Banner with Animation */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-sm px-6 py-3 text-sm text-slate-700 shadow-lg shadow-slate-900/5 border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
            Connecting local businesses with customers.
            <button className="ml-3 text-indigo-600 hover:text-indigo-700 font-medium flex items-center group">
              Learn more
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="text-slate-900">
              Your Local
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              E-commerce
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Discover amazing products from local retailers in your area. Support your community while enjoying fast
            delivery and personalized service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-14 md:mb-16 px-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 group w-full sm:w-auto"
            >
              <ShoppingBag className="mr-3 h-5 w-5" />
              Start Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg bg-white shadow-lg hover:shadow-xl transition-all duration-200 group w-full sm:w-auto"
            >
              Become a Retailer
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
            {[
              { number: "150+", label: "Local Retailers", icon: "🏪" },
              { number: "50K+", label: "Happy Customers", icon: "😊" },
              { number: "25+", label: "Delivery Areas", icon: "🚚" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">{stat.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
})
