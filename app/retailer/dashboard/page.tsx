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
  TrendingUp as TrendUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Enhanced dashboard data with real-time capabilities
const dashboardStats = {
  totalRevenue: 1108000,
  revenueChange: 28.4,
  totalOrders: 2472,
  ordersChange: 15.2,
  pendingOrders: 23,
  processingOrders: 45,
  activeProducts: 3847,
  productsChange: 18.7,
  lowStock: 5,
  totalCustomers: 12429,
  customersChange: 12.8,
  newCustomers: 325,
  avgOrderValue: 142.50,
  conversionRate: 3.8,
  storefront: {
    views: 25430,
    visitors: 8924,
    bounceRate: 32.5,
    avgSessionTime: '4m 32s'
  },
  financials: {
    grossProfit: 442000,
    netProfit: 334500,
    profitMargin: 30.2,
    pendingPayouts: 15600
  }
};

const recentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Alexandra Chen',
    avatar: 'AC',
    items: 3,
    amount: 459.99,
    status: 'Delivered',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    time: '2 hours ago',
    location: 'Lusaka, Zambia'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Marcus Johnson',
    avatar: 'MJ',
    items: 2,
    amount: 289.5,
    status: 'Processing',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    time: '5 hours ago',
    location: 'Kitwe, Zambia'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Sofia Rodriguez',
    avatar: 'SR',
    items: 1,
    amount: 129.99,
    status: 'Shipped',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    time: '1 day ago',
    location: 'Ndola, Zambia'
  },
  {
    id: 'ORD-2024-004',
    customer: 'David Kim',
    avatar: 'DK',
    items: 4,
    amount: 699.99,
    status: 'Pending',
    statusColor: 'bg-orange-50 text-orange-700 border-orange-200',
    time: '2 days ago',
    location: 'Kabwe, Zambia'
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
    stock: 45,
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fe280805121624c4c89e1740b42d7242b?alt=media&token=a690ae27-18c8-4e1a-a3bf-522ab8349805&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.8,
    reviews: 342
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    sales: 1523,
    revenue: 456900,
    growth: 12.8,
    stock: 23,
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F4cc39ea70bf4407aab01471d71b17cab?alt=media&token=e6b3a137-56fe-4b63-8eab-ea79dd35f1e8&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.6,
    reviews: 278
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    category: 'Home & Garden',
    sales: 892,
    revenue: 178400,
    growth: 24.5,
    stock: 12,
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F41ba2cbf74a7423999b79fdc1e5aeb8d?alt=media&token=3230b762-4d84-4830-95b6-420899bd31e7&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: 'Professional Camera Lens',
    category: 'Electronics',
    sales: 634,
    revenue: 190200,
    growth: 8.7,
    stock: 8,
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F1f5b33889b8f43a79b94d8cde37d4c07?alt=media&token=2d2dfb75-b5f1-4dba-977f-c2b5c409190c&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.7,
    reviews: 89
  }
];

const businessInsights = [
  {
    id: 1,
    type: 'Revenue Growth',
    title: 'Your revenue increased by 28.4% this month, primarily driven by electronics sales and improved customer retention strategies.',
    icon: TrendingUp,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    action: 'View Analytics',
    priority: 'success'
  },
  {
    id: 2,
    type: 'Market Leadership',
    title: 'Electronics category leads with 35% market share. Consider expanding inventory for high-demand items.',
    icon: Activity,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    action: 'Expand Catalog',
    priority: 'info'
  },
  {
    id: 3,
    type: 'Inventory Alert',
    title: '5 popular products are running low. Restock now to avoid lost sales during peak season.',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    action: 'Manage Inventory',
    priority: 'warning'
  }
];

const trafficSources = [
  { source: 'Organic Search', visitors: 45.2, change: 12.3, color: 'bg-emerald-500' },
  { source: 'Direct', visitors: 28.7, change: -2.1, color: 'bg-blue-500' },
  { source: 'Social Media', visitors: 15.4, change: 25.8, color: 'bg-purple-500' },
  { source: 'Referrals', visitors: 10.7, change: 8.4, color: 'bg-orange-500' }
];

