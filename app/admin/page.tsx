"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/contexts/auth-context";
import { AuthRedirectWrapper } from "@/components/auth-redirect-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Store,
  ShoppingCart,
  TrendingUp,
  Settings,
  BarChart3,
  Shield,
  Database,
  Mail,
  Bell
} from "lucide-react";

function AdminDashboardContent() {
  const { user } = useAuth();

  const adminStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Retailers",
      value: "1,285",
      change: "+8.2%",
      icon: Store,
      color: "green"
    },
    {
      title: "Monthly Orders",
      value: "45,632",
      change: "+15.8%",
      icon: ShoppingCart,
      color: "purple"
    },
    {
      title: "Platform Revenue",
      value: "K2.8M",
      change: "+22.1%",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const adminActions = [
    {
      title: "User Management",
      description: "Manage customer and retailer accounts",
      icon: Users,
      href: "/admin/users",
      color: "blue"
    },
    {
      title: "Retailer Verification",
      description: "Review and approve new retailers",
      icon: Shield,
      href: "/admin/verification",
      color: "green"
    },
    {
      title: "Platform Analytics",
      description: "View detailed platform metrics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "purple"
    },
    {
      title: "System Settings",
      description: "Configure platform settings",
      icon: Settings,
      href: "/admin/settings",
      color: "gray"
    },
    {
      title: "Data Management",
      description: "Manage platform data and backups",
      icon: Database,
      href: "/admin/data",
      color: "indigo"
    },
    {
      title: "Communications",
      description: "Send announcements and notifications",
      icon: Mail,
      href: "/admin/communications",
      color: "pink"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-red-50 to-orange-50 px-6 py-3 text-sm border border-red-200/50">
              <Shield className="mr-2 h-5 w-5 text-red-600" />
              <span className="text-red-800 font-medium">Admin Dashboard</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Welcome back, {user?.name}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and monitor the Linka platform from your administrative dashboard.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium text-green-600">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Admin Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-blue-600" />
                Administrative Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                            <Button size="sm" variant="outline" className="w-full">
                              Access
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-orange-600" />
                Recent Platform Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New retailer registration", user: "TechStore Zambia", time: "2 hours ago", type: "registration" },
                  { action: "High volume of orders", user: "Electronics Hub", time: "4 hours ago", type: "alert" },
                  { action: "System backup completed", user: "System", time: "6 hours ago", type: "system" },
                  { action: "Payment issue resolved", user: "Fashion Forward", time: "8 hours ago", type: "support" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'registration' ? 'bg-green-500' :
                        activity.type === 'alert' ? 'bg-yellow-500' :
                        activity.type === 'system' ? 'bg-blue-500' : 'bg-purple-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthRedirectWrapper requiredRole="admin">
      <AdminDashboardContent />
    </AuthRedirectWrapper>
  );
}
