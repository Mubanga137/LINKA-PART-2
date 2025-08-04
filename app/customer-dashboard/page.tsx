"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { EnhancedCustomerWelcome } from "@/components/customer/enhanced-customer-welcome";
import { QuickActions } from "@/components/customer/quick-actions";
import { RecentActivity } from "@/components/customer/recent-activity";
import { EnhancedCategoryGrid } from "@/components/customer/enhanced-category-grid";
import { TrendingProducts } from "@/components/customer/trending-products";
import { RecommendedServices } from "@/components/customer/recommended-services";
import Link from "next/link";

export default function CustomerDashboard() {
  const { user, login } = useAuth();

  const handleDemoLogin = async () => {
    // Demo login as customer
    const result = await login('customer@demo.com', 'demo123');
    if (result.success) {
      window.location.reload();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="py-20 text-center max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Dashboard</h2>
            <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>

            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full">Log In</Button>
              </Link>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
              >
                Try Demo Customer Dashboard
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Demo credentials: customer@demo.com / demo123
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Enhanced Welcome Section with Stats Cards */}
      <EnhancedCustomerWelcome user={user} />

      {/* Quick Actions Grid */}
      <QuickActions />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Recent Activity */}
        <RecentActivity user={user} />

        {/* Enhanced Category Grid */}
        <EnhancedCategoryGrid />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Recommended Services */}
        <RecommendedServices />
      </div>

      <Footer />
    </div>
  );
}
