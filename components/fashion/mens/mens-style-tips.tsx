"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, ArrowRight } from "lucide-react"

const styleTips = [
  {
    title: "Business Formal",
    description: "Master the art of professional dressing",
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=300&h=200&fit=crop",
    tips: ["Always ensure proper fit", "Stick to neutral colors", "Invest in quality shoes"]
  },
  {
    title: "Smart Casual",
    description: "Perfect blend of comfort and style",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=200&fit=crop",
    tips: ["Chinos with polo shirts", "Layer with blazers", "Clean sneakers work well"]
  },
  {
    title: "Traditional Style",
    description: "Embrace African heritage with confidence",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop",
    tips: ["Bold patterns are key", "Mix traditional with modern", "Accessorize thoughtfully"]
  }
]

export function MensStyleTips() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-yellow-100 text-yellow-700 mb-4">
            <Lightbulb className="h-4 w-4 mr-2" />
            Style Tips
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Men's Style Guide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Expert styling advice to help you look your best for any occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styleTips.map((tip, index) => (
            <Card key={tip.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{tip.description}</p>
                  <ul className="space-y-2 mb-4">
                    {tip.tips.map((tipItem, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-slate-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {tipItem}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
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
