import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Star,
  Zap,
  Crown,
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  Headphones,
  Rocket,
} from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for new retailers just getting started",
    price: "Free",
    period: "Forever",
    popular: false,
    gradient: "from-blue-500 to-indigo-600",
    features: [
      "Up to 50 products",
      "Basic analytics",
      "Mobile money payments",
      "Standard support",
      "Basic store customization",
      "Order management",
    ],
    limitations: [
      "3% transaction fee",
      "Basic features only",
    ],
    cta: "Start Free",
  },
  {
    name: "Growth",
    description: "For established retailers ready to scale",
    price: "ZMW 299",
    period: "per month",
    popular: true,
    gradient: "from-emerald-500 to-green-600",
    features: [
      "Unlimited products",
      "Advanced analytics",
      "All payment methods",
      "Priority support",
      "Full store customization",
      "Inventory management",
      "Marketing tools",
      "Customer insights",
      "Bulk operations",
    ],
    limitations: [
      "1.5% transaction fee",
    ],
    cta: "Start 30-Day Trial",
  },
  {
    name: "Enterprise",
    description: "For large retailers and multi-location businesses",
    price: "Custom",
    period: "Contact us",
    popular: false,
    gradient: "from-purple-500 to-pink-600",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced reporting",
      "Multi-location support",
      "API access",
      "Custom training",
      "24/7 phone support",
    ],
    limitations: [
      "Negotiable rates",
    ],
    cta: "Contact Sales",
  },
]

const comparisonFeatures = [
  {
    category: "Products & Inventory",
    features: [
      { name: "Product listings", starter: "50", growth: "Unlimited", enterprise: "Unlimited" },
      { name: "Bulk upload", starter: "✗", growth: "✓", enterprise: "✓" },
      { name: "Inventory tracking", starter: "Basic", growth: "Advanced", enterprise: "Enterprise" },
      { name: "Product variants", starter: "Limited", growth: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Analytics & Reporting",
    features: [
      { name: "Sales analytics", starter: "Basic", growth: "Advanced", enterprise: "Custom" },
      { name: "Customer insights", starter: "✗", growth: "✓", enterprise: "✓" },
      { name: "Export reports", starter: "✗", growth: "✓", enterprise: "✓" },
      { name: "API access", starter: "✗", growth: "✗", enterprise: "✓" },
    ],
  },
]

export function RetailerPricing() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 text-purple-700 border border-purple-200/50 mb-6">
            <Crown className="mr-2 h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Simple, Transparent Pricing</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Success Plan
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade as you grow. No hidden fees, no setup costs. 
            Only pay for what you need to succeed.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-emerald-500 shadow-xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 shadow-lg">
                    <Star className="mr-2 h-4 w-4" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    {index === 0 && <Rocket className="h-8 w-8 text-white" />}
                    {index === 1 && <TrendingUp className="h-8 w-8 text-white" />}
                    {index === 2 && <Crown className="h-8 w-8 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-slate-900">{plan.price}</div>
                    <div className="text-slate-500">{plan.period}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-8 p-4 bg-slate-50 rounded-xl">
                    <div className="text-sm font-medium text-slate-600 mb-2">Note:</div>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="text-sm text-slate-500">
                        • {limitation}
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-xl shadow-emerald-500/25'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
                  } transition-all hover:-translate-y-0.5`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/30 shadow-xl mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">
              Detailed Feature Comparison
            </h3>
            
            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
                  {category.category}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Feature</th>
                        <th className="text-center py-3 px-4 font-medium text-slate-600">Starter</th>
                        <th className="text-center py-3 px-4 font-medium text-slate-600">Growth</th>
                        <th className="text-center py-3 px-4 font-medium text-slate-600">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-slate-100">
                          <td className="py-3 px-4 text-slate-700">{feature.name}</td>
                          <td className="py-3 px-4 text-center text-slate-600">{feature.starter}</td>
                          <td className="py-3 px-4 text-center text-slate-600">{feature.growth}</td>
                          <td className="py-3 px-4 text-center text-slate-600">{feature.enterprise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Not sure which plan is right for you?
          </h3>
          <p className="text-lg text-slate-600 mb-8">
            Start with our free plan and upgrade anytime. Our team is here to help you choose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg shadow-xl shadow-emerald-500/25"
            >
              <Rocket className="mr-3 h-5 w-5" />
              Start Free Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg"
            >
              <Headphones className="mr-3 h-5 w-5" />
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
