'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  Eye,
  Star,
  Calendar,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock data for the dashboard
const dashboardStats = {
  totalRevenue: 1108000,
  revenueChange: 28.4,
  totalOrders: 2472,
  ordersChange: 15.2,
  pendingOrders: 23,
  activeProducts: 3847,
  productsChange: 18.7,
  lowStock: 5,
  totalCustomers: 12429,
  customersChange: 12.8,
  newCustomers: 325
};

const recentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Alexandra Chen',
    avatar: 'AC',
    items: 3,
    amount: 459.99,
    status: 'Delivered',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Marcus Johnson',
    avatar: 'MJ',
    items: 2,
    amount: 289.5,
    status: 'Processing',
    statusColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Sofia Rodriguez',
    avatar: 'SR',
    items: 1,
    amount: 129.99,
    status: 'Shipped',
    statusColor: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 'ORD-2024-004',
    customer: 'David Kim',
    avatar: 'DK',
    items: 4,
    amount: 699.99,
    status: 'Pending',
    statusColor: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Emma Thompson',
    avatar: 'ET',
    items: 2,
    amount: 189.99,
    status: 'Cancelled',
    statusColor: 'bg-red-100 text-red-700'
  }
];

const topProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    sales: 1847,
    revenue: 258680,
    growth: 18.2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    sales: 1523,
    revenue: 456900,
    growth: 12.8,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop'
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    category: 'Home & Garden',
    sales: 892,
    revenue: 178400,
    growth: 24.5,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop'
  },
  {
    id: 4,
    name: 'Professional Camera Lens',
    category: 'Electronics',
    sales: 634,
    revenue: 190200,
    growth: 8.7,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=80&h=80&fit=crop'
  },
  {
    id: 5,
    name: 'Designer Backpack',
    category: 'Fashion',
    sales: 567,
    revenue: 96400,
    growth: 16.3,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop'
  }
];

const businessInsights = [
  {
    id: 1,
    type: 'Exceptional Growth',
    title: 'Revenue increased by 28.4% this month, driven by strong electronics sales and improved customer retention.',
    icon: 'A',
    color: 'bg-green-100 text-green-700',
    action: 'Learn More'
  },
  {
    id: 2,
    type: 'Category Leader',
    title: 'Electronics category dominates with 35% market share and highest profit margins in your portfolio.',
    icon: 'B',
    color: 'bg-blue-100 text-blue-700',
    action: 'Learn More'
  },
  {
    id: 3,
    type: 'Inventory Alert',
    title: '5 high-demand products are running low. Consider restocking to avoid missed sales opportunities.',
    icon: 'O',
    color: 'bg-orange-100 text-orange-700',
    action: 'Learn More'
  }
];

const strategicRecommendations = [
  {
    title: 'Optimize Product Listings',
    description: 'Enhance product descriptions and images for top-performing items to boost conversion rates by an estimated 15%.',
    action: 'Learn More'
  },
  {
    title: 'Expand Marketing Reach',
    description: 'Increase advertising spend for electronics category to capitalize on high-performing products and market demand.',
    action: 'Learn More'
  },
  {
    title: 'Customer Loyalty Program',
    description: 'Implement a rewards system to increase repeat purchases and improve customer lifetime value by 25%.',
    action: 'Learn More'
  }
];

export default function RetailerDashboardPage() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
              Retailer Dashboard Overview
            </h1>
            <p className="text-indigo-700 mt-1 font-medium">Welcome back! Here's your business performance at a glance.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                          <DollarSign className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-emerald-700 mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                        ZMW {dashboardStats.totalRevenue.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                        <span className="text-sm text-emerald-700 font-bold">
                          +{dashboardStats.revenueChange}% vs last month
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={75} className="h-3 bg-emerald-200" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardStats.totalOrders.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          +{dashboardStats.ordersChange}% {dashboardStats.pendingOrders} pending
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={68} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-orange-600" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Active Products</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardStats.activeProducts.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          +{dashboardStats.productsChange}% {dashboardStats.lowStock} low stock
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={82} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Customers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardStats.totalCustomers.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          +{dashboardStats.customersChange}% {dashboardStats.newCustomers} new
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={91} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Analytics */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Revenue Analytics</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[80px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1M">1M</SelectItem>
                        <SelectItem value="3M">3M</SelectItem>
                        <SelectItem value="6M">6M</SelectItem>
                        <SelectItem value="1Y">1Y</SelectItem>
                      </SelectContent>
                    </Select>
                    <Filter className="h-4 w-4 text-gray-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Monthly performance and growth trends</p>
                  <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900">Revenue Chart</p>
                      <p className="text-sm text-gray-500">Interactive chart showing growth trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sales Distribution */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Sales Distribution</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Revenue by product category</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Electronics</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">35%</p>
                        <p className="text-xs text-gray-500">ZMW 61,040</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Fashion</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">28%</p>
                        <p className="text-xs text-gray-500">ZMW 61,040</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">Home & Garden</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">18%</p>
                        <p className="text-xs text-gray-500">ZMW 61,040</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Sports & Fitness</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">12%</p>
                        <p className="text-xs text-gray-500">ZMW 26,100</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">Books & Media</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">7%</p>
                        <p className="text-xs text-gray-500">ZMW 15,260</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Latest customer transactions</p>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                              {order.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                            <p className="text-xs text-gray-500">{order.id} • {order.items} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">ZMW {order.amount}</p>
                          <Badge className={`text-xs ${order.statusColor}`}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Best performing items</p>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                        </div>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category} • {product.sales} sales</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">ZMW {product.revenue.toLocaleString()}</p>
                          <div className="flex items-center text-xs text-green-600">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            +{product.growth}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* Business Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Business Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-6">Comprehensive business metrics and trends</p>
                  <div className="space-y-4">
                    {businessInsights.map((insight) => (
                      <div key={insight.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight.color} flex-shrink-0`}>
                          <span className="text-sm font-bold">{insight.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{insight.type}</h4>
                          <p className="text-sm text-gray-600 mb-3">{insight.title}</p>
                          <Button variant="outline" size="sm">
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Star className="h-5 w-5 mr-2 text-orange-600" />
                    Strategic Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {strategicRecommendations.map((rec, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                        <Button variant="outline" size="sm">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          {rec.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RetailerDashboardLayout>
  );
}
