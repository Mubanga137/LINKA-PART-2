"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  MoreHorizontal,
  Calendar,
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

interface DashboardOverviewProps {
  data: DashboardData
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return `ZMW ${amount.toLocaleString()}`
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Revenue */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(data.revenue.total)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {formatPercentage(data.revenue.growth)}
                      </span>
                      <span className="text-sm text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Orders */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {data.orders.total.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">
                        {formatPercentage(data.orders.growth)}
                      </span>
                      <span className="text-sm text-gray-500">{data.orders.pending} pending</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Products */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-orange-600" />
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Active Products</p>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {data.products.total.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">
                        {formatPercentage(data.products.growth)}
                      </span>
                      <span className="text-sm text-gray-500">{data.products.lowStock} low stock</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Customers */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {data.customers.total.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">
                        {formatPercentage(data.customers.growth)}
                      </span>
                      <span className="text-sm text-gray-500">{data.customers.new} new</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Analytics */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Revenue Analytics</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    6M
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-4">
                  Monthly performance and growth trends
                </div>
                
                {/* Simple Bar Chart */}
                <div className="space-y-4 h-64">
                  {data.revenue.monthlyData.map((item, index) => {
                    const maxRevenue = Math.max(...data.revenue.monthlyData.map(d => d.revenue))
                    const height = (item.revenue / maxRevenue) * 100

                    return (
                      <div key={item.month} className="flex items-end space-x-4">
                        <div className="w-12 text-xs text-gray-500 text-center">
                          {item.month}
                        </div>
                        <div className="flex-1 flex items-end space-x-1 h-8">
                          <div 
                            className="bg-blue-600 rounded-t"
                            style={{ 
                              height: `${height}%`,
                              width: '30%'
                            }}
                          ></div>
                          <div 
                            className="bg-green-600 rounded-t"
                            style={{ 
                              height: `${(item.customers / 300) * 100}%`,
                              width: '30%'
                            }}
                          ></div>
                        </div>
                        <div className="w-20 text-xs text-gray-600 text-right">
                          orders: {item.orders}
                        </div>
                        <div className="w-20 text-xs text-gray-600 text-right">
                          customers: {item.customers}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sales Distribution */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Sales Distribution</CardTitle>
                <div className="text-sm text-gray-600">
                  Revenue by product category
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.insights.topCategories.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{category.value}%</div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(data.revenue.total * category.value / 100)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-4">
                  Latest customer transactions
                </div>
                <div className="space-y-4">
                  {data.insights.recentOrders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            {order.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{order.customer}</div>
                          <div className="text-sm text-gray-500">
                            {order.id} • {order.items} items
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {formatCurrency(order.amount)}
                        </div>
                        <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Products</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-4">
                  Best performing items
                </div>
                <div className="space-y-4">
                  {data.insights.topProducts.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.category} • {product.sales} sales
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {formatCurrency(product.price)}
                        </div>
                        <div className="text-sm text-green-600">
                          {formatPercentage(product.growth)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
