"use client"

import { useState, useEffect } from 'react'
import { useThemeCustomization } from '@/contexts/theme-customization-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  ShoppingBag, 
  Gamepad2, 
  Coffee, 
  Laptop, 
  Home, 
  Car, 
  Book,
  Music,
  Camera,
  Dumbbell,
  Plane,
  Palette,
  Shirt,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  Save
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Interest categories with icons and descriptions
const interestCategories = [
  {
    id: 'fashion',
    name: 'Fashion & Style',
    icon: Shirt,
    color: 'pink',
    description: 'Clothing, accessories, and style trends',
    subcategories: ['Casual Wear', 'Formal Wear', 'Accessories', 'Shoes', 'Traditional Wear']
  },
  {
    id: 'gaming',
    name: 'Gaming & Tech',
    icon: Gamepad2,
    color: 'purple',
    description: 'Video games, technology, and gadgets',
    subcategories: ['Console Gaming', 'PC Gaming', 'Mobile Games', 'Tech Gadgets', 'Software']
  },
  {
    id: 'food',
    name: 'Food & Beverages',
    icon: Coffee,
    color: 'orange',
    description: 'Cooking, dining, and culinary experiences',
    subcategories: ['Local Cuisine', 'International Food', 'Beverages', 'Cooking Supplies', 'Organic Food']
  },
  {
    id: 'tech',
    name: 'Technology',
    icon: Laptop,
    color: 'blue',
    description: 'Electronics, computers, and innovation',
    subcategories: ['Smartphones', 'Computers', 'Smart Home', 'Audio/Video', 'Accessories']
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: Home,
    color: 'green',
    description: 'Home improvement, decor, and gardening',
    subcategories: ['Furniture', 'Decor', 'Gardening', 'Tools', 'Appliances']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: Car,
    color: 'red',
    description: 'Cars, motorcycles, and transportation',
    subcategories: ['Car Parts', 'Maintenance', 'Accessories', 'Motorcycles', 'Tools']
  },
  {
    id: 'books',
    name: 'Books & Education',
    icon: Book,
    color: 'indigo',
    description: 'Literature, learning, and knowledge',
    subcategories: ['Fiction', 'Non-Fiction', 'Textbooks', 'Children Books', 'Digital Content']
  },
  {
    id: 'music',
    name: 'Music & Entertainment',
    icon: Music,
    color: 'teal',
    description: 'Music, movies, and entertainment',
    subcategories: ['Musical Instruments', 'Audio Equipment', 'Movies', 'Concerts', 'Streaming']
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Camera,
    color: 'yellow',
    description: 'Cameras, equipment, and visual arts',
    subcategories: ['Cameras', 'Lenses', 'Accessories', 'Printing', 'Software']
  },
  {
    id: 'fitness',
    name: 'Health & Fitness',
    icon: Dumbbell,
    color: 'emerald',
    description: 'Wellness, exercise, and healthy living',
    subcategories: ['Exercise Equipment', 'Supplements', 'Sportswear', 'Wellness', 'Outdoor Gear']
  },
  {
    id: 'travel',
    name: 'Travel & Adventure',
    icon: Plane,
    color: 'sky',
    description: 'Travel gear, experiences, and adventure',
    subcategories: ['Luggage', 'Travel Gear', 'Outdoor Equipment', 'Tourism', 'Adventure Sports']
  },
  {
    id: 'arts',
    name: 'Arts & Crafts',
    icon: Palette,
    color: 'rose',
    description: 'Creative projects and artistic supplies',
    subcategories: ['Art Supplies', 'Crafts', 'DIY Projects', 'Handmade Items', 'Creative Tools']
  }
]

const shoppingStyles = [
  {
    id: 'casual',
    name: 'Casual Shopper',
    description: 'I shop when I need something specific',
    icon: ShoppingBag,
    traits: ['Budget-conscious', 'Practical', 'Research before buying']
  },
  {
    id: 'frequent',
    name: 'Frequent Buyer',
    description: 'I enjoy shopping regularly and discovering new products',
    icon: TrendingUp,
    traits: ['Trend-aware', 'Regular purchases', 'Enjoys browsing']
  },
  {
    id: 'premium',
    name: 'Premium Customer',
    description: 'I prefer high-quality products and luxury brands',
    icon: Award,
    traits: ['Quality-focused', 'Brand-conscious', 'Willing to pay more']
  },
  {
    id: 'bargain-hunter',
    name: 'Deal Hunter',
    description: 'I love finding great deals and discounts',
    icon: Target,
    traits: ['Price-sensitive', 'Discount-focused', 'Value-oriented']
  }
]

