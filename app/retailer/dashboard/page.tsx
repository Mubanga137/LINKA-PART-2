'use client';

import { useState, useEffect } from 'react';
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
  CheckCircle,
  Store,
  MapPin,
  Clock,
  Zap,
  Target,
  Globe,
  Heart,
  MessageCircle,
  Settings,
  FileText,
  PieChart,
  BarChart3,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  ChevronRight,
  AlertTriangle,
  Bell,
  Search,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import EnhancedRetailerDashboardLayout from '@/components/retailer/enhanced-retailer-dashboard-layout';

// Enhanced dashboard data with real-time capabilities
const dashboardStats = {
  todaysSales: 42300,
  salesChange: 12.5,
  totalOrders: 2,
  ordersChange: 8.2,
  productsSold: 2,
  productsChange: -2.1,
  totalProducts: 8,
  productsActive: 15.3,
  lowStockItems: 2,
  featuredItems: 4,
  inventoryValue: 1214900,
  conversionRate: 3.2,
  avgOrderValue: 365
};

const featuredProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 17500,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fe182d99b828f4a768817871766e2f5bb?format=webp&width=800',
    stats: { products: 247, followers: '1.2k', rating: '98%' },
    category: 'electronics',
    featured: true,
    status: 'active'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: 24800,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2Ffb567d646d14485db40714dd67030874?format=webp&width=800',
    stats: { products: 189, followers: '956', rating: '95%' },
    category: 'electronics',
    featured: true,
    status: 'active'
  }
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Chanda Mwanza',
    product: 'iPhone 15 Pro',
    amount: 17500,
    time: '5 min ago',
    status: 'pending',
    statusColor: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  {
    id: 'ORD-002',
    customer: 'Bwalya Tembo',
    product: 'MacBook Air M2',
    amount: 24800,
    time: '15 min ago',
    status: 'processing',
    statusColor: 'text-blue-600 bg-blue-50 border-blue-200'
  }
];

const weeklyTrend = [
  { day: 'Mon', amount: 2400 },
  { day: 'Tue', amount: 1398 },
  { day: 'Wed', amount: 9800 },
  { day: 'Thu', amount: 3908 },
  { day: 'Fri', amount: 4800 },
  { day: 'Sat', amount: 3800 },
  { day: 'Sun', amount: 4300 }
];

