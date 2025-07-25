import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users } from "lucide-react"

const topBrands = [
  {
    name: "Mwanza Copper Crafts",
    location: "Lusaka",
    speciality: "Traditional Copper Jewelry",
    rating: 4.9,
    products: 45,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Heritage Beadwork",
    location: "Ndola", 
    speciality: "Beaded Accessories",
    rating: 4.8,
    products: 67,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Gemstone Gallery",
    location: "Kitwe",
    speciality: "Natural Stone Jewelry",
    rating: 4.7,
    products: 34,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Cultural Crafts Co.",
    location: "Livingstone",
    speciality: "Wedding & Ceremonial",
    rating: 4.9,
    products: 56,
    image: "/placeholder.svg?height=120&width=120",
  },
]

export function JewelryBrands() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Artisans & Brands</h2>
          <p className="text-lg text-slate-600">Discover talented jewelry makers from across Zambia</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topBrands.map((brand, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <img src={brand.image} alt={brand.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-bold text-slate-900 mb-2">{brand.name}</h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <MapPin className="h-3 w-3 text-slate-500" />
                  <span className="text-sm text-slate-600">{brand.location}</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{brand.speciality}</p>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < Math.floor(brand.rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">{brand.rating}</span>
                </div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  {brand.products} products
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
