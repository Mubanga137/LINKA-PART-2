'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera, 
  Gamepad2, 
  Monitor, 
  Tablet, 
  Watch,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Star,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Shield,
  Clock,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const electronicCategories = [
  {
    name: 'Smartphones & Accessories',
    icon: Smartphone,
    demand: 95,
    avgPrice: 2500,
    topBrands: ['Samsung', 'iPhone', 'Tecno', 'Infinix'],
    features: ['Warranty Tracking', 'IMEI Management', 'Accessory Bundles', 'Trade-in Options']
  },
  {
    name: 'Laptops & Computers',
    icon: Laptop,
    demand: 87,
    avgPrice: 4500,
    topBrands: ['HP', 'Dell', 'Lenovo', 'Acer'],
    features: ['Spec Comparison', 'Custom Builds', 'Tech Support', 'Software Packages']
  },
  {
    name: 'Audio & Headphones',
    icon: Headphones,
    demand: 78,
    avgPrice: 800,
    topBrands: ['Sony', 'JBL', 'Beats', 'Bose'],
    features: ['Sound Quality Tests', 'Compatibility Check', 'Wireless Setup', 'Audio Profiles']
  },
  {
    name: 'Cameras & Photography',
    icon: Camera,
    demand: 65,
    avgPrice: 3200,
    topBrands: ['Canon', 'Nikon', 'Sony', 'Fujifilm'],
    features: ['Lens Compatibility', 'Photography Tips', 'Equipment Bundles', 'Professional Support']
  },
  {
    name: 'Gaming & Entertainment',
    icon: Gamepad2,
    demand: 82,
    avgPrice: 1800,
    topBrands: ['PlayStation', 'Xbox', 'Nintendo', 'PC Gaming'],
    features: ['Game Library', 'Performance Specs', 'Multiplayer Setup', 'Gaming Communities']
  },
  {
    name: 'Smart Home & IoT',
    icon: Monitor,
    demand: 71,
    avgPrice: 1200,
    topBrands: ['Xiaomi', 'TP-Link', 'Google', 'Amazon'],
    features: ['Home Integration', 'Setup Assistance', 'App Configuration', 'Security Features']
  }
];

const marketInsights = {
  totalMarketSize: 'K890M',
  yearlyGrowth: '+42%',
  topSellingMonth: 'December',
  peakHours: '6PM - 9PM',
  customerAge: '18-35 years',
  paymentMethod: 'Mobile Money (67%)'
};

const sellingTips = [
  {
    icon: Target,
    title: 'Product Photography',
    description: 'High-quality images increase sales by 300%. Show multiple angles and include packaging.',
    priority: 'High'
  },
  {
    icon: Star,
    title: 'Customer Reviews',
    description: 'Encourage satisfied customers to leave reviews. 5-star products sell 5x faster.',
    priority: 'High'
  },
  {
    icon: Zap,
    title: 'Quick Response',
    description: 'Respond to customer inquiries within 2 hours to improve conversion rates.',
    priority: 'Medium'
  },
  {
    icon: Shield,
    title: 'Warranty Information',
    description: 'Clearly display warranty terms and return policies to build customer trust.',
    priority: 'Medium'
  },
  {
    icon: Package,
    title: 'Bundle Deals',
    description: 'Create accessory bundles (phone + case + charger) to increase average order value.',
    priority: 'High'
  },
  {
    icon: Clock,
    title: 'Inventory Management',
    description: 'Keep popular items in stock, especially during peak shopping seasons.',
    priority: 'Medium'
  }
];

const competitorAnalysis = [
  {
    name: 'TechMart Zambia',
    category: 'Multi-brand Electronics',
    strength: 'Wide product range',
    weakness: 'Higher prices',
    opportunity: 'Better customer service'
  },
  {
    name: 'Mobile Hub',
    category: 'Smartphones Specialist',
    strength: 'Latest models',
    weakness: 'Limited accessories',
    opportunity: 'Accessory bundling'
  },
  {
    name: 'Computer Corner',
    category: 'Laptops & PCs',
    strength: 'Technical expertise',
    weakness: 'Limited online presence',
    opportunity: 'Online market capture'
  }
];

