import { TrendingUp, TrendingDown, ShoppingCart, Package, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "ZMW 45,230",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "Orders",
    value: "234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Products Sold",
    value: "1,456",
    change: "+15.3%",
    trend: "up",
    icon: Package,
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Customers",
    value: "892",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    gradient: "from-purple-500 to-pink-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-white/20 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div
              className={`flex items-center text-sm font-medium ${
                stat.trend === "up" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {stat.change}
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
          <div className="text-sm text-slate-600">{stat.title}</div>
        </div>
      ))}
    </div>
  )
}
