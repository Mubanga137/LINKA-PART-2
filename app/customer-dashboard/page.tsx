"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/marketplace-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Clock,
  Zap,
  Crown,
  Sparkles,
  ArrowRight,
  Target,
  ChevronRight,
  Eye,
  Plus,
  Calendar,
  DollarSign,
  Award,
  Truck,
  ShieldCheck,
  MessageCircle,
  BarChart3
} from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const { favorites } = useFavorites();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loyaltyProgress, setLoyaltyProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setLoyaltyProgress(78);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <main className="py-20 text-center">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Linka</h2>
            <p className="text-gray-600 mb-6">Please log in to access your personalized dashboard.</p>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold">
                Log In
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock data for dashboard
  const recentOrders = [
    { id: "ORD-001", product: "Handcrafted Copper Bracelet", vendor: "Copper Craft Jewelry", status: "Delivered", total: "K245.99", date: "2 days ago", image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=800" },
    { id: "ORD-002", product: "Traditional Chitenge Dress", vendor: "Banda Fashion House", status: "Shipped", total: "K189.99", date: "5 days ago", image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fa2f294111b514f3eb8bbc4805acb9326?format=webp&width=800" },
    { id: "ORD-003", product: "Pure Zambian Honey", vendor: "Phiri Organic Foods", status: "Processing", total: "K156.50", date: "1 week ago", image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fb92a8e5b385c400ba9c8823b431aca28?format=webp&width=800" }
  ];

  const quickActions = [
    { icon: ShoppingBag, label: "Browse Products", href: "/marketplace", gradient: "from-blue-500 to-cyan-500", count: "5000+" },
    { icon: Gift, label: "Hot Deals", href: "/hot-deals", gradient: "from-red-500 to-orange-500", count: "50%" },
    { icon: Heart, label: "Wishlist", href: "/wishlist", gradient: "from-pink-500 to-rose-500", count: favorites.length },
    { icon: Package, label: "Track Orders", href: "/orders", gradient: "from-purple-500 to-indigo-500", count: "3" }
  ];

  const categories = [
    { name: "Fashion & Textiles", icon: "👕", href: "/categories/fashion", trending: "Hot" },
    { name: "Traditional Crafts", icon: "🏺", href: "/categories/traditional-crafts", trending: "New" },
    { name: "Electronics", icon: "📱", href: "/categories/electronics", trending: "Sale" },
    { name: "Home & Garden", icon: "🏠", href: "/categories/home-garden", trending: "Popular" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute top-32 left-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-2xl animate-bounce-slow"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-8 lg:space-y-0"
            >
              {/* User Welcome */}
              <div className="flex items-center space-x-6">
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="h-24 w-24 border-4 border-white/30 shadow-2xl">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-2xl font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
                
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <h1 className="text-4xl lg:text-5xl font-bold">
                      {getTimeGreeting()}, {user.name.split(' ')[0]}!
                    </h1>
                    <Sparkles className="h-8 w-8 text-yellow-400 animate-spin-slow" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex items-center space-x-6 text-white/90"
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>{user.location || 'Lusaka, Zambia'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-current text-yellow-400" />
                      <span>Premium Member</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  onClick={() => router.push('/marketplace')}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold px-8 py-4 border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl group rounded-xl"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                  Start Shopping
                  <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                
                <Button
                  onClick={() => router.push('/orders')}
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-4 transition-all duration-300 hover:scale-105 rounded-xl"
                  size="lg"
                >
                  <Package className="h-5 w-5 mr-3" />
                  Track Orders
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Loyalty Points Card */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-white/90 backdrop-blur-xl border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">2,450</div>
                        <div className="text-sm text-slate-600">Loyalty Points</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Gift className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Progress to next reward</span>
                        <span>{loyaltyProgress}%</span>
                      </div>
                      <Progress value={loyaltyProgress} className="h-2" />
                    </div>
                    
                    <Badge className="mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      550 points to next reward
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cart Total Card */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-white/90 backdrop-blur-xl border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">K{totalPrice.toFixed(2)}</div>
                        <div className="text-sm text-slate-600">Cart Total</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-slate-600">{totalItems} items in cart</span>
                    </div>
                    
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      Ready to checkout
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Wishlist Card */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-white/90 backdrop-blur-xl border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-red-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{favorites.length}</div>
                        <div className="text-sm text-slate-600">Wishlist Items</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-pink-600" />
                      <span className="text-sm text-slate-600">5 items on sale</span>
                    </div>
                    
                    <Badge className="bg-gradient-to-r from-pink-500 to-red-600 text-white">
                      View wishlist
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Score Card */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-white/90 backdrop-blur-xl border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">98</div>
                        <div className="text-sm text-slate-600">Activity Score</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-slate-600">Very active today</span>
                    </div>
                    
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Zap className="h-3 w-3 mr-1" />
                      Top 10%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Quick Actions Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Quick Actions</h2>
              <p className="text-slate-600">Everything you need, just one click away</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link href={action.href}>
                  <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">{action.label}</h3>
                      <Badge className="bg-slate-100 text-slate-700">{action.count}</Badge>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Orders & Activity */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  Recent Orders
                </CardTitle>
                <CardDescription>Track your recent purchases and delivery status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:from-slate-100 hover:to-blue-100 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={order.image}
                          alt={order.product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{order.product}</h4>
                        <p className="text-sm text-slate-600 mb-2">{order.vendor}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                            className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {order.status}
                          </Badge>
                          <span className="text-xs text-slate-500">{order.date}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-slate-900 mb-2">{order.total}</p>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link href="/orders">
                    <Button variant="outline" className="w-full group">
                      View All Orders
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Actions */}
          <div className="space-y-6">
            {/* Account Settings */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: User, label: "Edit Profile", href: "/profile" },
                  { icon: Settings, label: "Settings", href: "/settings" },
                  { icon: ShieldCheck, label: "Security", href: "/security" },
                  { icon: MessageCircle, label: "Support", href: "/support" }
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  >
                    <Link href={item.href}>
                      <Button variant="ghost" className="w-full justify-start group hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50">
                        <item.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                        {item.label}
                        <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Orders this month</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Money saved</span>
                  <span className="font-bold">K340</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Reviews written</span>
                  <span className="font-bold">8</span>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Award className="h-3 w-3 mr-1" />
                  Top Customer
                </Badge>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Enhanced Categories Section */}
        <EnhancedCategoriesGrid showSearch={false} maxCategories={8} />
      </main>

      <Footer />
    </div>
  );
}
