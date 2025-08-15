"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 z-10">
        {/* Tagline Bar */}
        <div className="mb-16 text-center animate-fadeInUp">
          <div
            className="inline-flex items-center rounded-full px-8 py-4 text-sm backdrop-blur-lg transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(0, 153, 204, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 153, 204, 0.15)'
            }}
          >
            <span className="mr-3 text-lg">📍</span>
            <span style={{color: '#333333'}} className="font-medium">Connecting local businesses with customers.</span>
            <Link href="/about" className="ml-4 flex items-center group transition-all duration-300" style={{color: '#0099cc'}}>
              <span className="font-semibold">Learn more</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            <div style={{color: '#0099cc'}} className="mb-2">Your Local</div>
            <div
              className="mb-2 bg-clip-text text-transparent animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #ff6600 0%, #0099cc 50%, #ff6600 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite'
              }}
            >
              E-commerce
            </div>
            <div style={{color: '#0099cc'}}>Platform</div>
          </h1>
        </div>

        {/* Subheading */}
        <div className="text-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
            style={{color: '#333333'}}
          >
            Discover amazing products from local retailers in your area. Support your
            community while enjoying fast delivery and personalized service.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Link href="/marketplace">
            <Button
              size="lg"
              className="px-10 py-5 text-xl font-bold rounded-xl border-none transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #0099cc 0%, #ff6600 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 32px rgba(0, 153, 204, 0.3)'
              }}
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Start Shopping
            </Button>
          </Link>
          <Link href="/for-retailers">
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-5 text-xl font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                border: '2px solid #0099cc',
                color: '#0099cc',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Become a Retailer
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-3 h-3 rounded-full opacity-60 animate-float" style={{backgroundColor: '#ff6600', animationDelay: '0s'}} />
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full opacity-60 animate-float" style={{backgroundColor: '#0099cc', animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-20 w-4 h-4 rounded-full opacity-60 animate-float" style={{backgroundColor: '#ff6600', animationDelay: '2s'}} />
        <div className="absolute bottom-40 right-10 w-2 h-2 rounded-full opacity-60 animate-float" style={{backgroundColor: '#0099cc', animationDelay: '3s'}} />
      </div>
    </section>
  )
})
