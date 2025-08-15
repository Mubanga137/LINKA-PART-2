'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Heart, 
  Users, 
  Smartphone,
  Star,
  Truck,
  ShieldCheck,
  Crown
} from 'lucide-react'

export default function ModernFashionCTA() {
  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Get your fashion in 24-48 hours',
      color: 'text-yellow-500'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Guarantee',
      description: '100% authentic products',
      color: 'text-green-500'
    },
    {
      icon: Heart,
      title: 'Style Curation',
      description: 'Personalized fashion recommendations',
      color: 'text-red-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join 50K+ fashion enthusiasts',
      color: 'text-blue-500'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '500+', label: 'Fashion Brands', icon: Crown },
    { value: '10K+', label: 'Products', icon: Sparkles },
    { value: '4.9', label: 'Average Rating', icon: Star }
  ]

  const benefits = [
    'Exclusive access to limited collections',
    'Free styling consultations',
    'Early access to sales and new arrivals',
    'Personalized size recommendations',
    'Style inspiration and trends',
    'Community of fashion lovers'
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Start Your Fashion Journey
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Perfect Style
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of style-conscious Zambians who've discovered their unique fashion identity with our curated collections and expert styling advice.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 border-2 border-purple-200 hover:border-purple-300"
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Download App
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors mb-4`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index}>
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className="h-5 w-5 text-purple-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits and App Promo */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Why Choose Modern Fashion?</h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="ml-3 text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <Smartphone className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-semibold">Get the App</h3>
            </div>
            <p className="mb-6 opacity-90">
              Download our mobile app for the best fashion shopping experience. Get exclusive app-only deals and early access to new collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 flex-1">
                <span className="mr-2">📱</span>
                App Store
              </Button>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 flex-1">
                <span className="mr-2">🤖</span>
                Google Play
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">Stay in Style</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest fashion trends, styling tips, and exclusive offers delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-purple-500"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Wardrobe?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join the fashion revolution and discover your unique style today.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-3"
          >
            Start Shopping Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
