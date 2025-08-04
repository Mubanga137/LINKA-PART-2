"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Grid3X3,
  Star,
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
  Gem,
  UtensilsCrossed,
  Palette,
  Music,
  MapPin,
  Truck,
  Heart,
  Stethoscope,
  Camera,
  Gamepad2,
  Coffee,
  Users,
  ArrowRight,
  ChevronRight,
  Award,
  TrendingUp,
  Clock,
  Package,
  ShoppingBag,
  Store,
  Laptop,
  Headphones,
  Watch,
  Car,
  Plane,
  Building,
  DollarSign,
  Briefcase,
  GraduationCap,
  Baby,
  Shield,
  Scissors
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Comprehensive categories data
const allCategories = [
  {
    id: "electronics",
    name: "Electronics & Tech",
    slug: "electronics",
    icon: Smartphone,
    description: "Latest gadgets, smartphones, laptops, and tech accessories",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80",
    productCount: 1248,
    featured: true,
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    tags: ["Popular", "Top Picks"],
    subcategories: ["Smartphones", "Laptops", "Audio", "Gaming"]
  },
  {
    id: "fashion",
    name: "Fashion & Clothing",
    slug: "fashion",
    icon: Shirt,
    description: "Traditional and modern clothing, accessories, and footwear",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    productCount: 892,
    featured: true,
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
    tags: ["Trending", "Top Picks"],
    subcategories: ["Traditional Wear", "Modern Fashion", "Shoes", "Accessories"]
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    slug: "home-garden",
    icon: Home,
    description: "Furniture, home decor, gardening supplies, and household items",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
    productCount: 567,
    featured: false,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    tags: ["Popular"],
    subcategories: ["Furniture", "Decor", "Garden", "Kitchen"]
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    slug: "health-beauty",
    icon: Sparkles,
    description: "Skincare, cosmetics, wellness products, and health supplements",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    productCount: 334,
    featured: true,
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
    tags: ["Trending"],
    subcategories: ["Skincare", "Makeup", "Wellness", "Hair Care"]
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    icon: Dumbbell,
    description: "Fitness equipment, sports gear, outdoor activities, and adventure",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80",
    productCount: 423,
    featured: false,
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-amber-50",
    tags: ["Popular"],
    subcategories: ["Fitness", "Team Sports", "Outdoor", "Adventure"]
  },
  {
    id: "books-media",
    name: "Books & Media",
    slug: "books-media",
    icon: BookOpen,
    description: "Educational books, literature, digital media, and entertainment",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    productCount: 198,
    featured: false,
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50",
    tags: ["Educational"],
    subcategories: ["Academic", "Literature", "Digital", "Children's"]
  },
  {
    id: "jewelry-accessories",
    name: "Jewelry & Accessories",
    slug: "jewelry-accessories",
    icon: Gem,
    description: "Fine jewelry, watches, handbags, and fashion accessories",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    productCount: 156,
    featured: true,
    color: "from-yellow-500 to-orange-600",
    bgColor: "from-yellow-50 to-orange-50",
    tags: ["Luxury", "Top Picks"],
    subcategories: ["Fine Jewelry", "Watches", "Bags", "Sunglasses"]
  },
  {
    id: "food-beverages",
    name: "Food & Beverages",
    slug: "food-beverages",
    icon: UtensilsCrossed,
    description: "Fresh produce, local delicacies, beverages, and gourmet foods",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&q=80",
    productCount: 445,
    featured: false,
    color: "from-red-500 to-pink-600",
    bgColor: "from-red-50 to-pink-50",
    tags: ["Fresh", "Local"],
    subcategories: ["Fresh Produce", "Local Foods", "Beverages", "Snacks"]
  },
  {
    id: "traditional-crafts",
    name: "Traditional Crafts",
    slug: "traditional-crafts",
    icon: Palette,
    description: "Handmade crafts, cultural artifacts, and traditional art",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80",
    productCount: 267,
    featured: true,
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-50 to-purple-50",
    tags: ["Artisan", "Cultural"],
    subcategories: ["Wood Carving", "Pottery", "Textiles", "Baskets"]
  },
  {
    id: "entertainment",
    name: "Entertainment & Gaming",
    slug: "entertainment",
    icon: Gamepad2,
    description: "Gaming consoles, entertainment systems, and media devices",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
    productCount: 312,
    featured: false,
    color: "from-violet-500 to-purple-600",
    bgColor: "from-violet-50 to-purple-50",
    tags: ["Gaming", "Popular"],
    subcategories: ["Gaming", "Streaming", "Music", "Movies"]
  },
  {
    id: "automotive",
    name: "Automotive & Transport",
    slug: "automotive",
    icon: Car,
    description: "Car parts, accessories, motorcycles, and transport services",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80",
    productCount: 234,
    featured: false,
    color: "from-gray-600 to-slate-700",
    bgColor: "from-gray-50 to-slate-50",
    tags: ["Transport"],
    subcategories: ["Car Parts", "Accessories", "Motorcycles", "Services"]
  },
  {
    id: "tools-hardware",
    name: "Tools & Hardware",
    slug: "tools-hardware",
    icon: Building,
    description: "Construction tools, hardware supplies, and industrial equipment",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&q=80",
    productCount: 189,
    featured: false,
    color: "from-amber-600 to-orange-700",
    bgColor: "from-amber-50 to-orange-50",
    tags: ["Professional"],
    subcategories: ["Power Tools", "Hardware", "Safety", "Industrial"]
  },
  {
    id: "financial-services",
    name: "Financial Services",
    slug: "financial-services",
    icon: DollarSign,
    description: "Banking, insurance, mobile money, and financial consulting",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&q=80",
    productCount: 78,
    featured: false,
    color: "from-emerald-600 to-green-700",
    bgColor: "from-emerald-50 to-green-50",
    tags: ["Services"],
    subcategories: ["Banking", "Insurance", "Mobile Money", "Consulting"]
  },
  {
    id: "professional-services",
    name: "Professional Services",
    slug: "professional-services",
    icon: Briefcase,
    description: "Legal, accounting, consulting, and business services",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    productCount: 156,
    featured: false,
    color: "from-blue-600 to-indigo-700",
    bgColor: "from-blue-50 to-indigo-50",
    tags: ["Professional"],
    subcategories: ["Legal", "Accounting", "Consulting", "Marketing"]
  },
  {
    id: "education",
    name: "Education & Learning",
    slug: "education",
    icon: GraduationCap,
    description: "Online courses, tutoring, educational materials, and training",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
    productCount: 89,
    featured: false,
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-50 to-blue-50",
    tags: ["Educational"],
    subcategories: ["Online Courses", "Tutoring", "Materials", "Training"]
  },
  {
    id: "baby-kids",
    name: "Baby & Kids",
    slug: "baby-kids",
    icon: Baby,
    description: "Baby products, toys, children's clothing, and family essentials",
    image: "https://images.unsplash.com/photo-1544965503-e5365bfa6420?w=400&q=80",
    productCount: 267,
    featured: false,
    color: "from-pink-400 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    tags: ["Family"],
    subcategories: ["Baby Care", "Toys", "Kids Clothing", "Safety"]
  }
];

