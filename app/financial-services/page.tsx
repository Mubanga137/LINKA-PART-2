"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { EnhancedAgentMaps } from "@/components/financial/enhanced-agent-maps"
import { LiveChat } from "@/components/financial/live-chat"
import { DigitalKYC } from "@/components/financial/digital-kyc"
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
  GitCompare,
  Activity,
  MapPin,
  MessageCircle,
  Menu,
  X,
  Search,
  ArrowRight,
  Clock,
  Target,
  Percent
} from "lucide-react"

const financialCategories = [
  {
    id: "loans",
    name: "Loan Services",
    icon: CreditCard,
    description: "Microloans, business loans, and personal financing solutions",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    stats: { approved: "15K+", rate: "+23%" },
    items: [
      { name: "QuickCash Uganda", price: "UGX 100K - UGX 10M", users: "45K", rating: 4.8, discount: "FEATURED", processingTime: "< 24 hours", approval: "95%" },
      { name: "Business Finance Solutions", price: "UGX 1M - UGX 50M", users: "12K", rating: 4.6, discount: "BUSINESS", processingTime: "3-5 days", approval: "87%" },
      { name: "Community Credit Union", price: "UGX 200K - UGX 5M", users: "28K", rating: 4.7, discount: "COMMUNITY", processingTime: "2-3 days", approval: "92%" },
    ],
  },
  {
    id: "savings",
    name: "Savings & Investments",
    icon: PiggyBank,
    description: "Savings groups, cooperatives, and investment opportunities",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    stats: { approved: "8.5K", rate: "+12%" },
    items: [
      { name: "SACCO Savings Groups", price: "UGX 50K minimum", users: "32K", rating: 4.9, discount: "COOPERATIVE", returns: "12-15% annually" },
      { name: "Investment Clubs", price: "UGX 100K entry", users: "15K", rating: 4.7, discount: "GROWTH", returns: "18-25% annually" },
      { name: "Fixed Deposits", price: "UGX 500K minimum", users: "8K", rating: 4.5, discount: "SECURE", returns: "8-10% annually" },
    ],
  },
  {
    id: "mobile-money",
    name: "Mobile Money Agents",
    icon: Smartphone,
    description: "Find nearby MTN/Airtel agents for transactions",
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
    stats: { approved: "500+", rate: "+8%" },
    items: [
      { name: "MTN Mobile Money", price: "UGX 500 - 15K per transaction", users: "125K", rating: 4.4, discount: "POPULAR", network: "Largest network" },
      { name: "Airtel Money", price: "UGX 300 - 12K per transaction", users: "98K", rating: 4.6, discount: "LOW FEES", network: "Fast transfers" },
      { name: "Agent Banking", price: "Free transactions", users: "67K", rating: 4.5, discount: "BANK LINKED", network: "Bank services" },
    ],
  },
  {
    id: "insurance",
    name: "Insurance",
    icon: Shield,
    description: "Health, motor, life, and SME insurance coverage",
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-50 to-red-50",
    stats: { approved: "95%", rate: "+15%" },
    items: [
      { name: "Motor Insurance", price: "UGX 200K - 2M/year", users: "18K", rating: 4.5, discount: "COMPARE", coverage: "Comprehensive" },
      { name: "Health Insurance", price: "UGX 150K - 800K/year", users: "22K", rating: 4.7, discount: "FAMILY", coverage: "Medical & dental" },
      { name: "Life Insurance", price: "UGX 100K - 500K/year", users: "14K", rating: 4.6, discount: "PROTECTION", coverage: "Life & disability" },
    ],
  },
  {
    id: "tax-accounting",
    name: "Tax & Accounting",
    icon: FileText,
    description: "Professional tax consultants and accounting services",
    color: "from-indigo-500 to-blue-600",
    bgColor: "from-indigo-50 to-blue-50",
    stats: { approved: "200+", rate: "+18%" },
    items: [
      { name: "Tax Filing Services", price: "UGX 50K - 300K", users: "5.2K", rating: 4.8, discount: "EXPERT", service: "Individual & business" },
      { name: "Bookkeeping Services", price: "UGX 100K - 500K/month", users: "3.1K", rating: 4.7, discount: "MONTHLY", service: "Full accounting" },
      { name: "VAT Registration", price: "UGX 200K - 800K", users: "2.8K", rating: 4.6, discount: "COMPLIANCE", service: "Legal registration" },
    ],
  },
  {
    id: "payment-gateways",
    name: "Payment Gateways",
    icon: Globe,
    description: "Integrate payment solutions for your business",
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50",
    stats: { approved: "99.9%", rate: "+30%" },
    items: [
      { name: "Flutterwave Integration", price: "2.9% + UGX 100", users: "12K", rating: 4.9, discount: "POPULAR", features: "Multi-channel payments" },
      { name: "Paystack Uganda", price: "3.2% + UGX 150", users: "8K", rating: 4.7, discount: "RELIABLE", features: "Online & POS" },
      { name: "MTN MoMo API", price: "1.5% transaction fee", users: "25K", rating: 4.6, discount: "LOCAL", features: "Mobile integration" },
    ],
  },
]

