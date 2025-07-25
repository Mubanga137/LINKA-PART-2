"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Palette,
  Shirt,
  Coffee,
  Home,
  Gem,
  Music,
  Hammer,
  Leaf,
  ArrowRight,
  Users,
  TrendingUp,
  Star,
  Package,
  Truck,
} from "lucide-react"
import Link from "next/link"

const industries = [
  {
    id: 1,
    name: "Traditional Crafts",
    icon: Palette,
    description: "Authentic Zambian crafts, wood carvings, and cultural artifacts",
    retailers: 45,
    growth: "+23%",
    rating: 4.9,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    stats: { products: "1,200+", sales: "ZMW 450K" },
    features: ["Handmade Items", "Cultural Heritage", "Export Quality"],
  },
  {
    id: 2,
    name: "Fashion & Textiles",
    icon: Shirt,
    description: "Chitenge fabrics, modern clothing, and traditional wear",
    retailers: 67,
    growth: "+31%",
    rating: 4.8,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    stats: { products: "2,100+", sales: "ZMW 780K" },
    features: ["Custom Designs", "Quality Fabrics", "Fast Delivery"],
  },
  {
    id: 3,
    name: "Food & Beverages",
    icon: Coffee,
    description: "Local spices, organic honey, traditional foods, and beverages",
    retailers: 89,
    growth: "+45%",
    rating: 4.7,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    stats: { products: "1,800+", sales: "ZMW 620K" },
    features: ["Organic Products", "Local Sourcing", "Fresh Quality"],
  },
  {
    id: 4,
    name: "Home & Decor",
    icon: Home,
    description: "Furniture, home accessories, and interior decoration items",
    retailers: 34,
    growth: "+18%",
    rating: 4.6,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    stats: { products: "950+", sales: "ZMW 340K" },
    features: ["Modern Designs", "Durable Materials", "Custom Orders"],
  },
  {
    id: 5,
    name: "Jewelry & Accessories",
    icon: Gem,
    description: "Handcrafted jewelry, copper accessories, and precious stones",
    retailers: 28,
    growth: "+27%",
    rating: 4.9,
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-50",
    stats: { products: "680+", sales: "ZMW 290K" },
    features: ["Precious Metals", "Custom Jewelry", "Certified Quality"],
  },
  {
    id: 6,
    name: "Art & Culture",
    icon: Music,
    description: "Musical instruments, paintings, and cultural art pieces",
    retailers: 19,
    growth: "+15%",
    rating: 4.8,
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
    stats: { products: "420+", sales: "ZMW 180K" },
    features: ["Original Art", "Cultural Items", "Artist Support"],
  },
  {
    id: 7,
    name: "Tools & Hardware",
    icon: Hammer,
    description: "Quality tools, hardware supplies, and construction materials",
    retailers: 23,
    growth: "+12%",
    rating: 4.5,
    gradient: "from-slate-500 to-gray-600",
    bgGradient: "from-slate-50 to-gray-50",
    stats: { products: "1,100+", sales: "ZMW 520K" },
    features: ["Professional Tools", "Bulk Orders", "Warranty Support"],
  },
  {
    id: 8,
    name: "Agriculture & Natural",
    icon: Leaf,
    description: "Seeds, farming supplies, natural products, and organic goods",
    retailers: 41,
    growth: "+38%",
    rating: 4.7,
    gradient: "from-lime-500 to-green-600",
    bgGradient: "from-lime-50 to-green-50",
    stats: { products: "1,350+", sales: "ZMW 410K" },
    features: ["Organic Certified", "Seasonal Products", "Farmer Direct"],
  },
  {
    id: 10,
    name: "Wholesale",
    icon: Package,
    description: "Bulk products, B2B marketplace, and wholesale distribution",
    retailers: 78,
    growth: "+42%",
    rating: 4.8,
    gradient: "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-50 to-blue-50",
    stats: { products: "3,200+", sales: "ZMW 1.2M" },
    features: ["Bulk Pricing", "B2B Network", "Volume Discounts"],
  },
  {
    id: 11,
    name: "Transport",
    icon: Truck,
    description: "Logistics, delivery services, and transportation solutions",
    retailers: 45,
    growth: "+28%",
    rating: 4.6,
    gradient: "from-teal-500 to-emerald-600",
    bgGradient: "from-teal-50 to-emerald-50",
    stats: { providers: "120+", routes: "50+" },
    features: ["Same-day Delivery", "Nationwide Coverage", "Real-time Tracking"],
  },
  {
    id: 9,
    name: "Entertainment",
    icon: Music,
    description: "Digital content, live performances, gaming, and creator services",
    retailers: 156,
    growth: "+67%",
    rating: 4.9,
    gradient: "from-pink-500 to-purple-600",
    bgColor: "from-pink-50 to-purple-50",
    stats: { products: "2,500+", sales: "ZMW 890K" },
    features: ["Live Streaming", "Creator Tools", "Digital Content"],
  },
]

