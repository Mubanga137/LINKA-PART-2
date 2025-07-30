"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FinancialCalculators } from "@/components/financial/financial-calculators"
import { ComparisonTool } from "@/components/financial/comparison-tool"
import { RealTimeData } from "@/components/financial/real-time-data"
import { UserReviews } from "@/components/financial/user-reviews"
import { EligibilityTools } from "@/components/financial/eligibility-tools"
import { AgentMaps } from "@/components/financial/agent-maps"
import {
  CreditCard,
  DollarSign,
  PiggyBank,
  TrendingUp,
  Shield,
  Building,
  Smartphone,
  FileText,
  Users,
  Star,
  CheckCircle,
  AlertTriangle,
  Play,
  Download,
  Calculator,
  BarChart3,
  Globe,
  Award,
  Phone,
  Calendar,
  Compare,
  Activity,
  MapPin,
  MessageCircle,
  Menu,
  X
} from "lucide-react"

const financialCategories = [
  {
    id: "banking",
    name: "Banking Services",
    icon: Building,
    description: "Savings, current accounts, loans, and mobile banking",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    items: [
      { name: "Zanaco Savings Account", price: "ZMW 50 min balance", users: "45K", rating: 4.6, discount: "NO FEES" },
      { name: "Stanbic Personal Loans", price: "15% - 25% APR", users: "12K", rating: 4.5, discount: "FAST APPROVAL" },
      { name: "FNB Mobile Banking", price: "Free transactions", users: "28K", rating: 4.7, discount: "NEW" },
      { name: "Barclays Business Account", price: "ZMW 100 monthly", users: "8K", rating: 4.4, discount: null },
    ],
  },
  {
    id: "investments",
    name: "Investment Services",
    icon: TrendingUp,
    description: "Stocks, bonds, unit trusts, and portfolio management",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    items: [
      { name: "LuSE Stock Trading", price: "0.5% - 2% commission", users: "3.2K", rating: 4.8, discount: "TRENDING" },
      { name: "Unit Trust Funds", price: "ZMW 500 minimum", users: "5.1K", rating: 4.7, discount: "POPULAR" },
      { name: "Government Bonds", price: "ZMW 1,000 minimum", users: "2.8K", rating: 4.9, discount: "SECURE" },
      { name: "Portfolio Management", price: "1% - 3% annual fee", users: "890", rating: 4.8, discount: "EXPERT" },
    ],
  },
  {
    id: "insurance",
    name: "Insurance Products",
    icon: Shield,
    description: "Life, motor, health, and property insurance",
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
    items: [
      { name: "Motor Insurance", price: "ZMW 800 - 3,500/year", users: "18K", rating: 4.5, discount: "COMPARE" },
      { name: "Life Insurance", price: "ZMW 200 - 1,000/month", users: "14K", rating: 4.7, discount: "FAMILY" },
      { name: "Health Insurance", price: "ZMW 300 - 800/month", users: "22K", rating: 4.6, discount: "COVERAGE" },
      { name: "Property Insurance", price: "ZMW 500 - 2,000/year", users: "9K", rating: 4.4, discount: null },
    ],
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Digital payments, transfers, and mobile banking",
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-50 to-red-50",
    items: [
      { name: "MTN Mobile Money", price: "ZMW 2 - 15 per transaction", users: "125K", rating: 4.3, discount: "POPULAR" },
      { name: "Airtel Money", price: "ZMW 1.5 - 12 per transaction", users: "98K", rating: 4.5, discount: "LOW FEES" },
      { name: "Zamtel Kwacha", price: "ZMW 2 - 10 per transaction", users: "45K", rating: 4.2, discount: null },
      { name: "Bank Mobile Apps", price: "Free transactions", users: "67K", rating: 4.6, discount: "BANK LINKED" },
    ],
  },
  {
    id: "loans",
    name: "Loans & Credit",
    icon: CreditCard,
    description: "Personal loans, business loans, and credit facilities",
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-50 to-teal-50",
    items: [
      { name: "Quick Personal Loans", price: "18% - 35% APR", users: "8.5K", rating: 4.3, discount: "FAST" },
      { name: "Business Loans", price: "15% - 28% APR", users: "3.2K", rating: 4.5, discount: "SME" },
      { name: "Salary Advances", price: "12% - 25% APR", users: "12K", rating: 4.4, discount: "PAYROLL" },
      { name: "Asset Finance", price: "14% - 22% APR", users: "1.8K", rating: 4.6, discount: "ASSETS" },
    ],
  },
  {
    id: "advisory",
    name: "Financial Advisory",
    icon: Users,
    description: "Financial planning, tax advice, and wealth management",
    color: "from-indigo-500 to-blue-600",
    bgColor: "from-indigo-50 to-blue-50",
    items: [
      { name: "Financial Planning", price: "ZMW 500 - 2,000/session", users: "1.2K", rating: 4.9, discount: "CERTIFIED" },
      { name: "Tax Consultation", price: "ZMW 300 - 1,500/session", users: "2.8K", rating: 4.7, discount: "TAX SEASON" },
      { name: "Retirement Planning", price: "ZMW 800 - 3,000/plan", users: "890", rating: 4.8, discount: "FUTURE" },
      { name: "Business Advisory", price: "ZMW 1,000 - 5,000/project", users: "645", rating: 4.9, discount: "GROWTH" },
    ],
  },
]

