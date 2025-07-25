import { CreditCard, Truck, BarChart3, Shield, Headphones, Zap } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Zero Setup Costs",
    description: "Start selling immediately with no upfront fees, monthly charges, or hidden costs",
    features: ["No registration fees", "No monthly subscriptions", "No listing fees", "Only pay when you sell"],
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
  },
  {
    icon: CreditCard,
    title: "Instant Payments",
    description: "Get paid immediately after each sale through mobile money or bank transfer",
    features: ["MTN Mobile Money", "Airtel Money", "Bank transfers", "Daily payouts available"],
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "We handle logistics so you can focus on your products and customers",
    features: ["Same-day delivery in Lusaka", "Nationwide shipping", "Package tracking", "Insurance coverage"],
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Make data-driven decisions with comprehensive sales reports and insights",
    features: ["Real-time sales data", "Customer demographics", "Product performance", "Trend analysis"],
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your business and customer data is protected with enterprise-grade security",
    features: ["SSL encryption", "Secure payments", "Data backup", "Fraud protection"],
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get help when you need it with our local customer support team",
    features: ["24/7 phone support", "Live chat assistance", "Email support", "Training resources"],
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-50",
  },
]

export function RetailersBenefitsSection() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              to Succeed Online
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From setup to scaling, we provide all the tools and support you need to build a thriving online business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6`}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{benefit.description}</p>

                <ul className="space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-700 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
