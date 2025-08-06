"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Truck,
  Package,
  Zap,
  Store,
  X,
  Eye,
  Share2
} from "lucide-react";
import type { Product } from "@/lib/types";

interface InteractiveProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  priority?: boolean;
  className?: string;
}

// Mobile breakpoint detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

export function InteractiveProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  priority = false,
  className = ""
}: InteractiveProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [swipeState, setSwipeState] = useState<'idle' | 'revealing' | 'revealed'>('idle');
  const [longPressActive, setLongPressActive] = useState(false);
  
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const swipeOffset = useMotionValue(0);
  const actionOpacity = useTransform(swipeOffset, [-100, -50, 0], [1, 0.7, 0]);
  const cardScale = useTransform(swipeOffset, [-100, 0], [0.95, 1]);

  // Fallback image
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' transform='translate(180,180)'/%3E%3C/svg%3E";

  const getImageSrc = () => {
    if (imageError) return fallbackImage;
    return product.images[0] || fallbackImage;
  };

  // Long press handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!isMobile) return;
    
    longPressTimer.current = setTimeout(() => {
      setLongPressActive(true);
      setIsPreviewOpen(true);
      // Haptic feedback if supported
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }, 500);
  }, [isMobile]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      setLongPressActive(false);
    }
  }, []);

  // Swipe gesture handlers
  const handlePanStart = () => {
    if (!isMobile) return;
    setSwipeState('revealing');
  };

  const handlePan = (event: any, info: PanInfo) => {
    if (!isMobile) return;
    
    const swipeThreshold = -50;
    const offset = Math.max(info.offset.x, -100);
    swipeOffset.set(offset);
    
    if (offset < swipeThreshold && swipeState !== 'revealed') {
      setSwipeState('revealed');
    } else if (offset >= swipeThreshold && swipeState === 'revealed') {
      setSwipeState('revealing');
    }
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (!isMobile) return;
    
    const shouldReveal = info.offset.x < -50;
    
    if (shouldReveal) {
      swipeOffset.set(-80);
      setSwipeState('revealed');
    } else {
      swipeOffset.set(0);
      setSwipeState('idle');
    }
  };

  // Card click handler for expansion
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent expansion if clicking on buttons or links
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('a') ||
      longPressActive ||
      swipeState === 'revealed'
    ) {
      return;
    }
    
    setIsExpanded(!isExpanded);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <>
      {/* Main Card */}
      <motion.div
        ref={cardRef}
        className={`relative overflow-hidden ${className}`}
        style={{ scale: cardScale }}
        layout
      >
        {/* Swipe Actions Background (Mobile) */}
        {isMobile && (
          <motion.div
            className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-blue-500 to-green-500 flex items-center justify-end pr-4 z-0"
            style={{ opacity: actionOpacity }}
          >
            <div className="flex space-x-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                  setSwipeState('idle');
                  swipeOffset.set(0);
                }}
                className="bg-white rounded-full p-3 shadow-lg"
              >
                <ShoppingCart className="h-5 w-5 text-blue-500" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/vendors/${product.vendor.id}`;
                }}
                className="bg-white rounded-full p-3 shadow-lg"
              >
                <Store className="h-5 w-5 text-green-500" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Card Content */}
        <motion.article
          className="relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 flex flex-col h-full cursor-pointer z-10"
          style={{ x: swipeOffset }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onClick={handleCardClick}
          whileHover={!isMobile ? { scale: 1.02, y: -2 } : {}}
          animate={isExpanded ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Product Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {imageLoading && !imageError && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                animate={{ x: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            )}
            
            <motion.div
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={getImageSrc()}
                alt={`${product.name} - ${product.description}`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                priority={priority}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </motion.div>
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
              <div className="flex flex-col gap-1">
                {(product as any).hotDeal && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                      🔥 HOT DEAL
                    </Badge>
                  </motion.div>
                )}
                {product.freeShipping && (
                  <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <Truck className="h-3 w-3" />
                    <span className="hidden sm:inline">Free Shipping</span>
                    <span className="sm:hidden">Free</span>
                  </Badge>
                )}
                {product.discountPercentage && (
                  <Badge className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    -{product.discountPercentage}%
                  </Badge>
                )}
              </div>
              
              {/* Favorite Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 rounded-full shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                  }}
                  aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
                    }`}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Desktop Quick Actions */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute bottom-3 right-3 flex space-x-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPreviewOpen(true);
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white"
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add share functionality
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white"
                >
                  <Share2 className="h-4 w-4 text-gray-600" />
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Product Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Vendor Info Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {product.vendor.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {product.vendor.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">Lusaka</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs font-semibold text-gray-700">
                  {product.rating?.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {product.name}
            </h3>

            {/* Price Section */}
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  K{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    K{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-xs text-green-600 font-medium">
                  Save K{(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features?.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stock Status */}
            <div className="mb-4">
              <div className={`flex items-center gap-1 text-xs ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}>
                <Package className="h-3 w-3" />
                <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                {product.inStock && product.stockQuantity && product.stockQuantity <= 10 && (
                  <span className="text-orange-600 ml-1">
                    ({product.stockQuantity} left)
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="mt-auto space-y-2"
              initial={false}
              animate={isExpanded ? { y: 0 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 text-sm rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">{!product.inStock ? 'Out of Stock' : 'Add to Cart'}</span>
                  <span className="xs:hidden">{!product.inStock ? 'Sold Out' : 'Buy'}</span>
                </Button>
              </motion.div>

              {/* Visit Store Button - Desktop Only */}
              {!isMobile && !product.hotDeal && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 py-2.5 text-sm rounded-lg transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/vendors/${product.vendor.id}`;
                    }}
                  >
                    <Store className="h-3 w-3 mr-2" />
                    Visit Store
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.article>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="relative">
                <Image
                  src={getImageSrc()}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Preview Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{product.rating?.toFixed(1)}</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    K{product.price.toFixed(2)}
                  </span>
                </div>

                {/* Preview Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      onAddToCart(product);
                      setIsPreviewOpen(false);
                    }}
                    disabled={!product.inStock}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      window.location.href = `/vendors/${product.vendor.id}`;
                    }}
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Visit Store
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
