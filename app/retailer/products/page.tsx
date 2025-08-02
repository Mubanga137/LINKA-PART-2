'use client';

import { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Eye, 
  Copy,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Upload,
  RefreshCw,
  Grid,
  List,
  Settings,
  Share,
  ExternalLink,
  Camera,
  FileText,
  Target,
  Users,
  MapPin,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Enhanced product data with reference images
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'electronics',
    price: 17500,
    cost: 15000,
    stock: 15,
    sold: 247,
    status: 'featured',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fe182d99b828f4a768817871766e2f5bb?format=webp&width=800',
    rating: 4.9,
    reviews: 67,
    profit: 2500,
    profitMargin: 14.3,
    lastSold: '2 hours ago',
    trending: 'up',
    featured: true,
    sku: 'IP15P-256-NB',
    supplier: 'Apple Inc.',
    tags: ['premium', 'bestseller', 'latest'],
    description: 'Latest iPhone with advanced camera system and powerful A17 Pro chip',
    lowStock: false
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    category: 'electronics',
    price: 24800,
    cost: 21000,
    stock: 8,
    sold: 189,
    status: 'low_stock',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F24c3337bcb4c4431b75bab53769a5940?format=webp&width=800',
    rating: 4.8,
    reviews: 43,
    profit: 3800,
    profitMargin: 15.3,
    lastSold: '1 day ago',
    trending: 'up',
    featured: true,
    sku: 'MBA-M2-13-SG',
    supplier: 'Apple Inc.',
    tags: ['premium', 'professional', 'creative'],
    description: 'Powerful laptop with M2 chip, perfect for professionals',
    lowStock: true
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24',
    category: 'electronics',
    price: 15200,
    cost: 13000,
    stock: 18,
    sold: 156,
    status: 'active',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fd6a6e50fa6184c339f2c7eba01c8d627?format=webp&width=800',
    rating: 4.7,
    reviews: 89,
    profit: 2200,
    profitMargin: 14.5,
    lastSold: '3 hours ago',
    trending: 'stable',
    featured: false,
    sku: 'SGS24-256-PH',
    supplier: 'Samsung',
    tags: ['android', 'camera', 'flagship'],
    description: 'Flagship Android smartphone with exceptional camera capabilities',
    lowStock: false
  },
  {
    id: 4,
    name: 'Dell XPS 13',
    category: 'electronics',
    price: 18900,
    cost: 16000,
    stock: 6,
    sold: 134,
    status: 'low_stock',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F8583a431a0094cd586dcdce5c70a7e4a?format=webp&width=800',
    rating: 4.6,
    reviews: 52,
    profit: 2900,
    profitMargin: 15.3,
    lastSold: '2 days ago',
    trending: 'down',
    featured: false,
    sku: 'DXS13-I7-512',
    supplier: 'Dell Technologies',
    tags: ['laptop', 'ultrabook', 'business'],
    description: 'Ultra-portable laptop with stunning display and performance',
    lowStock: true
  },
  {
    id: 5,
    name: 'AirPods Pro',
    category: 'electronics',
    price: 3200,
    cost: 2500,
    stock: 25,
    sold: 298,
    status: 'active',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fc0526831ead942899cd69bbc6bbfb789?format=webp&width=800',
    rating: 4.8,
    reviews: 124,
    profit: 700,
    profitMargin: 21.9,
    lastSold: '1 hour ago',
    trending: 'up',
    featured: false,
    sku: 'APP-2G-WHITE',
    supplier: 'Apple Inc.',
    tags: ['audio', 'wireless', 'premium'],
    description: 'Premium wireless earbuds with active noise cancellation',
    lowStock: false
  },
  {
    id: 6,
    name: 'iPad Air',
    category: 'electronics',
    price: 8900,
    cost: 7500,
    stock: 12,
    sold: 178,
    status: 'active',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F76c3846b0bc0447eae9197cf5b6a874d?format=webp&width=800',
    rating: 4.7,
    reviews: 67,
    profit: 1400,
    profitMargin: 15.7,
    lastSold: '6 hours ago',
    trending: 'stable',
    featured: false,
    sku: 'IPA-11-256-BL',
    supplier: 'Apple Inc.',
    tags: ['tablet', 'creative', 'productivity'],
    description: 'Versatile tablet for work and entertainment',
    lowStock: false
  }
];

const categories = [
  { name: 'Electronics', count: 6, color: 'bg-blue-500' },
  { name: 'Fashion', count: 0, color: 'bg-purple-500' },
  { name: 'Home & Garden', count: 0, color: 'bg-green-500' },
  { name: 'Sports', count: 0, color: 'bg-orange-500' }
];

const quickStats = {
  totalProducts: 8,
  inventoryValue: 1214900,
  lowStockItems: 2,
  featuredItems: 4,
  totalValue: 2450000,
  avgPrice: 15550,
  topCategory: 'Electronics',
  profitMargin: 16.2
};

export default function ModernProductManagement() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === products.length ? [] : products.map(p => p.id)
    );
  };

  const getStatusBadge = (product: any) => {
    if (product.featured) {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Featured</Badge>;
    }
    if (product.lowStock) {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Low Stock</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Active</Badge>;
  };

  const getTrendingIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-slate-300"></div>;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'featured' && product.featured) ||
                         (filterStatus === 'low_stock' && product.lowStock) ||
                         (filterStatus === 'active' && !product.featured && !product.lowStock);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <RetailerDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Modern Header */}
        <div className="sticky top-0 z-40 border-b border-white/20 bg-white/80 backdrop-blur-xl">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Storefront Management
                </h1>
                <p className="text-slate-600 font-medium">Manage your products and services - Private vendor view</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="bg-white/60 border-white/40">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Store
                </Button>
                <Button variant="outline" size="sm" className="bg-white/60 border-white/40">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">8</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Total Products</p>
                  <p className="text-3xl font-bold text-purple-900">{quickStats.totalProducts}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">ZMW</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Inventory Value</p>
                  <p className="text-3xl font-bold text-emerald-900">1,214,900</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-red-200">2</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">Low Stock Items</p>
                  <p className="text-3xl font-bold text-red-900">{quickStats.lowStockItems}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 hover:scale-[1.02] cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">4</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Featured Items</p>
                  <p className="text-3xl font-bold text-blue-900">{quickStats.featuredItems}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search your products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/60 border-white/40"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40 bg-white/60 border-white/40">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 bg-white/60 border-white/40">
                      <SelectValue placeholder="Name A-Z" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="stock">Stock</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="h-8"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="h-8"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Your Products (8)</h2>
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                Private View
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:scale-[1.02] cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square bg-slate-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Status Badges */}
                      <div className="absolute top-3 left-3">
                        {product.featured && (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                            Featured
                          </Badge>
                        )}
                        {product.lowStock && (
                          <Badge className="bg-red-100 text-red-700 border-red-200 text-xs mt-1">
                            Low Stock
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-1 truncate">{product.name}</h3>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs ml-1">{product.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">ZMW {product.price.toLocaleString()}</span>
                          <div className="flex items-center text-xs text-slate-500">
                            <span>{product.stock} in stock</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{product.sold} sales</span>
                          <span>{product.reviews} reviews</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="px-2">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* View All Orders */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <Button variant="outline" className="w-full max-w-xs">
                  View All Orders (2)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RetailerDashboardLayout>
  );
}
