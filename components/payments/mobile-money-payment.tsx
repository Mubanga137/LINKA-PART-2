"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Phone,
  Shield,
  Check,
  Clock,
  AlertCircle,
  Smartphone,
  CreditCard,
  Banknote,
  Zap,
  Globe,
  Users,
  Star,
  Lock,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  XCircle
} from "lucide-react"

interface MobileMoneyProvider {
  id: string
  name: string
  logo: string
  color: string
  bgColor: string
  borderColor: string
  countries: string[]
  prefixes: string[]
  fee: number
  processingTime: string
  isPopular?: boolean
  isRecommended?: boolean
}

const MOBILE_MONEY_PROVIDERS: MobileMoneyProvider[] = [
  {
    id: "mpesa",
    name: "M-Pesa",
    logo: "🇰🇪",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    countries: ["Kenya", "Tanzania", "Mozambique"],
    prefixes: ["254", "255", "258"],
    fee: 0,
    processingTime: "Instant",
    isPopular: true,
    isRecommended: true
  },
  {
    id: "airtel",
    name: "Airtel Money",
    logo: "📱",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    countries: ["Kenya", "Uganda", "Tanzania", "Rwanda"],
    prefixes: ["254", "256", "255", "250"],
    fee: 0.5,
    processingTime: "1-2 minutes",
    isPopular: true
  },
  {
    id: "tkash",
    name: "T-Kash",
    logo: "💰",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    countries: ["Kenya"],
    prefixes: ["254"],
    fee: 0.3,
    processingTime: "1-3 minutes"
  },
  {
    id: "orange",
    name: "Orange Money",
    logo: "🧡",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    countries: ["Cameroon", "Ivory Coast", "Senegal"],
    prefixes: ["237", "225", "221"],
    fee: 1.0,
    processingTime: "2-5 minutes"
  },
  {
    id: "mtn",
    name: "MTN Mobile Money",
    logo: "📞",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    countries: ["Uganda", "Ghana", "Rwanda", "Cameroon"],
    prefixes: ["256", "233", "250", "237"],
    fee: 0.8,
    processingTime: "1-3 minutes",
    isPopular: true
  },
  {
    id: "wave",
    name: "Wave",
    logo: "🌊",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    countries: ["Senegal", "Ivory Coast", "Mali"],
    prefixes: ["221", "225", "223"],
    fee: 0,
    processingTime: "Instant",
    isRecommended: true
  }
]

interface MobileMoneyPaymentProps {
  amount: number
  currency?: string
  onPaymentSuccess: (paymentData: any) => void
  onPaymentError: (error: string) => void
  onCancel: () => void
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'pending'

export function MobileMoneyPayment({
  amount,
  currency = "KES",
  onPaymentSuccess,
  onPaymentError,
  onCancel
}: MobileMoneyPaymentProps) {
  const [selectedProvider, setSelectedProvider] = useState<MobileMoneyProvider | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')
  const [transactionId, setTransactionId] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  const formatAmount = (amount: number) => {
    return `${currency} ${amount.toLocaleString()}`
  }

  const formatPhoneNumber = (number: string) => {
    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '')
    
    // Format with spaces for readability
    if (cleaned.length >= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
    }
    return cleaned
  }

