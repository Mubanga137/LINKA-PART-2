"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingBag } from "lucide-react"

export default function KidsAccessoriesHero() {
  return (
    <div className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 py-20">
      <div className="absolute inset-0 bg-white/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-pink-500 text-white">
            Kids Collection
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Kids Accessories
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover adorable accessories for children including bags, jewelry, hats, and more. 
            Safe, stylish, and designed just for kids.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5 mr-2" />
              View Favorites
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-8 gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.8/5 Rating</span>
            </div>
            <div>500+ Products</div>
            <div>Free Shipping</div>
          </div>
        </div>
      </div>
    </div>
  )
}
