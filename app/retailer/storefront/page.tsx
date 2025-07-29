'use client';

import { useState } from 'react';
import { 
  Store, 
  Eye, 
  Edit, 
  Palette, 
  Layout, 
  Image as ImageIcon, 
  Settings, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  Star,
  Heart,
  Share2,
  ShoppingBag,
  Plus,
  Save,
  Undo,
  Redo,
  ExternalLink,
  Copy,
  QrCode,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Search,
  Filter,
  SortDesc,
  Grid,
  List,
  Zap,
  Shield,
  Award,
  Truck,
  RefreshCw,
  BarChart3
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
import { Slider } from '@/components/ui/slider';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Enhanced store data with comprehensive features
const storeData = {
  name: 'TechHub Zambia',
  tagline: 'Innovation at Your Fingertips',
  description: 'Your premier destination for cutting-edge technology and electronics in Zambia. We provide the latest gadgets, professional equipment, and exceptional customer service to power your digital lifestyle.',
  logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
  favicon: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop',
  rating: 4.8,
  reviews: 2847,
  followers: 12470,
  products: 1560,
  completedOrders: 8940,
  responseTime: '< 2 hours',
  isVerified: true,
  isOnline: true,
  isPremium: true,
  establishedYear: 2018,
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#F59E0B',
    backgroundColor: '#F8FAFC',
    textColor: '#1F2937',
    fontFamily: 'Inter',
    layout: 'modern',
    borderRadius: 'rounded',
    shadow: 'soft'
  },
  contact: {
    phone: '+260 977 123 456',
    whatsapp: '+260 977 123 456',
    email: 'info@techhubzm.com',
    address: '123 Independence Avenue, City Centre, Lusaka 10101, Zambia',
    website: 'https://techhubzm.com',
    timezone: 'CAT (GMT+2)'
  },
  social: {
    instagram: '@techhubzambia',
    facebook: 'TechHubZambia',
    twitter: '@techhubzm',
    linkedin: 'techhub-zambia',
    youtube: 'TechHubZambia'
  },
  businessHours: {
    monday: { open: '08:00', close: '18:00', isOpen: true },
    tuesday: { open: '08:00', close: '18:00', isOpen: true },
    wednesday: { open: '08:00', close: '18:00', isOpen: true },
    thursday: { open: '08:00', close: '18:00', isOpen: true },
    friday: { open: '08:00', close: '18:00', isOpen: true },
    saturday: { open: '09:00', close: '17:00', isOpen: true },
    sunday: { open: '10:00', close: '16:00', isOpen: true }
  },
  features: {
    onlineOrdering: true,
    deliveryService: true,
    installationService: true,
    warrantySupport: true,
    technicalSupport: true,
    bulkOrders: true,
    corporateAccounts: true,
    layawayProgram: true,
    tradeIn: true,
    giftCards: true
  },
  certifications: [
    { name: 'Zambia Business License', verified: true },
    { name: 'Electronics Retailer Certification', verified: true },
    { name: 'ISO 9001 Quality Management', verified: true }
  ],
  achievements: [
    { title: 'Top Electronics Retailer 2023', icon: Award },
    { title: 'Customer Choice Award', icon: Star },
    { title: 'Fast Delivery Excellence', icon: Truck }
  ]
};

const featuredProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 8999.99,
    originalPrice: 9999.99,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 234,
    sales: 189,
    category: 'Smartphones',
    inStock: true,
    discount: 10,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    price: 15999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 156,
    sales: 67,
    category: 'Laptops',
    inStock: true,
    isNew: true
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 2499.99,
    originalPrice: 2799.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 445,
    sales: 234,
    category: 'Audio',
    inStock: true,
    discount: 11,
    isFeatured: true
  },
  {
    id: 4,
    name: 'Samsung 65" QLED TV',
    price: 12999.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 89,
    sales: 34,
    category: 'TVs',
    inStock: false
  }
];

const storeMetrics = {
  visitors: 45678,
  pageViews: 125340,
  conversionRate: 4.8,
  averageSession: '5:42',
  bounceRate: 28.5,
  topTrafficSource: 'Search Engine',
  mobileTraffic: 68.5,
  returningVisitors: 42.3,
  cartAbandonmentRate: 15.2
};

