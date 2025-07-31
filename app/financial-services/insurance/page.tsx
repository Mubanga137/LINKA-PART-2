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
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Shield, 
  Car, 
  Heart, 
  Building2, 
  Users, 
  Star, 
  CheckCircle, 
  Clock,
  Phone,
  MapPin,
  Calculator,
  ArrowRight,
  Target,
  Award,
  FileText,
  DollarSign,
  Percent,
  Calendar,
  AlertTriangle,
  UserCheck,
  Banknote
} from "lucide-react"

export default function InsurancePage() {
  const [insuranceType, setInsuranceType] = useState("")
  const [coverage, setCoverage] = useState("")
  const [age, setAge] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [vehicleValue, setVehicleValue] = useState("")
  const [estimatedPremium, setEstimatedPremium] = useState(0)

  const calculateQuote = () => {
    let basePremium = 0
    
    if (insuranceType === "motor") {
      basePremium = parseFloat(vehicleValue) * 0.05 // 5% of vehicle value
    } else if (insuranceType === "health") {
      const ageNum = parseInt(age)
      basePremium = ageNum < 30 ? 200000 : ageNum < 50 ? 350000 : 500000
    } else if (insuranceType === "life") {
      const ageNum = parseInt(age)
      basePremium = ageNum < 30 ? 150000 : ageNum < 50 ? 250000 : 400000
    } else if (insuranceType === "business") {
      basePremium = parseFloat(coverage) * 0.02 // 2% of coverage amount
    }
    
    setEstimatedPremium(Math.round(basePremium))
  }

  const insuranceTypes = [
    {
      icon: Car,
      title: "Motor Insurance",
      description: "Comprehensive vehicle protection and third-party liability",
      coverage: "Up to UGX 50M",
      premium: "UGX 200K - 2M/year",
      claims: "24/7 support",
      approval: "95%",
      features: ["Accident coverage", "Theft protection", "Third-party liability", "Emergency assistance"],
      color: "from-red-500 to-pink-600",
      popular: true
    },
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Medical and dental coverage for individuals and families",
      coverage: "Up to UGX 100M",
      premium: "UGX 150K - 800K/year",
      claims: "Direct billing",
      approval: "98%",
      features: ["Hospital coverage", "Outpatient care", "Dental & optical", "Maternity benefits"],
      color: "from-green-500 to-emerald-600",
      popular: false
    },
    {
      icon: Shield,
      title: "Life Insurance",
      description: "Financial protection for your loved ones",
      coverage: "Up to UGX 200M",
      premium: "UGX 100K - 500K/year",
      claims: "Fast processing",
      approval: "97%",
      features: ["Death benefit", "Disability cover", "Critical illness", "Investment component"],
      color: "from-blue-500 to-indigo-600",
      popular: false
    },
    {
      icon: Building2,
      title: "Business Insurance",
      description: "Protect your business assets and operations",
      coverage: "Customizable",
      premium: "UGX 300K - 5M/year",
      claims: "Business support",
      approval: "92%",
      features: ["Property protection", "Liability coverage", "Business interruption", "Professional indemnity"],
      color: "from-purple-500 to-violet-600",
      popular: false
    }
  ]

  const insuranceProviders = [
    {
      name: "UAP Insurance Uganda",
      rating: 4.8,
      reviews: 342,
      clients: "25K+",
      claimsRatio: "95%",
      experience: "40+ years",
      products: ["Motor", "Health", "Life", "Property"],
      location: "Kampala Central",
      phone: "+256 700 123 456",
      verified: true,
      featured: true,
      premium: "Competitive rates",
      strength: "A+ rated"
    },
    {
      name: "Jubilee Insurance",
      rating: 4.7,
      reviews: 289,
      clients: "20K+",
      claimsRatio: "92%",
      experience: "30+ years",
      products: ["Health", "Life", "Education", "Pension"],
      location: "Multiple branches",
      phone: "+256 701 234 567",
      verified: true,
      featured: false,
      premium: "Affordable plans",
      strength: "A rated"
    },
    {
      name: "AIG Uganda",
      rating: 4.9,
      reviews: 198,
      clients: "15K+",
      claimsRatio: "97%",
      experience: "25+ years",
      products: ["Motor", "Business", "Travel", "Marine"],
      location: "Nakawa, Kampala",
      phone: "+256 702 345 678",
      verified: true,
      featured: false,
      premium: "Premium service",
      strength: "AA- rated"
    }
  ]

  const claimSteps = [
    { step: "1", title: "Report Incident", description: "Contact us immediately after incident", icon: Phone, color: "bg-red-500" },
    { step: "2", title: "Document Details", description: "Gather all relevant documentation", icon: FileText, color: "bg-orange-500" },
    { step: "3", title: "Assessment", description: "Professional assessment of claim", icon: UserCheck, color: "bg-blue-500" },
    { step: "4", title: "Settlement", description: "Quick settlement and payment", icon: Banknote, color: "bg-green-500" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-700 to-red-600">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-8">
            <span>Finance</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-white font-medium">Insurance</span>
          </div>

          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Insurance Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Comprehensive insurance coverage for health, motor, life, and SME with 95% approval rate and +15% growth
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-white/80">Approval Rate</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">+15%</div>
              <div className="text-sm text-white/80">Growth Rate</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/80">Claims Support</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-white/80">Protected Lives</div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-16">
        {/* Insurance Quote Tool */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 mb-16">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-orange-700">Get Insurance Quote</CardTitle>
                <p className="text-orange-600">Compare plans and get instant quotes from top insurers</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <Tabs defaultValue="motor" value={insuranceType} onValueChange={setInsuranceType}>
                  <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl border border-orange-200 p-1">
                    <TabsTrigger value="motor" className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Motor
                    </TabsTrigger>
                    <TabsTrigger value="health" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Health
                    </TabsTrigger>
                    <TabsTrigger value="life" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Life
                    </TabsTrigger>
                    <TabsTrigger value="business" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Business
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="motor" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-type">Vehicle Type</Label>
                        <Select value={vehicleType} onValueChange={setVehicleType}>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="pickup">Pickup Truck</SelectItem>
                            <SelectItem value="motorcycle">Motorcycle</SelectItem>
                            <SelectItem value="commercial">Commercial Vehicle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-value">Vehicle Value (ZMW)</Label>
                        <Input
                          id="vehicle-value"
                          type="number"
                          placeholder="10000000"
                          value={vehicleValue}
                          onChange={(e) => setVehicleValue(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coverage-type">Coverage Type</Label>
                        <Select value={coverage} onValueChange={setCoverage}>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select coverage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                            <SelectItem value="third-party">Third Party</SelectItem>
                            <SelectItem value="fire-theft">Fire & Theft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="health" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="30"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="plan-type">Plan Type</Label>
                        <Select value={coverage} onValueChange={setCoverage}>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic Plan</SelectItem>
                            <SelectItem value="standard">Standard Plan</SelectItem>
                            <SelectItem value="premium">Premium Plan</SelectItem>
                            <SelectItem value="family">Family Plan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coverage-amount">Coverage Amount (UGX)</Label>
                        <Select value={coverage} onValueChange={setCoverage}>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select coverage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5000000">UGX 5M</SelectItem>
                            <SelectItem value="10000000">UGX 10M</SelectItem>
                            <SelectItem value="25000000">UGX 25M</SelectItem>
                            <SelectItem value="50000000">UGX 50M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="life" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="30"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="policy-type">Policy Type</Label>
                        <Select value={coverage} onValueChange={setCoverage}>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select policy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="term">Term Life</SelectItem>
                            <SelectItem value="whole">Whole Life</SelectItem>
                            <SelectItem value="endowment">Endowment</SelectItem>
                            <SelectItem value="group">Group Life</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sum-assured">Sum Assured (UGX)</Label>
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10000000">UGX 10M</SelectItem>
                            <SelectItem value="25000000">UGX 25M</SelectItem>
                            <SelectItem value="50000000">UGX 50M</SelectItem>
                            <SelectItem value="100000000">UGX 100M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="business" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="business-type">Business Type</Label>
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="services">Professional Services</SelectItem>
                            <SelectItem value="hospitality">Hospitality</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="property-value">Property Value (UGX)</Label>
                        <Input
                          id="property-value"
                          type="number"
                          placeholder="50000000"
                          value={coverage}
                          onChange={(e) => setCoverage(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-100">51-100</SelectItem>
                            <SelectItem value="100+">100+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="text-center">
                  <Button 
                    onClick={calculateQuote}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-4 rounded-full text-lg font-semibold"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Get Instant Quote
                  </Button>
                </div>

                {estimatedPremium > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-orange-200">
                    <div className="text-center">
                      <p className="text-orange-600 font-medium mb-2">Estimated Annual Premium</p>
                      <p className="text-4xl font-bold text-orange-700 mb-4">ZMW {estimatedPremium.toLocaleString()}</p>
                      <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Instant approval
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-blue-500" />
                          24/7 support
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Top-rated coverage
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Insurance Types */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Insurance Coverage Options</h2>
              <p className="text-xl text-slate-600">Comprehensive protection for every aspect of your life</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {insuranceTypes.map((type, index) => (
                <Card key={index} className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg ${type.popular ? 'ring-2 ring-orange-500' : ''}`}>
                  {type.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-orange-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <type.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{type.title}</h3>
                      <p className="text-slate-600">{type.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Coverage</p>
                        <p className="font-semibold text-slate-900">{type.coverage}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Premium</p>
                        <p className="font-semibold text-slate-900">{type.premium}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Claims</p>
                        <p className="font-semibold text-slate-900">{type.claims}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Approval</p>
                        <p className="font-semibold text-green-600">{type.approval}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-3">Key Benefits:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {type.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${type.color} hover:shadow-lg transition-all duration-300`}>
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Providers */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted Insurance Partners</h2>
              <p className="text-xl text-slate-600">Work with licensed and regulated insurance companies</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {insuranceProviders.map((provider, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${provider.featured ? 'ring-2 ring-orange-500' : ''}`}>
                  {provider.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500 text-white">Featured Partner</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                        <Shield className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{provider.name}</h3>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-slate-500">({provider.reviews} reviews)</span>
                          </div>
                          {provider.verified && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Licensed</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-blue-100 text-blue-700">{provider.strength}</Badge>
                          <span className="text-sm text-slate-600">{provider.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Clients:</p>
                        <p className="font-semibold text-slate-900">{provider.clients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Claims Ratio:</p>
                        <p className="font-semibold text-green-600">{provider.claimsRatio}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Pricing:</p>
                        <p className="font-semibold text-slate-900">{provider.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Location:</p>
                        <p className="font-semibold text-slate-900">{provider.location}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-2">Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.products.map((product, productIndex) => (
                          <Badge key={productIndex} variant="secondary" className="bg-orange-100 text-orange-700">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                        Get Quote
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Claims Process */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple Claims Process</h2>
              <p className="text-xl text-slate-600">Fast and easy claims settlement in 4 steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {claimSteps.map((step, index) => (
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

        {/* Policy Comparison Tool */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Compare Insurance Policies</h2>
              <p className="text-xl text-slate-600">Side-by-side comparison of features and benefits</p>
            </div>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-6 font-semibold text-slate-900">Features</th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-900">Basic Plan</th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-900">Standard Plan</th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-900 bg-orange-50">Premium Plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Coverage Amount", basic: "UGX 5M", standard: "UGX 15M", premium: "UGX 50M" },
                        { feature: "Hospital Network", basic: "Public hospitals", standard: "Public + Private", premium: "International network" },
                        { feature: "Emergency Services", basic: "✓", standard: "✓", premium: "✓" },
                        { feature: "Maternity Coverage", basic: "✗", standard: "✓", premium: "✓" },
                        { feature: "Dental & Optical", basic: "✗", standard: "Basic", premium: "Comprehensive" },
                        { feature: "Annual Premium", basic: "UGX 200K", standard: "UGX 400K", premium: "UGX 800K" }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-slate-100">
                          <td className="py-4 px-6 font-medium text-slate-900">{row.feature}</td>
                          <td className="py-4 px-6 text-center text-slate-600">{row.basic}</td>
                          <td className="py-4 px-6 text-center text-slate-600">{row.standard}</td>
                          <td className="py-4 px-6 text-center text-slate-900 bg-orange-50">{row.premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <Button variant="outline" className="px-8">Compare Basic</Button>
                  <Button variant="outline" className="px-8">Compare Standard</Button>
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 px-8">Choose Premium</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Risk Assessment */}
        <section className="py-16 bg-gradient-to-br from-orange-600 via-orange-700 to-red-600">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Insurance Risk Assessment</h2>
              <p className="text-white/90">Understand your insurance needs better</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Health Risk Factors", icon: Heart, items: ["Age & lifestyle", "Medical history", "Family health", "Occupation hazards"] },
                { title: "Motor Risk Assessment", icon: Car, items: ["Driving record", "Vehicle type", "Usage patterns", "Security features"] },
                { title: "Business Risk Analysis", icon: Building2, items: ["Industry type", "Location factors", "Asset value", "Employee count"] }
              ].map((assessment, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <assessment.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-white mb-2">{assessment.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {assessment.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-white/80 text-sm">
                          <CheckCircle className="h-4 w-4 text-white/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
