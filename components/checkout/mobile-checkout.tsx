"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Phone,
  MapPin,
  Truck
} from "lucide-react"

interface CheckoutItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface MobileCheckoutProps {
  items: CheckoutItem[]
  onClose: () => void
  onUpdateQuantity: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
}

export function MobileCheckout({ items, onClose, onUpdateQuantity, onRemoveItem }: MobileCheckoutProps) {
  const [step, setStep] = useState<'cart' | 'details' | 'payment' | 'confirmation'>('cart')
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    deliveryNotes: ''
  })
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'card' | ''>('')
  const [mobileProvider, setMobileProvider] = useState<'mtn' | 'airtel' | 'zamtel' | ''>('')
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = subtotal > 200 ? 0 : 25
  const total = subtotal + deliveryFee

  const handleNext = () => {
    if (step === 'cart') setStep('details')
    else if (step === 'details') setStep('payment')
    else if (step === 'payment') processPayment()
  }

  const processPayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setStep('confirmation')
  }

  const canProceed = () => {
    if (step === 'cart') return items.length > 0
    if (step === 'details') return customerInfo.name && customerInfo.phone && customerInfo.address
    if (step === 'payment') return paymentMethod && (paymentMethod === 'card' || mobileProvider)
    return false
  }

  const renderCartStep = () => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.id}-${index}`} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h4 className="font-medium text-slate-900">{item.name}</h4>
            <p className="text-sm text-slate-500">ZMW {item.price}</p>
            {item.size && <p className="text-xs text-slate-400">Size: {item.size}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              onClick={() => onRemoveItem(index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>ZMW {subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery:</span>
          <span className={deliveryFee === 0 ? "text-green-600" : ""}>
            {deliveryFee === 0 ? "FREE" : `ZMW ${deliveryFee}`}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>ZMW {total}</span>
        </div>
      </div>
    </div>
  )

  const renderDetailsStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+260 97 123 4567"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <Label htmlFor="address">Delivery Address *</Label>
        <Input
          id="address"
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
          placeholder="Street address, house number"
        />
      </div>

      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={customerInfo.city}
          onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
          placeholder="Lusaka, Ndola, Kitwe..."
        />
      </div>

      <div>
        <Label htmlFor="notes">Delivery Notes (Optional)</Label>
        <Input
          id="notes"
          value={customerInfo.deliveryNotes}
          onChange={(e) => setCustomerInfo(prev => ({ ...prev, deliveryNotes: e.target.value }))}
          placeholder="Special instructions for delivery"
        />
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-medium text-slate-900 mb-2">Order Summary</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>{items.length} item(s)</span>
            <span>ZMW {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery to {customerInfo.city}</span>
            <span>{deliveryFee === 0 ? "FREE" : `ZMW ${deliveryFee}`}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>ZMW {total}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-slate-900 mb-4">Payment Method</h4>
        
        {/* Mobile Money */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all mb-4 ${
            paymentMethod === 'mobile' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
          }`}
          onClick={() => setPaymentMethod('mobile')}
        >
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Mobile Money</p>
              <p className="text-sm text-slate-500">MTN, Airtel, Zamtel</p>
            </div>
          </div>
          
          {paymentMethod === 'mobile' && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mtn', name: 'MTN', color: 'yellow' },
                  { id: 'airtel', name: 'Airtel', color: 'red' },
                  { id: 'zamtel', name: 'Zamtel', color: 'green' }
                ].map((provider) => (
                  <button
                    key={provider.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setMobileProvider(provider.id as any)
                    }}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      mobileProvider === provider.id 
                        ? `border-${provider.color}-500 bg-${provider.color}-50 text-${provider.color}-700`
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {provider.name}
                  </button>
                ))}
              </div>
              
              {mobileProvider && (
                <div>
                  <Label htmlFor="mobile-number">Mobile Number</Label>
                  <Input
                    id="mobile-number"
                    placeholder={`Enter your ${mobileProvider.toUpperCase()} number`}
                    value={customerInfo.phone}
                    readOnly
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Credit Card */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
          }`}
          onClick={() => setPaymentMethod('card')}
        >
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Credit/Debit Card</p>
              <p className="text-sm text-slate-500">Visa, Mastercard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderConfirmationStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Order Confirmed!</h3>
        <p className="text-slate-600">
          Your order has been successfully placed. You will receive a confirmation SMS shortly.
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 text-left">
        <h4 className="font-medium text-slate-900 mb-3">Order Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-slate-500" />
            <span>{customerInfo.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span>{customerInfo.address}, {customerInfo.city}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4 text-slate-500" />
            <span>Delivery in 2-3 business days</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-left">
            <p className="text-sm text-blue-800">
              <strong>Payment Instructions:</strong> You will receive a {mobileProvider?.toUpperCase()} prompt 
              on your phone to complete the payment of ZMW {total}. Please approve the transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={step === 'confirmation' ? onClose : undefined}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  {step === 'cart' && 'Shopping Cart'}
                  {step === 'details' && 'Delivery Details'}
                  {step === 'payment' && 'Payment'}
                  {step === 'confirmation' && 'Order Confirmed'}
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Progress Indicator */}
            {step !== 'confirmation' && (
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  {['cart', 'details', 'payment'].map((s, index) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === s ? 'bg-blue-600 text-white' : 
                        ['cart', 'details', 'payment'].indexOf(step) > index ? 'bg-green-600 text-white' : 
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                      {index < 2 && <div className="w-12 h-px bg-slate-200 mx-2" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 'cart' && renderCartStep()}
              {step === 'details' && renderDetailsStep()}
              {step === 'payment' && renderPaymentStep()}
              {step === 'confirmation' && renderConfirmationStep()}
            </div>

            {/* Footer */}
            {step !== 'confirmation' && (
              <div className="p-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (step === 'details') setStep('cart')
                      else if (step === 'payment') setStep('details')
                    }}
                    disabled={step === 'cart'}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed() || isProcessing}
                    className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
                  >
                    {isProcessing ? 'Processing...' : 
                     step === 'cart' ? 'Continue' :
                     step === 'details' ? 'Continue to Payment' :
                     'Complete Order'}
                  </Button>
                </div>
                
                {step === 'cart' && deliveryFee === 0 && (
                  <div className="flex items-center justify-center text-sm text-green-600">
                    <Truck className="h-4 w-4 mr-1" />
                    Free delivery on orders over ZMW 200
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
