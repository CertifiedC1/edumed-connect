import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { Heart, BookOpen, Shield, Eye, Target, Sparkles, ArrowRight } from "lucide-react";
import aboutImage from "@/assets/hero-slide-3.jpg";

const timelineSteps = [
  { year: "1996", title: "Foundation", desc: "Edumed Trust is established as a Kenyan Christian Charitable Trust by Dr. Solomon Mwangi and Mr. Henry Rugendo.", bgColor: "bg-[hsl(349,100%,25%)]" },
  { year: "2000", title: "Registration", desc: "Established as an irrevocable public charitable trust and incorporated as Edumed Trust Registered Trustees under Cap 164.", bgColor: "bg-[hsl(30,80%,45%)]" },
  { year: "2009", title: "Mentorship & Cake Festival", desc: "Annual student mentorship retreats and The Cake Festival fundraiser launched, connecting students with mentors and the community.", bgColor: "bg-[hsl(150,60%,35%)]" },
  { year: "2018", title: "300 Students", desc: "Milestone of 300 students educated reached, with alumni working across multiple sectors.", bgColor: "bg-[hsl(220,70%,45%)]" },
  { year: "2021", title: "Livelihood Program", desc: "Livelihoods programme launched with KCDF and Standard Chartered Bank Foundation to support micro-enterprises.", bgColor: "bg-[hsl(280,60%,45%)]" },
  { year: "2026", title: "30-Year Anniversary", desc: "Celebrating three decades of transformation with 500+ students educated and 640+ lives changed.", bgColor: "bg-[hsl(45,90%,50%)]", special: true },
];

const values = [
  { icon: Heart, title: "Compassion", desc: "We respond to the needs of the vulnerable with empathy, warmth, and genuine care for their wellbeing." },
  { icon: Shield, title: "Dignity & Respect", desc: "Every student and family we serve deserves to be treated with honor and the highest regard for their humanity." },
  { icon: Eye, title: "Good Stewardship", desc: "We are faithful managers of every resource entrusted to us, ensuring maximum impact for donors and beneficiaries alike." },
  { icon: BookOpen, title: "Integrity", desc: "We operate with transparency, honesty, and consistency in all our programs, partnerships, and communications." },
];

const beliefs = [
  "It is more blessed to give than to receive.",
  "Knowledge is a treasure.",
  "We are our brother's keeper.",
  "Practical worship of God is demonstrated through service to others.",
  "God has blessed every nation with adequate resources to meet the needs of its people.",
];

const celebrationEmojis = ["🎉", "🎊", "✨", "🥳", "🎓", "🏆", "💫", "🎆", "🎇", "🥂", "🌟", "🎉", "🎊", "✨", "🥳", "🏆"];

