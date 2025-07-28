'use client';

import { useState } from 'react';
import { 
  Store, 
  Settings, 
  Upload, 
  Save, 
  RefreshCw,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
  Truck,
  CreditCard,
  Zap,
  Award,
  Calendar,
  DollarSign,
  Users,
  Package,
  Eye,
  Edit,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Palette,
  Layout,
  Bell,
  Lock,
  Key,
  Smartphone,
  Monitor,
  Tablet
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
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Store configuration data
const storeConfig = {
  basic: {
    name: 'TechHub Zambia',
    tagline: 'Innovation at Your Fingertips',
    description: 'Your premier destination for cutting-edge technology and electronics in Zambia. We provide the latest gadgets, professional equipment, and exceptional customer service to power your digital lifestyle.',
    category: 'Electronics & Technology',
    subcategory: 'Consumer Electronics',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    favicon: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop',
    establishedYear: 2018,
    businessType: 'Retail Store',
    timezone: 'Africa/Lusaka'
  },
  contact: {
    phone: '+260 977 123 456',
    whatsapp: '+260 977 123 456',
    email: 'info@techhubzm.com',
    website: 'https://techhubzm.com',
    address: {
      street: '123 Independence Avenue',
      area: 'City Centre',
      city: 'Lusaka',
      province: 'Lusaka Province',
      postalCode: '10101',
      country: 'Zambia'
    }
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
  settings: {
    storeStatus: 'online',
    orderAcceptance: 'auto',
    inventory: {
      trackStock: true,
      lowStockAlert: 5,
      showStockStatus: true,
      allowBackorders: false
    },
    payments: {
      mobileMoney: true,
      bankTransfer: true,
      cashOnDelivery: true,
      creditCard: false
    },
    shipping: {
      freeShippingThreshold: 500,
      deliveryRadius: 50,
      estimatedDelivery: '1-3 business days',
      pickupAvailable: true
    },
    notifications: {
      orderAlerts: true,
      stockAlerts: true,
      reviewAlerts: true,
      promotionAlerts: false
    },
    privacy: {
      showContact: true,
      showLocation: true,
      allowReviews: true,
      requireLogin: false
    }
  },
  verification: {
    businessLicense: { verified: true, document: 'Business_License_2024.pdf' },
    taxCertificate: { verified: true, document: 'Tax_Certificate_2024.pdf' },
    bankDetails: { verified: false, document: null },
    identityDocument: { verified: true, document: 'National_ID.pdf' }
  },
  subscription: {
    plan: 'Premium',
    status: 'active',
    expiryDate: '2024-12-31',
    features: ['Advanced Analytics', 'Priority Support', 'Custom Branding', 'API Access']
  }
};

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function StoreConfigPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = () => {
    setUnsavedChanges(false);
    // Save logic here
  };

  const handleImageUpload = (type: string) => {
    setIsUploading(true);
    // Upload logic here
    setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-indigo-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
                Store Configuration
              </h1>
              <p className="text-indigo-700 font-medium">Manage your store settings, business information, and preferences</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            {unsavedChanges && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-orange-700">
                  You have unsaved changes
                </AlertDescription>
              </Alert>
            )}
            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Store Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Store Status</p>
                  <p className="text-2xl font-bold text-emerald-800">Online</p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-bold text-emerald-700">Accepting Orders</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Store className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Verification</p>
                  <p className="text-2xl font-bold text-blue-800">Verified</p>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-bold text-blue-700">Business Verified</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Subscription</p>
                  <p className="text-2xl font-bold text-purple-800">Premium</p>
                  <div className="flex items-center mt-2">
                    <Award className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-bold text-purple-700">All Features</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Profile Score</p>
                  <p className="text-2xl font-bold text-orange-800">95%</p>
                  <div className="flex items-center mt-2">
                    <Progress value={95} className="w-16 h-2 mr-2" />
                    <span className="text-sm font-bold text-orange-700">Excellent</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/60 backdrop-blur-sm border border-indigo-100 p-2 rounded-xl">
            <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Contact
            </TabsTrigger>
            <TabsTrigger value="hours" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Hours
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Operations
            </TabsTrigger>
            <TabsTrigger value="verification" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Verification
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
              Subscription
            </TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="h-5 w-5 mr-2 text-indigo-600" />
                    Store Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Store Name</Label>
                    <Input defaultValue={storeConfig.basic.name} className="mt-2" />
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Input defaultValue={storeConfig.basic.tagline} className="mt-2" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea defaultValue={storeConfig.basic.description} rows={4} className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Business Category</Label>
                      <Select defaultValue={storeConfig.basic.category}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics & Technology">Electronics & Technology</SelectItem>
                          <SelectItem value="Fashion & Apparel">Fashion & Apparel</SelectItem>
                          <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                          <SelectItem value="Health & Beauty">Health & Beauty</SelectItem>
                          <SelectItem value="Sports & Fitness">Sports & Fitness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Business Type</Label>
                      <Select defaultValue={storeConfig.basic.businessType}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Retail Store">Retail Store</SelectItem>
                          <SelectItem value="Wholesale Business">Wholesale Business</SelectItem>
                          <SelectItem value="Service Provider">Service Provider</SelectItem>
                          <SelectItem value="Marketplace Seller">Marketplace Seller</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Established Year</Label>
                      <Input type="number" defaultValue={storeConfig.basic.establishedYear} className="mt-2" />
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <Select defaultValue={storeConfig.basic.timezone}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Lusaka">Africa/Lusaka (CAT)</SelectItem>
                          <SelectItem value="Africa/Harare">Africa/Harare (CAT)</SelectItem>
                          <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Store Branding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Store Logo</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={storeConfig.basic.logo} />
                        <AvatarFallback>TH</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Button 
                          variant="outline" 
                          onClick={() => handleImageUpload('logo')}
                          disabled={isUploading}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {isUploading ? 'Uploading...' : 'Upload Logo'}
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 200x200px, max 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Store Banner</Label>
                    <div className="mt-2">
                      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={storeConfig.basic.banner} 
                          alt="Store Banner"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => handleImageUpload('banner')}
                        disabled={isUploading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload Banner'}
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 1200x400px, max 5MB
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label>Favicon</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={storeConfig.basic.favicon} 
                          alt="Favicon"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleImageUpload('favicon')}
                          disabled={isUploading}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">
                          32x32px, .ico or .png
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Information Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-indigo-600" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Phone Number</Label>
                      <Input defaultValue={storeConfig.contact.phone} className="mt-2" />
                    </div>
                    <div>
                      <Label>WhatsApp</Label>
                      <Input defaultValue={storeConfig.contact.whatsapp} className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" defaultValue={storeConfig.contact.email} className="mt-2" />
                  </div>
                  <div>
                    <Label>Website URL</Label>
                    <Input defaultValue={storeConfig.contact.website} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                    Business Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Street Address</Label>
                    <Input defaultValue={storeConfig.contact.address.street} className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Area/Suburb</Label>
                      <Input defaultValue={storeConfig.contact.address.area} className="mt-2" />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input defaultValue={storeConfig.contact.address.city} className="mt-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Province</Label>
                      <Select defaultValue={storeConfig.contact.address.province}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lusaka Province">Lusaka Province</SelectItem>
                          <SelectItem value="Copperbelt Province">Copperbelt Province</SelectItem>
                          <SelectItem value="Southern Province">Southern Province</SelectItem>
                          <SelectItem value="Central Province">Central Province</SelectItem>
                          <SelectItem value="Eastern Province">Eastern Province</SelectItem>
                          <SelectItem value="Northern Province">Northern Province</SelectItem>
                          <SelectItem value="Western Province">Western Province</SelectItem>
                          <SelectItem value="Northwestern Province">Northwestern Province</SelectItem>
                          <SelectItem value="Muchinga Province">Muchinga Province</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Postal Code</Label>
                      <Input defaultValue={storeConfig.contact.address.postalCode} className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Input defaultValue={storeConfig.contact.address.country} disabled className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                    Social Media Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label className="flex items-center">
                        <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                        Instagram
                      </Label>
                      <Input defaultValue={storeConfig.social.instagram} className="mt-2" />
                    </div>
                    <div>
                      <Label className="flex items-center">
                        <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                        Facebook
                      </Label>
                      <Input defaultValue={storeConfig.social.facebook} className="mt-2" />
                    </div>
                    <div>
                      <Label className="flex items-center">
                        <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                        Twitter
                      </Label>
                      <Input defaultValue={storeConfig.social.twitter} className="mt-2" />
                    </div>
                    <div>
                      <Label className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                        LinkedIn
                      </Label>
                      <Input defaultValue={storeConfig.social.linkedin} className="mt-2" />
                    </div>
                    <div>
                      <Label className="flex items-center">
                        <Youtube className="h-4 w-4 mr-2 text-red-500" />
                        YouTube
                      </Label>
                      <Input defaultValue={storeConfig.social.youtube} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Business Hours Tab */}
          <TabsContent value="hours" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {days.map((day, index) => (
                    <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Switch defaultChecked={storeConfig.businessHours[day as keyof typeof storeConfig.businessHours].isOpen} />
                        <span className="font-medium w-20">{dayLabels[index]}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Open:</Label>
                          <Input 
                            type="time" 
                            defaultValue={storeConfig.businessHours[day as keyof typeof storeConfig.businessHours].open}
                            className="w-32"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Close:</Label>
                          <Input 
                            type="time" 
                            defaultValue={storeConfig.businessHours[day as keyof typeof storeConfig.businessHours].close}
                            className="w-32"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Quick Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      Copy Mon-Fri to All
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      Set Weekend Hours
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-indigo-600" />
                    Inventory Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Track Stock Levels</Label>
                      <p className="text-sm text-gray-500">Monitor product inventory automatically</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.inventory.trackStock} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Stock Status</Label>
                      <p className="text-sm text-gray-500">Display stock availability to customers</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.inventory.showStockStatus} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Backorders</Label>
                      <p className="text-sm text-gray-500">Accept orders when out of stock</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.inventory.allowBackorders} />
                  </div>
                  <div>
                    <Label>Low Stock Alert Threshold</Label>
                    <Input 
                      type="number" 
                      defaultValue={storeConfig.settings.inventory.lowStockAlert} 
                      className="mt-2" 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-indigo-600" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <div>
                        <Label>Mobile Money</Label>
                        <p className="text-sm text-gray-500">MTN, Airtel, Zamtel</p>
                      </div>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.payments.mobileMoney} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <Label>Bank Transfer</Label>
                        <p className="text-sm text-gray-500">Direct bank payments</p>
                      </div>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.payments.bankTransfer} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <Label>Cash on Delivery</Label>
                        <p className="text-sm text-gray-500">Pay upon delivery</p>
                      </div>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.payments.cashOnDelivery} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                      <div>
                        <Label>Credit Cards</Label>
                        <p className="text-sm text-gray-500">Visa, Mastercard</p>
                      </div>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.payments.creditCard} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-indigo-600" />
                    Shipping & Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Free Shipping Threshold (ZMW)</Label>
                    <Input 
                      type="number" 
                      defaultValue={storeConfig.settings.shipping.freeShippingThreshold} 
                      className="mt-2" 
                    />
                  </div>
                  <div>
                    <Label>Delivery Radius (km)</Label>
                    <Input 
                      type="number" 
                      defaultValue={storeConfig.settings.shipping.deliveryRadius} 
                      className="mt-2" 
                    />
                  </div>
                  <div>
                    <Label>Estimated Delivery Time</Label>
                    <Input 
                      defaultValue={storeConfig.settings.shipping.estimatedDelivery} 
                      className="mt-2" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Pickup Available</Label>
                      <p className="text-sm text-gray-500">Allow customers to pickup orders</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.shipping.pickupAvailable} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-indigo-600" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Alerts</Label>
                      <p className="text-sm text-gray-500">New order notifications</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.notifications.orderAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Stock Alerts</Label>
                      <p className="text-sm text-gray-500">Low stock notifications</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.notifications.stockAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Review Alerts</Label>
                      <p className="text-sm text-gray-500">New review notifications</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.notifications.reviewAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Promotion Alerts</Label>
                      <p className="text-sm text-gray-500">Marketing notifications</p>
                    </div>
                    <Switch defaultChecked={storeConfig.settings.notifications.promotionAlerts} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-indigo-600" />
                  Business Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Business License</h4>
                        <p className="text-sm text-gray-500">Valid business registration</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Tax Certificate</h4>
                        <p className="text-sm text-gray-500">TPIN registration certificate</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <h4 className="font-medium">Bank Details</h4>
                        <p className="text-sm text-gray-500">Banking information verification</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Identity Document</h4>
                        <p className="text-sm text-gray-500">National ID or passport</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-indigo-600" />
                  Subscription Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Premium Plan</h3>
                      <p className="text-gray-600">Full access to all features</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2">
                      <Award className="h-4 w-4 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Expires: December 31, 2024</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Included Features</h4>
                  {storeConfig.subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                  <p className="text-blue-700 text-sm mb-3">
                    Contact our support team for assistance with your subscription or to upgrade your plan.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Contact Support
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