export default function ModernDashboard() {
  const [timeRange, setTimeRange] = useState('today');
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState(dashboardStats);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate real-time updates (client-side only to prevent hydration errors)
  useEffect(() => {
    // Only run on client side to prevent hydration errors
    if (typeof window === 'undefined') return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        todaysSales: prev.todaysSales + Math.floor(Math.random() * 100),
        totalOrders: prev.totalOrders + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <RetailerDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Modern Header */}
        <div className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 font-medium">Welcome back, Mwamba! Here's your store overview.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Search products, orders..."
                  className="pl-10 w-64 bg-white/60 border-white/40 backdrop-blur-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="bg-white/60 border-white/40 backdrop-blur-sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/60 border-white/40 backdrop-blur-sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, Mwamba!</h2>
                <p className="text-blue-100">Here's your store overview</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-100">Store Active</span>
                  </div>
                  <div className="text-sm text-blue-100">4.9★ Rating</div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">8</p>
                <p className="text-blue-100 text-sm">Products</p>
                <p className="text-xs text-blue-200 mt-1">2 Low Stock</p>
              </div>
            </div>
          </div>

          {/* Hero Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Today's Sales */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-shadow duration-500">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{realTimeData.salesChange}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Today's Sales</p>
                  <p className="text-3xl font-bold text-emerald-900">
                    ZMW {realTimeData.todaysSales.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-600">+12.5% from yesterday</p>
                </div>
              </CardContent>
            </Card>

            {/* Total Orders */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-shadow duration-500">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{realTimeData.ordersChange}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Total Orders</p>
                  <p className="text-3xl font-bold text-orange-900">{realTimeData.totalOrders}</p>
                  <p className="text-xs text-orange-600">+8.2% from yesterday</p>
                </div>
              </CardContent>
            </Card>

            {/* Products Sold */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-red-200 px-3 py-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -2.1%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Products Sold</p>
                  <p className="text-3xl font-bold text-blue-900">{realTimeData.productsSold}</p>
                  <p className="text-xs text-red-600">-2.1% from yesterday</p>
                </div>
              </CardContent>
            </Card>

            {/* Total Products */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-500">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.3%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Total Products</p>
                  <p className="text-3xl font-bold text-purple-900">{realTimeData.totalProducts}</p>
                  <p className="text-xs text-purple-600">+15.3% from yesterday</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Package className="h-5 w-5 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="text-purple-600 border-purple-200">8</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600">Total Products</p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">ZMW</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600">Inventory Value</p>
                  <p className="text-2xl font-bold text-slate-900">1,214,900</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <Badge variant="outline" className="text-red-600 border-red-200">2</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-slate-900">2</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">4</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600">Featured Items</p>
                  <p className="text-2xl font-bold text-slate-900">4</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Storefront Preview */}
            <Card className="lg:col-span-2 border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Storefront Preview</CardTitle>
                <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Store
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold">MK</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Mwamba's Electronics</h3>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">4.9</span>
                          <span className="text-sm opacity-75">Premium Seller</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm opacity-90 mb-4">📍 Lusaka, Zambia</p>
                    <div className="text-xs opacity-75">Powered by Linka</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Featured Products</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {featuredProducts.map((product) => (
                      <div key={product.id} className="group">
                        <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h5 className="font-medium text-slate-900 text-sm">{product.name}</h5>
                        <p className="text-blue-600 font-bold">ZMW {product.price.toLocaleString()}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                          <span>{product.stats.products} Products</span>
                          <span>{product.stats.followers} Followers</span>
                          <span>{product.stats.rating} Rating</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Order Monitoring */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
                  Live Order Monitoring
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                      <p className="text-xs text-slate-500">{order.product}</p>
                      <p className="text-xs text-slate-400">{order.time}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-slate-900">ZMW {order.amount.toLocaleString()}</p>
                      <Badge className={`text-xs ${order.statusColor}`}>
                        {order.status}
                      </Badge>
                      <div className="flex justify-end space-x-1">
                        <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                          Decline
                        </Button>
                        <Button size="sm" className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Orders (2)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Advanced Analytics */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Advanced Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger value="products" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Products</TabsTrigger>
                    <TabsTrigger value="regions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Regions</TabsTrigger>
                    <TabsTrigger value="traffic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Traffic</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">3.2%</div>
                        <div className="text-sm text-slate-600">Conversion Rate</div>
                        <div className="text-xs text-green-600">+0.5% from last month</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">ZMW 365</div>
                        <div className="text-sm text-slate-600">Avg. Order Value</div>
                        <div className="text-xs text-green-600">+12% from last month</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Weekly Sales Trend</h4>
                      <div className="space-y-2">
                        {weeklyTrend.map((day) => (
                          <div key={day.day} className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 w-8">{day.day}</span>
                            <div className="flex-1 mx-3">
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${(day.amount / 10000) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-slate-900">ZMW {day.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Product Publisher */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Quick Product Publisher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Product Name *</label>
                  <Input placeholder="Enter product name" className="mt-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Price (ZMW) *</label>
                    <Input placeholder="0.00" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Stock Quantity</label>
                    <Input placeholder="0" className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700">Category *</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea 
                    placeholder="Describe your product..."
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700">Product Images</label>
                  <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Upload up to 5 images (Max 5MB each)</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    Save Draft
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Publish Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">Ready to boost your sales?</h3>
                  <p className="text-blue-100">Add more products, manage your storefront, and track analytics</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Store className="h-4 w-4 mr-2" />
                    Storefront Manager
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RetailerDashboardLayout>
  );
}