export function IndustriesGrid() {
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Industries We{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Serve</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Supporting diverse sectors of the Zambian economy with tailored e-commerce solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => {
            if (industry.id === 4) {
              return (
                <Link href="/industries/home-decor" key={4}>
                  <Card
                    className={`group cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden ${
                      selectedIndustry === 4
                        ? "ring-2 ring-purple-500 shadow-2xl"
                        : "hover:shadow-2xl hover:shadow-slate-900/10"
                    }`}
                    style={{ animationDelay: `${3 * 100}ms` }}
                    onClick={() => setSelectedIndustry(selectedIndustry === 4 ? null : 4)}
                    onMouseEnter={() => setHoveredCard(4)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-6 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden`}>
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 rounded-full animate-float"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/20 rounded-full animate-bounce-slow"></div>
                        </div>

                        <div className="relative z-10">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                          >
                            <Home className="h-8 w-8 text-white group-hover:animate-bounce" />
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                            Home & Decor
                          </h3>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">34 retailers</span>
                            <span className="text-emerald-600 font-bold flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              +18%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-slate-600 mb-4 leading-relaxed group-hover:text-slate-800 transition-colors">
                          Furniture, home accessories, and interior decoration items
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                            <div className="font-bold text-slate-900">950+</div>
                            <div className="text-xs text-slate-500">Products</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                            <div className="font-bold text-slate-900">ZMW 340K</div>
                            <div className="text-xs text-slate-500">Monthly Sales</div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:animate-spin transition-all duration-300" />
                            <span className="ml-1 text-sm font-bold text-slate-900">4.6</span>
                          </div>
                          <div className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group-hover:scale-110 transition-all flex items-center">
                            <span className="mr-1">Explore</span>
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Expandable Features */}
                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            selectedIndustry === 4 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="border-t border-slate-200 pt-4">
                            <h4 className="font-semibold text-slate-900 mb-2">Key Features:</h4>
                            <div className="space-y-2">
                              {["Modern Designs", "Durable Materials", "Custom Orders"].map((feature, idx) => (
                                <div key={idx} className="flex items-center text-sm text-slate-600">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out ${
                              hoveredCard === 4 ? "w-full" : "w-0"
                            }`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            }
            if (industry.id === 9) {
              return (
                <Link href="/industries/entertainment" key={9}>
                  <Card
                    className={`group cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden ${
                      selectedIndustry === 9
                        ? "ring-2 ring-purple-500 shadow-2xl"
                        : "hover:shadow-2xl hover:shadow-slate-900/10"
                    }`}
                    style={{ animationDelay: `${8 * 100}ms` }}
                    onClick={() => setSelectedIndustry(selectedIndustry === 9 ? null : 9)}
                    onMouseEnter={() => setHoveredCard(9)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-6 bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden`}>
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 rounded-full animate-float"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/20 rounded-full animate-bounce-slow"></div>
                        </div>

                        <div className="relative z-10">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                          >
                            <Music className="h-8 w-8 text-white group-hover:animate-bounce" />
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                            Entertainment
                          </h3>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">156 creators</span>
                            <span className="text-emerald-600 font-bold flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              +67%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-slate-600 mb-4 leading-relaxed group-hover:text-slate-800 transition-colors">
                          Digital content, live performances, gaming, and creator services
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                            <div className="font-bold text-slate-900">2,500+</div>
                            <div className="text-xs text-slate-500">Content</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                            <div className="font-bold text-slate-900">ZMW 890K</div>
                            <div className="text-xs text-slate-500">Monthly Revenue</div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:animate-spin transition-all duration-300" />
                            <span className="ml-1 text-sm font-bold text-slate-900">4.9</span>
                          </div>
                          <div className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 group-hover:scale-110 transition-all flex items-center">
                            <span className="mr-1">Explore</span>
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Expandable Features */}
                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            selectedIndustry === 9 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="border-t border-slate-200 pt-4">
                            <h4 className="font-semibold text-slate-900 mb-2">Key Features:</h4>
                            <div className="space-y-2">
                              {["Live Streaming", "Creator Tools", "Digital Content"].map((feature, idx) => (
                                <div key={idx} className="flex items-center text-sm text-slate-600">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-1000 ease-out ${
                              hoveredCard === 9 ? "w-full" : "w-0"
                            }`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            }
            const getIndustryLink = (industryName: string) => {
              switch (industryName) {
                case "Traditional Crafts":
                  return "/categories/traditional-crafts"
                case "Fashion & Textiles":
                  return "/categories/fashion-textiles"
                case "Food & Beverages":
                  return "/categories/food-beverages"
                case "Jewelry & Accessories":
                  return "/categories/jewelry-accessories"
                case "Art & Culture":
                  return "/categories/art-culture"
                case "Tools & Hardware":
                  return "/categories/tools-hardware"
                case "Agriculture & Natural":
                  return "/categories/agriculture-natural"
                case "Wholesale":
                  return "/industries/wholesale"
                case "Transport":
                  return "/industries/transport"
                default:
                  return "#"
              }
            }

            return (
              <Link href={getIndustryLink(industry.name)} key={industry.id}>
                <Card
                  className={`group cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden ${
                    selectedIndustry === industry.id
                      ? "ring-2 ring-purple-500 shadow-2xl"
                      : "hover:shadow-2xl hover:shadow-slate-900/10"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedIndustry(selectedIndustry === industry.id ? null : industry.id)}
                  onMouseEnter={() => setHoveredCard(industry.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${industry.bgGradient} relative overflow-hidden`}>
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 rounded-full animate-float"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/20 rounded-full animate-bounce-slow"></div>
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${industry.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <industry.icon className="h-8 w-8 text-white group-hover:animate-bounce" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {industry.name}
                      </h3>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{industry.retailers} retailers</span>
                        <span className="text-emerald-600 font-bold flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {industry.growth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-slate-600 mb-4 leading-relaxed group-hover:text-slate-800 transition-colors">
                      {industry.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                        <div className="font-bold text-slate-900">
                          {industry.stats.products || industry.stats.providers || "N/A"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {industry.stats.products ? "Products" : "Providers"}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                        <div className="font-bold text-slate-900">
                          {industry.stats.sales || industry.stats.routes || "N/A"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {industry.stats.sales ? "Monthly Sales" : "Routes"}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:animate-spin transition-all duration-300" />
                        <span className="ml-1 text-sm font-bold text-slate-900">{industry.rating}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 group-hover:scale-110 transition-all"
                      >
                        Explore
                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Expandable Features */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        selectedIndustry === industry.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-slate-200 pt-4">
                        <h4 className="font-semibold text-slate-900 mb-2">Key Features:</h4>
                        <div className="space-y-2">
                          {industry.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-slate-600">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${industry.gradient} transition-all duration-1000 ease-out ${
                          hoveredCard === industry.id ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-8 py-4 text-purple-700 border border-purple-200/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Users className="mr-3 h-6 w-6 group-hover:animate-bounce" />
            <span className="text-lg font-medium">Join 300+ retailers across all industries</span>
          </div>
        </div>
      </div>
    </section>
  )
}
