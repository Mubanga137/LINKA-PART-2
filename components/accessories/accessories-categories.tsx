"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Men's Accessories",
    description: "Watches, wallets, belts & more",
    image: "/placeholder.svg?height=300&width=400&text=Men's+Accessories",
    href: "/categories/fashion-textiles/accessories/mens",
    count: "500+ items",
    featured: true
  },
  {
    id: 2,
    name: "Women's Accessories", 
    description: "Jewelry, handbags, scarves & more",
    image: "/placeholder.svg?height=300&width=400&text=Women's+Accessories",
    href: "/categories/fashion-textiles/accessories/womens",
    count: "800+ items",
    featured: true
  },
  {
    id: 3,
    name: "Kids Accessories",
    description: "Backpacks, hair clips, toys & more",
    image: "/placeholder.svg?height=300&width=400&text=Kids+Accessories", 
    href: "/categories/fashion-textiles/accessories/kids",
    count: "300+ items",
    featured: false
  },
  {
    id: 4,
    name: "Jewelry",
    description: "Necklaces, earrings, bracelets",
    image: "/placeholder.svg?height=300&width=400&text=Jewelry",
    href: "/categories/jewelry-accessories",
    count: "600+ items",
    featured: true
  },
  {
    id: 5,
    name: "Bags & Luggage",
    description: "Handbags, backpacks, suitcases",
    image: "/placeholder.svg?height=300&width=400&text=Bags",
    href: "/categories/fashion-textiles/bags",
    count: "400+ items",
    featured: false
  },
  {
    id: 6,
    name: "Sunglasses",
    description: "Designer & casual eyewear",
    image: "/placeholder.svg?height=300&width=400&text=Sunglasses",
    href: "/categories/fashion-textiles/eyewear",
    count: "200+ items",
    featured: false
  }
]

export default function AccessoriesCategories() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our extensive collection of accessories organized by category. 
            Find exactly what you're looking for with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {category.featured && (
                    <Badge className="absolute top-3 left-3 bg-indigo-600 text-white">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                  <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
