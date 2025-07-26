"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  User
} from "lucide-react"

interface BookingFormProps {
  serviceName: string
  providerName: string
  basePrice: number
  onBookingComplete: () => void
}

interface BookingData {
  customerName: string
  customerEmail: string
  customerPhone: string
  preferredDate: string
  preferredTime: string
  requirements: string
  paymentMethod: string
}

export function BookingForm({ serviceName, providerName, basePrice, onBookingComplete }: BookingFormProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details')
  const [bookingData, setBookingData] = useState<BookingData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    preferredDate: '',
    preferredTime: '',
    requirements: '',
    paymentMethod: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === 'details') {
      setStep('payment')
    } else if (step === 'payment') {
      processPayment()
    }
  }

  const processPayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setStep('confirmation')
    
    // Call completion callback after a delay
    setTimeout(() => {
      onBookingComplete()
    }, 3000)
  }

  const canProceed = () => {
    if (step === 'details') {
      return bookingData.customerName && 
             bookingData.customerEmail && 
             bookingData.customerPhone && 
             bookingData.preferredDate
    }
    if (step === 'payment') {
      return bookingData.paymentMethod
    }
    return false
  }

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={bookingData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Enter your full name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={bookingData.customerEmail}
              onChange={(e) => handleInputChange('customerEmail', e.target.value)}
              placeholder="your.email@example.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={bookingData.customerPhone}
              onChange={(e) => handleInputChange('customerPhone', e.target.value)}
              placeholder="+260 97 123 4567"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="date">Preferred Date *</Label>
            <Input
              id="date"
              type="date"
              value={bookingData.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="time">Preferred Time</Label>
        <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select preferred time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="09:00">9:00 AM</SelectItem>
            <SelectItem value="10:00">10:00 AM</SelectItem>
            <SelectItem value="11:00">11:00 AM</SelectItem>
            <SelectItem value="14:00">2:00 PM</SelectItem>
            <SelectItem value="15:00">3:00 PM</SelectItem>
            <SelectItem value="16:00">4:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="requirements">Special Requirements</Label>
        <Textarea
          id="requirements"
          value={bookingData.requirements}
          onChange={(e) => handleInputChange('requirements', e.target.value)}
          placeholder="Any specific requirements or details about your project..."
          className="mt-1"
          rows={4}
        />
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Information</h3>
        
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-slate-900 mb-2">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Service:</span>
              <span>{serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span>Provider:</span>
              <span>{providerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{bookingData.preferredDate} at {bookingData.preferredTime || 'TBD'}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total Amount:</span>
              <span>ZMW {basePrice}</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Payment Method</Label>
          <div className="grid grid-cols-1 gap-3 mt-2">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                bookingData.paymentMethod === 'mobile' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'
              }`}
              onClick={() => handleInputChange('paymentMethod', 'mobile')}
            >
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium">Mobile Money</p>
                  <p className="text-sm text-slate-500">MTN, Airtel, Zamtel</p>
                </div>
              </div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                bookingData.paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'
              }`}
              onClick={() => handleInputChange('paymentMethod', 'card')}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-slate-500">Visa, Mastercard, Verve</p>
                </div>
              </div>
            </div>

            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                bookingData.paymentMethod === 'bank' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'
              }`}
              onClick={() => handleInputChange('paymentMethod', 'bank')}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-slate-500">Direct bank transfer</p>
                </div>
              </div>
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
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Booking Confirmed!</h3>
        <p className="text-slate-600">
          Your booking has been successfully confirmed. You will receive a confirmation email shortly.
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 text-left">
        <h4 className="font-medium text-slate-900 mb-3">Booking Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-slate-500" />
            <span>{bookingData.customerName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-slate-500" />
            <span>{bookingData.customerEmail}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span>{bookingData.preferredDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <span>{bookingData.preferredTime || 'TBD'}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-left">
            <p className="text-sm text-blue-800">
              <strong>Next Steps:</strong> {providerName} will contact you within 24 hours to confirm 
              the appointment details and discuss your requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Book {serviceName}</span>
          <Badge variant="outline">
            Step {step === 'details' ? '1' : step === 'payment' ? '2' : '3'} of 3
          </Badge>
        </CardTitle>
        <CardDescription>with {providerName}</CardDescription>
      </CardHeader>

      <CardContent>
        {step === 'details' && renderDetailsStep()}
        {step === 'payment' && renderPaymentStep()}
        {step === 'confirmation' && renderConfirmationStep()}
      </CardContent>

      {step !== 'confirmation' && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setStep(step === 'payment' ? 'details' : 'details')}
            disabled={step === 'details'}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!canProceed() || isProcessing}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isProcessing ? 'Processing...' : step === 'details' ? 'Continue to Payment' : 'Confirm Booking'}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