export default function About() {
  const [hovering2026, setHovering2026] = useState(false);

  return (
    <Layout>
      <Helmet><title>About Us — Edumed Trust</title></Helmet>
      {/* Hero */}
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>
            About Edumed Trust
          </motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">
            A Kenyan Christian Charitable Trust established in 1996, supporting bright students from financially disadvantaged families.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Who We Are</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6 text-balance">Three Decades of Faithful Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                  Edumed Trust was founded in 1996 in Nairobi, Kenya, by Dr. Solomon Mwangi and Mr. Henry Rugendo. We are a Kenyan Christian charitable trust dedicated to transforming lives through education.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                  We address social challenges, relieve poverty, and restore dignity by supporting bright, needy secondary school students across Kenya. As a trusted partner, we channel funds with the highest standards of integrity and accountability.
                </p>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Supported by robust governance structures, we provide access to secondary and tertiary education, youth mentorship, and holistic empowerment opportunities.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={aboutImage} alt="Edumed Trust students" className="w-full h-full object-cover aspect-[4/3]" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-primary section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter target={850} label="Students & Families Impacted" suffix="+" light />
            <AnimatedCounter target={81} label="University Qualification Rate" suffix="%" light />
            <AnimatedCounter target={42} label="Million KES School Fees Paid" suffix="M+" light />
            <AnimatedCounter target={500} label="Individual Partner Contributors" suffix="+" light />
          </div>
        </div>
      </section>

      {/* Registration & Tax */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight max-w-4xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                <h3 className="font-heading font-bold text-lg mb-3">Registration & Incorporation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Established as an irrevocable public charitable trust on 17 January 2000</li>
                  <li>• Incorporated on 31 May 2000 as Edumed Trust Registered Trustees</li>
                  <li>• Registered as a body corporate under The Trustees Perpetual Succession Act Cap 164</li>
                  <li>• Based in Nairobi, Kenya</li>
                </ul>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                <h3 className="font-heading font-bold text-lg mb-3">Tax Benefit for Giving</h3>
                <p className="text-sm text-muted-foreground">
                  The Income Tax Act Cap.470 allows a tax payer to enjoy a tax benefit upon donating to a qualifying charity under section 15(2)(w) and The Income Tax (Charitable Organisations and Donations Exemption) Rules, 2024.
                </p>
                <p className="text-sm text-primary font-semibold mt-3">Edumed Trust has Tax Exempt status.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">What Drives Us</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Vision & Mission</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="bg-section-alt rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-semibold text-xs uppercase tracking-wider">Our Vision</span>
                <h3 className="text-2xl font-heading font-bold mt-2 mb-3">A Godly Response to the Cry of the Needy</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty italic text-sm">
                  "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in..." — Matthew 25:35-36
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-section-alt rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-semibold text-xs uppercase tracking-wider">Our Mission</span>
                <h3 className="text-2xl font-heading font-bold mt-2 mb-3">Transforming Lives Through the Gospel of Christ</h3>
                <p className="text-foreground font-bold leading-relaxed text-pretty">
                  Transforming lives through the gospel of Christ by practical demonstration of Christian love in meeting education and medical needs of the poor.
                </p>
                <p className="text-muted-foreground leading-relaxed text-pretty italic text-sm mt-3">
                  "As the body without the spirit is dead, so faith without deeds is dead." — James 2:26
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values + Beliefs */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Our Core Values</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {values.map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <val.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-heading font-bold text-lg mb-2">{val.title}</h4>
                  <p className="text-muted-foreground text-sm text-pretty">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="bg-card rounded-2xl p-8 shadow-sm max-w-3xl mx-auto">
              <h3 className="font-heading font-bold text-lg mb-4 text-center">We Believe That</h3>
              <ul className="space-y-3">
                {beliefs.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <span className="text-primary mt-0.5">✦</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">30 Years of Impact</h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
            {timelineSteps.map((step, i) => (
              <ScrollReveal key={step.year} delay={i * 0.08}>
                <div className={`relative flex items-start gap-6 mb-12 md:mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div
                      className={`inline-block rounded-2xl p-6 relative ${step.bgColor} text-white`}
                      onMouseEnter={() => step.special && setHovering2026(true)}
                      onMouseLeave={() => step.special && setHovering2026(false)}
                    >
                      <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">{step.year}</span>
                      <h4 className="text-xl font-heading font-bold mt-3">{step.title}</h4>
                      <p className="text-white/80 mt-2 text-pretty">{step.desc}</p>
                    </div>
                    {/* Emojis OUTSIDE the card for 2026 */}
                    {step.special && hovering2026 && (
                      <div className="absolute inset-0 pointer-events-none z-20" style={{ overflow: "visible" }}>
                        {celebrationEmojis.map((emoji, j) => {
                          const angle = (j / celebrationEmojis.length) * 360;
                          const rad = (angle * Math.PI) / 180;
                          const dist = 160 + Math.random() * 80;
                          return (
                            <motion.span
                              key={j}
                              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                              animate={{
                                opacity: 0,
                                scale: 2.5,
                                x: Math.cos(rad) * dist,
                                y: Math.sin(rad) * dist,
                              }}
                              transition={{ duration: 1.5, delay: j * 0.06 }}
                              className="absolute text-5xl"
                              style={{ left: "50%", top: "50%", marginLeft: "-20px", marginTop: "-20px" }}
                            >
                              {emoji}
                            </motion.span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full ${step.bgColor} md:-translate-x-2 translate-y-2 ring-4 ring-background z-10`} />
                  <div className="md:hidden pl-10 relative">
                    <div
                      className={`rounded-2xl p-6 ${step.bgColor} text-white`}
                      onMouseEnter={() => step.special && setHovering2026(true)}
                      onMouseLeave={() => step.special && setHovering2026(false)}
                    >
                      <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">{step.year}</span>
                      <h4 className="text-xl font-heading font-bold mt-3">{step.title}</h4>
                      <p className="text-white/80 mt-2 text-pretty">{step.desc}</p>
                    </div>
                    {step.special && hovering2026 && (
                      <div className="absolute inset-0 pointer-events-none z-20" style={{ overflow: "visible" }}>
                        {celebrationEmojis.slice(0, 8).map((emoji, j) => (
                          <motion.span
                            key={j}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 0, y: -120, x: (Math.random() - 0.5) * 180 }}
                            transition={{ duration: 1.3, delay: j * 0.08 }}
                            className="absolute text-4xl"
                            style={{ left: `${15 + j * 10}%`, top: "0" }}
                          >
                            {emoji}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold">Why Partner With Us</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Transform Lives", desc: "Your support directly enables bright, needy students to access and complete secondary education." },
                { title: "Transparent Funds", desc: "Edumed operates with strong governance and a proven basket-funding model with highest accountability." },
                { title: "Lasting Impact", desc: "Beyond education, your partnership supports youth mentorship, empowerment, and community development." },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <h4 className="font-heading font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm text-pretty">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-primary font-semibold mt-8 text-lg">
              Did you know? 10 partners, each giving KSH 500/month for one year, can keep 1 child in school!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="section-padding">
        <div className="container-tight max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance">Join Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-8 text-pretty">
              Whether as a donor, mentor, partner, or applicant — there is a place for you in the Edumed Trust family.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="btn-primary">Donate Now</Link>
              <Link to="/contact" className="btn-outline-dark">Get in Touch</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
