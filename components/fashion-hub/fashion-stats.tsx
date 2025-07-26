"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  ShoppingBag,
  Star,
  Palette,
  Scissors,
  Heart,
  Crown,
  TrendingUp
} from "lucide-react"

const stats = [
  {
    label: "Fashion Items",
    value: "1,200+",
    icon: ShoppingBag,
    gradient: "from-purple-500 to-pink-600",
    change: "+23%"
  },
  {
    label: "Designers & Tailors",
    value: "85+",
    icon: Users,
    gradient: "from-blue-500 to-indigo-600",
    change: "+18%"
  },
  {
    label: "Happy Customers",
    value: "8,500+",
    icon: Star,
    gradient: "from-orange-500 to-red-600",
    change: "+34%"
  },
  {
    label: "Avg Rating",
    value: "4.9",
    icon: Heart,
    gradient: "from-emerald-500 to-teal-600",
    change: "+0.2"
  }
]

export function FashionStats() {
  return (
    <section className="py-16 -mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  
                  <div className="text-slate-600 font-medium mb-2">
                    {stat.label}
                  </div>
                  
                  <div className="flex items-center justify-center text-green-600 text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} this month
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
