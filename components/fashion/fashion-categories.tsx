"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Heart,
  Baby,
  Scissors,
  Crown,
  Shirt,
  Palette,
  Watch,
  ArrowRight,
  Sparkles,
  TrendingUp
} from "lucide-react"

interface FashionCategoriesProps {
  onCategorySelect?: (category: string) => void
}

const categories = [
  {
    id: "mens",
    title: "Men's Fashion",
    description: "Discover sophisticated and contemporary men's clothing and accessories",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&h=400&fit=crop",
    icon: Users,
    href: "/categories/fashion/mens",
    items: "450+ items",
    trending: true,
    subcategories: ["Suits & Formal", "Casual Wear", "Traditional", "Accessories"],
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50"
  },
  {
    id: "womens",
    title: "Women's Fashion",
    description: "Elegant dresses, stylish tops, and beautiful accessories for every occasion",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop",
    icon: Heart,
    href: "/categories/fashion/womens",
    items: "680+ items",
    trending: true,
    subcategories: ["Dresses", "Ankara Prints", "Business Wear", "Jewelry"],
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50"
  },
  {
    id: "kids",
    title: "Kids' Fashion",
    description: "Adorable and comfortable clothing for children of all ages",
    image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&h=400&fit=crop",
    icon: Baby,
    href: "/categories/fashion/kids",
    items: "320+ items",
    trending: false,
    subcategories: ["School Uniforms", "Play Clothes", "Formal Wear", "Shoes"],
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-50 to-orange-50"
  },
  {
    id: "textiles",
    title: "Textiles & Tailoring",
    description: "Premium fabrics and professional tailoring services",
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=400&fit=crop",
    icon: Scissors,
    href: "/categories/fashion/textiles",
    items: "150+ fabrics",
    trending: true,
    subcategories: ["Ankara Fabrics", "Formal Materials", "Traditional Chitenge", "Custom Tailoring"],
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50"
  }
]

const specialCollections = [
  {
    title: "Traditional Zambian Wear",
    description: "Celebrate our heritage with authentic traditional clothing",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
    badge: "Heritage Collection",
    gradient: "from-green-500 to-teal-600"
  },
  {
    title: "Wedding Collection",
    description: "Perfect attire for your special day",
    image: "https://images.unsplash.com/photo-1566479179817-1f0a68b5e5bb?w=400&h=300&fit=crop",
    badge: "Bridal Exclusive",
    gradient: "from-rose-500 to-pink-600"
  },
  {
    title: "Business Professional",
    description: "Sharp, professional attire for the modern workplace",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop",
    badge: "Corporate Style",
    gradient: "from-slate-600 to-gray-700"
  }
]

export function FashionCategories({ onCategorySelect }: FashionCategoriesProps) {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-purple-100 text-purple-700 mb-4">
              <Palette className="h-4 w-4 mr-2" />
              Fashion Categories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Explore Our
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Collections</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From traditional Zambian attire to modern fashion trends, discover the perfect style for every occasion
            </p>
          </motion.div>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => onCategorySelect?.(category.id)}
            >
              <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <Badge className="bg-white/90 text-slate-700">
                        {category.items}
                      </Badge>
                      {category.trending && (
                        <Badge className="bg-orange-500 text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center mr-3`}>
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                      </div>
                      <p className="text-gray-200 mb-4">{category.description}</p>
                      
                      {/* Subcategories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.subcategories.map((sub, subIndex) => (
                          <Badge key={subIndex} variant="outline" className="border-white/30 text-white text-xs">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <Link href={category.href}>
                      <Button className={`w-full bg-gradient-to-r ${category.gradient} hover:opacity-90 transition-opacity`}>
                        Explore {category.title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Special Collections */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Special Collections</h3>
            <p className="text-lg text-slate-600">Curated collections for special occasions and cultural celebrations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialCollections.map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <Badge className={`bg-gradient-to-r ${collection.gradient} text-white`}>
                          <Sparkles className="h-3 w-3 mr-1" />
                          {collection.badge}
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="text-lg font-semibold mb-1">{collection.title}</h4>
                        <p className="text-sm text-gray-200">{collection.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white"
        >
          <Crown className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Our expert tailors can create custom pieces just for you. From traditional wear to modern designs,
            we bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories/fashion/textiles">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50">
                <Scissors className="h-5 w-5 mr-2" />
                Custom Tailoring
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Browse All Fashion
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
