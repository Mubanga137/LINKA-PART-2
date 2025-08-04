"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star, Gift, Truck } from "lucide-react"

export default function AccessoriesCTA() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Gift className="h-4 w-4 mr-1" />
            Special Offer
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Your Style Journey
          </h2>
          
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered their perfect accessories. 
            Shop now and enjoy exclusive benefits with every purchase.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
              Browse Categories
            </Button>
          </div>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-white/80 text-sm">
                Free delivery on orders over ZMW 200
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-white/80 text-sm">
                Carefully curated accessories from trusted brands
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-white/80 text-sm">
                30-day hassle-free return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
