"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Filter,
  Grid3X3,
  List,
  ChevronDown
} from "lucide-react"
import { InteractiveProductCard } from "@/components/marketplace/InteractiveProductCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  category: string
  subcategory: string
  vendor: {
    name: string
    location: string
    verified: boolean
  }
  features: string[]
  inStock: boolean
  freeShipping: boolean
  newArrival?: boolean
  trending?: boolean
}

interface FeaturedProductsProps {
  category?: string | null
}

const products: Product[] = [
  {
    id: "prod-1",
    name: "Traditional Ankara Dress",
    price: 120,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
    brand: "African Heritage",
    rating: 4.8,
    reviews: 127,
    category: "womens",
    subcategory: "dresses",
    vendor: {
      name: "Zambian Elegance",
      location: "Lusaka, Zambia",
      verified: true
    },
    features: ["Handcrafted", "Premium Cotton", "Local Design"],
    inStock: true,
    freeShipping: true,
    trending: true
  },
  {
    id: "prod-2",
    name: "Men's Formal Suit",
    price: 450,
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=400&h=500&fit=crop",
    brand: "Executive Style",
    rating: 4.9,
    reviews: 89,
    category: "mens",
    subcategory: "suits",
    vendor: {
      name: "Gentleman's Corner",
      location: "Ndola, Zambia",
      verified: true
    },
    features: ["Tailored Fit", "Premium Wool", "Italian Style"],
    inStock: true,
    freeShipping: true,
    newArrival: true
  },
  {
    id: "prod-3",
    name: "Kids School Uniform Set",
    price: 85,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&h=500&fit=crop",
    brand: "Little Scholars",
    rating: 4.6,
    reviews: 234,
    category: "kids",
    subcategory: "uniforms",
    vendor: {
      name: "Children's World",
      location: "Kitwe, Zambia",
      verified: true
    },
    features: ["Durable Fabric", "Easy Care", "Complete Set"],
    inStock: true,
    freeShipping: false,
    newArrival: false
  },
  {
    id: "prod-4",
    name: "Handwoven Chitenge Fabric",
    price: 35,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=500&fit=crop",
    brand: "Traditional Crafts",
    rating: 4.7,
    reviews: 156,
    category: "textiles",
    subcategory: "fabrics",
    vendor: {
      name: "Heritage Textiles",
      location: "Livingstone, Zambia",
      verified: true
    },
    features: ["Authentic Pattern", "Pure Cotton", "6 Yards"],
    inStock: true,
    freeShipping: false,
    trending: true
  },
  {
    id: "prod-5",
    name: "Women's Business Blazer",
    price: 180,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
    brand: "Professional Wardrobe",
    rating: 4.8,
    reviews: 98,
    category: "womens",
    subcategory: "blazers",
    vendor: {
      name: "Career Fashion",
      location: "Lusaka, Zambia",
      verified: true
    },
    features: ["Modern Cut", "Wrinkle Resistant", "Multiple Colors"],
    inStock: true,
    freeShipping: true,
    newArrival: true
  },
  {
    id: "prod-6",
    name: "Men's Casual Shirt",
    price: 65,
    originalPrice: 85,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    brand: "Urban Style",
    rating: 4.5,
    reviews: 167,
    category: "mens",
    subcategory: "shirts",
    vendor: {
      name: "Modern Man",
      location: "Lusaka, Zambia",
      verified: true
    },
    features: ["Cotton Blend", "Comfort Fit", "Easy Iron"],
    inStock: true,
    freeShipping: true,
    trending: false
  }
]

export function FeaturedProducts({ category }: FeaturedProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = products
    
    if (category && category !== "all") {
      filtered = products.filter(product => product.category === category)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [category, sortBy])

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-2">
              {product.originalPrice && (
                <Badge className="bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {product.newArrival && (
                <Badge className="bg-green-500 text-white">New</Badge>
              )}
              {product.trending && (
                <Badge className="bg-orange-500 text-white">Trending</Badge>
              )}
              {product.freeShipping && (
                <Badge className="bg-blue-500 text-white">
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

            {/* Vendor Badge */}
            {product.vendor.verified && (
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-white/90 text-slate-700">
                  ✓ Verified Vendor
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="mb-2">
              <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-slate-500">{product.brand}</p>
            </div>

            <div className="flex items-center space-x-1 mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-slate-500">({product.reviews})</span>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-bold text-slate-900">
                ZMW {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through">
                  ZMW {product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center text-xs text-slate-500 mb-4">
              <MapPin className="h-3 w-3 mr-1" />
              {product.vendor.name}, {product.vendor.location}
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {product.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {product.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{product.features.length - 2} more
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 py-2.5 text-sm font-semibold">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Buy Now</span>
              </Button>

              <Button
                variant="outline"
                className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 py-2 text-sm"
                asChild
              >
                <Link href={`/vendors/${product.vendor.id || 'unknown'}`}>
                  <Store className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Visit Store</span>
                  <span className="sm:hidden">Store</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Featured Products
              {category && (
                <span className="text-purple-600 capitalize"> - {category}</span>
              )}
            </h2>
            <p className="text-lg text-slate-600">
              Discover our handpicked selection of the finest fashion items from local vendors
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        } gap-6 mb-12`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  )
}
