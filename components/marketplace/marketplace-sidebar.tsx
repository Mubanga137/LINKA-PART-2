"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  MapPin,
  Star,
  Truck,
  Zap,
  TrendingUp,
  Grid3X3,
  List,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Crown,
  Flame,
  Package,
  Shield,
  Clock,
  Heart,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Gift,
  Percent,
  Tags,
  RefreshCw,
  Search
} from "lucide-react";
import Link from "next/link";

interface MarketplaceSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange?: (filters: any) => void;
}

export function MarketplaceSidebar({ isOpen, onClose, onFilterChange }: MarketplaceSidebarProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Collapsible states
  const [quickAccessOpen, setQuickAccessOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const quickAccessItems = [
    {
      icon: Star,
      label: "Featured",
      description: "Handpicked premium items",
      href: "/marketplace/featured",
      color: "from-yellow-400 to-orange-400",
      bgColor: "from-yellow-50 to-orange-50",
      count: "1.2k+"
    },
    {
      icon: Flame,
      label: "Flash Sale",
      description: "Limited time offers",
      href: "/marketplace/flash-sale",
      color: "from-red-400 to-pink-400",
      bgColor: "from-red-50 to-pink-50",
      count: "Hot",
      isHot: true
    },
    {
      icon: Crown,
      label: "Premium",
      description: "Luxury & exclusive",
      href: "/marketplace/premium",
      color: "from-purple-400 to-indigo-400",
      bgColor: "from-purple-50 to-indigo-50",
      count: "VIP"
    },
    {
      icon: Truck,
      label: "Free Shipping",
      description: "No delivery charges",
      href: "/marketplace/free-shipping",
      color: "from-green-400 to-emerald-400",
      bgColor: "from-green-50 to-emerald-50",
      count: "Save"
    },
    {
      icon: TrendingUp,
      label: "Trending",
      description: "What's popular now",
      href: "/marketplace/trending",
      color: "from-pink-400 to-red-400",
      bgColor: "from-pink-50 to-red-50",
      count: "🔥"
    },
    {
      icon: Package,
      label: "Vendors",
      description: "Trusted sellers",
      href: "/marketplace/vendors",
      color: "from-emerald-400 to-green-400",
      bgColor: "from-emerald-50 to-green-50",
      count: "150+"
    }
  ];

  const filterCategories = [
    {
      icon: MapPin,
      label: "Near Me",
      description: "Products in your area",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Star,
      label: "Top Rated",
      description: "4.5+ star products",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Truck,
      label: "Free Delivery",
      description: "No shipping cost",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      label: "Fast Delivery",
      description: "Same day shipping",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Shield,
      label: "Verified",
      description: "Verified vendors only",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Clock,
      label: "New Arrivals",
      description: "Latest products",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const productCategories = [
    { name: "Electronics", count: 1248, icon: "📱" },
    { name: "Fashion", count: 892, icon: "👕" },
    { name: "Home & Garden", count: 567, icon: "🏠" },
    { name: "Health & Beauty", count: 334, icon: "✨" },
    { name: "Sports & Outdoors", count: 423, icon: "💪" },
    { name: "Books & Media", count: 198, icon: "📚" },
    { name: "Jewelry & Accessories", count: 156, icon: "💎" },
    { name: "Food & Beverages", count: 445, icon: "🍽️" },
    { name: "Traditional Crafts", count: 267, icon: "🎨" }
  ];

  const specialFeatures = [
    { label: "On Sale", icon: Percent },
    { label: "Free Returns", icon: RefreshCw },
    { label: "Gift Cards", icon: Gift },
    { label: "Express Shipping", icon: Zap },
    { label: "Bulk Discounts", icon: Tags },
    { label: "Eco-Friendly", icon: Heart }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setPriceRange([0, 1000]);
    setSearchQuery("");
  };

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-2xl lg:relative lg:z-auto lg:shadow-none lg:w-72 xl:w-80"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Filter className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Marketplace</h2>
                <p className="text-sm text-gray-600">Find exactly what you need</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Quick Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">View Mode</Label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {([
                    { mode: "grid" as const, icon: Grid3X3, label: "Grid" },
                    { mode: "list" as const, icon: List, label: "List" }
                  ]).map(({ mode, icon: Icon, label }) => (
                    <Button
                      key={mode}
                      variant={viewMode === mode ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode(mode)}
                      className={`flex-1 ${
                        viewMode === mode
                          ? "bg-white shadow-sm"
                          : "hover:bg-white/50"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <Collapsible open={quickAccessOpen} onOpenChange={setQuickAccessOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-semibold text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      Quick Access
                    </div>
                    {quickAccessOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-3">
                  {quickAccessItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href={item.href}>
                        <div className={`
                          relative overflow-hidden rounded-xl p-3 cursor-pointer
                          bg-gradient-to-r ${item.bgColor}
                          border border-gray-200 hover:border-gray-300
                          transition-all duration-300 hover:shadow-md
                          group
                        `}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-8 h-8 bg-gradient-to-r ${item.color}
                                rounded-lg flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300
                              `}>
                                <item.icon className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-gray-900 text-sm">
                                    {item.label}
                                  </h4>
                                  {item.isHot && (
                                    <Badge className="bg-red-500 text-white text-xs px-1 py-0 animate-pulse">
                                      HOT
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="text-xs">
                                {item.count}
                              </Badge>
                              <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Filter Categories */}
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-semibold text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-blue-500" />
                      Filters
                      {selectedFilters.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedFilters.length}
                        </Badge>
                      )}
                    </div>
                    {filtersOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-3">
                  {selectedFilters.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="w-full text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear All
                    </Button>
                  )}
                  {filterCategories.map((filter, index) => (
                    <motion.div
                      key={filter.label}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        variant={selectedFilters.includes(filter.label) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter(filter.label)}
                        className={`
                          w-full justify-start h-auto py-3 px-3
                          ${selectedFilters.includes(filter.label)
                            ? `bg-gradient-to-r ${filter.color} text-white border-0`
                            : "hover:bg-gray-50"
                          }
                        `}
                      >
                        <filter.icon className="h-4 w-4 mr-3" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{filter.label}</div>
                          <div className={`text-xs ${
                            selectedFilters.includes(filter.label) 
                              ? "text-white/80" 
                              : "text-gray-500"
                          }`}>
                            {filter.description}
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Categories */}
              <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-semibold text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-blue-500" />
                      Categories
                    </div>
                    {categoriesOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-3">
                  {productCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between hover:bg-gray-50 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{category.icon}</span>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </Button>
                    </motion.div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Price Range */}
              <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-semibold text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Tags className="h-4 w-4 text-blue-500" />
                      Price Range
                    </div>
                    {priceOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>K{priceRange[0]}</span>
                      <span>K{priceRange[1]}</span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">Min</Label>
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Max</Label>
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Special Features */}
              <Collapsible open={featuresOpen} onOpenChange={setFeaturesOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-semibold text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-blue-500" />
                      Special Features
                    </div>
                    {featuresOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    {specialFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Button
                          variant={selectedFilters.includes(feature.label) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter(feature.label)}
                          className="w-full justify-start h-auto py-2 px-2"
                        >
                          <feature.icon className="h-3 w-3 mr-1" />
                          <span className="text-xs">{feature.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Showing {selectedFilters.length > 0 ? "filtered" : "all"} results
              </p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
