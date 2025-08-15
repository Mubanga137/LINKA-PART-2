"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Soft floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-200/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-200/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Top Tagline */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm text-gray-600 shadow-lg">
            <span className="text-blue-500 mr-2">✨</span>
            Connecting local businesses with customers.
            <Link href="/about" className="ml-3 text-teal-600 hover:text-teal-700 font-medium flex items-center group">
              Learn more
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <div className="text-black">Your Local</div>
            <div className="bg-gradient-to-r from-orange-500 via-amber-600 to-teal-600 bg-clip-text text-transparent">
              E-commerce
            </div>
            <div className="text-black">Platform</div>
          </h1>
        </div>

        {/* Subheading */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover amazing products from local retailers in your area. Support your
            community while enjoying fast delivery and personalized service.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/marketplace">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-teal-600 hover:from-orange-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </Link>
          <Link href="/for-retailers">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 text-teal-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Become a Retailer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
})
