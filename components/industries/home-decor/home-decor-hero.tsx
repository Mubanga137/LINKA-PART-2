"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Palette } from "lucide-react"

export function HomeDecorHero() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-2 h-2 bg-pink-400/40 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-5 h-5 bg-orange-400/15 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 opacity-60"></div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-8">
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Services</span>
            <span>/</span>
            <span className="text-blue-600 font-medium">Home & Decor</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Living Space
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Complete home and living solutions in Zambia. From furniture and decor to interior design and smart home
            automation - everything you need to create your perfect space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group"
            >
              <Home className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg group bg-transparent"
            >
              <Palette className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Design Services
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="text-center group">
            <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">950+</div>
            <div className="text-slate-600">Products Available</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">34</div>
            <div className="text-slate-600">Verified Retailers</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform">
              ZMW 340K
            </div>
            <div className="text-slate-600">Monthly Sales</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">
              4.6★
            </div>
            <div className="text-slate-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
