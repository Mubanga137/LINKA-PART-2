"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Star, 
  CheckCircle,
  Phone,
  CreditCard,
  Shield,
  Users,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CourierDeliveryPage() {
  const deliveryServices = [
    {
      name: "Same-day Delivery",
      description: "Get your packages delivered within the same day",
      price: "ZMW 35",
      timeframe: "2-8 hours",
      features: ["Real-time tracking", "SMS notifications", "Secure handling"]
    },
    {
      name: "Express Delivery",
      description: "Priority delivery for urgent packages",
      price: "ZMW 25",
      timeframe: "4-12 hours",
      features: ["Priority handling", "Direct route", "Insurance included"]
    },
    {
      name: "Standard Delivery",
      description: "Reliable delivery at affordable rates",
      price: "ZMW 15",
      timeframe: "1-3 days",
      features: ["Package tracking", "Safe delivery", "Multiple attempts"]
    },
    {
      name: "Document Delivery",
      description: "Secure document and mail delivery",
      price: "ZMW 10",
      timeframe: "Same day",
      features: ["Confidential handling", "Proof of delivery", "Signature required"]
    }
  ];

  const topCouriers = [
    {
      name: "Swift Express ZM",
      rating: 4.9,
      reviews: 245,
      completedDeliveries: 2800,
      specialties: ["Same-day", "Documents"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Lusaka Logistics",
      rating: 4.8,
      reviews: 189,
      completedDeliveries: 1950,
      specialties: ["Express", "Bulk items"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Copper Belt Couriers",
      rating: 4.7,
      reviews: 156,
      completedDeliveries: 1340,
      specialties: ["Inter-city", "Standard"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm border border-blue-200 mb-6">
                  <Truck className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-blue-800 font-medium">Fast & Reliable Delivery Services</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-slate-900">Swift Delivery</span>
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Across Zambia
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Professional courier and delivery services with real-time tracking, 
                  secure handling, and nationwide coverage. Your packages, delivered safely and on time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4">
                    Book Delivery Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                    Track Package
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop"
                  alt="Delivery Service"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">200+ Daily Deliveries</div>
                      <div className="text-sm text-slate-600">Fast & Secure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Delivery Options</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Choose from our range of delivery services tailored to meet your specific needs and timeline
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Price:</span>
                        <span className="font-bold text-blue-600">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Timeframe:</span>
                        <span className="font-medium text-slate-900">{service.timeframe}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      Select Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Couriers */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Rated Couriers</h2>
              <p className="text-slate-600">
                Our most trusted and reliable delivery professionals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topCouriers.map((courier, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={courier.avatar}
                        alt={courier.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900">{courier.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{courier.rating}</span>
                          <span className="text-xs text-slate-500">({courier.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600">{courier.completedDeliveries}</div>
                        <div className="text-xs text-slate-600">Deliveries</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-600">{courier.reviews}</div>
                        <div className="text-xs text-slate-600">Reviews</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {courier.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Real-time Tracking",
                  description: "Track your package every step of the way"
                },
                {
                  icon: Shield,
                  title: "Secure Handling",
                  description: "Your packages are safe with our professionals"
                },
                {
                  icon: Clock,
                  title: "On-time Delivery",
                  description: "We guarantee timely delivery of your items"
                },
                {
                  icon: CreditCard,
                  title: "Flexible Payment",
                  description: "Multiple payment options available"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Send Your Package?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers who trust our delivery services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Package className="mr-2 h-5 w-5" />
                Book Delivery
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
