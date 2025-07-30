"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
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
  Truck
} from "lucide-react";
import type { Vendor } from "@/lib/types";
import { safeShare, showShareFeedback } from "@/lib/clipboard-utils";
import styles from "@/styles/marketplace.module.scss";

interface VendorCardProps {
  vendor: Vendor;
  onAddToCart?: (vendor: Vendor) => void;
  onToggleFavorite?: (vendorId: string) => void;
  isFavorite?: boolean;
}

export function VendorCard({ 
  vendor, 
  onAddToCart, 
  onToggleFavorite,
  isFavorite = false 
}: VendorCardProps) {
  const [adding, setAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      // Simulate API call
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
    <article
      aria-label={`${vendor.name} vendor card`}
      className={`${styles.vendorCard} ${styles.cardHover} ${styles.fadeIn}`}
    >
      {/* Product Image */}
      <div className={styles.vendorImageContainer}>
        <Image
          src={vendor.productImageUrl}
          alt={`${vendor.name} product showcase`}
          width={1200}
          height={800}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {vendor.isFeatured && (
              <Badge className={`${styles.pillFeatured} shadow-lg`}>
                <Zap className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {vendor.discount && (
              <Badge className={`${styles.pillDiscount} shadow-lg`}>
                {vendor.discount}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 rounded-full shadow-md"
              onClick={() => onToggleFavorite?.(vendor.id)}
              aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
            >
              <Heart 
                className={`h-4 w-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`} 
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 rounded-full shadow-md"
              onClick={handleShare}
              aria-label="Share vendor"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick stats overlay */}
        <div className="absolute bottom-4 left-4 right-4">
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
        </div>
      </div>

      {/* Card Content */}
      <CardContent className={styles.vendorContent}>
        {/* Vendor Header */}
        <div className={styles.vendorHeader}>
          {vendor.vendorImageUrl && (
            <Image
              src={vendor.vendorImageUrl}
              alt={`${vendor.name} logo`}
              width={48}
              height={48}
              className={styles.vendorAvatar}
            />
          )}
          <div className={styles.vendorInfo}>
            <h3 className={styles.vendorName}>
              {vendor.name}
            </h3>
            {vendor.tagline && (
              <p className={styles.vendorTagline}>
                {vendor.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Vendor Meta Information */}
        <div className={styles.vendorMeta}>
          {typeof vendor.rating === "number" && (
            <span 
              className={styles.pill}
              aria-label={`Rating ${vendor.rating} out of 5`}
            >
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              {vendor.rating.toFixed(1)}
            </span>
          )}
          
          {vendor.isVerified && (
            <span className={`${styles.pill} ${styles.pillVerified}`}>
              <Shield className="h-3 w-3" />
              Verified
            </span>
          )}
          
          {vendor.location && (
            <span className={styles.pill}>
              <MapPin className="h-3 w-3" />
              {vendor.location}
            </span>
          )}
          
          {vendor.categories?.slice(0, 2).map((category) => (
            <span key={category} className={styles.pill}>
              {category}
            </span>
          ))}
          
          {vendor.categories && vendor.categories.length > 2 && (
            <span className={`${styles.pill} bg-slate-100 text-slate-600`}>
              +{vendor.categories.length - 2} more
            </span>
          )}
        </div>

        {/* Pricing Information */}
        {vendor.pricePreview && (
          <div className={styles.vendorPrice}>
            <p className={styles.priceLabel}>Starting from</p>
            <p className={styles.priceValue}>{vendor.pricePreview}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.vendorActions}>
          <Button
            onClick={handleAddToCart}
            disabled={adding}
            className={`${styles.primaryButton} ${styles.focusable}`}
            aria-label={`Add ${vendor.name} to cart`}
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

          <Button
            asChild
            className={`${styles.secondaryButton} ${styles.focusable}`}
            aria-label={`Visit ${vendor.name} storefront`}
          >
            <Link href={vendor.href}>
              <Store className="h-4 w-4 mr-2" />
              Visit Store
            </Link>
          </Button>
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
      </CardContent>
    </article>
  );
}
