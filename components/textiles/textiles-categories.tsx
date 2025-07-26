"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Scissors, Shirt, Crown, Sparkles, Award } from "lucide-react";

const fabricCategories = [
  {
    id: "premium-fabrics",
    title: "Premium Fabrics",
    icon: Crown,
    description: "Luxury materials for special occasions",
    items: ["Silk", "Cashmere", "Fine Wool", "Designer Cotton"],
    count: "150+",
    image: "/api/placeholder/300/200",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: "everyday-fabrics",
    title: "Everyday Fabrics",
    icon: Shirt,
    description: "Comfortable materials for daily wear",
    items: ["Cotton", "Linen", "Polyester Blends", "Jersey"],
    count: "280+",
    image: "/api/placeholder/300/200",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: "traditional-fabrics",
    title: "Traditional Fabrics",
    icon: Sparkles,
    description: "Cultural and heritage materials",
    items: ["Chitenge", "Ankara", "Kente", "Local Weaves"],
    count: "120+",
    image: "/api/placeholder/300/200",
    color: "from-orange-600 to-red-600"
  },
  {
    id: "specialty-fabrics",
    title: "Specialty Fabrics",
    icon: Award,
    description: "Technical and performance materials",
    items: ["Athletic Wear", "Waterproof", "UV Protection", "Anti-Bacterial"],
    count: "95+",
    image: "/api/placeholder/300/200",
    color: "from-green-600 to-emerald-600"
  }
];

const tailoringServices = [
  {
    title: "Custom Suits",
    description: "Bespoke tailoring for formal wear",
    price: "From ZMW 800",
    icon: Scissors,
    features: ["3 Fittings", "Premium Fabrics", "6-Week Delivery"]
  },
  {
    title: "Dress Making",
    description: "Custom dresses for any occasion",
    price: "From ZMW 400",
    icon: Palette,
    features: ["Design Consultation", "Quality Fabrics", "Perfect Fit"]
  },
  {
    title: "Alterations",
    description: "Professional clothing adjustments",
    price: "From ZMW 50",
    icon: Scissors,
    features: ["Same Day Service", "Expert Tailors", "All Garments"]
  },
  {
    title: "Traditional Wear",
    description: "Cultural and ceremonial clothing",
    price: "From ZMW 300",
    icon: Crown,
    features: ["Cultural Accuracy", "Authentic Materials", "Custom Designs"]
  }
];

export default function TextilesCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Fabric Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <Badge className="bg-emerald-600 text-white mb-4">Fabric Collections</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Fabric Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From premium luxury materials to everyday essentials, discover the perfect fabric for your project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fabricCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`} />
                    <div className="absolute top-4 left-4">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {category.count}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Browse {category.title}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tailoring Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <Badge className="bg-teal-600 text-white mb-4">Tailoring Services</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Tailoring Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert craftsmanship and attention to detail for all your tailoring needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tailoringServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:border-emerald-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                      <service.icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    
                    <div className="text-lg font-bold text-emerald-600 mb-6">
                      {service.price}
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-center">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Book Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
