'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Eye, 
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  Zap,
  Brain,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  Activity,
  Percent,
  CreditCard,
  Package,
  Heart,
  Share,
  MessageCircle,
  Search,
  MousePointer,
  Timer,
  Layers,
  Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Additional showcase images for analytics
const analyticsShowcaseImages = [
  'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F2d67619c8efd4c4a8ccb9d599d00350f?alt=media&token=16d53e9a-b39b-4fda-9281-e0c14a404875&apiKey=4bf015b55143432d9c1c69e328364ff3',
  'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fca179f90e262406baeeb9deb895c7a55?alt=media&token=94a99df6-03f2-4917-91f3-209190f869a0&apiKey=4bf015b55143432d9c1c69e328364ff3',
  'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F7edbb425061847fdb4f7faad0f8076a6?alt=media&token=891120d6-c7f1-4e97-a669-b49fc908f400&apiKey=4bf015b55143432d9c1c69e328364ff3',
  'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fb394d01c916c42bfba454ca2dc936d59?alt=media&token=7fbe4a8b-1b16-4c68-a3ed-85f9ed4b08de&apiKey=4bf015b55143432d9c1c69e328364ff3',
  'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fe367a3cd6fcf44e69a5a426a6b490033?alt=media&token=73b53fde-4d31-4d06-8133-876c01bd1c23&apiKey=4bf015b55143432d9c1c69e328364ff3',
  'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F8bbd2f2f86ee4d7a8459844ef929c27b?alt=media&token=4291d4bc-0f13-43e2-8cfa-25a17314ae44&apiKey=4bf015b55143432d9c1c69e328364ff3'
];

// Mock analytics data
const analyticsData = {
  revenue: {
    total: 1108000,
    growth: 28.4,
    thisMonth: 185000,
    lastMonth: 144000,
    thisWeek: 42500,
    yesterday: 6800,
    forecast: 210000
  },
  orders: {
    total: 2472,
    growth: 15.2,
    pending: 23,
    processing: 45,
    completed: 2350,
    cancelled: 54,
    avgOrderValue: 448.50,
    conversionRate: 3.8
  },
  customers: {
    total: 12429,
    new: 325,
    returning: 8904,
    churnRate: 2.3,
    lifetimeValue: 1250,
    satisfaction: 4.6
  },
  products: {
    views: 89420,
    sales: 2472,
    topCategory: 'Electronics',
    trending: 'Smart Devices',
    inventory: 3847,
    lowStock: 15
  },
  traffic: {
    visitors: 34250,
    pageViews: 156780,
    bounceRate: 32.4,
    avgSession: '4m 23s',
    sources: {
      organic: 45.2,
      direct: 28.7,
      social: 15.4,
      referral: 10.7
    },
    devices: {
      mobile: 68,
      desktop: 24,
      tablet: 8
    }
  },
  geography: {
    topCountries: [
      { name: 'Zambia', visitors: 28420, percentage: 83 },
      { name: 'Zimbabwe', visitors: 2840, percentage: 8.3 },
      { name: 'Botswana', visitors: 1710, percentage: 5 },
      { name: 'Malawi', visitors: 855, percentage: 2.5 },
      { name: 'Others', visitors: 425, percentage: 1.2 }
    ],
    topCities: [
      { name: 'Lusaka', visitors: 15620 },
      { name: 'Kitwe', visitors: 4280 },
      { name: 'Ndola', visitors: 3560 },
      { name: 'Kabwe', visitors: 2130 },
      { name: 'Chingola', visitors: 1850 }
    ]
  }
};

const performanceMetrics = [
  {
    title: 'Revenue Growth',
    value: '+28.4%',
    description: 'vs last month',
    trend: 'up',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    icon: TrendingUp
  },
  {
    title: 'Conversion Rate',
    value: '3.8%',
    description: '+0.3% improvement',
    trend: 'up',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: Target
  },
  {
    title: 'Customer Retention',
    value: '89.2%',
    description: '+2.1% increase',
    trend: 'up',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: Heart
  },
  {
    title: 'Avg Session Time',
    value: '4m 23s',
    description: '+12s improvement',
    trend: 'up',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    icon: Clock
  }
];

