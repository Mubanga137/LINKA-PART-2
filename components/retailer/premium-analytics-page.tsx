'use client';

import { useState } from 'react';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Calendar,
  Download,
  Filter,
  Eye,
  Target,
  Zap,
  Award,
  Clock,
  Globe,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock analytics data
const analyticsData = {
  overview: {
    totalRevenue: 1247850,
    revenueGrowth: 28.4,
    totalOrders: 3847,
    ordersGrowth: 15.2,
    avgOrderValue: 324.50,
    aovGrowth: 12.8,
    conversionRate: 3.7,
    conversionGrowth: 8.9,
    customerLifetimeValue: 1289.50,
    clvGrowth: 22.1,
    returnCustomers: 67.8,
    returnGrowth: 5.6
  },
  sales: {
    daily: [
      { date: '2024-01-01', revenue: 12450, orders: 45 },
      { date: '2024-01-02', revenue: 15680, orders: 58 },
      { date: '2024-01-03', revenue: 18920, orders: 67 },
      { date: '2024-01-04', revenue: 14780, orders: 52 },
      { date: '2024-01-05', revenue: 19340, orders: 71 },
      { date: '2024-01-06', revenue: 22150, orders: 84 },
      { date: '2024-01-07', revenue: 17830, orders: 63 }
    ],
    topProducts: [
      { name: 'iPhone 15 Pro Max', revenue: 285640, sales: 178, growth: 32.1 },
      { name: 'MacBook Pro M3', revenue: 234870, sales: 78, growth: 28.7 },
      { name: 'AirPods Pro 2nd Gen', revenue: 186540, sales: 746, growth: 45.2 },
      { name: 'Samsung Galaxy S24', revenue: 147930, sales: 164, growth: -12.3 },
      { name: 'iPad Air M2', revenue: 123670, sales: 165, growth: 19.8 }
    ],
    categories: [
      { name: 'Electronics', revenue: 845670, percentage: 67.8, growth: 24.5 },
      { name: 'Fashion', revenue: 234890, percentage: 18.8, growth: 15.2 },
      { name: 'Home & Garden', revenue: 98340, percentage: 7.9, growth: 8.7 },
      { name: 'Sports & Fitness', revenue: 68950, percentage: 5.5, growth: -3.2 }
    ]
  },
  customers: {
    totalCustomers: 12847,
    newCustomers: 387,
    returningCustomers: 8746,
    customerGrowth: 22.8,
    demographics: [
      { age: '18-24', percentage: 15.2, customers: 1953 },
      { age: '25-34', percentage: 34.7, customers: 4458 },
      { age: '35-44', percentage: 28.9, customers: 3713 },
      { age: '45-54', percentage: 15.6, customers: 2004 },
      { age: '55+', percentage: 5.6, customers: 719 }
    ],
    topLocations: [
      { city: 'Lusaka', customers: 4567, percentage: 35.5 },
      { city: 'Ndola', customers: 2134, percentage: 16.6 },
      { city: 'Kitwe', customers: 1876, percentage: 14.6 },
      { city: 'Livingstone', customers: 1234, percentage: 9.6 },
      { city: 'Chingola', customers: 987, percentage: 7.7 }
    ]
  },
  performance: {
    pageViews: 145678,
    uniqueVisitors: 89432,
    bounceRate: 24.6,
    avgSessionDuration: '4:32',
    pagesPerSession: 3.7,
    mobileTraffic: 68.4,
    organicTraffic: 45.2,
    directTraffic: 32.8,
    socialTraffic: 12.3,
    referralTraffic: 9.7
  }
};

const kpiMetrics = [
  {
    title: 'Total Revenue',
    value: analyticsData.overview.totalRevenue,
    growth: analyticsData.overview.revenueGrowth,
    icon: DollarSign,
    color: 'emerald',
    prefix: 'ZMW ',
    format: 'currency'
  },
  {
    title: 'Total Orders',
    value: analyticsData.overview.totalOrders,
    growth: analyticsData.overview.ordersGrowth,
    icon: ShoppingCart,
    color: 'blue',
    format: 'number'
  },
  {
    title: 'Avg Order Value',
    value: analyticsData.overview.avgOrderValue,
    growth: analyticsData.overview.aovGrowth,
    icon: Target,
    color: 'purple',
    prefix: 'ZMW ',
    format: 'currency'
  },
  {
    title: 'Conversion Rate',
    value: analyticsData.overview.conversionRate,
    growth: analyticsData.overview.conversionGrowth,
    icon: TrendingUp,
    color: 'orange',
    suffix: '%',
    format: 'percentage'
  },
  {
    title: 'Customer LTV',
    value: analyticsData.overview.customerLifetimeValue,
    growth: analyticsData.overview.clvGrowth,
    icon: Users,
    color: 'teal',
    prefix: 'ZMW ',
    format: 'currency'
  },
  {
    title: 'Return Customers',
    value: analyticsData.overview.returnCustomers,
    growth: analyticsData.overview.returnGrowth,
    icon: Award,
    color: 'pink',
    suffix: '%',
    format: 'percentage'
  }
];

