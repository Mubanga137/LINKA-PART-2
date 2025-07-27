'use client';

import { useState } from 'react';
import { 
  Store, 
  User, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Camera, 
  Save, 
  Shield, 
  Bell, 
  CreditCard, 
  Truck, 
  Settings, 
  Eye, 
  EyeOff, 
  Upload, 
  X, 
  Plus,
  Edit,
  Trash2,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock store data
const storeData = {
  id: 'STR-001',
  name: 'TechHub Zambia',
  description: 'Your premier destination for quality electronics and gadgets in Zambia. We offer the latest technology products with excellent customer service.',
  logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
  category: 'Electronics',
  address: {
    street: '123 Independence Avenue',
    city: 'Lusaka',
    province: 'Lusaka Province',
    country: 'Zambia',
    postalCode: '10101'
  },
  contact: {
    phone: '+260 977 123 456',
    email: 'info@techhubzm.com',
    website: 'https://techhubzm.com'
  },
  socialMedia: {
    facebook: 'https://facebook.com/techhubzm',
    instagram: 'https://instagram.com/techhubzm',
    twitter: 'https://twitter.com/techhubzm',
    linkedin: ''
  },
  businessHours: {
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '17:00', closed: false },
    sunday: { open: '10:00', close: '16:00', closed: false }
  },
  delivery: {
    zones: ['Lusaka Central', 'Chilenje', 'Woodlands', 'Avondale', 'Roma'],
    freeDeliveryThreshold: 500,
    deliveryFee: 50,
    estimatedTime: '2-5 business days'
  },
  payments: {
    mtnMoney: true,
    airtelMoney: true,
    zamtelMoney: true,
    bankTransfer: true,
    creditCard: true,
    cashOnDelivery: true
  },
  verification: {
    businessLicense: true,
    taxCertificate: true,
    identityVerified: true,
    phoneVerified: true,
    emailVerified: true
  },
  settings: {
    autoAcceptOrders: false,
    emailNotifications: true,
    smsNotifications: true,
    lowStockAlerts: true,
    orderNotifications: true,
    maintenanceMode: false,
    publicProfile: true
  }
};

const userData = {
  name: 'John Doe',
  email: 'john.doe@techhubzm.com',
  phone: '+260 977 123 456',
  role: 'Store Owner',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  joinDate: '2024-01-15',
  lastLogin: '2024-01-22T14:30:00Z',
  twoFactorEnabled: false
};