const deviceStats = [
  { device: 'Mobile', percentage: 68, icon: Smartphone, color: 'text-blue-600' },
  { device: 'Desktop', percentage: 24, icon: Monitor, color: 'text-green-600' },
  { device: 'Tablet', percentage: 8, icon: Tablet, color: 'text-purple-600' }
];

const quickActions = [
  {
    title: 'Add New Product',
    description: 'List a new product in your store',
    icon: Plus,
    color: 'bg-blue-500',
    href: '/retailer/products/new'
  },
  {
    title: 'View Orders',
    description: 'Manage pending and recent orders',
    icon: ShoppingCart,
    color: 'bg-emerald-500',
    href: '/retailer/orders'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Detailed business insights',
    icon: BarChart3,
    color: 'bg-purple-500',
    href: '/retailer/analytics'
  },
  {
    title: 'Storefront Settings',
    description: 'Customize your store appearance',
    icon: Store,
    color: 'bg-orange-500',
    href: '/retailer/storefront'
  }
];

export default function EnhancedRetailerDashboard() {
  const [timeRange, setTimeRange] = useState('6M');
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState(dashboardStats);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        storefront: {
          ...prev.storefront,
          views: prev.storefront.views + Math.floor(Math.random() * 5),
          visitors: prev.storefront.visitors + Math.floor(Math.random() * 2)
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <RetailerDashboardLayout>
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-50/50 via-white to-indigo-50/20">
        {/* Enhanced Header Section */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  Business Command Center
                </h1>
                <Badge className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300">
                  <Circle className="w-2 h-2 mr-1 fill-emerald-500" />
                  Live
                </Badge>
              </div>
              <p className="text-slate-600 font-medium flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline"
                size="sm" 
                className="border-slate-200 text-slate-700 hover:bg-slate-50 hidden sm:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Quick Action
              </Button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                label: 'Today\'s Revenue', 
                value: 'ZMW 4,230', 
                change: '+12%', 
                icon: DollarSign, 
                color: 'text-emerald-600',
                bg: 'bg-emerald-50'
              },
              { 
                label: 'Active Orders', 
                value: '23', 
                change: '+5', 
                icon: ShoppingCart, 
                color: 'text-blue-600',
                bg: 'bg-blue-50'
              },
              { 
                label: 'Store Views', 
                value: realTimeData.storefront.views.toLocaleString(), 
                change: '+8%', 
                icon: Eye, 
                color: 'text-purple-600',
                bg: 'bg-purple-50'
              },
              { 
                label: 'Conversion Rate', 
                value: `${realTimeData.conversionRate}%`, 
                change: '+0.3%', 
                icon: Target, 
                color: 'text-orange-600',
                bg: 'bg-orange-50'
              }
            ].map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="storefront">Storefront</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1D">Today</SelectItem>
                  <SelectItem value="7D">7 Days</SelectItem>
                  <SelectItem value="1M">1 Month</SelectItem>
                  <SelectItem value="3M">3 Months</SelectItem>
                  <SelectItem value="6M">6 Months</SelectItem>
                  <SelectItem value="1Y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="overview" className="space-y-6">
              {/* Enhanced Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-emerald-100/60 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full -mr-10 -mt-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center text-emerald-600 text-sm font-semibold">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{dashboardStats.revenueChange}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-emerald-700">Total Revenue</p>
                      <p className="text-2xl font-bold text-emerald-900">
                        ZMW {dashboardStats.totalRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-600">vs last month</p>
                    </div>
                    <div className="mt-4">
                      <Progress value={75} className="h-2 bg-emerald-200" />
                      <p className="text-xs text-emerald-600 mt-1">75% of monthly goal</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Total Orders */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100/60 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -mr-10 -mt-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <ShoppingCart className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center text-blue-600 text-sm font-semibold">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{dashboardStats.ordersChange}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-blue-700">Total Orders</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {dashboardStats.totalOrders.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-orange-600">{dashboardStats.pendingOrders} pending</span>
                        <span className="text-blue-600">{dashboardStats.processingOrders} processing</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={68} className="h-2 bg-blue-200" />
                      <p className="text-xs text-blue-600 mt-1">68% fulfillment rate</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Products */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100/60 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -mr-10 -mt-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center text-green-600 text-sm font-semibold">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{dashboardStats.productsChange}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-purple-700">Active Products</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {dashboardStats.activeProducts.toLocaleString()}
                      </p>
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {dashboardStats.lowStock} low stock items
                      </p>
                    </div>
                    <div className="mt-4">
                      <Progress value={82} className="h-2 bg-purple-200" />
                      <p className="text-xs text-purple-600 mt-1">82% in stock</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Base */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100/60 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -mr-10 -mt-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center text-green-600 text-sm font-semibold">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{dashboardStats.customersChange}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-orange-700">Customer Base</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {dashboardStats.totalCustomers.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {dashboardStats.newCustomers} new this month
                      </p>
                    </div>
                    <div className="mt-4">
                      <Progress value={91} className="h-2 bg-orange-200" />
                      <p className="text-xs text-orange-600 mt-1">91% retention rate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions Section */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200"
                        asChild
                      >
                        <a href={action.href}>
                          <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                            <action.icon className="h-5 w-5" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-sm">{action.title}</p>
                            <p className="text-xs text-slate-500">{action.description}</p>
                          </div>
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Charts and Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend */}
                <Card className="lg:col-span-2 border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-semibold text-slate-900">Revenue Trends</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                        +28.4% Growth
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-lg flex items-center justify-center border border-slate-100">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-200">
                          <TrendingUp className="h-8 w-8 text-indigo-600" />
                        </div>
                        <p className="text-lg font-semibold text-slate-900">Interactive Revenue Chart</p>
                        <p className="text-sm text-slate-500 max-w-md">
                          Advanced analytics showing revenue trends, seasonality patterns, and growth projections
                        </p>
                        <Button variant="outline" size="sm" className="mt-3">
                          <PieChart className="h-4 w-4 mr-2" />
                          View Full Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Categories */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Electronics', percentage: 35, revenue: 61040, color: 'bg-blue-500', growth: '+18%' },
                        { name: 'Fashion', percentage: 28, revenue: 48832, color: 'bg-emerald-500', growth: '+12%' },
                        { name: 'Home & Garden', percentage: 18, revenue: 31392, color: 'bg-orange-500', growth: '+25%' },
                        { name: 'Sports', percentage: 12, revenue: 20928, color: 'bg-purple-500', growth: '+8%' },
                        { name: 'Books', percentage: 7, revenue: 12208, color: 'bg-pink-500', growth: '+15%' }
                      ].map((category) => (
                        <div key={category.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                              <span className="text-sm font-medium text-slate-700">{category.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-slate-900">{category.percentage}%</p>
                              <p className="text-xs text-emerald-600">{category.growth}</p>
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`${category.color} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500">ZMW {category.revenue.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
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
                        <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-100 hover:bg-slate-50 transition-all duration-200 group">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 ring-2 ring-slate-200 group-hover:ring-slate-300 transition-all">
                              <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-semibold">
                                {order.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{order.customer}</p>
                              <p className="text-xs text-slate-500 flex items-center">
                                {order.id} • {order.items} items
                                <MapPin className="w-3 h-3 ml-2 mr-1" />
                                {order.location}
                              </p>
                              <p className="text-xs text-slate-400 flex items-center mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {order.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">ZMW {order.amount}</p>
                            <Badge className={`text-xs border ${order.statusColor} mt-1`}>
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
                    <CardTitle className="text-lg font-semibold text-slate-900">Best Sellers</CardTitle>
                    <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                      <Star className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50/50 transition-all duration-200 group">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                            </div>
                          </div>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 group-hover:shadow-md transition-all"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{product.category}</Badge>
                              <div className="flex items-center text-xs text-amber-500">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                {product.rating}
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {product.sales} sales • Stock: {product.stock}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">ZMW {product.revenue.toLocaleString()}</p>
                            <div className="flex items-center text-xs text-emerald-600 mt-1">
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

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trafficSources.map((source) => (
                        <div key={source.source} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${source.color} rounded-full`}></div>
                            <span className="text-sm font-medium text-slate-700">{source.source}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">{source.visitors}%</p>
                            <p className={`text-xs ${source.change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                              {source.change > 0 ? '+' : ''}{source.change}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Device Analytics */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Device Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deviceStats.map((device) => (
                        <div key={device.device} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <device.icon className={`h-5 w-5 ${device.color}`} />
                            <span className="text-sm font-medium text-slate-700">{device.device}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">{device.percentage}%</p>
                            <div className="w-20 bg-slate-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${device.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Storefront Tab */}
            <TabsContent value="storefront" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                      <Store className="h-5 w-5 mr-2 text-indigo-600" />
                      Storefront Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-slate-900">{realTimeData.storefront.views.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Total Views</p>
                        <p className="text-xs text-emerald-600 mt-1">+12.3% vs last month</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-slate-900">{realTimeData.storefront.visitors.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Unique Visitors</p>
                        <p className="text-xs text-emerald-600 mt-1">+8.7% vs last month</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-slate-900">{realTimeData.storefront.bounceRate}%</p>
                        <p className="text-sm text-slate-600">Bounce Rate</p>
                        <p className="text-xs text-red-600 mt-1">-2.1% improvement</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-slate-900">{realTimeData.storefront.avgSessionTime}</p>
                        <p className="text-sm text-slate-600">Avg. Session</p>
                        <p className="text-xs text-emerald-600 mt-1">+15s improvement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Store Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/retailer/storefront">
                        <Settings className="h-4 w-4 mr-2" />
                        Customize Storefront
                      </a>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/retailer/products">
                        <Package className="h-4 w-4 mr-2" />
                        Manage Products
                      </a>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/retailer/analytics">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Gross Profit',
                    value: `ZMW ${realTimeData.financials.grossProfit.toLocaleString()}`,
                    change: '+15.3%',
                    icon: DollarSign,
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50'
                  },
                  {
                    title: 'Net Profit',
                    value: `ZMW ${realTimeData.financials.netProfit.toLocaleString()}`,
                    change: '+18.7%',
                    icon: TrendingUp,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50'
                  },
                  {
                    title: 'Profit Margin',
                    value: `${realTimeData.financials.profitMargin}%`,
                    change: '+2.1%',
                    icon: Target,
                    color: 'text-purple-600',
                    bg: 'bg-purple-50'
                  },
                  {
                    title: 'Pending Payouts',
                    value: `ZMW ${realTimeData.financials.pendingPayouts.toLocaleString()}`,
                    change: 'Ready',
                    icon: Clock,
                    color: 'text-orange-600',
                    bg: 'bg-orange-50'
                  }
                ].map((metric, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 ${metric.bg} rounded-lg flex items-center justify-center`}>
                          <metric.icon className={`h-5 w-5 ${metric.color}`} />
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">{metric.change}</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">{metric.title}</p>
                        <p className="text-xl font-bold text-slate-900">{metric.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
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
                          <div key={insight.id} className={`flex items-start space-x-4 p-4 ${insight.bgColor} rounded-lg border ${insight.borderColor} hover:shadow-sm transition-all`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border ${insight.borderColor} flex-shrink-0 shadow-sm`}>
                              <Icon className={`h-5 w-5 ${insight.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-semibold text-slate-900">{insight.type}</h4>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    insight.priority === 'success' ? 'border-emerald-200 text-emerald-700' :
                                    insight.priority === 'warning' ? 'border-amber-200 text-amber-700' :
                                    'border-blue-200 text-blue-700'
                                  }`}
                                >
                                  {insight.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-700 mb-3">{insight.title}</p>
                              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-white">
                                <ChevronRight className="h-3 w-3 mr-1" />
                                {insight.action}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Recommendations */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Optimize Product Listings',
                          description: 'AI suggests improving 12 product descriptions and adding high-quality images to boost conversion rates.',
                          impact: '+15% conversion rate',
                          confidence: 94,
                          action: 'Start Optimization'
                        },
                        {
                          title: 'Dynamic Pricing Strategy',
                          description: 'Adjust pricing for 8 electronics products based on competitor analysis and demand patterns.',
                          impact: '+8% revenue',
                          confidence: 87,
                          action: 'Review Suggestions'
                        },
                        {
                          title: 'Inventory Restocking',
                          description: 'Restock 5 trending products before estimated stockout date to maximize sales potential.',
                          impact: 'Prevent 23% lost sales',
                          confidence: 96,
                          action: 'View Products'
                        }
                      ].map((rec, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-sm font-semibold text-slate-900">{rec.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                                {rec.confidence}% confidence
                              </Badge>
                            </div>
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

// Helper component for the live indicator
function Circle({ className }: { className?: string }) {
  return <div className={`rounded-full ${className}`} />;
}
