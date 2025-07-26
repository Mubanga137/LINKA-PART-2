import Link from "next/link"
import { LinkIcon, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <LinkIcon className="h-10 w-10 text-indigo-400" />
                <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-xl"></div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Linka
              </span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed text-lg">
              Connecting local businesses with customers. Support your community while discovering amazing products and
              services.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer group border border-white/10"
                >
                  <Icon className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/shop"
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:translate-x-1 inline-block transition-transform"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:translate-x-1 inline-block transition-transform"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:translate-x-1 inline-block transition-transform"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:translate-x-1 inline-block transition-transform"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="text-slate-400 hover:text-white transition-colors text-lg hover:translate-x-1 inline-block transition-transform"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Retailers */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              For Retailers
            </h3>
            <ul className="space-y-4">
              {["Become a Retailer", "Retailer Dashboard", "Resources", "Retailer Support", "Pricing & Fees"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-slate-400 hover:text-white transition-colors text-lg hover:translate-x-1 inline-block transition-transform"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/10 transition-all border border-white/10">
                  <Mail className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-slate-400 group-hover:text-white transition-colors">support@linka.com</span>
              </li>
              <li className="flex items-center group">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/10 transition-all border border-white/10">
                  <Phone className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-slate-400 group-hover:text-white transition-colors">+260 97 123-4567</span>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-white/10 transition-all border border-white/10">
                  <MapPin className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-slate-400 group-hover:text-white transition-colors">
                  <div>123 Commerce Street</div>
                  <div>Business District</div>
                  <div>Lusaka, Zambia 10101</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-lg">© 2024 Linka. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-slate-400 hover:text-white text-lg transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
