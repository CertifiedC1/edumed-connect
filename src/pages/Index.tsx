import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { GraduationCap, Users, Briefcase, ArrowRight, CheckCircle, Quote } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { supabase } from "@/integrations/supabase/client";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import aboutImage from "@/assets/hero-slide-3.jpg";

import parklandsBaptist from "@/assets/partners/parklands-baptist.png";
import ncba from "@/assets/partners/ncba.png";
import kcdf from "@/assets/partners/kcdf.png";
import tropicalHeat from "@/assets/partners/tropical-heat.png";
import magicalHolidays from "@/assets/partners/magical-holidays.png";
import jibu from "@/assets/partners/jibu.png";
import accessBank from "@/assets/partners/access-bank.png";
import standardChartered from "@/assets/partners/standard-chartered.png";
import shareworldGlobal from "@/assets/partners/shareworld-global.png";
import cakeFestival from "@/assets/partners/cake-festival.png";
import citam from "@/assets/partners/citam.png";
import kapaOil from "@/assets/partners/kapa-oil.png";
import dairyland from "@/assets/partners/dairyland.png";
import pceaStAndrews from "@/assets/partners/pcea-st-andrews.png";
import sarovaPanafric from "@/assets/partners/sarova-panafric.png";
import allTymesTents from "@/assets/partners/all-tymes-tents.png";
import wiaEastAfrica from "@/assets/partners/wia-east-africa.png";
import intexConstruction from "@/assets/partners/intex-construction.png";
import crbc from "@/assets/partners/crbc.png";

const heroSlides = [heroSlide1, heroSlide2, heroSlide3];

const programs = [
  { icon: GraduationCap, title: "Scholarship Program", description: "Supporting bright students from disadvantaged backgrounds with secondary school tuition and educational support.", link: "/scholarship" },
  { icon: Users, title: "Mentorship Program", description: "Annual retreats connecting students with business leaders and community mentors for guidance and career development.", link: "/programs" },
  { icon: Briefcase, title: "Livelihood Program", description: "Empowering families through micro-enterprise support, creating sustainable income sources for lasting change.", link: "/programs" },
];

const partnerLogos = [
  { src: parklandsBaptist, alt: "Parklands Baptist Church" },
  { src: ncba, alt: "NCBA" },
  { src: kcdf, alt: "KCDF" },
  { src: tropicalHeat, alt: "Tropical Heat" },
  { src: magicalHolidays, alt: "Magical Holidays" },
  { src: jibu, alt: "Jibu" },
  { src: accessBank, alt: "Access Bank" },
  { src: standardChartered, alt: "Standard Chartered" },
  { src: shareworldGlobal, alt: "ShareWorld Global" },
  { src: cakeFestival, alt: "The Cake Festival" },
  { src: citam, alt: "CITAM" },
  { src: kapaOil, alt: "Kapa Oil Refineries" },
  { src: dairyland, alt: "Dairyland" },
  { src: pceaStAndrews, alt: "PCEA St. Andrew's Church" },
  { src: sarovaPanafric, alt: "Sarova Panafric" },
  { src: allTymesTents, alt: "All Tymes Tents" },
  { src: wiaEastAfrica, alt: "WIA East Africa" },
  { src: intexConstruction, alt: "Intex Construction" },
  { src: crbc, alt: "CRBC - China Road and Bridge Corporation" },
];

