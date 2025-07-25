"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, Building } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        type: "general",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-32 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 animate-bounce">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-lg text-slate-600 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Send us a <span className="text-emerald-600">Message</span>
          </h2>
          <p className="text-lg text-slate-600">Fill out the form below and we'll respond as soon as possible</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-900/10 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Type */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: "general", label: "General", icon: MessageSquare },
                { value: "support", label: "Support", icon: AlertCircle },
                { value: "business", label: "Business", icon: Building },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange("type", type.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    formData.type === type.value
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <type.icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{type.label}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <User className="h-4 w-4 mr-2 text-emerald-500" />
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all hover:shadow-md"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-emerald-500" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all hover:shadow-md"
                  required
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Building className="h-4 w-4 mr-2 text-emerald-500" />
                Company/Business (Optional)
              </label>
              <Input
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your company name"
                className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all hover:shadow-md"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Subject *</label>
              <Input
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="What's this about?"
                className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all hover:shadow-md"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Message *</label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Tell us more about how we can help you..."
                className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 min-h-[120px] transition-all hover:shadow-md"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                  Send Message
                </>
              )}
            </Button>

            <p className="text-sm text-slate-500 text-center">
              We typically respond within 24 hours during business days
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
