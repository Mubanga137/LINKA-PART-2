"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomerHeader } from "@/components/customer-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  ArrowLeft,
  Save,
  AlertTriangle,
  CheckCircle,
  Globe,
  MapPin,
  Phone
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface NotificationSettings {
  orderUpdates: boolean
  promotions: boolean
  newProducts: boolean
  priceDrops: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private'
  showPurchaseHistory: boolean
  showWishlist: boolean
  allowRecommendations: boolean
  dataCollection: boolean
}

export default function CustomerSettings() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [isSaving, setIsSaving] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: false,
    newProducts: true,
    priceDrops: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  })

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showPurchaseHistory: false,
    showWishlist: true,
    allowRecommendations: true,
    dataCollection: false
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/settings')
      return
    }
  }, [user, router])

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match")
      return
    }

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
      // Show success message
    } catch (error) {
      console.error('Error changing password:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsSaving(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        logout()
        router.push('/')
      } catch (error) {
        console.error('Error deleting account:', error)
      } finally {
        setIsSaving(false)
      }
    }
  }

  const downloadData = () => {
    // Simulate data download
    alert("Your data download will be sent to your email address within 24 hours.")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/customer-dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="text-slate-600">Manage your account preferences and privacy</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your basic account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue={user.phone || ""}
                      placeholder="+260..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ny">Nyanja</SelectItem>
                        <SelectItem value="be">Bemba</SelectItem>
                        <SelectItem value="to">Tonga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="zm">
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zm">Zambia</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="zmw">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zmw">ZMW (Zambian Kwacha)</SelectItem>
                        <SelectItem value="usd">USD (US Dollar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Order & Purchase Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="orderUpdates">Order Updates</Label>
                        <p className="text-sm text-slate-600">Get notified about order status changes</p>
                      </div>
                      <Switch
                        id="orderUpdates"
                        checked={notificationSettings.orderUpdates}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, orderUpdates: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="priceDrops">Price Drop Alerts</Label>
                        <p className="text-sm text-slate-600">Get notified when wishlist items go on sale</p>
                      </div>
                      <Switch
                        id="priceDrops"
                        checked={notificationSettings.priceDrops}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, priceDrops: checked})
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Marketing & Promotions</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="promotions">Promotions & Deals</Label>
                        <p className="text-sm text-slate-600">Receive offers and promotional content</p>
                      </div>
                      <Switch
                        id="promotions"
                        checked={notificationSettings.promotions}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, promotions: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newProducts">New Product Alerts</Label>
                        <p className="text-sm text-slate-600">Get notified about new products from your favorite sellers</p>
                      </div>
                      <Switch
                        id="newProducts"
                        checked={notificationSettings.newProducts}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, newProducts: checked})
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Delivery Methods</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, emailNotifications: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-slate-500" />
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, smsNotifications: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-slate-500" />
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, pushNotifications: checked})
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Controls</CardTitle>
                <CardDescription>
                  Manage your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Profile Visibility</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profileVisibility">Profile Visibility</Label>
                        <p className="text-sm text-slate-600">Control who can see your profile information</p>
                      </div>
                      <Select 
                        value={privacySettings.profileVisibility} 
                        onValueChange={(value: 'public' | 'private') => 
                          setPrivacySettings({...privacySettings, profileVisibility: value})
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showPurchaseHistory">Show Purchase History</Label>
                        <p className="text-sm text-slate-600">Allow others to see your purchase history</p>
                      </div>
                      <Switch
                        id="showPurchaseHistory"
                        checked={privacySettings.showPurchaseHistory}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, showPurchaseHistory: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showWishlist">Show Wishlist</Label>
                        <p className="text-sm text-slate-600">Allow others to see your wishlist items</p>
                      </div>
                      <Switch
                        id="showWishlist"
                        checked={privacySettings.showWishlist}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, showWishlist: checked})
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Data & Personalization</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowRecommendations">Personalized Recommendations</Label>
                        <p className="text-sm text-slate-600">Use your activity to show personalized product recommendations</p>
                      </div>
                      <Switch
                        id="allowRecommendations"
                        checked={privacySettings.allowRecommendations}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, allowRecommendations: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dataCollection">Analytics & Improvement</Label>
                        <p className="text-sm text-slate-600">Help improve our service by sharing usage analytics</p>
                      </div>
                      <Switch
                        id="dataCollection"
                        checked={privacySettings.dataCollection}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, dataCollection: checked})
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Data Management</h4>
                  <div className="space-y-3">
                    <Button variant="outline" onClick={downloadData} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download My Data
                    </Button>
                    <p className="text-sm text-slate-600">
                      Download a copy of all your account data and activity
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Privacy Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>
                  Manage your account security and login settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handlePasswordChange} 
                      disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      {isSaving ? 'Changing...' : 'Change Password'}
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Account Security</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Email Verified</p>
                          <p className="text-sm text-green-700">{user.email}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-900">Two-Factor Authentication</p>
                          <p className="text-sm text-yellow-700">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-900 mb-4 text-red-600">Danger Zone</h4>
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-red-900">Delete Account</h5>
                        <p className="text-sm text-red-700 mb-3">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                          disabled={isSaving}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          {isSaving ? 'Deleting...' : 'Delete Account'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
