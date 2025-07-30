"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  Star,
  ShoppingCart,
  Store
} from "lucide-react";

export default function MarketplacePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (vendorName: string) => {
    setCartCount(prev => prev + 1);
    console.log("Added to cart:", vendorName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 text-sm border border-blue-200">
              <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-medium">🛍️ Zambia's Premier Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Discover Local
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Businesses & Services
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Connect with verified local vendors, discover unique products, and support 
              Zambian businesses. From handmade crafts to fresh produce, find everything you need.
            </p>
          </div>

          {cartCount > 0 && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="font-medium">{cartCount} items in cart</span>
            </div>
          )}
        </section>

        {/* Sample Vendors */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Vendors</h2>
            <p className="text-slate-600">Discover local businesses in your area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vendor 1 */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden rounded-t-lg">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">Verified</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center text-sm text-slate-600">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      4.8 Rating • 127 Reviews
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Artisan Baskets Co.</h3>
                    <p className="text-sm text-slate-600">Handwoven goods by local makers</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">Lusaka</Badge>
                    <Badge variant="secondary" className="text-xs">Handmade</Badge>
                    <Badge variant="secondary" className="text-xs">Decor</Badge>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">Starting from</p>
                    <p className="text-lg font-bold text-slate-900">ZMW 95</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleAddToCart("Artisan Baskets Co.")}
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
                </div>
              </CardContent>
            </Card>

            {/* Vendor 2 */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden rounded-t-lg">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-500 text-white">Featured</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center text-sm text-slate-600">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      4.9 Rating • 243 Reviews
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Fresh Valley Organics</h3>
                    <p className="text-sm text-slate-600">Farm‑fresh organic produce delivered daily</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">Ndola</Badge>
                    <Badge variant="secondary" className="text-xs">Organic</Badge>
                    <Badge variant="secondary" className="text-xs">Fresh</Badge>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">Bundles from</p>
                    <p className="text-lg font-bold text-slate-900">ZMW 45</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleAddToCart("Fresh Valley Organics")}
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
                </div>
              </CardContent>
            </Card>

            {/* Vendor 3 */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative overflow-hidden rounded-t-lg">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white">15% OFF</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center text-sm text-slate-600">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      4.6 Rating • 89 Reviews
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">ZamTech Solutions</h3>
                    <p className="text-sm text-slate-600">Cutting-edge technology at affordable prices</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">Kitwe</Badge>
                    <Badge variant="secondary" className="text-xs">Electronics</Badge>
                    <Badge variant="secondary" className="text-xs">Tech</Badge>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">Starting from</p>
                    <p className="text-lg font-bold text-slate-900">ZMW 120</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleAddToCart("ZamTech Solutions")}
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
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Marketplace Stats</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">8+</div>
              <div className="text-sm text-slate-600">Active Vendors</div>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">4.7</div>
              <div className="text-sm text-slate-600">Avg Rating</div>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">459</div>
              <div className="text-sm text-slate-600">Total Reviews</div>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-600">Delivery</div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white relative overflow-hidden rounded-3xl p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Selling?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join hundreds of successful vendors on Zambia's fastest-growing marketplace. 
              Start your online business today with zero setup fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl"
              >
                Become a Vendor
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-4 rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