  const validatePhoneNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '')
    return cleaned.length >= 9 && cleaned.length <= 15
  }

  const calculateFee = (provider: MobileMoneyProvider) => {
    return (amount * provider.fee) / 100
  }

  const getTotalAmount = (provider: MobileMoneyProvider) => {
    return amount + calculateFee(provider)
  }

  const handleProviderSelect = (provider: MobileMoneyProvider) => {
    setSelectedProvider(provider)
    setPaymentStatus('idle')
  }

  const handlePayment = async () => {
    if (!selectedProvider || !validatePhoneNumber(phoneNumber)) {
      return
    }

    setPaymentStatus('processing')
    setStatusMessage("Initiating payment...")
    
    // Generate mock transaction ID
    const mockTransactionId = `TXN${Date.now()}`
    setTransactionId(mockTransactionId)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setPaymentStatus('pending')
      setStatusMessage(`Please check your phone (${formatPhoneNumber(phoneNumber)}) and enter your ${selectedProvider.name} PIN to complete the payment.`)
      
      // Simulate payment confirmation
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      // Randomly succeed or fail for demo
      const success = Math.random() > 0.2 // 80% success rate
      
      if (success) {
        setPaymentStatus('success')
        setStatusMessage("Payment completed successfully!")
        
        setTimeout(() => {
          onPaymentSuccess({
            transactionId: mockTransactionId,
            provider: selectedProvider.id,
            amount: getTotalAmount(selectedProvider),
            phoneNumber: phoneNumber,
            timestamp: new Date().toISOString()
          })
        }, 1500)
      } else {
        setPaymentStatus('failed')
        setStatusMessage("Payment failed. Please try again or use a different payment method.")
      }
    } catch (error) {
      setPaymentStatus('failed')
      setStatusMessage("An error occurred. Please try again.")
      onPaymentError("Payment processing failed")
    }
  }

  const handleRetry = () => {
    setPaymentStatus('idle')
    setStatusMessage("")
    setTransactionId("")
  }

  if (paymentStatus === 'processing' || paymentStatus === 'pending') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="h-5 w-5 text-orange-500" />
            </motion.div>
            Processing Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-2">
              {formatAmount(getTotalAmount(selectedProvider!))}
            </div>
            <div className="text-sm text-gray-600">
              via {selectedProvider?.name}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 mb-1">
                  Payment in Progress
                </div>
                <div className="text-sm text-blue-700">
                  {statusMessage}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transaction ID:</span>
              <span className="font-mono">{transactionId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Phone Number:</span>
              <span>{formatPhoneNumber(phoneNumber)}</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            Cancel Payment
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-sm text-gray-600">
                Your payment of {formatAmount(getTotalAmount(selectedProvider!))} has been processed successfully.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              <div className="flex justify-between mb-1">
                <span>Transaction ID:</span>
                <span className="font-mono">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{selectedProvider?.name}</span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Failed
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {statusMessage}
              </p>
            </div>
            <div className="space-y-2">
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
              <Button variant="outline" onClick={onCancel} className="w-full">
                Choose Different Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-orange-500" />
          Mobile Money Payment
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatAmount(amount)}
          </span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Secure
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Provider Selection */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Choose your mobile money provider
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {MOBILE_MONEY_PROVIDERS.map((provider) => (
              <motion.button
                key={provider.id}
                onClick={() => handleProviderSelect(provider)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                  selectedProvider?.id === provider.id
                    ? `${provider.borderColor} ${provider.bgColor}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.logo}</span>
                    <div>
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        {provider.name}
                        {provider.isRecommended && (
                          <Badge className="bg-orange-500 text-white text-xs px-1.5 py-0.5">
                            <Star className="h-2.5 w-2.5 mr-1" />
                            Recommended
                          </Badge>
                        )}
                        {provider.isPopular && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            <TrendingUp className="h-2.5 w-2.5 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {provider.countries.join(", ")}
                      </div>
                      <div className="text-xs text-gray-500">
                        Fee: {provider.fee === 0 ? 'Free' : `${provider.fee}%`} • {provider.processingTime}
                      </div>
                    </div>
                  </div>
                  {selectedProvider?.id === provider.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Phone Number Input */}
        <AnimatePresence>
          {selectedProvider && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <Separator />
              
              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Mobile Number
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="e.g., 254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your {selectedProvider.name} registered mobile number
                </p>
              </div>

              {/* Payment Summary */}
              <div className={`p-4 rounded-lg ${selectedProvider.bgColor} border ${selectedProvider.borderColor}`}>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>{formatAmount(amount)}</span>
                  </div>
                  {calculateFee(selectedProvider) > 0 && (
                    <div className="flex justify-between">
                      <span>Transaction Fee ({selectedProvider.fee}%):</span>
                      <span>{formatAmount(calculateFee(selectedProvider))}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{formatAmount(getTotalAmount(selectedProvider))}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Your payment is processed securely. We never store your mobile money PIN or personal payment information.
                </AlertDescription>
              </Alert>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={!validatePhoneNumber(phoneNumber)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
              >
                <Zap className="h-4 w-4 mr-2" />
                Pay {formatAmount(getTotalAmount(selectedProvider))}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>10k+ Users</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
