import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Mwamba Chanda",
    role: "Co-Founder & CEO",
    bio: "Former software engineer with a passion for empowering Zambian entrepreneurs through technology.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mwamba@linka.zm",
    },
  },
  {
    name: "Grace Mulenga",
    role: "Co-Founder & CTO",
    bio: "Tech innovator focused on building scalable platforms that serve African markets.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "grace@linka.zm",
    },
  },
  {
    name: "Joseph Banda",
    role: "Head of Operations",
    bio: "Operations expert ensuring smooth delivery and customer satisfaction across Zambia.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "joseph@linka.zm",
    },
  },
  {
    name: "Chipo Tembo",
    role: "Head of Marketing",
    bio: "Marketing strategist passionate about connecting brands with Zambian communities.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "chipo@linka.zm",
    },
  },
]

export function AboutTeamSection() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The passionate individuals behind Linka's mission to transform e-commerce in Zambia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-4">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 bg-slate-100 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors group/social"
                  >
                    <Linkedin className="h-5 w-5 text-slate-600 group-hover/social:text-blue-600" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 bg-slate-100 hover:bg-sky-100 rounded-xl flex items-center justify-center transition-colors group/social"
                  >
                    <Twitter className="h-5 w-5 text-slate-600 group-hover/social:text-sky-600" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-10 h-10 bg-slate-100 hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors group/social"
                  >
                    <Mail className="h-5 w-5 text-slate-600 group-hover/social:text-emerald-600" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-200/50 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Join Our Team</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for empowering Zambian entrepreneurs.
              Check out our open positions and become part of the Linka family.
            </p>
            <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              View Open Positions
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
