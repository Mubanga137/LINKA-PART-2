import { Package, ShoppingBag, Truck, Star } from "lucide-react"

interface ShopStatsProps {
  totalProducts?: number
}

export function ShopStats({ totalProducts }: ShopStatsProps) {
  const stats = [
    {
      icon: Package,
      label: "Available Products",
      value: totalProducts ? `${totalProducts.toLocaleString()}` : "Loading...",
      description: "Ready to purchase",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      icon: ShoppingBag,
      label: "Product Categories",
      value: "12+",
      description: "Different categories",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Truck,
      label: "Fast Delivery",
      value: "24hrs",
      description: "Average delivery time",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Star,
      label: "Product Rating",
      value: "4.8⭐",
      description: "Customer satisfaction",
      gradient: "from-purple-500 to-pink-600",
    },
  ]
  
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-white/20 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-slate-700 mb-1">{stat.label}</div>
            <div className="text-xs text-slate-500">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
