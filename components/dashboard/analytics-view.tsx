"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp,
  Calendar,
  Download,
  Filter
} from "lucide-react"

interface DashboardData {
  revenue: {
    total: number
    thisMonth: number
    growth: number
    monthlyData: Array<{ month: string; revenue: number; orders: number; customers: number }>
  }
  orders: {
    total: number
    pending: number
    processing: number
    delivered: number
    growth: number
  }
  products: {
    total: number
    active: number
    lowStock: number
    growth: number
  }
  customers: {
    total: number
    new: number
    growth: number
    satisfaction: number
    returnRate: number
  }
  insights: {
    topCategories: Array<{ name: string; value: number; color: string }>
    recentOrders: Array<{
      id: string
      customer: string
      avatar: string
      amount: number
      status: string
      date: string
      items: number
    }>
    topProducts: Array<{
      id: string
      name: string
      category: string
      sales: number
      growth: number
      price: number
    }>
  }
}

interface AnalyticsViewProps {
  data: DashboardData
}

export function AnalyticsView({ data }: AnalyticsViewProps) {
  const formatCurrency = (amount: number) => {
    return `ZMW ${amount.toLocaleString()}`
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
          <p className="text-gray-600">Comprehensive business metrics and trends</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            6M
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Chart */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="h-80 flex items-end justify-between space-x-2 mb-6">
            {data.revenue.monthlyData.map((item, index) => {
              const maxRevenue = Math.max(...data.revenue.monthlyData.map(d => d.revenue))
              const maxOrders = Math.max(...data.revenue.monthlyData.map(d => d.orders))
              const maxCustomers = Math.max(...data.revenue.monthlyData.map(d => d.customers))
              
              const revenueHeight = (item.revenue / maxRevenue) * 280
              const ordersHeight = (item.orders / maxOrders) * 280
              const customersHeight = (item.customers / maxCustomers) * 280

              return (
                <div key={item.month} className="flex-1 flex items-end justify-center space-x-1">
                  <div className="w-8 flex flex-col items-center space-y-1">
                    <div 
                      className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors cursor-pointer"
                      style={{ height: `${revenueHeight}px` }}
                      title={`Revenue: ${formatCurrency(item.revenue)}`}
                    ></div>
                    <div className="text-xs text-gray-500 text-center">{item.month}</div>
                  </div>
                  <div className="w-8 flex flex-col items-center">
                    <div 
                      className="w-full bg-green-600 rounded-t hover:bg-green-700 transition-colors cursor-pointer"
                      style={{ height: `${customersHeight}px` }}
                      title={`Customers: ${item.customers}`}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Customers</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Conversion Rate</div>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900">4.2%</div>
            <div className="text-sm text-green-600 mt-1">+0.8% from last month</div>
            <div className="text-xs text-gray-500">Excellent rating</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Customer Satisfaction</div>
              <Badge className="bg-green-100 text-green-800">
                Excellent rating
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.customers.satisfaction}/5</div>
            <div className="text-sm text-green-600 mt-1">+0.2 from last month</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Return Rate</div>
              <Badge className="bg-blue-100 text-blue-800">
                -0.3% improvement
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.customers.returnRate}%</div>
            <div className="text-sm text-blue-600 mt-1">-0.3% improvement</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '18%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Avg Order Value</div>
              <Badge className="bg-green-100 text-green-800">
                +ZMW 23 increase
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900">ZMW 448</div>
            <div className="text-sm text-green-600 mt-1">+ZMW 23 increase</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
