"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, ShoppingCart, Eye, Filter, Grid3X3, List, Truck, MapPin, Award, Watch, Glasses } from "lucide-react";
import MobileCheckout from "@/components/checkout/mobile-checkout";

interface AccessoryProduct {
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

const mensAccessories: AccessoryProduct[] = [
  {
    id: "ma-001",
    name: "Classic Leather Watch",
    brand: "Zambian Timepieces",
    price: 450.00,
    originalPrice: 600.00,
    rating: 4.8,
    reviews: 234,
    image: "/api/placeholder/400/400",
    category: "Watches",
    material: "Genuine Leather",
    color: ["Brown", "Black", "Tan"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Time Masters Zambia",
      location: "Lusaka",
      rating: 4.9,
      verified: true
    },
    features: ["Water Resistant", "Swiss Movement", "Genuine Leather"],
    description: "Elegant timepiece crafted with precision and designed for the modern Zambian gentleman."
  },
  {
    id: "ma-002",
    name: "Handcrafted Leather Belt",
    brand: "Copper Craft",
    price: 120.00,
    rating: 4.7,
    reviews: 156,
    image: "/api/placeholder/400/400",
    category: "Belts",
    material: "Full Grain Leather",
    color: ["Black", "Brown", "Cognac"],
    inStock: true,
    isNew: true,
    isTrending: false,
    vendor: {
      name: "Leather Works Zambia",
      location: "Kitwe",
      rating: 4.8,
      verified: true
    },
    features: ["Handcrafted", "Full Grain Leather", "Brass Buckle"],
    description: "Premium leather belt handcrafted by local artisans using traditional techniques."
  },
  {
    id: "ma-003",
    name: "Designer Sunglasses",
    brand: "Safari Shades",
    price: 280.00,
    rating: 4.6,
    reviews: 89,
    image: "/api/placeholder/400/400",
    category: "Sunglasses",
    material: "Acetate Frame",
    color: ["Black", "Tortoise", "Blue"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Vision Plus Zambia",
      location: "Ndola",
      rating: 4.7,
      verified: true
    },
    features: ["UV Protection", "Polarized Lenses", "Lightweight"],
    description: "Stylish sunglasses with 100% UV protection, perfect for Zambia's sunny climate."
  },
  {
    id: "ma-004",
    name: "Premium Leather Wallet",
    brand: "Victoria Falls Leather",
    price: 180.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviews: 312,
    image: "/api/placeholder/400/400",
    category: "Wallets",
    material: "Italian Leather",
    color: ["Black", "Brown", "Navy"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Premium Accessories ZM",
      location: "Livingstone",
      rating: 4.9,
      verified: true
    },
    features: ["RFID Blocking", "Multiple Card Slots", "Coin Pocket"],
    description: "Sophisticated wallet with RFID protection and premium Italian leather construction."
  },
  {
    id: "ma-005",
    name: "Silk Pocket Square Set",
    brand: "Elegant Zambia",
    price: 95.00,
    rating: 4.5,
    reviews: 67,
    image: "/api/placeholder/400/400",
    category: "Pocket Squares",
    material: "Pure Silk",
    color: ["Navy", "Burgundy", "Forest Green", "Gold"],
    inStock: true,
    isNew: true,
    isTrending: false,
    vendor: {
      name: "Formal Accessories ZM",
      location: "Lusaka",
      rating: 4.6,
      verified: true
    },
    features: ["Pure Silk", "Hand Rolled Edges", "Set of 4"],
    description: "Elegant silk pocket squares to complement formal and business attire."
  },
  {
    id: "ma-006",
    name: "Copper Cufflinks",
    brand: "Copperbelt Crafts",
    price: 150.00,
    rating: 4.8,
    reviews: 45,
    image: "/api/placeholder/400/400",
    category: "Cufflinks",
    material: "Copper & Silver",
    color: ["Copper", "Silver", "Mixed"],
    inStock: true,
    isNew: true,
    isTrending: false,
    vendor: {
      name: "Zambian Artisan Guild",
      location: "Chingola",
      rating: 4.8,
      verified: true
    },
    features: ["Handcrafted", "Local Copper", "Gift Box Included"],
    description: "Unique cufflinks crafted from Zambian copper, representing local heritage and craftsmanship."
  },
  {
    id: "ma-007",
    name: "Business Card Holder",
    brand: "Professional Zambia",
    price: 85.00,
    rating: 4.4,
    reviews: 128,
    image: "/api/placeholder/400/400",
    category: "Card Holders",
    material: "Stainless Steel",
    color: ["Silver", "Black", "Gold"],
    inStock: true,
    isNew: false,
    isTrending: false,
    vendor: {
      name: "Office Essentials ZM",
      location: "Lusaka",
      rating: 4.5,
      verified: true
    },
    features: ["Magnetic Closure", "Holds 15+ Cards", "Engraving Available"],
    description: "Professional card holder for the modern businessman, with optional custom engraving."
  },
  {
    id: "ma-008",
    name: "Traditional Beaded Bracelet",
    brand: "Heritage Crafts",
    price: 65.00,
    rating: 4.7,
    reviews: 198,
    image: "/api/placeholder/400/400",
    category: "Bracelets",
    material: "Natural Beads",
    color: ["Earth Tones", "Red & Black", "Blue & White"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Cultural Crafts Zambia",
      location: "Mongu",
      rating: 4.8,
      verified: true
    },
    features: ["Handmade", "Cultural Significance", "Adjustable"],
    description: "Traditional Zambian beaded bracelet with cultural patterns and significance."
  }
];

export default function MensAccessoriesProducts() {
  const [products, setProducts] = useState(mensAccessories);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: AccessoryProduct) => {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Watches':
        return Watch;
      case 'Sunglasses':
        return Glasses;
      default:
        return Award;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header with Sort and View Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Men's Accessories</h2>
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
          {sortedProducts.map((product, index) => {
            const CategoryIcon = getCategoryIcon(product.category);
            
            return (
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
                    
                    {/* Badges */}
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

                    {/* Quick Actions */}
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
                        <CategoryIcon className="h-4 w-4 text-gray-500" />
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {product.material}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
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

                    {/* Vendor Info */}
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

                    {/* Features */}
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
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
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
            );
          })}
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
