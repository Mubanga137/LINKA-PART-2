'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  BarChart3, 
  Package, 
  MessageSquare,
  Clock,
  Shield,
  Star,
  Globe,
  Smartphone,
  CreditCard,
  Truck,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Award,
  Settings,
  PieChart,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Industry-specific data
const industries = [
  {
    id: 'electronics',
    name: 'Electronics & Technology',
    icon: Smartphone,
    description: 'Sell phones, computers, gadgets, and tech accessories',
    features: ['Warranty Management', 'Tech Support Integration', 'Product Specifications', 'Repair Services'],
    growth: '+45%',
    retailers: 1240
  },
  {
    id: 'fashion',
    name: 'Fashion & Textiles',
    icon: Store,
    description: 'Traditional and modern clothing, accessories, and textiles',
    features: ['Size Guides', 'Style Recommendations', 'Custom Tailoring', 'Seasonal Collections'],
    growth: '+38%',
    retailers: 2100
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Food',
    icon: Package,
    description: 'Fresh produce, processed foods, and agricultural supplies',
    features: ['Freshness Tracking', 'Seasonal Planning', 'Bulk Orders', 'Farm-to-Table'],
    growth: '+52%',
    retailers: 890
  },
  {
    id: 'services',
    name: 'Professional Services',
    icon: Users,
    description: 'Consulting, repairs, maintenance, and professional services',
    features: ['Appointment Booking', 'Service Packages', 'Client Management', 'Portfolio Showcase'],
    growth: '+41%',
    retailers: 670
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: Shield,
    description: 'Healthcare services, wellness products, and medical supplies',
    features: ['Health Records', 'Prescription Management', 'Consultation Booking', 'Wellness Plans'],
    growth: '+35%',
    retailers: 445
  },
  {
    id: 'automotive',
    name: 'Automotive & Transport',
    icon: Truck,
    description: 'Vehicle sales, parts, maintenance, and transport services',
    features: ['Vehicle History', 'Parts Catalog', 'Service Scheduling', 'Fleet Management'],
    growth: '+29%',
    retailers: 325
  }
];

const features = [
  {
    icon: TrendingUp,
    title: 'Smart Analytics',
    description: 'Advanced insights into your sales, customers, and market trends'
  },
  {
    icon: Smartphone,
    title: 'Mobile Money Integration',
    description: 'Accept MTN Money, Airtel Money, and other local payment methods'
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Serve customers in English, Bemba, Nyanja, and Tonga'
  },
  {
    icon: Shield,
    title: 'Secure & Verified',
    description: 'Business verification and secure payment processing'
  },
  {
    icon: MessageSquare,
    title: 'Customer Communication',
    description: 'Built-in messaging and customer support tools'
  },
  {
    icon: Zap,
    title: 'Quick Setup',
    description: 'Get your store online in minutes with our easy setup process'
  }
];

const testimonials = [
  {
    name: 'Chanda Mwamba',
    business: 'Lusaka Electronics Hub',
    industry: 'Electronics',
    content: 'Linka helped us reach customers across Zambia. Our sales increased by 300% in just 6 months!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Grace Banda',
    business: 'Traditional Textiles Co.',
    industry: 'Fashion',
    content: 'The platform is perfect for showcasing our traditional Zambian clothing. Orders come in daily!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b524?w=100&h=100&fit=crop'
  },
  {
    name: 'Joseph Mutale',
    business: 'Fresh Valley Farms',
    industry: 'Agriculture',
    content: 'Direct connection with customers means better prices for our fresh produce. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

const stats = [
  { label: 'Active Retailers', value: '5,670+', growth: '+42% this year' },
  { label: 'Daily Transactions', value: 'K2.8M+', growth: '+65% this month' },
  { label: 'Customer Reach', value: '450K+', growth: 'All 10 provinces' },
  { label: 'Success Rate', value: '98.5%', growth: 'Customer satisfaction' }
];

export default function RetailerHomepage() {
  const [selectedIndustry, setSelectedIndustry] = useState('electronics');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🚀 Trusted by 5,670+ Zambian Businesses
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Grow Your Business with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Linka Retailer
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join Zambia's fastest-growing e-commerce platform. Reach more customers, 
              increase sales, and grow your business with powerful tools designed for local retailers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/login/retailer">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all">
                  <Store className="mr-2 h-5 w-5" />
                  Start Selling Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 text-sm font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-blue-300">
                    {stat.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry-Specific Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized tools and features designed for your specific industry needs
            </p>
          </div>

          <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full h-auto">
              {industries.map((industry) => (
                <TabsTrigger 
                  key={industry.id} 
                  value={industry.id}
                  className="flex flex-col items-center p-4 h-auto data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <industry.icon className="h-6 w-6 mb-2" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {industry.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {industries.map((industry) => (
              <TabsContent key={industry.id} value={industry.id} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                        <industry.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{industry.name}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className="bg-green-100 text-green-700">
                            {industry.growth} growth
                          </Badge>
                          <span className="text-gray-500">
                            {industry.retailers} active retailers
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xl text-gray-600 mb-8">
                      {industry.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {industry.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href={`/retailer/industries/${industry.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Learn More About {industry.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Industry Dashboard</h4>
                        <Badge className="bg-blue-100 text-blue-700">{industry.name}</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Monthly Sales</span>
                          <span className="font-semibold text-green-600">+{industry.growth}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Active Products</span>
                          <span className="font-semibold">247</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Customer Rating</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="font-semibold">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        K{(Math.random() * 50 + 20).toFixed(1)}k
                      </div>
                      <div className="text-gray-600">Average Monthly Revenue</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and features designed specifically for Zambian businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from Zambian Retailers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how businesses like yours are thriving on Linka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">{testimonial.business}</p>
                      <Badge variant="outline" className="mt-1">
                        {testimonial.industry}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed font-bold">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Growing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful Zambian businesses already selling on Linka
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login/retailer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Store className="mr-2 h-5 w-5" />
                Start Your Free Store
              </Button>
            </Link>
            <Link href="/for-retailers">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
          
          <p className="text-blue-200 text-sm mt-6">
            Free setup • No monthly fees • Start selling in minutes
          </p>
        </div>
      </section>
    </div>
  );
}
