"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Mic, 
  PartyPopper, 
  Calendar, 
  Star, 
  CheckCircle,
  Phone,
  MapPin,
  Users,
  Clock,
  Camera,
  ArrowRight,
  Headphones,
  Heart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EntertainmentEventsPage() {
  const entertainmentServices = [
    {
      name: "Wedding Entertainment",
      description: "Complete entertainment package for your special day",
      price: "ZMW 1,200",
      duration: "6-8 hours",
      features: ["Live band/DJ", "Sound system", "Lighting setup", "MC services"]
    },
    {
      name: "Corporate Events",
      description: "Professional entertainment for business functions",
      price: "ZMW 800",
      duration: "4-6 hours",
      features: ["Professional DJ", "Corporate playlist", "Audio/visual", "Event coordination"]
    },
    {
      name: "Birthday Parties",
      description: "Fun and memorable birthday celebrations",
      price: "ZMW 450",
      duration: "3-5 hours",
      features: ["DJ services", "Party games", "Sound system", "Decorations available"]
    },
    {
      name: "Cultural Events",
      description: "Traditional and cultural entertainment",
      price: "ZMW 600",
      duration: "4-8 hours",
      features: ["Traditional music", "Cultural performances", "Local artists", "Authentic experience"]
    }
  ];

  const topEntertainers = [
    {
      name: "DJ Mike Zambia",
      rating: 4.9,
      reviews: 186,
      completedEvents: 245,
      specialties: ["Weddings", "Corporate", "Private parties"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      location: "Lusaka"
    },
    {
      name: "Copper Sound Events",
      rating: 4.8,
      reviews: 142,
      completedEvents: 189,
      specialties: ["Live music", "Traditional", "Festivals"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5b3?w=80&h=80&fit=crop&crop=face",
      location: "Ndola"
    },
    {
      name: "Rhythm Masters ZM",
      rating: 4.7,
      reviews: 98,
      completedEvents: 134,
      specialties: ["DJ services", "Equipment rental", "Sound engineering"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      location: "Kitwe"
    }
  ];

  const eventGallery = [
    {
      category: "Weddings",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      title: "Elegant Wedding Reception"
    },
    {
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
      title: "Corporate Gala Event"
    },
    {
      category: "Birthday",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      title: "Birthday Celebration"
    },
    {
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
      title: "Traditional Festival"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-pink-100 px-4 py-2 text-sm border border-pink-200 mb-6">
                  <Music className="mr-2 h-4 w-4 text-pink-600" />
                  <span className="text-pink-800 font-medium">Professional Entertainment Services</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-slate-900">Make Every</span>
                  <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Moment Memorable
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  From intimate gatherings to grand celebrations, our professional entertainers 
                  bring music, joy, and unforgettable experiences to your special events.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4">
                    Book Entertainment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50">
                    View Portfolio
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop"
                  alt="Entertainment Event"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <PartyPopper className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">100+ Events Monthly</div>
                      <div className="text-sm text-slate-600">Unforgettable Experiences</div>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Entertainment Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Professional entertainment solutions for every occasion and celebration
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {entertainmentServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <Mic className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Package from:</span>
                        <span className="font-bold text-pink-600">{service.price}</span>
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

                    <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Gallery */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Recent Events</h2>
              <p className="text-slate-600">
                Take a look at some of our memorable entertainment experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventGallery.map((event, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge className="bg-pink-600 text-white mb-2">{event.category}</Badge>
                      <h3 className="font-bold text-lg">{event.title}</h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Entertainers */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Entertainers</h2>
              <p className="text-slate-600">
                Meet our professional entertainers who bring life to every event
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topEntertainers.map((entertainer, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={entertainer.avatar}
                        alt={entertainer.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900">{entertainer.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{entertainer.rating}</span>
                          <span className="text-xs text-slate-500">({entertainer.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" />
                          {entertainer.location}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-pink-50 rounded-lg">
                        <div className="font-bold text-pink-600">{entertainer.completedEvents}</div>
                        <div className="text-xs text-slate-600">Events</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-600">{entertainer.reviews}</div>
                        <div className="text-xs text-slate-600">Reviews</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {entertainer.specialties.map((specialty, idx) => (
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
        <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Entertainment</h2>
              <p className="text-slate-600">Professional service that makes your event unforgettable</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: Headphones,
                  title: "Professional Equipment",
                  description: "Top-quality sound and lighting systems"
                },
                {
                  icon: Users,
                  title: "Experienced Team",
                  description: "Skilled entertainers and event coordinators"
                },
                {
                  icon: Calendar,
                  title: "Flexible Scheduling",
                  description: "Available for events of any size and duration"
                },
                {
                  icon: Heart,
                  title: "Memorable Experiences",
                  description: "Creating lasting memories for your special day"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
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
        <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Let us bring the perfect entertainment to your next event. From intimate gatherings to grand celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
                <Calendar className="mr-2 h-5 w-5" />
                Book Entertainment
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Discuss Event
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