export default function FinancialServicesPage() {
  const [activeCategory, setActiveCategory] = useState("banking")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("overview")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const currentCategory = financialCategories.find((cat) => cat.id === activeCategory)

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationSections = [
    { id: "overview", name: "Overview", icon: DollarSign },
    { id: "calculators", name: "Calculators", icon: Calculator },
    { id: "comparison", name: "Compare", icon: Compare },
    { id: "eligibility", name: "Eligibility", icon: FileText },
    { id: "agents", name: "Find Agents", icon: MapPin },
    { id: "market-data", name: "Live Data", icon: Activity },
    { id: "reviews", name: "Reviews", icon: MessageCircle }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const FeatureIcon = ({ icon: Icon, className }: { icon: any; className?: string }) => {
    if (!Icon) return null
    return <Icon className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
      <Header />

      {/* Sticky Navigation */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${
        scrollY > 200
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-emerald-600" />
              <span className="font-bold text-slate-900">Financial Services</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationSections.map((section) => (
                <Button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 transition-all ${
                    activeSection === section.id
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <FeatureIcon icon={section.icon} className="h-4 w-4" />
                  {section.name}
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-slate-200 mt-4">
              <nav className="grid grid-cols-2 gap-2 mt-4">
                {navigationSections.map((section) => (
                  <Button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 justify-start ${
                      activeSection === section.id
                        ? "bg-emerald-100 text-emerald-700 font-medium"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <FeatureIcon icon={section.icon} className="h-4 w-4" />
                    {section.name}
                  </Button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
      
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
                Comprehensive financial solutions for your personal and business needs. All providers are licensed and regulated by Zambian authorities.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-emerald-600">95+</div>
                <div className="text-sm text-slate-600">Licensed Providers</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-slate-600">Service Categories</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-purple-600">ZMW 2.5M+</div>
                <div className="text-sm text-slate-600">Monthly Volume</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-orange-600">4.6</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Alert */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Alert className="bg-emerald-50 border-emerald-200 mb-8">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800">
                <strong>Security Guarantee:</strong> All financial providers are licensed by BOZ, PICZ, FSCA, and other relevant Zambian authorities.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Financial Categories Section */}
        <section id="overview" className="py-16 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Financial
                </span>
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Categories
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Explore comprehensive financial services from trusted and verified providers across Zambia
              </p>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {financialCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="lg"
                  className={`group transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg hover:shadow-xl`
                      : "hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <category.icon
                    className={`mr-2 h-5 w-5 ${
                      activeCategory === category.id ? "text-white" : "text-slate-600"
                    } group-hover:scale-110 transition-transform`}
                  />
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Active Category Content */}
            {currentCategory && (
              <div className="space-y-8">
                {/* Category Header */}
                <div className="relative rounded-3xl p-8 border border-slate-200/50 overflow-hidden">
                  {/* Background */}
                  <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.bgColor} opacity-80`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${currentCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <FeatureIcon icon={currentCategory.icon} className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{currentCategory.name}</h3>
                        <p className="text-slate-600">{currentCategory.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{currentCategory.items.length}</div>
                      <div className="text-sm text-slate-500">Available Options</div>
                    </div>
                  </div>
                </div>

                {/* Category Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentCategory.items.map((item, index) => (
                    <Card
                      key={index}
                      className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden"
                      onMouseEnter={() => setHoveredItem(`${currentCategory.id}-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                              {item.name}
                            </h4>
                            <div className="text-lg font-bold text-emerald-600 mb-2">{item.price}</div>
                          </div>
                          {item.discount && (
                            <Badge
                              variant="secondary"
                              className={`${
                                item.discount === "POPULAR"
                                  ? "bg-red-100 text-red-700"
                                  : item.discount === "NEW"
                                    ? "bg-green-100 text-green-700"
                                    : item.discount === "TRENDING"
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-blue-100 text-blue-700"
                              } text-xs font-bold`}
                            >
                              {item.discount}
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-slate-600">
                              <Users className="h-4 w-4 mr-1" />
                              {item.users} users
                            </div>
                            <div className="flex items-center text-slate-600">
                              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                              {item.rating}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button
                            className={`w-full bg-gradient-to-r ${currentCategory.color} hover:shadow-lg transition-all group-hover:scale-105`}
                            size="sm"
                          >
                            {currentCategory.id === "banking" ? (
                              <>
                                <Building className="mr-2 h-4 w-4" />
                                Apply Now
                              </>
                            ) : currentCategory.id === "investments" ? (
                              <>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Invest Now
                              </>
                            ) : currentCategory.id === "insurance" ? (
                              <>
                                <Shield className="mr-2 h-4 w-4" />
                                Get Quote
                              </>
                            ) : currentCategory.id === "mobile-money" ? (
                              <>
                                <Smartphone className="mr-2 h-4 w-4" />
                                Get Started
                              </>
                            ) : currentCategory.id === "loans" ? (
                              <>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Apply Loan
                              </>
                            ) : (
                              <>
                                <Users className="mr-2 h-4 w-4" />
                                Book Consultation
                              </>
                            )}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full hover:bg-slate-50 bg-transparent"
                          >
                            {currentCategory.id === "advisory" ? "Schedule Call" : "Learn More"}
                          </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${currentCategory.color} transition-all duration-1000 ease-out ${
                              hoveredItem === `${currentCategory.id}-${index}` ? "w-full" : "w-0"
                            }`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Market Trends */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full px-8 py-4 border border-emerald-200/50 shadow-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Market Trends:</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-white/50 px-3 py-1 rounded-full">Mobile Money +25%</span>
                  <span className="bg-white/50 px-3 py-1 rounded-full">Digital Banking +40%</span>
                  <span className="bg-white/50 px-3 py-1 rounded-full">Investment Apps +35%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Tools and Services */}
        <section className="py-16 bg-gradient-to-r from-slate-50 to-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Tabs defaultValue="calculators" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Financial
                  </span>
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    {" "}
                    Tools & Services
                  </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Comprehensive tools to help you make informed financial decisions
                </p>
              </div>

              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 bg-white rounded-xl border border-slate-200 p-1">
                <TabsTrigger value="calculators" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">Calculators</span>
                </TabsTrigger>
                <TabsTrigger value="comparison" className="flex items-center gap-2">
                  <Compare className="h-4 w-4" />
                  <span className="hidden sm:inline">Compare</span>
                </TabsTrigger>
                <TabsTrigger value="eligibility" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Eligibility</span>
                </TabsTrigger>
                <TabsTrigger value="agents" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Find Agents</span>
                </TabsTrigger>
                <TabsTrigger value="market-data" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Live Data</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Reviews</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calculators" id="calculators" className="space-y-8">
                <FinancialCalculators />
              </TabsContent>

              <TabsContent value="comparison" id="comparison" className="space-y-8">
                <ComparisonTool />
              </TabsContent>

              <TabsContent value="eligibility" id="eligibility" className="space-y-8">
                <EligibilityTools />
              </TabsContent>

              <TabsContent value="agents" id="agents" className="space-y-8">
                <AgentMaps />
              </TabsContent>

              <TabsContent value="market-data" id="market-data" className="space-y-8">
                <RealTimeData />
              </TabsContent>

              <TabsContent value="reviews" id="reviews" className="space-y-8">
                <UserReviews />
              </TabsContent>

              <TabsContent value="education" className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Financial Education Hub</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Learn to make smarter financial decisions with expert guidance
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Build Your Emergency Fund", category: "Savings", time: "3 min", level: "Beginner" },
                    { title: "Understanding Investment Options", category: "Investment", time: "5 min", level: "Intermediate" },
                    { title: "Insurance Planning Guide", category: "Insurance", time: "4 min", level: "Beginner" },
                    { title: "Loan Application Tips", category: "Credit", time: "6 min", level: "Intermediate" },
                    { title: "Retirement Planning Strategies", category: "Planning", time: "8 min", level: "Advanced" },
                    { title: "Digital Banking Security", category: "Security", time: "4 min", level: "Beginner" }
                  ].map((article, index) => (
                    <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="bg-emerald-100 text-emerald-700">{article.category}</Badge>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar className="h-4 w-4" />
                            {article.time}
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{article.title}</h3>
                        <p className="text-slate-600 text-sm mb-4">Learn essential financial skills to secure your future and make informed decisions</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={`text-xs ${
                            article.level === "Beginner" ? "border-green-200 text-green-600" :
                            article.level === "Intermediate" ? "border-yellow-200 text-yellow-600" :
                            "border-red-200 text-red-600"
                          }`}>
                            {article.level}
                          </Badge>
                          <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                            Read Article
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Enhanced Features Showcase */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Why Choose
                </span>
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Our Platform?
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Advanced tools and personalized guidance for all your financial needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Calculator,
                  title: "Smart Calculators",
                  description: "Advanced loan, savings, and investment calculators with real-time results",
                  color: "from-blue-500 to-cyan-600",
                  features: ["Loan Payment Calculator", "Savings Goal Planner", "Investment Growth Projector"]
                },
                {
                  icon: Compare,
                  title: "Product Comparison",
                  description: "Compare financial products side-by-side to find the best deals",
                  color: "from-green-500 to-emerald-600",
                  features: ["Rate Comparison", "Feature Analysis", "User Reviews"]
                },
                {
                  icon: FileText,
                  title: "Eligibility Checker",
                  description: "Check your eligibility for loans, accounts, and financial products",
                  color: "from-purple-500 to-violet-600",
                  features: ["Instant Assessment", "Personalized Recommendations", "Document Guidance"]
                },
                {
                  icon: MapPin,
                  title: "Agent Locator",
                  description: "Find nearby banks, mobile money agents, and financial advisors",
                  color: "from-red-500 to-pink-600",
                  features: ["Interactive Maps", "Real-time Availability", "Contact Details"]
                },
                {
                  icon: Activity,
                  title: "Live Market Data",
                  description: "Real-time exchange rates, stock prices, and economic indicators",
                  color: "from-orange-500 to-yellow-600",
                  features: ["Currency Rates", "LuSE Stocks", "Economic Updates"]
                },
                {
                  icon: Shield,
                  title: "Secure & Verified",
                  description: "All providers are licensed and regulated by Zambian authorities",
                  color: "from-indigo-500 to-blue-600",
                  features: ["BOZ Licensed", "PICZ Certified", "Data Protection"]
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <FeatureIcon icon={feature.icon} className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((feat, featIndex) => (
                        <li key={featIndex} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Warning */}
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

        {/* Enhanced CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Financial Future?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust our platform for their financial needs.
              Get started with our comprehensive tools and expert guidance today.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-emerald-600 mb-2">95%</div>
                <div className="text-sm text-slate-600">Customer Satisfaction</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-sm text-slate-600">Expert Support</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-sm text-slate-600">Financial Partners</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("calculators")}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Start with Calculators
              </Button>
              <Button
                onClick={() => scrollToSection("agents")}
                variant="outline"
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Find Local Agents
              </Button>
              <Button
                onClick={() => scrollToSection("eligibility")}
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                <FileText className="h-5 w-5 mr-2" />
                Check Eligibility
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
