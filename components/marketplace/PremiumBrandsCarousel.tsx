"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Star,
  Award,
  Diamond,
  Shield,
  Verified,
  TrendingUp,
  Users,
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PremiumBrand {
  id: string;
  name: string;
  description: string;
  logo: string;
  bannerImage: string;
  category: string;
  establishedYear: number;
  verified: boolean;
  premiumPartner: boolean;
  rating: number;
  totalProducts: number;
  totalSales: number;
  customerCount: number;
  specialization: string[];
  awards: string[];
  isExclusive: boolean;
  isTrending: boolean;
  brandValue: string;
  qualityScore: number;
}

const premiumBrands: PremiumBrand[] = [
  {
    id: "brand1",
    name: "Royal Heritage Artisans",
    description: "Masters of traditional Zambian craftsmanship, creating authentic luxury pieces that tell the story of our rich cultural heritage",
    logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&q=80",
    bannerImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    category: "Traditional Crafts",
    establishedYear: 1985,
    verified: true,
    premiumPartner: true,
    rating: 4.9,
    totalProducts: 156,
    totalSales: 12540,
    customerCount: 8920,
    specialization: ["Malachite Jewelry", "Traditional Sculptures", "Royal Artifacts"],
    awards: ["Master Craftsman Award 2023", "Cultural Heritage Excellence"],
    isExclusive: true,
    isTrending: true,
    brandValue: "Premium Heritage",
    qualityScore: 98
  },
  {
    id: "brand2",
    name: "Zambian Luxury Fashion House",
    description: "Contemporary luxury fashion meets traditional Zambian textiles in our exclusive collections worn by celebrities and royalty",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&q=80",
    bannerImage: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=600&q=80",
    category: "Luxury Fashion",
    establishedYear: 1998,
    verified: true,
    premiumPartner: true,
    rating: 4.8,
    totalProducts: 89,
    totalSales: 8920,
    customerCount: 5640,
    specialization: ["Chitenge Couture", "Silk Collections", "Royal Ceremonies"],
    awards: ["Fashion Excellence Award", "International Design Recognition"],
    isExclusive: true,
    isTrending: false,
    brandValue: "Luxury Fashion",
    qualityScore: 96
  },
  {
    id: "brand3",
    name: "Master Woodcraft Collective",
    description: "Sustainable luxury woodcraft using indigenous Zambian hardwoods, creating masterpieces that blend art with functionality",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    category: "Art & Sculptures",
    establishedYear: 1992,
    verified: true,
    premiumPartner: true,
    rating: 4.7,
    totalProducts: 234,
    totalSales: 15670,
    customerCount: 11250,
    specialization: ["Wildlife Sculptures", "Functional Art", "Custom Commissions"],
    awards: ["Sustainable Craftsmanship Award", "Artisan Excellence"],
    isExclusive: false,
    isTrending: true,
    brandValue: "Sustainable Luxury",
    qualityScore: 94
  },
  {
    id: "brand4",
    name: "Zambian Gourmet Collection",
    description: "Premium organic coffee and gourmet foods showcasing the finest flavors from Zambian soil, loved by connoisseurs worldwide",
    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&q=80",
    bannerImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
    category: "Gourmet Foods",
    establishedYear: 2005,
    verified: true,
    premiumPartner: true,
    rating: 4.9,
    totalProducts: 67,
    totalSales: 23450,
    customerCount: 18740,
    specialization: ["Premium Coffee", "Organic Honey", "Traditional Delicacies"],
    awards: ["Organic Excellence Certification", "International Taste Award"],
    isExclusive: false,
    isTrending: true,
    brandValue: "Gourmet Excellence",
    qualityScore: 97
  },
  {
    id: "brand5",
    name: "Executive Leather Works",
    description: "Handcrafted luxury leather goods using traditional techniques and premium materials for the modern executive",
    logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150&q=80",
    bannerImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    category: "Business Accessories",
    establishedYear: 2001,
    verified: true,
    premiumPartner: true,
    rating: 4.8,
    totalProducts: 45,
    totalSales: 6780,
    customerCount: 4320,
    specialization: ["Executive Briefcases", "Luxury Wallets", "Custom Leather Goods"],
    awards: ["Leather Quality Excellence", "Executive Choice Award"],
    isExclusive: true,
    isTrending: false,
    brandValue: "Executive Excellence",
    qualityScore: 95
  }
];

