"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react"

// Optimized floating particles with orange and blue colors
function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: (i * 15) + Math.random() * 15,
    y: (i * 12) + Math.random() * 20,
    delay: i * 0.3,
    color: i % 2 === 0 ? 'bg-orange-400/20' : 'bg-blue-400/20',
    size: i % 3 === 0 ? 'w-3 h-3' : 'w-2 h-2',
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${particle.color} ${particle.size} rounded-full animate-bounce`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + (i * 0.2)}s`,
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-300/5 to-blue-300/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Banner with Animation */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm text-gray-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
            Connecting local businesses with customers.
            <Link href="/about" className="ml-3 text-blue-600 hover:text-blue-700 font-medium flex items-center group">
              Learn more
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="text-slate-900">
              Your Local
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              E-commerce
            </span>
            <br />
            <span className="text-slate-900">
              Platform
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Discover amazing products from local retailers in your area. Support your community while enjoying fast
            delivery and personalized service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-14 md:mb-16 px-4">
            <Link href="/marketplace">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-200 group w-full sm:w-auto transform hover:-translate-y-1 hover:scale-105"
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
            <Link href="/for-retailers">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg bg-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-200 group w-full sm:w-auto transform hover:-translate-y-1 hover:scale-105"
              >
                Become a Retailer
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
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
