"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Music, 
  Film, 
  Gamepad2, 
  Calendar, 
  Crown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Heart,
  Zap
} from "lucide-react"

const footerSections = [
  {
    title: "Entertainment",
    links: [
      { name: "Gaming Hub", href: "#gaming-section", icon: Gamepad2 },
      { name: "Movies & Shows", href: "#movies-section", icon: Film },
      { name: "Music & Audio", href: "#music-section", icon: Music },
      { name: "Live Events", href: "#events-section", icon: Calendar },
      { name: "Premium", href: "#subscriptions-section", icon: Crown }
    ]
  },
  {
    title: "Quick Links",
    links: [
      { name: "Browse Content", href: "/marketplace" },
      { name: "For Creators", href: "/for-retailers" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Account",
    links: [
      { name: "My Profile", href: "/profile" },
      { name: "Subscription", href: "/settings" },
      { name: "Watchlist", href: "/watchlist" },
      { name: "Purchase History", href: "/orders" },
      { name: "Settings", href: "/settings" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  }
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-400" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-400" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-400" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "hover:text-red-400" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-500" }
]

const contactInfo = [
  { icon: Phone, text: "+260 123 456 789", href: "tel:+260123456789" },
  { icon: Mail, text: "entertainment@linka.zm", href: "mailto:entertainment@linka.zm" },
  { icon: MapPin, text: "Lusaka, Zambia", href: "#" }
]

export function EntertainmentFooter() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/20 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Get the latest updates on new releases, exclusive events, and special offers
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
              />
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-6">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
            <p className="text-white/60 text-sm mt-2 text-center">
              Join 50,000+ entertainment lovers
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Entertainment Hub</h4>
                  <p className="text-white/60 text-sm">Your universe of entertainment</p>
                </div>
              </div>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                Discover, stream, and experience the best of Zambian and international entertainment. 
                From gaming tournaments to live concerts, we bring you closer to what you love.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center text-white/70 hover:text-white transition-colors group"
                  >
                    <contact.icon className="h-4 w-4 mr-3 text-purple-400 group-hover:text-purple-300" />
                    {contact.text}
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/70 transition-all hover:bg-white/20 ${social.color} hover:scale-110`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h5 className="text-white font-semibold mb-4">{section.title}</h5>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="flex items-center text-white/70 hover:text-white transition-colors group"
                      >
                        {link.icon && (
                          <link.icon className="h-4 w-4 mr-2 text-purple-400/70 group-hover:text-purple-400" />
                        )}
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Active Users", icon: Heart },
              { value: "2.5K+", label: "Content Creators", icon: Zap },
              { value: "150+", label: "Live Events Monthly", icon: Calendar },
              { value: "99.9%", label: "Uptime", icon: Crown }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © 2024 Entertainment Hub. All rights reserved. Made with{" "}
              <Heart className="h-4 w-4 inline text-red-400 fill-current" />{" "}
              in Zambia.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="/accessibility" className="text-white/60 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
