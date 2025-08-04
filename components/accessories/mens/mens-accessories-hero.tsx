"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, ShoppingBag } from "lucide-react"

export default function MensAccessoriesHero() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-600 text-white">
            Men's Collection
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Men's Accessories
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Elevate your style with our premium collection of men's accessories. 
            From watches to wallets, find everything you need to complete your look.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Clock className="h-5 w-5 mr-2" />
              New Arrivals
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-8 gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.7/5 Rating</span>
            </div>
            <div>1000+ Products</div>
            <div>Free Shipping</div>
            <div>Premium Quality</div>
          </div>
        </div>
      </div>
    </div>
  )
}
