"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/marketplace-context";
import Link from "next/link";
import { 
  ShoppingBag, 
  Heart, 
  Package, 
  User, 
  Settings, 
  CreditCard,
  MapPin,
  Bell,
  TrendingUp,
  Star,
  Gift,
  Clock
} from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const { favorites } = useFavorites();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="py-20 text-center">
          <p className="text-lg text-gray-600">Please log in to access your dashboard.</p>
          <Link href="/login">
            <Button className="mt-4">Log In</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your orders, favorites, and account settings from your dashboard.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cart Items</p>
                  <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wishlist</p>
                  <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                </div>
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cart Total</p>
                  <p className="text-2xl font-bold text-gray-900">K{getCartTotal().toFixed(2)}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Package className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription>
                  Track your recent purchases and delivery status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "ORD-001", status: "Delivered", total: "K245.99", date: "2 days ago" },
                    { id: "ORD-002", status: "Shipped", total: "K89.99", date: "5 days ago" },
                    { id: "ORD-003", status: "Processing", total: "K156.50", date: "1 week ago" }
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{order.total}</p>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/orders">
                    <Button variant="outline" className="w-full">
                      View All Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Shopping Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Quick Shopping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/marketplace">
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Browse Marketplace
                  </Button>
                </Link>
                <Link href="/hot-deals">
                  <Button className="w-full justify-start bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                    <Gift className="h-4 w-4 mr-2" />
                    Hot Deals 🔥
                  </Button>
                </Link>
                <Link href="/wishlist">
                  <Button className="w-full justify-start" variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    My Wishlist ({favorites.length})
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button className="w-full justify-start" variant="outline">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    My Cart ({totalItems})
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/profile">
                  <Button className="w-full justify-start" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Order History
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recommended for You
              </CardTitle>
              <CardDescription>
                Based on your shopping history and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Electronics", icon: "📱", count: "25+ items" },
                  { name: "Fashion", icon: "👕", count: "40+ items" },
                  { name: "Home & Garden", icon: "🏠", count: "15+ items" },
                  { name: "Health & Beauty", icon: "💄", count: "20+ items" }
                ].map((category) => (
                  <Link key={category.name} href={`/marketplace?category=${category.name}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-500">{category.count}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
