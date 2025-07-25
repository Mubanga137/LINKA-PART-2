import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Crown, Diamond, Heart } from "lucide-react"

const featuredItems = [
  {
    id: 1,
    name: "Master Artisan Collection",
    description: "Exclusive handcrafted pieces by Zambia's most renowned jewelry makers",
    image: "/placeholder.svg?height=400&width=600",
    cta: "Explore Collection",
    badge: "Exclusive",
  },
  {
    id: 2,
    name: "Wedding Jewelry Sets",
    description: "Complete traditional wedding jewelry collections for your special day",
    image: "/placeholder.svg?height=400&width=600",
    cta: "Shop Wedding",
    badge: "Popular",
  },
]

export function JewelryFeatured() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Collections</h2>
          <p className="text-lg text-slate-600">Discover our most popular and exclusive jewelry pieces</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-4 left-4 bg-amber-500 text-white">{item.badge}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                    {item.cta}
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
