'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Award, ArrowRight, Heart, Eye } from 'lucide-react'

export default function ModernFashionBrands() {
  const [activeFilter, setActiveFilter] = useState('all')

  const brands = [
    {
      id: 1,
      name: 'Afro Chic',
      description: 'Contemporary African fashion with a modern twist',
      logo: '/placeholder.svg',
      category: 'luxury',
      rating: 4.8,
      followers: 12400,
      products: 156,
      location: 'Lusaka',
      established: 2019,
      featured: true,
      specialties: ['African Prints', 'Evening Wear', 'Custom Designs']
    },
    {
      id: 2,
      name: 'Urban Threads ZM',
      description: 'Street-style fashion for the modern Zambian youth',
      logo: '/placeholder.svg',
      category: 'streetwear',
      rating: 4.6,
      followers: 8900,
      products: 89,
      location: 'Kitwe',
      established: 2020,
      featured: false,
      specialties: ['Streetwear', 'Sneakers', 'Casual Wear']
    },
    {
      id: 3,
      name: 'Eco Fashion Co.',
      description: 'Sustainable fashion made from recycled materials',
      logo: '/placeholder.svg',
      category: 'sustainable',
      rating: 4.9,
      followers: 15600,
      products: 67,
      location: 'Lusaka',
      established: 2018,
      featured: true,
      specialties: ['Sustainable Fashion', 'Eco-Friendly', 'Organic Cotton']
    },
    {
      id: 4,
      name: 'Executive Style',
      description: 'Professional attire for business leaders',
      logo: '/placeholder.svg',
      category: 'business',
      rating: 4.7,
      followers: 6700,
      products: 134,
      location: 'Ndola',
      established: 2017,
      featured: false,
      specialties: ['Business Suits', 'Formal Wear', 'Executive Fashion']
    },
    {
      id: 5,
      name: 'Youth Culture ZM',
      description: 'Trendy fashion for the next generation',
      logo: '/placeholder.svg',
      category: 'youth',
      rating: 4.5,
      followers: 11200,
      products: 203,
      location: 'Lusaka',
      established: 2021,
      featured: true,
      specialties: ['Youth Fashion', 'Trendy Styles', 'Affordable Fashion']
    },
    {
      id: 6,
      name: 'Heritage Couture',
      description: 'Traditional designs with contemporary elegance',
      logo: '/placeholder.svg',
      category: 'traditional',
      rating: 4.8,
      followers: 9800,
      products: 78,
      location: 'Livingstone',
      established: 2016,
      featured: false,
      specialties: ['Traditional Wear', 'Cultural Fashion', 'Handcrafted']
    }
  ]

  const filters = [
    { id: 'all', name: 'All Brands', count: brands.length },
    { id: 'featured', name: 'Featured', count: brands.filter(b => b.featured).length },
    { id: 'luxury', name: 'Luxury', count: brands.filter(b => b.category === 'luxury').length },
    { id: 'sustainable', name: 'Sustainable', count: brands.filter(b => b.category === 'sustainable').length },
    { id: 'streetwear', name: 'Streetwear', count: brands.filter(b => b.category === 'streetwear').length }
  ]

  const filteredBrands = brands.filter(brand => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'featured') return brand.featured
    return brand.category === activeFilter
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Fashion Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover innovative Zambian fashion brands leading the modern style movement
          </p>
        </div>

        {/* Brand Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="flex items-center space-x-1"
            >
              <span>{filter.name}</span>
              <Badge variant="secondary" className="ml-1">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Brands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBrands.map((brand) => (
            <Card key={brand.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                {/* Brand Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{brand.name}</h3>
                      <p className="text-sm text-gray-500">{brand.location}</p>
                    </div>
                  </div>
                  {brand.featured && (
                    <Badge className="bg-yellow-500 text-black border-0">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{brand.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{brand.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="font-semibold">{(brand.followers / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Award className="h-4 w-4 text-green-500 mr-1" />
                      <span className="font-semibold">{brand.products}</span>
                    </div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {brand.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Established */}
                <div className="text-xs text-gray-500 mb-4">
                  Established: {brand.established}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    View Brand
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Brand Categories Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Luxury Brands</h3>
            <p className="text-sm text-gray-600">Premium fashion with exclusive designs</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">♻</span>
            </div>
            <h3 className="font-semibold mb-2">Sustainable</h3>
            <p className="text-sm text-gray-600">Eco-friendly and ethical fashion</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Youth Culture</h3>
            <p className="text-sm text-gray-600">Trendy styles for young fashion enthusiasts</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">✦</span>
            </div>
            <h3 className="font-semibold mb-2">Traditional</h3>
            <p className="text-sm text-gray-600">Cultural heritage meets modern design</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Become a Featured Brand</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our platform and showcase your fashion brand to thousands of style-conscious customers across Zambia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Apply as Brand Partner
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
