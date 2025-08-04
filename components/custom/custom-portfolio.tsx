"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const portfolioItems = [
  {
    id: 1,
    title: "Wedding Dress",
    category: "Formal Wear",
    image: "/placeholder.svg?height=300&width=400&text=Wedding+Dress"
  },
  {
    id: 2,
    title: "Business Suit",
    category: "Professional",
    image: "/placeholder.svg?height=300&width=400&text=Business+Suit"
  },
  {
    id: 3,
    title: "Evening Gown",
    category: "Formal Wear",
    image: "/placeholder.svg?height=300&width=400&text=Evening+Gown"
  },
  {
    id: 4,
    title: "Casual Dress",
    category: "Casual",
    image: "/placeholder.svg?height=300&width=400&text=Casual+Dress"
  }
]

export default function CustomPortfolio() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-gray-600">
            See examples of our custom tailoring work
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-2 left-2">
                  {item.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
