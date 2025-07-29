'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  Filter, 
  Eye, 
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  RefreshCw,
  FileText,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock analytics data
const analyticsData = {
  overview: {
    totalRevenue: 245680,
    revenueGrowth: 28.4,
    totalOrders: 2472,
    ordersGrowth: 15.2,
    totalCustomers: 1247,
    customersGrowth: 12.8,
    averageOrderValue: 289.50,
    aovGrowth: 8.3,
    conversionRate: 4.2,
    conversionGrowth: -0.5,
    returnRate: 1.8,
    returnGrowth: -2.1
  },
  salesByMonth: [
    { month: 'Jan', revenue: 15000, orders: 120, customers: 95 },
    { month: 'Feb', revenue: 18000, orders: 145, customers: 110 },
    { month: 'Mar', revenue: 22000, orders: 180, customers: 130 },
    { month: 'Apr', revenue: 25000, orders: 200, customers: 150 },
    { month: 'May', revenue: 32000, orders: 250, customers: 180 },
    { month: 'Jun', revenue: 38000, orders: 290, customers: 200 }
  ],
  topProducts: [
    { id: 1, name: 'Premium Wireless Headphones', revenue: 48250, units: 185, growth: 18.2 },
    { id: 2, name: 'Smart Fitness Watch', revenue: 35700, units: 119, growth: 12.8 },
    { id: 3, name: 'Ergonomic Office Chair', revenue: 28900, units: 145, growth: 24.5 },
    { id: 4, name: 'Professional Camera Lens', revenue: 27200, units: 32, growth: 8.7 },
    { id: 5, name: 'Designer Backpack', revenue: 18900, units: 112, growth: 16.3 }
  ],
  customerSegments: [
    { segment: 'New Customers', count: 325, percentage: 26, revenue: 63840 },
    { segment: 'Returning Customers', count: 562, percentage: 45, revenue: 125680 },
    { segment: 'VIP Customers', count: 180, percentage: 14, revenue: 89560 },
    { segment: 'Inactive Customers', count: 180, percentage: 15, revenue: 12800 }
  ],
  geographicData: [
    { location: 'Lusaka', orders: 1247, revenue: 156800, percentage: 64 },
    { location: 'Kitwe', orders: 456, revenue: 58900, percentage: 24 },
    { location: 'Ndola', orders: 289, revenue: 36200, percentage: 15 },
    { location: 'Livingstone', orders: 178, revenue: 22400, percentage: 9 },
    { location: 'Kabwe', orders: 134, revenue: 16800, percentage: 7 }
  ],
  deviceData: [
    { device: 'Mobile', sessions: 2847, percentage: 68, conversionRate: 3.8 },
    { device: 'Desktop', sessions: 1034, percentage: 25, conversionRate: 5.2 },
    { device: 'Tablet', sessions: 293, percentage: 7, conversionRate: 4.1 }
  ],
  trafficSources: [
    { source: 'Direct', sessions: 1567, percentage: 37, conversionRate: 4.8 },
    { source: 'Social Media', sessions: 1234, percentage: 29, conversionRate: 3.2 },
    { source: 'Search Engines', sessions: 890, percentage: 21, conversionRate: 5.1 },
    { source: 'Email', sessions: 345, percentage: 8, conversionRate: 6.2 },
    { source: 'Referrals', sessions: 138, percentage: 3, conversionRate: 4.5 },
    { source: 'Ads', sessions: 100, percentage: 2, conversionRate: 3.9 }
  ]
};

