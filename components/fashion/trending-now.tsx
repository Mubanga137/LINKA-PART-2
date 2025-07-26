"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Eye, ArrowRight } from "lucide-react"

const trendingItems = [
  {
    title: "Ankara Print Revival",
    description: "Traditional African prints are making a huge comeback in modern fashion",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=200&fit=crop",
    trend: "+45% increase",
    timeframe: "This week"
  },
  {
    title: "Sustainable Fashion",
    description: "Eco-friendly and locally-sourced materials are trending",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
    trend: "+38% interest",
    timeframe: "This month"
  },
  {
    title: "Men's Casual Formal",
    description: "The perfect blend of comfort and professionalism",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=200&fit=crop",
    trend: "+52% sales",
    timeframe: "Last 30 days"
  }
]

export function TrendingNow() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-orange-500 text-white mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            What's Hot Right Now
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Trending in Fashion</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Stay ahead of the curve with the latest fashion trends and popular styles in Zambia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                <CardContent className="p-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-orange-400 font-semibold">{item.trend}</div>
                      <div className="text-sm text-slate-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.timeframe}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-white hover:text-orange-400">
                      <Eye className="h-4 w-4" />
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