const aiInsights = [
  {
    id: 1,
    type: 'Revenue Optimization',
    insight: 'Your electronics category shows 18% higher conversion during weekend hours. Consider running weekend promotions.',
    confidence: 94,
    impact: 'High',
    action: 'Create Weekend Campaign',
    category: 'marketing'
  },
  {
    id: 2,
    type: 'Inventory Prediction',
    insight: 'iPhone 15 Pro Max stock will run out in 8 days based on current sales velocity. Reorder recommended.',
    confidence: 89,
    impact: 'Critical',
    action: 'Reorder Inventory',
    category: 'inventory'
  },
  {
    id: 3,
    type: 'Customer Behavior',
    insight: 'Customers who view product reviews are 34% more likely to complete purchase. Highlight reviews prominently.',
    confidence: 91,
    impact: 'Medium',
    action: 'Optimize Product Pages',
    category: 'ux'
  },
  {
    id: 4,
    type: 'Pricing Strategy',
    insight: 'Competitors have lowered prices on smart watches by 12%. Consider price adjustment to maintain competitiveness.',
    confidence: 87,
    impact: 'Medium',
    action: 'Review Pricing',
    category: 'pricing'
  }
];

const topProducts = [
  { name: 'iPhone 15 Pro Max', revenue: 98750, units: 11, growth: 18.2 },
  { name: 'MacBook Pro M3', revenue: 87450, units: 6, growth: 12.8 },
  { name: 'AirPods Pro', revenue: 45320, units: 35, growth: 24.5 },
  { name: 'Samsung Galaxy S24', revenue: 38990, units: 5, growth: -3.2 },
  { name: 'Dell XPS 13', revenue: 27560, units: 4, growth: 8.7 }
];

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState(analyticsData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        traffic: {
          ...prev.traffic,
          visitors: prev.traffic.visitors + Math.floor(Math.random() * 5),
          pageViews: prev.traffic.pageViews + Math.floor(Math.random() * 12)
        }
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
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-50/50 via-white to-indigo-50/20">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/60 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  Advanced Analytics
                </h1>
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-300">
                  <Activity className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>
              <p className="text-slate-600 font-medium">Comprehensive business insights and predictive analytics</p>
            </div>
            <div className="flex items-center gap-3">
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
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{metric.title}</p>
                    <p className="text-xl font-bold text-slate-900">{metric.value}</p>
                    <p className="text-xs text-slate-500">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Analytics Showcase Gallery */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-indigo-600" />
                  Analytics Showcase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {analyticsShowcaseImages.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg border border-slate-200 hover:shadow-md transition-all">
                      <img
                        src={image}
                        alt={`Analytics showcase ${index + 1}`}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="traffic">Traffic</TabsTrigger>
                <TabsTrigger value="conversion">Conversion</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              {/* Revenue Analytics */}
              <TabsContent value="revenue" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Chart */}
                  <Card className="lg:col-span-2 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                        Revenue Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-lg flex items-center justify-center border border-emerald-200/50">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LineChart className="h-8 w-8 text-emerald-600" />
                          </div>
                          <p className="text-lg font-semibold text-slate-900">Revenue Growth Chart</p>
                          <p className="text-sm text-slate-500 max-w-md">
                            Interactive chart showing revenue trends, forecasts, and growth patterns
                          </p>
                          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                            <div>
                              <p className="text-xl font-bold text-emerald-600">ZMW {realTimeData.revenue.total.toLocaleString()}</p>
                              <p className="text-xs text-slate-500">Total Revenue</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-emerald-600">+{realTimeData.revenue.growth}%</p>
                              <p className="text-xs text-slate-500">Growth Rate</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-emerald-600">ZMW {realTimeData.revenue.forecast.toLocaleString()}</p>
                              <p className="text-xs text-slate-500">Forecast</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revenue Breakdown */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">This Month</span>
                        <span className="text-lg font-bold text-emerald-600">
                          ZMW {realTimeData.revenue.thisMonth.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Last Month</span>
                        <span className="text-lg font-bold text-slate-900">
                          ZMW {realTimeData.revenue.lastMonth.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">This Week</span>
                        <span className="text-lg font-bold text-blue-600">
                          ZMW {realTimeData.revenue.thisWeek.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Yesterday</span>
                        <span className="text-lg font-bold text-purple-600">
                          ZMW {realTimeData.revenue.yesterday.toLocaleString()}
                        </span>
                      </div>
                      <Separator />
                      <div className="text-center">
                        <p className="text-sm text-slate-600 mb-2">Monthly Growth</p>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${realTimeData.revenue.growth * 3}%` }}
                          ></div>
                        </div>
                        <p className="text-lg font-bold text-emerald-600 mt-2">+{realTimeData.revenue.growth}%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Products by Revenue */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                      <Package className="h-5 w-5 mr-2 text-blue-600" />
                      Top Products by Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{product.name}</p>
                              <p className="text-sm text-slate-500">{product.units} units sold</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">ZMW {product.revenue.toLocaleString()}</p>
                            <div className="flex items-center text-sm">
                              {product.growth > 0 ? (
                                <>
                                  <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                                  <span className="text-emerald-600">+{product.growth}%</span>
                                </>
                              ) : (
                                <>
                                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                                  <span className="text-red-600">{product.growth}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Traffic Analytics */}
              <TabsContent value="traffic" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Traffic Overview */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-blue-600" />
                        Traffic Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{realTimeData.traffic.visitors.toLocaleString()}</p>
                          <p className="text-sm text-slate-600">Visitors</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{realTimeData.traffic.pageViews.toLocaleString()}</p>
                          <p className="text-sm text-slate-600">Page Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{realTimeData.traffic.bounceRate}%</p>
                          <p className="text-sm text-slate-600">Bounce Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-600">{realTimeData.traffic.avgSession}</p>
                          <p className="text-sm text-slate-600">Avg Session</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Traffic Sources */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Traffic Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(realTimeData.traffic.sources).map(([source, percentage]) => (
                          <div key={source} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                source === 'organic' ? 'bg-emerald-500' :
                                source === 'direct' ? 'bg-blue-500' :
                                source === 'social' ? 'bg-purple-500' :
                                'bg-orange-500'
                              }`}></div>
                              <span className="text-sm font-medium text-slate-700 capitalize">{source}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-semibold text-slate-900">{percentage}%</span>
                              <div className="w-20 bg-slate-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    source === 'organic' ? 'bg-emerald-500' :
                                    source === 'direct' ? 'bg-blue-500' :
                                    source === 'social' ? 'bg-purple-500' :
                                    'bg-orange-500'
                                  }`}
                                  style={{ width: `${percentage * 2}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Device Breakdown */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Device Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(realTimeData.traffic.devices).map(([device, percentage]) => {
                          const Icon = device === 'mobile' ? Smartphone : device === 'desktop' ? Monitor : Tablet;
                          return (
                            <div key={device} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Icon className="h-5 w-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-700 capitalize">{device}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-semibold text-slate-900">{percentage}%</span>
                                <div className="w-20 bg-slate-200 rounded-full h-2 mt-1">
                                  <div 
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Geographic Distribution */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-green-600" />
                        Geographic Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {realTimeData.geography.topCountries.map((country, index) => (
                          <div key={country.name} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-slate-700">{country.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-semibold text-slate-900">{country.visitors.toLocaleString()}</span>
                              <p className="text-xs text-slate-500">{country.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* AI Insights */}
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="lg:col-span-2 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-purple-600" />
                        AI-Powered Business Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {aiInsights.map((insight) => (
                          <div key={insight.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-all">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Lightbulb className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-semibold text-slate-900">{insight.type}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    insight.impact === 'Critical' ? 'border-red-200 text-red-700' :
                                    insight.impact === 'High' ? 'border-orange-200 text-orange-700' :
                                    'border-blue-200 text-blue-700'
                                  }`}
                                >
                                  {insight.impact}
                                </Badge>
                                <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                                  {insight.confidence}% confidence
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-slate-700 mb-3">{insight.insight}</p>
                            <Button variant="outline" size="sm" className="w-full">
                              <Zap className="h-3 w-3 mr-2" />
                              {insight.action}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Conversion Analytics */}
              <TabsContent value="conversion" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-green-600" />
                        Conversion Funnel
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { stage: 'Visitors', count: 34250, rate: 100 },
                          { stage: 'Product Views', count: 12680, rate: 37 },
                          { stage: 'Add to Cart', count: 3420, rate: 10 },
                          { stage: 'Checkout', count: 1890, rate: 5.5 },
                          { stage: 'Purchase', count: 1302, rate: 3.8 }
                        ].map((stage, index) => (
                          <div key={stage.stage} className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-700">{stage.stage}</p>
                              <p className="text-xs text-slate-500">{stage.rate}% conversion</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-slate-900">{stage.count.toLocaleString()}</p>
                              <div className="w-20 bg-slate-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                  style={{ width: `${stage.rate}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Conversion Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">High Performing Page</span>
                          </div>
                          <p className="text-sm text-green-700">iPhone 15 Pro Max product page has 8.2% conversion rate - 115% above average</p>
                        </div>
                        
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            <span className="text-sm font-semibold text-amber-800">Optimization Opportunity</span>
                          </div>
                          <p className="text-sm text-amber-700">Cart abandonment rate is 72% - consider exit-intent popups or email reminders</p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-800">AI Recommendation</span>
                          </div>
                          <p className="text-sm text-blue-700">Adding customer reviews to product pages could increase conversion by 23%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Products Analytics */}
              <TabsContent value="products" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Product Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-slate-900">{realTimeData.products.views.toLocaleString()}</p>
                          <p className="text-sm text-slate-600">Total Product Views</p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-xl font-bold text-emerald-600">{realTimeData.products.sales}</p>
                            <p className="text-xs text-slate-600">Products Sold</p>
                          </div>
                          <div>
                            <p className="text-xl font-bold text-blue-600">{realTimeData.products.inventory}</p>
                            <p className="text-xs text-slate-600">In Inventory</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Category Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: 'Electronics', sales: 1847, growth: 18.2 },
                          { name: 'Fashion', sales: 892, growth: 12.8 },
                          { name: 'Home & Garden', sales: 634, growth: 24.5 },
                          { name: 'Sports', sales: 423, growth: -3.2 }
                        ].map((category) => (
                          <div key={category.name} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{category.name}</span>
                            <div className="text-right">
                              <span className="text-sm font-semibold text-slate-900">{category.sales}</span>
                              <div className="flex items-center text-xs">
                                {category.growth > 0 ? (
                                  <>
                                    <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                                    <span className="text-emerald-600">+{category.growth}%</span>
                                  </>
                                ) : (
                                  <>
                                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                                    <span className="text-red-600">{category.growth}%</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Customer Analytics */}
              <TabsContent value="customers" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Customer Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-slate-900">{realTimeData.customers.total.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Total Customers</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-emerald-600">{realTimeData.customers.new}</p>
                          <p className="text-xs text-slate-600">New Customers</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-blue-600">{realTimeData.customers.returning.toLocaleString()}</p>
                          <p className="text-xs text-slate-600">Returning</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Customer Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-5 w-5 ${
                                star <= Math.floor(realTimeData.customers.satisfaction) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{realTimeData.customers.satisfaction}</p>
                        <p className="text-sm text-slate-600">Average Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-emerald-600">{100 - realTimeData.customers.churnRate}%</p>
                        <p className="text-xs text-slate-600">Retention Rate</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Customer Value</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">ZMW {realTimeData.customers.lifetimeValue.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Avg Lifetime Value</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-orange-600">ZMW {realTimeData.orders.avgOrderValue.toFixed(2)}</p>
                        <p className="text-xs text-slate-600">Avg Order Value</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </RetailerDashboardLayout>
  );
}
