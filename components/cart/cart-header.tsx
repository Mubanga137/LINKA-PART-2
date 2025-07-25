"use client"

import { useState } from "react"
import { ShoppingCart, ArrowLeft, Shield, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CartHeader() {
  const [itemCount, setItemCount] = useState(3)

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/shop">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center text-slate-600">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-in">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Shopping <span className="text-blue-600">Cart</span>
              </h1>
              <p className="text-lg text-slate-600">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-600">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2 text-emerald-500" />
              Free delivery over ZMW 200
            </div>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
              Secure payment
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-purple-500" />
              30-day returns
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
