'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Eye, Heart, Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function CustomPortfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const portfolioItems = [
    {
      id: 1,
      title: 'Traditional Chitenge Dress',
      designer: 'Sarah Phiri',
      category: 'traditional',
      price: 'K450',
      rating: 4.9,
      likes: 127,
      views: 1250,
      image: '/placeholder.svg',
      tags: ['Chitenge', 'Traditional', 'Formal'],
      description: 'Elegant traditional dress with modern touches'
    },
    {
      id: 2,
      title: 'Modern Business Suit',
      designer: 'Michael Banda',
      category: 'formal',
      price: 'K850',
      rating: 4.8,
      likes: 89,
      views: 890,
      image: '/placeholder.svg',
      tags: ['Suit', 'Business', 'Formal'],
      description: 'Contemporary business suit with perfect tailoring'
    },
    {
      id: 3,
      title: 'Wedding Ensemble',
      designer: 'Grace Mulenga',
      category: 'wedding',
      price: 'K1200',
      rating: 5.0,
      likes: 234,
      views: 2100,
      image: '/placeholder.svg',
      tags: ['Wedding', 'Bridal', 'Luxury'],
      description: 'Stunning bridal wear with intricate beadwork'
    },
    {
      id: 4,
      title: 'Casual Summer Outfit',
      designer: 'John Mwanza',
      category: 'casual',
      price: 'K280',
      rating: 4.7,
      likes: 56,
      views: 670,
      image: '/placeholder.svg',
      tags: ['Casual', 'Summer', 'Comfortable'],
      description: 'Light and comfortable summer ensemble'
    },
    {
      id: 5,
      title: 'Executive Blazer',
      designer: 'Patricia Zulu',
      category: 'formal',
      price: 'K520',
      rating: 4.8,
      likes: 78,
      views: 920,
      image: '/placeholder.svg',
      tags: ['Blazer', 'Executive', 'Professional'],
      description: 'Professional blazer for executive wear'
    },
    {
      id: 6,
      title: 'Cultural Festival Attire',
      designer: 'David Tembo',
      category: 'traditional',
      price: 'K650',
      rating: 4.9,
      likes: 145,
      views: 1380,
      image: '/placeholder.svg',
      tags: ['Cultural', 'Festival', 'Colorful'],
      description: 'Vibrant attire perfect for cultural celebrations'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Designs', count: portfolioItems.length },
    { id: 'traditional', name: 'Traditional', count: portfolioItems.filter(item => item.category === 'traditional').length },
    { id: 'formal', name: 'Formal Wear', count: portfolioItems.filter(item => item.category === 'formal').length },
    { id: 'wedding', name: 'Wedding', count: portfolioItems.filter(item => item.category === 'wedding').length },
    { id: 'casual', name: 'Casual', count: portfolioItems.filter(item => item.category === 'casual').length }
  ]

  const filteredItems = portfolioItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.designer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Designer Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore stunning custom designs created by our talented Zambian tailors and designers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search designs, designers, or styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Button */}
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(category.id)}
                className="flex items-center space-x-1"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <Button size="sm" variant="secondary" className="bg-white/90 text-black">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 text-black">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                  </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/70 text-white border-0">
                    {item.price}
                  </Badge>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 text-black border-0 flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {item.rating}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">by {item.designer}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {item.likes}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Contact Designer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Showcase Your Designs</h3>
            <p className="text-gray-600 mb-6">
              Are you a talented tailor or designer? Join our platform and showcase your work to customers across Zambia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Join as Designer
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
