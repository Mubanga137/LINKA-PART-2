"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

const industries = [
  "Traditional Crafts",
  "Fashion & Textiles",
  "Food & Beverages",
  "Home & Decor",
  "Jewelry & Accessories",
  "Art & Culture",
]

export function IndustriesHeroSection() {
  const [currentIndustry, setCurrentIndustry] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentIndustry((prev) => (prev + 1) % industries.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isClient])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-sm px-6 py-3 text-sm text-slate-700 shadow-lg shadow-slate-900/5 border border-white/20 mb-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Sparkles className="mr-2 h-4 w-4 text-purple-500 animate-spin-slow" />
            Empowering Zambian Services
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Connecting
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x min-h-[1.2em] inline-block">
              {isClient ? industries[currentIndustry] : industries[0]}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              to Customers
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover how Linka supports diverse services across Zambia, from traditional crafts to modern retail,
            helping businesses thrive in the digital marketplace.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/for-retailers">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1 hover:scale-105 group"
              >
                <TrendingUp className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                Explore Services
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-10 py-4 text-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:scale-105"
              >
                Success Stories
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Industry Indicators */}
          <div className="flex justify-center space-x-2">
            {industries.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndustry ? "w-8 bg-purple-500" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                onClick={() => setCurrentIndustry(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
