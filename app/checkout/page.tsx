"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  CreditCard,
  MapPin,
  Phone,
  User,
  Lock,
  Shield,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"
import { useCart } from "@/contexts/marketplace-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

interface ShippingAddress {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  province: string
  postalCode: string
  specialInstructions: string
}

interface PaymentMethod {
  type: 'mtn' | 'airtel' | 'zamtel'
  phoneNumber: string
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    province: 'Lusaka',
    postalCode: '',
    specialInstructions: ''
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'mtn',
    phoneNumber: ''
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.push('/cart')
    }
  }, [items.length, orderPlaced, router])

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout')
    }
  }, [user, router])

  // Calculate totals
  const shippingCost = items.reduce((total, item) => {
    return total + (item.product.shippingInfo.freeShipping ? 0 : item.product.shippingInfo.shippingCost)
  }, 0)
  const taxAmount = totalPrice * 0.16 // 16% VAT
  const finalTotal = totalPrice + shippingCost + taxAmount

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!shippingAddress.fullName) newErrors.fullName = 'Full name is required'
      if (!shippingAddress.phone) newErrors.phone = 'Phone number is required'
      if (!shippingAddress.email) newErrors.email = 'Email is required'
      if (!shippingAddress.address) newErrors.address = 'Address is required'
      if (!shippingAddress.city) newErrors.city = 'City is required'
      if (!shippingAddress.province) newErrors.province = 'Province is required'
    }

    if (step === 2) {
      if (!paymentMethod.phoneNumber) newErrors.phoneNumber = 'Mobile money number is required'
      if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) return

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Generate order ID
      const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      setOrderId(newOrderId)

      // Clear cart
      clearCart()

      // Show success
      setOrderPlaced(true)
      setCurrentStep(3)
    } catch (error) {
      setErrors({ payment: 'Payment failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  const provinces = [
    'Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka',
    'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'
  ]

  if (!user || items.length === 0 && !orderPlaced) {
    return null
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
        <Header />
        <main className="py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="mb-8">
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
              <p className="text-xl text-slate-600 mb-8">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Order ID:</span>
                    <span className="font-mono font-bold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Amount:</span>
                    <span className="font-bold text-green-600">ZMW {finalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payment Method:</span>
                    <span className="capitalize">{paymentMethod.type} Mobile Money</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Delivery Address:</span>
                    <span className="text-right">{shippingAddress.address}, {shippingAddress.city}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/orders">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                  Track Your Order
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Header />
      
      <main className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 ${
                    currentStep >= step ? 'text-emerald-600' : 'text-slate-600'
                  }`}>
                    {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Confirmation'}
                  </span>
                  {step < 3 && <div className="w-16 h-0.5 bg-slate-200 ml-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={shippingAddress.fullName}
                          onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                          className={errors.fullName ? 'border-red-500' : ''}
                        />
                        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        className={errors.address ? 'border-red-500' : ''}
                      />
                      {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="province">Province *</Label>
                        <select
                          id="province"
                          value={shippingAddress.province}
                          onChange={(e) => setShippingAddress({...shippingAddress, province: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          {provinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="instructions">Special Delivery Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={shippingAddress.specialInstructions}
                        onChange={(e) => setShippingAddress({...shippingAddress, specialInstructions: e.target.value})}
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleNextStep} className="bg-emerald-600 hover:bg-emerald-700">
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={paymentMethod.type}
                      onValueChange={(value) => setPaymentMethod({...paymentMethod, type: value as PaymentMethod['type']})}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="mtn" id="mtn" />
                          <Label htmlFor="mtn" className="flex items-center space-x-3 cursor-pointer">
                            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">MTN</span>
                            </div>
                            <span>MTN Mobile Money</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="airtel" id="airtel" />
                          <Label htmlFor="airtel" className="flex items-center space-x-3 cursor-pointer">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">AT</span>
                            </div>
                            <span>Airtel Money</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="zamtel" id="zamtel" />
                          <Label htmlFor="zamtel" className="flex items-center space-x-3 cursor-pointer">
                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">ZK</span>
                            </div>
                            <span>Zamtel Kwacha</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div>
                      <Label htmlFor="mobileNumber">Mobile Money Number *</Label>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        placeholder="+260 97 123-4567"
                        value={paymentMethod.phoneNumber}
                        onChange={(e) => setPaymentMethod({...paymentMethod, phoneNumber: e.target.value})}
                        className={errors.phoneNumber ? 'border-red-500' : ''}
                      />
                      {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        You will receive a payment prompt on your mobile phone to complete the transaction.
                      </AlertDescription>
                    </Alert>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={setAgreedToTerms}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-emerald-600 hover:underline">
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-emerald-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                    {errors.payment && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.payment}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Shipping
                      </Button>
                      <Button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Place Order - ZMW {finalTotal.toLocaleString()}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order summary */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm border-white/30 sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm line-clamp-2">{item.product.name}</div>
                          <div className="text-sm text-slate-600">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-medium">
                          ZMW {(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>ZMW {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>ZMW {shippingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>VAT (16%)</span>
                      <span>ZMW {taxAmount.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-emerald-600">ZMW {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
