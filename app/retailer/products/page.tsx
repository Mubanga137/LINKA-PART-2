'use client';

import { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Trash2, 
  Copy, 
  Star, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  Grid,
  List,
  SortDesc,
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  Tag,
  Image as ImageIcon,
  FileText,
  Settings,
  Zap,
  Award,
  Heart,
  Share2,
  Bookmark,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  RefreshCw,
  Archive,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock products data
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    sku: 'IPH15PM256',
    category: 'Smartphones',
    subcategory: 'Premium Phones',
    price: 8999.99,
    originalPrice: 9999.99,
    costPrice: 7500.00,
    stock: 15,
    minStock: 5,
    maxStock: 50,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=150&h=150&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
    ],
    status: 'active',
    visibility: 'published',
    featured: true,
    rating: 4.8,
    reviews: 234,
    totalSales: 89,
    revenue: 800799.11,
    profit: 133499.11,
    profitMargin: 16.65,
    views: 2547,
    conversions: 89,
    conversionRate: 3.49,
    weight: 0.221,
    dimensions: '15.9 x 7.7 x 0.83 cm',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    warranty: '1 Year International Warranty',
    description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and pro camera system.',
    tags: ['smartphone', 'apple', 'premium', 'flagship', '5g'],
    attributes: {
      color: 'Natural Titanium',
      storage: '256GB',
      condition: 'New',
      connectivity: '5G'
    },
    seo: {
      title: 'iPhone 15 Pro Max 256GB - Premium Smartphone | TechHub Zambia',
      description: 'Buy iPhone 15 Pro Max 256GB with titanium design and A17 Pro chip. Best prices in Zambia with warranty.',
      keywords: 'iPhone 15 Pro Max, Apple smartphone, 256GB, Zambia'
    },
    shipping: {
      weight: 0.5,
      length: 20,
      width: 15,
      height: 5,
      freeShipping: true,
      shippingClass: 'electronics'
    },
    dateAdded: '2024-01-15',
    lastModified: '2024-01-20',
    isNew: true,
    onSale: true,
    stockStatus: 'in_stock'
  },
  {
    id: 2,
    name: 'MacBook Pro M3 14-inch',
    sku: 'MBP14M3',
    category: 'Laptops',
    subcategory: 'Professional Laptops',
    price: 15999.99,
    originalPrice: null,
    costPrice: 13500.00,
    stock: 8,
    minStock: 3,
    maxStock: 25,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
    ],
    status: 'active',
    visibility: 'published',
    featured: true,
    rating: 4.9,
    reviews: 156,
    totalSales: 34,
    revenue: 543999.66,
    profit: 84999.66,
    profitMargin: 15.63,
    views: 1890,
    conversions: 34,
    conversionRate: 1.80,
    weight: 1.6,
    dimensions: '31.26 x 22.12 x 1.55 cm',
    brand: 'Apple',
    model: 'MacBook Pro M3',
    warranty: '1 Year Apple Warranty',
    description: 'Revolutionary MacBook Pro with M3 chip, stunning Liquid Retina XDR display, and all-day battery life.',
    tags: ['laptop', 'apple', 'macbook', 'professional', 'm3'],
    attributes: {
      processor: 'Apple M3',
      ram: '8GB',
      storage: '512GB SSD',
      display: '14-inch Liquid Retina XDR'
    },
    seo: {
      title: 'MacBook Pro M3 14-inch - Professional Laptop | TechHub Zambia',
      description: 'Buy MacBook Pro M3 14-inch with stunning display and powerful performance. Best prices in Zambia.',
      keywords: 'MacBook Pro M3, Apple laptop, 14-inch, professional'
    },
    shipping: {
      weight: 2.0,
      length: 35,
      width: 25,
      height: 5,
      freeShipping: true,
      shippingClass: 'electronics'
    },
    dateAdded: '2024-01-10',
    lastModified: '2024-01-18',
    isNew: true,
    onSale: false,
    stockStatus: 'low_stock'
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 Headphones',
    sku: 'SONY1000XM5',
    category: 'Audio',
    subcategory: 'Headphones',
    price: 2499.99,
    originalPrice: 2799.99,
    costPrice: 2000.00,
    stock: 0,
    minStock: 10,
    maxStock: 100,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    ],
    status: 'active',
    visibility: 'published',
    featured: false,
    rating: 4.7,
    reviews: 445,
    totalSales: 156,
    revenue: 389998.44,
    profit: 77998.44,
    profitMargin: 20.0,
    views: 3247,
    conversions: 156,
    conversionRate: 4.81,
    weight: 0.25,
    dimensions: '27.1 x 20.4 x 7.3 cm',
    brand: 'Sony',
    model: 'WH-1000XM5',
    warranty: '1 Year Sony Warranty',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.',
    tags: ['headphones', 'sony', 'wireless', 'noise-canceling', 'premium'],
    attributes: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      battery: '30 hours',
      noiseCanceling: 'Active'
    },
    seo: {
      title: 'Sony WH-1000XM5 Noise Canceling Headphones | TechHub Zambia',
      description: 'Buy Sony WH-1000XM5 wireless headphones with industry-leading noise canceling. Best audio quality in Zambia.',
      keywords: 'Sony WH-1000XM5, wireless headphones, noise canceling, Zambia'
    },
    shipping: {
      weight: 0.5,
      length: 30,
      width: 25,
      height: 10,
      freeShipping: false,
      shippingClass: 'standard'
    },
    dateAdded: '2024-01-05',
    lastModified: '2024-01-12',
    isNew: false,
    onSale: true,
    stockStatus: 'out_of_stock'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    sku: 'SGS24U',
    category: 'Smartphones',
    subcategory: 'Android Phones',
    price: 7999.99,
    originalPrice: null,
    costPrice: 6800.00,
    stock: 25,
    minStock: 8,
    maxStock: 60,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
    ],
    status: 'draft',
    visibility: 'hidden',
    featured: false,
    rating: 4.6,
    reviews: 89,
    totalSales: 45,
    revenue: 359999.55,
    profit: 53999.55,
    profitMargin: 15.0,
    views: 1456,
    conversions: 45,
    conversionRate: 3.09,
    weight: 0.232,
    dimensions: '16.2 x 7.9 x 0.86 cm',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    warranty: '1 Year Samsung Warranty',
    description: 'The ultimate Galaxy S24 Ultra with S Pen, advanced AI features, and pro-grade camera system.',
    tags: ['smartphone', 'samsung', 'android', 's-pen', 'flagship'],
    attributes: {
      color: 'Titanium Black',
      storage: '256GB',
      ram: '12GB',
      display: '6.8-inch Dynamic AMOLED'
    },
    seo: {
      title: 'Samsung Galaxy S24 Ultra - Premium Android Phone | TechHub Zambia',
      description: 'Buy Samsung Galaxy S24 Ultra with S Pen and AI features. Premium Android experience in Zambia.',
      keywords: 'Samsung Galaxy S24 Ultra, Android phone, S Pen, Zambia'
    },
    shipping: {
      weight: 0.5,
      length: 20,
      width: 15,
      height: 5,
      freeShipping: true,
      shippingClass: 'electronics'
    },
    dateAdded: '2024-01-20',
    lastModified: '2024-01-22',
    isNew: true,
    onSale: false,
    stockStatus: 'in_stock'
  }
];

