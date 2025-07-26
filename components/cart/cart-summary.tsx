"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Tag, Shield, CreditCard, ArrowRight } from "lucide-react"
import { CartItem } from "@/contexts/cart-context"

interface CartSummaryProps {
  items: CartItem[]
  totalPrice: number
  onProceedToCheckout: () => void
}

const COUPON_CODES = {
  'WELCOME10': { discount: 0.1, description: '10% off your first order' },
  'SAVE20': { discount: 0.2, description: '20% off orders over ZMW 500' },
  'FREESHIP': { discount: 0, description: 'Free shipping', freeShipping: true },
}

export function CartSummary({ items, totalPrice, onProceedToCheckout }: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState("")

  // Calculate shipping
  const shippingCost = items.reduce((total, item) => {
    if (item.product.shippingInfo.freeShipping) return total
    return total + item.product.shippingInfo.shippingCost
  }, 0)

  // Calculate taxes (16% VAT for Zambia)
  const taxRate = 0.16
  const taxAmount = totalPrice * taxRate

  // Calculate discount
  let discountAmount = 0
  let freeShippingApplied = false
  
  if (appliedCoupon && COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES]) {
    const coupon = COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES]
    if (coupon.freeShipping) {
      freeShippingApplied = true
    } else {
      discountAmount = totalPrice * coupon.discount
    }
  }

  const finalShippingCost = freeShippingApplied ? 0 : shippingCost
  const finalTotal = totalPrice - discountAmount + finalShippingCost + taxAmount

  const applyCoupon = () => {
    setCouponError("")
    
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code")
      return
    }

    const upperCouponCode = couponCode.trim().toUpperCase()
    
    if (COUPON_CODES[upperCouponCode as keyof typeof COUPON_CODES]) {
      const coupon = COUPON_CODES[upperCouponCode as keyof typeof COUPON_CODES]
      
      // Check minimum order requirement for SAVE20
      if (upperCouponCode === 'SAVE20' && totalPrice < 500) {
        setCouponError("This coupon requires a minimum order of ZMW 500")
        return
      }
      
      setAppliedCoupon(upperCouponCode)
      setCouponCode("")
    } else {
      setCouponError("Invalid coupon code")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError("")
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/30 sticky top-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Order details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Subtotal ({items.length} items)</span>
            <span className="font-medium">ZMW {totalPrice.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Shipping</span>
            <span className="font-medium">
              {finalShippingCost === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `ZMW ${finalShippingCost.toLocaleString()}`
              )}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">VAT (16%)</span>
            <span className="font-medium">ZMW {taxAmount.toLocaleString()}</span>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Discount ({appliedCoupon})</span>
              <span className="font-medium text-green-600">
                -ZMW {discountAmount.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-emerald-600">ZMW {finalTotal.toLocaleString()}</span>
        </div>

        {/* Coupon code */}
        <div className="space-y-3">
          <Label htmlFor="coupon">Coupon Code</Label>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-green-600 mr-2" />
                <div>
                  <div className="font-medium text-green-900">{appliedCoupon}</div>
                  <div className="text-xs text-green-700">
                    {COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES].description}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeCoupon}>
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                />
                <Button variant="outline" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>
              {couponError && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {couponError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Available coupons hint */}
        {!appliedCoupon && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Available Coupons:</div>
            <div className="space-y-1 text-xs text-slate-600">
              <div>• WELCOME10 - 10% off first order</div>
              <div>• SAVE20 - 20% off orders over ZMW 500</div>
              <div>• FREESHIP - Free shipping</div>
            </div>
          </div>
        )}

        <Separator />

        {/* Security badge */}
        <div className="flex items-center justify-center text-sm text-slate-600">
          <Shield className="h-4 w-4 mr-2" />
          <span>Secure & encrypted checkout</span>
        </div>

        {/* Checkout button */}
        <Button 
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
          size="lg"
          onClick={onProceedToCheckout}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Proceed to Checkout
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>

        {/* Payment methods */}
        <div className="text-center">
          <div className="text-sm text-slate-600 mb-2">We accept</div>
          <div className="flex items-center justify-center space-x-2">
            <Badge variant="outline" className="text-xs">MTN Mobile Money</Badge>
            <Badge variant="outline" className="text-xs">Airtel Money</Badge>
            <Badge variant="outline" className="text-xs">Zamtel Kwacha</Badge>
          </div>
        </div>

        {/* Estimated delivery */}
        <div className="text-center text-sm text-slate-600">
          <div className="font-medium">Estimated Delivery</div>
          <div>
            {Math.min(...items.map(item => item.product.shippingInfo.estimatedDays))} - {" "}
            {Math.max(...items.map(item => item.product.shippingInfo.estimatedDays))} business days
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
