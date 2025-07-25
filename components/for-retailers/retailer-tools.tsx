"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Smartphone,
  CreditCard,
  Package,
  Users,
  Settings,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Camera,
  MessageSquare,
  Bell,
  Target,
  Calendar,
  FileText,
  PieChart,
  DollarSign,
} from "lucide-react"

const toolCategories = [
  {
    id: "dashboard",
    label: "Dashboard & Analytics",
    icon: BarChart3,
    color: "emerald",
  },
  {
    id: "products",
    label: "Product Management",
    icon: Package,
    color: "blue",
  },
  {
    id: "sales",
    label: "Sales & Payments",
    icon: CreditCard,
    color: "purple",
  },
  {
    id: "marketing",
    label: "Marketing Tools",
    icon: Target,
    color: "orange",
  },
]

const tools = {
  dashboard: [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track sales, visitors, and performance metrics in real-time with beautiful charts and insights.",
      features: ["Live sales tracking", "Customer analytics", "Revenue forecasting", "Performance metrics"],
      gradient: "from-emerald-500 to-green-600",
    },
    {
      icon: PieChart,
      title: "Business Intelligence",
      description: "Advanced reports and insights to help you make data-driven business decisions.",
      features: ["Custom reports", "Market trends", "Competitor analysis", "Growth insights"],
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Monitor your business growth with comprehensive KPI tracking and goal setting.",
      features: ["Goal setting", "Progress tracking", "Growth metrics", "Benchmarking"],
      gradient: "from-purple-500 to-pink-600",
    },
  ],
  products: [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Manage your entire product catalog with ease. Track stock levels and get low-stock alerts.",
      features: ["Bulk product upload", "Stock tracking", "Low stock alerts", "Product variants"],
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Camera,
      title: "Product Photography",
      description: "Professional product photo editing tools and templates to make your products shine.",
      features: ["Photo editing", "Background removal", "Templates", "Bulk processing"],
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: Settings,
      title: "Catalog Optimization",
      description: "AI-powered tools to optimize your product listings for maximum visibility and sales.",
      features: ["SEO optimization", "Price suggestions", "Category matching", "Description enhancement"],
      gradient: "from-orange-500 to-red-600",
    },
  ],
  sales: [
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Accept payments through multiple channels with instant settlement to your account.",
      features: ["Mobile money", "Bank transfers", "Cash on delivery", "International payments"],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: DollarSign,
      title: "Pricing Tools",
      description: "Dynamic pricing strategies and competitive analysis to maximize your profits.",
      features: ["Dynamic pricing", "Competitor tracking", "Profit optimization", "Discount management"],
      gradient: "from-emerald-500 to-green-600",
    },
    {
      icon: FileText,
      title: "Order Management",
      description: "Streamlined order processing from purchase to delivery with automated workflows.",
      features: ["Order tracking", "Automated emails", "Delivery management", "Returns handling"],
      gradient: "from-blue-500 to-indigo-600",
    },
  ],
  marketing: [
    {
      icon: Target,
      title: "Targeted Advertising",
      description: "Reach the right customers with our built-in advertising platform and targeting tools.",
      features: ["Audience targeting", "Ad creation", "Performance tracking", "Budget optimization"],
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: MessageSquare,
      title: "Customer Communication",
      description: "Built-in messaging system to communicate with customers and provide excellent support.",
      features: ["Live chat", "WhatsApp integration", "Email campaigns", "Automated responses"],
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Bell,
      title: "Promotional Tools",
      description: "Create and manage promotions, discounts, and special offers to boost your sales.",
      features: ["Discount codes", "Flash sales", "Bundle offers", "Loyalty programs"],
      gradient: "from-purple-500 to-pink-600",
    },
  ],
}

export function RetailerTools() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-3 text-blue-700 border border-blue-200/50 mb-6">
            <Zap className="mr-2 h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Powerful Tools</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Everything You Need in
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Access a comprehensive suite of tools designed specifically for Zambian retailers. 
            No need for multiple platforms - we've got you covered.
          </p>
        </div>

        {/* Tools Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 gap-4 bg-transparent h-auto p-0">
            {toolCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={`flex flex-col items-center space-y-3 p-6 rounded-2xl border-2 transition-all duration-300 data-[state=active]:border-${category.color}-500 data-[state=active]:bg-${category.color}-50 data-[state=active]:shadow-lg hover:shadow-md bg-white/80 backdrop-blur-sm border-white/30`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-2xl flex items-center justify-center shadow-lg`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-slate-900 text-center">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tool Content */}
          {Object.entries(tools).map(([categoryId, categoryTools]) => (
            <TabsContent key={categoryId} value={categoryId} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryTools.map((tool, index) => (
                  <Card
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                    <CardContent className="p-8">
                      {/* Tool Icon */}
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <tool.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Tool Info */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800">
                        {tool.title}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-6">
                        {tool.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-slate-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-slate-50 transition-colors"
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Platform Integration */}
        <div className="mt-20">
          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Mobile-First Platform</h3>
                <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  All tools are optimized for mobile devices, so you can manage your business 
                  anytime, anywhere. Perfect for the Zambian market where mobile is king.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Globe, label: "Web Dashboard" },
                    { icon: Smartphone, label: "Mobile App" },
                    { icon: Shield, label: "Offline Mode" },
                    { icon: Users, label: "Multi-user Access" },
                  ].map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-medium text-emerald-100">{feature.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
