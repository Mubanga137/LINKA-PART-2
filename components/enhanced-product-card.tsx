"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InteractiveButton } from "@/components/interactive-button";
import { useToast, useCartToast, useWishlistToast } from "@/components/toast-notification";
import {
  Heart,
  ShoppingCart,
  Star,
  Store,
  MapPin,
  Clock,
  Truck,
  Shield,
  Flame,
  Zap,
  Crown,
  Sparkles,
  Eye,
  Calendar,
  Award,
  TrendingUp,
  Gift,
  ArrowRight,
  Plus,
  Check,
  X
} from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    type: "product" | "service";
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    vendor: string;
    vendorId: string;
    vendorVerified?: boolean;
    rating: number;
    reviews: number;
    inStock?: boolean;
    available?: boolean;
    stockCount?: number;
    fastDelivery?: boolean;
    freeShipping?: boolean;
    tags: string[];
    features: string[];
    description: string;
    location: string;
    isRecommended?: boolean;
    isHotDeal?: boolean;
    isTrending?: boolean;
    isFlashDeal?: boolean;
    recommendationScore?: number;
    discount?: number;
    urgencyLevel?: "low" | "medium" | "high";
    dealEndsIn?: string;
    flashEndsIn?: string;
  };
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorited?: boolean;
  variant?: "default" | "compact" | "featured";
  showQuickActions?: boolean;
  className?: string;
}

export function EnhancedProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorited = false,
  variant = "default",
  showQuickActions = true,
  className = ""
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configurations for smooth animations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  
  // Scale and glow effects
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  const glowOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  const cartToast = useCartToast();
  const wishlistToast = useWishlistToast();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate relative position (-0.5 to 0.5)
    const xPos = (event.clientX - centerX) / (rect.width / 2);
    const yPos = (event.clientY - centerY) / (rect.height / 2);
    
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
    glowOpacity.set(0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    glowOpacity.set(0);
    x.set(0);
    y.set(0);
  };

  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      setShowQuickView(true);
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
    }, 500);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
      cartToast.addToCart(product.name);
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
      if (isFavorited) {
        wishlistToast.removeFromWishlist(product.name);
      } else {
        wishlistToast.addToWishlist(product.name);
      }
    }
  };

  const getCardVariant = () => {
    switch (variant) {
      case "compact":
        return "h-80";
      case "featured":
        return "h-96";
      default:
        return "h-[420px]";
    }
  };

  const getSpecialBadge = () => {
    if (product.isRecommended) {
      return { icon: Sparkles, text: "AI Pick", color: "from-blue-500 to-indigo-600" };
    }
    if (product.isHotDeal) {
      return { icon: Flame, text: "Hot Deal", color: "from-red-500 to-orange-500" };
    }
    if (product.isTrending) {
      return { icon: TrendingUp, text: "Trending", color: "from-green-500 to-emerald-500" };
    }
    if (product.isFlashDeal) {
      return { icon: Zap, text: "Flash", color: "from-purple-500 to-pink-500" };
    }
    return null;
  };

  const specialBadge = getSpecialBadge();

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`group relative ${getCardVariant()} ${className}`}
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d"
        }}
        animate={{
          scale,
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 blur-xl z-0"
          style={{
            background: specialBadge 
              ? `linear-gradient(135deg, ${specialBadge.color.replace('from-', '').replace('to-', ', ')})` 
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            opacity: glowOpacity
          }}
        />

        {/* Main Card */}
        <Card className="relative h-full bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 z-10">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              {/* Background Image with Parallax */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onLoad={() => setImageLoaded(true)}
                  priority={variant === "featured"}
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Special Badge */}
              {specialBadge && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute top-4 left-4 z-20"
                >
                  <Badge className={`bg-gradient-to-r ${specialBadge.color} text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-lg`}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <specialBadge.icon className="h-4 w-4" />
                    </motion.div>
                    {specialBadge.text}
                  </Badge>
                </motion.div>
              )}

              {/* Discount Badge */}
              {product.originalPrice && product.discount && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute top-4 right-4 z-20"
                >
                  <Badge className="bg-red-500 text-white px-3 py-1.5 rounded-xl font-bold shadow-lg animate-pulse">
                    -{product.discount}%
                  </Badge>
                </motion.div>
              )}

              {/* Favorite Button */}
              <motion.div
                className="absolute top-4 right-4 z-20"
                style={{ marginTop: product.discount ? "3rem" : "0" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleFavorite}
                  className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                >
                  <Heart className={`h-5 w-5 transition-colors ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </Button>
              </motion.div>

              {/* Quick Actions Overlay */}
              <AnimatePresence>
                {isHovered && showQuickActions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 z-20"
                  >
                    <div className="flex gap-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white shadow-lg"
                          onClick={() => setShowQuickView(true)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Quick View
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={`/vendors/${product.vendorId}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg"
                          >
                            <Store className="h-4 w-4" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Indicators */}
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                {product.type === "product" ? (
                  <>
                    {product.inStock ? (
                      <Badge className="bg-green-500/90 backdrop-blur-sm text-white text-xs">
                        {product.stockCount} left
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/90 backdrop-blur-sm text-white text-xs">
                        Out of Stock
                      </Badge>
                    )}
                    {product.fastDelivery && (
                      <Badge className="bg-blue-500/90 backdrop-blur-sm text-white text-xs">
                        <Truck className="h-3 w-3 mr-1" />
                        Fast
                      </Badge>
                    )}
                  </>
                ) : (
                  <>
                    {product.available ? (
                      <Badge className="bg-green-500/90 backdrop-blur-sm text-white text-xs">
                        Available
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/90 backdrop-blur-sm text-white text-xs">
                        Booked
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col">
              {/* Rating & Verification */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  {product.vendorVerified && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Shield className="h-4 w-4 text-green-500" />
                    </motion.div>
                  )}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {product.type}
                </Badge>
              </div>

              {/* Product Name */}
              <motion.h3
                className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                animate={{
                  color: isHovered ? "#2563eb" : "#111827"
                }}
              >
                {product.name}
              </motion.h3>

              {/* Vendor & Location */}
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-600 font-medium">{product.vendor}</p>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{product.location}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {feature}
                      </Badge>
                    </motion.div>
                  ))}
                  {product.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      +{product.features.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-2 mb-6">
                <motion.span
                  className="text-2xl font-bold text-gray-900"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                >
                  K{product.price}
                </motion.span>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      K{product.originalPrice}
                    </span>
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      Save K{product.originalPrice - product.price}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <div className="flex-1">
                  <InteractiveButton
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
                    onClick={handleAddToCart}
                    disabled={product.type === "product" ? !product.inStock : !product.available}
                    loadingText="Adding..."
                    successText="Added!"
                  >
                    {product.type === "product" ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        {product.available ? 'Book Now' : 'Unavailable'}
                      </>
                    )}
                  </InteractiveButton>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={`/vendors/${product.vendorId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-4 border-gray-300 hover:border-blue-300 hover:text-blue-600"
                    >
                      <Store className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Elements */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute -top-2 -right-2 z-30"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Quick View</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuickView(false)}
                  className="w-8 h-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold">K{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through">K{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <InteractiveButton
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </InteractiveButton>
                    
                    <Button
                      variant="outline"
                      onClick={handleToggleFavorite}
                      className="px-4"
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
