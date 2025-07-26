"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Truck,
  BarChart3,
  Users,
  Star,
  MapPin,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Globe,
  Award,
  Zap,
  Shield,
  Calculator,
  Clock,
  TrendingUp,
} from "lucide-react"

const wholesaleCategories = [
  { name: "Food & Beverages", count: 1245, minOrder: "50 units", icon: Package },
  { name: "Textiles & Clothing", count: 856, minOrder: "25 units", icon: Truck },
  { name: "Electronics", count: 432, minOrder: "10 units", icon: Zap },
  { name: "Home & Garden", count: 789, minOrder: "20 units", icon: Globe },
  { name: "Health & Beauty", count: 345, minOrder: "30 units", icon: Star },
  { name: "Tools & Hardware", count: 567, minOrder: "15 units", icon: Shield },
]

const wholesaleProducts = [
  {
    id: 1,
    name: "Premium Maize Flour (Bulk)",
    supplier: "Golden Valley Mills",
    location: "Lusaka",
    unitPrice: 25,
    bulkPrice: 22,
    minOrder: 100,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Food & Beverages",
    packageSize: "25kg bags",
    availability: "In Stock",
    leadTime: "2-3 days",
    badge: "Best Seller",
    features: ["Premium Quality", "Certified Processing", "Bulk Discount"],
  },
  {
    id: 2,
    name: "Chitenge Fabric Rolls",
    supplier: "African Textile Wholesalers",
    location: "Ndola",
    unitPrice: 45,
    bulkPrice: 38,
    minOrder: 50,
    rating: 4.8,
    reviews: 167,
    image: "/placeholder.svg?height=300&width=300",
    category: "Textiles",
    packageSize: "6-yard rolls",
    availability: "In Stock",
    leadTime: "1-2 days",
    badge: "Authentic",
    features: ["100% Cotton", "Traditional Patterns", "Bulk Pricing"],
  },
  {
    id: 3,
    name: "Solar LED Lights (Bulk Pack)",
    supplier: "Bright Future Electronics",
    location: "Kitwe",
    unitPrice: 85,
    bulkPrice: 72,
    minOrder: 20,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    packageSize: "Individual units",
    availability: "Limited Stock",
    leadTime: "5-7 days",
    badge: "Energy Efficient",
    features: ["Solar Powered", "Long Battery Life", "Weather Resistant"],
  },
  {
    id: 4,
    name: "Agricultural Tools Set",
    supplier: "Farm Equipment Suppliers",
    location: "Kabwe",
    unitPrice: 120,
    bulkPrice: 105,
    minOrder: 15,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tools",
    packageSize: "5-piece set",
    availability: "In Stock", 
    leadTime: "3-5 days",
    badge: "Durable",
    features: ["High Quality Steel", "Ergonomic Handles", "Professional Grade"],
  },
  {
    id: 5,
    name: "Natural Honey (Wholesale)",
    supplier: "Zambian Bee Farms Collective",
    location: "Choma",
    unitPrice: 95,
    bulkPrice: 82,
    minOrder: 30,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Food & Beverages",
    packageSize: "1kg jars",
    availability: "In Stock",
    leadTime: "1-2 days",
    badge: "Pure & Natural",
    features: ["Raw Honey", "No Processing", "Local Sourcing"],
  },
  {
    id: 6,
    name: "Beauty Products Bundle",
    supplier: "Zambia Beauty Wholesale",
    location: "Livingstone",
    unitPrice: 65,
    bulkPrice: 55,
    minOrder: 25,
    rating: 4.5,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300",
    category: "Health & Beauty",
    packageSize: "Mixed bundle",
    availability: "In Stock",
    leadTime: "2-4 days",
    badge: "Popular",
    features: ["Natural Ingredients", "Local Made", "Variety Pack"],
  },
]

const wholesaleFeatures = [
  {
    icon: DollarSign,
    title: "Bulk Pricing",
    description: "Save 15-30% with quantity discounts",
    highlight: "Up to 30% savings",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping on orders over ZMW 2,000",
    highlight: "Free delivery",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Orders processed within 24 hours",
    highlight: "24hr processing",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "All products quality checked",
    highlight: "100% guaranteed",
  },
]

const supplierBenefits = [
  {
    icon: TrendingUp,
    title: "Increase Sales Volume",
    description: "Access to bulk buyers and retailers across Zambia",
  },
  {
    icon: Users,
    title: "B2B Network",
    description: "Connect with verified business customers",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track orders, performance, and customer insights",
  },
  {
    icon: Award,
    title: "Supplier Verification",
    description: "Build trust with verified supplier badge",
  },
]

