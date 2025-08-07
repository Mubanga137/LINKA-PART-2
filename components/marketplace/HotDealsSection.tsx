"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import {
  Flame,
  Clock,
  Lightning,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Crown,
  Diamond,
  Zap,
  Timer,
  TrendingUp,
  Users,
  Eye,
  AlertCircle,
  Gift
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HotDeal {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  vendor: {
    name: string;
    verified: boolean;
  };
  rating: number;
  reviewCount: number;
  endTime: Date;
  totalQuantity: number;
  soldQuantity: number;
  isFlashSale?: boolean;
  isTrending?: boolean;
  dealType: 'flash' | 'daily' | 'weekly' | 'clearance';
  dealLabel: string;
  views: number;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
}

const hotDeals: HotDeal[] = [
  {
    id: "deal1",
    name: "Premium Malachite Jewelry Set",
    description: "Complete jewelry set featuring authentic Zambian malachite stones",
    price: 199.99,
    originalPrice: 399.99,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"],
    category: "Jewelry",
    vendor: { name: "Gemstone Artisans", verified: true },
    rating: 4.8,
    reviewCount: 156,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    totalQuantity: 50,
    soldQuantity: 37,
    isFlashSale: true,
    dealType: 'flash',
    dealLabel: 'FLASH SALE',
    views: 2340,
    urgencyLevel: 'critical'
  },
  {
    id: "deal2",
    name: "Royal Chitenge Silk Collection",
    description: "Luxury silk chitenge with traditional royal patterns",
    price: 89.99,
    originalPrice: 159.99,
    images: ["https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80"],
    category: "Fashion",
    vendor: { name: "Royal Heritage", verified: true },
    rating: 4.9,
    reviewCount: 89,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    totalQuantity: 30,
    soldQuantity: 22,
    isTrending: true,
    dealType: 'daily',
    dealLabel: 'DAILY DEAL',
    views: 1890,
    urgencyLevel: 'high'
  },
  {
    id: "deal3",
    name: "Artisan Wood Sculpture",
    description: "Handcrafted elephant sculpture from sustainable hardwood",
    price: 149.99,
    originalPrice: 249.99,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"],
    category: "Art",
    vendor: { name: "Master Craftsmen", verified: true },
    rating: 4.7,
    reviewCount: 234,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    totalQuantity: 20,
    soldQuantity: 8,
    dealType: 'weekly',
    dealLabel: 'WEEKLY SPECIAL',
    views: 1456,
    urgencyLevel: 'medium'
  },
  {
    id: "deal4",
    name: "Copper Wire Basket Set",
    description: "Elegant handwoven copper baskets for luxury home decor",
    price: 79.99,
    originalPrice: 129.99,
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"],
    category: "Home Decor",
    vendor: { name: "Luxury Crafters", verified: true },
    rating: 4.6,
    reviewCount: 178,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    totalQuantity: 40,
    soldQuantity: 15,
    dealType: 'clearance',
    dealLabel: 'CLEARANCE',
    views: 987,
    urgencyLevel: 'medium'
  }
];

interface CountdownProps {
  endTime: Date;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
}

