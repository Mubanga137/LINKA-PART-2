"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, ShoppingCart, Eye, Grid3X3, List, Truck, MapPin, Award } from "lucide-react";
import MobileCheckout from "@/components/checkout/mobile-checkout";

interface KidsProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  ageGroup: string;
  size: string[];
  color: string[];
  inStock: boolean;
  isNew: boolean;
  isTrending: boolean;
  vendor: {
    name: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  features: string[];
  description: string;
}

const kidsModernProducts: KidsProduct[] = [
  {
    id: "km-001",
    name: "Playful T-Shirt Set",
    brand: "Little Zambia",
    price: 85.00,
    originalPrice: 110.00,
    rating: 4.8,
    reviews: 156,
    image: "/api/placeholder/400/500",
    category: "T-Shirts",
    ageGroup: "2-6 years",
    size: ["2T", "3T", "4T", "5T", "6"],
    color: ["Red", "Blue", "Yellow", "Green"],
    inStock: true,
    isNew: true,
    isTrending: true,
    vendor: {
      name: "Kids Corner Zambia",
      location: "Lusaka",
      rating: 4.7,
      verified: true
    },
    features: ["100% Cotton", "Machine Washable", "Bright Colors"],
    description: "Fun and colorful t-shirt set perfect for active toddlers and young children."
  },
  {
    id: "km-002",
    name: "School Uniform Set",
    brand: "Smart Kids ZM",
    price: 150.00,
    rating: 4.9,
    reviews: 234,
    image: "/api/placeholder/400/500",
    category: "School Wear",
    ageGroup: "6-12 years",
    size: ["6", "7", "8", "9", "10", "11", "12"],
    color: ["Navy", "White", "Grey"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "School Uniforms ZM",
      location: "Kitwe",
      rating: 4.8,
      verified: true
    },
    features: ["Durable Fabric", "Easy Care", "Standard Fit"],
    description: "High-quality school uniform that meets school standards and ensures comfort."
  },
  {
    id: "km-003",
    name: "Party Dress",
    brand: "Princess Zambia",
    price: 180.00,
    rating: 4.7,
    reviews: 89,
    image: "/api/placeholder/400/500",
    category: "Dresses",
    ageGroup: "3-8 years",
    size: ["3", "4", "5", "6", "7", "8"],
    color: ["Pink", "Purple", "Blue", "White"],
    inStock: true,
    isNew: true,
    isTrending: false,
    vendor: {
      name: "Special Occasions Kids",
      location: "Ndola",
      rating: 4.6,
      verified: true
    },
    features: ["Special Occasion", "Comfortable Fit", "Beautiful Design"],
    description: "Elegant party dress perfect for birthdays, weddings, and special celebrations."
  },
  {
    id: "km-004",
    name: "Sports Shorts Set",
    brand: "Active Kids ZM",
    price: 95.00,
    rating: 4.6,
    reviews: 123,
    image: "/api/placeholder/400/500",
    category: "Activewear",
    ageGroup: "4-10 years",
    size: ["4", "5", "6", "7", "8", "9", "10"],
    color: ["Black", "Blue", "Red", "Green"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Kids Sports Wear",
      location: "Lusaka",
      rating: 4.5,
      verified: true
    },
    features: ["Moisture Wicking", "Elastic Waist", "Quick Dry"],
    description: "Comfortable sports set designed for active children who love to play and exercise."
  },
  {
    id: "km-005",
    name: "Cozy Pajama Set",
    brand: "Sleepy Time ZM",
    price: 120.00,
    originalPrice: 150.00,
    rating: 4.8,
    reviews: 178,
    image: "/api/placeholder/400/500",
    category: "Sleepwear",
    ageGroup: "2-8 years",
    size: ["2T", "3T", "4T", "5", "6", "7", "8"],
    color: ["Light Blue", "Pink", "Yellow", "Green"],
    inStock: true,
    isNew: false,
    isTrending: false,
    vendor: {
      name: "Comfort Kids ZM",
      location: "Livingstone",
      rating: 4.7,
      verified: true
    },
    features: ["Soft Fabric", "Comfortable Fit", "Fun Prints"],
    description: "Soft and comfortable pajama set to ensure peaceful sleep for your little ones."
  },
  {
    id: "km-006",
    name: "Casual Jeans",
    brand: "Little Denim ZM",
    price: 135.00,
    rating: 4.5,
    reviews: 98,
    image: "/api/placeholder/400/500",
    category: "Jeans",
    ageGroup: "3-12 years",
    size: ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    color: ["Blue", "Dark Blue", "Black"],
    inStock: true,
    isNew: false,
    isTrending: false,
    vendor: {
      name: "Denim Kids ZM",
      location: "Kabwe",
      rating: 4.4,
      verified: true
    },
    features: ["Adjustable Waist", "Durable Denim", "Comfortable Fit"],
    description: "Quality denim jeans designed for growing children with adjustable features."
  }
];

export default function KidsModernProducts() {
  const [products, setProducts] = useState(kidsModernProducts);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: KidsProduct) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return Number(b.isNew) - Number(a.isNew);
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kids Modern Fashion</h2>
            <p className="text-gray-600">{sortedProducts.length} products available</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-green-600 text-white">New</Badge>
                    )}
                    {product.isTrending && (
                      <Badge className="bg-orange-600 text-white">Trending</Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="bg-red-600 text-white">Sale</Badge>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={`h-4 w-4 ${
                        wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                      }`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.ageGroup}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ZMW {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ZMW {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{product.vendor.location}</span>
                    </div>
                    {product.vendor.verified && (
                      <Award className="h-3 w-3 text-green-600" />
                    )}
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{product.vendor.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Truck className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 border z-50"
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold">{cartItems.length} items in cart</div>
                <div className="text-sm text-gray-600">
                  ZMW {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </div>
              </div>
              <Button
                onClick={() => setIsCheckoutOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Checkout
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile Checkout Modal */}
      {isCheckoutOpen && (
        <MobileCheckout
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onUpdateQuantity={(id, quantity) => {
            setCartItems(cartItems.map(item =>
              item.id === id ? { ...item, quantity } : item
            ));
          }}
          onRemoveItem={(id) => {
            setCartItems(cartItems.filter(item => item.id !== id));
          }}
        />
      )}
    </>
  );
}
