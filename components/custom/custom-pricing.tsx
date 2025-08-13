'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Clock, Scissors, Palette, Zap } from 'lucide-react'

export default function CustomPricing() {
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'package'>('one-time')

  const pricingTiers = [
    {
      name: 'Basic Alterations',
      description: 'Simple adjustments and modifications',
      price: 'K80',
      originalPrice: null,
      category: 'alterations',
      duration: '1-2 days',
      icon: Scissors,
      color: 'blue',
      features: [
        'Hemming (pants, skirts, dresses)',
        'Taking in or letting out seams',
        'Button replacement',
        'Basic zipper repair',
        'Simple adjustments',
        '1 revision included'
      ],
      popular: false
    },
    {
      name: 'Custom Shirt/Blouse',
      description: 'Tailored shirts and blouses',
      price: 'K250',
      originalPrice: 'K320',
      category: 'custom',
      duration: '5-7 days',
      icon: Palette,
      color: 'green',
      features: [
        'Custom measurements',
        'Choice of fabric and style',
        'Professional consultation',
        'Perfect fit guarantee',
        '2 fittings included',
        '3 revisions included',
        'Quality finishing'
      ],
      popular: true
    },
    {
      name: 'Formal Suit',
      description: 'Complete custom suit tailoring',
      price: 'K850',
      originalPrice: 'K1100',
      category: 'formal',
      duration: '10-14 days',
      icon: Star,
      color: 'purple',
      features: [
        'Full custom suit (jacket & pants)',
        'Premium fabric selection',
        'Hand-finished details',
        'Multiple fittings',
        'Monogramming included',
        'Unlimited revisions',
        'Lifetime adjustments',
        'Garment bag included'
      ],
      popular: false
    },
    {
      name: 'Wedding Package',
      description: 'Complete bridal/groom attire',
      price: 'K1500',
      originalPrice: 'K2000',
      category: 'wedding',
      duration: '21-30 days',
      icon: Zap,
      color: 'gold',
      features: [
        'Bridal gown or groom suit',
        'Luxury fabric options',
        'Intricate detailing & beadwork',
        'Multiple design consultations',
        'Custom accessories',
        'Rush delivery available',
        'Photo session coordination',
        'Backup garment included'
      ],
      popular: false
    }
  ]

  const packageDeals = [
    {
      name: 'Wardrobe Refresh',
      description: '5 custom pieces package',
      price: 'K1200',
      originalPrice: 'K1500',
      savings: 'K300',
      duration: '3-4 weeks',
      items: ['2 Shirts/Blouses', '1 Dress/Suit', '1 Casual Outfit', '1 Formal Piece'],
      features: ['Mix & match styling', 'Coordinated color palette', 'Seasonal updates']
    },
    {
      name: 'Business Professional',
      description: 'Complete work wardrobe',
      price: 'K2200',
      originalPrice: 'K2800',
      savings: 'K600',
      duration: '4-6 weeks',
      items: ['2 Business Suits', '3 Dress Shirts', '2 Blouses', '1 Dress'],
      features: ['Professional styling', 'Quality fabrics', 'Maintenance guide']
    },
    {
      name: 'Family Package',
      description: 'Custom outfits for the whole family',
      price: 'K1800',
      originalPrice: 'K2400',
      savings: 'K600',
      duration: '2-3 weeks',
      items: ['4 Adult pieces', '2 Children pieces', 'Coordinated styling'],
      features: ['Family photo coordination', 'Seasonal themes', 'Group discounts']
    }
  ]

  const addOns = [
    { name: 'Rush Delivery (3 days)', price: 'K100' },
    { name: 'Premium Fabric Upgrade', price: 'K150' },
    { name: 'Hand Embroidery', price: 'K80' },
    { name: 'Designer Consultation', price: 'K50' },
    { name: 'Home Fitting Service', price: 'K75' },
    { name: 'Garment Care Kit', price: 'K45' }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quality custom tailoring at fair prices. No hidden fees, no surprises.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            <Button
              variant={billingCycle === 'one-time' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('one-time')}
              className="px-6"
            >
              Individual Items
            </Button>
            <Button
              variant={billingCycle === 'package' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('package')}
              className="px-6"
            >
              Packages
              <Badge className="ml-2 bg-green-100 text-green-800">Save up to 25%</Badge>
            </Button>
          </div>
        </div>

        {billingCycle === 'one-time' ? (
          <>
            {/* Individual Pricing */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {pricingTiers.map((tier, index) => {
                const IconComponent = tier.icon
                return (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                      tier.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className={tier.popular ? 'pt-12' : ''}>
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className={`h-6 w-6 text-${tier.color}-600`} />
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {tier.duration}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold">{tier.price}</span>
                          {tier.originalPrice && (
                            <span className="text-lg text-gray-500 line-through ml-2">
                              {tier.originalPrice}
                            </span>
                          )}
                        </div>
                        {tier.originalPrice && (
                          <Badge className="mt-1 bg-green-100 text-green-800">
                            Save K{parseInt(tier.originalPrice.replace('K', '')) - parseInt(tier.price.replace('K', ''))}
                          </Badge>
                        )}
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${
                          tier.popular 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        ) : (
          <>
            {/* Package Pricing */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {packageDeals.map((pkg, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-100 text-green-800">
                        Save {pkg.savings}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {pkg.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{pkg.price}</span>
                        <span className="text-lg text-gray-500 line-through ml-2">
                          {pkg.originalPrice}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Package Includes:</h4>
                      <ul className="space-y-1">
                        {pkg.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Bonus Features:</h4>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Add-ons Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-center mb-6">Optional Add-ons</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium">{addon.name}</span>
                <Badge variant="outline">{addon.price}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Payment Options</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Flexible Payments</h4>
              <p className="text-sm text-gray-600">
                50% deposit to start, 50% upon completion
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Multiple Methods</h4>
              <p className="text-sm text-gray-600">
                Mobile money, bank transfer, or cash
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Satisfaction Guarantee</h4>
              <p className="text-sm text-gray-600">
                Free alterations until you're happy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
