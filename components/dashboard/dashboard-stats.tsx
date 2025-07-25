"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from "lucide-react"

interface DashboardData {
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
  }
  orders: {
    total: number
    pending: number
    completed: number
    cancelled: number
  }
  products: {
    total: number
    inStock: number
    lowStock: number
    outOfStock: number
  }
  customers: {
    total: number
    new: number
    returning: number
  }
}

interface DashboardStatsProps {
  data: DashboardData
}

export function DashboardStats({ data }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: `ZMW ${data.revenue.total.toLocaleString()}`,
      subtitle: `ZMW ${data.revenue.thisMonth.toLocaleString()} this month`,
      change: data.revenue.growth,
      changeText: `${data.revenue.growth > 0 ? '+' : ''}${data.revenue.growth.toFixed(1)}% from last month`,
      icon: DollarSign,
      color: "emerald",
      trend: data.revenue.growth > 0 ? "up" : "down"
    },
    {
      title: "Orders",
      value: data.orders.total.toString(),
      subtitle: `${data.orders.pending} pending, ${data.orders.completed} completed`,
      change: 12.5,
      changeText: "+12.5% from last month",
      icon: ShoppingCart,
      color: "blue",
      trend: "up"
    },
    {
      title: "Products",
      value: data.products.total.toString(),
      subtitle: `${data.products.inStock} in stock, ${data.products.lowStock} low stock`,
      change: -2.1,
      changeText: "-2.1% from last month",
      icon: Package,
      color: "purple",
      trend: "down"
    },
    {
      title: "Customers",
      value: data.customers.total.toString(),
      subtitle: `${data.customers.new} new, ${data.customers.returning} returning`,
      change: 8.3,
      changeText: "+8.3% from last month",
      icon: Users,
      color: "orange",
      trend: "up"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: {
        bg: "from-emerald-500 to-green-600",
        text: "text-emerald-600",
        light: "bg-emerald-50 text-emerald-700 border-emerald-200"
      },
      blue: {
        bg: "from-blue-500 to-indigo-600",
        text: "text-blue-600",
        light: "bg-blue-50 text-blue-700 border-blue-200"
      },
      purple: {
        bg: "from-purple-500 to-violet-600",
        text: "text-purple-600",
        light: "bg-purple-50 text-purple-700 border-purple-200"
      },
      orange: {
        bg: "from-orange-500 to-red-600",
        text: "text-orange-600",
        light: "bg-orange-50 text-orange-700 border-orange-200"
      }
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color)
        const IconComponent = stat.icon

        return (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${colors.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <p className="text-sm text-slate-500">{stat.subtitle}</p>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={`${
                      stat.trend === 'up' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(stat.change).toFixed(1)}%
                  </Badge>
                  <span className="text-xs text-slate-500">vs last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
