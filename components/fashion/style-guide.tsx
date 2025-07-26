"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Palette, Users, ArrowRight } from "lucide-react"

const styleGuides = [
  {
    title: "Traditional Zambian Fashion",
    description: "Learn about the rich heritage of Zambian traditional wear",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop",
    category: "Cultural Heritage",
    readTime: "5 min read"
  },
  {
    title: "Modern Business Attire",
    description: "Professional styling tips for the contemporary workplace",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop",
    category: "Professional Style",
    readTime: "7 min read"
  },
  {
    title: "Seasonal Fashion Trends",
    description: "Stay updated with the latest seasonal fashion trends",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=250&fit=crop",
    category: "Trend Guide",
    readTime: "4 min read"
  }
]

export function StyleGuide() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-700 mb-4">
            <BookOpen className="h-4 w-4 mr-2" />
            Style Guides
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Fashion Inspiration & Guides
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get inspired with our curated fashion guides, styling tips, and cultural insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {styleGuides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {guide.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{guide.readTime}</span>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Palette className="h-5 w-5 mr-2" />
            View All Style Guides
          </Button>
        </div>
      </div>
    </section>
  )
}
