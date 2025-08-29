'use client';

import { useState, useEffect, useMemo } from 'react';
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
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for dashboard
const dashboardStats = {
  totalRevenue: 2847650,
  revenueChange: 28.4,
  totalOrders: 3847,
  ordersChange: 15.2,
  pendingOrders: 127,
  completedOrders: 3720,
  activeProducts: 892,
  productsChange: 18.7,
  lowStock: 12,
  totalCustomers: 15847,
  customersChange: 22.8,
  newCustomers: 387,
  conversionRate: 12.4,
  avgOrderValue: 740.50
};

const recentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Michael Thompson',
    avatar: 'MT',
    items: 3,
    amount: 1249.99,
    status: 'Delivered',
    statusColor: 'bg-green-100 text-green-700',
    time: '2 hours ago'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Sarah Wilson',
    avatar: 'SW',
    items: 2,
    amount: 899.50,
    status: 'Processing',
    statusColor: 'bg-blue-100 text-blue-700',
    time: '3 hours ago'
  },
  {
    id: 'ORD-2024-003',
    customer: 'David Chen',
    avatar: 'DC',
    items: 1,
    amount: 599.99,
    status: 'Shipped',
    statusColor: 'bg-yellow-100 text-yellow-700',
    time: '5 hours ago'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Emma Rodriguez',
    avatar: 'ER',
    items: 4,
    amount: 1899.99,
    status: 'Pending',
    statusColor: 'bg-orange-100 text-orange-700',
    time: '1 day ago'
  },
  {
    id: 'ORD-2024-005',
    customer: 'James Anderson',
    avatar: 'JA',
    items: 2,
    amount: 759.99,
    status: 'Cancelled',
    statusColor: 'bg-red-100 text-red-700',
    time: '2 days ago'
  }
];

const topProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    sales: 247,
    revenue: 395680,
    growth: 32.1,
    image: 'https://images.unsplash.com/photo-1592286590955-87fa9830c4c3?w=80&h=80&fit=crop',
    stock: 15
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    category: 'Electronics',
    sales: 89,
    revenue: 534700,
    growth: 28.7,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=80&h=80&fit=crop',
    stock: 8
  },
  {
    id: 3,
    name: 'AirPods Pro 2nd Gen',
    category: 'Electronics',
    sales: 156,
    revenue: 78000,
    growth: 45.2,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=80&fit=crop',
    stock: 32
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24',
    category: 'Electronics',
    sales: 134,
    revenue: 201000,
    growth: 19.8,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=80&h=80&fit=crop',
    stock: 22
  }
];

const lowStockAlerts = [
  { name: 'iPhone 15 Pro Max', currentStock: 3, minStock: 10, urgency: 'high' },
  { name: 'MacBook Pro M3', currentStock: 2, minStock: 5, urgency: 'critical' },
  { name: 'iPad Air M2', currentStock: 7, minStock: 15, urgency: 'medium' },
  { name: 'AirPods Pro 2nd Gen', currentStock: 12, minStock: 20, urgency: 'low' }
];

const performanceMetrics = [
  {
    title: 'Sales Target',
    current: 2847650,
    target: 3000000,
    percentage: 94.9,
    trend: 'up',
    change: '+28.4%'
  },
  {
    title: 'Customer Satisfaction',
    current: 4.8,
    target: 5.0,
    percentage: 96,
    trend: 'up',
    change: '+0.3'
  },
  {
    title: 'Order Fulfillment',
    current: 97.2,
    target: 98.0,
    percentage: 99.2,
    trend: 'up',
    change: '+2.1%'
  }
];

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentValue = startValue + (endValue - startValue) * easeOutCubic(progress);
      setDisplayValue(Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  return <span>{displayValue.toLocaleString()}</span>;
};

