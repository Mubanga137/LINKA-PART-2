"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight, Sparkles } from "lucide-react"

const trends = [
  {
    id: 1,
    title: "Sustainable Accessories",
    description: "Eco-friendly materials and ethical production are taking center stage",
    image: "/placeholder.svg?height=200&width=300&text=Sustainable",
    tag: "Eco-Friendly",
    growth: "+45%"
  },
  {
    id: 2,
    title: "Statement Earrings",
    description: "Bold, oversized earrings are making a powerful fashion statement",
    image: "/placeholder.svg?height=200&width=300&text=Earrings",
    tag: "Bold Fashion",
    growth: "+38%"
  },
  {
    id: 3,
    title: "Smart Watches",
    description: "Technology meets fashion with health tracking and connectivity",
    image: "/placeholder.svg?height=200&width=300&text=Smart+Watch",
    tag: "Tech Fashion",
    growth: "+52%"
  },
  {
    id: 4,
    title: "Vintage Revival",
    description: "Classic designs from the 70s and 80s are making a comeback",
    image: "/placeholder.svg?height=200&width=300&text=Vintage",
    tag: "Retro Style",
    growth: "+28%"
  }
]

export default function AccessoriesTrends() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
            <Badge className="bg-indigo-600 text-white">
              <Sparkles className="h-4 w-4 mr-1" />
              Trending Now
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fashion Trends 2024
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay ahead of the curve with the latest trends in fashion accessories. 
            Discover what's popular and what's next in the world of style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((trend) => (
            <Card key={trend.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={trend.image}
                  alt={trend.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-600 text-white text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {trend.growth}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="text-xs">
                    {trend.tag}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {trend.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {trend.description}
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-semibold text-indigo-600 hover:text-indigo-700">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <TrendingUp className="h-5 w-5 mr-2" />
            Explore All Trends
          </Button>
        </div>
      </div>
    </div>
  )
}