const filterTags = ["All", "Top Picks", "Popular", "Trending", "Featured", "New", "Educational", "Professional"];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const sparkleVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: { 
    scale: [0, 1, 0], 
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
};

// Hero Section Component
function CategoriesHeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 py-16 md:py-24"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
            style={{ 
              animationDelay: `${i * 0.3}s`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            className="absolute w-4 h-4 text-sky-400 opacity-50"
          >
            <Star className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-100 to-blue-100 px-6 py-3 text-sm border border-sky-200/50"
            >
              <Grid3X3 className="mr-2 h-5 w-5 text-sky-600" />
              <span className="text-sky-800 font-semibold">Discover Every Category</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-slate-900">Explore All</span>
              <span className="block bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                Categories
              </span>
              <span className="block text-slate-900">on Linka</span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Browse through our comprehensive collection of product categories. 
              From electronics to traditional crafts, find exactly what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-sm text-slate-600">
            <div className="flex items-center justify-center gap-2 bg-white/80 px-4 py-3 rounded-xl shadow-md">
              <ShoppingBag className="h-4 w-4 text-sky-600" />
              <span className="font-medium">16+ Categories</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/80 px-4 py-3 rounded-xl shadow-md">
              <Store className="h-4 w-4 text-sky-600" />
              <span className="font-medium">1000+ Vendors</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/80 px-4 py-3 rounded-xl shadow-md">
              <Package className="h-4 w-4 text-sky-600" />
              <span className="font-medium">5000+ Products</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/80 px-4 py-3 rounded-xl shadow-md">
              <Award className="h-4 w-4 text-sky-600" />
              <span className="font-medium">All Verified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Category Card Component
function CategoryCard({ category, index }: { category: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group"
    >
      <Link href={`/marketplace/categories/${category.slug}`}>
        <Card className={`
          relative overflow-hidden border-0 shadow-lg hover:shadow-2xl 
          transition-all duration-500 bg-white rounded-2xl
          hover:bg-gradient-to-br hover:from-white hover:to-sky-50/30
        `}>
          {/* Cover Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Tags */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {category.tags.map((tag: string) => (
                <Badge 
                  key={tag} 
                  className={`text-xs px-2 py-1 ${
                    tag === "Top Picks" ? "bg-yellow-500 text-white" :
                    tag === "Trending" ? "bg-red-500 text-white" :
                    tag === "Popular" ? "bg-green-500 text-white" :
                    tag === "Featured" ? "bg-purple-500 text-white" :
                    "bg-sky-500 text-white"
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Product Count */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                {category.productCount.toLocaleString()} items
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
                className={`
                  w-14 h-14 rounded-2xl 
                  bg-gradient-to-r ${category.color} 
                  flex items-center justify-center 
                  shadow-lg group-hover:shadow-xl
                  transition-all duration-300 flex-shrink-0
                `}
              >
                <category.icon className="h-7 w-7 text-white" />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.h3 
                  className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-sky-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  {category.name}
                </motion.h3>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Subcategories */}
            <div className="flex flex-wrap gap-1">
              {category.subcategories.slice(0, 3).map((sub: string) => (
                <Badge key={sub} variant="secondary" className="text-xs font-medium">
                  {sub}
                </Badge>
              ))}
              {category.subcategories.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{category.subcategories.length - 3}
                </Badge>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Button 
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white group/btn"
                size="sm"
              >
                <span className="flex items-center justify-center">
                  Explore Category
                  <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>

            {/* Floating Particles Effect */}
            <motion.div
              className="absolute top-2 right-2 w-2 h-2 bg-sky-400/40 rounded-full opacity-0 group-hover:opacity-100"
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1
              }}
            />
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Main Page Component
function CategoriesPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [showSearch, setShowSearch] = useState(false);

  // Filter categories
  const filteredCategories = useMemo(() => {
    let filtered = allCategories;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subcategories.some(sub => 
          sub.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by tag
    if (selectedTag !== "All") {
      filtered = filtered.filter(category =>
        category.tags.includes(selectedTag)
      );
    }

    return filtered;
  }, [searchQuery, selectedTag]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30"
    >
      <Header />
      
      <main>
        <CategoriesHeroSection />

        {/* Search and Filters Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-8 bg-white/80 backdrop-blur-sm border-b border-sky-200/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base rounded-xl border-sky-200 focus:ring-sky-500 focus:border-sky-500 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2">
                {filterTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-sm ${
                      selectedTag === tag 
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700" 
                        : "border-sky-200 hover:bg-sky-50"
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Results Summary */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="py-6 bg-gradient-to-r from-sky-50 to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredCategories.length} Categor{filteredCategories.length !== 1 ? 'ies' : 'y'} Available
                </h2>
                {searchQuery && (
                  <Badge variant="outline" className="text-sky-600 border-sky-300">
                    "{searchQuery}"
                  </Badge>
                )}
                {selectedTag !== "All" && (
                  <Badge className="bg-sky-500 text-white">
                    {selectedTag}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-sky-500" />
                  <span>All categories verified</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Categories Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="py-12 bg-gradient-to-br from-slate-50 via-white to-sky-50/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCategories.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredCategories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </motion.div>
            ) : (
              /* No Results */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("All");
                  }}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Featured Categories Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 bg-gradient-to-r from-sky-600 to-blue-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Most Popular Categories
              </h2>
              <p className="text-xl text-sky-100">
                Discover what Zambian customers love most
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {allCategories.filter(cat => cat.featured).slice(0, 4).map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Link href={`/marketplace/categories/${category.slug}`}>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                        <p className="text-sky-100 text-sm mb-4">{category.productCount.toLocaleString()} products</p>
                        <Badge className="bg-white/20 text-white border-white/30">
                          Popular
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-4 rounded-xl font-semibold"
              >
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 bg-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Can't Find Your Category?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always expanding our marketplace. Suggest a new category or become a vendor!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold"
                asChild
              >
                <Link href="/contact">
                  Suggest Category
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-sky-300 text-sky-600 hover:bg-sky-50 px-8 py-4 rounded-xl font-semibold"
                asChild
              >
                <Link href="/signup?role=retailer">
                  Become a Vendor
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </motion.div>
  );
}

export default function CategoriesPage() {
  return <CategoriesPageContent />;
}
