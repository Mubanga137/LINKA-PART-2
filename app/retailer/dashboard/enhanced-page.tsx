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
  Upload,
  Edit,
  Trash2,
  EyeOff,
  ExternalLink
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import EnhancedRetailerDashboardLayout from '@/components/retailer/enhanced-retailer-dashboard-layout';

// Enhanced dashboard data with real-time capabilities
const dashboardStats = {
  todaysSales: 42300,
  salesChange: 12.5,
  totalOrders: 23,
  ordersChange: 8.2,
  productsSold: 47,
  productsChange: -2.1,
  totalProducts: 8,
  productsActive: 15.3,
  lowStockItems: 2,
  featuredItems: 4,
  inventoryValue: 1214900,
  conversionRate: 3.2,
  avgOrderValue: 365,
  customerSatisfaction: 4.9,
  responseTime: '2.3h'
};

// Enhanced product data with real Builder.io images
const allProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 19500,
    originalPrice: 21000,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fe182d99b828f4a768817871766e2f5bb?format=webp&width=400',
    category: 'Electronics',
    stock: 5,
    lowStock: true,
    featured: true,
    status: 'active',
    sales: 23,
    views: 1240,
    rating: 4.8,
    tags: ['Featured', 'Low Stock']
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: 24800,
    originalPrice: 26000,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2Ffb567d646d14485db40714dd67030874?format=webp&width=400',
    category: 'Electronics',
    stock: 12,
    lowStock: false,
    featured: true,
    status: 'active',
    sales: 18,
    views: 956,
    rating: 4.9,
    tags: ['Featured', 'Best Seller']
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra',
    price: 18200,
    originalPrice: 19500,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F87b1b98d4b0346cfa8b4b5b5c8b5b5b5?format=webp&width=400',
    category: 'Electronics',
    stock: 8,
    lowStock: false,
    featured: false,
    status: 'active',
    sales: 15,
    views: 789,
    rating: 4.7,
    tags: ['New Arrival']
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    price: 16800,
    originalPrice: 18000,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F65b1b98d4b0346cfa8b4b5b5c8b5b5b5?format=webp&width=400',
    category: 'Electronics',
    stock: 3,
    lowStock: true,
    featured: false,
    status: 'active',
    sales: 9,
    views: 634,
    rating: 4.6,
    tags: ['Low Stock']
  },
  {
    id: 5,
    name: 'Apple Watch Series 9',
    price: 8500,
    originalPrice: 9200,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F32b1b98d4b0346cfa8b4b5b5c8b5b5b5?format=webp&width=400',
    category: 'Wearables',
    stock: 15,
    lowStock: false,
    featured: true,
    status: 'active',
    sales: 31,
    views: 1456,
    rating: 4.8,
    tags: ['Featured', 'Hot Item']
  },
  {
    id: 6,
    name: 'AirPods Pro 2nd Gen',
    price: 4200,
    originalPrice: 4800,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F21b1b98d4b0346cfa8b4b5b5c8b5b5b5?format=webp&width=400',
    category: 'Audio',
    stock: 25,
    lowStock: false,
    featured: false,
    status: 'active',
    sales: 42,
    views: 2134,
    rating: 4.9,
    tags: ['Best Seller']
  },
  {
    id: 7,
    name: 'Dell XPS 13',
    price: 22000,
    originalPrice: 24500,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F11b1b98d4b0346cfa8b4b5b5c8b5b5b5?format=webp&width=400',
    category: 'Electronics',
    stock: 6,
    lowStock: false,
    featured: false,
    status: 'active',
    sales: 7,
    views: 423,
    rating: 4.5,
    tags: ['Professional']
  },
  {
    id: 8,
    name: 'Sony WH-1000XM5',
    price: 6800,
    originalPrice: 7500,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F51b1b98d4b0346cfa8b4b5b5c8b5b5b5?format=webp&width=400',
    category: 'Audio',
    stock: 18,
    lowStock: false,
    featured: true,
    status: 'active',
    sales: 26,
    views: 1023,
    rating: 4.7,
    tags: ['Featured', 'Audio Pro']
  }
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Chanda Mwanza',
    product: 'iPhone 15 Pro Max',
    amount: 19500,
    time: '5 min ago',
    status: 'pending',
    statusColor: 'text-orange-600 bg-orange-50 border-orange-200',
    avatar: 'CM'
  },
  {
    id: 'ORD-002',
    customer: 'Bwalya Tembo',
    product: 'MacBook Air M2',
    amount: 24800,
    time: '15 min ago',
    status: 'processing',
    statusColor: 'text-blue-600 bg-blue-50 border-blue-200',
    avatar: 'BT'
  },
  {
    id: 'ORD-003',
    customer: 'Mutinta Kapasa',
    product: 'Apple Watch Series 9',
    amount: 8500,
    time: '32 min ago',
    status: 'completed',
    statusColor: 'text-green-600 bg-green-50 border-green-200',
    avatar: 'MK'
  }
];

