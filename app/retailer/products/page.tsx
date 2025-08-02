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
  Image,
  Tag,
  Zap,
  Download,
  Upload,
  RefreshCw,
  Grid,
  List,
  Settings,
  Archive,
  Heart,
  Share,
  ExternalLink,
  Camera,
  FileText,
  Layers,
  Target,
  Users,
  MapPin
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock product data
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    price: 8999,
    cost: 7500,
    stock: 45,
    sold: 142,
    status: 'active',
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fd37688149d1c4a08823f60c0c863bc0f?alt=media&token=b8a067b4-22b5-467b-825d-02a54ca48139&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.9,
    reviews: 67,
    profit: 1499,
    profitMargin: 16.7,
    lastSold: '2 hours ago',
    trending: 'up',
    featured: true,
    sku: 'IP15PM-256-TB',
    supplier: 'Apple Inc.',
    tags: ['premium', 'bestseller', 'latest']
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    category: 'Electronics',
    price: 15999,
    cost: 13200,
    stock: 23,
    sold: 89,
    status: 'active',
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fa1f0f7fe79194c02bd25d4b3bd280c1e?alt=media&token=9b593d2b-7ded-4a21-89b7-f92f8fc0b1c2&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.8,
    reviews: 43,
    profit: 2799,
    profitMargin: 17.5,
    lastSold: '1 day ago',
    trending: 'up',
    featured: true,
    sku: 'MBP-M3-14-SG',
    supplier: 'Apple Inc.',
    tags: ['premium', 'professional', 'creative']
  },
  {
    id: 3,
    name: 'AirPods Pro (2nd Gen)',
    category: 'Electronics',
    price: 1299,
    cost: 980,
    stock: 67,
    sold: 234,
    status: 'active',
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F487697644c9e4357a799e4b9e359fa08?alt=media&token=c66d9719-3db6-4186-925a-e2ac9135f334&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.7,
    reviews: 156,
    profit: 319,
    profitMargin: 24.6,
    lastSold: '30 minutes ago',
    trending: 'up',
    featured: false,
    sku: 'APP-2G-WHITE',
    supplier: 'Apple Inc.',
    tags: ['audio', 'bestseller', 'portable']
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Electronics',
    price: 7999,
    cost: 6800,
    stock: 12,
    sold: 78,
    status: 'low_stock',
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F90fae2a5096b47e3aeecbf8d825c94d8?alt=media&token=9e566bb2-5300-4773-92b6-723406b300b9&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.6,
    reviews: 34,
    profit: 1199,
    profitMargin: 15.0,
    lastSold: '3 hours ago',
    trending: 'stable',
    featured: false,
    sku: 'SGS24U-256-TB',
    supplier: 'Samsung',
    tags: ['android', 'camera', 'flagship']
  },
  {
    id: 5,
    name: 'Dell XPS 13 Laptop',
    category: 'Electronics',
    price: 6899,
    stock: 8,
    cost: 5200,
    sold: 56,
    status: 'low_stock',
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fd3da9a1c796d464eab4b78deb4af752d?alt=media&token=0227fe19-5942-492e-a0ca-39e7db83fc84&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.5,
    reviews: 28,
    profit: 1699,
    profitMargin: 24.6,
    lastSold: '5 days ago',
    trending: 'down',
    featured: false,
    sku: 'DELL-XPS13-I7',
    supplier: 'Dell Technologies',
    tags: ['laptop', 'ultrabook', 'business']
  }
];

const categories = [
  { name: 'Electronics', count: 147, color: 'bg-blue-500' },
  { name: 'Fashion', count: 89, color: 'bg-purple-500' },
  { name: 'Home & Garden', count: 67, color: 'bg-green-500' },
  { name: 'Sports', count: 45, color: 'bg-orange-500' },
  { name: 'Books', count: 23, color: 'bg-pink-500' }
];

const quickStats = {
  totalProducts: 371,
  activeProducts: 342,
  lowStock: 15,
  outOfStock: 8,
  totalValue: 2450000,
  avgPrice: 6600,
  topCategory: 'Electronics',
  profitMargin: 18.5
};

