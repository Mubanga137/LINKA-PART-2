"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Users, 
  Star, 
  CheckCircle, 
  Clock,
  Phone,
  MapPin,
  Calculator,
  ArrowRight,
  Building,
  Percent,
  Target,
  Award,
  Shield,
  BookOpen,
  Calendar,
  DollarSign
} from "lucide-react"

export default function TaxAccountingPage() {
  const [businessType, setBusinessType] = useState("")
  const [annualIncome, setAnnualIncome] = useState("")
  const [serviceType, setServiceType] = useState("")

  const taxServices = [
    {
      icon: FileText,
      title: "Tax Filing Services",
      description: "Individual and business tax preparation and filing",
      priceRange: "ZMW 3.5K - 21K",
      timeframe: "1-3 days",
      includes: ["Tax return preparation", "Electronic filing", "Audit support"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: BookOpen,
      title: "Bookkeeping Services",
      description: "Complete financial record keeping and management",
      priceRange: "ZMW 7K - 35K/month",
      timeframe: "Ongoing",
      includes: ["Daily transaction recording", "Financial statements", "Payroll management"],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Building,
      title: "Business Registration",
      description: "Company incorporation and legal compliance",
      priceRange: "ZMW 14K - 56K",
      timeframe: "5-10 days",
      includes: ["Business registration", "Tax ID application", "License assistance"],
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Shield,
      title: "VAT Registration",
      description: "VAT registration and compliance services",
      priceRange: "ZMW 10.5K - 28K",
      timeframe: "3-7 days",
      includes: ["VAT registration", "Monthly returns", "Compliance monitoring"],
      color: "from-orange-500 to-red-600"
    }
  ]

  const taxExperts = [
    {
      name: "Lusaka Tax Associates",
      expertise: "Corporate Tax",
      rating: 4.9,
      reviews: 156,
      experience: "15+ years",
      clients: "500+",
      services: ["Individual Tax", "Corporate Tax", "VAT Registration"],
      location: "Lusaka Central",
      phone: "+260 97 123 456",
      verified: true,
      featured: true
    },
    {
      name: "Professional Accounting Services",
      expertise: "Small Business",
      rating: 4.7,
      reviews: 203,
      experience: "10+ years",
      clients: "300+",
      services: ["Bookkeeping", "Payroll", "Financial Statements"],
      location: "Kitwe, Zambia",
      phone: "+260 97 234 567",
      verified: true,
      featured: false
    },
    {
      name: "Elite Business Consultants",
      expertise: "Business Setup",
      rating: 4.8,
      reviews: 89,
      experience: "12+ years",
      clients: "200+",
      services: ["Business Registration", "Compliance", "Tax Planning"],
      location: "Ndola, Zambia",
      phone: "+260 97 345 678",
      verified: true,
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-600">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-8">
            <span>Finance</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-white font-medium">Tax & Accounting</span>
          </div>

          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Tax & Accounting
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Professional tax consultants and accounting services for individuals and businesses
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        {/* Service Needs Assessment */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 mb-16">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-indigo-700">Find Your Tax Solution</CardTitle>
                <p className="text-indigo-600">Get personalized recommendations based on your needs</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="sole-proprietor">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="limited-company">Limited Company</SelectItem>
                        <SelectItem value="ngo">NGO/Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annual-income">Annual Income Range</Label>
                    <Select value={annualIncome} onValueChange={setAnnualIncome}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5m">Under UGX 5M</SelectItem>
                        <SelectItem value="5m-20m">UGX 5M - 20M</SelectItem>
                        <SelectItem value="20m-50m">UGX 20M - 50M</SelectItem>
                        <SelectItem value="50m-150m">UGX 50M - 150M</SelectItem>
                        <SelectItem value="over-150m">Over UGX 150M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-type">Service Needed</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax-filing">Tax Filing</SelectItem>
                        <SelectItem value="bookkeeping">Bookkeeping</SelectItem>
                        <SelectItem value="business-setup">Business Setup</SelectItem>
                        <SelectItem value="vat-registration">VAT Registration</SelectItem>
                        <SelectItem value="audit">Financial Audit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold">
                    <Target className="h-5 w-5 mr-2" />
                    Get Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tax Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Tax & Accounting Services</h2>
              <p className="text-xl text-slate-600">Professional services to keep your finances in order</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {taxServices.map((service, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                      <p className="text-slate-600">{service.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Price Range:</span>
                        <span className="font-semibold text-slate-900">{service.priceRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Timeframe:</span>
                        <span className="font-semibold text-slate-900">{service.timeframe}</span>
                      </div>
                      <div>
                        <p className="text-slate-600 mb-2">Includes:</p>
                        <ul className="space-y-1">
                          {service.includes.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300`}>
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tax Experts */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Certified Tax Experts</h2>
              <p className="text-xl text-slate-600">Work with qualified professionals you can trust</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {taxExperts.map((expert, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${expert.featured ? 'ring-2 ring-indigo-500' : ''}`}>
                  {expert.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-indigo-500 text-white">Featured</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        <FileText className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{expert.name}</h3>
                        <p className="text-indigo-600 font-medium mb-2">{expert.expertise} Specialist</p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{expert.rating}</span>
                            <span className="text-slate-500">({expert.reviews} reviews)</span>
                          </div>
                          {expert.verified && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Experience:</p>
                        <p className="font-semibold text-slate-900">{expert.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Clients Served:</p>
                        <p className="font-semibold text-slate-900">{expert.clients}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {expert.services.map((service, serviceIndex) => (
                          <Badge key={serviceIndex} variant="secondary" className="bg-indigo-100 text-indigo-700">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{expert.location}</span>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                        Book Consultation
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Appointment Booking System */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Book a Consultation</h2>
              <p className="text-xl text-slate-600">Schedule a meeting with certified tax professionals</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Booking Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Schedule Appointment</CardTitle>
                  <p className="text-slate-600">Choose your preferred time and service</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" className="bg-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-type">Service Type</Label>
                    <Select>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax-filing">Individual Tax Filing</SelectItem>
                        <SelectItem value="business-tax">Business Tax Consultation</SelectItem>
                        <SelectItem value="vat-registration">VAT Registration</SelectItem>
                        <SelectItem value="bookkeeping">Bookkeeping Services</SelectItem>
                        <SelectItem value="audit">Financial Audit</SelectItem>
                        <SelectItem value="business-setup">Business Registration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferred-date">Preferred Date</Label>
                      <Input id="preferred-date" type="date" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred-time">Preferred Time</Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meeting-type">Meeting Type</Label>
                    <Select>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select meeting type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person Meeting</SelectItem>
                        <SelectItem value="video-call">Video Call</SelectItem>
                        <SelectItem value="phone-call">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Notes</Label>
                    <textarea
                      id="message"
                      placeholder="Describe your specific needs or questions..."
                      className="w-full p-3 border border-slate-200 rounded-lg bg-white resize-none h-24"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>

              {/* Available Time Slots */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Available This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { day: "Monday", date: "Jan 15", slots: ["9:00 AM", "2:00 PM", "4:00 PM"] },
                        { day: "Tuesday", date: "Jan 16", slots: ["10:00 AM", "3:00 PM"] },
                        { day: "Wednesday", date: "Jan 17", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
                        { day: "Thursday", date: "Jan 18", slots: ["10:00 AM", "3:00 PM"] },
                        { day: "Friday", date: "Jan 19", slots: ["9:00 AM", "2:00 PM"] }
                      ].map((day, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-medium text-slate-900">{day.day}</p>
                              <p className="text-sm text-slate-600">{day.date}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700">
                              {day.slots.length} slots
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {day.slots.map((slot, slotIndex) => (
                              <button
                                key={slotIndex}
                                className="px-3 py-1 text-xs bg-white border border-slate-200 rounded-full hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Consultation Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Initial Consultation</span>
                        <span className="font-semibold">Free</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Tax Planning Session</span>
                        <span className="font-semibold">UGX 100K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Business Consultation</span>
                        <span className="font-semibold">UGX 150K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Audit Review</span>
                        <span className="font-semibold">UGX 250K</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Downloadable Tools & Resources */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Free Tax Tools & Resources</h2>
              <p className="text-xl text-slate-600">Download helpful tools and templates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Tax Calculator 2024",
                  description: "Calculate your individual or business tax liability",
                  type: "Excel Spreadsheet",
                  downloads: "2.1K downloads",
                  icon: Calculator,
                  color: "from-green-500 to-emerald-600"
                },
                {
                  title: "VAT Registration Guide",
                  description: "Step-by-step guide for VAT registration in Uganda",
                  type: "PDF Guide",
                  downloads: "1.8K downloads",
                  icon: FileText,
                  color: "from-blue-500 to-indigo-600"
                },
                {
                  title: "Expense Tracking Template",
                  description: "Keep track of business expenses for tax purposes",
                  type: "Excel Template",
                  downloads: "3.2K downloads",
                  icon: DollarSign,
                  color: "from-purple-500 to-violet-600"
                },
                {
                  title: "Tax Compliance Checklist",
                  description: "Ensure you meet all tax obligations",
                  type: "PDF Checklist",
                  downloads: "1.5K downloads",
                  icon: CheckCircle,
                  color: "from-orange-500 to-red-600"
                },
                {
                  title: "Business Registration Kit",
                  description: "Forms and requirements for business registration",
                  type: "Document Pack",
                  downloads: "950 downloads",
                  icon: Building,
                  color: "from-teal-500 to-cyan-600"
                },
                {
                  title: "Payroll Tax Calculator",
                  description: "Calculate PAYE and other payroll taxes",
                  type: "Online Tool",
                  downloads: "2.7K uses",
                  icon: Users,
                  color: "from-pink-500 to-rose-600"
                }
              ].map((tool, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h3>
                    <p className="text-slate-600 mb-4">{tool.description}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span>{tool.type}</span>
                      <span>{tool.downloads}</span>
                    </div>
                    <Button className={`w-full bg-gradient-to-r ${tool.color} hover:shadow-lg transition-all duration-300`}>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tax Calendar */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Important Tax Dates</h2>
              <p className="text-xl text-slate-600">Stay compliant with Uganda tax deadlines</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { date: "March 31", event: "Individual Tax Returns", type: "Annual", color: "bg-blue-500" },
                { date: "15th Monthly", event: "VAT Returns", type: "Monthly", color: "bg-green-500" },
                { date: "15th Monthly", event: "PAYE Returns", type: "Monthly", color: "bg-purple-500" },
                { date: "June 30", event: "Corporate Tax", type: "Annual", color: "bg-orange-500" }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold`}>
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.date}</h3>
                    <p className="text-slate-600 text-sm mb-1">{item.event}</p>
                    <Badge variant="outline" className="text-xs">{item.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
