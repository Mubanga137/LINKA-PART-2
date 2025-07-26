"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, ShoppingCart, Eye, Grid3X3, List, Truck, MapPin, Award } from "lucide-react";
import MobileCheckout from "@/components/checkout/mobile-checkout";

interface WomensAccessoryProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  material: string;
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

const womensAccessories: WomensAccessoryProduct[] = [
  {
    id: "wa-001",
    name: "Traditional Copper Jewelry Set",
    brand: "Zambian Heritage",
    price: 280.00,
    originalPrice: 350.00,
    rating: 4.8,
    reviews: 156,
    image: "/api/placeholder/400/400",
    category: "Jewelry",
    material: "Copper",
    color: ["Copper", "Rose Gold"],
    inStock: true,
    isNew: true,
    isTrending: true,
    vendor: {
      name: "Copper Craft Zambia",
      location: "Lusaka",
      rating: 4.9,
      verified: true
    },
    features: ["Handcrafted", "Local Copper", "Gift Box"],
    description: "Beautiful traditional jewelry set featuring authentic Zambian copper craftsmanship."
  },
  {
    id: "wa-002",
    name: "Designer Handbag",
    brand: "Urban Zambia",
    price: 320.00,
    rating: 4.7,
    reviews: 89,
    image: "/api/placeholder/400/400",
    category: "Bags",
    material: "Leather",
    color: ["Black", "Brown", "Tan"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Leather Works ZM",
      location: "Ndola",
      rating: 4.6,
      verified: true
    },
    features: ["Genuine Leather", "Multiple Compartments", "Adjustable Strap"],
    description: "Stylish handbag perfect for professional and casual occasions."
  },
  {
    id: "wa-003",
    name: "Silk Headwrap Collection",
    brand: "African Elegance",
    price: 85.00,
    rating: 4.9,
    reviews: 203,
    image: "/api/placeholder/400/400",
    category: "Head Accessories",
    material: "Silk",
    color: ["Multi-Color", "Royal Blue", "Emerald"],
    inStock: true,
    isNew: false,
    isTrending: false,
    vendor: {
      name: "Traditional Textiles ZM",
      location: "Kitwe",
      rating: 4.8,
      verified: true
    },
    features: ["Pure Silk", "Various Patterns", "Set of 3"],
    description: "Luxurious silk headwraps with traditional African patterns."
  }
];

export default function WomensAccessoriesProducts() {
  const [products, setProducts] = useState(womensAccessories);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: WomensAccessoryProduct) => {
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
            <h2 className="text-2xl font-bold text-gray-900">Women's Accessories</h2>
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
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
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

                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.material}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2">
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

                  <div className="mb-4 flex-1">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      className="flex-1 bg-violet-600 hover:bg-violet-700"
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
