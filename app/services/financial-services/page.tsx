"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CreditCard, 
  DollarSign, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  MessageCircle,
  Phone,
  Home,
  Award,
  Calculator,
  BarChart3,
  Wallet,
  Building,
  Users,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Target,
  Globe,
  Smartphone
} from "lucide-react"

interface FinancialProvider {
  id: string
  name: string
  speciality: string
  avatar: string
  rating: number
  reviews: number
  minInvestment?: number
  location: string
  distance: number
  type: 'bank' | 'insurance' | 'investment' | 'loan' | 'mobile-money' | 'advisor'
  services: string[]
  availability: string[]
  verified: boolean
  digitalService: boolean
  licenses: string[]
}

const financialProviders: FinancialProvider[] = [
  {
    id: "bank-1",
    name: "Zambia National Commercial Bank",
    speciality: "Full Service Banking",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F42b8ae8393814c168dc2052ebaf26612?alt=media&token=f80cfaea-39af-480e-93f5-095c18f3171c&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.6,
    reviews: 2341,
    location: "Lusaka Central",
    distance: 1.2,
    type: "bank",
    services: ["Savings Account", "Current Account", "Loans", "Mobile Banking", "Forex"],
    availability: ["Mon-Fri", "Online 24/7"],
    verified: true,
    digitalService: true,
    licenses: ["BOZ Licensed", "FSCA Regulated"]
  },
  {
    id: "investment-1",
    name: "Catherine Mwale",
    speciality: "Certified Financial Advisor",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F78d39db0cc914086880c2e1be9c2399c?alt=media&token=0e9e158d-1203-436c-a2c7-85b0864c1544&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.9,
    reviews: 187,
    minInvestment: 5000,
    location: "Lusaka East",
    distance: 3.1,
    type: "advisor",
    services: ["Investment Planning", "Retirement Planning", "Tax Advisory", "Portfolio Management"],
    availability: ["Today", "Tomorrow", "This Week"],
    verified: true,
    digitalService: true,
    licenses: ["CFA Certified", "FSCA Licensed"]
  },
  {
    id: "insurance-1",
    name: "Professional Insurance Corporation",
    speciality: "Life & General Insurance",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F19464dab8d4d4f37b89b42e999e7dc63?alt=media&token=e3ddacd1-71a5-4b4b-9370-48ac12c37cea&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.4,
    reviews: 1523,
    location: "Lusaka South",
    distance: 4.5,
    type: "insurance",
    services: ["Life Insurance", "Motor Insurance", "Health Insurance", "Property Insurance"],
    availability: ["Mon-Fri", "Online Claims"],
    verified: true,
    digitalService: true,
    licenses: ["PICZ Licensed", "Reinsurance Backed"]
  },
  {
    id: "mobile-1",
    name: "MTN Mobile Money",
    speciality: "Digital Financial Services",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2Fbb17972412724f16952a2a8eab486de8?alt=media&token=f784c501-ff73-43fa-a86e-f274762cbd12&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.3,
    reviews: 8924,
    location: "Nationwide",
    distance: 0.1,
    type: "mobile-money",
    services: ["Send Money", "Pay Bills", "Buy Airtime", "Savings", "Micro-loans"],
    availability: ["24/7", "USSD", "App"],
    verified: true,
    digitalService: true,
    licenses: ["BOZ Licensed", "PCI DSS Certified"]
  },
  {
    id: "loan-1",
    name: "Quick Credit Solutions",
    speciality: "Personal & Business Loans",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2Fb433b7e5f1b24d3abf2f412e392b84e8?alt=media&token=4e1054ea-7e22-4b02-8298-c84f066f5fbe&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.2,
    reviews: 567,
    location: "Lusaka West",
    distance: 2.8,
    type: "loan",
    services: ["Personal Loans", "Business Loans", "Asset Finance", "Quick Cash"],
    availability: ["Today", "Fast Approval"],
    verified: true,
    digitalService: true,
    licenses: ["PACRA Registered", "BOZ Compliant"]
  },
  {
    id: "investment-2",
    name: "James Banda",
    speciality: "Investment & Wealth Manager",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F6e1ebb4b0999431ebed5351f1e64ab90?alt=media&token=813365be-be84-4673-8eee-8e2af37c1d15&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.7,
    reviews: 234,
    minInvestment: 10000,
    location: "Lusaka Central",
    distance: 1.9,
    type: "investment",
    services: ["Stock Market", "Bonds", "Unit Trusts", "Property Investment"],
    availability: ["This Week", "Consultation"],
    verified: true,
    digitalService: false,
    licenses: ["CIS Licensed", "CSDB Registered"]
  },
  {
    id: "fintech-1",
    name: "Airtel Money Services",
    speciality: "Mobile Financial Platform",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F1ab42222ca9c48f6a6ad4652db03d85d?alt=media&token=61e88246-fa1e-491c-a6c2-57a415e7b0f0&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.5,
    reviews: 6782,
    location: "Nationwide",
    distance: 0.1,
    type: "mobile-money",
    services: ["Money Transfer", "Bill Payments", "Merchant Payments", "International Remittance"],
    availability: ["24/7", "USSD *334#", "Mobile App"],
    verified: true,
    digitalService: true,
    licenses: ["BOZ Licensed", "ISO 27001 Certified"]
  },
  {
    id: "microfinance-1",
    name: "Bayport Financial Services",
    speciality: "Microfinance & Consumer Credit",
    avatar: "https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F52af4f0d29694b71ba1058b0a799d13b?alt=media&token=8e9ce090-61fc-4014-a228-653c2d62c3cf&apiKey=7c87b45712944202864afb9b3f47cba2",
    rating: 4.1,
    reviews: 892,
    location: "Lusaka, Copperbelt",
    distance: 2.5,
    type: "loan",
    services: ["Salary Loans", "Business Finance", "Asset Finance", "Emergency Loans"],
    availability: ["Mon-Fri", "Online Application"],
    verified: true,
    digitalService: true,
    licenses: ["BOZ Registered", "ZAMFI Member"]
  }
]