const formatValue = (value: number, format: string, prefix = '', suffix = '') => {
  let formattedValue = '';
  
  switch (format) {
    case 'currency':
      formattedValue = value.toLocaleString();
      break;
    case 'percentage':
      formattedValue = value.toFixed(1);
      break;
    default:
      formattedValue = value.toLocaleString();
  }
  
  return `${prefix}${formattedValue}${suffix}`;
};

const getColorClasses = (color: string) => {
  const colors: { [key: string]: { bg: string; text: string; icon: string; badge: string } } = {
    emerald: {
      bg: 'from-emerald-50 to-green-100',
      text: 'text-emerald-900',
      icon: 'from-emerald-500 to-green-600',
      badge: 'bg-emerald-100 text-emerald-700'
    },
    blue: {
      bg: 'from-blue-50 to-indigo-100',
      text: 'text-blue-900',
      icon: 'from-blue-500 to-indigo-600',
      badge: 'bg-blue-100 text-blue-700'
    },
    purple: {
      bg: 'from-purple-50 to-violet-100',
      text: 'text-purple-900',
      icon: 'from-purple-500 to-violet-600',
      badge: 'bg-purple-100 text-purple-700'
    },
    orange: {
      bg: 'from-orange-50 to-red-100',
      text: 'text-orange-900',
      icon: 'from-orange-500 to-red-600',
      badge: 'bg-orange-100 text-orange-700'
    },
    teal: {
      bg: 'from-teal-50 to-cyan-100',
      text: 'text-teal-900',
      icon: 'from-teal-500 to-cyan-600',
      badge: 'bg-teal-100 text-teal-700'
    },
    pink: {
      bg: 'from-pink-50 to-rose-100',
      text: 'text-pink-900',
      icon: 'from-pink-500 to-rose-600',
      badge: 'bg-pink-100 text-pink-700'
    }
  };
  
  return colors[color] || colors.blue;
};

export default function PremiumAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Analytics & Reports
          </h1>
          <p className="text-slate-600 text-lg">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Today</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colors = getColorClasses(metric.color);
          
          return (
            <Card key={index} className={`border-0 shadow-lg bg-gradient-to-br ${colors.bg} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <Badge className={`${colors.badge}`}>
                    {metric.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.growth > 0 ? '+' : ''}{metric.growth}%
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{metric.title}</p>
                  <p className={`text-3xl font-bold ${colors.text} mb-2`}>
                    {formatValue(metric.value, metric.format, metric.prefix, metric.suffix)}
                  </p>
                  <p className="text-sm text-slate-600">vs last period</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Revenue Chart Placeholder */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900">Interactive Revenue Chart</p>
                  <p className="text-sm text-slate-500">Real-time revenue tracking and trends</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-orange-600" />
                  Business Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Monthly Revenue Target</span>
                    <span className="text-sm font-bold text-slate-900">85.7%</span>
                  </div>
                  <Progress value={85.7} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Customer Acquisition</span>
                    <span className="text-sm font-bold text-slate-900">92.3%</span>
                  </div>
                  <Progress value={92.3} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Inventory Turnover</span>
                    <span className="text-sm font-bold text-slate-900">78.1%</span>
                  </div>
                  <Progress value={78.1} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Strong Growth</p>
                      <p className="text-xs text-green-600">Revenue increased 28.4% this month</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Customer Loyalty</p>
                      <p className="text-xs text-blue-600">67.8% of customers are returning buyers</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Inventory Alert</p>
                      <p className="text-xs text-orange-600">5 products are running low on stock</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  Top Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.sales.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <p className="text-sm text-slate-500">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">ZMW {product.revenue.toLocaleString()}</p>
                        <div className={`flex items-center text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales by Category */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-purple-600" />
                  Sales by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.sales.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-slate-900">{category.percentage}%</span>
                          <div className={`flex items-center text-xs ${category.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {category.growth > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {category.growth > 0 ? '+' : ''}{category.growth}%
                          </div>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                      <p className="text-xs text-slate-500">ZMW {category.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Demographics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Customer Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.customers.demographics.map((demo, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Age {demo.age}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-slate-900">{demo.percentage}%</span>
                          <span className="text-xs text-slate-500">({demo.customers.toLocaleString()})</span>
                        </div>
                      </div>
                      <Progress value={demo.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Top Customer Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.customers.topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-slate-900">{location.city}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{location.customers.toLocaleString()}</p>
                        <p className="text-sm text-slate-500">{location.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.pageViews.toLocaleString()}</p>
                <p className="text-sm text-slate-600">Page Views</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.uniqueVisitors.toLocaleString()}</p>
                <p className="text-sm text-slate-600">Unique Visitors</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.avgSessionDuration}</p>
                <p className="text-sm text-slate-600">Avg Session</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.bounceRate}%</p>
                <p className="text-sm text-slate-600">Bounce Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-teal-600" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.organicTraffic}%</p>
                  <p className="text-sm text-slate-600">Organic Search</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.directTraffic}%</p>
                  <p className="text-sm text-slate-600">Direct Traffic</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.socialTraffic}%</p>
                  <p className="text-sm text-slate-600">Social Media</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ArrowUpRight className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.performance.referralTraffic}%</p>
                  <p className="text-sm text-slate-600">Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
