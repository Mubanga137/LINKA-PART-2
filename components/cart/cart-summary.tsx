"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Tag, Truck, Shield, CreditCard, ArrowRight } from "lucide-react"

export function CartSummary() {
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const subtotal = 525
  const shipping = 25
  const discount = appliedPromo ? 50 : 0
  const total = subtotal + shipping - discount

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return

    setIsApplyingPromo(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo("WELCOME10")
    }
    setIsApplyingPromo(false)
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900">
            <ShoppingCart className="h-5 w-5 mr-2 text-blue-500" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal (3 items)</span>
            <span>ZMW {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span className="flex items-center">
              <Truck className="h-4 w-4 mr-1 text-emerald-500" />
              Shipping
            </span>
            <span>ZMW {shipping.toFixed(2)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-emerald-600">
              <span className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                Discount ({appliedPromo})
              </span>
              <span>-ZMW {discount.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold text-slate-900">
            <span>Total</span>
            <span>ZMW {total.toFixed(2)}</span>
          </div>

          {/* Promo Code */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
              <Button
                onClick={applyPromoCode}
                disabled={isApplyingPromo || !promoCode.trim()}
                variant="outline"
                className="border-slate-300 hover:bg-slate-100 bg-transparent"
              >
                {isApplyingPromo ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
            {appliedPromo && (
              <p className="text-sm text-emerald-600 font-medium">
                ✓ Promo code "{appliedPromo}" applied successfully!
              </p>
            )}
          </div>

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1 hover:scale-105 group"
          >
            <CreditCard className="h-5 w-5 mr-3 group-hover:animate-bounce" />
            Proceed to Checkout
            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust Indicators */}
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Secure 256-bit SSL encryption
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2 text-blue-500" />
              Free delivery on orders over ZMW 200
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2 text-purple-500" />
              30-day money-back guarantee
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900">Accepted Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "MTN Mobile Money", color: "from-yellow-400 to-orange-500" },
              { name: "Airtel Money", color: "from-red-500 to-pink-600" },
              { name: "Visa/Mastercard", color: "from-blue-500 to-indigo-600" },
              { name: "Bank Transfer", color: "from-green-500 to-emerald-600" },
            ].map((method, index) => (
              <div
                key={index}
                className={`p-3 bg-gradient-to-r ${method.color} rounded-lg text-white text-center text-sm font-medium hover:scale-105 transition-transform duration-200 cursor-pointer`}
              >
                {method.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