export default function ProductManagement() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>;
      case 'low_stock':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Out of Stock</Badge>;
      case 'draft':
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Draft</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Unknown</Badge>;
    }
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
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <RetailerDashboardLayout>
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-50/50 via-white to-indigo-50/20">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/60 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-slate-600 font-medium">Manage your inventory, pricing, and product catalog</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { 
                label: 'Total Products', 
                value: quickStats.totalProducts, 
                icon: Package, 
                color: 'text-blue-600',
                bg: 'bg-blue-50'
              },
              { 
                label: 'Active Products', 
                value: quickStats.activeProducts, 
                icon: CheckCircle, 
                color: 'text-emerald-600',
                bg: 'bg-emerald-50'
              },
              { 
                label: 'Low Stock', 
                value: quickStats.lowStock, 
                icon: AlertTriangle, 
                color: 'text-amber-600',
                bg: 'bg-amber-50'
              },
              { 
                label: 'Avg Profit Margin', 
                value: `${quickStats.profitMargin}%`, 
                icon: TrendingUp, 
                color: 'text-purple-600',
                bg: 'bg-purple-50'
              }
            ].map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <Tabs defaultValue="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="products">All Products</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="products" className="space-y-6">
              {/* Filters and Search */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search products by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat.name} value={cat.name}>
                              {cat.name} ({cat.count})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="low_stock">Low Stock</SelectItem>
                          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="price">Price</SelectItem>
                          <SelectItem value="stock">Stock</SelectItem>
                          <SelectItem value="sold">Sales</SelectItem>
                          <SelectItem value="profit">Profit</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        More Filters
                      </Button>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  {selectedProducts.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-blue-800 font-medium">
                          {selectedProducts.length} product(s) selected
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Bulk Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedProducts.length === products.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Profit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Trend</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-slate-50">
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => handleSelectProduct(product.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-semibold text-slate-900">{product.name}</p>
                                  {product.featured && (
                                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                                      <Star className="h-3 w-3 mr-1" />
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-500">SKU: {product.sku}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center text-amber-500">
                                    <Star className="h-3 w-3 fill-current mr-1" />
                                    <span className="text-xs">{product.rating}</span>
                                  </div>
                                  <span className="text-xs text-slate-500">({product.reviews} reviews)</span>
                                  <span className="text-xs text-slate-400">• Last sold {product.lastSold}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-slate-900">ZMW {product.price.toLocaleString()}</p>
                              <p className="text-xs text-slate-500">Cost: ZMW {product.cost.toLocaleString()}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-slate-900">{product.stock}</p>
                              {product.stock < 20 && (
                                <p className="text-xs text-red-600 flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Low stock
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-slate-900">{product.sold}</p>
                              <p className="text-xs text-slate-500">units sold</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-emerald-600">ZMW {product.profit.toLocaleString()}</p>
                              <p className="text-xs text-slate-500">{product.profitMargin}% margin</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(product.status)}
                          </TableCell>
                          <TableCell>
                            {getTrendingIcon(product.trending)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit3 className="h-4 w-4 mr-2" />
                                  Edit Product
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View in Store
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.name} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Products
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{category.name}</h3>
                      <p className="text-2xl font-bold text-slate-900 mb-1">{category.count}</p>
                      <p className="text-sm text-slate-600">products</p>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Product
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Category Card */}
                <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Add Category</h3>
                    <p className="text-sm text-slate-600 mb-4">Create a new product category</p>
                    <Button variant="outline" size="sm">
                      Create Category
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Performance */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                      Top Performing Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.slice(0, 5).map((product, index) => (
                        <div key={product.id} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                          </div>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.sold} sold • ZMW {product.profit.toLocaleString()} profit</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">ZMW {product.price.toLocaleString()}</p>
                            <div className="flex items-center text-xs text-emerald-600">
                              {getTrendingIcon(product.trending)}
                              <span className="ml-1">{product.profitMargin}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Inventory Alerts */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                      Inventory Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.filter(p => p.stock < 20).map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                              <p className="text-xs text-amber-700">Only {product.stock} left in stock</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="border-amber-300 hover:bg-amber-100">
                            Restock
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Product Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Auto-publish products</p>
                        <p className="text-sm text-slate-600">Automatically publish products when created</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Low stock alerts</p>
                        <p className="text-sm text-slate-600">Get notified when products are running low</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Pricing rules</p>
                        <p className="text-sm text-slate-600">Set up automatic pricing strategies</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Import/Export</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-slate-900 mb-2">Bulk Import Products</p>
                      <p className="text-sm text-slate-600 mb-4">Import products from CSV file</p>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Import CSV
                      </Button>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium text-slate-900 mb-2">Export Catalog</p>
                      <p className="text-sm text-slate-600 mb-4">Export your entire product catalog</p>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
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
