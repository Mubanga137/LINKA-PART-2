"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scissors, 
  Palette, 
  Crown, 
  Shirt, 
  Star, 
  CheckCircle,
  Phone,
  Calendar,
  Users,
  TrendingUp,
  ArrowRight,
  Ruler,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FashionTailoringPage() {
  const tailoringServices = [
    {
      name: "Custom Suit Design",
      description: "Bespoke suits tailored to your exact measurements and style preferences",
      price: "ZMW 450",
      timeframe: "7-14 days",
      features: ["Personal consultation", "Premium fabrics", "3 fittings included", "Lifetime adjustments"]
    },
    {
      name: "Traditional Wear",
      description: "Authentic Zambian traditional clothing with modern touches",
      price: "ZMW 280",
      timeframe: "5-10 days",
      features: ["Cultural authenticity", "Custom patterns", "Traditional fabrics", "Modern fit"]
    },
    {
      name: "Alterations & Repairs",
      description: "Professional alterations and clothing repairs",
      price: "From ZMW 25",
      timeframe: "1-3 days",
      features: ["Same-day service", "Expert craftsmanship", "All garment types", "Quality guarantee"]
    },
    {
      name: "Wedding Attire",
      description: "Special occasion wear for your perfect day",
      price: "ZMW 650",
      timeframe: "14-21 days",
      features: ["Bridal consultation", "Groom's accessories", "Multiple fittings", "Rush service available"]
    }
  ];

  const topTailors = [
    {
      name: "Master Joseph Mwansa",
      rating: 4.9,
      reviews: 167,
      completedOrders: 890,
      specialties: ["Suits", "Traditional", "Wedding"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      experience: "15 years"
    },
    {
      name: "Grace Lungu Designs",
      rating: 4.8,
      reviews: 143,
      completedOrders: 654,
      specialties: ["Ladies wear", "Modern", "Alterations"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5b3?w=80&h=80&fit=crop&crop=face",
      experience: "12 years"
    },
    {
      name: "Chitembo Fashion House",
      rating: 4.7,
      reviews: 98,
      completedOrders: 432,
      specialties: ["Traditional", "Cultural", "Events"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      experience: "8 years"
    }
  ];

  const portfolioItems = [
    {
      category: "Custom Suits",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      title: "Executive Business Suit"
    },
    {
      category: "Traditional Wear",
      image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=400&h=500&fit=crop",
      title: "Modern Chitenge Design"
    },
    {
      category: "Wedding Attire",
      image: "https://images.unsplash.com/photo-1507438713210-4acbb2ef6ac2?w=400&h=500&fit=crop",
      title: "Elegant Wedding Gown"
    },
    {
      category: "Casual Wear",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
      title: "Casual Modern Style"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm border border-purple-200 mb-6">
                  <Scissors className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-purple-800 font-medium">Expert Fashion & Tailoring Services</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-slate-900">Tailored to</span>
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Perfection
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Professional tailoring and fashion design services. From custom suits to traditional wear, 
                  we create clothing that fits perfectly and expresses your unique style.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4">
                    Book Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50">
                    View Portfolio
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                  alt="Fashion Design"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">150+ Custom Orders</div>
                      <div className="text-sm text-slate-600">This Month</div>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                From traditional Zambian wear to modern fashion, we offer comprehensive tailoring services
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tailoringServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                      <Shirt className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Starting at:</span>
                        <span className="font-bold text-purple-600">{service.price}</span>
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

                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Work</h2>
              <p className="text-slate-600">
                Browse our collection of custom-made garments and design inspiration
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioItems.map((item, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge className="bg-purple-600 text-white mb-2">{item.category}</Badge>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Tailors */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Master Tailors</h2>
              <p className="text-slate-600">
                Meet our skilled artisans with years of experience in fashion and tailoring
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topTailors.map((tailor, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={tailor.avatar}
                        alt={tailor.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900">{tailor.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{tailor.rating}</span>
                          <span className="text-xs text-slate-500">({tailor.reviews} reviews)</span>
                        </div>
                        <div className="text-xs text-purple-600 font-medium">{tailor.experience} experience</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-600">{tailor.completedOrders}</div>
                        <div className="text-xs text-slate-600">Orders</div>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-lg">
                        <div className="font-bold text-pink-600">{tailor.reviews}</div>
                        <div className="text-xs text-slate-600">Reviews</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {tailor.specialties.map((specialty, idx) => (
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

        {/* Process */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-600">Simple steps to get your perfect garment</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  icon: Calendar,
                  title: "Book Consultation",
                  description: "Schedule a meeting with our expert tailors"
                },
                {
                  step: "2",
                  icon: Ruler,
                  title: "Design & Measure",
                  description: "Choose design and take precise measurements"
                },
                {
                  step: "3",
                  icon: Scissors,
                  title: "Crafting Process",
                  description: "Our skilled tailors create your garment"
                },
                {
                  step: "4",
                  icon: CheckCircle,
                  title: "Final Fitting",
                  description: "Perfect fit adjustments and delivery"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-purple-200">
                      <span className="text-xs font-bold text-purple-600">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for Your Perfect Fit?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Book a consultation with our master tailors and experience the difference of custom-made clothing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Calendar className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