function CountdownTimer({ endTime, urgencyLevel }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const getUrgencyColors = () => {
    switch (urgencyLevel) {
      case 'critical':
        return 'from-red-600 via-red-500 to-orange-500';
      case 'high':
        return 'from-orange-600 via-orange-500 to-yellow-500';
      case 'medium':
        return 'from-yellow-600 via-amber-500 to-orange-500';
      default:
        return 'from-blue-600 via-blue-500 to-indigo-500';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {timeLeft.days > 0 && (
        <div className={`bg-gradient-to-br ${getUrgencyColors()} text-white px-3 py-2 rounded-xl shadow-lg text-center min-w-[60px] transform hover:scale-105 transition-all duration-300`}>
          <div className="text-lg font-bold">{timeLeft.days}</div>
          <div className="text-xs opacity-90">DAYS</div>
        </div>
      )}
      <div className={`bg-gradient-to-br ${getUrgencyColors()} text-white px-3 py-2 rounded-xl shadow-lg text-center min-w-[60px] transform hover:scale-105 transition-all duration-300 ${urgencyLevel === 'critical' ? 'animate-pulse' : ''}`}>
        <div className="text-lg font-bold">{timeLeft.hours}</div>
        <div className="text-xs opacity-90">HRS</div>
      </div>
      <div className={`bg-gradient-to-br ${getUrgencyColors()} text-white px-3 py-2 rounded-xl shadow-lg text-center min-w-[60px] transform hover:scale-105 transition-all duration-300 ${urgencyLevel === 'critical' ? 'animate-pulse' : ''}`}>
        <div className="text-lg font-bold">{timeLeft.minutes}</div>
        <div className="text-xs opacity-90">MIN</div>
      </div>
      <div className={`bg-gradient-to-br ${getUrgencyColors()} text-white px-3 py-2 rounded-xl shadow-lg text-center min-w-[60px] transform hover:scale-105 transition-all duration-300 ${urgencyLevel === 'critical' ? 'animate-bounce' : ''}`}>
        <div className="text-lg font-bold">{timeLeft.seconds}</div>
        <div className="text-xs opacity-90">SEC</div>
      </div>
    </div>
  );
}

export function HotDealsSection() {
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-red-50/50 via-orange-50/30 to-yellow-50/50">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Floating Fire Elements */}
        <div className="absolute top-20 left-1/6 w-40 h-40 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 right-1/6 w-32 h-32 bg-gradient-to-br from-orange-400/30 to-yellow-400/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-6 py-3 shadow-lg mb-6 animate-pulse">
            <Flame className="h-5 w-5" />
            <span className="font-bold">HOT DEALS</span>
            <Lightning className="h-5 w-5" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-red-700 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            🔥 Flash Sales & Hot Deals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Limited-time offers on premium products with massive discounts. Grab them before they're gone!
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotDeals.map((deal, index) => {
            const discountPercentage = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);
            const soldPercentage = (deal.soldQuantity / deal.totalQuantity) * 100;
            const remaining = deal.totalQuantity - deal.soldQuantity;

            return (
              <div
                key={deal.id}
                className="group relative"
                onMouseEnter={() => setSelectedDeal(deal.id)}
                onMouseLeave={() => setSelectedDeal(null)}
              >
                {/* Floating Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-400/40 via-orange-400/40 to-yellow-400/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
                
                {/* Deal Card */}
                <Card className="overflow-hidden bg-white/95 backdrop-blur-xl border-2 border-orange-100/60 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 h-full">
                  {/* Deal Type Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <Badge 
                      className={`px-3 py-1.5 text-xs font-bold shadow-lg border border-white/30 rounded-xl ${
                        deal.dealType === 'flash' 
                          ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white animate-pulse' 
                          : deal.dealType === 'daily'
                          ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white'
                          : deal.dealType === 'weekly'
                          ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      }`}
                    >
                      {deal.isFlashSale && <Zap className="h-3 w-3 mr-1" />}
                      {deal.dealLabel}
                    </Badge>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 text-sm font-bold shadow-lg border border-white/30 rounded-xl">
                      -{discountPercentage}%
                    </Badge>
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
                    <Image
                      src={deal.images[0]}
                      alt={deal.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Urgency Overlay */}
                    {deal.urgencyLevel === 'critical' && remaining <= 5 && (
                      <div className="absolute inset-0 bg-red-600/20 animate-pulse">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                            <AlertCircle className="h-4 w-4 mr-1 inline" />
                            ALMOST GONE!
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white font-medium"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white font-medium"
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-800 transition-colors">
                        {deal.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {deal.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        K{deal.price.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        K{deal.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Rating & Views */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{deal.rating}</span>
                        <span className="text-gray-500">({deal.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="h-3 w-3" />
                        <span>{deal.views}</span>
                      </div>
                    </div>

                    {/* Stock Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          <Users className="h-3 w-3 inline mr-1" />
                          {deal.soldQuantity} sold
                        </span>
                        <span className={`font-medium ${
                          remaining <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-700'
                        }`}>
                          {remaining} left
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            background: `linear-gradient(to right,
                              ${soldPercentage > 80 ? '#ef4444' : soldPercentage > 60 ? '#f97316' : '#22c55e'} 0%,
                              ${soldPercentage > 80 ? '#dc2626' : soldPercentage > 60 ? '#ea580c' : '#16a34a'} 100%)`,
                            width: `${soldPercentage}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 rounded-xl p-3 border border-orange-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-semibold text-gray-900">Deal Ends In:</span>
                      </div>
                      <CountdownTimer endTime={deal.endTime} urgencyLevel={deal.urgencyLevel} />
                    </div>

                    {/* Add to Cart Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Grab This Deal!
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* View All Deals Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/hot-deals">
              <Flame className="h-5 w-5 mr-2" />
              View All Hot Deals
              <Lightning className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
