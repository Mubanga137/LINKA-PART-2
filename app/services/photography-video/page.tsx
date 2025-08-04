"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Video, 
  Eye, 
  Star, 
  CheckCircle,
  Phone,
  Calendar,
  Users,
  Award,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Edit
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PhotographyVideoPage() {
  const photographyServices = [
    {
      name: "Wedding Photography",
      description: "Capture your special day with beautiful, timeless photos",
      price: "ZMW 1,500",
      duration: "Full day",
      features: ["Pre-wedding shoot", "Ceremony coverage", "Reception photos", "Edited gallery"]
    },
    {
      name: "Event Photography",
      description: "Professional photography for corporate and social events",
      price: "ZMW 800",
      duration: "4-8 hours",
      features: ["Event coverage", "Group photos", "Candid shots", "Same-day preview"]
    },
    {
      name: "Portrait Sessions",
      description: "Individual and family portrait photography",
      price: "ZMW 400",
      duration: "2-3 hours",
      features: ["Studio or outdoor", "Wardrobe changes", "Professional editing", "Print-ready files"]
    },
    {
      name: "Product Photography",
      description: "Professional product shoots for businesses",
      price: "ZMW 300",
      duration: "Half day",
      features: ["Studio setup", "Multiple angles", "Background options", "Web-ready images"]
    }
  ];

  const videoServices = [
    {
      name: "Wedding Videography",
      description: "Cinematic wedding films that tell your love story",
      price: "ZMW 2,000",
      duration: "Full day",
      features: ["Highlight reel", "Ceremony footage", "Reception coverage", "Drone shots available"]
    },
    {
      name: "Corporate Videos",
      description: "Professional videos for business promotion and training",
      price: "ZMW 1,200",
      duration: "1-2 days",
      features: ["Script development", "Multi-camera setup", "Professional editing", "Motion graphics"]
    },
    {
      name: "Music Videos",
      description: "Creative music videos for artists and musicians",
      price: "ZMW 1,800",
      duration: "2-3 days",
      features: ["Creative direction", "Location scouting", "Color grading", "Visual effects"]
    },
    {
      name: "Content Creation",
      description: "Social media and marketing video content",
      price: "ZMW 600",
      duration: "1 day",
      features: ["Multiple formats", "Quick turnaround", "Social media ready", "Branding integration"]
    }
  ];

  const topPhotographers = [
    {
      name: "James Mwale Photography",
      rating: 4.9,
      reviews: 234,
      completedShoots: 387,
      specialties: ["Weddings", "Portraits", "Events"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      type: "Photographer"
    },
    {
      name: "Vision Films Zambia",
      rating: 4.8,
      reviews: 156,
      completedShoots: 298,
      specialties: ["Weddings", "Corporate", "Music videos"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5b3?w=80&h=80&fit=crop&crop=face",
      type: "Videographer"
    },
    {
      name: "Creative Lens Studio",
      rating: 4.7,
      reviews: 189,
      completedShoots: 245,
      specialties: ["Products", "Fashion", "Commercial"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      type: "Photographer & Video"
    }
  ];

  const portfolioGallery = [
    {
      category: "Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      title: "Elegant Wedding Ceremony",
      type: "Photography"
    },
    {
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      title: "Business Conference",
      type: "Video"
    },
    {
      category: "Portrait",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop",
      title: "Professional Headshots",
      type: "Photography"
    },
    {
      category: "Product",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
      title: "Product Showcase",
      type: "Photography"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-teal-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-teal-100 px-4 py-2 text-sm border border-teal-200 mb-6">
                  <Camera className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-teal-800 font-medium">Professional Photography & Video Services</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-slate-900">Capture Perfect</span>
                  <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Moments
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Professional photography and videography services for all occasions. 
                  From weddings to corporate events, we create visual stories that last a lifetime.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4">
                    Book Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-teal-300 text-teal-600 hover:bg-teal-50">
                    View Portfolio
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop"
                  alt="Photography Session"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">75+ Shoots Monthly</div>
                      <div className="text-sm text-slate-600">Creative Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photography Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Photography Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Professional photography for every occasion and need
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photographyServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Starting at:</span>
                        <span className="font-bold text-teal-600">{service.price}</span>
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

                    <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Services */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Video Production Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Cinematic video production that brings your story to life
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Package from:</span>
                        <span className="font-bold text-cyan-600">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Production:</span>
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

                    <Button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700">
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Work</h2>
              <p className="text-slate-600">
                Browse our portfolio of stunning photography and video work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioGallery.map((item, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      {item.type === "Video" ? (
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="h-5 w-5 text-slate-700" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-slate-700" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge className="bg-teal-600 text-white mb-2">{item.category}</Badge>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.type}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Photographers */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Professionals</h2>
              <p className="text-slate-600">
                Meet our talented photographers and videographers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topPhotographers.map((professional, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={professional.avatar}
                        alt={professional.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900">{professional.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{professional.rating}</span>
                          <span className="text-xs text-slate-500">({professional.reviews} reviews)</span>
                        </div>
                        <div className="text-xs text-teal-600 font-medium">{professional.type}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-teal-50 rounded-lg">
                        <div className="font-bold text-teal-600">{professional.completedShoots}</div>
                        <div className="text-xs text-slate-600">Shoots</div>
                      </div>
                      <div className="text-center p-3 bg-cyan-50 rounded-lg">
                        <div className="font-bold text-cyan-600">{professional.reviews}</div>
                        <div className="text-xs text-slate-600">Reviews</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {professional.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      View Portfolio
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Process</h2>
              <p className="text-slate-600">Simple steps to capture your perfect moments</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  icon: Calendar,
                  title: "Consultation",
                  description: "Discuss your vision and requirements"
                },
                {
                  step: "2",
                  icon: Camera,
                  title: "Planning",
                  description: "Develop concept and schedule shoot"
                },
                {
                  step: "3",
                  icon: Video,
                  title: "Production",
                  description: "Professional photo/video session"
                },
                {
                  step: "4",
                  icon: Edit,
                  title: "Delivery",
                  description: "Edited final gallery and files"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-teal-200">
                      <span className="text-xs font-bold text-teal-600">{step.step}</span>
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
        <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Capture Your Story?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Let our professional photographers and videographers create beautiful memories for your special occasions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                <Camera className="mr-2 h-5 w-5" />
                Book Session
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Discuss Project
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
