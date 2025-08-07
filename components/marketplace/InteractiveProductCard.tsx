"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAdvancedGestures, useCardState } from "@/hooks/use-advanced-gestures";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Truck, 
  Clock, 
  Package,
  Zap,
  Store,
  Eye,
  X,
  Sparkles,
  Shield,
  Plus,
  Minus,
  Gift,
  ChevronRight,
  StarIcon,
  Users,
  MessageCircle,
  Share2,
  ArrowRight
} from "lucide-react";
import type { Product } from "@/lib/types";

interface InteractiveProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  priority?: boolean;
  showVisitStore?: boolean;
  index?: number;
  onViewProduct?: (productId: string) => void;
}

export function InteractiveProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  priority = false,
  showVisitStore = true,
  index = 0,
  onViewProduct
}: InteractiveProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Card state management
  const {
    isExpanded,
    isSwipeRevealed,
    showPreview,
    isLoading,
    expandCard,
    collapseCard,
    toggleExpansion,
    showSwipeActions,
    hideSwipeActions,
    showPreviewModal,
    hidePreviewModal,
    setLoadingState
  } = useCardState();

  // Pan gesture for swipe actions
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, -50, 0], [1, 0.8, 0]);
  const actionButtonScale = useTransform(x, [-150, -50], [1, 0.8]);

  // Handle swipe gesture
  const handlePan = useCallback((event: any, info: PanInfo) => {
    // Only allow left swipe on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      if (info.offset.x < -50) {
        showSwipeActions();
      } else if (info.offset.x > -20) {
        hideSwipeActions();
      }
    }
  }, [showSwipeActions, hideSwipeActions]);

  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      if (info.offset.x < -100) {
        x.set(-120);
      } else {
        x.set(0);
        hideSwipeActions();
      }
    }
  }, [x, hideSwipeActions]);

  // Advanced gesture handling
  const { ref: gestureRef, isLongPressing, triggerHaptic } = useAdvancedGestures({
    onSwipeLeft: () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        showSwipeActions();
        triggerHaptic('light');
      }
    },
    onSwipeRight: hideSwipeActions,
    onLongPress: () => {
      showPreviewModal();
      triggerHaptic('medium');
    },
    onTap: (e) => {
      e.stopPropagation();
      if (!isSwipeRevealed && !showPreview) {
        // Navigate to product details on tap/click
        handleViewProduct();
        triggerHaptic('light');
      }
    },
    threshold: 50,
    delay: 500
  });

  // Combine refs
  useEffect(() => {
    if (cardRef.current && gestureRef.current !== cardRef.current) {
      // @ts-ignore
      gestureRef.current = cardRef.current;
    }
  }, [gestureRef]);

  // Handle add to cart with loading state
  const handleAddToCart = useCallback(async () => {
    setLoadingState(true);
    triggerHaptic('medium');
    
    try {
      await onAddToCart({ ...product, quantity });
      
      // Auto-collapse after successful add
      setTimeout(() => {
        collapseCard();
        hideSwipeActions();
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setTimeout(() => {
        setLoadingState(false);
      }, 800);
    }
  }, [product, quantity, onAddToCart, setLoadingState, triggerHaptic, collapseCard, hideSwipeActions]);

  const handleToggleFavorite = useCallback(() => {
    onToggleFavorite(product.id);
    triggerHaptic('light');
  }, [product.id, onToggleFavorite, triggerHaptic]);

  const handleViewProduct = useCallback(() => {
    onViewProduct?.(product.id);
    triggerHaptic('light');
  }, [product.id, onViewProduct, triggerHaptic]);

  // Image handling
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' transform='translate(180,180)'/%3E%3C/svg%3E";

  const getImageSrc = () => {
    if (imageError) return fallbackImage;
    return product.images[0] || fallbackImage;
  };

  const getStoreSlug = (vendorName: string) => {
    return vendorName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const isFlashSale = product.tags?.includes('flash-sale') || (product as any).hotDeal;

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    expanded: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  const longPressIndicator = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: isLongPressing ? 1 : 0,
      opacity: isLongPressing ? 1 : 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Main Card */}
      <motion.div
        ref={cardRef}
        className="relative w-full overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate={isExpanded ? "expanded" : "visible"}
        layout
        style={{ perspective: 1000 }}
      >
        {/* Long Press Indicator */}
        <motion.div
          className="absolute top-2 left-2 z-50 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
          variants={longPressIndicator}
          initial="initial"
          animate="animate"
        >
          <Eye className="h-4 w-4" />
        </motion.div>

        {/* Swipe Action Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-blue-500 to-green-500 z-10 flex items-center justify-end pr-4 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSwipeRevealed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div style={{ scale: actionButtonScale }}>
            <Button
              size="sm"
              className="bg-white/90 text-blue-600 hover:bg-white shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </motion.div>
          
          {showVisitStore && !isFlashSale && (
            <motion.div style={{ scale: actionButtonScale }}>
              <Button
                size="sm"
                className="bg-white/90 text-green-600 hover:bg-white shadow-lg"
                asChild
              >
                <Link href={`/vendors/${getStoreSlug(product.vendor.name)}`}>
                  <Store className="h-4 w-4 mr-1" />
                  Store
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Main Card Content */}
        <motion.div
          className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -120, right: 0 }}
          dragElastic={0.1}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          whileHover={{ 
            y: -2,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
          }}
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {imageLoading && !imageError && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ backgroundSize: "200% 100%" }}
              />
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={getImageSrc()}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-500 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={priority ? "eager" : "lazy"}
                priority={priority}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </motion.div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
              {(product as any).hotDeal && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    🔥 HOT
                  </Badge>
                </motion.div>
              )}
              
              {product.freeShipping && (
                <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  <Truck className="h-3 w-3 mr-1" />
                  Free Ship
                </Badge>
              )}
              
              {product.discountPercentage && (
                <Badge className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{product.discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Favorite Button */}
            <motion.div
              className="absolute top-3 right-3 z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="sm"
                variant="ghost"
                className="w-10 h-10 p-0 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-md"
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-400'
                  }`}
                />
              </Button>
            </motion.div>
          </div>

          {/* Product Content */}
          <div className="p-4 space-y-3">
            {/* Vendor Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {product.vendor.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{product.vendor.name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>Lusaka</span>
                    <Shield className="h-3 w-3 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs font-bold">{product.rating?.toFixed(1)}</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                K{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  K{product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <Badge className="bg-green-100 text-green-700 text-xs ml-auto">
                  <Gift className="h-3 w-3 mr-1" />
                  Save K{(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className={`flex items-center gap-1 text-xs ${
              product.inStock ? 'text-green-600' : 'text-red-600'
            }`}>
              <Package className="h-3 w-3" />
              <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              {product.inStock && product.stockQuantity && product.stockQuantity <= 10 && (
                <span className="text-orange-600 font-medium">
                  ({product.stockQuantity} left)
                </span>
              )}
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 border-t pt-4"
                >
                  {/* Product Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Additional Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-blue-500" />
                        <span>{product.reviewCount} reviews</span>
                      </div>
                      {product.fastDelivery && (
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-yellow-500" />
                          <span>Fast delivery</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-purple-500" />
                        <span>{(product.reviewCount || 0) * 5 + 120} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center gap-3 p-2 bg-gray-50 rounded-xl">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    
                    <span className="font-bold text-gray-900 w-8 text-center">{quantity}</span>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleAddToCart}
                        disabled={!product.inStock || isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-50 relative overflow-hidden"
                      >
                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </motion.div>
                              Adding to Cart...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="add"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart ({quantity})
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-2">
                      {showVisitStore && !isFlashSale && (
                        <Button
                          variant="outline"
                          className="flex items-center gap-1 text-xs"
                          asChild
                        >
                          <Link href={`/vendors/${getStoreSlug(product.vendor.name)}`}>
                            <Store className="h-3 w-3" />
                            Visit Store
                          </Link>
                        </Button>
                      )}
                      
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compact Action Buttons (when not expanded) */}
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isSwipeRevealed ? 0 : 1 }}
                className="flex gap-2"
              >
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 text-sm rounded-lg"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Buy Now
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="p-2 rounded-lg"
                  onClick={toggleExpansion}
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Long Press Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={hidePreviewModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square">
                <Image
                  src={getImageSrc()}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full"
                  onClick={hidePreviewModal}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    K{product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{product.rating?.toFixed(1)}</span>
                    <span className="text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  {showVisitStore && !isFlashSale && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <Link href={`/vendors/${getStoreSlug(product.vendor.name)}`}>
                        <Store className="h-4 w-4 mr-2" />
                        Visit Store
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
