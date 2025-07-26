"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Crown, Sparkles, Users, ArrowRight } from "lucide-react"

export function FashionCTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-16 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <Crown className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Discover Your Style?
            </h2>
            <p className="text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of fashion enthusiasts who trust Linka for their style needs. 
              From traditional heritage to modern trends, find your perfect look today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/categories/fashion-textiles/traditional">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 shadow-xl">
                  <Sparkles className="h-6 w-6 mr-3" />
                  Explore Traditional Wear
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/categories/fashion-textiles/modern">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 backdrop-blur-sm shadow-xl"
                >
                  <Users className="h-6 w-6 mr-3" />
                  Browse Modern Fashion
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">1,200+</div>
                <div className="text-purple-200">Fashion Items</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">85+</div>
                <div className="text-purple-200">Expert Tailors</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.9★</div>
                <div className="text-purple-200">Customer Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
