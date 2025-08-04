"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingBag, Sparkles } from "lucide-react"

export default function AccessoriesHub() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-20">
      <div className="absolute inset-0 bg-white/60" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-indigo-600 text-white">
            <Sparkles className="h-4 w-4 mr-1" />
            Complete Collection
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Fashion Accessories
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete your look with our curated collection of fashion accessories. 
            From elegant jewelry to practical bags, find everything you need to express your style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shop All Accessories
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5 mr-2" />
              View Trending
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-8 gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.8/5 Customer Rating</span>
            </div>
            <div>2500+ Products</div>
            <div>Free Shipping Over ZMW 200</div>
            <div>30-Day Returns</div>
          </div>
        </div>
      </div>
    </div>
  )
}
