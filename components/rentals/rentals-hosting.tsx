"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import {
  DollarSign,
  Shield,
  Users,
  BarChart3,
  Home,
  Camera,
  CreditCard,
  CheckCircle,
  Star,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  User,
} from "lucide-react"

const hostingBenefits = [
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description: "Generate up to ZMW 15,000+ monthly by hosting travelers",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    benefits: [
      "Set your own prices",
      "Instant mobile money payments",
      "No hidden fees or commissions",
      "Flexible hosting schedule",
    ],
  },
  {
    icon: Shield,
    title: "Host Protection",
    description: "Comprehensive insurance and support for peace of mind",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    benefits: [
      "Property damage protection",
      "Liability coverage included",
      "24/7 emergency support",
      "Secure payment processing",
    ],
  },
  {
    icon: Users,
    title: "Verified Guests",
    description: "All guests are ID-verified before booking",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    benefits: [
      "Government ID verification",
      "Phone number confirmation",
      "Review system for accountability",
      "Background check process",
    ],
  },
  {
    icon: BarChart3,
    title: "Easy Management",
    description: "Simple tools to manage bookings and communicate with guests",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    benefits: [
      "Mobile-friendly dashboard",
      "Automated booking management",
      "Guest messaging system",
      "Performance analytics",
    ],
  },
]

const hostingSteps = [
  {
    number: 1,
    title: "List Your Property",
    description: "Upload photos and describe your space",
    icon: Camera,
    details: "Add high-quality photos, write a compelling description, and set your house rules",
  },
  {
    number: 2,
    title: "Set Your Price",
    description: "Choose competitive rates for your area",
    icon: CreditCard,
    details: "Use our pricing tools to set competitive rates and maximize your earnings",
  },
  {
    number: 3,
    title: "Welcome Guests",
    description: "Start hosting and earning money",
    icon: Users,
    details: "Receive bookings, communicate with guests, and provide excellent hospitality",
  },
]

const successStories = [
  {
    name: "Sarah Mwanza",
    location: "Kabulonga, Lusaka",
    property: "2-bedroom apartment",
    monthlyEarnings: "ZMW 12,500",
    rating: 4.9,
    reviews: 127,
    joinedDate: "March 2023",
    story:
      "Hosting on Linka has been incredible! I converted my spare rooms into a beautiful guest space and now earn enough to cover my mortgage. The guests are respectful and the platform makes everything so easy to manage.",
  },
  {
    name: "James Banda",
    location: "Cairo Road, Lusaka",
    property: "Studio apartment",
    monthlyEarnings: "ZMW 8,200",
    rating: 4.7,
    reviews: 89,
    joinedDate: "June 2023",
    story:
      "As a business traveler myself, I knew what guests needed. My downtown studio is perfect for business visitors. The extra income has allowed me to invest in more properties. Linka's support team is always helpful!",
  },
]

export function RentalsHosting() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyLocation: "",
    propertyType: "",
    bedrooms: "",
    description: "",
    agreeTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Host application submitted:", formData)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Become a</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Linka Host
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Turn your extra space into extra income. Join 150+ successful hosts across Zambia
          </p>
        </div>

        {/* Hosting Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {hostingBenefits.map((benefit, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">{benefit.description}</p>

                <ul className="space-y-3">
                  {benefit.benefits.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-slate-700 text-sm sm:text-base">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Start Hosting in
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Get your property listed and start earning within 24 hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {hostingSteps.map((step, index) => (
              <div key={index} className="text-center group relative">
                <div className="relative mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/25 mx-auto group-hover:shadow-2xl group-hover:shadow-emerald-500/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                    <step.icon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-lg">
                    {step.number}
                  </div>
                  {index < hostingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                  )}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{step.title}</h4>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">{step.description}</p>
                <p className="text-sm text-slate-500">{step.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Host Success
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Real hosts sharing their journey and earnings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mr-4">
                      <span className="text-white font-bold text-base sm:text-lg">
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base sm:text-lg">{story.name}</div>
                      <div className="text-slate-600 text-sm sm:text-base">{story.location}</div>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-bold text-slate-900">{story.rating}</span>
                        <span className="ml-1 text-sm text-slate-500">({story.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-6 border border-emerald-200/50">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-emerald-600">{story.monthlyEarnings}</div>
                        <div className="text-sm text-emerald-700">Monthly Earnings</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-600">{story.property}</div>
                        <div className="text-sm text-emerald-700">Property Type</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed italic mb-4 text-sm sm:text-base">"{story.story}"</p>

                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Hosting since {story.joinedDate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Host Application Form */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-emerald-600/20 to-green-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-orange-600/20 to-amber-600/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Ready to Start
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Hosting?
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Fill out the form below and we'll help you get started within 24 hours
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center">
                      <User className="h-4 w-4 mr-2 text-emerald-400" />
                      First Name *
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center">
                      <User className="h-4 w-4 mr-2 text-emerald-400" />
                      Last Name *
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-emerald-400" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-emerald-400" />
                      Phone Number *
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+260 97 123-4567"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
                      required
                    />
                  </div>

                  {/* Property Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
                      Property Location *
                    </label>
                    <select
                      value={formData.propertyLocation}
                      onChange={(e) => handleInputChange("propertyLocation", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      required
                    >
                      <option value="" className="text-slate-900">
                        Select location
                      </option>
                      <option value="lusaka-central" className="text-slate-900">
                        Lusaka Central
                      </option>
                      <option value="kabulonga" className="text-slate-900">
                        Kabulonga
                      </option>
                      <option value="chilenje" className="text-slate-900">
                        Chilenje
                      </option>
                      <option value="woodlands" className="text-slate-900">
                        Woodlands
                      </option>
                      <option value="livingstone" className="text-slate-900">
                        Livingstone
                      </option>
                      <option value="ndola" className="text-slate-900">
                        Ndola
                      </option>
                      <option value="kitwe" className="text-slate-900">
                        Kitwe
                      </option>
                      <option value="other" className="text-slate-900">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center">
                      <Home className="h-4 w-4 mr-2 text-emerald-400" />
                      Property Type *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange("propertyType", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      required
                    >
                      <option value="" className="text-slate-900">
                        Select property type
                      </option>
                      <option value="apartment" className="text-slate-900">
                        Apartment
                      </option>
                      <option value="house" className="text-slate-900">
                        House
                      </option>
                      <option value="studio" className="text-slate-900">
                        Studio
                      </option>
                      <option value="villa" className="text-slate-900">
                        Villa
                      </option>
                      <option value="lodge" className="text-slate-900">
                        Lodge
                      </option>
                      <option value="other" className="text-slate-900">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Number of Bedrooms *</label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  >
                    <option value="" className="text-slate-900">
                      Select number of bedrooms
                    </option>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="text-slate-900">
                        {num} bedroom{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Property Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Tell us about your property, amenities, and what makes it special..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 min-h-[120px]"
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-300 leading-relaxed">
                    I agree to the{" "}
                    <a href="/terms" className="text-emerald-400 hover:text-emerald-300 underline">
                      Host Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                      Privacy Policy
                    </a>
                    . I understand that Linka will review my application and property details before approval.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!formData.agreeTerms}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Start Host Application
                  </Button>
                  <p className="text-sm text-slate-400 mt-4">
                    We'll review your application and get back to you within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
