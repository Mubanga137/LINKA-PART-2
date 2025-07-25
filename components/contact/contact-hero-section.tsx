"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Phone, Mail, Clock, Headphones } from "lucide-react"

const contactMethods = [
  { icon: MessageCircle, label: "Live Chat", available: true },
  { icon: Phone, label: "Phone Support", available: true },
  { icon: Mail, label: "Email Support", available: true },
  { icon: Headphones, label: "24/7 Help", available: true },
]

export function ContactHeroSection() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Get in</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent animate-gradient-x">
              Touch
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're here to help you succeed. Reach out to our friendly team for support, questions, or to learn more
            about joining the Linka community.
          </p>

          {/* Contact Methods */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-white/20 hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-4 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <method.icon className="h-6 w-6 text-white group-hover:animate-bounce" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {method.label}
                </h3>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm text-slate-600">Available</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live Status */}
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-green-100 px-8 py-4 text-emerald-700 border border-emerald-200/50 shadow-lg backdrop-blur-sm">
            <Clock className="mr-3 h-5 w-5 animate-spin-slow" />
            <span className="font-medium">
              Current time in Lusaka: {currentTime.toLocaleTimeString("en-US", { timeZone: "Africa/Lusaka" })}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
