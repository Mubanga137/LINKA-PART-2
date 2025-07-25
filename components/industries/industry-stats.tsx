import { TrendingUp, Users, Package, DollarSign, Globe, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Active Retailers",
    value: "346",
    change: "+12%",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Package,
    label: "Products Listed",
    value: "8,650",
    change: "+28%",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: "ZMW 2.8M",
    change: "+35%",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Globe,
    label: "Cities Covered",
    value: "15",
    change: "+3",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: Award,
    label: "Success Rate",
    value: "94%",
    change: "+2%",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    icon: TrendingUp,
    label: "Growth Rate",
    value: "127%",
    change: "+15%",
    gradient: "from-teal-500 to-cyan-600",
  },
]

export function IndustryStats() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Industry{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real numbers showing how Linka is transforming Zambian industries
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-white/20 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-2 hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                <stat.icon className="h-6 w-6 text-white group-hover:animate-bounce" />
              </div>

              <div className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                {stat.value}
              </div>

              <div className="text-sm text-slate-600 mb-2 group-hover:text-slate-800 transition-colors">
                {stat.label}
              </div>

              <div className="text-xs text-emerald-600 font-bold flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 group-hover:animate-bounce" />
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
