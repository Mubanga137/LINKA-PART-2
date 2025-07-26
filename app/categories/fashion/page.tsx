"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Users,
  Baby,
  Shirt,
  Watch,
  Crown,
  Sparkles,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  MapPin,
  Truck
} from "lucide-react"

interface FashionItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  category: 'clothing' | 'accessories'
  subcategory: string
  colors: string[]
  sizes: string[]
  inStock: boolean
  retailer: string
  location: string
  freeShipping: boolean
}

const mensFashion: FashionItem[] = [
  {
    id: "men-1",
    name: "Premium Cotton Dress Shirt",
    price: 85,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    brand: "Zambezi Tailors",
    rating: 4.8,
    reviews: 156,
    category: 'clothing',
    subcategory: 'shirts',
    colors: ['White', 'Blue', 'Light Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    retailer: "Style Hub Lusaka",
    location: "Lusaka, Zambia",
    freeShipping: true
  },
  {
    id: "men-2",
    name: "Leather Dress Watch",
    price: 210,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    brand: "Copper Rose",
    rating: 4.9,
    reviews: 89,
    category: 'accessories',
    subcategory: 'watches',
    colors: ['Brown', 'Black'],
    sizes: ['One Size'],
    inStock: true,
    retailer: "Time Piece Gallery",
    location: "Ndola, Zambia",
    freeShipping: false
  },
  {
    id: "men-3",
    name: "Casual Chino Pants",
    price: 65,
    originalPrice: 85,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
    brand: "Urban Zambia",
    rating: 4.6,
    reviews: 203,
    category: 'clothing',
    subcategory: 'pants',
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    sizes: ['30', '32', '34', '36', '38', '40'],
    inStock: true,
    retailer: "Men's Fashion Corner",
    location: "Kitwe, Zambia",
    freeShipping: true
  }
]

const womensFashion: FashionItem[] = [
  {
    id: "women-1",
    name: "Ankara Print Dress",
    price: 95,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    brand: "Zambian Heritage",
    rating: 4.9,
    reviews: 234,
    category: 'clothing',
    subcategory: 'dresses',
    colors: ['Multi-color', 'Blue Print', 'Red Print'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    retailer: "African Elegance",
    location: "Lusaka, Zambia",
    freeShipping: true
  },
  {
    id: "women-2",
    name: "Copper Jewelry Set",
    price: 45,
    originalPrice: 65,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    brand: "Copperbelt Crafts",
    rating: 4.7,
    reviews: 167,
    category: 'accessories',
    subcategory: 'jewelry',
    colors: ['Copper', 'Silver'],
    sizes: ['One Size'],
    inStock: true,
    retailer: "Jewels of Zambia",
    location: "Lusaka, Zambia",
    freeShipping: false
  },
  {
    id: "women-3",
    name: "Business Blazer",
    price: 125,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
    brand: "Professional Wardrobe",
    rating: 4.8,
    reviews: 98,
    category: 'clothing',
    subcategory: 'blazers',
    colors: ['Black', 'Navy', 'Charcoal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    retailer: "Executive Fashion",
    location: "Lusaka, Zambia",
    freeShipping: true
  }
]

const kidsFashion: FashionItem[] = [
  {
    id: "kids-1",
    name: "Colorful School Uniform Set",
    price: 35,
    originalPrice: 50,
    image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&h=400&fit=crop",
    brand: "Little Scholars",
    rating: 4.6,
    reviews: 312,
    category: 'clothing',
    subcategory: 'uniforms',
    colors: ['Navy/White', 'Khaki/White', 'Green/White'],
    sizes: ['Age 3-4', 'Age 5-6', 'Age 7-8', 'Age 9-10', 'Age 11-12'],
    inStock: true,
    retailer: "Kids Corner",
    location: "Lusaka, Zambia",
    freeShipping: true
  },
  {
    id: "kids-2",
    name: "Fun Character Backpack",
    price: 25,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    brand: "Adventure Kids",
    rating: 4.8,
    reviews: 189,
    category: 'accessories',
    subcategory: 'bags',
    colors: ['Blue', 'Pink', 'Red', 'Green'],
    sizes: ['Small', 'Medium'],
    inStock: true,
    retailer: "School Supplies Plus",
    location: "Ndola, Zambia",
    freeShipping: false
  },
  {
    id: "kids-3",
    name: "Comfortable Play Shoes",
    price: 40,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    brand: "Active Kids",
    rating: 4.7,
    reviews: 145,
    category: 'accessories',
    subcategory: 'shoes',
    colors: ['Black', 'White', 'Blue/White'],
    sizes: ['Size 10', 'Size 11', 'Size 12', 'Size 13', 'Size 1', 'Size 2'],
    inStock: true,
    retailer: "Tiny Feet",
    location: "Kitwe, Zambia",
    freeShipping: true
  }
]

export default function FashionPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clothing' | 'accessories'>('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filterItems = (items: FashionItem[]) => {
    if (selectedCategory === 'all') return items
    return items.filter(item => item.category === selectedCategory)
  }

  const renderFashionCard = (item: FashionItem) => (
    <Card key={item.id} className="group bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {item.originalPrice && (
              <Badge className="bg-red-500 text-white">
                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
              </Badge>
            )}
            {item.freeShipping && (
              <Badge className="bg-green-500 text-white">
                <Truck className="h-3 w-3 mr-1" />
                Free Shipping
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-slate-500">{item.brand}</p>
          </div>

          <div className="flex items-center space-x-1 mb-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{item.rating}</span>
            <span className="text-sm text-slate-500">({item.reviews})</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-slate-900">
              ZMW {item.price}
            </span>
            {item.originalPrice && (
              <span className="text-sm text-slate-500 line-through">
                ZMW {item.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs text-slate-500 mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            {item.retailer}, {item.location}
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Fashion & Style
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Discover the latest trends in Zambian fashion. From traditional wear to modern styles,
              find clothing and accessories for the whole family.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/categories/fashion/textiles">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Custom Textiles
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Featured Collections
              </Button>
            </div>
          </div>
        </section>

        {/* Fashion Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Tabs defaultValue="men" className="w-full">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
                <TabsList className="grid w-full lg:w-auto grid-cols-3 lg:grid-cols-3 h-12">
                  <TabsTrigger value="men" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Men</span>
                  </TabsTrigger>
                  <TabsTrigger value="women" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Women</span>
                  </TabsTrigger>
                  <TabsTrigger value="kids" className="flex items-center space-x-2">
                    <Baby className="h-4 w-4" />
                    <span>Kids</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-4">
                  <Select value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <TabsContent value="men" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Men's Fashion</h2>
                  <Badge variant="outline">{filterItems(mensFashion).length} items</Badge>
                </div>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                  {filterItems(mensFashion).map(renderFashionCard)}
                </div>
              </TabsContent>

              <TabsContent value="women" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Women's Fashion</h2>
                  <Badge variant="outline">{filterItems(womensFashion).length} items</Badge>
                </div>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                  {filterItems(womensFashion).map(renderFashionCard)}
                </div>
              </TabsContent>

              <TabsContent value="kids" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Kids' Fashion</h2>
                  <Badge variant="outline">{filterItems(kidsFashion).length} items</Badge>
                </div>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                  {filterItems(kidsFashion).map(renderFashionCard)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
