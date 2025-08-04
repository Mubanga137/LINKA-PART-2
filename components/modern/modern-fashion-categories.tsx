"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Men's Modern",
    description: "Contemporary styles for men",
    href: "/categories/fashion-textiles/modern/mens",
    image: "/placeholder.svg?height=300&width=400&text=Men's+Modern"
  },
  {
    id: 2,
    name: "Women's Modern", 
    description: "Trendy fashion for women",
    href: "/categories/fashion-textiles/modern/womens",
    image: "/placeholder.svg?height=300&width=400&text=Women's+Modern"
  },
  {
    id: 3,
    name: "Kids Modern",
    description: "Stylish clothes for children",
    href: "/categories/fashion-textiles/modern/kids",
    image: "/placeholder.svg?height=300&width=400&text=Kids+Modern"
  }
]

export default function ModernFashionCategories() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Modern Categories
          </h2>
          <p className="text-gray-600">
            Discover contemporary fashion for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2">Modern</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
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
