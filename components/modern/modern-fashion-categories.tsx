'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Star, 
  Filter,
  Grid,
  List
} from 'lucide-react'

export default function ModernFashionCategories() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    {
      id: 'streetwear',
      name: 'Urban Streetwear',
      description: 'Contemporary street fashion with Zambian flair',
      image: '/placeholder.svg',
      itemCount: 45,
      trending: true,
      avgPrice: 'K180-K350',
      popularity: 92,
      tags: ['Casual', 'Youth', 'Urban'],
      featured: ['Hoodies', 'Sneakers', 'Graphic Tees', 'Joggers']
    },
    {
      id: 'minimalist',
      name: 'Minimalist Chic',
      description: 'Clean lines and sophisticated simplicity',
      image: '/placeholder.svg',
      itemCount: 38,
      trending: false,
      avgPrice: 'K220-K480',
      popularity: 87,
      tags: ['Elegant', 'Simple', 'Versatile'],
      featured: ['Blazers', 'Midi Dresses', 'Trousers', 'Blouses']
    },
    {
      id: 'athleisure',
      name: 'Active Athleisure',
      description: 'Sport-inspired fashion for active lifestyles',
      image: '/placeholder.svg',
      itemCount: 52,
      trending: true,
      avgPrice: 'K120-K280',
      popularity: 94,
      tags: ['Sporty', 'Comfortable', 'Functional'],
      featured: ['Leggings', 'Sports Bras', 'Trainers', 'Track Suits']
    },
    {
      id: 'business',
      name: 'Modern Business',
      description: 'Professional wear with contemporary cuts',
      image: '/placeholder.svg',
      itemCount: 41,
      trending: false,
      avgPrice: 'K320-K650',
      popularity: 89,
      tags: ['Professional', 'Formal', 'Contemporary'],
      featured: ['Suits', 'Dress Shirts', 'Pencil Skirts', 'Oxfords']
    },
    {
      id: 'evening',
      name: 'Evening Glamour',
      description: 'Sophisticated pieces for special occasions',
      image: '/placeholder.svg',
      itemCount: 29,
      trending: false,
      avgPrice: 'K450-K950',
      popularity: 85,
      tags: ['Elegant', 'Formal', 'Luxurious'],
      featured: ['Cocktail Dresses', 'Evening Gowns', 'Tuxedos', 'Heels']
    },
    {
      id: 'fusion',
      name: 'African Fusion',
      description: 'Modern interpretations of traditional designs',
      image: '/placeholder.svg',
      itemCount: 36,
      trending: true,
      avgPrice: 'K250-K550',
      popularity: 91,
      tags: ['Cultural', 'Modern', 'Unique'],
      featured: ['Ankara Pieces', 'Kente Accessories', 'Modern Dashikis', 'Fusion Dresses']
    },
    {
      id: 'casual',
      name: 'Smart Casual',
      description: 'Relaxed yet polished everyday wear',
      image: '/placeholder.svg',
      itemCount: 47,
      trending: false,
      avgPrice: 'K150-K380',
      popularity: 88,
      tags: ['Versatile', 'Comfortable', 'Stylish'],
      featured: ['Chinos', 'Polos', 'Casual Dresses', 'Loafers']
    },
    {
      id: 'vintage',
      name: 'Modern Vintage',
      description: 'Retro-inspired pieces with contemporary twist',
      image: '/placeholder.svg',
      itemCount: 33,
      trending: false,
      avgPrice: 'K180-K420',
      popularity: 83,
      tags: ['Retro', 'Unique', 'Nostalgic'],
      featured: ['Vintage Jackets', 'High-waisted Jeans', 'Band Tees', 'Combat Boots']
    }
  ]

  const filters = [
    { id: 'all', name: 'All Categories', count: categories.length },
    { id: 'trending', name: 'Trending', count: categories.filter(cat => cat.trending).length },
    { id: 'popular', name: 'Most Popular', count: categories.filter(cat => cat.popularity >= 90).length },
    { id: 'affordable', name: 'Budget Friendly', count: categories.filter(cat => cat.avgPrice.startsWith('K1')).length }
  ]

  const filteredCategories = categories.filter(category => {
    switch (activeFilter) {
      case 'trending':
        return category.trending
      case 'popular':
        return category.popularity >= 90
      case 'affordable':
        return category.avgPrice.startsWith('K1')
      default:
        return true
    }
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Modern Fashion Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover contemporary styles that blend global trends with Zambian culture
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
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

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }>
          {filteredCategories.map((category) => (
            <Card 
              key={category.id} 
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                viewMode === 'list' ? 'overflow-hidden' : ''
              }`}
            >
              {viewMode === 'grid' ? (
                <div>
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      {category.trending && (
                        <Badge className="bg-red-500 text-white border-0 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge className="bg-black/70 text-white border-0">
                        {category.itemCount} items
                      </Badge>
                    </div>

                    {/* Popularity Bar */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 rounded-full p-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium">Popularity</span>
                          <span className="font-bold">{category.popularity}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${category.popularity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="font-medium">{category.avgPrice}</span>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {category.popularity}% popularity
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {category.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Featured Items */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Featured:</p>
                      <div className="text-xs text-gray-600">
                        {category.featured.slice(0, 3).join(' • ')}
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      Explore Category
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              ) : (
                /* List View */
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-gray-600 text-sm">{category.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {category.trending && (
                            <Badge className="bg-red-500 text-white border-0 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          <Badge variant="outline">
                            {category.itemCount} items
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>Price: {category.avgPrice}</span>
                        <span>Popularity: {category.popularity}%</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {category.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                          Featured: {category.featured.slice(0, 4).join(' • ')}
                        </div>
                        <Button size="sm">
                          Explore
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">300+</div>
              <div className="text-sm text-gray-600">Modern Designs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Local Designers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
