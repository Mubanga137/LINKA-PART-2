'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MessageCircle, 
  Star, 
  Users, 
  Award, 
  Clock,
  CheckCircle2,
  MapPin
} from 'lucide-react'

export default function CustomCTA() {
  const stats = [
    { icon: Users, value: '500+', label: 'Happy Customers' },
    { icon: Award, value: '10+', label: 'Years Experience' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: CheckCircle2, value: '99%', label: 'Satisfaction Rate' }
  ]

  const testimonials = [
    {
      name: 'Grace Mwansa',
      role: 'Business Executive',
      rating: 5,
      comment: 'Exceptional quality and perfect fit. My custom suits are exactly what I needed for my professional wardrobe.',
      image: '/placeholder.svg'
    },
    {
      name: 'David Kabwe',
      role: 'Groom',
      rating: 5,
      comment: 'Our wedding outfits were absolutely stunning. The attention to detail was incredible!',
      image: '/placeholder.svg'
    },
    {
      name: 'Sarah Tembo',
      role: 'Fashion Enthusiast',
      rating: 5,
      comment: 'Love working with these talented designers. They bring my vision to life every time.',
      image: '/placeholder.svg'
    }
  ]

  const quickActions = [
    {
      title: 'Start Your Design',
      description: 'Begin with a consultation',
      action: 'Book Consultation',
      icon: MessageCircle,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Browse Portfolio',
      description: 'See our recent work',
      action: 'View Gallery',
      icon: Star,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Get Quote',
      description: 'Instant pricing estimate',
      action: 'Calculate Price',
      icon: Clock,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Main CTA Hero */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-0">
              Ready to Get Started?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Style with 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Custom Tailoring
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of satisfied customers who've discovered the perfect fit. 
              Book your consultation today and experience the difference of custom tailoring.
            </p>
            
            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 border-2"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +260 97 123 4567
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <IconComponent className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full ${action.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <Button className={`w-full ${action.color}`}>
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+260 97 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">custom@linka.zm</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Locations</p>
                    <p className="text-gray-600">Lusaka, Kitwe, Ndola</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-gray-600">Mon-Sat: 8AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Why Choose Us?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Expert Craftsmanship</p>
                    <p className="text-sm text-gray-600">Over 10 years of tailoring experience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Perfect Fit Guarantee</p>
                    <p className="text-sm text-gray-600">Free adjustments until you're satisfied</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Premium Materials</p>
                    <p className="text-sm text-gray-600">High-quality fabrics and accessories</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Fast Turnaround</p>
                    <p className="text-sm text-gray-600">Most orders completed within 7-14 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Final CTA */}
          <div className="text-center mt-8 pt-8 border-t">
            <p className="text-gray-600 mb-4">
              Ready to experience the perfect fit? Let's create something amazing together.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8">
              Start Your Custom Order Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
