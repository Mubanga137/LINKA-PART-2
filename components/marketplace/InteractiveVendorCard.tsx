"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Store,
  Star,
  MapPin,
  Clock,
  Shield,
  Zap,
  Users,
  Heart,
  Share2,
  ExternalLink,
  Truck,
  X,
  Eye,
  PhoneCall,
  MessageCircle
} from "lucide-react";
import type { Vendor } from "@/lib/types";
import { safeShare, showShareFeedback } from "@/lib/clipboard-utils";

interface InteractiveVendorCardProps {
  vendor: Vendor;
  onAddToCart?: (vendor: Vendor) => void;
  onToggleFavorite?: (vendorId: string) => void;
  isFavorite?: boolean;
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

export function InteractiveVendorCard({
  vendor,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  priority = false,
  className = ""
}: InteractiveVendorCardProps) {
  const [adding, setAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
    return vendor.productImageUrl || fallbackImage;
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

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      onAddToCart?.(vendor);
    } finally {
      setAdding(false);
    }
  };

  const handleShare = async () => {
    const result = await safeShare({
      title: vendor.name,
      text: vendor.tagline,
      url: window.location.origin + vendor.href,
    });
    showShareFeedback(result);
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
            className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-blue-500 to-purple-600 flex items-center justify-end pr-4 z-0"
            style={{ opacity: actionOpacity }}
          >
            <div className="flex space-x-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
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
                  window.location.href = vendor.href;
                }}
                className="bg-white rounded-full p-3 shadow-lg"
              >
                <Store className="h-5 w-5 text-purple-500" />
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
          whileHover={!isMobile ? { scale: 1.02, y: -4 } : {}}
          animate={isExpanded ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Product Image Container */}
          <div className="relative h-48 overflow-hidden bg-gray-100">
            {!imageLoaded && (
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
                alt={`${vendor.name} product showcase`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                priority={priority}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
            
            {/* Overlay badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
              <div className="flex flex-col gap-2">
                {vendor.isFeatured && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                      <Zap className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </motion.div>
                )}
                {vendor.discount && (
                  <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                    {vendor.discount}
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 rounded-full shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite?.(vendor.id);
                    }}
                    aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isFavorite ? 'fill-red-500 text-red-500' : ''
                      }`} 
                    />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 rounded-full shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    aria-label="Share vendor"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
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
                    window.location.href = `tel:${vendor.phone || ''}`;
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white"
                >
                  <PhoneCall className="h-4 w-4 text-gray-600" />
                </motion.button>
              </motion.div>
            )}

            {/* Quick stats overlay */}
            <motion.div 
              className="absolute bottom-4 left-4 right-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{vendor.reviewCount || 0} reviews</span>
                  </div>
                  {vendor.deliveryTime && (
                    <div className="flex items-center text-slate-600">
                      <Truck className="h-4 w-4 mr-1" />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Vendor Header */}
            <div className="flex items-center mb-3">
              {vendor.vendorImageUrl && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 mr-3"
                >
                  <Image
                    src={vendor.vendorImageUrl}
                    alt={`${vendor.name} logo`}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gray-200"
                  />
                </motion.div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {vendor.name}
                </h3>
                {vendor.tagline && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {vendor.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Vendor Meta Information */}
            <div className="flex flex-wrap gap-2 mb-3">
              {typeof vendor.rating === "number" && (
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold text-gray-700">
                    {vendor.rating.toFixed(1)}
                  </span>
                </div>
              )}
              
              {vendor.isVerified && (
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                  <Shield className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-semibold text-blue-700">Verified</span>
                </div>
              )}
              
              {vendor.location && (
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-700">{vendor.location}</span>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1 mb-3">
              {vendor.categories?.slice(0, 2).map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {vendor.categories && vendor.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{vendor.categories.length - 2} more
                </Badge>
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
                  className="overflow-hidden mb-3"
                >
                  <p className="text-sm text-gray-600 mb-3">
                    {vendor.description || "Quality products from a trusted vendor."}
                  </p>
                  
                  {/* Contact Options */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add chat functionality
                      }}
                      className="flex-1"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `tel:${vendor.phone || ''}`;
                      }}
                      className="flex-1"
                    >
                      <PhoneCall className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pricing Information */}
            {vendor.pricePreview && (
              <div className="mb-4">
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="text-lg font-bold text-blue-600">{vendor.pricePreview}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto space-y-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  disabled={adding}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-sm rounded-lg transition-all duration-200 shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {adding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </Button>
              </motion.div>

              {/* Visit Store Button - Desktop Only */}
              {!isMobile && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 py-2.5 text-sm rounded-lg transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = vendor.href;
                    }}
                  >
                    <Store className="h-3 w-3 mr-2" />
                    Visit Store
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Trusted seller</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Quick response</span>
                </div>
              </div>
            </div>
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
                  alt={vendor.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-2xl"
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
                <div className="flex items-center mb-4">
                  {vendor.vendorImageUrl && (
                    <Image
                      src={vendor.vendorImageUrl}
                      alt={`${vendor.name} logo`}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-gray-200 mr-3"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vendor.name}</h3>
                    {vendor.tagline && (
                      <p className="text-sm text-gray-600">{vendor.tagline}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{vendor.rating?.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({vendor.reviewCount || 0} reviews)</span>
                  </div>
                  {vendor.pricePreview && (
                    <span className="text-lg font-bold text-blue-600">
                      {vendor.pricePreview}
                    </span>
                  )}
                </div>

                {/* Preview Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      handleAddToCart();
                      setIsPreviewOpen(false);
                    }}
                    disabled={adding}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      window.location.href = vendor.href;
                    }}
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Visit Store
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.location.href = `tel:${vendor.phone || ''}`}
                    >
                      <PhoneCall className="h-3 w-3 mr-1" />
                      Call
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
