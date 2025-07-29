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
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Zap,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Enhanced analytics data with more retailer-specific metrics
const analyticsData = {
  realTimeMetrics: {
    visitorsNow: 127,
    salesToday: 34560,
    ordersToday: 89,
    conversionRate: 4.2,
    averageOrderValue: 389,
    topProduct: 'Premium Headphones'
  },
  performanceMetrics: {
    totalRevenue: 1245680,
    revenueGrowth: 28.4,
    totalOrders: 3472,
    ordersGrowth: 15.2,
    totalCustomers: 2247,
    customersGrowth: 12.8,
    retentionRate: 67.3,
    customerLifetimeValue: 1240
  },
  salesChannels: [
    { channel: 'Direct Website', revenue: 458900, percentage: 36.8, growth: 23.4 },
    { channel: 'Mobile App', revenue: 372100, percentage: 29.9, growth: 31.7 },
    { channel: 'Social Media', revenue: 249800, percentage: 20.1, growth: 45.2 },
    { channel: 'Referrals', revenue: 164880, percentage: 13.2, growth: 12.8 }
  ],
  geographicData: [
    { region: 'Lusaka Province', orders: 1247, revenue: 456800, percentage: 36.7 },
    { region: 'Copperbelt Province', orders: 698, revenue: 298900, percentage: 24.0 },
    { region: 'Central Province', orders: 456, revenue: 189200, percentage: 15.2 },
    { region: 'Southern Province', orders: 334, revenue: 156700, percentage: 12.6 },
    { region: 'Other Provinces', orders: 737, revenue: 144080, percentage: 11.5 }
  ],
  predictiveInsights: [
    {
      title: 'Revenue Forecast',
      prediction: '+42% next quarter',
      confidence: 87,
      type: 'positive'
    },
    {
      title: 'Inventory Alert',
      prediction: '5 products running low',
      confidence: 95,
      type: 'warning'
    },
    {
      title: 'Market Opportunity',
      prediction: 'Electronics demand surge',
      confidence: 78,
      type: 'opportunity'
    },
    {
      title: 'Customer Behavior',
      prediction: 'Mobile shopping increasing',
      confidence: 92,
      type: 'insight'
    }
  ]
};

export default function RetailerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return `K${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-emerald-600';
      case 'warning': return 'text-amber-600';
      case 'opportunity': return 'text-blue-600';
      case 'insight': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getMetricBg = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-gradient-to-br from-emerald-50 to-green-100';
      case 'warning': return 'bg-gradient-to-br from-amber-50 to-yellow-100';
      case 'opportunity': return 'bg-gradient-to-br from-blue-50 to-indigo-100';
      case 'insight': return 'bg-gradient-to-br from-purple-50 to-violet-100';
      default: return 'bg-gray-50';
    }
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
              Advanced Analytics
            </h1>
            <p className="text-indigo-700 mt-1 font-medium">Real-time insights and predictive analytics for your business</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px] border-indigo-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Real-Time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-red-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-red-700 mb-1">Visitors Now</p>
                  <p className="text-2xl font-bold text-red-800">{analyticsData.realTimeMetrics.visitorsNow}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-red-600 font-medium">Live</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-emerald-700 mb-1">Sales Today</p>
                  <p className="text-2xl font-bold text-emerald-800">{formatCurrency(analyticsData.realTimeMetrics.salesToday)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-emerald-600 font-medium">+23% vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-700 mb-1">Orders Today</p>
                  <p className="text-2xl font-bold text-blue-800">{analyticsData.realTimeMetrics.ordersToday}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-blue-600 font-medium">12 in last hour</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-purple-700 mb-1">Conversion</p>
                  <p className="text-2xl font-bold text-purple-800">{analyticsData.realTimeMetrics.conversionRate}%</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-purple-600 font-medium">Above average</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-orange-700 mb-1">Avg Order</p>
                  <p className="text-2xl font-bold text-orange-800">{formatCurrency(analyticsData.realTimeMetrics.averageOrderValue)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-orange-600 font-medium">+8% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-teal-700 mb-1">Top Product</p>
                  <p className="text-sm font-bold text-teal-800">{analyticsData.realTimeMetrics.topProduct}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-teal-600 font-medium">23 sold today</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Performance
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Sales Channels
            </TabsTrigger>
            <TabsTrigger value="geography" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Geography
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              AI Insights
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">Total Revenue</p>
                      <p className="text-3xl font-bold text-emerald-800">
                        {formatCurrency(analyticsData.performanceMetrics.totalRevenue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-sm font-bold text-emerald-700">
                      +{analyticsData.performanceMetrics.revenueGrowth}% vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Orders</p>
                      <p className="text-3xl font-bold text-blue-800">
                        {analyticsData.performanceMetrics.totalOrders.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <ArrowUpRight className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-bold text-blue-700">
                      +{analyticsData.performanceMetrics.ordersGrowth}% growth
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Total Customers</p>
                      <p className="text-3xl font-bold text-purple-800">
                        {analyticsData.performanceMetrics.totalCustomers.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <ArrowUpRight className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-bold text-purple-700">
                      +{analyticsData.performanceMetrics.customersGrowth}% new customers
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Customer LTV</p>
                      <p className="text-3xl font-bold text-orange-800">
                        {formatCurrency(analyticsData.performanceMetrics.customerLifetimeValue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-orange-600">Retention Rate</span>
                      <span className="font-bold text-orange-700">{analyticsData.performanceMetrics.retentionRate}%</span>
                    </div>
                    <Progress value={analyticsData.performanceMetrics.retentionRate} className="mt-2 h-2 bg-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Channels Tab */}
          <TabsContent value="channels" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
                    Sales Channel Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.salesChannels.map((channel, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{channel.channel}</h4>
                          <Badge className={`${
                            channel.growth > 30 ? 'bg-green-100 text-green-700' :
                            channel.growth > 20 ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            +{channel.growth}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <span>{formatCurrency(channel.revenue)}</span>
                          <span>{channel.percentage}% of total</span>
                        </div>
                        <Progress value={channel.percentage} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-indigo-600" />
                    Channel Revenue Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <PieChart className="h-8 w-8 text-indigo-600" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900">Interactive Chart</p>
                      <p className="text-sm text-gray-500">Channel performance visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Geographic Tab */}
          <TabsContent value="geography" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                  Geographic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {analyticsData.geographicData.map((region, index) => (
                    <Card key={index} className="bg-gradient-to-br from-indigo-50 to-purple-100 border-0">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <h4 className="font-semibold text-indigo-900 text-sm mb-2">{region.region}</h4>
                          <p className="text-2xl font-bold text-indigo-800 mb-1">
                            {formatCurrency(region.revenue)}
                          </p>
                          <p className="text-xs text-indigo-600 mb-3">{region.orders} orders</p>
                          <div className="w-full bg-indigo-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${region.percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-indigo-600 mt-2">{region.percentage}% of total</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analyticsData.predictiveInsights.map((insight, index) => (
                <Card key={index} className={`border-0 shadow-xl ${getMetricBg(insight.type)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{insight.title}</h3>
                        <p className={`text-xl font-semibold ${getMetricColor(insight.type)}`}>
                          {insight.prediction}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center">
                        <Zap className={`h-6 w-6 ${getMetricColor(insight.type)}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Confidence Level</span>
                      <span className={`text-sm font-bold ${getMetricColor(insight.type)}`}>
                        {insight.confidence}%
                      </span>
                    </div>
                    <Progress value={insight.confidence} className="mt-2 h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RetailerDashboardLayout>
  );
}
