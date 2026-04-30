import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Users, Briefcase, CheckCircle, ArrowRight, Calendar, Award, Lightbulb, UserCheck, PartyPopper } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import scholarshipImg from "@/assets/programs/scholarship.jpg";
import mentorshipImg from "@/assets/programs/mentorship.jpg";
import livelihoodImg from "@/assets/programs/livelihood.jpg";

export default function Programs() {
  return (
    <Layout>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>
            Our Programs
          </motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">
            Three pillars of <strong>transformation</strong> — empowering students, shaping futures, and strengthening communities across Kenya.
          </p>
        </div>
      </section>

      {/* Scholarship Program */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Program One</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">Scholarship Program</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                  Our flagship program identifies bright students from financially disadvantaged families and covers their tuition at government secondary schools. We currently have 62 students in 2026 across 29 counties.
                </p>
                <h4 className="font-heading font-bold text-lg mb-3 underline decoration-primary underline-offset-4">Selection Criteria:</h4>
                <ul className="space-y-3 mb-6">
                  {[
                    "Must have passed KCPE with minimum score: Boys 375, Girls 350 or KJSEA with 50 points",
                    "Must be enrolled or admitted to a government secondary school",
                    "Parents must demonstrate verified financial need",
                    "Student must show genuine academic potential and character",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Note:</strong> It costs approximately KSH 60,000 to educate 1 student for one year in secondary school.</p>
                </div>
                <Link to="/scholarship" className="btn-primary inline-flex items-center gap-2">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={scholarshipImg} alt="Scholarship program" className="w-full h-full object-cover aspect-[4/3]" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mentorship Program */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-lg">
                <img src={mentorshipImg} alt="Mentorship program" className="w-full h-full object-cover aspect-[4/3]" />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Program Two</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">Students Mentorship Retreat</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                  An annual retreat launched in 2009 that brings together sponsored students and partners during school holidays for mentorship, guidance, counseling, and meaningful one-on-one interaction.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Calendar, label: "Annual Retreat", desc: "During school holidays" },
                    { icon: Award, label: "Industry Leaders", desc: "Professionals from diverse fields" },
                    { icon: Lightbulb, label: "Life Skills", desc: "Career, finance, and personal growth" },
                    { icon: UserCheck, label: "All Students", desc: "Open to all active scholars" },
                  ].map((item) => (
                    <div key={item.label} className="bg-card rounded-xl p-4 shadow-sm">
                      <item.icon className="w-5 h-5 text-primary mb-2" />
                      <h5 className="font-semibold text-sm">{item.label}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Livelihood Program */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-7 h-7 text-primary" />
                </div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Program Three</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">Livelihoods Programme</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                  A support initiative offering training and small business recovery grants to parents, guardians, and Cake Festival bakers affected by Covid-19, implemented in partnership with KCDF and Standard Chartered Bank Foundation.
                </p>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  By empowering parents and guardians with sustainable income sources, we create a stronger foundation for children's education and community development. 39 micro businesses have been supported.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={livelihoodImg} alt="Livelihood program" className="w-full h-full object-cover aspect-[4/3]" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Events */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Events</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Annual Events</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 h-full">
                <PartyPopper className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold mb-3">The Cake Festival</h3>
                <p className="text-muted-foreground text-pretty">An annual fundraising event launched in 2009 showcasing cakes and desserts from home-based, professional, and industrial bakers, with proceeds supporting the student sponsorship program.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 h-full">
                <Calendar className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold mb-3">Annual Dinner</h3>
                <p className="text-muted-foreground text-pretty">An annual October event where Edumed reports on its impact, shares financial statements and future vision, and invites partners and friends to pledge support.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding text-center">
        <div className="container-tight max-w-3xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 text-balance" style={{ lineHeight: "1.15" }}>
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 text-lg mb-8 text-pretty">
              Support our programs through a donation or help a student access education by spreading the word.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/scholarship" className="bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-all active:scale-[0.97]">
                Apply for Scholarship
              </Link>
              <Link to="/donate" className="btn-outline-light">
                Donate Now
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
