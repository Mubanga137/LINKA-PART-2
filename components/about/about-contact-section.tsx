import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

export function AboutContactSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-600/10 to-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-600/10 to-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Get in Touch</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Have questions about Linka? Want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-900/20 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm">Email</div>
                    <div className="text-white font-medium">hello@linka.zm</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm">Phone</div>
                    <div className="text-white font-medium">+260 97 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm">Address</div>
                    <div className="text-white font-medium">Lusaka, Zambia</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm">Support</div>
                    <div className="text-white font-medium">24/7 Customer Support</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-900/20 border border-white/10">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Business Hours
              </h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-900/20 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Ready to Get Started?
            </h3>

            <div className="space-y-6">
              <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20">
                <h4 className="text-lg font-bold text-emerald-400 mb-2">For Customers</h4>
                <p className="text-slate-300 mb-4">Start shopping from local Zambian retailers today</p>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Start Shopping
                </Button>
              </div>

              <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                <h4 className="text-lg font-bold text-blue-400 mb-2">For Retailers</h4>
                <p className="text-slate-300 mb-4">Join our platform and grow your business</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Become a Retailer
                </Button>
              </div>

              <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/20">
                <h4 className="text-lg font-bold text-orange-400 mb-2">For Partners</h4>
                <p className="text-slate-300 mb-4">Explore partnership opportunities with Linka</p>
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
