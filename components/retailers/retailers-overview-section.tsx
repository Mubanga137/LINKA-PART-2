import { ShoppingBag, Users, Globe, TrendingUp } from "lucide-react"

export function RetailersOverviewSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Why Choose Linka?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Linka is more than just an e-commerce platform—we're your partner in building a successful online business
            in Zambia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Built for Zambian Entrepreneurs</h3>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We understand the unique challenges facing Zambian businesses. From mobile money integration to local
                delivery networks, Linka is designed specifically for the Zambian market.
              </p>
              <p>
                Our platform combines international e-commerce best practices with deep local knowledge, giving you the
                tools to compete globally while staying rooted in your community.
              </p>
              <p>
                Whether you're selling traditional crafts, modern fashion, or innovative tech products, Linka provides
                the infrastructure and support you need to succeed online.
              </p>
            </div>
          </div>

          {/* Right Content - Platform Features */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: ShoppingBag,
                title: "Easy Product Management",
                description: "Upload and manage your inventory with our intuitive tools",
              },
              {
                icon: Users,
                title: "Customer Insights",
                description: "Understand your customers with detailed analytics and reports",
              },
              {
                icon: Globe,
                title: "Nationwide Reach",
                description: "Sell to customers across all 10 provinces of Zambia",
              },
              {
                icon: TrendingUp,
                title: "Growth Tools",
                description: "Marketing and promotional tools to boost your sales",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12 border border-emerald-200/50 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Linka by the Numbers</h3>
            <p className="text-slate-600">See the impact we're making across Zambia</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "150+", label: "Active Retailers" },
              { value: "50K+", label: "Monthly Customers" },
              { value: "ZMW 2M+", label: "Revenue Generated" },
              { value: "10+", label: "Provinces Served" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
