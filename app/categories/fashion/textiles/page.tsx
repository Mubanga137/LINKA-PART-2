"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Scissors,
  Ruler,
  Palette,
  Star,
  Clock,
  MapPin,
  Phone,
  Calendar as CalendarIcon,
  Check,
  ShoppingCart,
  Heart,
  Eye,
  Shirt,
  Crown,
  Sparkles,
  Users,
  Award,
  Truck,
  Shield
} from "lucide-react"
import { format } from "date-fns"

interface Fabric {
  id: string
  name: string
  type: string
  price: number
  priceUnit: 'per_meter' | 'per_yard' | 'per_piece'
  image: string
  description: string
  material: string
  colors: string[]
  width: string
  weight: string
  care: string[]
  inStock: boolean
  supplier: string
  location: string
  minOrder?: number
}

interface Tailor {
  id: string
  name: string
  businessName: string
  rating: number
  reviews: number
  specialties: string[]
  priceRange: string
  experience: string
  location: string
  phone: string
  image: string
  portfolio: string[]
  services: TailoringService[]
  availability: string[]
}

interface TailoringService {
  id: string
  name: string
  description: string
  basePrice: number
  timeframe: string
  includes: string[]
}

const fabrics: Fabric[] = [
  {
    id: "fabric-1",
    name: "Premium Ankara Cotton",
    type: "African Print",
    price: 45,
    priceUnit: 'per_meter',
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop",
    description: "Authentic African print cotton fabric with vibrant colors and traditional patterns",
    material: "100% Cotton",
    colors: ["Multi-color", "Blue/Gold", "Red/Black", "Green/Yellow"],
    width: "115cm",
    weight: "Medium weight",
    care: ["Machine wash cold", "Iron on medium heat", "Do not bleach"],
    inStock: true,
    supplier: "Heritage Textiles",
    location: "Lusaka, Zambia",
    minOrder: 2
  },
  {
    id: "fabric-2",
    name: "Luxury Silk Chiffon",
    type: "Formal",
    price: 85,
    priceUnit: 'per_meter',
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=400&h=400&fit=crop",
    description: "Flowing silk chiffon perfect for elegant dresses and formal wear",
    material: "100% Silk",
    colors: ["Champagne", "Midnight Blue", "Emerald", "Burgundy"],
    width: "110cm",
    weight: "Lightweight",
    care: ["Dry clean only", "Cool iron", "Store hanging"],
    inStock: true,
    supplier: "Elegant Fabrics",
    location: "Lusaka, Zambia"
  },
  {
    id: "fabric-3",
    name: "Denim Canvas",
    type: "Casual",
    price: 35,
    priceUnit: 'per_meter',
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    description: "Heavy-duty denim canvas ideal for jeans, jackets, and casual wear",
    material: "Cotton/Elastane blend",
    colors: ["Indigo", "Black", "Stone Wash", "Raw"],
    width: "150cm",
    weight: "Heavy weight",
    care: ["Machine wash warm", "Tumble dry low", "Iron high heat"],
    inStock: true,
    supplier: "Workwear Textiles",
    location: "Ndola, Zambia"
  },
  {
    id: "fabric-4",
    name: "Chitenge Traditional",
    type: "Traditional",
    price: 25,
    priceUnit: 'per_piece',
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop",
    description: "Traditional Zambian chitenge fabric with authentic patterns",
    material: "Cotton",
    colors: ["Traditional Blue", "Traditional Red", "Traditional Green"],
    width: "120cm",
    weight: "Medium weight",
    care: ["Hand wash preferred", "Air dry", "Cool iron"],
    inStock: true,
    supplier: "Traditional Crafts Co.",
    location: "Livingstone, Zambia",
    minOrder: 1
  }
]

const tailors: Tailor[] = [
  {
    id: "tailor-1",
    name: "Sarah Mwanza",
    businessName: "Elegant Stitches",
    rating: 4.9,
    reviews: 187,
    specialties: ["Wedding Dresses", "Formal Wear", "Alterations"],
    priceRange: "ZMW 150 - 800",
    experience: "12 years",
    location: "Lusaka, Zambia",
    phone: "+260 97 123 4567",
    image: "https://images.unsplash.com/photo-1494790108755-2616c27b1df7?w=200&h=200&fit=crop",
    portfolio: [
      "https://images.unsplash.com/photo-1566479179817-1f0a68b5e5bb?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop"
    ],
    services: [
      {
        id: "service-1",
        name: "Custom Dress Making",
        description: "Complete dress creation from design to finishing",
        basePrice: 250,
        timeframe: "2-3 weeks",
        includes: ["Design consultation", "Fitting sessions", "Final alterations"]
      },
      {
        id: "service-2",
        name: "Alterations",
        description: "Professional alterations for existing garments",
        basePrice: 50,
        timeframe: "3-5 days",
        includes: ["Assessment", "Alteration work", "Quality check"]
      }
    ],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    id: "tailor-2",
    name: "Joseph Banda",
    businessName: "Master Tailors",
    rating: 4.8,
    reviews: 234,
    specialties: ["Men's Suits", "Traditional Wear", "Shirts"],
    priceRange: "ZMW 200 - 1200",
    experience: "15 years",
    location: "Ndola, Zambia",
    phone: "+260 96 234 5678",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    portfolio: [
      "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop"
    ],
    services: [
      {
        id: "service-3",
        name: "Bespoke Suit",
        description: "Complete custom suit tailoring service",
        basePrice: 600,
        timeframe: "4-6 weeks",
        includes: ["Measurement session", "3 fittings", "Complete finishing"]
      },
      {
        id: "service-4",
        name: "Shirt Making",
        description: "Custom shirt creation with premium finish",
        basePrice: 120,
        timeframe: "1-2 weeks",
        includes: ["Measurement", "Fabric selection", "Custom fitting"]
      }
    ],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }
]