export default function EnhancedDashboard() {
  const [timeRange, setTimeRange] = useState('today');
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState(dashboardStats);
  const [mounted, setMounted] = useState(false);
  const [productFilter, setProductFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
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

  // Filter products based on filter and search
  const filteredProducts = allProducts.filter(product => {
    const matchesFilter = productFilter === 'all' || 
      (productFilter === 'featured' && product.featured) ||
      (productFilter === 'lowstock' && product.lowStock) ||
      (productFilter === 'bestseller' && product.sales > 20);
    
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleProductAction = (action: string, productId: number) => {
    console.log(`${action} product ${productId}`);
    // Implement actual product actions here
  };

  return (
    <EnhancedRetailerDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Enhanced Header */}
        <div className="sticky top-0 z-40 border-b border-white/20 bg-white/90 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 font-medium">Welcome back, Mwamba! Here's your store overview.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Search products, orders..."
                  className="pl-10 w-72 bg-white/80 border-white/40 backdrop-blur-sm focus:bg-white transition-all duration-200"
                />
              </div>
              <Button variant="outline" size="sm" className="bg-white/80 border-white/40 backdrop-blur-sm hover:bg-white transition-all duration-200">
                <Bell className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">3</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/80 border-white/40 backdrop-blur-sm hover:bg-white transition-all duration-200"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Hero Stats Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <p className="text-xs text-emerald-600">+{realTimeData.salesChange}% from yesterday</p>
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
                  <p className="text-xs text-orange-600">+{realTimeData.ordersChange}% from yesterday</p>
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
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.3%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Products Sold</p>
                  <p className="text-3xl font-bold text-blue-900">{realTimeData.productsSold}</p>
                  <p className="text-xs text-blue-600">+15.3% from yesterday</p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-500">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Excellent
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Satisfaction</p>
                  <p className="text-3xl font-bold text-purple-900">{realTimeData.customerSatisfaction}/5.0</p>
                  <p className="text-xs text-purple-600">Based on 156 reviews</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Product Management Section */}
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                    <Package className="h-6 w-6 mr-2 text-blue-600" />
                    Product Management
                  </CardTitle>
                  <p className="text-slate-600 mt-1">Manage your product catalog with real-time insights</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input 
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={productFilter} onValueChange={setProductFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="lowstock">Low Stock</SelectItem>
                      <SelectItem value="bestseller">Best Sellers</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Enhanced Product Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-slate-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Status Tags - Top Left */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.tags.map((tag) => (
                          <Badge 
                            key={tag}
                            className={`text-xs font-medium shadow-lg ${
                              tag === 'Featured' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                              tag === 'Low Stock' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                              tag === 'Best Seller' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                              tag === 'New Arrival' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' :
                              'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                            }`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Buttons - Top Right */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => handleProductAction('edit', product.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleProductAction('view', product.id)}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Store
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleProductAction('hide', product.id)}>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Hide
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleProductAction('delete', product.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Stock Indicator */}
                      <div className="absolute bottom-3 right-3">
                        <Badge variant="outline" className={`bg-white/90 ${
                          product.lowStock ? 'text-red-600 border-red-200' : 'text-green-600 border-green-200'
                        }`}>
                          {product.stock} in stock
                        </Badge>
                      </div>
                    </div>

                    {/* Product Details */}
                    <CardContent className="p-4 space-y-3">
                      {/* Product Name & Category */}
                      <div>
                        <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{product.category}</p>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-slate-900">
                            ZMW {product.price.toLocaleString()}
                          </p>
                          {product.originalPrice > product.price && (
                            <p className="text-sm text-slate-500 line-through">
                              ZMW {product.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium text-slate-700 ml-1">{product.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-blue-600">{product.sales}</p>
                          <p className="text-xs text-slate-500">Sales</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-600">{product.views}</p>
                          <p className="text-xs text-slate-500">Views</p>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 h-8 text-xs"
                          onClick={() => handleProductAction('edit', product.id)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleProductAction('view', product.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">No products found</h3>
                  <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders Section */}
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  Recent Orders
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All Orders
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-900">{order.id}</p>
                        <p className="text-sm text-slate-600">{order.customer}</p>
                        <p className="text-xs text-slate-500">{order.product}</p>
                        <p className="text-xs text-slate-400">{order.time}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-bold text-slate-900">ZMW {order.amount.toLocaleString()}</p>
                      <Badge className={`text-xs ${order.statusColor}`}>
                        {order.status}
                      </Badge>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                          View
                        </Button>
                        <Button size="sm" className="h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700">
                          Process
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EnhancedRetailerDashboardLayout>
  );
}
