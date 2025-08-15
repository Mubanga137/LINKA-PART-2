'use client';

import { useState } from 'react';
import { 
  Package,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Copy,
  Image,
  BarChart3,
  Tag,
  ShoppingCart,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock products data
const products = [
  {
    id: 'PRD-001',
    name: 'iPhone 15 Pro Max',
    sku: 'IPH15PM-256-NTT',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 1599.99,
    costPrice: 1200.00,
    stock: 25,
    minStock: 10,
    status: 'active',
    sales: 47,
    revenue: 75199.53,
    rating: 4.8,
    reviews: 123,
    image: 'https://images.unsplash.com/photo-1592286590955-87fa9830c4c3?w=80&h=80&fit=crop',
    lastUpdated: '2024-01-15T10:30:00Z',
    trending: 'up',
    featured: true
  },
  {
    id: 'PRD-002',
    name: 'MacBook Pro M3',
    sku: 'MBP-M3-16-512',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 2999.99,
    costPrice: 2400.00,
    stock: 8,
    minStock: 5,
    status: 'active',
    sales: 23,
    revenue: 68999.77,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=80&h=80&fit=crop',
    lastUpdated: '2024-01-14T15:45:00Z',
    trending: 'up',
    featured: true
  },
  {
    id: 'PRD-003',
    name: 'AirPods Pro 2nd Gen',
    sku: 'APP-2ND-WHT',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 249.99,
    costPrice: 180.00,
    stock: 45,
    minStock: 20,
    status: 'active',
    sales: 89,
    revenue: 22249.11,
    rating: 4.7,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=80&fit=crop',
    lastUpdated: '2024-01-13T09:15:00Z',
    trending: 'up',
    featured: false
  },
  {
    id: 'PRD-004',
    name: 'Samsung Galaxy S24',
    sku: 'SGS24-256-BLK',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 899.99,
    costPrice: 650.00,
    stock: 3,
    minStock: 15,
    status: 'active',
    sales: 34,
    revenue: 30599.66,
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=80&h=80&fit=crop',
    lastUpdated: '2024-01-12T14:20:00Z',
    trending: 'down',
    featured: false
  },
  {
    id: 'PRD-005',
    name: 'iPad Air M2',
    sku: 'IPA-M2-256-BLU',
    category: 'Electronics',
    subcategory: 'Tablets',
    price: 749.99,
    costPrice: 550.00,
    stock: 15,
    minStock: 10,
    status: 'active',
    sales: 19,
    revenue: 14249.81,
    rating: 4.8,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&h=80&fit=crop',
    lastUpdated: '2024-01-11T11:30:00Z',
    trending: 'stable',
    featured: false
  },
  {
    id: 'PRD-006',
    name: 'Apple Watch Series 9',
    sku: 'AWS9-45-SLV',
    category: 'Electronics',
    subcategory: 'Wearables',
    price: 429.99,
    costPrice: 320.00,
    stock: 0,
    minStock: 8,
    status: 'out_of_stock',
    sales: 56,
    revenue: 24079.44,
    rating: 4.5,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
    lastUpdated: '2024-01-10T16:45:00Z',
    trending: 'up',
    featured: true
  }
];

const categories = ['All Categories', 'Electronics', 'Fashion', 'Home & Garden', 'Sports & Fitness'];
const statuses = ['All Status', 'Active', 'Draft', 'Out of Stock'];

const productStats = {
  total: 247,
  active: 189,
  draft: 12,
  outOfStock: 28,
  lowStock: 18,
  totalValue: 892450,
  topSelling: 34
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'draft':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'out_of_stock':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStockStatus = (stock: number, minStock: number) => {
  if (stock === 0) {
    return { status: 'Out of Stock', color: 'text-red-600', bgColor: 'bg-red-100' };
  } else if (stock <= minStock) {
    return { status: 'Low Stock', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  } else {
    return { status: 'In Stock', color: 'text-green-600', bgColor: 'bg-green-100' };
  }
};

const getTrendingIcon = (trending: string) => {
  switch (trending) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case 'down':
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    default:
      return <BarChart3 className="h-4 w-4 text-gray-600" />;
  }
};

export default function PremiumProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || 
                         (selectedStatus === 'Active' && product.status === 'active') ||
                         (selectedStatus === 'Draft' && product.status === 'draft') ||
                         (selectedStatus === 'Out of Stock' && product.status === 'out_of_stock');
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateMargin = (price: number, cost: number) => {
    return ((price - cost) / price * 100).toFixed(1);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-slate-600 text-lg">Manage your product inventory and listings</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Products
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-blue-900">{productStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={78} className="h-2 bg-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Active</p>
                <p className="text-3xl font-bold text-green-900">{productStats.active}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Badge className="bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Low Stock</p>
                <p className="text-3xl font-bold text-orange-900">{productStats.lowStock}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Badge className="bg-orange-100 text-orange-700">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Attention
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">Inventory Value</p>
                <p className="text-2xl font-bold text-purple-900">ZMW {(productStats.totalValue / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <Tag className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-purple-600">Total value in stock</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-700 mb-1">Top Selling</p>
                <p className="text-3xl font-bold text-teal-900">{productStats.topSelling}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Badge className="bg-teal-100 text-teal-700">
                <Star className="h-3 w-3 mr-1" />
                Best Sellers
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search products by name, SKU, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-600" />
            Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Product</TableHead>
                  <TableHead className="font-semibold text-slate-700">Category</TableHead>
                  <TableHead className="font-semibold text-slate-700">Price</TableHead>
                  <TableHead className="font-semibold text-slate-700">Stock</TableHead>
                  <TableHead className="font-semibold text-slate-700">Sales</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Trend</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock, product.minStock);
                  
                  return (
                    <TableRow key={product.id} className="hover:bg-slate-50 transition-colors duration-200">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            {product.featured && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                <Star className="h-2 w-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 truncate max-w-48">{product.name}</p>
                            <p className="text-sm text-slate-500">{product.sku}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                <span className="text-xs text-slate-600">{product.rating}</span>
                              </div>
                              <span className="text-xs text-slate-400">({product.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{product.category}</p>
                          <p className="text-sm text-slate-500">{product.subcategory}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold text-slate-900">ZMW {product.price.toLocaleString()}</p>
                          <p className="text-sm text-slate-500">
                            Margin: {calculateMargin(product.price, product.costPrice)}%
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{product.stock} units</p>
                          <Badge className={`text-xs ${stockStatus.bgColor} ${stockStatus.color} mt-1`}>
                            {stockStatus.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{product.sales} sold</p>
                          <p className="text-sm text-green-600">ZMW {product.revenue.toLocaleString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(product.status)} capitalize`}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getTrendingIcon(product.trending)}
                          <span className="text-sm capitalize text-slate-600">{product.trending}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                View Orders
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600 mb-4">
              No products match your current filters. Try adjusting your search criteria.
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedStatus('All Status');
                setSearchQuery('');
              }}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
