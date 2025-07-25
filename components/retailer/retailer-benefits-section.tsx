import { ShoppingBag, CreditCard, Truck, BarChart3, Shield, Headphones } from "lucide-react"

const benefits = [
  {
    icon: ShoppingBag,
    title: "Zero Setup Costs",
    description: "Start selling immediately with no upfront fees or hidden charges",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
  },
  {
    icon: CreditCard,
    title: "Instant Payments",
    description: "Receive payments directly to your mobile money or bank account",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: Truck,
    title: "Local Delivery Network",
    description: "We handle delivery across Lusaka and major Zambian cities",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Track your performance with detailed sales reports and insights",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your business and customer data is protected with bank-level security",
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help anytime with our dedicated Zambian customer support team",
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-50",
  },
]

export function RetailerBenefitsSection() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Why Choose{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Linka?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join the leading e-commerce platform in Zambia and unlock new opportunities for your business
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
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
