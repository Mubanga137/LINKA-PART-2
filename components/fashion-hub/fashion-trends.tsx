"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Eye, ArrowRight } from "lucide-react"

const trends = [
  {
    title: "Sustainable Fashion Movement",
    description: "Eco-friendly materials and locally sourced fabrics are gaining popularity",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop",
    change: "+65%",
    category: "Eco Fashion"
  },
  {
    title: "Traditional-Modern Fusion",
    description: "Blending Zambian heritage with contemporary design elements",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop",
    change: "+48%",
    category: "Cultural Fusion"
  },
  {
    title: "Custom Tailoring Boom",
    description: "Personalized clothing and bespoke services are in high demand",
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=400&h=250&fit=crop",
    change: "+72%",
    category: "Bespoke"
  }
]

export function FashionTrends() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-orange-500 text-white mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Fashion Trends
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What's Trending Now</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Stay ahead of the curve with the latest fashion movements and style innovations in Zambia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trends.map((trend, index) => (
            <motion.div
              key={trend.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <img
                    src={trend.image}
                    alt={trend.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-orange-500 text-white">
                        {trend.category}
                      </Badge>
                      <div className="text-orange-400 font-semibold">
                        {trend.change}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{trend.title}</h3>
                    <p className="text-slate-300 mb-4">{trend.description}</p>
                    <Button variant="ghost" className="text-white hover:text-orange-400 p-0">
                      <Eye className="h-4 w-4 mr-2" />
                      Explore Trend
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
