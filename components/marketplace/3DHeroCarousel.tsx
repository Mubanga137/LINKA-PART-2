"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Crown,
  Diamond,
  Star,
  ShoppingCart,
  ExternalLink,
  Award,
  Sparkles,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeroProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  heroImage: string;
  category: string;
  vendor: {
    name: string;
    verified: boolean;
  };
  rating: number;
  luxuryRating: number;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  flashSale?: boolean;
}

const heroProducts: HeroProduct[] = [
  {
    id: "hero1",
    name: "Imperial Malachite Crown Collection",
    description: "Exquisite handcrafted imperial crown featuring authentic Zambian malachite stones, exclusively available at Linka Royale",
    price: 4999.99,
    originalPrice: 7499.99,
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
    category: "Imperial Jewelry",
    vendor: { name: "Linka Royale Artisans", verified: true },
    rating: 5.0,
    luxuryRating: 5,
    tags: ["Imperial", "Handcrafted", "Malachite", "Exclusive"],
    isFeatured: true,
    isNew: true
  },
  {
    id: "hero2",
    name: "Royal Chitenge Ceremonial Collection",
    description: "Magnificent royal ceremonial attire crafted from premium silk with 24k gold threading, exclusively curated by Linka Royale",
    price: 2299.99,
    originalPrice: 3499.99,
    heroImage: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=1200&q=80",
    category: "Royal Fashion",
    vendor: { name: "Linka Royale Fashion House", verified: true },
    rating: 4.9,
    luxuryRating: 5,
    tags: ["Royal", "Silk", "24k Gold", "Ceremonial"],
    isFeatured: true,
    flashSale: true
  },
  {
    id: "hero3",
    name: "Sovereign Artisan Wood Sculptures",
    description: "Magnificent sovereign sculptures carved from rare Zambian hardwood by master artisans, exclusive to Linka Royale",
    price: 1599.99,
    originalPrice: 2299.99,
    heroImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
    category: "Sovereign Art",
    vendor: { name: "Linka Royale Craftsmen", verified: true },
    rating: 4.8,
    luxuryRating: 5,
    tags: ["Sovereign", "Rare Wood", "Wildlife", "Exclusive"],
    isFeatured: true
  }
];

export function HeroCarousel3D() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  const currentProduct = heroProducts[currentSlide];

  return (
    <section
      className="relative h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Royal 3D Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Royal Gradient Background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-amber-500/30 to-yellow-600/20 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at ${50 + currentSlide * 10}% ${50 + currentSlide * 5}%, rgba(255, 215, 0, 0.3) 0%, rgba(255, 193, 7, 0.2) 25%, rgba(255, 215, 0, 0.1) 50%, transparent 75%)`
          }}
        />

        {/* Floating Royal Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-royal-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Carousel Container */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 z-20 relative">
              {/* Category & Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-blue-900 px-4 py-2 text-sm font-bold rounded-xl shadow-lg border border-yellow-300/30">
                  <Crown className="h-4 w-4 mr-2" />
                  {currentProduct.category}
                </Badge>
                {currentProduct.isNew && (
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 text-sm rounded-lg animate-pulse border border-emerald-300/30">
                    EXCLUSIVE
                  </Badge>
                )}
                {currentProduct.flashSale && (
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-3 py-1.5 text-sm rounded-lg animate-bounce border border-red-300/30">
                    <Zap className="h-3 w-3 mr-1" />
                    ROYAL SALE
                  </Badge>
                )}
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black leading-tight font-serif">
                  <span className="bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
                    {currentProduct.name}
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100/90 leading-relaxed max-w-2xl font-sans">
                  {currentProduct.description}
                </p>
              </div>

              {/* Premium Features */}
              <div className="flex flex-wrap gap-2">
                {currentProduct.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="outline" 
                    className="border-amber-200/50 bg-white/10 backdrop-blur-xl text-white px-3 py-1.5 text-sm rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Pricing & Rating */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                    K{currentProduct.price.toFixed(2)}
                  </span>
                  {currentProduct.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl text-amber-200/60 line-through">
                        K{currentProduct.originalPrice.toFixed(2)}
                      </span>
                      <Badge className="bg-green-500/20 text-green-200 border border-green-400/30 px-3 py-1">
                        Save K{(currentProduct.originalPrice - currentProduct.price).toFixed(2)}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Rating & Luxury Score */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(currentProduct.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-400'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-white font-semibold text-lg">{currentProduct.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Diamond className="h-5 w-5 text-amber-400" />
                    <span className="text-white font-semibold text-lg">{currentProduct.luxuryRating}/5 Luxury</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 px-8 py-4 text-lg rounded-xl shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href={`/products/${currentProduct.id}`}>
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View Details
                  </Link>
                </Button>
              </div>

              {/* Vendor Info */}
              <div className="flex items-center gap-3">
                <span className="text-amber-200/80">by</span>
                <span className="text-white font-semibold">{currentProduct.vendor.name}</span>
                {currentProduct.vendor.verified && (
                  <Badge className="bg-blue-500/20 text-blue-200 border border-blue-400/30 px-2 py-0.5 text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[600px] h-[400px] perspective-1000">
              <div 
                className="relative h-full w-full transform-gpu transition-all duration-700 hover:scale-105 hover:rotate-y-3"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Main Product Image */}
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={currentProduct.heroImage}
                    alt={currentProduct.name}
                    fill
                    className="object-cover transition-all duration-700"
                    priority
                  />
                  
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating 3D Elements */}
                  <div className="absolute inset-0">
                    {/* Luxury Indicators */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30">
                        <Crown className="h-8 w-8 text-amber-300" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30">
                        <Sparkles className="h-8 w-8 text-yellow-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D Shadow */}
                <div className="absolute inset-0 bg-black/20 transform translate-x-4 translate-y-4 rounded-3xl -z-10 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-4">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={prevSlide}
              className="text-white hover:bg-white/20 rounded-xl p-3"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={nextSlide}
              className="text-white hover:bg-white/20 rounded-xl p-3"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Auto Play Toggle */}
            <div className="w-px h-8 bg-white/20 mx-2" />
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-white hover:bg-white/20 rounded-xl p-3"
            >
              {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / heroProducts.length) * 100}%`
          }}
        />
      </div>
    </section>
  );
}

// Custom CSS for animations (add to globals.css)
const customStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(-5px) rotate(240deg); }
}

.animate-float {
  animation: float linear infinite;
}

.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-3 {
  transform: rotateY(3deg);
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
`;