const categories = [
  { name: 'All Products', count: products.length },
  { name: 'Smartphones', count: 2 },
  { name: 'Laptops', count: 1 },
  { name: 'Audio', count: 1 },
  { name: 'Accessories', count: 0 }
];

const productMetrics = {
  totalProducts: products.length,
  activeProducts: products.filter(p => p.status === 'active').length,
  lowStockProducts: products.filter(p => p.stock <= p.minStock).length,
  outOfStockProducts: products.filter(p => p.stock === 0).length,
  totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
  totalProfit: products.reduce((sum, p) => sum + p.profit, 0),
  averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length,
  totalViews: products.reduce((sum, p) => sum + p.views, 0),
  averageConversionRate: products.reduce((sum, p) => sum + p.conversionRate, 0) / products.length
};

export default function RetailerProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && product.status === 'active') ||
                         (filterStatus === 'draft' && product.status === 'draft') ||
                         (filterStatus === 'low_stock' && product.stock <= product.minStock) ||
                         (filterStatus === 'out_of_stock' && product.stock === 0);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockStatusBadge = (product: any) => {
    if (product.stock === 0) {
      return <Badge className="bg-red-100 text-red-700">Out of Stock</Badge>;
    } else if (product.stock <= product.minStock) {
      return <Badge className="bg-yellow-100 text-yellow-700">Low Stock</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-700">In Stock</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>;
      case 'archived':
        return <Badge className="bg-orange-100 text-orange-700">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllProducts = () => {
    setSelectedProducts(filteredProducts.map(p => p.id));
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/30 min-h-screen">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-indigo-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-indigo-700 font-medium">Manage your inventory, pricing, and product catalog</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Product Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Total Products</p>
                  <p className="text-3xl font-bold text-emerald-800">{productMetrics.totalProducts}</p>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-sm font-bold text-emerald-700">{productMetrics.activeProducts} active</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Revenue</p>
                  <p className="text-3xl font-bold text-blue-800">K{(productMetrics.totalRevenue / 1000000).toFixed(1)}M</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-bold text-blue-700">K{(productMetrics.totalProfit / 1000000).toFixed(1)}M profit</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Stock Alerts</p>
                  <p className="text-3xl font-bold text-orange-800">{productMetrics.lowStockProducts + productMetrics.outOfStockProducts}</p>
                  <div className="flex items-center mt-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mr-1" />
                    <span className="text-sm font-bold text-orange-700">{productMetrics.outOfStockProducts} out of stock</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Avg. Rating</p>
                  <p className="text-3xl font-bold text-purple-800">{productMetrics.averageRating.toFixed(1)}/5</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-bold text-purple-700">{productMetrics.averageConversionRate.toFixed(1)}% conversion</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products, SKU, or brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="low_stock">Low Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-3">
                {selectedProducts.length > 0 && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-indigo-50 rounded-lg">
                    <span className="text-sm font-medium text-indigo-700">
                      {selectedProducts.length} selected
                    </span>
                    <Button variant="ghost" size="sm" onClick={clearSelection}>
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price">Price Low-High</SelectItem>
                    <SelectItem value="stock">Stock Level</SelectItem>
                    <SelectItem value="sales">Best Selling</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="recent">Recently Added</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <Card className="border-0 shadow-lg bg-indigo-50 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-indigo-900">
                    {selectedProducts.length} products selected
                  </span>
                  <Button variant="outline" size="sm" onClick={selectAllProducts}>
                    Select All ({filteredProducts.length})
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Bulk Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tag className="h-4 w-4 mr-2" />
                    Add Tags
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProductSelection(product.id)}
                      className="bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  <div className="absolute top-3 right-3 z-10 flex space-x-1">
                    {product.featured && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white">New</Badge>
                    )}
                    {product.onSale && (
                      <Badge className="bg-red-500 text-white">Sale</Badge>
                    )}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    </div>
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
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-600">
                        K{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          K{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Stock: {product.stock}</span>
                      {getStockStatusBadge(product)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {product.totalSales} sold
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {getStatusBadge(product.status)}
                    <div className="text-xs text-gray-500">
                      {product.conversionRate.toFixed(1)}% conv.
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4">
                        <Checkbox
                          checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                          onCheckedChange={() => 
                            selectedProducts.length === filteredProducts.length ? clearSelection() : selectAllProducts()
                          }
                        />
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">Product</th>
                      <th className="text-left p-4 font-medium text-gray-900">SKU</th>
                      <th className="text-left p-4 font-medium text-gray-900">Category</th>
                      <th className="text-left p-4 font-medium text-gray-900">Price</th>
                      <th className="text-left p-4 font-medium text-gray-900">Stock</th>
                      <th className="text-left p-4 font-medium text-gray-900">Status</th>
                      <th className="text-left p-4 font-medium text-gray-900">Performance</th>
                      <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => toggleProductSelection(product.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{product.name}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                {product.featured && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                {product.isNew && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">New</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{product.sku}</td>
                        <td className="p-4 text-sm text-gray-600">{product.category}</td>
                        <td className="p-4">
                          <div>
                            <span className="font-medium text-gray-900">K{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                K{product.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-900">{product.stock}</span>
                            {getStockStatusBadge(product)}
                          </div>
                        </td>
                        <td className="p-4">{getStatusBadge(product.status)}</td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              <span>{product.rating}</span>
                              <span className="text-gray-400 ml-1">({product.reviews})</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {product.totalSales} sales • {product.conversionRate.toFixed(1)}% conv.
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-indigo-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RetailerDashboardLayout>
  );
}
