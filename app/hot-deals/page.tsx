"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SideNavigation } from "@/components/ui/side-navigation";
import { MinimalHeader } from "@/components/ui/minimal-header";
import {
  Flame,
  Timer,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Zap,
  Gift,
  Percent,
  Clock,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HotDeal {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  vendor: {
    name: string;
    verified: boolean;
  };
  rating: number;
  reviewCount: number;
  soldCount: number;
  stockLeft: number;
  timeLeft: string;
  category: string;
  tags: string[];
  hotLevel: 'hot' | 'super-hot' | 'ultra-hot';
}

const hotDeals: HotDeal[] = [
  {
    id: "hd1",
    name: "Gaming Headset Pro Max",
    description: "Professional gaming headset with 7.1 surround sound and RGB lighting",
    price: 89.99,
    originalPrice: 179.99,
    discountPercentage: 50,
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=600&q=80",
    vendor: { name: "Electronics Hub", verified: true },
    rating: 4.8,
    reviewCount: 234,
    soldCount: 156,
    stockLeft: 23,
    timeLeft: "2h 15m",
    category: "Electronics",
    tags: ["gaming", "headset", "rgb"],
    hotLevel: "ultra-hot"
  },
  {
    id: "hd2",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 129.99,
    originalPrice: 249.99,
    discountPercentage: 48,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80",
    vendor: { name: "TechGear Plus", verified: true },
    rating: 4.6,
    reviewCount: 189,
    soldCount: 98,
    stockLeft: 45,
    timeLeft: "5h 42m",
    category: "Wearables",
    tags: ["fitness", "smartwatch", "health"],
    hotLevel: "super-hot"
  },
  {
    id: "hd3",
    name: "Wireless Bluetooth Earbuds",
    description: "Premium wireless earbuds with noise cancellation and wireless charging case",
    price: 79.99,
    originalPrice: 159.99,
    discountPercentage: 50,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    vendor: { name: "Audio Excellence", verified: true },
    rating: 4.7,
    reviewCount: 167,
    soldCount: 203,
    stockLeft: 12,
    timeLeft: "1h 33m",
    category: "Audio",
    tags: ["wireless", "bluetooth", "earbuds"],
    hotLevel: "ultra-hot"
  },
  {
    id: "hd4",
    name: "4K Webcam Ultra HD",
    description: "Professional 4K webcam with auto-focus and built-in microphone",
    price: 59.99,
    originalPrice: 119.99,
    discountPercentage: 50,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80",
    vendor: { name: "StreamTech Pro", verified: true },
    rating: 4.5,
    reviewCount: 145,
    soldCount: 87,
    stockLeft: 34,
    timeLeft: "3h 21m",
    category: "Electronics",
    tags: ["webcam", "4k", "streaming"],
    hotLevel: "hot"
  },
  {
    id: "hd5",
    name: "Zambian Coffee Premium Blend",
    description: "Authentic Zambian coffee beans, freshly roasted and ground",
    price: 24.99,
    originalPrice: 39.99,
    discountPercentage: 38,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
    vendor: { name: "Zambian Coffee Co.", verified: true },
    rating: 4.9,
    reviewCount: 298,
    soldCount: 445,
    stockLeft: 67,
    timeLeft: "12h 45m",
    category: "Food & Beverages",
    tags: ["coffee", "zambian", "premium"],
    hotLevel: "super-hot"
  },
  {
    id: "hd6",
    name: "Traditional Chitenge Dress",
    description: "Beautiful handmade chitenge dress with traditional Zambian patterns",
    price: 45.99,
    originalPrice: 89.99,
    discountPercentage: 49,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    vendor: { name: "Heritage Fashion", verified: true },
    rating: 4.8,
    reviewCount: 123,
    soldCount: 78,
    stockLeft: 19,
    timeLeft: "6h 18m",
    category: "Fashion",
    tags: ["chitenge", "traditional", "handmade"],
    hotLevel: "hot"
  }
];

export default function HotDealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 23,
    seconds: 45
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getHotLevelColor = (level: string) => {
    switch (level) {
      case 'ultra-hot':
        return 'from-red-500 to-orange-500';
      case 'super-hot':
        return 'from-orange-500 to-yellow-500';
      case 'hot':
        return 'from-yellow-500 to-amber-500';
      default:
        return 'from-red-500 to-orange-500';
    }
  };

  const getHotLevelText = (level: string) => {
    switch (level) {
      case 'ultra-hot':
        return 'ULTRA HOT';
      case 'super-hot':
        return 'SUPER HOT';
      case 'hot':
        return 'HOT DEAL';
      default:
        return 'HOT DEAL';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Side Navigation */}
      <SideNavigation variant="marketplace" />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <MinimalHeader variant="marketplace" showSearch={true} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-full px-6 py-3 mb-6 border border-red-200">
              <Flame className="h-6 w-6 text-red-600 animate-pulse" />
              <span className="text-red-800 font-medium">Limited Time Offers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              🔥 Hot Deals
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Incredible discounts on amazing products - but hurry, these deals won't last long!
            </p>
            
            {/* Countdown Timer */}
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200">
              <Timer className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-slate-600 mb-1">Next flash sale ends in:</p>
                <div className="flex items-center gap-2 text-2xl font-bold text-red-600">
                  <span className="bg-red-100 px-3 py-1 rounded-lg">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-red-100 px-3 py-1 rounded-lg">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-red-100 px-3 py-1 rounded-lg">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Active Deals", value: "156", icon: Flame, color: "text-red-600" },
              { label: "Avg. Discount", value: "45%", icon: Percent, color: "text-orange-600" },
              { label: "Happy Customers", value: "12.5K", icon: Users, color: "text-yellow-600" },
              { label: "Items Sold Today", value: "2,847", icon: TrendingUp, color: "text-green-600" }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Hot Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotDeals.map((deal, index) => (
              <Card key={deal.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hot Level Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`bg-gradient-to-r ${getHotLevelColor(deal.hotLevel)} text-white font-bold animate-pulse shadow-lg`}>
                      <Flame className="h-3 w-3 mr-1" />
                      {getHotLevelText(deal.hotLevel)}
                    </Badge>
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white font-bold text-lg px-3 py-1">
                      -{deal.discountPercentage}%
                    </Badge>
                  </div>
                  
                  {/* Stock Warning */}
                  {deal.stockLeft < 30 && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="destructive" className="animate-pulse">
                        Only {deal.stockLeft} left!
                      </Badge>
                    </div>
                  )}
                  
                  {/* Time Left */}
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-slate-900 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {deal.timeLeft}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Vendor */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-slate-600">{deal.vendor.name}</span>
                    {deal.vendor.verified && (
                      <Badge variant="outline" className="text-xs">Verified</Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">
                    {deal.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {deal.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-red-600">
                      K{deal.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      K{deal.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Rating & Sales */}
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{deal.rating}</span>
                      <span>({deal.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{deal.soldCount} sold</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {deal.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <CardContent className="p-8 text-center">
              <Gift className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Don't Miss Out!</h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                Get notified when new hot deals become available. Join thousands of smart shoppers saving big!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Deal Alerts
                </Button>
                <Link href="/marketplace">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
