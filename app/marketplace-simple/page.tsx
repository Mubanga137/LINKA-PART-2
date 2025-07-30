"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Store, Star, MapPin } from "lucide-react";

export default function SimpleMarketplacePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Simple Marketplace
          </h1>
          <p className="text-xl text-slate-600">
            Testing basic marketplace functionality
          </p>
          {cartCount > 0 && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {cartCount} items in cart
            </div>
          )}
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Vendor 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden rounded-t-lg">
              <div className="absolute inset-0 bg-blue-500/20"></div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-500 text-white">Verified</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    4.8 Rating
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Artisan Crafts</h3>
                  <p className="text-sm text-slate-600">Handmade goods</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  Lusaka
                </Badge>
                <Badge variant="secondary" className="text-xs">Handmade</Badge>
                <Badge variant="secondary" className="text-xs">Decor</Badge>
              </div>

              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Starting from</p>
                <p className="text-lg font-bold text-slate-900">ZMW 95</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline">
                  <Store className="h-4 w-4 mr-2" />
                  Visit Store
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vendor 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden rounded-t-lg">
              <div className="absolute inset-0 bg-green-500/20"></div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-500 text-white">Featured</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    4.9 Rating
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Store className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Fresh Produce</h3>
                  <p className="text-sm text-slate-600">Organic vegetables</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  Ndola
                </Badge>
                <Badge variant="secondary" className="text-xs">Organic</Badge>
                <Badge variant="secondary" className="text-xs">Fresh</Badge>
              </div>

              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Starting from</p>
                <p className="text-lg font-bold text-slate-900">ZMW 25</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline">
                  <Store className="h-4 w-4 mr-2" />
                  Visit Store
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vendor 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative overflow-hidden rounded-t-lg">
              <div className="absolute inset-0 bg-purple-500/20"></div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-orange-500 text-white">15% OFF</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    4.6 Rating
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Store className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Tech Solutions</h3>
                  <p className="text-sm text-slate-600">Electronics & gadgets</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  Kitwe
                </Badge>
                <Badge variant="secondary" className="text-xs">Electronics</Badge>
                <Badge variant="secondary" className="text-xs">Tech</Badge>
              </div>

              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Starting from</p>
                <p className="text-lg font-bold text-slate-900">ZMW 120</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline">
                  <Store className="h-4 w-4 mr-2" />
                  Visit Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Marketing Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">18.2%</div>
                <div className="text-sm opacity-90">Revenue Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">45.2K</div>
                <div className="text-sm opacity-90">Total Reach</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">3.8%</div>
                <div className="text-sm opacity-90">Conversion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
