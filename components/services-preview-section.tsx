import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Wrench,
  Home,
  Car,
  Briefcase,
  Stethoscope,
  GraduationCap,
  Camera,
  ArrowRight,
  Star
} from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "Health & Wellness",
    description: "Medical services, fitness, and wellness providers",
    path: "/services/health-wellness",
    providers: "120+ providers",
    rating: 4.8,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    icon: Home,
    title: "Home Services",
    description: "Cleaning, repairs, and home improvement",
    path: "/industries/home-decor",
    providers: "85+ providers",
    rating: 4.7,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: Car,
    title: "Transport & Logistics",
    description: "Delivery, moving, and transportation services",
    path: "/industries/transport",
    providers: "65+ providers",
    rating: 4.6,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    icon: Camera,
    title: "Entertainment",
    description: "Photography, events, and creative services",
    path: "/industries/entertainment",
    providers: "45+ providers",
    rating: 4.9,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    description: "Tutoring, courses, and skill development",
    path: "/marketplace?category=education",
    providers: "35+ providers",
    rating: 4.8,
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-50 to-purple-50",
  },
  {
    icon: Wrench,
    title: "Professional Services",
    description: "Legal, accounting, and business consulting",
    path: "/marketplace?category=professional",
    providers: "55+ providers",
    rating: 4.7,
    gradient: "from-slate-600 to-slate-800",
    bgGradient: "from-slate-50 to-gray-50",
  },
]

export function ServicesPreviewSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/5 to-red-400/5 rounded-full blur-3xl"></div>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 153, 204, 0.015) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 102, 0, 0.015) 100%)'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center rounded-full px-6 py-3 border shadow-lg backdrop-blur-sm mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 153, 204, 0.1) 0%, rgba(255, 102, 0, 0.05) 100%)',
              color: '#0099cc',
              borderColor: 'rgba(0, 153, 204, 0.2)'
            }}
          >
            <Briefcase className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Local Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, #0099cc 0%, #333333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Discover Amazing
            </span>
            <br />
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, #ff6600 0%, #0099cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Local Services
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Connect with trusted service providers in your community. From healthcare to home improvement, 
            find the perfect service for your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.bgGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon
                      className={`h-8 w-8 bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent`}
                      style={{ WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}
                    />
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-white/90 text-slate-700 border-0 shadow-lg">
                      <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                      {service.rating}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    {service.providers}
                  </div>
                  
                  <Link href={service.path}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 group/btn"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div
            className="rounded-3xl p-8 md:p-12 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #0099cc 0%, #ff6600 100%)',
              boxShadow: '0 32px 64px rgba(0, 153, 204, 0.25)'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to find the perfect service?
            </h3>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Browse our complete directory of local service providers and book with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace?category=services">
                <Button
                  size="lg"
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    color: '#0099cc'
                  }}
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Browse All Services
                </Button>
              </Link>
              
              <Link href="/for-retailers">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Become a Service Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
