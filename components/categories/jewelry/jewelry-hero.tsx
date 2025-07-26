"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Diamond,
  Star,
  TrendingUp,
  Users,
  Gift,
  Sparkles,
  ArrowRight,
  Heart,
} from "lucide-react"

const heroSlides = [
  {
    title: "Authentic Zambian Jewelry",
    subtitle: "Handcrafted Treasures",
    description: "Discover beautiful copper jewelry, traditional beadwork, and contemporary designs from talented Zambian artisans.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Shop Collection",
    badge: "New Arrivals",
  },
  {
    title: "Traditional Copper Craft",
    subtitle: "Heritage Collection",
    description: "Elegant copper wire jewelry showcasing centuries-old Zambian craftsmanship traditions.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Explore Heritage",
    badge: "Handmade",
  },
  {
    title: "Modern African Elegance",
    subtitle: "Contemporary Designs",
    description: "Contemporary jewelry pieces that blend African aesthetics with modern fashion sensibilities.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Shop Modern",
    badge: "Trending",
  },
]

const quickStats = [
  { icon: Diamond, label: "Unique Pieces", value: "500+", color: "emerald" },
  { icon: Users, label: "Local Artisans", value: "85", color: "blue" },
  { icon: Star, label: "Avg Rating", value: "4.8", color: "yellow" },
  { icon: Gift, label: "Gift Wrapped", value: "Free", color: "purple" },
]

export function JewelryHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 text-amber-700 border border-amber-200/50 mb-8">
              <Sparkles className="mr-2 h-5 w-5 text-amber-600 animate-pulse" />
              <span className="text-sm font-medium">{slide.badge}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {slide.title}
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {slide.subtitle}
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5"
              >
                <Diamond className="mr-3 h-5 w-5" />
                {slide.cta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-8 py-4 text-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Custom Orders
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-96 object-cover rounded-2xl"
              />
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-slate-700">Most Loved</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">Trending Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-12">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-amber-500 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
