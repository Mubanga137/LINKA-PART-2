"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Eye,
  Heart,
  Sparkles,
  ShoppingBag,
  Users,
  Star
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const allCategories = [
  {
    id: 1,
    name: "Fashion & Textiles",
    slug: "fashion-textiles",
    description: "Chitenge fabrics, modern clothing & traditional wear",
    icon: "👕",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
    hoverColor: "from-purple-600 to-pink-700",
    products: "2,100+",
    vendors: "340+",
    trending: true,
    featured: ["Chitenge Dresses", "Modern Suits", "Traditional Wear"],
    subcategories: ["Traditional", "Modern", "Accessories", "Custom", "Textiles"]
  },
  {
    id: 2,
    name: "Food & Beverages",
    slug: "food-beverages",
    description: "Local spices, organic honey & traditional foods",
    icon: "🍯",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    hoverColor: "from-green-600 to-emerald-700",
    products: "1,800+",
    vendors: "280+",
    trending: false,
    featured: ["Organic Honey", "Local Spices", "Traditional Foods"],
    subcategories: ["Traditional Foods", "Beverages", "Organic Products", "Spices"]
  },
  {
    id: 3,
    name: "Electronics",
    slug: "electronics",
    description: "Smartphones, laptops, gaming gear & tech accessories",
    icon: "📱",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    hoverColor: "from-blue-600 to-indigo-700",
    products: "950+",
    vendors: "120+",
    trending: true,
    featured: ["Smartphones", "Laptops", "Gaming Gear"],
    subcategories: ["Mobile Phones", "Computers", "Gaming", "Audio", "Accessories"]
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    slug: "jewelry-accessories",
    description: "Handcrafted jewelry & copper accessories",
    icon: "💎",
    color: "from-amber-500 to-yellow-600",
    bgColor: "from-amber-50 to-yellow-50",
    hoverColor: "from-amber-600 to-yellow-700",
    products: "680+",
    vendors: "95+",
    trending: false,
    featured: ["Copper Jewelry", "Gemstones", "Handmade Items"],
    subcategories: ["Rings", "Necklaces", "Bracelets", "Traditional Jewelry"]
  },
  {
    id: 5,
    name: "Art & Culture",
    slug: "art-culture",
    description: "Musical instruments, paintings & cultural art",
    icon: "🎨",
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50",
    hoverColor: "from-teal-600 to-cyan-700",
    products: "420+",
    vendors: "85+",
    trending: true,
    featured: ["Traditional Music", "Paintings", "Sculptures"],
    subcategories: ["Paintings", "Sculptures", "Music", "Traditional Art"]
  },
  {
    id: 6,
    name: "Tools & Hardware",
    slug: "tools-hardware",
    description: "Quality tools, hardware & construction materials",
    icon: "🔨",
    color: "from-slate-500 to-gray-600",
    bgColor: "from-slate-50 to-gray-50",
    hoverColor: "from-slate-600 to-gray-700",
    products: "1,100+",
    vendors: "180+",
    trending: false,
    featured: ["Power Tools", "Hardware", "Construction"],
    subcategories: ["Hand Tools", "Power Tools", "Hardware", "Construction"]
  },
  {
    id: 7,
    name: "Agriculture & Natural",
    slug: "agriculture-natural",
    description: "Seeds, farming supplies & organic goods",
    icon: "🌱",
    color: "from-lime-500 to-green-600",
    bgColor: "from-lime-50 to-green-50",
    hoverColor: "from-lime-600 to-green-700",
    products: "1,350+",
    vendors: "220+",
    trending: true,
    featured: ["Organic Seeds", "Farm Tools", "Natural Products"],
    subcategories: ["Seeds", "Tools", "Fertilizers", "Organic Products"]
  },
  {
    id: 8,
    name: "Traditional Crafts",
    slug: "traditional-crafts",
    description: "Authentic crafts, wood carvings & cultural items",
    icon: "🪘",
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-50 to-red-50",
    hoverColor: "from-orange-600 to-red-700",
    products: "1,200+",
    vendors: "160+",
    trending: true,
    featured: ["Wood Carvings", "Pottery", "Baskets"],
    subcategories: ["Wood Carvings", "Pottery", "Baskets", "Textiles"]
  },
  {
    id: 9,
    name: "Home & Garden",
    slug: "home-garden",
    description: "Furniture, decor & garden essentials",
    icon: "🏡",
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-50 to-teal-50",
    hoverColor: "from-emerald-600 to-teal-700",
    products: "890+",
    vendors: "140+",
    trending: false,
    featured: ["Furniture", "Decor", "Garden Tools"],
    subcategories: ["Furniture", "Decor", "Garden", "Storage"]
  },
  {
    id: 10,
    name: "Health & Beauty",
    slug: "health-beauty",
    description: "Natural skincare, wellness & beauty products",
    icon: "💄",
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
    hoverColor: "from-pink-600 to-rose-700",
    products: "560+",
    vendors: "75+",
    trending: true,
    featured: ["Natural Skincare", "Wellness", "Beauty"],
    subcategories: ["Skincare", "Makeup", "Wellness", "Natural Products"]
  },
  {
    id: 11,
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    description: "Fitness gear, outdoor equipment & sports accessories",
    icon: "⚽",
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-50 to-purple-50",
    hoverColor: "from-indigo-600 to-purple-700",
    products: "450+",
    vendors: "60+",
    trending: false,
    featured: ["Fitness Gear", "Outdoor Equipment", "Sports"],
    subcategories: ["Fitness", "Outdoor", "Sports", "Recreation"]
  },
  {
    id: 12,
    name: "Books & Media",
    slug: "books-media",
    description: "Educational books, media & entertainment content",
    icon: "📚",
    color: "from-violet-500 to-purple-600",
    bgColor: "from-violet-50 to-purple-50",
    hoverColor: "from-violet-600 to-purple-700",
    products: "320+",
    vendors: "45+",
    trending: false,
    featured: ["Educational Books", "Media", "Entertainment"],
    subcategories: ["Books", "Media", "Educational", "Entertainment"]
  }
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "trending" | "popular">("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  const filteredCategories = allCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.featured.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "trending" && category.trending) ||
                         (selectedFilter === "popular" && parseInt(category.products) > 1000);
    
    return matchesSearch && matchesFilter;
  });

  const handleCategoryClick = (category: any) => {
    router.push(`/categories/${category.slug}`);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
    >
      <Header />
      
      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 text-sm border border-purple-200/50"
            >
              <ShoppingBag className="mr-2 h-5 w-5 text-purple-600" />
              <span className="text-purple-800 font-medium">Browse All Categories</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Explore Every
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
              >
                Category & Service
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Discover thousands of products and services from verified Zambian businesses. 
              From traditional crafts to modern technology, find exactly what you're looking for.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12+</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,800+</div>
                <div className="text-sm text-gray-600">Vendors</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12,000+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Search and Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search categories, products, or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-0 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4">
            {[
              { key: "all", label: "All Categories", icon: "📂" },
              { key: "trending", label: "Trending", icon: "🔥" },
              { key: "popular", label: "Most Popular", icon: "⭐" }
            ].map(({ key, label, icon }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedFilter === key ? "default" : "outline"}
                  onClick={() => setSelectedFilter(key as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                    selectedFilter === key 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                      : "bg-white/80 backdrop-blur-sm hover:bg-white"
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  {label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories Grid */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card
                className="group cursor-pointer bg-white/80 backdrop-blur-sm border-white/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-0 relative">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{
                        scale: hoveredCard === category.id ? [1, 1.2, 1] : 1,
                        rotate: hoveredCard === category.id ? [0, 180, 360] : 0
                      }}
                      transition={{ duration: 2, repeat: hoveredCard === category.id ? Infinity : 0 }}
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${category.color}/20 rounded-full blur-xl opacity-0 group-hover:opacity-100`}
                    />
                    <motion.div
                      animate={{
                        y: hoveredCard === category.id ? [0, -10, 0] : 0
                      }}
                      transition={{ duration: 1.5, repeat: hoveredCard === category.id ? Infinity : 0 }}
                      className="absolute top-2 right-2"
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </div>

                  {/* Header */}
                  <div className="relative p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg text-2xl`}
                      >
                        {category.icon}
                      </motion.div>
                      
                      {category.trending && (
                        <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white animate-pulse">
                          🔥 Trending
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-800 transition-colors">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold text-gray-700">{category.products}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">{category.vendors}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-400" />
                        <span className="text-xs text-gray-500">Popular</span>
                      </div>
                    </div>
                  </div>

                  {/* Subcategories Preview */}
                  <div className="relative px-6 pb-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Popular Subcategories:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs px-2 py-1 bg-white/50 border-gray-200 text-gray-600 group-hover:bg-white/80 transition-all duration-200"
                          >
                            {sub}
                          </Badge>
                        ))}
                        {category.subcategories.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-1 bg-white/50 border-gray-200 text-gray-600">
                            +{category.subcategories.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="relative px-6 pb-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-gray-500">
                        Browse Category
                      </span>
                      <div className="flex items-center gap-1 text-purple-600 group-hover:text-purple-700">
                        <span className="text-sm font-semibold">Explore</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${category.color}`}
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: hoveredCard === category.id ? "100%" : "0%"
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter</p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedFilter("all");
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white relative overflow-hidden rounded-2xl p-8 text-center"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Browse our full marketplace or contact our support team to help you find exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl"
                  asChild
                >
                  <Link href="/marketplace">Browse All Products</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-4 rounded-xl"
                  asChild
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </motion.div>
  );
}
