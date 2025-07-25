import { TrendingUp, Users, MapPin, Banknote } from "lucide-react"

const impactStats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Users",
    description: "Customers shopping on Linka monthly",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: MapPin,
    value: "150+",
    label: "Partner Retailers",
    description: "Local businesses growing with us",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Banknote,
    value: "ZMW 2M+",
    label: "Revenue Generated",
    description: "For our retail partners this year",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: TrendingUp,
    value: "300%",
    label: "Average Growth",
    description: "In retailer sales after joining",
    color: "from-purple-500 to-pink-600",
  },
]

export function AboutImpactSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-600/10 to-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-600/10 to-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Our Impact</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Measuring success by the positive change we create in Zambian communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-emerald-400 mb-2">{stat.label}</div>
              <div className="text-sm text-slate-400">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-900/20 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Empowering Zambian Entrepreneurs
              </h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  Every transaction on Linka directly supports local businesses and creates economic opportunities in
                  communities across Zambia. We're not just building a marketplace—we're fostering an ecosystem of
                  entrepreneurship and innovation.
                </p>
                <p>
                  From traditional craft makers in rural areas to tech-savvy retailers in urban centers, Linka provides
                  the tools, platform, and support needed to reach new customers and grow sustainably.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-400 mb-2">85%</div>
                <div className="text-sm text-slate-300">Of retailers report increased income</div>
              </div>
              <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400 mb-2">92%</div>
                <div className="text-sm text-slate-300">Customer satisfaction rate</div>
              </div>
              <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-400 mb-2">24h</div>
                <div className="text-sm text-slate-300">Average delivery time in Lusaka</div>
              </div>
              <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400 mb-2">10+</div>
                <div className="text-sm text-slate-300">Provinces served nationwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