export default function PremiumDashboardOverview() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-teal-800 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Good morning, Sarah! 👋</h2>
              <p className="text-blue-200 text-lg">Here's what's happening with your store today.</p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">98.7%</div>
                <div className="text-sm text-blue-200">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">+47%</div>
                <div className="text-sm text-blue-200">vs Last Month</div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">ZMW <AnimatedCounter value={dashboardStats.totalRevenue} /></div>
              <div className="text-sm text-blue-200">Total Revenue</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold"><AnimatedCounter value={dashboardStats.totalOrders} /></div>
              <div className="text-sm text-blue-200">Total Orders</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold"><AnimatedCounter value={dashboardStats.activeProducts} /></div>
              <div className="text-sm text-blue-200">Active Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold"><AnimatedCounter value={dashboardStats.totalCustomers} /></div>
              <div className="text-sm text-blue-200">Total Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 group-hover:from-emerald-400/20 group-hover:to-teal-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.revenueChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-emerald-700">Total Revenue</p>
              <p className="text-3xl font-bold text-emerald-900">
                ZMW <AnimatedCounter value={dashboardStats.totalRevenue} />
              </p>
              <p className="text-sm text-emerald-600">vs last month</p>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2 bg-emerald-200" />
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 group-hover:from-blue-400/20 group-hover:to-indigo-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.ordersChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-700">Total Orders</p>
              <p className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={dashboardStats.totalOrders} />
              </p>
              <p className="text-sm text-blue-600">{dashboardStats.pendingOrders} pending</p>
            </div>
            <div className="mt-4">
              <Progress value={78} className="h-2 bg-blue-200" />
            </div>
          </CardContent>
        </Card>

        {/* Active Products */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-violet-500/10 group-hover:from-purple-400/20 group-hover:to-violet-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Package className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.productsChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-700">Active Products</p>
              <p className="text-3xl font-bold text-purple-900">
                <AnimatedCounter value={dashboardStats.activeProducts} />
              </p>
              <p className="text-sm text-purple-600">{dashboardStats.lowStock} low stock</p>
            </div>
            <div className="mt-4">
              <Progress value={92} className="h-2 bg-purple-200" />
            </div>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 group-hover:from-orange-400/20 group-hover:to-red-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.customersChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-orange-700">Total Customers</p>
              <p className="text-3xl font-bold text-orange-900">
                <AnimatedCounter value={dashboardStats.totalCustomers} />
              </p>
              <p className="text-sm text-orange-600">{dashboardStats.newCustomers} new this month</p>
            </div>
            <div className="mt-4">
              <Progress value={88} className="h-2 bg-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">{metric.title}</h3>
                <Badge className={`${metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Progress</span>
                  <span>{metric.percentage}%</span>
                </div>
                <Progress value={metric.percentage} className="h-3" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{metric.current.toLocaleString()}</span>
                  <span>{metric.target.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
              Recent Orders
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-600 text-white font-bold">
                        {order.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{order.customer}</p>
                      <p className="text-sm text-slate-500">{order.id} • {order.items} items</p>
                      <p className="text-xs text-slate-400">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">ZMW {order.amount.toLocaleString()}</p>
                    <Badge className={`text-xs ${order.statusColor} mt-1`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold flex items-center">
              <Star className="h-5 w-5 mr-2 text-orange-600" />
              Top Products
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.category} • {product.sales} sales</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Stock: {product.stock}
                      </Badge>
                      {product.stock < 10 && (
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          Low Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">ZMW {product.revenue.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-green-600">
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

      {/* Low Stock Alerts */}
      <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center text-orange-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockAlerts.map((item, index) => (
              <div key={index} className={`
                p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md
                ${item.urgency === 'critical' ? 'border-red-300 bg-red-50' : ''}
                ${item.urgency === 'high' ? 'border-orange-300 bg-orange-50' : ''}
                ${item.urgency === 'medium' ? 'border-yellow-300 bg-yellow-50' : ''}
                ${item.urgency === 'low' ? 'border-blue-300 bg-blue-50' : ''}
              `}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                  <Badge className={`
                    text-xs
                    ${item.urgency === 'critical' ? 'bg-red-100 text-red-700' : ''}
                    ${item.urgency === 'high' ? 'bg-orange-100 text-orange-700' : ''}
                    ${item.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${item.urgency === 'low' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {item.urgency}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Current:</span>
                    <span className="font-medium">{item.currentStock}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Min Stock:</span>
                    <span className="font-medium">{item.minStock}</span>
                  </div>
                  <Progress 
                    value={(item.currentStock / item.minStock) * 100} 
                    className={`h-2 ${
                      item.urgency === 'critical' ? 'bg-red-200' : 
                      item.urgency === 'high' ? 'bg-orange-200' : 
                      item.urgency === 'medium' ? 'bg-yellow-200' : 'bg-blue-200'
                    }`} 
                  />
                </div>
                <Button size="sm" className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white">
                  <Package className="h-3 w-3 mr-1" />
                  Restock
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
