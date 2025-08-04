"use client";

import { Button } from "@/components/ui/button";
import { Heart, Truck, Music, Grid3X3, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ShopByCategoryProps {
  showAll?: boolean;
  maxItems?: number;
}

export function ShopByCategorySection({ showAll = false, maxItems = 6 }: ShopByCategoryProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of professional services from verified local providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Link href="/services/health-wellness" className="group">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Health & Wellness</h3>
              <p className="text-sm text-gray-600">120+ providers</p>
            </div>
          </Link>

          <Link href="/services/courier-delivery" className="group">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Transportation</h3>
              <p className="text-sm text-gray-600">85+ providers</p>
            </div>
          </Link>

          <Link href="/services/entertainment-events" className="group">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Entertainment</h3>
              <p className="text-sm text-gray-600">55+ providers</p>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-semibold shadow-lg"
            asChild
          >
            <Link href="/services">
              <Grid3X3 className="mr-3 h-5 w-5" />
              Explore All Categories
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
