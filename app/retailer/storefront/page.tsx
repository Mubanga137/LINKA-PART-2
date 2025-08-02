'use client';

import { useState } from 'react';
import { 
  Store, 
  Palette, 
  Image, 
  Layout, 
  Type, 
  Globe, 
  Eye, 
  Save, 
  RefreshCw, 
  Settings,
  Upload,
  Edit3,
  Monitor,
  Smartphone,
  Tablet,
  Star,
  Heart,
  ShoppingCart,
  Package,
  CheckCircle,
  AlertCircle,
  Camera,
  Video,
  Zap,
  Crown,
  Award,
  TrendingUp,
  Users,
  MessageCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Copy,
  Share,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';
import ImageShowcase from '@/components/storefront/image-showcase';

// Mock storefront data
const storefrontData = {
  name: 'TechHub Zambia',
  description: 'Your premier destination for cutting-edge technology and electronics in Zambia. We offer the latest smartphones, laptops, accessories, and smart home devices.',
  logo: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F96def3273acb488683da8d6dc1d2f677?format=webp&width=800',
  banner: 'https://cdn.builder.io/api/v1/image/assets%2F4bf015b55143432d9c1c69e328364ff3%2F1d64db8f787249e0aed5eb579a5d6ac3?format=webp&width=800',
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  },
  layout: 'modern',
  features: {
    featuredProducts: true,
    testimonials: true,
    about: true,
    contact: true,
    socialMedia: true,
    newsletter: true
  },
  contact: {
    phone: '+260 97 123-4567',
    email: 'info@techhubzambia.com',
    address: 'Plot 123, Independence Avenue, Lusaka, Zambia',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM'
  },
  social: {
    facebook: 'techhubzambia',
    instagram: 'techhubzm',
    twitter: 'techhubzambia',
    whatsapp: '+260971234567'
  },
  stats: {
    products: 147,
    customers: 2340,
    rating: 4.8,
    reviews: 432
  }
};

const themeTemplates = [
  {
    id: 'modern',
    name: 'Modern Tech',
    preview: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F82f630a64ccd4ff1a0e60a9830efdf63?alt=media&token=70f69cc6-18e2-4ab7-b4bf-7d19baa4662b&apiKey=4bf015b55143432d9c1c69e328364ff3',
    colors: { primary: '#3B82F6', secondary: '#10B981' },
    description: 'Clean, modern design perfect for tech stores'
  },
  {
    id: 'elegant',
    name: 'Elegant Fashion',
    preview: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fb159ec8d523f4c0fb9a1a9c54048ebdd?alt=media&token=bee5e29d-e6cb-42b5-bbf3-659b5bf4810b&apiKey=4bf015b55143432d9c1c69e328364ff3',
    colors: { primary: '#8B5CF6', secondary: '#EC4899' },
    description: 'Sophisticated layout for fashion and lifestyle brands'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    preview: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F6995621fafc94b559e52ca72adcfdca2?alt=media&token=fb6fa0ae-ef8c-48a5-8e77-6c28f7b67783&apiKey=4bf015b55143432d9c1c69e328364ff3',
    colors: { primary: '#1F2937', secondary: '#6B7280' },
    description: 'Minimalist design focusing on products'
  },
  {
    id: 'vibrant',
    name: 'Vibrant Market',
    preview: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fc3924f31e71d4869b42a4d0e5eacdee5?alt=media&token=db9ffa16-1109-49a9-ad6d-f9e0229b60d1&apiKey=4bf015b55143432d9c1c69e328364ff3',
    colors: { primary: '#F59E0B', secondary: '#EF4444' },
    description: 'Bold, energetic design for marketplaces'
  }
];

const sampleProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 8999,
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F884365930bf6403ab6a72ce421a20511?alt=media&token=26fb6a61-ceb9-4ab2-80ce-c593f74b4334&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.9,
    sales: 142
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    price: 15999,
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F8ab774df80c84d7ca5e74e3006583b5e?alt=media&token=5b175f4b-4db7-4955-9305-287cce3c7f3a&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.8,
    sales: 89
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 1299,
    image: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fc609a13b506a49dca1ab65303d841ae0?alt=media&token=32f5453e-184d-4972-a00d-92015dfad39b&apiKey=4bf015b55143432d9c1c69e328364ff3',
    rating: 4.7,
    sales: 234
  }
];

