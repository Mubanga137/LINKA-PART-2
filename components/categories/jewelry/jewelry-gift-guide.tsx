import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Heart, Star, ArrowRight } from "lucide-react"

const giftCategories = [
  {
    title: "For Her",
    description: "Elegant necklaces, earrings, and bracelets",
    priceRange: "ZMW 50 - 300",
    image: "/placeholder.svg?height=200&width=300",
    popular: ["Copper Necklaces", "Beaded Earrings", "Traditional Bracelets"],
  },
  {
    title: "For Wedding",
    description: "Traditional wedding jewelry sets",
    priceRange: "ZMW 200 - 800",
    image: "/placeholder.svg?height=200&width=300",
    popular: ["Wedding Sets", "Ceremonial Pieces", "Bridal Accessories"],
  },
  {
    title: "For Occasions",
    description: "Special event and cultural ceremony pieces",
    priceRange: "ZMW 100 - 500",
    image: "/placeholder.svg?height=200&width=300",
    popular: ["Festival Jewelry", "Party Accessories", "Cultural Items"],
  },
]

export function JewelryGiftGuide() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 text-amber-700 border border-amber-200/50 mb-6">
            <Gift className="mr-2 h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium">Gift Guide</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Perfect Gifts for Every Occasion</h2>
          <p className="text-lg text-slate-600">Find the perfect jewelry gift with our curated selections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {giftCategories.map((category, index) => (
            <Card key={index} className="group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img src={category.image} alt={category.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-500 text-white">Gift Ideas</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{category.title}</h3>
                  <p className="text-slate-600 mb-3">{category.description}</p>
                  <div className="text-sm font-medium text-amber-600 mb-4">{category.priceRange}</div>
                  <div className="space-y-2 mb-6">
                    {category.popular.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <Heart className="h-3 w-3 text-amber-600" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                    Shop {category.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
