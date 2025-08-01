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
  MoreHorizontal,
  Activity,
  AlertCircle,
  CheckCircle
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
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Marcus Johnson',
    avatar: 'MJ',
    items: 2,
    amount: 289.5,
    status: 'Processing',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Sofia Rodriguez',
    avatar: 'SR',
    items: 1,
    amount: 129.99,
    status: 'Shipped',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'ORD-2024-004',
    customer: 'David Kim',
    avatar: 'DK',
    items: 4,
    amount: 699.99,
    status: 'Pending',
    statusColor: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Emma Thompson',
    avatar: 'ET',
    items: 2,
    amount: 189.99,
    status: 'Cancelled',
    statusColor: 'bg-red-50 text-red-700 border-red-200'
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
    icon: CheckCircle,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    action: 'View Details'
  },
  {
    id: 2,
    type: 'Category Performance',
    title: 'Electronics category dominates with 35% market share and highest profit margins in your portfolio.',
    icon: Activity,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    action: 'Analyze Trends'
  },
  {
    id: 3,
    type: 'Inventory Alert',
    title: '5 high-demand products are running low. Consider restocking to avoid missed sales opportunities.',
    icon: AlertCircle,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    action: 'Manage Stock'
  }
];

const strategicRecommendations = [
  {
    title: 'Optimize Product Listings',
    description: 'Enhance product descriptions and images for top-performing items to boost conversion rates by an estimated 15%.',
    priority: 'High',
    impact: '+15% conversion',
    action: 'Start Optimization'
  },
  {
    title: 'Expand Marketing Reach',
    description: 'Increase advertising spend for electronics category to capitalize on high-performing products and market demand.',
    priority: 'Medium',
    impact: '+25% visibility',
    action: 'Create Campaign'
  },
  {
    title: 'Customer Loyalty Program',
    description: 'Implement a rewards system to increase repeat purchases and improve customer lifetime value by 25%.',
    priority: 'High',
    impact: '+25% retention',
    action: 'Design Program'
  }
];

export default function RetailerDashboardPage() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <RetailerDashboardLayout>
      <div className="h-full flex flex-col">
        {/* Content Container */}
        <div className="flex-1 p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Dashboard Overview
              </h1>
              <p className="text-slate-600 font-medium">
                Welcome back! Here's your business performance at a glance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Total Revenue */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{dashboardStats.revenueChange}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-emerald-700">Total Revenue</p>
                      <p className="text-2xl font-bold text-emerald-900">
                        ZMW {dashboardStats.totalRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-600">vs last month</p>
                    </div>
                    <div className="mt-4">
                      <Progress value={75} className="h-2 bg-emerald-200" />
                    </div>
                  </CardContent>
                </Card>

                {/* Total Orders */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-blue-100/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{dashboardStats.ordersChange}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-700">Total Orders</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {dashboardStats.totalOrders.toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-600">{dashboardStats.pendingOrders} pending</p>
                    </div>
                    <div className="mt-4">
                      <Progress value={68} className="h-2 bg-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                {/* Active Products */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{dashboardStats.productsChange}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-600">Active Products</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {dashboardStats.activeProducts.toLocaleString()}
                      </p>
                      <p className="text-xs text-red-600">{dashboardStats.lowStock} low stock</p>
                    </div>
                    <div className="mt-4">
                      <Progress value={82} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Total Customers */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{dashboardStats.customersChange}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-600">Total Customers</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {dashboardStats.totalCustomers.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">{dashboardStats.newCustomers} new</p>
                    </div>
                    <div className="mt-4">
                      <Progress value={91} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Analytics */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-semibold text-slate-900">Revenue Analytics</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-20 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1M">1M</SelectItem>
                          <SelectItem value="3M">3M</SelectItem>
                          <SelectItem value="6M">6M</SelectItem>
                          <SelectItem value="1Y">1Y</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">Monthly performance and growth trends</p>
                    <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg flex items-center justify-center border border-slate-200/50">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
                          <TrendingUp className="h-8 w-8 text-slate-600" />
                        </div>
                        <p className="text-lg font-semibold text-slate-900">Revenue Chart</p>
                        <p className="text-sm text-slate-500">Interactive chart showing growth trends</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sales Distribution */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-semibold text-slate-900">Sales Distribution</CardTitle>
                    <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">Revenue by product category</p>
                    <div className="space-y-4">
                      {[
                        { name: 'Electronics', percentage: 35, revenue: 61040, color: 'bg-blue-500' },
                        { name: 'Fashion', percentage: 28, revenue: 48832, color: 'bg-emerald-500' },
                        { name: 'Home & Garden', percentage: 18, revenue: 31392, color: 'bg-orange-500' },
                        { name: 'Sports & Fitness', percentage: 12, revenue: 20928, color: 'bg-purple-500' },
                        { name: 'Books & Media', percentage: 7, revenue: 12208, color: 'bg-pink-500' }
                      ].map((category) => (
                        <div key={category.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                            <span className="text-sm font-medium text-slate-700">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-900">{category.percentage}%</p>
                            <p className="text-xs text-slate-500">ZMW {category.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders and Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-semibold text-slate-900">Recent Orders</CardTitle>
                    <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-medium text-sm">
                                {order.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{order.customer}</p>
                              <p className="text-xs text-slate-500">{order.id} • {order.items} items</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-900">ZMW {order.amount}</p>
                            <Badge className={`text-xs border ${order.statusColor}`}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Products */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-semibold text-slate-900">Top Products</CardTitle>
                    <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                      <Star className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50/50 transition-colors">
                          <div className="flex-shrink-0">
                            <div className="w-7 h-7 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-slate-600">{index + 1}</span>
                            </div>
                          </div>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.category} • {product.sales} sales</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-900">ZMW {product.revenue.toLocaleString()}</p>
                            <div className="flex items-center text-xs text-emerald-600">
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
              {/* Business Insights and Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Business Insights */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      Business Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {businessInsights.map((insight) => {
                        const Icon = insight.icon;
                        return (
                          <div key={insight.id} className={`flex items-start space-x-3 p-4 ${insight.bgColor} rounded-lg border ${insight.borderColor}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border ${insight.borderColor} flex-shrink-0`}>
                              <Icon className={`h-4 w-4 ${insight.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-slate-900 mb-1">{insight.type}</h4>
                              <p className="text-sm text-slate-700 mb-3">{insight.title}</p>
                              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-white">
                                {insight.action}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Recommendations */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-amber-600" />
                      Strategic Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {strategicRecommendations.map((rec, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-medium text-slate-900">{rec.title}</h4>
                            <Badge variant="outline" className={`text-xs ${
                              rec.priority === 'High' ? 'border-red-200 text-red-700' : 'border-amber-200 text-amber-700'
                            }`}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{rec.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-emerald-600 font-medium">{rec.impact}</span>
                            <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-100">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              {rec.action}
                            </Button>
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
      </div>
    </RetailerDashboardLayout>
  );
}