export default function StorefrontManager() {
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [storeData, setStoreData] = useState(storefrontData);
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSave = () => {
    setUnsavedChanges(false);
    // API call to save storefront data
  };

  const handleThemeChange = (themeId: string) => {
    const theme = themeTemplates.find(t => t.id === themeId);
    if (theme) {
      setSelectedTheme(themeId);
      setStoreData(prev => ({
        ...prev,
        theme: {
          ...prev.theme,
          primaryColor: theme.colors.primary,
          secondaryColor: theme.colors.secondary
        }
      }));
      setUnsavedChanges(true);
    }
  };

  return (
    <RetailerDashboardLayout>
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-50/50 via-white to-indigo-50/20">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/60 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Storefront Manager
              </h1>
              <p className="text-slate-600 font-medium">Design and customize your professional storefront</p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={isPreviewMode ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? 'Edit Mode' : 'Preview'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Store
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={!unsavedChanges}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Device Preview Toggle */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <Button
                variant={activeDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveDevice('desktop')}
                className="h-8"
              >
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={activeDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveDevice('tablet')}
                className="h-8"
              >
                <Tablet className="h-4 w-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={activeDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveDevice('mobile')}
                className="h-8"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>

            {unsavedChanges && (
              <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
                <AlertCircle className="h-3 w-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Left Panel - Customization */}
            {!isPreviewMode && (
              <div className="w-80 border-r border-slate-200/60 bg-white overflow-y-auto">
                <Tabs defaultValue="design" className="h-full">
                  <TabsList className="grid w-full grid-cols-5 sticky top-0 z-10 bg-white border-b border-slate-200/60">
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  </TabsList>

                  <div className="p-4 space-y-6">
                    {/* Design Tab */}
                    <TabsContent value="design" className="space-y-6 mt-0">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Palette className="h-5 w-5 mr-2 text-purple-600" />
                            Theme Templates
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            {themeTemplates.map((theme) => (
                              <div
                                key={theme.id}
                                className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all ${
                                  selectedTheme === theme.id
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                                onClick={() => handleThemeChange(theme.id)}
                              >
                                <img
                                  src={theme.preview}
                                  alt={theme.name}
                                  className="w-full h-20 object-cover rounded"
                                />
                                <p className="text-xs font-medium mt-2">{theme.name}</p>
                                {selectedTheme === theme.id && (
                                  <CheckCircle className="absolute top-1 right-1 h-4 w-4 text-indigo-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Type className="h-5 w-5 mr-2 text-blue-600" />
                            Colors & Typography
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Primary Color</Label>
                            <div className="flex items-center space-x-2 mt-2">
                              <div 
                                className="w-10 h-10 rounded border border-slate-200"
                                style={{ backgroundColor: storeData.theme.primaryColor }}
                              ></div>
                              <Input 
                                value={storeData.theme.primaryColor}
                                onChange={(e) => {
                                  setStoreData(prev => ({
                                    ...prev,
                                    theme: { ...prev.theme, primaryColor: e.target.value }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className="flex-1"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Secondary Color</Label>
                            <div className="flex items-center space-x-2 mt-2">
                              <div 
                                className="w-10 h-10 rounded border border-slate-200"
                                style={{ backgroundColor: storeData.theme.secondaryColor }}
                              ></div>
                              <Input 
                                value={storeData.theme.secondaryColor}
                                onChange={(e) => {
                                  setStoreData(prev => ({
                                    ...prev,
                                    theme: { ...prev.theme, secondaryColor: e.target.value }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Image className="h-5 w-5 mr-2 text-green-600" />
                            Media & Branding
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Store Logo</Label>
                            <div className="mt-2 flex items-center space-x-3">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={storeData.logo} />
                                <AvatarFallback>TH</AvatarFallback>
                              </Avatar>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Logo
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Banner Image</Label>
                            <div className="mt-2">
                              <img 
                                src={storeData.banner} 
                                alt="Store banner" 
                                className="w-full h-24 object-cover rounded border border-slate-200"
                              />
                              <Button variant="outline" size="sm" className="mt-2 w-full">
                                <Camera className="h-4 w-4 mr-2" />
                                Change Banner
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Content Tab */}
                    <TabsContent value="content" className="space-y-6 mt-0">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Store className="h-5 w-5 mr-2 text-indigo-600" />
                            Store Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Store Name</Label>
                            <Input 
                              value={storeData.name}
                              onChange={(e) => {
                                setStoreData(prev => ({ ...prev, name: e.target.value }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <Textarea 
                              value={storeData.description}
                              onChange={(e) => {
                                setStoreData(prev => ({ ...prev, description: e.target.value }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                              rows={4}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Phone className="h-5 w-5 mr-2 text-green-600" />
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Phone Number</Label>
                            <Input 
                              value={storeData.contact.phone}
                              onChange={(e) => {
                                setStoreData(prev => ({
                                  ...prev,
                                  contact: { ...prev.contact, phone: e.target.value }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Email Address</Label>
                            <Input 
                              value={storeData.contact.email}
                              onChange={(e) => {
                                setStoreData(prev => ({
                                  ...prev,
                                  contact: { ...prev.contact, email: e.target.value }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Address</Label>
                            <Textarea 
                              value={storeData.contact.address}
                              onChange={(e) => {
                                setStoreData(prev => ({
                                  ...prev,
                                  contact: { ...prev.contact, address: e.target.value }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Features Tab */}
                    <TabsContent value="features" className="space-y-6 mt-0">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                            Store Features
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {Object.entries(storeData.features).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <Label className="text-sm font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Switch 
                                checked={value}
                                onCheckedChange={(checked) => {
                                  setStoreData(prev => ({
                                    ...prev,
                                    features: { ...prev.features, [key]: checked }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-blue-600" />
                            Social Media
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Facebook</Label>
                            <Input 
                              value={storeData.social.facebook}
                              onChange={(e) => {
                                setStoreData(prev => ({
                                  ...prev,
                                  social: { ...prev.social, facebook: e.target.value }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                              placeholder="facebook.com/yourstore"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Instagram</Label>
                            <Input 
                              value={storeData.social.instagram}
                              onChange={(e) => {
                                setStoreData(prev => ({
                                  ...prev,
                                  social: { ...prev.social, instagram: e.target.value }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                              placeholder="@yourstorehandle"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">WhatsApp</Label>
                            <Input 
                              value={storeData.social.whatsapp}
                              onChange={(e) => {
                                setStoreData(prev => ({
                                  ...prev,
                                  social: { ...prev.social, whatsapp: e.target.value }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className="mt-2"
                              placeholder="+260971234567"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* SEO Tab */}
                    <TabsContent value="seo" className="space-y-6 mt-0">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                            SEO Optimization
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Meta Title</Label>
                            <Input 
                              placeholder="Your Store Name - Best Products in Zambia"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Meta Description</Label>
                            <Textarea 
                              placeholder="Describe your store and products for search engines..."
                              className="mt-2"
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Keywords</Label>
                            <Input 
                              placeholder="electronics, tech, gadgets, zambia"
                              className="mt-2"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Store Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-slate-900">85</p>
                              <p className="text-sm text-slate-600">SEO Score</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-slate-900">92</p>
                              <p className="text-sm text-slate-600">Performance</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Gallery Tab */}
                    <TabsContent value="gallery" className="space-y-6 mt-0">
                      <ImageShowcase />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            )}

            {/* Right Panel - Live Preview */}
            <div className="flex-1 bg-slate-100 overflow-y-auto">
              <div className="p-6">
                <div 
                  className={`mx-auto bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                    activeDevice === 'desktop' ? 'max-w-6xl' :
                    activeDevice === 'tablet' ? 'max-w-2xl' :
                    'max-w-sm'
                  }`}
                >
                  {/* Storefront Preview */}
                  <div className="relative">
                    {/* Header */}
                    <div 
                      className="relative h-64 bg-gradient-to-r"
                      style={{ 
                        background: `linear-gradient(135deg, ${storeData.theme.primaryColor}, ${storeData.theme.secondaryColor})` 
                      }}
                    >
                      <img 
                        src={storeData.banner} 
                        alt="Store banner"
                        className="w-full h-full object-cover opacity-20"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-white/30">
                            <AvatarImage src={storeData.logo} />
                            <AvatarFallback className="text-2xl">TH</AvatarFallback>
                          </Avatar>
                          <h1 className="text-3xl font-bold mb-2">{storeData.name}</h1>
                          <p className="text-lg opacity-90 max-w-2xl">{storeData.description}</p>
                          <div className="flex items-center justify-center space-x-6 mt-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold">{storeData.stats.products}</p>
                              <p className="text-sm opacity-75">Products</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold">{storeData.stats.customers}</p>
                              <p className="text-sm opacity-75">Customers</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center">
                                <Star className="h-5 w-5 fill-current mr-1" />
                                <span className="text-2xl font-bold">{storeData.stats.rating}</span>
                              </div>
                              <p className="text-sm opacity-75">{storeData.stats.reviews} Reviews</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="bg-white border-b border-slate-200 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-6">
                          <a href="#" className="text-slate-700 hover:text-slate-900 font-medium">Home</a>
                          <a href="#" className="text-slate-700 hover:text-slate-900 font-medium">Products</a>
                          <a href="#" className="text-slate-700 hover:text-slate-900 font-medium">About</a>
                          <a href="#" className="text-slate-700 hover:text-slate-900 font-medium">Contact</a>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Featured Products */}
                    {storeData.features.featuredProducts && (
                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sampleProducts.map((product) => (
                            <Card key={product.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-40 object-cover rounded mb-4"
                                />
                                <h3 className="font-semibold text-slate-900 mb-2">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold" style={{ color: storeData.theme.primaryColor }}>
                                    ZMW {product.price.toLocaleString()}
                                  </span>
                                  <div className="flex items-center text-amber-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="text-sm ml-1">{product.rating}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{product.sales} sold</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Section */}
                    {storeData.features.contact && (
                      <div className="bg-slate-50 p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Us</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Phone className="h-5 w-5 text-slate-600" />
                              <span>{storeData.contact.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Mail className="h-5 w-5 text-slate-600" />
                              <span>{storeData.contact.email}</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <MapPin className="h-5 w-5 text-slate-600 mt-1" />
                              <span>{storeData.contact.address}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Clock className="h-5 w-5 text-slate-600" />
                              <span>{storeData.contact.hours}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-3">Follow Us</h3>
                            <div className="flex space-x-3">
                              <Button variant="outline" size="sm">Facebook</Button>
                              <Button variant="outline" size="sm">Instagram</Button>
                              <Button variant="outline" size="sm">WhatsApp</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="bg-slate-900 text-white p-6">
                      <div className="text-center">
                        <p className="text-lg font-semibold mb-2">{storeData.name}</p>
                        <p className="text-slate-300 text-sm">
                          © 2024 {storeData.name}. All rights reserved. Powered by Linka.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RetailerDashboardLayout>
  );
}