const financialCategories = [
  { id: "all", label: "All Services", icon: DollarSign },
  { id: "bank", label: "Banking", icon: Building },
  { id: "investment", label: "Investments", icon: TrendingUp },
  { id: "advisor", label: "Financial Advisors", icon: Users },
  { id: "insurance", label: "Insurance", icon: Shield },
  { id: "loan", label: "Loans", icon: CreditCard },
  { id: "mobile-money", label: "Mobile Money", icon: Smartphone }
]

const financialTips = [
  {
    title: "Build Your Emergency Fund",
    description: "Start with 3-6 months of expenses in a savings account",
    category: "Savings",
    readTime: "3 min"
  },
  {
    title: "Understanding Investment Options",
    description: "Compare stocks, bonds, and unit trusts in Zambia",
    category: "Investment",
    readTime: "5 min"
  },
  {
    title: "Insurance Planning Guide",
    description: "Protect your family and assets with the right coverage",
    category: "Insurance", 
    readTime: "4 min"
  },
  {
    title: "Mobile Money Security",
    description: "Keep your digital transactions safe and secure",
    category: "Digital",
    readTime: "2 min"
  }
]

export default function FinancialServicesPage() {
  const router = useRouter()
  const [selectedProvider, setSelectedProvider] = useState<FinancialProvider | null>(null)
  const [showConsultation, setShowConsultation] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showLoanCalculator, setShowLoanCalculator] = useState(false)
  const [showInvestmentTracker, setShowInvestmentTracker] = useState(false)
  const [showSavingsGoal, setShowSavingsGoal] = useState(false)
  const [showBudgetPlanner, setShowBudgetPlanner] = useState(false)

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState("50000")
  const [interestRate, setInterestRate] = useState("15")
  const [loanTerm, setLoanTerm] = useState("5")
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    const principal = parseFloat(loanAmount) || 0
    const rate = (parseFloat(interestRate) || 0) / 100 / 12
    const term = (parseFloat(loanTerm) || 0) * 12

    if (principal && rate && term) {
      const payment = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
      const total = payment * term
      setMonthlyPayment(payment)
      setTotalInterest(total - principal)
    }
  }, [loanAmount, interestRate, loanTerm])

  const filteredProviders = selectedCategory === "all" 
    ? financialProviders 
    : financialProviders.filter(p => p.type === selectedCategory)

  const handleConsultation = (provider: FinancialProvider) => {
    setSelectedProvider(provider)
    setShowConsultation(true)
  }

  const handleChat = (provider: FinancialProvider) => {
    setSelectedProvider(provider)
    setShowChat(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Financial Services
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Secure your financial future with trusted banking, investment, insurance, and advisory services in Zambia
              </p>
            </div>
          </div>
        </section>

        {/* Financial Health Alert */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Alert className="bg-emerald-50 border-emerald-200 mb-8">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800">
                <strong>Financial Security Notice:</strong> All listed providers are licensed and regulated by relevant Zambian authorities. 
                Verify credentials before making financial commitments.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Market Data Dashboard */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Live Market Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">USD/ZMW Rate</p>
                  <p className="text-2xl font-bold text-green-600">24.85</p>
                  <p className="text-xs text-green-500">+0.15 (0.6%) ↗</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">LuSE Index</p>
                  <p className="text-2xl font-bold text-blue-600">4,582.31</p>
                  <p className="text-xs text-blue-500">+12.4 (0.3%) ↗</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <PiggyBank className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Bank Rate</p>
                  <p className="text-2xl font-bold text-purple-600">9.25%</p>
                  <p className="text-xs text-slate-500">Central Bank Rate</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Inflation Rate</p>
                  <p className="text-2xl font-bold text-orange-600">13.4%</p>
                  <p className="text-xs text-red-500">-0.2% from last month</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Financial Tools */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Financial Planning Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Button
                onClick={() => setShowLoanCalculator(true)}
                className="h-16 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Loan Calculator
              </Button>
              <Button
                onClick={() => setShowInvestmentTracker(true)}
                variant="outline"
                className="h-16 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Investment Tracker
              </Button>
              <Button
                onClick={() => setShowSavingsGoal(true)}
                variant="outline"
                className="h-16 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <PiggyBank className="h-5 w-5 mr-2" />
                Savings Goal
              </Button>
              <Button
                onClick={() => setShowBudgetPlanner(true)}
                variant="outline"
                className="h-16 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                <Target className="h-5 w-5 mr-2" />
                Budget Planner
              </Button>
            </div>
          </div>
        </section>

        {/* Financial News & Updates */}
        <section className="py-8 bg-gradient-to-r from-slate-50 to-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Financial News & Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <img
                    src="https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2Fefcee56a289b4fd584fd9f34dc4d4aa7?alt=media&token=33eafad3-aba3-4153-a243-6922a8efa4b5&apiKey=7c87b45712944202864afb9b3f47cba2"
                    alt="Financial News"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <Badge className="bg-emerald-100 text-emerald-800 mb-2">Banking</Badge>
                  <h3 className="font-bold text-slate-900 mb-2">New Mobile Banking Features Launched</h3>
                  <p className="text-slate-600 text-sm mb-3">Banks introduce enhanced security features for mobile transactions</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="h-4 w-4 mr-1" />
                    2 hours ago
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <img
                    src="https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F3e7c8068f27446a9b865726c17257635?alt=media&token=a194efea-d537-47d3-8aa0-333d686516f6&apiKey=7c87b45712944202864afb9b3f47cba2"
                    alt="Investment News"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <Badge className="bg-blue-100 text-blue-800 mb-2">Investment</Badge>
                  <h3 className="font-bold text-slate-900 mb-2">LuSE Index Reaches New Heights</h3>
                  <p className="text-slate-600 text-sm mb-3">Stock market performance shows positive trends for Q4</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="h-4 w-4 mr-1" />
                    5 hours ago
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <img
                    src="https://cdn.builder.io/o/assets%2F7c87b45712944202864afb9b3f47cba2%2F99f5a81f781c4ac0b8eda8541fd17836?alt=media&token=07029a4e-1f0a-47b1-8e1b-b21494144660&apiKey=7c87b45712944202864afb9b3f47cba2"
                    alt="Policy News"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <Badge className="bg-purple-100 text-purple-800 mb-2">Policy</Badge>
                  <h3 className="font-bold text-slate-900 mb-2">Central Bank Announces Rate Decision</h3>
                  <p className="text-slate-600 text-sm mb-3">Monetary policy committee maintains current interest rates</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="h-4 w-4 mr-1" />
                    1 day ago
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {financialCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm hover:bg-white border-emerald-200'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Providers Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider, index) => (
                <Card 
                  key={provider.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {/* Provider Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={provider.avatar} alt={provider.name} />
                        <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-slate-900">{provider.name}</h3>
                          {provider.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 font-medium">{provider.speciality}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-bold">{provider.rating}</span>
                          <span className="ml-1 text-sm text-slate-500">({provider.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2 font-medium">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.services.slice(0, 3).map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {provider.services.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{provider.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Licenses */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2 font-medium">Licenses:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.licenses.map((license, idx) => (
                          <Badge key={idx} className="bg-emerald-100 text-emerald-800 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            {license}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Location & Investment */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{provider.location} • {provider.distance}km</span>
                      </div>
                      {provider.minInvestment && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900">ZMW {provider.minInvestment.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">min. investment</div>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 mb-4 text-xs">
                      {provider.digitalService && (
                        <div className="flex items-center text-blue-600">
                          <Globe className="h-3 w-3 mr-1" />
                          Digital Service
                        </div>
                      )}
                      <div className="flex items-center text-emerald-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {provider.availability[0]}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleConsultation(provider)}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {provider.type === 'advisor' ? 'Consult' : provider.type === 'bank' ? 'Open Account' : 'Get Quote'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleChat(provider)}
                        className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Education */}
        <section className="py-16 bg-gradient-to-r from-emerald-100 to-blue-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Financial Education Hub</h2>
              <p className="text-slate-600">Learn to make smarter financial decisions with expert guidance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialTips.map((tip, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-emerald-100 text-emerald-700">{tip.category}</Badge>
                      <div className="flex items-center text-sm text-slate-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {tip.readTime}
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{tip.description}</p>
                    <Button variant="outline" size="sm" className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Security Notice */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Alert className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Investment Warning:</strong> All investments carry risk. Past performance does not guarantee future returns. 
                Consult with qualified financial advisors before making investment decisions.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </main>

      <Footer />

      {/* Loan Calculator Modal */}
      {showLoanCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Loan Calculator</h2>
              <Button variant="ghost" onClick={() => setShowLoanCalculator(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount (ZMW)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="50,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Interest Rate (%)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="15" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Loan Term (Years)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="5" />
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-1">Monthly Payment</p>
                    <p className="text-3xl font-bold text-emerald-600">ZMW 1,188</p>
                    <p className="text-sm text-slate-500">Total Interest: ZMW 21,280</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
                  Apply for This Loan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Booking Modal */}
      {showConsultation && selectedProvider && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Book Consultation</h2>
              <Button variant="ghost" onClick={() => setShowConsultation(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedProvider.avatar} alt={selectedProvider.name} />
                  <AvatarFallback>{selectedProvider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{selectedProvider.name}</h3>
                  <p className="text-slate-600">{selectedProvider.speciality}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-bold">{selectedProvider.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Service Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    {selectedProvider.services.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg" rows={3} placeholder="Describe your financial needs..."></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && selectedProvider && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedProvider.avatar} alt={selectedProvider.name} />
                  <AvatarFallback>{selectedProvider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-slate-900">{selectedProvider.name}</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              <Button variant="ghost" onClick={() => setShowChat(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="p-4 h-96 overflow-y-auto bg-slate-50">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hello! How can I help you with your financial planning today?</p>
                    <p className="text-xs text-slate-500 mt-1">Just now</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <Button size="sm" className="bg-emerald-600 text-white">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
