"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Smartphone, Star, ShoppingCart, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockElectronicsProducts = [
  {
    id: "el1",
    name: "Samsung Galaxy Smartphone",
    description: "Latest Android smartphone with advanced camera features",
    price: 450.00,
    originalPrice: 520.00,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    rating: 4.5,
    reviews: 234,
    vendor: "Tech Store Zambia",
    inStock: true
  },
  {
    id: "el2", 
    name: "Wireless Headphones",
    description: "High-quality bluetooth headphones with noise cancellation",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400&q=80",
    rating: 4.3,
    reviews: 156,
    vendor: "Audio Plus",
    inStock: true
  },
  {
    id: "el3",
    name: "Laptop Computer",
    description: "Performance laptop perfect for work and gaming",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    rating: 4.7,
    reviews: 89,
    vendor: "Computer World",
    inStock: true
  },
  {
    id: "el4",
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with health monitoring",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&q=80",
    rating: 4.6,
    reviews: 203,
    vendor: "Gadget Hub",
    inStock: true
  }
];

export default function ElectronicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/categories" className="hover:text-blue-600 transition-colors">
            Categories
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Electronics</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Electronics</h1>
              <p className="text-gray-600 mt-1">Smartphones, laptops, gaming gear & tech accessories</p>
            </div>
          </div>
          
          <Link href="/categories">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">950+</div>
              <div className="text-sm text-gray-600">Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">120+</div>
              <div className="text-sm text-gray-600">Vendors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">4.6</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Badge className="bg-orange-500 text-white">Trending</Badge>
              <div className="text-sm text-gray-600 mt-1">Category</div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockElectronicsProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      Save K{(product.originalPrice - product.price).toFixed(0)}
                    </Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      K{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        K{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <span className="text-xs">{product.vendor}</span>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subcategories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Subcategories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "Mobile Phones",
              "Computers", 
              "Gaming",
              "Audio",
              "Accessories"
            ].map((subcategory) => (
              <Card key={subcategory} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium text-gray-900">{subcategory}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
