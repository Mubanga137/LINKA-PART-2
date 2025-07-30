"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Globe, 
  CreditCard, 
  Smartphone, 
  Star, 
  CheckCircle, 
  Clock,
  Phone,
  MapPin,
  ArrowRight,
  Building,
  Target,
  Shield,
  Zap,
  BarChart3,
  Users,
  DollarSign,
  Percent
} from "lucide-react"

export default function PaymentGatewaysPage() {
  const [businessType, setBusinessType] = useState("")
  const [monthlyVolume, setMonthlyVolume] = useState("")
  const [paymentMethods, setPaymentMethods] = useState("")

  const paymentProviders = [
    {
      name: "Flutterwave",
      logo: "FW",
      description: "Africa's leading payment technology company",
      rating: 4.9,
      reviews: 1250,
      transactionFee: "2.9% + UGX 100",
      setupFee: "Free",
      features: ["Card payments", "Mobile money", "Bank transfers", "International payments"],
      integrations: ["Website", "Mobile app", "POS", "API"],
      uptime: "99.9%",
      countries: "34+ countries",
      color: "from-orange-500 to-red-600",
      popular: true
    },
    {
      name: "Paystack",
      logo: "PS",
      description: "Modern online and offline payments for Africa",
      rating: 4.7,
      reviews: 890,
      transactionFee: "3.2% + UGX 150",
      setupFee: "Free",
      features: ["Online payments", "POS solutions", "Invoicing", "Subscriptions"],
      integrations: ["E-commerce", "Mobile", "API", "Plugins"],
      uptime: "99.8%",
      countries: "4+ countries",
      color: "from-blue-500 to-indigo-600",
      popular: false
    },
    {
      name: "MTN MoMo API",
      logo: "MTN",
      description: "Direct mobile money integration",
      rating: 4.6,
      reviews: 567,
      transactionFee: "1.5%",
      setupFee: "UGX 500K",
      features: ["Mobile money", "Bulk payments", "Collections", "Disbursements"],
      integrations: ["API", "USSD", "Mobile app"],
      uptime: "99.5%",
      countries: "Uganda only",
      color: "from-yellow-500 to-orange-600",
      popular: false
    },
    {
      name: "Airtel Money API",
      logo: "AM",
      description: "Airtel mobile money integration",
      rating: 4.5,
      reviews: 432,
      transactionFee: "2.0%",
      setupFee: "UGX 300K",
      features: ["Mobile payments", "Bill payments", "Merchant services"],
      integrations: ["API", "SDK", "USSD"],
      uptime: "99.2%",
      countries: "Uganda only",
      color: "from-red-500 to-pink-600",
      popular: false
    }
  ]

  const integrationSteps = [
    {
      step: "1",
      title: "Choose Gateway",
      description: "Select the payment provider that fits your needs",
      icon: Target,
      color: "bg-blue-500"
    },
    {
      step: "2", 
      title: "API Integration",
      description: "Integrate with our technical documentation",
      icon: Globe,
      color: "bg-green-500"
    },
    {
      step: "3",
      title: "Test Payments",
      description: "Use sandbox environment for testing",
      icon: CheckCircle,
      color: "bg-purple-500"
    },
    {
      step: "4",
      title: "Go Live",
      description: "Launch with real customer payments",
      icon: Zap,
      color: "bg-orange-500"
    }
  ]

  const businessFeatures = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "PCI-DSS compliant with advanced fraud protection",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboard with transaction insights",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Seamless payments across all devices",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Globe,
      title: "Multi-channel",
      description: "Accept payments online, in-app, and in-store",
      color: "from-orange-500 to-red-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-600">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-8">
            <span>Finance</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-white font-medium">Payment Gateways</span>
          </div>

          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Payment Gateways
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Integrate payment solutions for your business with 99.9% uptime and 30% growth rate
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        {/* Business Needs Assessment */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 mb-16">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-700">Find Your Payment Solution</CardTitle>
                <p className="text-teal-600">Get recommendations based on your business needs</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="retail">Retail Store</SelectItem>
                        <SelectItem value="restaurant">Restaurant/Cafe</SelectItem>
                        <SelectItem value="services">Professional Services</SelectItem>
                        <SelectItem value="marketplace">Marketplace</SelectItem>
                        <SelectItem value="subscription">Subscription Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly-volume">Monthly Transaction Volume</Label>
                    <Select value={monthlyVolume} onValueChange={setMonthlyVolume}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select volume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1m">Under UGX 1M</SelectItem>
                        <SelectItem value="1m-10m">UGX 1M - 10M</SelectItem>
                        <SelectItem value="10m-50m">UGX 10M - 50M</SelectItem>
                        <SelectItem value="50m-200m">UGX 50M - 200M</SelectItem>
                        <SelectItem value="over-200m">Over UGX 200M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-methods">Payment Methods Needed</Label>
                    <Select value={paymentMethods} onValueChange={setPaymentMethods}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select methods" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobile-only">Mobile Money Only</SelectItem>
                        <SelectItem value="cards-mobile">Cards + Mobile Money</SelectItem>
                        <SelectItem value="all-methods">All Payment Methods</SelectItem>
                        <SelectItem value="international">International Payments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-12 py-4 rounded-full text-lg font-semibold">
                    <Target className="h-5 w-5 mr-2" />
                    Get Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Payment Providers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Payment Gateway Providers</h2>
              <p className="text-xl text-slate-600">Choose from top-rated payment solutions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {paymentProviders.map((provider, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${provider.popular ? 'ring-2 ring-teal-500' : ''}`}>
                  {provider.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-teal-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${provider.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg`}>
                        {provider.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{provider.name}</h3>
                        <p className="text-slate-600 mb-3">{provider.description}</p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-slate-500">({provider.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">{provider.uptime} uptime</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Transaction Fee:</p>
                        <p className="font-semibold text-slate-900">{provider.transactionFee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Setup Fee:</p>
                        <p className="font-semibold text-green-600">{provider.setupFee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Coverage:</p>
                        <p className="font-semibold text-slate-900">{provider.countries}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Uptime:</p>
                        <div className="flex items-center gap-2">
                          <Progress value={parseFloat(provider.uptime)} className="w-16 h-2" />
                          <span className="font-semibold text-green-600">{provider.uptime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-2">Payment Methods:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="secondary" className="bg-teal-100 text-teal-700">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Integration Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.integrations.map((integration, integrationIndex) => (
                          <Badge key={integrationIndex} variant="outline" className="border-teal-200 text-teal-600">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className={`flex-1 bg-gradient-to-r ${provider.color} hover:shadow-lg transition-all duration-300`}>
                        Start Integration
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Features */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Our Payment Solutions</h2>
              <p className="text-xl text-slate-600">Built for modern businesses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {businessFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Process */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Integration Process</h2>
              <p className="text-xl text-slate-600">Get started in 4 simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {integrationSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-sm`}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Pricing Comparison</h2>
              <p className="text-xl text-slate-600">Transparent pricing for all business sizes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { volume: "Under UGX 1M", fee: "2.9%", setup: "Free", support: "Email" },
                { volume: "UGX 1M - 10M", fee: "2.7%", setup: "Free", support: "Phone" },
                { volume: "UGX 10M - 50M", fee: "2.5%", setup: "Free", support: "Dedicated" },
                { volume: "Over UGX 50M", fee: "Custom", setup: "Free", support: "Premium" }
              ].map((tier, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{tier.volume}</h3>
                    <div className="text-3xl font-bold text-teal-600 mb-2">{tier.fee}</div>
                    <p className="text-sm text-slate-600 mb-4">Transaction fee</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Setup:</span>
                        <span className="font-medium">{tier.setup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support:</span>
                        <span className="font-medium">{tier.support}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
