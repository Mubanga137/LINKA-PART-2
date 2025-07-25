import { Store, TrendingUp, Users, Shield, Truck, CreditCard } from "lucide-react"

const categories = [
  {
    icon: Store,
    title: "Getting Started",
    description: "Everything you need to set up your store",
    articles: 12,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
  },
  {
    icon: TrendingUp,
    title: "Growing Your Business",
    description: "Tips and strategies to increase sales",
    articles: 18,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Build lasting relationships with customers",
    articles: 9,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Shield,
    title: "Security & Safety",
    description: "Keep your business and data secure",
    articles: 7,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Manage orders and delivery efficiently",
    articles: 15,
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
  },
  {
    icon: CreditCard,
    title: "Payments & Fees",
    description: "Understanding payments and pricing",
    articles: 11,
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-50",
  },
]

export function ResourcesCategories() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Browse by{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Find the information you need organized by topic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group relative cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6`}
                >
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{category.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{category.articles} articles</span>
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
