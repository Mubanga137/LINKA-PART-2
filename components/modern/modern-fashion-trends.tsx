'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Heart, Eye, ArrowRight, Filter } from 'lucide-react'

export default function ModernFashionTrends() {
  const [activeCategory, setActiveCategory] = useState('all')

  const trends = [
    {
      id: 1,
      title: 'Sustainable Fashion Movement',
      description: 'Eco-friendly materials and ethical production',
      image: '/placeholder.svg',
      category: 'sustainability',
      growth: '+45%',
      popularity: 92,
      hashtags: ['#SustainableFashion', '#EcoChic', '#GreenStyle'],
      featured: true
    },
    {
      id: 2,
      title: 'African Print Renaissance',
      description: 'Modern interpretations of traditional patterns',
      image: '/placeholder.svg',
      category: 'cultural',
      growth: '+38%',
      popularity: 89,
      hashtags: ['#AfricanPrint', '#CulturalFusion', '#ModernAfrica'],
      featured: true
    },
    {
      id: 3,
      title: 'Minimalist Wardrobe',
      description: 'Quality over quantity approach',
      image: '/placeholder.svg',
      category: 'lifestyle',
      growth: '+32%',
      popularity: 85,
      hashtags: ['#MinimalStyle', '#QualityBasics', '#LessIsMore'],
      featured: false
    },
    {
      id: 4,
      title: 'Gender-Neutral Fashion',
      description: 'Inclusive designs for all identities',
      image: '/placeholder.svg',
      category: 'inclusive',
      growth: '+28%',
      popularity: 78,
      hashtags: ['#GenderNeutral', '#InclusiveFashion', '#Unisex'],
      featured: false
    },
    {
      id: 5,
      title: 'Tech-Wear Integration',
      description: 'Smart fabrics and functional design',
      image: '/placeholder.svg',
      category: 'technology',
      growth: '+41%',
      popularity: 83,
      hashtags: ['#TechWear', '#SmartFabrics', '#FunctionalFashion'],
      featured: true
    },
    {
      id: 6,
      title: 'Vintage Revival',
      description: 'Retro styles with modern updates',
      image: '/placeholder.svg',
      category: 'retro',
      growth: '+25%',
      popularity: 81,
      hashtags: ['#VintageStyle', '#RetroRevival', '#ThriftFashion'],
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All Trends', count: trends.length },
    { id: 'sustainability', name: 'Sustainable', count: trends.filter(t => t.category === 'sustainability').length },
    { id: 'cultural', name: 'Cultural', count: trends.filter(t => t.category === 'cultural').length },
    { id: 'technology', name: 'Tech-Wear', count: trends.filter(t => t.category === 'technology').length },
    { id: 'featured', name: 'Featured', count: trends.filter(t => t.featured).length }
  ]

  const filteredTrends = trends.filter(trend => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'featured') return trend.featured
    return trend.category === activeCategory
  })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fashion Trends 2024
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay ahead of the curve with the latest fashion movements shaping Zambian style
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center space-x-1"
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Trends Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTrends.map((trend) => (
            <Card key={trend.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={trend.image} 
                  alt={trend.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <Button size="sm" variant="secondary" className="bg-white/90 text-black">
                      <Eye className="h-4 w-4 mr-1" />
                      Explore
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 text-black">
                      <Heart className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  {trend.featured && (
                    <Badge className="bg-red-500 text-white border-0">
                      Featured
                    </Badge>
                  )}
                  <Badge className="bg-green-500 text-white border-0 flex items-center ml-auto">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {trend.growth}
                  </Badge>
                </div>

                {/* Popularity Bar */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 rounded-full p-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Popularity</span>
                      <span className="font-bold">{trend.popularity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${trend.popularity}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{trend.title}</h3>
                  <p className="text-gray-600 text-sm">{trend.description}</p>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {trend.hashtags.map((hashtag, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-blue-600">
                      {hashtag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                      {trend.growth} growth
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Explore Trend
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trend Insights */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Major Trends Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">35%</div>
              <div className="text-sm text-gray-600">Average Growth Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">2.4K</div>
              <div className="text-sm text-gray-600">Trend Followers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
