"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react"

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl transition-all duration-1000 ease-out animate-pulse-slow"
          style={{
            top: `${20 + mousePosition.y * 0.1}%`,
            left: `${25 + mousePosition.x * 0.05}%`,
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-3xl transition-all duration-1000 ease-out animate-pulse-slow"
          style={{
            bottom: `${20 + mousePosition.y * 0.08}%`,
            right: `${25 + mousePosition.x * 0.06}%`,
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-2xl transition-all duration-700 ease-out animate-bounce-slow"
          style={{
            top: `${60 + mousePosition.y * 0.03}%`,
            right: `${40 + mousePosition.x * 0.04}%`,
            animationDelay: "1s",
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Banner with Animation */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-sm px-6 py-3 text-sm text-slate-700 shadow-lg shadow-slate-900/5 border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <Sparkles className="mr-2 h-4 w-4 text-indigo-500 animate-spin-slow" />
            Connecting local businesses with customers.
            <button className="ml-3 text-indigo-600 hover:text-indigo-700 font-medium flex items-center group">
              Learn more
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent animate-gradient-x">
              Your Local
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
              E-commerce
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient-x">
              Platform
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Discover amazing products from local retailers in your area. Support your community while enjoying fast
            delivery and personalized service.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 hover:scale-105 group animate-bounce-in"
            >
              <ShoppingBag className="mr-3 h-5 w-5 group-hover:animate-bounce" />
              Start Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-10 py-4 text-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:scale-105 group animate-bounce-in"
              style={{ animationDelay: "0.2s" }}
            >
              Become a Retailer
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "150+", label: "Local Retailers", icon: "🏪" },
              { number: "50K+", label: "Happy Customers", icon: "😊" },
              { number: "25+", label: "Delivery Areas", icon: "🚚" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-white/20 hover:shadow-xl hover:bg-white/80 hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                  <div className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Elements */}
        <div className="absolute top-1/4 left-10 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
            <Star className="h-8 w-8 text-white animate-spin-slow" />
          </div>
        </div>

        <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