export default function StoreSettingsPage() {
  const [activeTab, setActiveTab] = useState('store');
  const [formData, setFormData] = useState(storeData);
  const [userFormData, setUserFormData] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleStoreUpdate = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedUpdate = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleBusinessHoursUpdate = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value
        }
      }
    }));
  };

  const handleSaveStore = () => {
    // In a real app, this would make an API call
    console.log('Saving store data:', formData);
    alert('Store settings saved successfully!');
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    console.log('Saving profile data:', userFormData);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    // In a real app, this would make an API call
    console.log('Changing password');
    alert('Password changed successfully!');
    setNewPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  };

  const provinces = [
    'Central Province', 'Copperbelt Province', 'Eastern Province', 'Luapula Province',
    'Lusaka Province', 'Muchinga Province', 'Northern Province', 'North-Western Province',
    'Southern Province', 'Western Province'
  ];

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports & Fitness', 'Books & Media',
    'Automotive', 'Beauty & Health', 'Food & Beverages', 'Art & Culture', 'Services'
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
            <p className="text-gray-600 mt-1">Manage your store profile, settings, and business information</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview Store
            </Button>
            <Button size="sm" onClick={handleSaveStore}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="store">Store Info</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Store Information */}
          <TabsContent value="store" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="h-5 w-5 mr-2" />
                    Store Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      value={formData.name}
                      onChange={(e) => handleStoreUpdate('name', e.target.value)}
                      placeholder="Enter store name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleStoreUpdate('category', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Store Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleStoreUpdate('description', e.target.value)}
                      placeholder="Describe your store"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.contact.website}
                      onChange={(e) => handleNestedUpdate('contact', 'website', e.target.value)}
                      placeholder="https://yourstore.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store Logo</Label>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={formData.logo} />
                        <AvatarFallback>
                          <Store className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                        <p className="text-xs text-gray-500">
                          Recommended: 200x200px, PNG or JPG
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="space-y-2">
                      <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={formData.coverImage}
                          alt="Store cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Cover Image
                      </Button>
                      <p className="text-xs text-gray-500">
                        Recommended: 800x300px, PNG or JPG
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.contact.phone}
                      onChange={(e) => handleNestedUpdate('contact', 'phone', e.target.value)}
                      placeholder="+260 XXX XXX XXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleNestedUpdate('contact', 'email', e.target.value)}
                      placeholder="store@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.socialMedia.facebook}
                      onChange={(e) => handleNestedUpdate('socialMedia', 'facebook', e.target.value)}
                      placeholder="https://facebook.com/yourstore"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.socialMedia.instagram}
                      onChange={(e) => handleNestedUpdate('socialMedia', 'instagram', e.target.value)}
                      placeholder="https://instagram.com/yourstore"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={formData.socialMedia.twitter}
                      onChange={(e) => handleNestedUpdate('socialMedia', 'twitter', e.target.value)}
                      placeholder="https://twitter.com/yourstore"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={(e) => handleNestedUpdate('socialMedia', 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/yourstore"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Store Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleNestedUpdate('address', 'street', e.target.value)}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => handleNestedUpdate('address', 'city', e.target.value)}
                      placeholder="City"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Select
                      value={formData.address.province}
                      onValueChange={(value) => handleNestedUpdate('address', 'province', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map(province => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.address.postalCode}
                      onChange={(e) => handleNestedUpdate('address', 'postalCode', e.target.value)}
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Management */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userFormData.avatar} />
                      <AvatarFallback>
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500">
                        JPG, PNG up to 2MB
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                      id="userName"
                      value={userFormData.name}
                      onChange={(e) => setUserFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email Address</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={userFormData.email}
                      onChange={(e) => setUserFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userPhone">Phone Number</Label>
                    <Input
                      id="userPhone"
                      value={userFormData.phone}
                      onChange={(e) => setUserFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+260 XXX XXX XXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={userFormData.role}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>

                    <Button onClick={handlePasswordChange}>
                      <Shield className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <Switch
                        checked={userFormData.twoFactorEnabled}
                        onCheckedChange={(checked) => setUserFormData(prev => ({ ...prev, twoFactorEnabled: checked }))}
                      />
                    </div>

                    {userFormData.twoFactorEnabled && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Two-factor authentication is enabled. You'll need your phone to sign in.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Business Hours */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {days.map((day) => {
                    const dayData = formData.businessHours[day as keyof typeof formData.businessHours];
                    return (
                      <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-20">
                            <Label className="capitalize">{day}</Label>
                          </div>
                          <Switch
                            checked={!dayData.closed}
                            onCheckedChange={(checked) => handleBusinessHoursUpdate(day, 'closed', !checked)}
                          />
                        </div>
                        {!dayData.closed && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={dayData.open}
                              onChange={(e) => handleBusinessHoursUpdate(day, 'open', e.target.value)}
                              className="w-32"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              value={dayData.close}
                              onChange={(e) => handleBusinessHoursUpdate(day, 'close', e.target.value)}
                              className="w-32"
                            />
                          </div>
                        )}
                        {dayData.closed && (
                          <Badge variant="outline" className="text-gray-500">Closed</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Business License</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Tax Certificate</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Identity Verification</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Phone Number</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Email Address</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span>Store Rating</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">Pending Review</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Settings */}
          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Delivery Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFee">Delivery Fee (ZMW)</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      value={formData.delivery.deliveryFee}
                      onChange={(e) => handleNestedUpdate('delivery', 'deliveryFee', parseInt(e.target.value))}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="freeDeliveryThreshold">Free Delivery Threshold (ZMW)</Label>
                    <Input
                      id="freeDeliveryThreshold"
                      type="number"
                      value={formData.delivery.freeDeliveryThreshold}
                      onChange={(e) => handleNestedUpdate('delivery', 'freeDeliveryThreshold', parseInt(e.target.value))}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="estimatedTime">Estimated Delivery Time</Label>
                    <Input
                      id="estimatedTime"
                      value={formData.delivery.estimatedTime}
                      onChange={(e) => handleNestedUpdate('delivery', 'estimatedTime', e.target.value)}
                      placeholder="e.g., 2-5 business days"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Zones</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.delivery.zones.map((zone, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        <span>{zone}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => {
                            const newZones = formData.delivery.zones.filter((_, i) => i !== index);
                            handleNestedUpdate('delivery', 'zones', newZones);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Zone
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold">MTN</span>
                      </div>
                      <div>
                        <p className="font-medium">MTN Money</p>
                        <p className="text-sm text-gray-500">Mobile payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.payments.mtnMoney}
                      onCheckedChange={(checked) => handleNestedUpdate('payments', 'mtnMoney', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold">ATL</span>
                      </div>
                      <div>
                        <p className="font-medium">Airtel Money</p>
                        <p className="text-sm text-gray-500">Mobile payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.payments.airtelMoney}
                      onCheckedChange={(checked) => handleNestedUpdate('payments', 'airtelMoney', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold">ZTL</span>
                      </div>
                      <div>
                        <p className="font-medium">Zamtel Money</p>
                        <p className="text-sm text-gray-500">Mobile payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.payments.zamtelMoney}
                      onCheckedChange={(checked) => handleNestedUpdate('payments', 'zamtelMoney', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Credit/Debit Cards</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.payments.creditCard}
                      onCheckedChange={(checked) => handleNestedUpdate('payments', 'creditCard', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold">BANK</span>
                      </div>
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-gray-500">Direct bank payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.payments.bankTransfer}
                      onCheckedChange={(checked) => handleNestedUpdate('payments', 'bankTransfer', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold">COD</span>
                      </div>
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay on delivery</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.payments.cashOnDelivery}
                      onCheckedChange={(checked) => handleNestedUpdate('payments', 'cashOnDelivery', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Store Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Accept Orders</Label>
                      <p className="text-sm text-gray-500">Automatically accept new orders</p>
                    </div>
                    <Switch
                      checked={formData.settings.autoAcceptOrders}
                      onCheckedChange={(checked) => handleNestedUpdate('settings', 'autoAcceptOrders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Public Profile</Label>
                      <p className="text-sm text-gray-500">Make your store visible to customers</p>
                    </div>
                    <Switch
                      checked={formData.settings.publicProfile}
                      onCheckedChange={(checked) => handleNestedUpdate('settings', 'publicProfile', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">Temporarily disable your store</p>
                    </div>
                    <Switch
                      checked={formData.settings.maintenanceMode}
                      onCheckedChange={(checked) => handleNestedUpdate('settings', 'maintenanceMode', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={formData.settings.emailNotifications}
                      onCheckedChange={(checked) => handleNestedUpdate('settings', 'emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={formData.settings.smsNotifications}
                      onCheckedChange={(checked) => handleNestedUpdate('settings', 'smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified of new orders</p>
                    </div>
                    <Switch
                      checked={formData.settings.orderNotifications}
                      onCheckedChange={(checked) => handleNestedUpdate('settings', 'orderNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Low Stock Alerts</Label>
                      <p className="text-sm text-gray-500">Get alerts when stock is low</p>
                    </div>
                    <Switch
                      checked={formData.settings.lowStockAlerts}
                      onCheckedChange={(checked) => handleNestedUpdate('settings', 'lowStockAlerts', checked)}
                    />
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
