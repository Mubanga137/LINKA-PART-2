"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Users, Star, ArrowRight } from "lucide-react"

const heritageStories = [
  {
    title: "The Art of Chitenge",
    description: "Learn about the cultural significance and traditional methods of chitenge fabric production",
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=200&fit=crop",
    region: "National Heritage"
  },
  {
    title: "Royal Lozi Traditions",
    description: "Discover the rich ceremonial clothing traditions of the Lozi people",
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=300&h=200&fit=crop",
    region: "Western Province"
  },
  {
    title: "Bemba Cultural Dress",
    description: "Explore the intricate patterns and meanings behind Bemba traditional wear",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop",
    region: "Northern Province"
  }
]

export function TraditionalHeritage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-red-100 text-red-700 mb-4">
            <Star className="h-4 w-4 mr-2" />
            Cultural Heritage
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Stories Behind the Fabric
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Every piece tells a story. Learn about the rich cultural heritage and traditions 
            that inspire our authentic Zambian fashion collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {heritageStories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {story.region}
                    </Badge>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{story.description}</p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Learn More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cultural Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white">
          <Crown className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Preserve Our Heritage</h3>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            By choosing traditional Zambian fashion, you're helping preserve our cultural heritage 
            and supporting local artisans who keep these traditions alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-50">
              <Users className="h-5 w-5 mr-2" />
              Shop Traditional Collection
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn About Our Artisans
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