const reportTemplates = [
  {
    id: 1,
    name: 'Sales Report',
    description: 'Comprehensive sales performance analysis',
    type: 'sales',
    frequency: 'Monthly',
    lastGenerated: '2024-01-20'
  },
  {
    id: 2,
    name: 'Customer Analytics',
    description: 'Customer behavior and segmentation insights',
    type: 'customers',
    frequency: 'Weekly',
    lastGenerated: '2024-01-18'
  },
  {
    id: 3,
    name: 'Product Performance',
    description: 'Top performing products and inventory analysis',
    type: 'products',
    frequency: 'Monthly',
    lastGenerated: '2024-01-15'
  },
  {
    id: 4,
    name: 'Financial Summary',
    description: 'Revenue, costs, and profitability overview',
    type: 'financial',
    frequency: 'Monthly',
    lastGenerated: '2024-01-22'
  },
  {
    id: 5,
    name: 'Marketing Performance',
    description: 'Traffic sources and conversion analysis',
    type: 'marketing',
    frequency: 'Weekly',
    lastGenerated: '2024-01-19'
  }
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('overview');

  const formatCurrency = (amount: number) => {
    return `K${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? 
      <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-500" />;
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive business insights and performance analytics</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(analyticsData.overview.totalRevenue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getGrowthIcon(analyticsData.overview.revenueGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.revenueGrowth)}`}>
                      {formatPercentage(analyticsData.overview.revenueGrowth)} vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData.overview.totalOrders.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getGrowthIcon(analyticsData.overview.ordersGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.ordersGrowth)}`}>
                      {formatPercentage(analyticsData.overview.ordersGrowth)} vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Customers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData.overview.totalCustomers.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getGrowthIcon(analyticsData.overview.customersGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.customersGrowth)}`}>
                      {formatPercentage(analyticsData.overview.customersGrowth)} vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(analyticsData.overview.averageOrderValue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getGrowthIcon(analyticsData.overview.aovGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.aovGrowth)}`}>
                      {formatPercentage(analyticsData.overview.aovGrowth)} vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData.overview.conversionRate}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getGrowthIcon(analyticsData.overview.conversionGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.conversionGrowth)}`}>
                      {formatPercentage(analyticsData.overview.conversionGrowth)} vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Return Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData.overview.returnRate}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <RefreshCw className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getGrowthIcon(analyticsData.overview.returnGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.returnGrowth)}`}>
                      {formatPercentage(analyticsData.overview.returnGrowth)} vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <LineChart className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900">Revenue Chart</p>
                      <p className="text-sm text-gray-500">Interactive revenue timeline</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Sales by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Electronics</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">35%</p>
                        <p className="text-xs text-gray-500">K86,040</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Fashion</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">28%</p>
                        <p className="text-xs text-gray-500">K68,790</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">Home & Garden</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">18%</p>
                        <p className="text-xs text-gray-500">K44,222</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">Sports & Fitness</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">12%</p>
                        <p className="text-xs text-gray-500">K29,482</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Others</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">7%</p>
                        <p className="text-xs text-gray-500">K17,198</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.salesByMonth.map((month, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{month.month}</p>
                          <p className="text-sm text-gray-500">{month.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(month.revenue)}</p>
                          <p className="text-sm text-gray-500">{month.customers} customers</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.units} units sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(product.revenue)}</p>
                          <div className="flex items-center text-xs">
                            {getGrowthIcon(product.growth)}
                            <span className={`ml-1 ${getGrowthColor(product.growth)}`}>
                              {formatPercentage(product.growth)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.customerSegments.map((segment, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{segment.segment}</span>
                          <span className="text-sm text-gray-500">{segment.percentage}%</span>
                        </div>
                        <Progress value={segment.percentage} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{segment.count} customers</span>
                          <span>{formatCurrency(segment.revenue)} revenue</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.geographicData.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{location.location}</p>
                            <p className="text-sm text-gray-500">{location.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(location.revenue)}</p>
                          <p className="text-sm text-gray-500">{location.percentage}% of total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Growth</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyticsData.topProducts.map((product, index) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                            {index + 1}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.revenue)}</TableCell>
                        <TableCell>{product.units}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getGrowthIcon(product.growth)}
                            <span className={`ml-1 text-sm ${getGrowthColor(product.growth)}`}>
                              {formatPercentage(product.growth)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Progress 
                            value={Math.min(100, (product.revenue / 50000) * 100)} 
                            className="h-2 w-20" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Tab */}
          <TabsContent value="marketing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{source.source}</p>
                          <p className="text-sm text-gray-500">{source.sessions} sessions</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{source.percentage}%</p>
                          <p className="text-sm text-gray-500">{source.conversionRate}% conversion</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.deviceData.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{device.device}</span>
                          <span className="text-sm text-gray-500">{device.percentage}%</span>
                        </div>
                        <Progress value={device.percentage} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{device.sessions} sessions</span>
                          <span>{device.conversionRate}% conversion</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportTemplates.map((template) => (
                    <Card key={template.id} className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {template.frequency}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-sm mb-2">{template.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{template.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>Last generated:</span>
                          <span>{template.lastGenerated}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Report Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Report Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales Report</SelectItem>
                          <SelectItem value="customers">Customer Report</SelectItem>
                          <SelectItem value="products">Product Report</SelectItem>
                          <SelectItem value="financial">Financial Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date Range</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Format</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RetailerDashboardLayout>
  );
}
