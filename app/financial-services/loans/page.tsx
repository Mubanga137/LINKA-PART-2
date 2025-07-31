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
  CreditCard,
  Users,
  Star,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Calculator,
  ArrowRight,
  Building,
  FileText,
  Percent,
  Target,
  Award,
  Shield,
  Search,
  DollarSign
} from "lucide-react"

export default function LoanServicesPage() {
  const [loanAmount, setLoanAmount] = useState("1000000")
  const [interestRate, setInterestRate] = useState("18")
  const [loanTerm, setLoanTerm] = useState("12")
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const time = parseFloat(loanTerm)
    
    if (principal && rate && time) {
      const payment = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
      setMonthlyPayment(Math.round(payment))
    }
  }

  const loanTypes = [
    {
      icon: Users,
      title: "Microloans",
      description: "Small loans for entrepreneurs and small businesses",
      amountRange: "UGX 100K - UGX 5M",
      interestRate: "12-18%",
      term: "3-24 months",
      approvalRate: "95%",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Building,
      title: "Business Loans",
      description: "Funding for business expansion and operations",
      amountRange: "UGX 1M - UGX 50M",
      interestRate: "15-25%",
      term: "6-60 months",
      approvalRate: "87%",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: CreditCard,
      title: "Personal Loans",
      description: "Quick cash for personal needs and emergencies",
      amountRange: "UGX 200K - UGX 10M",
      interestRate: "18-30%",
      term: "3-36 months",
      approvalRate: "92%",
      color: "from-purple-500 to-violet-600"
    }
  ]

  const loanProviders = [
    {
      name: "QuickCash Uganda",
      logo: "QC",
      rating: 4.8,
      reviews: 1500,
      featured: true,
      loanTypes: ["Microloans", "Personal Loans"],
      processingTime: "< 24 hours",
      approvalRate: "95%",
      loanRange: "UGX 100K - UGX 10M",
      totalLoans: "15K+",
      location: "Kampala, Uganda"
    },
    {
      name: "Business Finance Solutions",
      logo: "BFS",
      rating: 4.6,
      reviews: 890,
      featured: false,
      loanTypes: ["Business Loans", "Equipment Finance"],
      processingTime: "3-5 days",
      approvalRate: "87%",
      loanRange: "UGX 1M - UGX 50M",
      totalLoans: "8K+",
      location: "Kampala, Uganda"
    },
    {
      name: "Community Credit Union",
      logo: "CCU",
      rating: 4.7,
      reviews: 650,
      featured: false,
      loanTypes: ["Microloans", "Savings"],
      processingTime: "2-3 days",
      approvalRate: "92%",
      loanRange: "UGX 200K - UGX 5M",
      totalLoans: "5K+",
      location: "Entebbe, Uganda"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-8">
            <span>Finance</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-white font-medium">Loan Services</span>
          </div>

          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Loan Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Access microloans, business loans, and personal financing from verified lenders across Zambia
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        {/* Smart Loan Calculator */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 mb-16">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-700">Smart Loan Calculator</CardTitle>
                <p className="text-green-600">Calculate your monthly payments and see what you qualify for</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loan-amount">Loan Amount (UGX)</Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="bg-white text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="bg-white text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loan-term">Term (months)</Label>
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="bg-white text-lg font-semibold"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={calculateLoan}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-full text-lg font-semibold"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Get Pre-Qualified
                  </Button>
                </div>

                {monthlyPayment > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-green-200">
                    <div className="text-center">
                      <p className="text-green-600 font-medium mb-2">Estimated Monthly Payment</p>
                      <p className="text-4xl font-bold text-green-700">UGX {monthlyPayment.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Types of Loans Available */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Types of Loans Available</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loanTypes.map((loanType, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${loanType.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <loanType.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{loanType.title}</h3>
                      <p className="text-slate-600">{loanType.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Amount Range:</span>
                        <span className="font-semibold text-slate-900">{loanType.amountRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Interest Rate:</span>
                        <span className="font-semibold text-slate-900">{loanType.interestRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Term:</span>
                        <span className="font-semibold text-slate-900">{loanType.term}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Approval Rate:</span>
                        <div className="flex items-center gap-2">
                          <Progress value={parseInt(loanType.approvalRate)} className="w-16 h-2" />
                          <span className="font-semibold text-green-600">{loanType.approvalRate}</span>
                        </div>
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${loanType.color} hover:shadow-lg transition-all duration-300`}>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Loan Providers */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Verified Loan Providers</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {loanProviders.map((provider, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${provider.featured ? 'ring-2 ring-green-500' : ''}`}>
                  {provider.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">Featured</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {provider.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{provider.name}</h3>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-slate-500">({provider.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Processing Time:</p>
                        <p className="font-semibold text-slate-900">{provider.processingTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Approval Rate:</p>
                        <p className="font-semibold text-green-600">{provider.approvalRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Loan Range:</p>
                        <p className="font-semibold text-slate-900">{provider.loanRange}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Total Loans:</p>
                        <p className="font-semibold text-slate-900">{provider.totalLoans}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-2">Loan Types:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.loanTypes.map((type, typeIndex) => (
                          <Badge key={typeIndex} variant="secondary" className="bg-blue-100 text-blue-700">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{provider.location}</span>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Apply Now
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

        {/* Loan Eligibility Checker */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Check Your Eligibility</h2>
              <p className="text-xl text-slate-600">See what loans you qualify for in under 2 minutes</p>
            </div>

            <Card className="max-w-4xl mx-auto border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthly-income">Monthly Income (UGX)</Label>
                      <Input id="monthly-income" type="number" placeholder="500000" className="bg-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employment-type">Employment Type</Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self Employed</SelectItem>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="credit-score">Credit History</Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select credit history" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                          <SelectItem value="none">No Credit History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="existing-loans">Existing Loans</Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Do you have existing loans?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No existing loans</SelectItem>
                          <SelectItem value="one">1 existing loan</SelectItem>
                          <SelectItem value="multiple">Multiple loans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="collateral">Collateral Available</Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select collateral type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="property">Property</SelectItem>
                          <SelectItem value="vehicle">Vehicle</SelectItem>
                          <SelectItem value="business-assets">Business Assets</SelectItem>
                          <SelectItem value="guarantor">Guarantor</SelectItem>
                          <SelectItem value="none">No Collateral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loan-purpose">Loan Purpose</Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Why do you need the loan?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="home-improvement">Home Improvement</SelectItem>
                          <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-full text-lg font-semibold">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Check Eligibility
                  </Button>
                </div>

                {/* Mock Results */}
                <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-center mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Great News!</h3>
                    <p className="text-green-600">You're eligible for multiple loan products</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-green-200 text-center">
                      <h4 className="font-bold text-slate-900 mb-2">Personal Loan</h4>
                      <p className="text-2xl font-bold text-green-600 mb-1">Up to UGX 5M</p>
                      <p className="text-sm text-slate-600">18% APR • 36 months</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-green-200 text-center">
                      <h4 className="font-bold text-slate-900 mb-2">Business Loan</h4>
                      <p className="text-2xl font-bold text-green-600 mb-1">Up to UGX 15M</p>
                      <p className="text-sm text-slate-600">15% APR • 60 months</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-green-200 text-center">
                      <h4 className="font-bold text-slate-900 mb-2">Secured Loan</h4>
                      <p className="text-2xl font-bold text-green-600 mb-1">Up to UGX 25M</p>
                      <p className="text-sm text-slate-600">12% APR • 84 months</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Application Tracking */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Track Your Application</h2>
              <p className="text-xl text-slate-600">Monitor your loan application status in real-time</p>
            </div>

            <Card className="max-w-4xl mx-auto border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Input placeholder="Enter your application reference number" className="flex-1 bg-white" />
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8">
                      <Search className="h-4 w-4 mr-2" />
                      Track
                    </Button>
                  </div>
                </div>

                {/* Mock Application Status */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Application Submitted</h3>
                        <p className="text-sm text-slate-600">January 10, 2024 at 2:30 PM</p>
                      </div>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Under Review</h3>
                        <p className="text-sm text-slate-600">Being processed by our underwriting team</p>
                      </div>
                    </div>
                    <Clock className="h-6 w-6 text-yellow-500 animate-spin" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg border border-slate-200 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Approval Decision</h3>
                        <p className="text-sm text-slate-600">Final approval and loan terms</p>
                      </div>
                    </div>
                    <Clock className="h-6 w-6 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg border border-slate-200 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Funds Disbursed</h3>
                        <p className="text-sm text-slate-600">Money transferred to your account</p>
                      </div>
                    </div>
                    <Clock className="h-6 w-6 text-slate-400" />
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Application Status: Under Review</h4>
                      <p className="text-sm text-blue-700">Your application is currently being reviewed by our underwriting team. We'll contact you within 24 hours if we need any additional documentation.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Apply Process */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">How to Apply</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Choose Provider", description: "Select from our verified loan providers", color: "bg-blue-500" },
                { step: "2", title: "Submit Application", description: "Fill out the secure online form", color: "bg-green-500" },
                { step: "3", title: "Get Approved", description: "Receive approval within 24-72 hours", color: "bg-purple-500" },
                { step: "4", title: "Receive Funds", description: "Get money transferred to your account", color: "bg-orange-500" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
