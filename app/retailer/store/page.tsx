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
  User,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Package,
  DollarSign
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
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock store data
const storeData = {
  name: 'TechHub Zambia',
  description: 'Your premier destination for quality electronics and gadgets in Zambia. We offer the latest technology products with excellent customer service.',
  logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
  rating: 4.8,
  reviews: 234,
  followers: 1247,
  products: 156,
  isVerified: true,
  isOnline: true,
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    fontFamily: 'Inter',
    layout: 'modern'
  },
  contact: {
    phone: '+260 977 123 456',
    email: 'info@techhubzm.com',
    address: '123 Independence Avenue, Lusaka, Zambia',
    website: 'https://techhubzm.com'
  },
  social: {
    instagram: '@techhubzm',
    facebook: 'TechHubZambia',
    twitter: '@techhubzm'
  },
  hours: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: '10:00 AM - 4:00 PM'
  },
  features: {
    customization: true,
    analytics: true,
    seo: true,
    mobileOptimized: true,
    socialIntegration: true,
    multiLanguage: true
  }
};

const featuredProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 259.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    rating: 4.8,
    sales: 89
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    rating: 4.6,
    sales: 67
  },
  {
    id: 3,
    name: 'Professional Camera Lens',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=200&fit=crop',
    rating: 4.9,
    sales: 34
  }
];

const storeMetrics = {
  visitors: 12534,
  pageViews: 45678,
  conversionRate: 4.2,
  averageSession: '4:32',
  bounceRate: 32.5,
  topTrafficSource: 'Social Media'
};

export default function RetailerStorePage() {
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [editMode, setEditMode] = useState(false);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
              My Online Store
            </h1>
            <p className="text-indigo-700 mt-1 font-medium">Manage your store appearance, content, and customer experience</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Eye className="h-4 w-4 mr-2" />
              Preview Store
            </Button>
            <Button 
              size="sm" 
              onClick={() => setEditMode(!editMode)}
              className={editMode ? 
                'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' :
                'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }
            >
              <Edit className="h-4 w-4 mr-2" />
              {editMode ? 'Save Changes' : 'Edit Store'}
            </Button>
          </div>
        </div>

        {/* Store Status Bar */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">Store Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-700">Verified Business</span>
                </div>
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  Premium Plan
                </Badge>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{storeMetrics.visitors.toLocaleString()}</p>
                  <p className="text-gray-600">Visitors Today</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{storeMetrics.conversionRate}%</p>
                  <p className="text-gray-600">Conversion</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">⭐ {storeData.rating}</p>
                  <p className="text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Store Preview
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Design & Layout
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Store Content
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Store Analytics
            </TabsTrigger>
          </TabsList>

          {/* Store Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Device Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="h-5 w-5 mr-2 text-indigo-600" />
                    Device Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['desktop', 'tablet', 'mobile'].map((device) => (
                      <Button
                        key={device}
                        variant={selectedDevice === device ? 'default' : 'outline'}
                        className={`w-full justify-start ${
                          selectedDevice === device 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                            : 'border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                        }`}
                        onClick={() => setSelectedDevice(device)}
                      >
                        {getDeviceIcon(device)}
                        <span className="ml-2 capitalize">{device}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-gray-900">Quick Actions</h4>
                    <Button variant="outline" className="w-full text-left justify-start border-indigo-200">
                      <Palette className="h-4 w-4 mr-2 text-indigo-600" />
                      Change Theme
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start border-indigo-200">
                      <Layout className="h-4 w-4 mr-2 text-indigo-600" />
                      Update Layout
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start border-indigo-200">
                      <ImageIcon className="h-4 w-4 mr-2 text-indigo-600" />
                      Upload Images
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Store Preview */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    {/* Store Preview Interface */}
                    <div className={`bg-white ${
                      selectedDevice === 'mobile' ? 'max-w-sm mx-auto' :
                      selectedDevice === 'tablet' ? 'max-w-2xl mx-auto' :
                      'w-full'
                    }`}>
                      {/* Store Header */}
                      <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
                        <img 
                          src={storeData.banner} 
                          alt="Store Banner"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 flex items-center space-x-4">
                          <Avatar className="h-16 w-16 ring-4 ring-white">
                            <AvatarImage src={storeData.logo} />
                            <AvatarFallback>TH</AvatarFallback>
                          </Avatar>
                          <div className="text-white">
                            <h2 className="text-2xl font-bold">{storeData.name}</h2>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-sm">{storeData.rating} ({storeData.reviews} reviews)</span>
                              </div>
                              <Badge className="bg-white/20 text-white">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Store Navigation */}
                      <div className="border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-6">
                            <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600">
                              Products
                            </Button>
                            <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
                              About
                            </Button>
                            <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
                              Reviews
                            </Button>
                            <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
                              Contact
                            </Button>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Follow
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Store Content */}
                      <div className="p-6">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">About Our Store</h3>
                          <p className="text-gray-600">{storeData.description}</p>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Products</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {featuredProducts.map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-4">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                                <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold text-indigo-600">K{product.price}</span>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="text-sm text-gray-600">{product.rating}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{product.sales} sold</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Store Footer */}
                      <div className="bg-gray-50 px-6 py-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
                            <div className="space-y-1 text-gray-600">
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-2" />
                                {storeData.contact.phone}
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-2" />
                                {storeData.contact.email}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-2" />
                                {storeData.contact.address}
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Follow Us</h4>
                            <div className="flex space-x-3">
                              <Button variant="outline" size="sm">
                                <Instagram className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Facebook className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Twitter className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Store Hours</h4>
                            <p className="text-gray-600">Mon-Fri: 8AM-6PM</p>
                            <p className="text-gray-600">Sat-Sun: 9AM-5PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Design & Layout Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Theme Customization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Primary Color</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg"></div>
                      <Input value="#3B82F6" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Secondary Color</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg"></div>
                      <Input value="#8B5CF6" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Font Family</Label>
                    <Select value="inter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Layout Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-2 border-indigo-600 rounded-lg p-3 cursor-pointer">
                      <div className="text-center">
                        <Layout className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                        <p className="text-sm font-medium">Modern</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3 cursor-pointer hover:border-indigo-300">
                      <div className="text-center">
                        <Layout className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm font-medium">Classic</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Show Store Header</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable Dark Mode</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show Social Links</Label>
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
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Store Name</Label>
                    <Input value={storeData.name} className="mt-2" />
                  </div>
                  <div>
                    <Label>Store Description</Label>
                    <Textarea value={storeData.description} rows={4} className="mt-2" />
                  </div>
                  <div>
                    <Label>Contact Phone</Label>
                    <Input value={storeData.contact.phone} className="mt-2" />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input value={storeData.contact.email} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Instagram</Label>
                    <Input value={storeData.social.instagram} className="mt-2" />
                  </div>
                  <div>
                    <Label>Facebook</Label>
                    <Input value={storeData.social.facebook} className="mt-2" />
                  </div>
                  <div>
                    <Label>Twitter</Label>
                    <Input value={storeData.social.twitter} className="mt-2" />
                  </div>
                  <div>
                    <Label>Website URL</Label>
                    <Input value={storeData.contact.website} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Store Analytics Tab */}
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
                      <TrendingUp className="h-6 w-6 text-white" />
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
          </TabsContent>
        </Tabs>
      </div>
    </RetailerDashboardLayout>
  );
}
