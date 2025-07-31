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
  PiggyBank,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Calculator,
  ArrowRight,
  Building,
  Target,
  Award,
  Shield,
  BarChart3,
  DollarSign,
  Percent,
  Calendar,
  LineChart,
  BookOpen
} from "lucide-react"

export default function SavingsInvestmentsPage() {
  const [savingsGoal, setSavingsGoal] = useState("35000")
  const [monthlyContribution, setMonthlyContribution] = useState("3500")
  const [timeframe, setTimeframe] = useState("12")
  const [riskTolerance, setRiskTolerance] = useState("")
  const [totalSavings, setTotalSavings] = useState(0)

  const calculateSavings = () => {
    const goal = parseFloat(savingsGoal)
    const monthly = parseFloat(monthlyContribution)
    const months = parseFloat(timeframe)
    
    if (monthly && months) {
      const total = monthly * months
      setTotalSavings(total)
    }
  }

  const savingsOptions = [
    {
      icon: Users,
      title: "SACCO Savings Groups",
      description: "Join community savings cooperatives for higher returns",
      minAmount: "ZMW 3.5K",
      returns: "12-15% annually",
      risk: "Low",
      term: "Flexible",
      members: "32K+ members",
      color: "from-green-500 to-emerald-600",
      features: ["Group support", "Low fees", "Loan access", "Dividend sharing"]
    },
    {
      icon: TrendingUp,
      title: "Investment Clubs",
      description: "Pool resources with others for better investment opportunities",
      minAmount: "ZMW 7K",
      returns: "18-25% annually",
      risk: "Medium",
      term: "6-12 months",
      members: "15K+ members",
      color: "from-blue-500 to-indigo-600",
      features: ["Portfolio diversification", "Expert guidance", "Higher returns", "Networking"]
    },
    {
      icon: Shield,
      title: "Fixed Deposits",
      description: "Secure savings with guaranteed returns",
      minAmount: "ZMW 35K",
      returns: "8-10% annually",
      risk: "Very Low",
      term: "6-24 months",
      members: "8K+ investors",
      color: "from-purple-500 to-violet-600",
      features: ["Guaranteed returns", "FSCS protected", "No market risk", "Early withdrawal options"]
    },
    {
      icon: BarChart3,
      title: "Unit Trusts",
      description: "Professional fund management for optimal growth",
      minAmount: "ZMW 70K",
      returns: "15-30% annually",
      risk: "Medium-High",
      term: "12+ months",
      members: "5K+ investors",
      color: "from-orange-500 to-red-600",
      features: ["Professional management", "Diversification", "Liquidity", "Regular updates"]
    }
  ]

  const investmentProviders = [
    {
      name: "Zambia Investment Authority",
      type: "Government Agency",
      rating: 4.9,
      reviews: 245,
      totalFunds: "ZMW 175M",
      clients: "15K+",
      services: ["Investment Advisory", "SACCO Registration", "Financial Planning"],
      location: "Lusaka Central",
      phone: "+260 97 123 456",
      verified: true,
      featured: true,
      performance: "12.5% avg return"
    },
    {
      name: "Centenary Investment Club",
      type: "Investment Club",
      rating: 4.7,
      reviews: 189,
      totalFunds: "ZMW 126M",
      clients: "8K+",
      services: ["Group Investments", "Portfolio Management", "Financial Education"],
      location: "Kitwe, Zambia",
      phone: "+260 97 234 567",
      verified: true,
      featured: false,
      performance: "18.2% avg return"
    },
    {
      name: "Zanaco Investment Services",
      type: "Bank",
      rating: 4.8,
      reviews: 156,
      totalFunds: "ZMW 364M",
      clients: "25K+",
      services: ["Unit Trusts", "Fixed Deposits", "Treasury Bills"],
      location: "Multiple Branches",
      phone: "+260 97 345 678",
      verified: true,
      featured: false,
      performance: "10.8% avg return"
    }
  ]

  const goalTracker = [
    { month: "Jan", saved: 45000, target: 50000 },
    { month: "Feb", saved: 52000, target: 50000 },
    { month: "Mar", saved: 48000, target: 50000 },
    { month: "Apr", saved: 55000, target: 50000 },
    { month: "May", saved: 50000, target: 50000 },
    { month: "Jun", saved: 60000, target: 50000 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-600">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-8">
            <span>Finance</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-white font-medium">Savings & Investments</span>
          </div>

          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Savings & Investments
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Build wealth through savings groups, cooperatives, and investment opportunities with 8.5K approved members and +12% growth rate
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">8.5K+</div>
              <div className="text-sm text-white/80">Active Savers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">+12%</div>
              <div className="text-sm text-white/80">Average Growth</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">15%</div>
              <div className="text-sm text-white/80">Best Returns</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-white/80">Groups Available</div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-16">
        {/* Smart Savings Calculator */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 mb-16">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-700">Savings Goal Calculator</CardTitle>
                <p className="text-green-600">Plan your savings journey and track your progress</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="savings-goal">Savings Goal (ZMW)</Label>
                    <Input
                      id="savings-goal"
                      type="number"
                      value={savingsGoal}
                      onChange={(e) => setSavingsGoal(e.target.value)}
                      className="bg-white text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly-contribution">Monthly Contribution (ZMW)</Label>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      className="bg-white text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe (months)</Label>
                    <Input
                      id="timeframe"
                      type="number"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="bg-white text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                    <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                        <SelectItem value="medium">Moderate (Medium Risk)</SelectItem>
                        <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={calculateSavings}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-full text-lg font-semibold"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Calculate Savings Plan
                  </Button>
                </div>

                {totalSavings > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-green-600 font-medium mb-2">Total Savings</p>
                        <p className="text-3xl font-bold text-green-700">ZMW {totalSavings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-green-600 font-medium mb-2">Goal Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={(totalSavings / parseFloat(savingsGoal)) * 100} className="flex-1 h-3" />
                          <span className="text-sm font-semibold">{Math.round((totalSavings / parseFloat(savingsGoal)) * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-green-600 font-medium mb-2">Time to Goal</p>
                        <p className="text-2xl font-bold text-green-700">{timeframe} months</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Savings & Investment Options */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Investment Opportunities</h2>
              <p className="text-xl text-slate-600">Choose the right savings and investment option for your goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {savingsOptions.map((option, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <option.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{option.title}</h3>
                      <p className="text-slate-600">{option.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">Min. Amount</p>
                          <p className="font-semibold text-slate-900">{option.minAmount}</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">Expected Returns</p>
                          <p className="font-semibold text-green-600">{option.returns}</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">Risk Level</p>
                          <Badge className={`${option.risk === 'Low' || option.risk === 'Very Low' ? 'bg-green-100 text-green-700' : option.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {option.risk}
                          </Badge>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">Term</p>
                          <p className="font-semibold text-slate-900">{option.term}</p>
                        </div>
                      </div>
                      
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600 mb-1">Community</p>
                        <p className="font-semibold text-blue-700">{option.members}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-3">Key Features:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {option.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${option.color} hover:shadow-lg transition-all duration-300`}>
                      Join Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Dashboard */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Investment Dashboard</h2>
              <p className="text-xl text-slate-600">Track your savings progress and investment performance</p>
            </div>

            <Tabs defaultValue="progress" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl border border-slate-200 p-1">
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Progress Tracker
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="goals" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Goals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="progress">
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Savings Progress</CardTitle>
                    <p className="text-slate-600">Your monthly savings performance</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      {goalTracker.map((month, index) => (
                        <div key={index} className="text-center">
                          <p className="text-sm font-medium text-slate-600 mb-2">{month.month}</p>
                          <div className="relative w-16 h-16 mx-auto mb-2">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                month.saved >= month.target ? 'bg-green-500' : 'bg-orange-500'
                              }`}>
                                {Math.round((month.saved / month.target) * 100)}%
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">UGX {(month.saved / 1000).toFixed(0)}K</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance">
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Investment Performance</CardTitle>
                    <p className="text-slate-600">Your portfolio growth over time</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center p-6 bg-green-50 rounded-xl">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-700 mb-2">+14.2%</h3>
                        <p className="text-green-600">Total Returns</p>
                      </div>
                      <div className="text-center p-6 bg-blue-50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-700 mb-2">UGX 2.8M</h3>
                        <p className="text-blue-600">Total Value</p>
                      </div>
                      <div className="text-center p-6 bg-purple-50 rounded-xl">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-purple-700 mb-2">18 months</h3>
                        <p className="text-purple-600">Investment Period</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals">
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Financial Goals</CardTitle>
                    <p className="text-slate-600">Track your progress towards financial milestones</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { goal: "Emergency Fund", target: 1000000, current: 750000, deadline: "Dec 2024" },
                        { goal: "New Business", target: 5000000, current: 2100000, deadline: "Jun 2025" },
                        { goal: "House Deposit", target: 20000000, current: 4500000, deadline: "Dec 2025" }
                      ].map((goal, index) => (
                        <div key={index} className="p-6 bg-slate-50 rounded-xl">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">{goal.goal}</h3>
                            <Badge className="bg-green-100 text-green-700">{goal.deadline}</Badge>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-600">UGX {(goal.current / 1000000).toFixed(1)}M</span>
                            <span className="text-slate-600">UGX {(goal.target / 1000000).toFixed(1)}M</span>
                          </div>
                          <Progress value={(goal.current / goal.target) * 100} className="h-3 mb-2" />
                          <p className="text-sm text-slate-500">{Math.round((goal.current / goal.target) * 100)}% complete</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Verified Investment Providers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted Investment Partners</h2>
              <p className="text-xl text-slate-600">Work with verified and regulated investment providers</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {investmentProviders.map((provider, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${provider.featured ? 'ring-2 ring-green-500' : ''}`}>
                  {provider.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">Featured</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                        <PiggyBank className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{provider.name}</h3>
                        <p className="text-green-600 font-medium mb-2">{provider.type}</p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-slate-500">({provider.reviews} reviews)</span>
                          </div>
                          {provider.verified && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Total Funds:</p>
                        <p className="font-semibold text-slate-900">{provider.totalFunds}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Clients:</p>
                        <p className="font-semibold text-slate-900">{provider.clients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Performance:</p>
                        <p className="font-semibold text-green-600">{provider.performance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Location:</p>
                        <p className="font-semibold text-slate-900">{provider.location}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.services.map((service, serviceIndex) => (
                          <Badge key={serviceIndex} variant="secondary" className="bg-green-100 text-green-700">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        Start Investing
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

        {/* Financial Education */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-green-700 to-emerald-600">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Investment Education</h2>
              <p className="text-white/90">Learn how to make your money work for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Understanding Risk vs Return", time: "5 min read", level: "Beginner" },
                { title: "Building a Diversified Portfolio", time: "7 min read", level: "Intermediate" },
                { title: "Long-term Wealth Building Strategies", time: "10 min read", level: "Advanced" }
              ].map((article, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{article.title}</h3>
                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <span>{article.time}</span>
                      <Badge className="bg-white/20 text-white border-white/20">{article.level}</Badge>
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
