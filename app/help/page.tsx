"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Headphones,
  Shield,
  CreditCard,
  Package,
  User,
  Settings,
  Star,
  ExternalLink,
  FileText,
  Video,
  Lightbulb,
  Users,
  Zap,
  Heart,
  ShoppingBag,
  Truck
} from "lucide-react";

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Popular help topics
  const helpCategories = [
    {
      id: "all",
      name: "All Topics",
      icon: HelpCircle,
      color: "from-blue-500 to-indigo-500",
      count: 45
    },
    {
      id: "orders",
      name: "Orders & Delivery", 
      icon: Package,
      color: "from-green-500 to-emerald-500",
      count: 12
    },
    {
      id: "payments",
      name: "Payments & Billing",
      icon: CreditCard,
      color: "from-purple-500 to-pink-500",
      count: 8
    },
    {
      id: "account",
      name: "Account & Profile",
      icon: User,
      color: "from-orange-500 to-red-500",
      count: 10
    },
    {
      id: "shopping",
      name: "Shopping Guide",
      icon: ShoppingBag,
      color: "from-cyan-500 to-blue-500",
      count: 9
    },
    {
      id: "technical",
      name: "Technical Support",
      icon: Settings,
      color: "from-gray-500 to-slate-500",
      count: 6
    }
  ];

  // FAQ items
  const faqItems = [
    {
      id: "faq-1",
      category: "orders",
      question: "How can I track my order?",
      answer: "You can track your orders by visiting the 'Orders' section in your dashboard. Each order has a unique tracking number that you can use to monitor delivery status in real-time.",
      popular: true
    },
    {
      id: "faq-2", 
      category: "payments",
      question: "What payment methods do you accept?",
      answer: "We accept mobile money (MTN, Airtel), bank transfers, credit/debit cards, and cash on delivery for eligible areas. All payments are secured with 256-bit SSL encryption.",
      popular: true
    },
    {
      id: "faq-3",
      category: "account",
      question: "How do I update my profile information?",
      answer: "Go to Settings > Profile in your dashboard. You can update your personal information, delivery addresses, and notification preferences. Changes are saved automatically.",
      popular: true
    },
    {
      id: "faq-4",
      category: "shopping",
      question: "How do I add items to my wishlist?",
      answer: "Click the heart icon on any product to add it to your wishlist. You can view all saved items in the Wishlist section and get notified when they go on sale.",
      popular: false
    },
    {
      id: "faq-5",
      category: "orders",
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement if they haven't been processed. Visit your Orders page and select 'Modify' or 'Cancel' next to the relevant order.",
      popular: true
    },
    {
      id: "faq-6",
      category: "technical",
      question: "The app is running slowly. What should I do?",
      answer: "Try clearing your browser cache, checking your internet connection, or switching to a different browser. If issues persist, contact our technical support team.",
      popular: false
    }
  ];

  // Quick action cards
  const quickActions = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      action: "Start Chat",
      available: true,
      href: "/chat"
    },
    {
      title: "Call Customer Service", 
      description: "Speak directly with our experts",
      icon: Phone,
      color: "from-green-500 to-emerald-500",
      action: "Call Now",
      available: true,
      href: "tel:+260-XXX-XXXX"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      color: "from-purple-500 to-pink-500", 
      action: "Send Email",
      available: true,
      href: "mailto:support@linka.zm"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: Video,
      color: "from-orange-500 to-red-500",
      action: "Watch Now",
      available: true,
      href: "/tutorials"
    }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300/25 to-pink-300/25 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How can we{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find answers to common questions, get support, and learn how to make the most of Linka
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for help topics, guides, or FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:shadow-xl transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Instant Support</h2>
            <p className="text-gray-600 text-lg">Choose the best way to reach our team</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group"
              >
                <Link href={action.href}>
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <action.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{action.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                      
                      <div className="flex items-center justify-center">
                        <Button className="group-hover:scale-105 transition-transform">
                          {action.action}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                      
                      {action.available && (
                        <Badge className="mt-3 bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Available Now
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg">Find help topics organized by category</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {helpCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-white/80 text-gray-700 hover:bg-white border border-gray-200 shadow-md hover:shadow-lg"
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span className="font-medium">{category.name}</span>
                <Badge 
                  className={`${
                    activeCategory === category.id 
                      ? "bg-white/20 text-white border-white/30" 
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {category.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50/50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </h3>
                      {faq.popular && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4">
                          <Separator className="mb-4" />
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or browse different categories</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Support Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or concerns
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-3">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Live Chat
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3">
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
