"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, User, Mail, Phone, MapPin, FileText } from "lucide-react"

export function RetailerSignupForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    businessType: "",
    description: "",
    agreeTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-600/10 to-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-600/10 to-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Start Your </span>
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Fill out the form below and we'll get you set up within 24 hours
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-900/20 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center">
                  <Store className="h-4 w-4 mr-2 text-emerald-400" />
                  Business Name *
                </label>
                <Input
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Enter your business name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center">
                  <User className="h-4 w-4 mr-2 text-emerald-400" />
                  Owner Name *
                </label>
                <Input
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  placeholder="Enter your full name"
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

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
                  Business Location *
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  required
                >
                  <option value="" className="text-slate-900">
                    Select location
                  </option>
                  <option value="lusaka-central" className="text-slate-900">
                    Lusaka Central
                  </option>
                  <option value="chilenje" className="text-slate-900">
                    Chilenje
                  </option>
                  <option value="kabulonga" className="text-slate-900">
                    Kabulonga
                  </option>
                  <option value="woodlands" className="text-slate-900">
                    Woodlands
                  </option>
                  <option value="roma" className="text-slate-900">
                    Roma
                  </option>
                  <option value="avondale" className="text-slate-900">
                    Avondale
                  </option>
                  <option value="other" className="text-slate-900">
                    Other
                  </option>
                </select>
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-emerald-400" />
                  Business Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  required
                >
                  <option value="" className="text-slate-900">
                    Select business type
                  </option>
                  <option value="crafts" className="text-slate-900">
                    Traditional Crafts
                  </option>
                  <option value="food" className="text-slate-900">
                    Food & Beverages
                  </option>
                  <option value="fashion" className="text-slate-900">
                    Fashion & Clothing
                  </option>
                  <option value="jewelry" className="text-slate-900">
                    Jewelry & Accessories
                  </option>
                  <option value="home" className="text-slate-900">
                    Home & Decor
                  </option>
                  <option value="other" className="text-slate-900">
                    Other
                  </option>
                </select>
              </div>
            </div>

            {/* Business Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Business Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Tell us about your business, products, and what makes you unique..."
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
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                  Privacy Policy
                </a>
                . I understand that Linka will review my application and contact me within 24-48 hours.
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={!formData.agreeTerms}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-12 py-4 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Application
              </Button>
              <p className="text-sm text-slate-400 mt-4">
                We'll review your application and get back to you within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
