import { ContactHeroSection } from "@/components/contact/contact-hero-section"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactMap } from "@/components/contact/contact-map"
import { ContactFAQ } from "@/components/contact/contact-faq"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      <main>
        <ContactHeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <ContactForm />
          <ContactInfo />
        </div>
        <ContactMap />
        <ContactFAQ />
      </main>
      <Footer />
    </div>
  )
}
