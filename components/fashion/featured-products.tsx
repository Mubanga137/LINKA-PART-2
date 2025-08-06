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

  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const handleAddToCart = (product: Product) => {
    // Add to cart logic here
    console.log('Adding to cart:', product.name);
  }

  const ProductCard = ({ product }: { product: Product }) => {
    // Transform the product data to match the InteractiveProductCard interface
    const transformedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      images: [product.image],
      vendor: {
        id: product.vendor?.id || 'unknown',
        name: product.vendor?.name || 'Unknown Store'
      },
      rating: product.rating,
      reviewCount: product.reviews,
      description: `High-quality ${product.brand} product with premium features.`,
      features: product.features,
      inStock: product.inStock,
      stockQuantity: undefined,
      freeShipping: product.freeShipping,
      featured: product.newArrival || product.trending,
      hotDeal: false,
      discountPercentage: product.originalPrice ?
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) :
        undefined
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group h-full"
      >
        <InteractiveProductCard
          product={transformedProduct}
          onAddToCart={handleAddToCart}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.has(product.id)}
          className="h-full"
        />
      </motion.div>
    );
  }

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