export default function WholesalePage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"buyer" | "supplier">("buyer")

  const filteredProducts = selectedCategory === "all" 
    ? wholesaleProducts 
    : wholesaleProducts.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-3 text-blue-700 border border-blue-200/50 mb-8">
                <Package className="mr-2 h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Wholesale Marketplace</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Zambia's Premier
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Wholesale Platform
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Connect buyers and suppliers across Zambia. Buy in bulk with competitive pricing 
                or sell wholesale to expand your business reach.
              </p>

              {/* Toggle Buttons */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-2 shadow-lg">
                  <Button
                    variant={viewMode === "buyer" ? "default" : "ghost"}
                    onClick={() => setViewMode("buyer")}
                    className="px-8 py-3 rounded-xl"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    I'm a Buyer
                  </Button>
                  <Button
                    variant={viewMode === "supplier" ? "default" : "ghost"}
                    onClick={() => setViewMode("supplier")}
                    className="px-8 py-3 rounded-xl"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    I'm a Supplier
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  {viewMode === "buyer" ? (
                    <>
                      <ShoppingCart className="mr-3 h-5 w-5" />
                      Browse Wholesale Products
                    </>
                  ) : (
                    <>
                      <Package className="mr-3 h-5 w-5" />
                      Start Selling Wholesale
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              {viewMode === "buyer" ? "Why Buy Wholesale on Linka?" : "Why Sell Wholesale on Linka?"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(viewMode === "buyer" ? wholesaleFeatures : supplierBenefits).map((feature, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                    {feature.highlight && (
                      <Badge className="bg-blue-100 text-blue-700 font-bold">
                        {feature.highlight}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="browse" className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Browse Products
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Categories
                </TabsTrigger>
                <TabsTrigger value="calculator" className="flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  Bulk Calculator
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse">
                {/* Category Filter */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs">All Categories</span>
                  </Button>
                  {wholesaleCategories.slice(0, 5).map((category, index) => (
                    <Button
                      key={index}
                      variant={selectedCategory === category.name.toLowerCase() ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.name.toLowerCase())}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs text-center">{category.name}</span>
                    </Button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Badge */}
                          <Badge className={`absolute top-4 left-4 ${
                            product.badge === "Best Seller" ? "bg-green-500 text-white" :
                            product.badge === "Authentic" ? "bg-blue-500 text-white" :
                            product.badge === "Energy Efficient" ? "bg-purple-500 text-white" :
                            product.badge === "Durable" ? "bg-orange-500 text-white" :
                            product.badge === "Pure & Natural" ? "bg-emerald-500 text-white" :
                            "bg-amber-500 text-white"
                          }`}>
                            {product.badge}
                          </Badge>

                          {/* Availability */}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                            <span className={`text-xs font-medium ${
                              product.availability === "In Stock" ? "text-green-700" : "text-orange-700"
                            }`}>
                              {product.availability}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                            <MapPin className="h-3 w-3" />
                            <span>{product.supplier}</span>
                            <span>•</span>
                            <span>{product.location}</span>
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-600">
                              {product.rating} ({product.reviews} orders)
                            </span>
                          </div>

                          {/* Pricing */}
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <div className="text-slate-600">Unit Price</div>
                              <div className="font-bold text-slate-900">ZMW {product.unitPrice}</div>
                            </div>
                            <div>
                              <div className="text-slate-600">Bulk Price</div>
                              <div className="font-bold text-emerald-600">ZMW {product.bulkPrice}</div>
                            </div>
                          </div>

                          {/* Order Info */}
                          <div className="space-y-1 mb-4 text-sm text-slate-600">
                            <div>Min Order: {product.minOrder} units</div>
                            <div>Package: {product.packageSize}</div>
                            <div>Lead Time: {product.leadTime}</div>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {product.features.slice(0, 2).map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-blue-100 text-blue-700 text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            >
                              Request Quote
                            </Button>
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wholesaleCategories.map((category, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <category.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-900 mb-2">{category.name}</h3>
                            <div className="space-y-1 text-sm text-slate-600 mb-4">
                              <div>{category.count} products available</div>
                              <div>Min order: {category.minOrder}</div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedCategory(category.name.toLowerCase())
                                setActiveTab("browse")
                              }}
                            >
                              Browse Category
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calculator">
                <Card className="bg-white/90 backdrop-blur-sm border-white/30 max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                      Bulk Order Calculator
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Product Unit Price (ZMW)
                        </label>
                        <input
                          type="number"
                          placeholder="25"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          placeholder="100"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bulk Discount (%)
                        </label>
                        <input
                          type="number"
                          placeholder="15"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="bg-blue-50 rounded-lg p-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">ZMW 2,125</div>
                          <div className="text-slate-600 mb-2">Total Cost</div>
                          <div className="text-sm text-green-600 font-medium">
                            You save ZMW 375 (15% discount)
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate Savings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
