"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Tagline Bar - exact as reference */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm shadow-lg" style={{boxShadow: '0 8px 16px rgba(230, 230, 230, 0.4)'}}>
            <span className="mr-2" style={{color: '#007C91'}}>📍</span>
            <span style={{color: '#4A4A4A'}}>Connecting local businesses with customers.</span>
            <Link href="/about" className="ml-3 flex items-center group" style={{color: '#007C91'}}>
              <span className="font-medium">Learn more</span>
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Main Heading - exact gradient as specified */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <div style={{color: '#000000'}}>Your Local</div>
            <div style={{
              background: 'linear-gradient(to right, #F7931E 0%, #A77444 50%, #007C91 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              E-commerce
            </div>
            <div style={{color: '#000000'}}>Platform</div>
          </h1>
        </div>

        {/* Subheading - exact as reference */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{color: '#4A4A4A'}}>
            Discover amazing products from local retailers in your area. Support your
            community while enjoying fast delivery and personalized service.
          </p>
        </div>

        {/* Buttons - exact as reference */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/marketplace">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-bold rounded-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(to right, #F7931E, #007C91)',
                color: '#FFFFFF',
                border: 'none'
              }}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </Link>
          <Link href="/for-retailers">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-medium rounded-lg bg-white transition-all duration-200"
              style={{
                border: '1px solid #E0E0E0',
                color: '#007C91',
                backgroundColor: '#FFFFFF'
              }}
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