export default function FinancialServicesPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("banking")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("overview")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const currentCategory = financialCategories.find((cat) => cat.id === activeCategory)

  const navigateToService = (serviceId: string) => {
    router.push(`/financial-services/${serviceId}`)
  }

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationSections = [
    { id: "overview", name: "Overview", icon: DollarSign },
    { id: "calculators", name: "Calculators", icon: Calculator },
    { id: "comparison", name: "Compare", icon: GitCompare },
    { id: "eligibility", name: "Eligibility", icon: FileText },
    { id: "agents", name: "Find Agents", icon: MapPin },
    { id: "kyc", name: "Digital KYC", icon: Shield },
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
        <section className="relative min-h-[70vh] overflow-hidden">
          {/* Background with gradient matching reference design */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500"></div>
          <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"}></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
            {/* Trust Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <Star className="h-5 w-5 text-yellow-300 fill-current" />
                <span className="font-medium">Trusted by 50,000+ Ugandans</span>
                <Star className="h-5 w-5 text-yellow-300 fill-current" />
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Trusted Financial Solutions
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                All in one place. Secure, verified, and designed for your success.
              </p>
            </div>

            {/* Live Update Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
                <span className="text-sm">John M. just got approved for UGX 2M loan</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by financial service, provider name, or location..."
                  className="w-full px-6 py-4 rounded-full bg-white/95 backdrop-blur-sm border-0 text-slate-900 placeholder-slate-500 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-full">
                <FileText className="mr-2 h-5 w-5" />
                Apply Now
              </Button>
              <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-full">
                <Phone className="mr-2 h-5 w-5" />
                Request Call
              </Button>
              <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-full">
                <MapPin className="mr-2 h-5 w-5" />
                Locate Agent
              </Button>
              <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-full">
                <Calculator className="mr-2 h-5 w-5" />
                Get a Quote
              </Button>
            </div>

            {/* Stats Cards matching reference design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                <div className="text-sm text-slate-600">Verified Providers</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">10K+</div>
                <div className="text-sm text-slate-600">Successful Applications</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">4.8</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">25%</div>
                <div className="text-sm text-slate-600">Growth Rate</div>
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

        {/* Financial Services Section */}
        <section id="overview" className="py-20 bg-slate-50 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                Financial Services
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive range of financial solutions designed to meet your personal and business needs.
              </p>
            </div>

            {/* Service Cards Grid matching reference design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {financialCategories.map((category, index) => (
                <Card
                  key={category.id}
                  className={`group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-0 ${
                    index < 3 ? 'mb-8' : ''
                  }`}
                  style={{
                    background: index === 0
                      ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
                      : index === 1
                      ? 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)'
                      : index === 2
                      ? 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)'
                      : index === 3
                      ? 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)'
                      : index === 4
                      ? 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)'
                      : 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)'
                  }}
                  onClick={() => navigateToService(category.id)}
                >
                  <CardContent className="p-8">
                    {/* Category Icon and Stats */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.color} shadow-lg`}>
                        <FeatureIcon icon={category.icon} className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {category.stats.approved} approved
                        </div>
                        <div className="text-xs text-green-600 font-medium">{category.stats.rate}</div>
                      </div>
                    </div>

                    {/* Category Title and Description */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${category.color} hover:shadow-lg transition-all duration-300 group-hover:scale-105 rounded-full py-3`}
                      onClick={() => {
                        // Navigate to specific service page
                        window.location.href = `/financial-services/${category.id}`
                      }}
                    >
                      Explore Services
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              ))}
            </div>

            {/* Explore All Services Button */}
            <div className="text-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => scrollToSection('calculators')}
              >
                Explore Services
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>

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

        {/* Why Choose Linka Finance */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                Why Choose Linka Finance?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Your security and success are our top priorities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Verified Providers */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Verified Providers</h3>
                <p className="text-slate-600 leading-relaxed">
                  All financial service providers are thoroughly vetted and licensed
                </p>
              </div>

              {/* Expert Support */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get guidance from financial experts throughout your journey
                </p>
              </div>

              {/* Mobile-First */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Mobile-First</h3>
                <p className="text-slate-600 leading-relaxed">
                  Access all services seamlessly on any device, anywhere
                </p>
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
                  <GitCompare className="h-4 w-4" />
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
                <TabsTrigger value="kyc" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Digital KYC</span>
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
                <EnhancedAgentMaps />
              </TabsContent>

              <TabsContent value="market-data" id="market-data" className="space-y-8">
                <RealTimeData />
              </TabsContent>

              <TabsContent value="kyc" id="kyc" className="space-y-8">
                <DigitalKYC />
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
                  icon: GitCompare,
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

        {/* Enhanced CTA Section matching reference design */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust Linka for their financial needs
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold"
                onClick={() => scrollToSection("calculators")}
              >
                <Star className="h-5 w-5 mr-2" />
                Start Your Application
              </Button>
              <Button
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold"
                onClick={() => scrollToSection("agents")}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Speak to an Expert
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Live Chat Component */}
      <LiveChat />
    </div>
  )
}