const productCategories = [
  { name: 'Smartphones', count: 145, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=150&h=150&fit=crop' },
  { name: 'Laptops', count: 89, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop' },
  { name: 'Audio', count: 234, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop' },
  { name: 'Gaming', count: 78, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=150&h=150&fit=crop' },
  { name: 'Smart Home', count: 156, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop' },
  { name: 'Accessories', count: 345, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop' }
];

export default function RetailerStorefrontPage() {
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('header');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getDeviceClass = (device: string) => {
    switch (device) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-3xl mx-auto';
      default: return 'w-full max-w-6xl mx-auto';
    }
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/30 min-h-screen">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-indigo-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
                Storefront Manager
              </h1>
              <p className="text-indigo-700 font-medium">Design and manage your professional online presence</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Copy className="h-4 w-4 mr-2" />
              Share Link
            </Button>
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live
            </Button>
            <Button 
              size="sm" 
              onClick={() => setEditMode(!editMode)}
              className={editMode ? 
                'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg' :
                'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg'
              }
            >
              {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {editMode ? 'Save Changes' : 'Edit Store'}
            </Button>
          </div>
        </div>

        {/* Store Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Store Visitors</p>
                  <p className="text-3xl font-bold text-emerald-800">{storeMetrics.visitors.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-sm font-bold text-emerald-700">+23% this week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Conversion Rate</p>
                  <p className="text-3xl font-bold text-blue-800">{storeMetrics.conversionRate}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-bold text-blue-700">Above average</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Active Products</p>
                  <p className="text-3xl font-bold text-purple-800">{storeData.products.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <Package className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-bold text-purple-700">6 categories</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Store Rating</p>
                  <p className="text-3xl font-bold text-orange-800">{storeData.rating}/5.0</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-orange-600 mr-1" />
                    <span className="text-sm font-bold text-orange-700">{storeData.reviews} reviews</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm border border-indigo-100 p-2 rounded-xl">
            <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Store Preview
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Design System
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Store Content
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Product Display
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Store Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Enhanced Controls */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="h-5 w-5 mr-2 text-indigo-600" />
                    Preview Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Device Preview</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {['desktop', 'tablet', 'mobile'].map((device) => (
                        <Button
                          key={device}
                          variant={selectedDevice === device ? 'default' : 'outline'}
                          className={`w-full justify-start ${
                            selectedDevice === device 
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' 
                              : 'border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                          }`}
                          onClick={() => setSelectedDevice(device)}
                        >
                          {getDeviceIcon(device)}
                          <span className="ml-2 capitalize">{device}</span>
                          {device === 'mobile' && (
                            <Badge className="ml-auto bg-green-100 text-green-700">
                              {storeMetrics.mobileTraffic}%
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-sm font-medium">Quick Customization</Label>
                    <Button variant="outline" className="w-full justify-start border-indigo-200 hover:bg-indigo-50">
                      <Palette className="h-4 w-4 mr-2 text-indigo-600" />
                      Change Colors
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-indigo-200 hover:bg-indigo-50">
                      <Layout className="h-4 w-4 mr-2 text-indigo-600" />
                      Layout Options
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-indigo-200 hover:bg-indigo-50">
                      <ImageIcon className="h-4 w-4 mr-2 text-indigo-600" />
                      Upload Images
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-indigo-200 hover:bg-indigo-50">
                      <Settings className="h-4 w-4 mr-2 text-indigo-600" />
                      Store Settings
                    </Button>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-sm font-medium">Store Status</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Store Online</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm font-medium text-green-600">Live</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">SEO Score</span>
                        <div className="flex items-center">
                          <Progress value={88} className="w-16 h-2 mr-2" />
                          <span className="text-sm font-medium">88%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Mobile Optimized</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Store Preview */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-2xl overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className={`bg-white transition-all duration-300 ${getDeviceClass(selectedDevice)}`}>
                      {/* Professional Store Header */}
                      <div className="relative">
                        <div className="h-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 overflow-hidden">
                          <img 
                            src={storeData.banner} 
                            alt="Store Banner"
                            className="w-full h-full object-cover opacity-70"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                        </div>
                        
                        {/* Store Profile Section */}
                        <div className="absolute -bottom-16 left-8 right-8">
                          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                                  <AvatarImage src={storeData.logo} />
                                  <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xl font-bold">
                                    TH
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h1 className="text-2xl font-bold text-gray-900">{storeData.name}</h1>
                                    {storeData.isVerified && (
                                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Verified
                                      </Badge>
                                    )}
                                    {storeData.isPremium && (
                                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                        <Award className="h-3 w-3 mr-1" />
                                        Premium
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-gray-600 font-medium">{storeData.tagline}</p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center">
                                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                      <span className="text-sm font-medium">{storeData.rating}</span>
                                      <span className="text-sm text-gray-500 ml-1">({storeData.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <Package className="h-4 w-4 mr-1" />
                                      {storeData.products} products
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Est. {storeData.establishedYear}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline" className="border-gray-200">
                                  <Heart className="h-4 w-4 mr-1" />
                                  Follow
                                </Button>
                                <Button size="sm" variant="outline" className="border-gray-200">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Store Navigation */}
                      <div className="mt-20 border-b border-gray-200 bg-gray-50/50">
                        <div className="px-8 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-6">
                              <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none">
                                Products
                              </Button>
                              <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 rounded-none">
                                About
                              </Button>
                              <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 rounded-none">
                                Reviews
                              </Button>
                              <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 rounded-none">
                                Services
                              </Button>
                              <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 rounded-none">
                                Contact
                              </Button>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="Search products..." 
                                  className="pl-10 w-64"
                                />
                              </div>
                              <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Store Content */}
                      <div className="p-8 space-y-8">
                        {/* Trust Indicators */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-xl">
                            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-green-700">Secure Payments</p>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-blue-700">Fast Delivery</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-xl">
                            <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-purple-700">Easy Returns</p>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-xl">
                            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-orange-700">24/7 Support</p>
                          </div>
                        </div>

                        {/* Featured Products Section */}
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Grid className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <List className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <SortDesc className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                                <div className="relative">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  {product.discount && (
                                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                      -{product.discount}%
                                    </Badge>
                                  )}
                                  {product.isNew && (
                                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                                      New
                                    </Badge>
                                  )}
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                                      <Eye className="h-4 w-4 mr-2" />
                                      Quick View
                                    </Button>
                                  </div>
                                </div>
                                <CardContent className="p-4">
                                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-lg font-bold text-indigo-600">
                                        K{product.price.toLocaleString()}
                                      </span>
                                      {product.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                          K{product.originalPrice.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center">
                                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                      <span className="text-sm text-gray-600">{product.rating}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-gray-500">{product.sales} sold</span>
                                    <Badge className={product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </Badge>
                                  </div>
                                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" disabled={!product.inStock}>
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* Categories Section */}
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {productCategories.map((category, index) => (
                              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                <CardContent className="p-4 text-center">
                                  <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="w-16 h-16 object-cover rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                                  />
                                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                    {category.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">{category.count} items</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Professional Store Footer */}
                      <div className="bg-gray-900 text-white">
                        <div className="px-8 py-12">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                              <div className="space-y-3 text-gray-300">
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 mr-3 text-indigo-400" />
                                  {storeData.contact.phone}
                                </div>
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-3 text-indigo-400" />
                                  {storeData.contact.email}
                                </div>
                                <div className="flex items-start">
                                  <MapPin className="h-4 w-4 mr-3 text-indigo-400 mt-1 flex-shrink-0" />
                                  <span>{storeData.contact.address}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                              <div className="space-y-2 text-gray-300">
                                <p className="hover:text-white cursor-pointer">About Us</p>
                                <p className="hover:text-white cursor-pointer">Privacy Policy</p>
                                <p className="hover:text-white cursor-pointer">Terms of Service</p>
                                <p className="hover:text-white cursor-pointer">Shipping Info</p>
                                <p className="hover:text-white cursor-pointer">Returns</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                              <div className="flex space-x-3">
                                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400">
                                  <Instagram className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400">
                                  <Facebook className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400">
                                  <Twitter className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400">
                                  <Linkedin className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-bold text-lg mb-4">Business Hours</h3>
                              <div className="space-y-2 text-gray-300 text-sm">
                                <div className="flex justify-between">
                                  <span>Monday - Friday</span>
                                  <span>8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Saturday</span>
                                  <span>9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Sunday</span>
                                  <span>10:00 AM - 4:00 PM</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-700 mt-8 pt-8 flex items-center justify-between">
                            <p className="text-gray-400 text-sm">
                              © 2024 {storeData.name}. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4">
                              {storeData.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center text-gray-400 text-sm">
                                  <achievement.icon className="h-4 w-4 mr-1" />
                                  {achievement.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Design System Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-indigo-600" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Primary Brand Color</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl shadow-lg"></div>
                      <div className="flex-1">
                        <Input value="#3B82F6" />
                        <p className="text-xs text-gray-500 mt-1">Used for buttons, links, and primary elements</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Secondary Color</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl shadow-lg"></div>
                      <div className="flex-1">
                        <Input value="#8B5CF6" />
                        <p className="text-xs text-gray-500 mt-1">Used for accents and secondary elements</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Accent Color</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="w-12 h-12 bg-amber-500 rounded-xl shadow-lg"></div>
                      <div className="flex-1">
                        <Input value="#F59E0B" />
                        <p className="text-xs text-gray-500 mt-1">Used for highlights and calls-to-action</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Preview Primary
                    </Button>
                    <Button variant="outline" className="border-purple-200 text-purple-600">
                      Preview Secondary
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layout className="h-5 w-5 mr-2 text-indigo-600" />
                    Layout & Typography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Font Family</Label>
                    <Select value="inter">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter (Recommended)</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Layout Style</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="border-2 border-indigo-600 rounded-xl p-4 cursor-pointer bg-indigo-50">
                        <div className="text-center">
                          <Layout className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                          <p className="text-sm font-medium">Modern</p>
                          <p className="text-xs text-gray-500">Clean & contemporary</p>
                        </div>
                      </div>
                      <div className="border rounded-xl p-4 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                        <div className="text-center">
                          <Layout className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Classic</p>
                          <p className="text-xs text-gray-500">Traditional & elegant</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <Label>Rounded Corners</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Drop Shadows</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Animations</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Store Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="h-5 w-5 mr-2 text-indigo-600" />
                    Store Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Store Name</Label>
                    <Input value={storeData.name} className="mt-2" />
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Input value={storeData.tagline} className="mt-2" />
                  </div>
                  <div>
                    <Label>Store Description</Label>
                    <Textarea value={storeData.description} rows={4} className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Contact Phone</Label>
                      <Input value={storeData.contact.phone} className="mt-2" />
                    </div>
                    <div>
                      <Label>WhatsApp</Label>
                      <Input value={storeData.contact.whatsapp} className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input value={storeData.contact.email} className="mt-2" />
                  </div>
                  <div>
                    <Label>Physical Address</Label>
                    <Textarea value={storeData.contact.address} rows={2} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                    Social Media & Online Presence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Website URL</Label>
                    <Input value={storeData.contact.website} className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Instagram</Label>
                      <Input value={storeData.social.instagram} className="mt-2" />
                    </div>
                    <div>
                      <Label>Facebook</Label>
                      <Input value={storeData.social.facebook} className="mt-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Twitter</Label>
                      <Input value={storeData.social.twitter} className="mt-2" />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input value={storeData.social.linkedin} className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label>YouTube Channel</Label>
                    <Input value={storeData.social.youtube} className="mt-2" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label className="text-sm font-medium">Social Media Integration</Label>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Show on Store</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-sync Posts</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Product Display Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-indigo-600" />
                    Product Display Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Products per Row</Label>
                    <Select value="4">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Products</SelectItem>
                        <SelectItem value="3">3 Products</SelectItem>
                        <SelectItem value="4">4 Products</SelectItem>
                        <SelectItem value="5">5 Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Default Sort Order</Label>
                    <Select value="featured">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured First</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <Label>Show Product Reviews</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show Stock Status</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show Sale Badges</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable Quick View</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-indigo-600" />
                      Featured Products Management
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Featured
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredProducts.map((product) => (
                      <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="font-medium text-indigo-600">K{product.price.toLocaleString()}</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-600">{product.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">{product.sales} sold</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {product.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-700">Featured</Badge>
                          )}
                          {product.isNew && (
                            <Badge className="bg-green-100 text-green-700">New</Badge>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Store Visitors</p>
                      <p className="text-3xl font-bold text-blue-800">{storeMetrics.visitors.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-bold text-blue-700">+23% this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">Page Views</p>
                      <p className="text-3xl font-bold text-emerald-800">{storeMetrics.pageViews.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-sm font-bold text-emerald-700">+18% increase</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Conversion Rate</p>
                      <p className="text-3xl font-bold text-purple-800">{storeMetrics.conversionRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-bold text-purple-700">Above average</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Avg Session</p>
                      <p className="text-3xl font-bold text-orange-800">{storeMetrics.averageSession}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm font-bold text-orange-700">Excellent engagement</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Search Engine</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">42%</p>
                        <Progress value={42} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Social Media</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">28%</p>
                        <Progress value={28} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">Direct Traffic</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">18%</p>
                        <Progress value={18} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">Email Marketing</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">12%</p>
                        <Progress value={12} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Store Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mobile Traffic</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">{storeMetrics.mobileTraffic}%</span>
                        <Progress value={storeMetrics.mobileTraffic} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Returning Visitors</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">{storeMetrics.returningVisitors}%</span>
                        <Progress value={storeMetrics.returningVisitors} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Bounce Rate</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">{storeMetrics.bounceRate}%</span>
                        <Progress value={100 - storeMetrics.bounceRate} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cart Abandonment</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">{storeMetrics.cartAbandonmentRate}%</span>
                        <Progress value={100 - storeMetrics.cartAbandonmentRate} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RetailerDashboardLayout>
  );
}
