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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Percent,
  Code,
  Settings,
  Download,
  FileText,
  Link,
  TrendingUp
} from "lucide-react"

export default function PaymentGatewaysPage() {
  const [businessType, setBusinessType] = useState("")
  const [monthlyVolume, setMonthlyVolume] = useState("")
  const [paymentMethods, setPaymentMethods] = useState("")
  const [calculatedFee, setCalculatedFee] = useState(0)

  const calculateFees = () => {
    const volume = parseFloat(monthlyVolume?.replace(/[^\d]/g, '') || '0')
    let feeRate = 0.029 // Default 2.9%
    
    if (volume > 200000000) feeRate = 0.020 // 2.0% for high volume
    else if (volume > 50000000) feeRate = 0.025 // 2.5% for medium volume
    else if (volume > 10000000) feeRate = 0.027 // 2.7% for growing businesses
    
    setCalculatedFee(Math.round(volume * feeRate))
  }

  const paymentProviders = [
    {
      name: "Flutterwave",
      logo: "FW",
      description: "Africa's leading payment technology company",
      rating: 4.9,
      reviews: 1250,
      transactionFee: "2.9% + ZMW 7",
      setupFee: "Free",
      features: ["Card payments", "Mobile money", "Bank transfers", "International payments"],
      integrations: ["Website", "Mobile app", "POS", "API"],
      uptime: "99.9%",
      countries: "34+ countries",
      color: "from-orange-500 to-red-600",
      popular: true,
      apiSupport: "REST API, SDKs",
      monthlyTxns: "1M+"
    },
    {
      name: "Paystack",
      logo: "PS",
      description: "Modern online and offline payments for Africa",
      rating: 4.7,
      reviews: 890,
      transactionFee: "3.2% + ZMW 10.5",
      setupFee: "Free",
      features: ["Online payments", "POS solutions", "Invoicing", "Subscriptions"],
      integrations: ["E-commerce", "Mobile", "API", "Plugins"],
      uptime: "99.8%",
      countries: "4+ countries",
      color: "from-blue-500 to-indigo-600",
      popular: false,
      apiSupport: "RESTful API",
      monthlyTxns: "500K+"
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
      popular: false,
      apiSupport: "SOAP & REST",
      monthlyTxns: "2M+"
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
      popular: false,
      apiSupport: "REST API",
      monthlyTxns: "800K+"
    }
  ]

  const integrationSteps = [
    {
      step: "1",
      title: "Choose Gateway",
      description: "Select the payment provider that fits your needs",
      icon: Target,
      color: "bg-blue-500",
      details: ["Compare features", "Review pricing", "Check availability"]
    },
    {
      step: "2", 
      title: "API Integration",
      description: "Integrate with our technical documentation",
      icon: Code,
      color: "bg-green-500",
      details: ["Get API keys", "Download SDKs", "Follow documentation"]
    },
    {
      step: "3",
      title: "Test Payments",
      description: "Use sandbox environment for testing",
      icon: CheckCircle,
      color: "bg-purple-500",
      details: ["Sandbox testing", "Error handling", "Security checks"]
    },
    {
      step: "4",
      title: "Go Live",
      description: "Launch with real customer payments",
      icon: Zap,
      color: "bg-orange-500",
      details: ["Production keys", "Monitoring setup", "Customer support"]
    }
  ]

  const businessFeatures = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "PCI-DSS compliant with advanced fraud protection",
      color: "from-green-500 to-emerald-600",
      benefits: ["256-bit SSL encryption", "Real-time fraud detection", "Compliance monitoring"]
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboard with transaction insights",
      color: "from-blue-500 to-indigo-600",
      benefits: ["Transaction reports", "Revenue analytics", "Customer insights"]
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Seamless payments across all devices",
      color: "from-purple-500 to-violet-600",
      benefits: ["Responsive design", "Mobile apps", "Progressive web apps"]
    },
    {
      icon: Globe,
      title: "Multi-channel",
      description: "Accept payments online, in-app, and in-store",
      color: "from-orange-500 to-red-600",
      benefits: ["Online checkout", "Mobile payments", "POS integration"]
    }
  ]

  const developmentResources = [
    { title: "API Documentation", icon: FileText, description: "Complete API reference and guides" },
    { title: "SDK Downloads", icon: Download, description: "Libraries for popular programming languages" },
    { title: "Code Samples", icon: Code, description: "Ready-to-use code examples" },
    { title: "Webhooks Guide", icon: Link, description: "Real-time event notifications" },
    { title: "Testing Tools", icon: Settings, description: "Sandbox and testing utilities" },
    { title: "Support Forum", icon: Users, description: "Developer community and support" }
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

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-white/80">Uptime</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">+30%</div>
              <div className="text-sm text-white/80">Growth Rate</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">15K+</div>
              <div className="text-sm text-white/80">Businesses</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/80">API Support</div>
            </div>
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
                <p className="text-teal-600">Get recommendations and fee estimates based on your business needs</p>
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
                        <SelectItem value="70000">Under ZMW 70K</SelectItem>
                        <SelectItem value="350000">ZMW 70K - 700K</SelectItem>
                        <SelectItem value="1750000">ZMW 700K - 3.5M</SelectItem>
                        <SelectItem value="7000000">ZMW 3.5M - 14M</SelectItem>
                        <SelectItem value="21000000">Over ZMW 14M</SelectItem>
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
                  <Button 
                    onClick={calculateFees}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-12 py-4 rounded-full text-lg font-semibold"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Calculate Fees & Get Recommendations
                  </Button>
                </div>

                {calculatedFee > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-teal-200">
                    <div className="text-center">
                      <p className="text-teal-600 font-medium mb-2">Estimated Monthly Transaction Fees</p>
                      <p className="text-4xl font-bold text-teal-700 mb-4">UGX {calculatedFee.toLocaleString()}</p>
                      <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          No setup fees
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-blue-500" />
                          Bank-grade security
                        </span>
                        <span className="flex items-center gap-1">
                          <Code className="h-4 w-4 text-purple-500" />
                          Easy integration
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Payment Providers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Payment Gateway Providers</h2>
              <p className="text-xl text-slate-600">Choose from top-rated payment solutions for your business</p>
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
                        <p className="text-sm text-slate-600 mb-1">Monthly Transactions:</p>
                        <p className="font-semibold text-slate-900">{provider.monthlyTxns}</p>
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        {provider.integrations.map((integration, integrationIndex) => (
                          <Badge key={integrationIndex} variant="outline" className="border-teal-200 text-teal-600">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">API Support: {provider.apiSupport}</p>
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

        {/* Integration Process */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Integration Process</h2>
              <p className="text-xl text-slate-600">Get started in 4 simple steps with full technical support</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {integrationSteps.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-sm`}>
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 mb-4">{step.description}</p>
                    <ul className="text-left space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Our Payment Solutions</h2>
              <p className="text-xl text-slate-600">Enterprise-grade features built for modern businesses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Resources */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Developer Resources</h2>
              <p className="text-xl text-slate-600">Everything you need to integrate payments quickly</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {developmentResources.map((resource, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{resource.title}</h3>
                    <p className="text-sm text-slate-600">{resource.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Transparent Pricing</h2>
              <p className="text-xl text-slate-600">Clear pricing for all business sizes with no hidden fees</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { volume: "Under UGX 1M", fee: "2.9%", setup: "Free", support: "Email", features: ["Basic analytics", "Standard support"] },
                { volume: "UGX 1M - 10M", fee: "2.7%", setup: "Free", support: "Phone", features: ["Advanced analytics", "Priority support"] },
                { volume: "UGX 10M - 50M", fee: "2.5%", setup: "Free", support: "Dedicated", features: ["Custom dashboards", "Account manager"] },
                { volume: "Over UGX 50M", fee: "Custom", setup: "Free", support: "Premium", features: ["Enterprise features", "24/7 support"] }
              ].map((tier, index) => (
                <Card key={index} className={`text-center hover:shadow-lg transition-all duration-300 ${index === 2 ? 'ring-2 ring-teal-500 scale-105' : ''}`}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{tier.volume}</h3>
                    <div className="text-3xl font-bold text-teal-600 mb-2">{tier.fee}</div>
                    <p className="text-sm text-slate-600 mb-4">Transaction fee</p>
                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex justify-between">
                        <span>Setup:</span>
                        <span className="font-medium">{tier.setup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support:</span>
                        <span className="font-medium">{tier.support}</span>
                      </div>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${index === 2 ? 'bg-gradient-to-r from-teal-600 to-cyan-600' : ''}`} variant={index === 2 ? 'default' : 'outline'}>
                      {index === 2 ? 'Most Popular' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Success Stories */}
        <section className="py-16 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-600">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
              <p className="text-white/90">See how businesses are growing with our payment solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  business: "E-commerce Store", 
                  growth: "+150%", 
                  metric: "Revenue Growth",
                  story: "Increased conversion rates by 40% after integrating multiple payment options"
                },
                { 
                  business: "Restaurant Chain", 
                  growth: "+300%", 
                  metric: "Online Orders",
                  story: "Streamlined payment processing across 15 locations with unified dashboard"
                },
                { 
                  business: "Service Marketplace", 
                  growth: "+85%", 
                  metric: "User Retention",
                  story: "Simplified checkout process led to better user experience and loyalty"
                }
              ].map((story, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-white mb-2">{story.business}</h3>
                      <div className="text-3xl font-bold text-white mb-1">{story.growth}</div>
                      <div className="text-white/80 text-sm mb-4">{story.metric}</div>
                      <p className="text-white/70 text-sm">{story.story}</p>
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
