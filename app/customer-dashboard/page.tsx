"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/contexts/auth-context";
import { AnimatedSidebar } from "@/components/ui/animated-sidebar";
import { EnhancedCustomerWelcome } from "@/components/customer/enhanced-customer-welcome";
import { RecentOrdersViewed } from "@/components/customer/recent-orders-viewed";
import { RecommendedServices } from "@/components/customer/recommended-services";
import { EnhancedCategoryGrid } from "@/components/customer/enhanced-category-grid";
import { TrendingProducts } from "@/components/customer/trending-products";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data for recommended services and trending products
const mockRecommendedProducts = [
  {
    id: "rec-1",
    name: "Mobile Money Transfer Service",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80",
    price: 25.00,
    originalPrice: 35.00,
    rating: 4.8,
    reviewCount: 324,
    retailerName: "Digital Finance Zambia",
    retailerLocation: "Lusaka",
    shippingInfo: { estimatedDays: "1" },
    features: ["Instant Transfer", "24/7 Support", "Low Fees"]
  },
  {
    id: "rec-2",
    name: "Home Cleaning Service",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80",
    price: 89.99,
    rating: 4.6,
    reviewCount: 156,
    retailerName: "CleanPro Zambia",
    retailerLocation: "Ndola",
    shippingInfo: { estimatedDays: "Same Day" },
    features: ["Professional Staff", "Eco-friendly", "Insured"]
  },
  {
    id: "rec-3",
    name: "Local Food Delivery",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&q=80",
    price: 45.50,
    rating: 4.7,
    reviewCount: 289,
    retailerName: "Taste of Zambia",
    retailerLocation: "Kitwe",
    shippingInfo: { estimatedDays: "1-2 hours" },
    features: ["Fresh Ingredients", "Traditional Recipes", "Fast Delivery"]
  },
  {
    id: "rec-4",
    name: "Tech Repair Service",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&q=80",
    price: 120.00,
    originalPrice: 180.00,
    rating: 4.9,
    reviewCount: 87,
    retailerName: "TechFix Zambia",
    retailerLocation: "Lusaka",
    shippingInfo: { estimatedDays: "2-3" },
    features: ["Expert Technicians", "Warranty Included", "Pick-up Service"]
  },
  {
    id: "rec-5",
    name: "Personal Shopping Assistant",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80",
    price: 65.00,
    rating: 4.5,
    reviewCount: 142,
    retailerName: "Style Guru Zambia",
    retailerLocation: "Lusaka",
    shippingInfo: { estimatedDays: "Flexible" },
    features: ["Personal Stylist", "Budget Friendly", "Local Shopping"]
  },
  {
    id: "rec-6",
    name: "Garden Maintenance",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80",
    price: 75.99,
    rating: 4.4,
    reviewCount: 98,
    retailerName: "Green Thumb Services",
    retailerLocation: "Kabwe",
    shippingInfo: { estimatedDays: "Weekly" },
    features: ["Professional Gardeners", "Own Equipment", "Seasonal Care"]
  }
];

const mockTrendingProducts = [
  {
    id: "trend-1",
    name: "4K Smart TV 55-inch",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=80",
    price: 599.99,
    originalPrice: 749.99,
    rating: 4.7,
    reviewCount: 234,
    retailerName: "Electronics Hub Zambia",
    inStock: true
  },
  {
    id: "trend-2",
    name: "Traditional Chitenge Dress",
    image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=300&q=80",
    price: 45.99,
    rating: 4.9,
    reviewCount: 87,
    retailerName: "Zambian Heritage Fashion",
    inStock: true
  },
  {
    id: "trend-3",
    name: "Bluetooth Speaker System",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 145,
    retailerName: "Audio Pro Zambia",
    inStock: true
  },
  {
    id: "trend-4",
    name: "Smartphone 128GB",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80",
    price: 399.99,
    rating: 4.8,
    reviewCount: 312,
    retailerName: "Mobile Tech Zambia",
    inStock: true
  },
  {
    id: "trend-5",
    name: "Handwoven Basket Set",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80",
    price: 65.99,
    rating: 4.8,
    reviewCount: 73,
    retailerName: "Zambian Craft Collective",
    inStock: true
  },
  {
    id: "trend-6",
    name: "Organic Face Cream",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 98,
    retailerName: "Natural Beauty Zambia",
    inStock: true
  },
  {
    id: "trend-7",
    name: "Gaming Controller",
    image: "https://images.unsplash.com/photo-1592840062661-afe1e104c5a4?w=300&q=80",
    price: 79.99,
    rating: 4.5,
    reviewCount: 189,
    retailerName: "Gaming World Zambia",
    inStock: true
  },
  {
    id: "trend-8",
    name: "Leather Oxford Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80",
    price: 89.99,
    rating: 4.7,
    reviewCount: 156,
    retailerName: "Lusaka Leather Works",
    inStock: true
  }
];

export default function CustomerDashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6 p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Linka Dashboard
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Please log in to access your personalized dashboard and start your shopping journey.
              </p>
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Log In to Continue
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="flex">
        {/* Animated Sidebar */}
        <AnimatedSidebar />
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Enhanced Welcome Section */}
          <EnhancedCustomerWelcome user={user} />

          {/* Main Dashboard Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12">
            {/* Section 1: Recent Orders & Recently Viewed (Top Priority) */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <RecentOrdersViewed />
            </motion.section>

            {/* Section 2: Recommended for You (Direct under Recently Viewed) */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <RecommendedServices 
                products={mockRecommendedProducts} 
                isLoading={false}
              />
            </motion.section>

            {/* Section 3: Shop by Category */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <EnhancedCategoryGrid />
            </motion.section>

            {/* Section 4: Trending Now (Bottom Section) */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <TrendingProducts 
                products={mockTrendingProducts} 
                isLoading={false}
              />
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white relative overflow-hidden rounded-2xl p-8 text-center"
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Discover More Amazing Products
                </h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Explore thousands of products from verified local vendors. From traditional crafts to modern electronics,
                  find everything you need while supporting the Zambian economy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/marketplace">
                    <Button 
                      size="lg" 
                      className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Explore Marketplace
                    </Button>
                  </Link>
                  <Link href="/hot-deals">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-4 rounded-xl"
                    >
                      View Hot Deals 🔥
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