export function PremiumBrandsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => 
          prev + visibleCards >= premiumBrands.length ? 0 : prev + 1
        );
      }, 4000);
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
  }, [isAutoPlaying, visibleCards]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + visibleCards >= premiumBrands.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, premiumBrands.length - visibleCards) : prev - 1
    );
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-amber-50/60 via-yellow-50/40 to-amber-50/60">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-amber-400/20 via-yellow-300/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-yellow-400/20 via-amber-300/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white rounded-full px-8 py-4 shadow-xl mb-8 border border-white/20">
            <Crown className="h-6 w-6" />
            <span className="font-bold text-lg">PREMIUM BRANDS</span>
            <Diamond className="h-6 w-6" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-900 bg-clip-text text-transparent mb-6">
            ✨ Exclusive Brand Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium brands, each representing the pinnacle of Zambian craftsmanship and luxury
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="lg"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-xl border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50 rounded-full w-14 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-amber-700" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-xl border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50 rounded-full w-14 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-amber-700" />
          </Button>

          {/* Brands Carousel */}
          <div 
            className="flex gap-6 transition-transform duration-700 ease-in-out px-16"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
            }}
          >
            {premiumBrands.map((brand, index) => (
              <div
                key={brand.id}
                className="group relative flex-shrink-0"
                style={{ width: `${100 / visibleCards}%` }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Gold Embossed Effect */}
                <div className="absolute -inset-6 bg-gradient-to-br from-amber-400/30 via-yellow-300/30 to-amber-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-300/20 via-yellow-200/20 to-amber-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                
                {/* Brand Card */}
                <Card className="overflow-hidden bg-white/95 backdrop-blur-xl border-2 border-amber-100/80 shadow-xl hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-4 h-full transform-gpu perspective-1000">
                  {/* Premium Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                    <Badge className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white px-3 py-1.5 shadow-lg border border-white/30 text-sm font-bold rounded-xl">
                      <Crown className="h-3 w-3 mr-1.5" />
                      Premium
                    </Badge>
                    {brand.isExclusive && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg">
                        <Diamond className="h-2.5 w-2.5 mr-1" />
                        Exclusive
                      </Badge>
                    )}
                    {brand.isTrending && (
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2.5 py-1 text-xs shadow-md border border-white/20 rounded-lg animate-pulse">
                        <TrendingUp className="h-2.5 w-2.5 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  {/* Quality Score */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/95 backdrop-blur-xl rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg border border-amber-100/60">
                      <Shield className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-bold text-amber-900">{brand.qualityScore}%</span>
                    </div>
                  </div>

                  {/* Brand Banner */}
                  <div className="relative h-48 bg-gradient-to-br from-amber-50 to-yellow-50 overflow-hidden">
                    <Image
                      src={brand.bannerImage}
                      alt={brand.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Brand Logo Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/95 backdrop-blur-xl rounded-xl p-3 shadow-lg border border-white/30">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>

                    {/* Establishment Year */}
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 text-xs border border-white/50 rounded-lg">
                        Est. {brand.establishedYear}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Brand Name & Verification */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-2 leading-tight group-hover:text-amber-800 transition-colors">
                          {brand.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 border border-amber-200 rounded-md">
                            {brand.category}
                          </Badge>
                          {brand.verified && (
                            <Badge className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 border border-blue-200 rounded-md">
                              <Verified className="h-2.5 w-2.5 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {brand.description}
                    </p>

                    {/* Specializations */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Specializations</span>
                      <div className="flex flex-wrap gap-1.5">
                        {brand.specialization.slice(0, 3).map((spec) => (
                          <Badge 
                            key={spec} 
                            variant="outline" 
                            className="text-xs border-amber-200 text-amber-700 bg-amber-50/50 rounded-full px-2.5 py-0.5"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Brand Stats */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-amber-600">{brand.totalProducts}</div>
                        <div className="text-xs text-gray-500">Products</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-amber-600">{(brand.customerCount / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-gray-500">Customers</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-lg font-bold text-amber-600">{brand.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                    </div>

                    {/* Awards */}
                    {brand.awards.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-600" />
                          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Recent Awards</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {brand.awards.join(" • ")}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        asChild
                      >
                        <Link href={`/vendors/${brand.id}`}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Visit Store
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="px-4 py-3 border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-700 hover:text-amber-800 rounded-xl transition-all duration-300"
                        asChild
                      >
                        <Link href={`/brands/${brand.id}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(premiumBrands.length / visibleCards) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / visibleCards) === index
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 shadow-lg scale-125' 
                      : 'bg-amber-200 hover:bg-amber-300'
                  }`}
                  onClick={() => setCurrentIndex(index * visibleCards)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Brands Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-700 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/brands">
              <Crown className="h-5 w-5 mr-2" />
              Explore All Premium Brands
              <Diamond className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