export default function ElectronicsIndustryPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Smartphone className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Electronics & Technology
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive tools and insights for electronics retailers in Zambia
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                +42% Industry Growth
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                1,240 Active Retailers
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <DollarSign className="h-4 w-4 mr-2" />
                K890M Market Size
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="categories" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="categories">Product Categories</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
            <TabsTrigger value="tips">Selling Tips</TabsTrigger>
            <TabsTrigger value="competitors">Competition</TabsTrigger>
          </TabsList>

          {/* Product Categories */}
          <TabsContent value="categories" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Electronics Categories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore different electronics categories and their specific features on Linka
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {electronicCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedCategory === index ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedCategory(index)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge className={`${category.demand >= 80 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {category.demand}% demand
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Avg. Price</span>
                        <span className="font-semibold">K{category.avgPrice}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600">Market Demand</span>
                        <Progress value={category.demand} className="mt-2" />
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600 block mb-2">Top Brands</span>
                        <div className="flex flex-wrap gap-1">
                          {category.topBrands.map((brand, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600 block mb-2">Special Features</span>
                        <div className="space-y-1">
                          {category.features.slice(0, 2).map((feature, i) => (
                            <div key={i} className="flex items-center text-xs text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Category Details */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <electronicCategories[selectedCategory].icon className="h-6 w-6 mr-3 text-blue-600" />
                  {electronicCategories[selectedCategory].name} - Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {electronicCategories[selectedCategory].features.map((feature, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-gray-900">{feature}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Specialized tool for {electronicCategories[selectedCategory].name.toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Insights */}
          <TabsContent value="insights" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Electronics Market Insights
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Data-driven insights to help you make informed business decisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <Badge className="bg-green-100 text-green-700">Growing</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {marketInsights.totalMarketSize}
                  </h3>
                  <p className="text-gray-600">Total Market Size</p>
                  <div className="mt-4 text-sm text-green-600 font-medium">
                    {marketInsights.yearlyGrowth} yearly growth
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {marketInsights.customerAge}
                  </h3>
                  <p className="text-gray-600">Primary Customer Age</p>
                  <div className="mt-4 text-sm text-blue-600 font-medium">
                    Tech-savvy demographic
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">Peak</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {marketInsights.topSellingMonth}
                  </h3>
                  <p className="text-gray-600">Top Selling Month</p>
                  <div className="mt-4 text-sm text-purple-600 font-medium">
                    Holiday season boost
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">Optimal</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {marketInsights.peakHours}
                  </h3>
                  <p className="text-gray-600">Peak Shopping Hours</p>
                  <div className="mt-4 text-sm text-orange-600 font-medium">
                    Evening rush hour
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-indigo-600" />
                    </div>
                    <Badge className="bg-indigo-100 text-indigo-700">Preferred</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    67%
                  </h3>
                  <p className="text-gray-600">Mobile Money Usage</p>
                  <div className="mt-4 text-sm text-indigo-600 font-medium">
                    MTN Money leads
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-red-600" />
                    </div>
                    <Badge className="bg-red-100 text-red-700">Trending</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    +28%
                  </h3>
                  <p className="text-gray-600">Monthly Growth Rate</p>
                  <div className="mt-4 text-sm text-red-600 font-medium">
                    Fastest growing sector
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Selling Tips */}
          <TabsContent value="tips" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Electronics Selling Tips
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Expert advice to maximize your electronics sales on Linka
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sellingTips.map((tip, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900">
                            {tip.title}
                          </h3>
                          <Badge className={`${
                            tip.priority === 'High' ? 'bg-red-100 text-red-700' :
                            tip.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {tip.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Competition Analysis */}
          <TabsContent value="competitors" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Competitive Landscape
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Understanding your competition to identify opportunities
              </p>
            </div>

            <div className="space-y-6">
              {competitorAnalysis.map((competitor, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {competitor.name}
                        </h3>
                        <Badge variant="outline">{competitor.category}</Badge>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-green-600 mb-2">Strength</h4>
                        <p className="text-gray-700">{competitor.strength}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-red-600 mb-2">Weakness</h4>
                        <p className="text-gray-700">{competitor.weakness}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 mb-2">Your Opportunity</h4>
                        <p className="text-gray-700">{competitor.opportunity}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Selling Electronics?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join 1,240+ electronics retailers already succeeding on Linka
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login/retailer">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Start Your Electronics Store
                  </Button>
                </Link>
                <Link href="/retailer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Back to Industries
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}