export function LifestyleProfileManager() {
  const { lifestyleProfile, updateLifestyleProfile, saveSettings } = useThemeCustomization()
  const [selectedInterests, setSelectedInterests] = useState<string[]>(lifestyleProfile.interests)
  const [selectedStyle, setSelectedStyle] = useState(lifestyleProfile.shoppingStyle)
  const [profileCompletion, setProfileCompletion] = useState(0)

  useEffect(() => {
    // Calculate profile completion
    let completion = 0
    if (selectedInterests.length > 0) completion += 40
    if (selectedStyle) completion += 30
    if (lifestyleProfile.favoriteCategories.length > 0) completion += 20
    if (lifestyleProfile.preferredBrands.length > 0) completion += 10
    
    setProfileCompletion(completion)
  }, [selectedInterests, selectedStyle, lifestyleProfile])

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleStyleSelect = (styleId: 'casual' | 'frequent' | 'premium' | 'bargain-hunter') => {
    setSelectedStyle(styleId)
  }

  const saveProfile = () => {
    updateLifestyleProfile({
      interests: selectedInterests,
      shoppingStyle: selectedStyle
    })
    saveSettings()
  }

  const getColorClasses = (color: string) => {
    const colors = {
      pink: 'bg-pink-100 text-pink-700 border-pink-300 hover:bg-pink-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
      green: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200',
      red: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200',
      teal: 'bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200',
      emerald: 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200',
      sky: 'bg-sky-100 text-sky-700 border-sky-300 hover:bg-sky-200',
      rose: 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          Lifestyle & Interests Profile
        </CardTitle>
        
        {/* Profile Completion */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Profile Completion</span>
            <span className="font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="interests" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="interests" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Interests
            </TabsTrigger>
            <TabsTrigger value="shopping-style" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Shopping Style
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interests" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">What are you interested in?</h3>
              <p className="text-gray-600 mb-6">
                Select your interests to get personalized recommendations and see content tailored to your preferences.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {interestCategories.map((category) => {
                  const isSelected = selectedInterests.includes(category.id)
                  const Icon = category.icon
                  
                  return (
                    <Card
                      key={category.id}
                      className={cn(
                        "cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden",
                        isSelected 
                          ? "ring-2 ring-purple-500 shadow-lg" 
                          : "hover:shadow-md"
                      )}
                      onClick={() => handleInterestToggle(category.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                            getColorClasses(category.color)
                          )}>
                            <Icon className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{category.name}</h4>
                            <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                            
                            {isSelected && (
                              <div className="space-y-1">
                                {category.subcategories.slice(0, 3).map((sub, index) => (
                                  <Badge key={index} variant="outline" className="text-xs mr-1">
                                    {sub}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-medium">Selected: {selectedInterests.length} interests</span>
                </div>
                <p className="text-sm text-blue-600">
                  The more interests you select, the better we can personalize your experience!
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shopping-style" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">What's your shopping style?</h3>
              <p className="text-gray-600 mb-6">
                Help us understand how you prefer to shop so we can tailor your experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoppingStyles.map((style) => {
                  const isSelected = selectedStyle === style.id
                  const Icon = style.icon
                  
                  return (
                    <Card
                      key={style.id}
                      className={cn(
                        "cursor-pointer transition-all duration-300 hover:scale-105 relative",
                        isSelected 
                          ? "ring-2 ring-purple-500 shadow-lg bg-purple-50" 
                          : "hover:shadow-md"
                      )}
                      onClick={() => handleStyleSelect(style.id as any)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center",
                            isSelected 
                              ? "bg-purple-100 text-purple-600" 
                              : "bg-gray-100 text-gray-600"
                          )}>
                            <Icon className="h-7 w-7" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{style.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                            
                            <div className="space-y-1">
                              {style.traits.map((trait, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                  {trait}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="absolute top-3 right-3">
                              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Your preferences help us show you more relevant products and deals.
            </div>
            <Button 
              onClick={saveProfile}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
