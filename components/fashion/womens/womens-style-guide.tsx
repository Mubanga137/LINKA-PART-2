"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"

const styleGuides = [
  {
    title: "African Print Styling",
    description: "How to style Ankara and traditional prints",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=200&fit=crop",
    tips: ["Mix prints with solids", "Accessorize with copper jewelry", "Layer for modern looks"]
  },
  {
    title: "Business Professional",
    description: "Confident styling for the workplace",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=200&fit=crop",
    tips: ["Invest in quality blazers", "Neutral color palette", "Statement accessories"]
  },
  {
    title: "Occasion Dressing",
    description: "Perfect outfits for special events",
    image: "https://images.unsplash.com/photo-1566479179817-1f0a68b5e5bb?w=300&h=200&fit=crop",
    tips: ["Choose flattering silhouettes", "Coordinate with event theme", "Comfort meets elegance"]
  }
]

export function WomensStyleGuide() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-pink-100 text-pink-700 mb-4">
            <Heart className="h-4 w-4 mr-2" />
            Style Inspiration
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Women's Style Guide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get inspired with expert styling tips and fashion advice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styleGuides.map((guide, index) => (
            <Card key={guide.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{guide.description}</p>
                  <ul className="space-y-2 mb-4">
                    {guide.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-slate-600 flex items-start">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-pink-600 hover:text-pink-700">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