export default function TextilesPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null)
  const [selectedService, setSelectedService] = useState<TailoringService | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)

  const handleBooking = () => {
    // Booking logic would go here
    alert("Booking request submitted successfully!")
    setBookingOpen(false)
  }

  const renderFabricCard = (fabric: Fabric) => (
    <Card key={fabric.id} className="group bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={fabric.image}
            alt={fabric.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute top-3 left-3">
            <Badge className="bg-blue-500 text-white">{fabric.type}</Badge>
          </div>

          <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-slate-900 mb-1">{fabric.name}</h3>
          <p className="text-sm text-slate-500 mb-2">{fabric.material}</p>
          
          <div className="text-lg font-bold text-indigo-600 mb-2">
            ZMW {fabric.price} / {fabric.priceUnit.replace('_', ' ')}
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center text-xs text-slate-600">
              <Ruler className="h-3 w-3 mr-1" />
              Width: {fabric.width}
            </div>
            <div className="flex items-center text-xs text-slate-600">
              <MapPin className="h-3 w-3 mr-1" />
              {fabric.supplier}, {fabric.location}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="sm">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderTailorCard = (tailor: Tailor) => (
    <Card key={tailor.id} className="bg-white hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <img
            src={tailor.image}
            alt={tailor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <CardTitle className="text-lg">{tailor.businessName}</CardTitle>
            <CardDescription>by {tailor.name}</CardDescription>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{tailor.rating}</span>
              </div>
              <span className="text-sm text-slate-500">({tailor.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-slate-900 mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {tailor.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Experience:</span>
            <p className="font-medium">{tailor.experience}</p>
          </div>
          <div>
            <span className="text-slate-500">Price Range:</span>
            <p className="font-medium">{tailor.priceRange}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4" />
          <span>{tailor.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {tailor.portfolio.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setSelectedTailor(tailor)}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Book Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book with {selectedTailor?.businessName}</DialogTitle>
              <DialogDescription>
                Schedule a consultation with {selectedTailor?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select onValueChange={(value) => {
                  const service = selectedTailor?.services.find(s => s.id === value)
                  setSelectedService(service || null)
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTailor?.services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - ZMW {service.basePrice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Describe your project requirements..."
                  className="mt-1"
                />
              </div>

              {selectedService && (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <h4 className="font-medium">{selectedService.name}</h4>
                  <p className="text-sm text-slate-600 mt-1">{selectedService.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">Base Price:</span>
                    <span className="font-medium">ZMW {selectedService.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Timeframe:</span>
                    <span className="font-medium">{selectedService.timeframe}</span>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setBookingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBooking} className="bg-indigo-600 hover:bg-indigo-700">
                Book Consultation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <Scissors className="inline h-16 w-16 mr-4 mb-4" />
                Textiles & Tailoring
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Discover premium fabrics and connect with skilled tailors in Zambia. 
                From traditional chitenge to modern materials, create your perfect garment.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Browse Fabrics
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Users className="h-5 w-5 mr-2" />
                  Find Tailors
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Tabs defaultValue="fabrics" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="fabrics" className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Premium Fabrics</span>
                </TabsTrigger>
                <TabsTrigger value="tailors" className="flex items-center space-x-2">
                  <Scissors className="h-4 w-4" />
                  <span>Expert Tailors</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fabrics" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Premium Fabric Collection</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    High-quality fabrics sourced from local suppliers. Perfect for creating unique garments
                    that reflect Zambian style and international fashion trends.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {fabrics.map(renderFabricCard)}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
                  <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Quality Guarantee</h3>
                  <p className="text-slate-600 mb-4">
                    All fabrics are sourced from certified suppliers and come with quality assurance.
                  </p>
                  <div className="flex justify-center space-x-8 text-sm">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-green-600 mr-2" />
                      <span>Quality Tested</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 text-green-600 mr-2" />
                      <span>Free Delivery on 5m+</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span>30-Day Return</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tailors" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Expert Tailors & Designers</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Connect with skilled tailors who can bring your vision to life. 
                    From alterations to bespoke creations, find the perfect craftsperson for your needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tailors.map(renderTailorCard)}
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">Choose Your Tailor</h4>
                      <p className="text-sm text-slate-600">Browse profiles and select based on specialties and reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">Book Consultation</h4>
                      <p className="text-sm text-slate-600">Schedule a meeting to discuss your requirements</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">Get Your Garment</h4>
                      <p className="text-sm text-slate-600">Receive your custom-made clothing within the agreed timeframe</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
