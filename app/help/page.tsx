"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SideNavigation } from "@/components/ui/side-navigation";
import { MinimalHeader } from "@/components/ui/minimal-header";
import {
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  ShoppingCart,
  Truck,
  CreditCard,
  User,
  Store,
  Settings,
  Headphones
} from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    title: "Getting Started",
    icon: User,
    questions: [
      {
        q: "How do I create an account?",
        a: "You can create an account by clicking the 'Sign Up' button and following the registration process."
      },
      {
        q: "How do I become a seller?",
        a: "Visit our 'For Retailers' page and complete the seller application form."
      },
      {
        q: "Is Linka free to use?",
        a: "Yes, browsing and buying on Linka is free. Sellers pay a small commission on sales."
      }
    ]
  },
  {
    title: "Shopping & Orders",
    icon: ShoppingCart,
    questions: [
      {
        q: "How do I place an order?",
        a: "Add items to your cart and proceed to checkout. You'll need to provide shipping and payment information."
      },
      {
        q: "Can I track my order?",
        a: "Yes, you'll receive tracking information via email once your order ships."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit cards, mobile money, and bank transfers."
      }
    ]
  },
  {
    title: "Shipping & Delivery",
    icon: Truck,
    questions: [
      {
        q: "How long does shipping take?",
        a: "Delivery times vary by location. Most orders arrive within 2-5 business days in major cities."
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes, many items qualify for free shipping. Look for the 'Free Ship' badge."
      },
      {
        q: "Can I change my delivery address?",
        a: "You can change your address before the order ships by contacting customer support."
      }
    ]
  },
  {
    title: "Premium Listings",
    icon: Store,
    questions: [
      {
        q: "What are Premium Listings?",
        a: "Premium Listings feature curated, high-quality products and services from verified premium vendors."
      },
      {
        q: "How are items selected for Premium Listings?",
        a: "Items are carefully selected based on quality, craftsmanship, and vendor reputation."
      },
      {
        q: "Are Premium Listings more expensive?",
        a: "Premium items may cost more due to their quality, but we often feature exclusive deals and discounts."
      }
    ]
  }
];

const contactMethods = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    action: "Start Chat",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Phone Support",
    description: "Call us for urgent assistance",
    icon: Phone,
    action: "Call Now",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    action: "Send Email",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "WhatsApp",
    description: "Chat with us on WhatsApp",
    icon: MessageCircle,
    action: "Open WhatsApp",
    color: "from-emerald-500 to-emerald-600"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.questions.some(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Side Navigation */}
      <SideNavigation variant="marketplace" />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <MinimalHeader variant="marketplace" showSearch={false} />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-100 rounded-full px-6 py-3 mb-6">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <span className="text-blue-800 font-medium">Help Center</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:ring-0"
              />
            </div>
          </div>

          {/* Quick Contact */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{method.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{method.description}</p>
                  <Button size="sm" className={`bg-gradient-to-r ${method.color} text-white`}>
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            
            {filteredCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                >
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <category.icon className="h-6 w-6 text-blue-600" />
                      <span>{category.title}</span>
                      <Badge variant="outline">{category.questions.length} questions</Badge>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-transform ${
                      expandedCategory === category.title ? 'rotate-90' : ''
                    }`} />
                  </CardTitle>
                </CardHeader>
                
                {expandedCategory === category.title && (
                  <CardContent className="space-y-4">
                    {category.questions.map((qa, qaIndex) => (
                      <div key={qaIndex} className="border-l-4 border-blue-200 pl-4">
                        <h4 className="font-medium text-slate-900 mb-2">{qa.q}</h4>
                        <p className="text-slate-600">{qa.a}</p>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Still Need Help */}
          <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <Headphones className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our customer support team is here to help you with any questions or issues you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Live Chat
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