interface AlumniStory {
  id: string;
  name: string;
  title: string;
  school: string | null;
  quote: string | null;
  image_url: string | null;
}

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [alumniStories, setAlumniStories] = useState<AlumniStory[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    supabase.from("alumni_stories").select("*").order("created_at", { ascending: false }).limit(3).then(({ data }) => {
      if (data) setAlumniStories(data);
    });
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Edumed Trust — Transforming Lives Through Education</title>
        <meta name="description" content="Edumed Trust supports bright but financially disadvantaged students across Kenya through education, mentorship, and community empowerment." />
        <meta property="og:title" content="Edumed Trust — Transforming Lives Through Education" />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Hero Section with Slideshow */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: currentSlide === i ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={slide}
              alt={`Edumed Trust students ${i + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container-tight px-4 lg:px-8 py-20 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-6 text-balance" style={{ lineHeight: "1.05" }}>
              Transforming Lives Through Education
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
              Edumed Trust supports bright but financially disadvantaged students across Kenya through education, mentorship, and community empowerment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="btn-primary text-base">Donate Now</Link>
              <Link to="/scholarship" className="btn-outline-light text-base">Apply for Scholarship</Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"}`} />
          ))}
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section-padding bg-primary">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedCounter target={500} label="Students Educated" light />
            <AnimatedCounter target={640} label="Lives Impacted" light />
            <AnimatedCounter target={123} label="Families Helped" light />
            <AnimatedCounter target={39} label="Businesses Supported" light />
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-lg group">
                <img src={aboutImage} alt="Edumed Trust students" className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6 text-balance">A Godly Response to the Cry of the Needy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">Edumed Trust is a Kenyan Christian Charitable Trust established in 1996 to support the education, mentorship, and medical needs of bright students from needy families.</p>
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">Guided by our mission to transform lives through the gospel of Christ, we demonstrate Christian love through education, creating ripples of change across generations.</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {["Compassion", "Integrity", "Stewardship", "Dignity"].map((val) => (
                    <div key={val} className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-semibold text-sm">{val}</span>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-balance">Our Programs</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <ScrollReveal key={prog.title} delay={i * 0.1}>
                <Link to={prog.link} className="block bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full group">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <prog.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{prog.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{prog.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary font-semibold mt-4 text-sm group-hover:gap-2.5 transition-all">Learn More <ArrowRight className="w-4 h-4" /></span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Stories - only show if admin has added them */}
      {alumniStories.length > 0 && (
        <section className="section-padding">
          <div className="container-tight">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Success Stories</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 text-balance">Students Whose Lives Were Changed</h2>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8">
              {alumniStories.map((story, i) => (
                <ScrollReveal key={story.id} delay={i * 0.1}>
                  <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group">
                    {story.image_url && (
                      <div className="h-56 overflow-hidden">
                        <img src={story.image_url} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <Quote className="w-8 h-8 text-primary/30 mb-3" />
                      <p className="text-muted-foreground italic leading-relaxed mb-4 flex-1 text-pretty">"{story.quote}"</p>
                      <div>
                        <h4 className="font-heading font-bold text-lg">{story.name}</h4>
                        <p className="text-sm text-muted-foreground">{story.school}</p>
                      </div>
                      <Link to="/alumni" className="inline-flex items-center gap-1.5 text-primary font-semibold mt-4 text-sm hover:gap-2.5 transition-all">Read Full Story <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trusted Partners */}
      <section className="section-padding-sm overflow-hidden bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <h3 className="text-center text-lg font-heading font-semibold text-muted-foreground mb-8">Our Trusted Partners</h3>
          </ScrollReveal>
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-left" style={{ width: `${partnerLogos.length * 176 * 2}px` }}>
              {[...partnerLogos, ...partnerLogos].map((partner, i) => (
                <div key={i} className="flex-shrink-0 w-[176px] py-4 flex items-center justify-center">
                  <img src={partner.src} alt={partner.alt} className="h-12 md:h-16 w-auto object-contain max-w-[140px] hover:scale-110 transition-transform duration-300" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 text-balance" style={{ lineHeight: "1.15" }}>Help Change a Student's Future</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 text-pretty">For as little as KSH 1,000, you can help a bright Kenyan student access secondary education and reach their full potential.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-all active:scale-[0.97]">Donate Now</Link>
              <Link to="/scholarship" className="btn-outline-light">Apply for Scholarship</Link>
              <Link to="/partner" className="btn-outline-light">Become a Partner</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Stay Updated</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Latest News</h2>
              </div>
              <Link to="/news" className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">View All <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">Milestone</span>
                <h3 className="text-2xl font-heading font-bold mb-3">Edumed Trust Celebrates 30 Years of Transforming Lives</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">As we mark three decades of faithful service, we reflect on over 450 students who have gone through our scholarship program, creating ripples of change across Kenya.</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span>March 2026</span><span>·</span><span>4 min read</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <Link to="/news" className="md:hidden inline-flex items-center gap-2 text-primary font-semibold mt-6 hover:gap-3 transition-all">View All News <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </Layout>
  );
}
