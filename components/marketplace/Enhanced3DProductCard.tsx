"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  ShoppingCart,
  Heart,
  Crown,
  Award,
  Diamond,
  Shield,
  Truck,
  RefreshCw,
  Gift,
  Eye,
  Share2,
  ExternalLink,
  CheckCircle,
  Verified,
  Sparkles,
  Medal,
  Clock,
  Zap,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Enhanced3DProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    vendor: {
      id: string;
      name: string;
      logo: string;
      verified: boolean;
      premiumSeller: boolean;
    };
    rating: number;
    reviewCount: number;
    premiumFeatures: string[];
    luxuryRating: number;
    handcrafted?: boolean;
    limitedEdition?: boolean;
    exclusiveDesign?: boolean;
    premiumMaterials?: string[];
    certifications?: string[];
    warranty: string;
    views: number;
    soldCount: number;
    tags: string[];
    stockLevel?: number;
    trending?: boolean;
    flashSale?: boolean;
    saleEndTime?: Date;
  };
  variant?: 'standard' | 'hero' | 'featured';
  className?: string;
}

export function Enhanced3DProductCard({ 
  product, 
  variant = 'standard',
  className = "" 
}: Enhanced3DProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setIsHovered(false);
  };

  const getCardSize = () => {
    switch (variant) {
      case 'hero':
        return 'aspect-[16/9] lg:aspect-[21/9]';
      case 'featured':
        return 'aspect-[4/5]';
      default:
        return 'aspect-[4/3]';
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stockLevel && product.stockLevel <= 5;
  const isVeryLowStock = product.stockLevel && product.stockLevel <= 2;

  return (
    <div 
      className={`group relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Floating Light Effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-300/10 via-yellow-200/20 to-amber-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

      <Card
        ref={cardRef}
        className={`
          overflow-hidden border-2 border-amber-100/60 shadow-xl hover:shadow-2xl 
          transition-all duration-500 bg-white/95 backdrop-blur-xl
          hover:border-amber-200/80 group-hover:-translate-y-2
          ${variant === 'hero' ? 'min-h-[400px] lg:min-h-[500px]' : ''}
          ${variant === 'featured' ? 'min-h-[480px]' : ''}
        `}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, box-shadow 0.5s ease, border-color 0.3s ease'
        }}
      >
        {/* Premium Badges - Multiple Layers */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
          {/* Primary Premium Badge */}
          <Badge className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white px-3 py-1.5 shadow-lg border border-white/30 text-sm font-bold rounded-xl">
            <Crown className="h-4 w-4 mr-1.5" />
            Premium
          </Badge>
          
          {/* Special Attributes */}
          <div className="flex flex-col gap-1.5">
            {product.trending && (
              <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg animate-pulse">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
            {product.flashSale && (
              <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg animate-bounce">
                <Zap className="h-3 w-3 mr-1" />
                Flash Sale
              </Badge>
            )}
            {product.handcrafted && (
              <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg">
                <Award className="h-3 w-3 mr-1" />
                Handcrafted
              </Badge>
            )}
            {product.limitedEdition && (
              <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg">
                <Medal className="h-3 w-3 mr-1" />
                Limited
              </Badge>
            )}
            {product.exclusiveDesign && (
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                Exclusive
              </Badge>
            )}
          </div>
        </div>

        {/* Top Right - Luxury Rating & Stock Status */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 items-end">
          {/* Luxury Rating */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg border border-amber-100/60">
            <Diamond className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-900">{product.luxuryRating}/5</span>
          </div>
          
          {/* Stock Status */}
          {isVeryLowStock && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs shadow-md animate-pulse">
              Only {product.stockLevel} left!
            </Badge>
          )}
          {isLowStock && !isVeryLowStock && (
            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 text-xs shadow-md">
              Low Stock ({product.stockLevel})
            </Badge>
          )}
        </div>

        {/* Main Image Container */}
        <div className={`relative ${getCardSize()} bg-gradient-to-br from-amber-50/80 to-yellow-50/80 overflow-hidden`}>
          {/* Primary Image */}
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            priority={variant === 'hero'}
          />
          
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Floating Action Buttons */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => setIsInWishlist(!isInWishlist)}
              >
                <Heart className={`h-4 w-4 mr-1 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                {isInWishlist ? 'Saved' : 'Save'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                asChild
              >
                <Link href={`/vendors/${product.vendor.id}`}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Store
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className={`${variant === 'hero' ? 'p-8' : variant === 'featured' ? 'p-6' : 'p-5'}`}>
          {/* Vendor Information */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Image
                src={product.vendor.logo}
                alt={product.vendor.name}
                width={24}
                height={24}
                className="rounded-full object-cover ring-2 ring-amber-100"
              />
              {product.vendor.verified && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                  <Verified className="h-2.5 w-2.5 text-white" />
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-amber-900">{product.vendor.name}</span>
            {product.vendor.premiumSeller && (
              <Badge className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 border border-amber-200 rounded-md">
                <Crown className="h-2.5 w-2.5 mr-1" />
                Premium
              </Badge>
            )}
          </div>

          {/* Product Title & Description */}
          <div className="mb-5">
            <h3 className={`font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-amber-800 transition-colors ${
              variant === 'hero' ? 'text-2xl lg:text-3xl' : 
              variant === 'featured' ? 'text-xl' : 'text-lg'
            }`}>
              {product.name}
            </h3>
            <p className={`text-gray-600 line-clamp-2 leading-relaxed ${
              variant === 'hero' ? 'text-base' : 'text-sm'
            }`}>
              {product.description}
            </p>
          </div>

          {/* Premium Features Pills */}
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {product.premiumFeatures.slice(0, variant === 'hero' ? 5 : 3).map((feature) => (
                <Badge 
                  key={feature} 
                  variant="outline" 
                  className="text-xs border-amber-200 text-amber-700 bg-amber-50/50 hover:bg-amber-100/50 transition-colors rounded-full px-3 py-1"
                >
                  {feature}
                </Badge>
              ))}
              {product.premiumFeatures.length > (variant === 'hero' ? 5 : 3) && (
                <Badge 
                  variant="outline" 
                  className="text-xs border-gray-200 text-gray-500 bg-gray-50 rounded-full px-3 py-1"
                >
                  +{product.premiumFeatures.length - (variant === 'hero' ? 5 : 3)} more
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="flex items-center gap-3 mb-5">
            <span className={`font-bold text-amber-600 ${
              variant === 'hero' ? 'text-3xl' : variant === 'featured' ? 'text-2xl' : 'text-xl'
            }`}>
              K{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <div className="flex items-center gap-2">
                <span className={`text-gray-400 line-through ${
                  variant === 'hero' ? 'text-xl' : 'text-lg'
                }`}>
                  K{product.originalPrice.toFixed(2)}
                </span>
                <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-1 rounded-md">
                  -{discountPercentage}%
                </Badge>
              </div>
            )}
          </div>

          {/* Rating and Social Proof */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-900">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{product.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShoppingCart className="h-3 w-3" />
                <span>{product.soldCount} sold</span>
              </div>
            </div>
          </div>

          {/* Trust & Security Guarantees */}
          <div className="bg-gradient-to-r from-amber-50/80 via-yellow-50/60 to-amber-50/80 rounded-xl p-4 mb-5 border border-amber-100/60">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-700">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-600" />
                <span className="font-medium">{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Premium Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-4 py-3 border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-700 hover:text-amber-800 rounded-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href={`/products/${product.id}`}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Certifications & Trust Signals */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="font-medium">{product.certifications.join(" • ")}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
