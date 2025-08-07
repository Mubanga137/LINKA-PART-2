"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomerHeader } from "@/components/customer-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Shield,
  Package,
  Heart,
  ShoppingBag,
  Star,
  Bell,
  Settings
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/marketplace-context"

interface ProfileData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  bio: string
}

export default function CustomerProfile() {
  const { user } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    bio: ""
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/profile')
      return
    }
  }, [user, router])

  // Load user profile data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "Lusaka",
        province: user.province || "Lusaka",
        bio: user.bio || ""
      })
    }
  }, [user])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsEditing(false)
      // In a real app, this would update the user context
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form data
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "Lusaka",
        province: user.province || "Lusaka",
        bio: user.bio || ""
      })
    }
    setIsEditing(false)
  }

  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <CustomerHeader />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
              <p className="text-slate-600">Manage your account information and preferences</p>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className="gap-2"
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-semibold text-slate-900 mb-1">{user.name}</h2>
                  <Badge variant="secondary" className="mb-4">
                    {user.role === 'customer' ? 'Customer' : user.role}
                  </Badge>
                  
                  <div className="w-full space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {profileData.phone && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-4 w-4" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.city}, {profileData.province}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>Member since Nov 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <Badge variant="outline">12</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Wishlist Items</span>
                  </div>
                  <Badge variant="outline">8</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Cart Items</span>
                  </div>
                  <Badge variant="outline">{totalItems}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Reviews Written</span>
                  </div>
                  <Badge variant="outline">5</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                      placeholder="+260..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/orders')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">My Orders</h3>
                      <p className="text-sm text-slate-600">View order history</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/wishlist')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Wishlist</h3>
                      <p className="text-sm text-slate-600">Saved products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/settings')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Settings className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Settings</h3>
                      <p className="text-sm text-slate-600">Account preferences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
