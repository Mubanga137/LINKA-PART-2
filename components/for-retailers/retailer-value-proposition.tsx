import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Globe,
  Smartphone,
  BarChart3,
  Shield,
  Zap,
  CreditCard,
  Users,
  Store,
  Target,
  Award,
  Clock,
} from "lucide-react"

const valuePropositions = [
  {
    icon: Globe,
    title: "Nationwide Reach",
    description: "Access customers across all 10 provinces of Zambia",
    stats: "150K+ active customers",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    features: ["Urban & rural markets", "Mobile-first platform", "Local payment methods"],
  },
  {
    icon: TrendingUp,
    title: "Proven Growth",
    description: "Retailers see average 300% increase in sales within 6 months",
    stats: "300% avg growth",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    features: ["AI-powered recommendations", "Dynamic pricing tools", "Market insights"],
  },
  {
    icon: CreditCard,
    title: "Instant Payments",
    description: "Get paid immediately with our secure payment system",
    stats: "24hr payouts",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    features: ["Mobile money integration", "Bank transfers", "Cash on delivery"],
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Make data-driven decisions with comprehensive insights",
    stats: "Real-time data",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    features: ["Sales forecasting", "Customer behavior", "Inventory optimization"],
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security protecting your business",
    stats: "99.9% uptime",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-50",
    features: ["SSL encryption", "Fraud protection", "Data backup"],
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "24/7 support from our local Zambian team",
    stats: "24/7 support",
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50",
    features: ["Phone & WhatsApp", "Training sessions", "Account management"],
  },
]

const platformStats = [
  {
    icon: Store,
    label: "Active Retailers",
    value: "1,247",
    change: "+150 this month",
  },
  {
    icon: Target,
    label: "Success Rate",
    value: "94%",
    change: "Retailers profitable",
  },
  {
    icon: Award,
    label: "Customer Rating",
    value: "4.8/5",
    change: "Platform satisfaction",
  },
  {
    icon: Clock,
    label: "Avg. Setup Time",
    value: "15min",
    change: "From signup to selling",
  },
]

export function RetailerValueProposition() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-6 py-3 text-emerald-700 border border-emerald-200/50 mb-6">
            <Zap className="mr-2 h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium">Why Choose Linka?</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Everything You Need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Succeed Online
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From powerful tools to dedicated support, we provide everything Zambian retailers need 
            to thrive in the digital marketplace.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {platformStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
                <div className="text-xs text-emerald-600 font-medium">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuePropositions.map((prop, index) => (
            <Card
              key={index}
              className="group relative bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prop.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              <CardContent className="relative p-8">
                {/* Icon & Stats Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${prop.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <prop.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-slate-700 font-bold">
                    {prop.stats}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800">
                  {prop.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {prop.description}
                </p>

                {/* Features List */}
                <div className="space-y-3">
                  {prop.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 mb-4">
            Ready to transform your business with these powerful features?
          </p>
          <div className="inline-flex items-center space-x-2 text-emerald-600">
            <Smartphone className="h-5 w-5" />
            <span className="font-medium">Start your free account in less than 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
