"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Wrench, 
  Sparkles, 
  Paintbrush, 
  Star, 
  CheckCircle,
  Phone,
  Calendar,
  Users,
  Shield,
  ArrowRight,
  Clock,
  Award,
  Tools
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomeServicesPage() {
  const homeServices = [
    {
      name: "House Cleaning",
      description: "Professional residential cleaning services for your home",
      price: "ZMW 150",
      duration: "3-5 hours",
      features: ["Deep cleaning", "Kitchen & bathrooms", "Dust removal", "Floor care"]
    },
    {
      name: "Home Maintenance",
      description: "General maintenance and repair services",
      price: "ZMW 200",
      duration: "Half day",
      features: ["Plumbing fixes", "Electrical work", "Appliance repair", "Preventive maintenance"]
    },
    {
      name: "Painting Services",
      description: "Interior and exterior painting for your home",
      price: "ZMW 80/room",
      duration: "1-3 days",
      features: ["Professional prep", "Quality paint", "Clean finish", "Color consultation"]
    },
    {
      name: "Home Organization",
      description: "Professional organization and decluttering services",
      price: "ZMW 120",
      duration: "4-6 hours",
      features: ["Space optimization", "Storage solutions", "Decluttering", "System setup"]
    }
  ];

  const topServiceProviders = [
    {
      name: "Clean Home Zambia",
      rating: 4.9,
      reviews: 298,
      completedJobs: 1240,
      specialties: ["Cleaning", "Deep clean", "Regular maintenance"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      type: "Cleaning Service"
    },
    {
      name: "Fix-It Masters",
      rating: 4.8,
      reviews: 187,
      completedJobs: 967,
      specialties: ["Plumbing", "Electrical", "General repairs"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      type: "Maintenance & Repair"
    },
    {
      name: "Perfect Paint Solutions",
      rating: 4.7,
      reviews: 143,
      completedJobs: 534,
      specialties: ["Interior painting", "Exterior painting", "Decorating"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      type: "Painting Service"
    }
  ];

  const serviceCategories = [
    {
      category: "Cleaning",
      icon: Sparkles,
      services: ["Regular cleaning", "Deep cleaning", "Move-in/out cleaning", "Post-construction cleanup"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      category: "Maintenance",
      icon: Wrench,
      services: ["Plumbing repairs", "Electrical fixes", "Appliance service", "HVAC maintenance"],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    {
      category: "Painting",
      icon: Paintbrush,
      services: ["Interior painting", "Exterior painting", "Wall preparation", "Color consultation"],
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop"
    },
    {
      category: "Organization",
      icon: Home,
      services: ["Decluttering", "Storage solutions", "Closet organization", "Room optimization"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm border border-indigo-200 mb-6">
                  <Home className="mr-2 h-4 w-4 text-indigo-600" />
                  <span className="text-indigo-800 font-medium">Professional Home Services</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-slate-900">Your Home,</span>
                  <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Our Expertise
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Professional home services to keep your house clean, maintained, and organized. 
                  From regular cleaning to repairs and improvements, we've got you covered.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4">
                    Book Service
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                    Get Quote
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
                  alt="Home Services"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">120+ Jobs Monthly</div>
                      <div className="text-sm text-slate-600">Trusted & Reliable</div>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Home Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Comprehensive home services to maintain and improve your living space
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Tools className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Starting at:</span>
                        <span className="font-bold text-indigo-600">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Duration:</span>
                        <span className="font-medium text-slate-900">{service.duration}</span>
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

                    <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Categories</h2>
              <p className="text-slate-600">
                Explore our comprehensive range of home service categories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.category}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg mb-2">{category.category}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      {category.services.slice(0, 3).map((service, idx) => (
                        <div key={idx} className="text-sm text-slate-600">
                          • {service}
                        </div>
                      ))}
                      {category.services.length > 3 && (
                        <div className="text-sm text-indigo-600 font-medium">
                          +{category.services.length - 3} more services
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Service Providers */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Service Providers</h2>
              <p className="text-slate-600">
                Meet our trusted and experienced home service professionals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topServiceProviders.map((provider, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={provider.avatar}
                        alt={provider.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900">{provider.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-xs text-slate-500">({provider.reviews} reviews)</span>
                        </div>
                        <div className="text-xs text-indigo-600 font-medium">{provider.type}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <div className="font-bold text-indigo-600">{provider.completedJobs}</div>
                        <div className="text-xs text-slate-600">Jobs Done</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600">{provider.reviews}</div>
                        <div className="text-xs text-slate-600">Reviews</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {provider.specialties.map((specialty, idx) => (
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

        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Services</h2>
              <p className="text-slate-600">Professional, reliable, and trusted home services</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Trusted Professionals",
                  description: "Background-checked and verified service providers"
                },
                {
                  icon: Clock,
                  title: "Flexible Scheduling",
                  description: "Book services at your convenience"
                },
                {
                  icon: Award,
                  title: "Quality Guarantee",
                  description: "100% satisfaction guaranteed on all services"
                },
                {
                  icon: Users,
                  title: "Experienced Team",
                  description: "Years of experience in home services"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
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
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Book professional home services today and experience the difference quality makes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                <Calendar className="mr-2 h-5 w-5" />
                Book Service
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Call Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
