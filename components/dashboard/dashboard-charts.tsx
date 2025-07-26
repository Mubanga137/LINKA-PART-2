"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, BarChart3, Calendar, Download } from "lucide-react"

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

interface DashboardChartsProps {
  data: DashboardData
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  // Mock chart data - in a real app, this would come from your analytics service
  const revenueData = [
    { month: 'Jan', revenue: 18500, orders: 45 },
    { month: 'Feb', revenue: 22300, orders: 52 },
    { month: 'Mar', revenue: 19800, orders: 48 },
    { month: 'Apr', revenue: 25100, orders: 58 },
    { month: 'May', revenue: 23400, orders: 55 },
    { month: 'Jun', revenue: 28540, orders: 68 },
  ]

  const topCategories = [
    { name: 'Jewelry', value: 35, color: 'bg-emerald-500' },
    { name: 'Fashion', value: 25, color: 'bg-blue-500' },
    { name: 'Food', value: 20, color: 'bg-purple-500' },
    { name: 'Crafts', value: 15, color: 'bg-orange-500' },
    { name: 'Other', value: 5, color: 'bg-slate-500' },
  ]

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Revenue Analytics
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 months
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="revenue">Revenue Trend</TabsTrigger>
            <TabsTrigger value="categories">Top Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  ZMW {data.revenue.thisMonth.toLocaleString()}
                </h3>
                <p className="text-sm text-slate-600">Revenue this month</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{data.revenue.growth.toFixed(1)}%
              </Badge>
            </div>

            {/* Simple chart visualization */}
            <div className="space-y-3">
              {revenueData.map((item, index) => {
                const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
                const percentage = (item.revenue / maxRevenue) * 100

                return (
                  <div key={item.month} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-slate-600">
                      {item.month}
                    </div>
                    <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-white text-xs font-medium">
                          {percentage > 50 ? `ZMW ${item.revenue.toLocaleString()}` : ''}
                        </span>
                      </div>
                    </div>
                    {percentage <= 50 && (
                      <div className="w-20 text-sm font-medium text-slate-900">
                        ZMW {item.revenue.toLocaleString()}
                      </div>
                    )}
                    <div className="w-16 text-sm text-slate-600">
                      {item.orders} orders
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Sales by Category
              </h3>
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                        <span className="font-medium text-slate-900">{category.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{category.value}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  ZMW {(data.revenue.thisMonth * 0.35).toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">Top Category Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {Math.round(data.orders.completed * 0.35)}
                </div>
                <div className="text-sm text-slate-600">Top Category Orders</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
