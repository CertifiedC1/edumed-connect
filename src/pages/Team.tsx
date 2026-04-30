import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";

import georgeMacgoye from "@/assets/team/george-macgoye.png";
import charlesNjoroge from "@/assets/team/charles-njoroge.jpg";
import patrickKihara from "@/assets/team/patrick-kihara.jpg";
import kennedyGetange from "@/assets/team/kennedy-getange.jpg";
import henryRugendo from "@/assets/team/henry-rugendo.jpg";
import solomonMwangi from "@/assets/team/solomon-mwangi.png";
import carolineOyugi from "@/assets/team/caroline-oyugi.png";
import andreaLihumi from "@/assets/team/andrea-lihumi.png";
import muneneWaruhiu from "@/assets/team/munene-waruhiu.png";
import waruingiGachago from "@/assets/team/waruingi-gachago.png";
import ericMwenda from "@/assets/team/eric-mwenda.jpg";
import martinMbandu from "@/assets/team/martin-mbandu.jpg";
import lucyNdungu from "@/assets/team/lucy-ndungu.png";

import parklandsBaptist from "@/assets/partners/parklands-baptist.png";
import ncba from "@/assets/partners/ncba.png";
import kcdf from "@/assets/partners/kcdf.png";
import tropicalHeat from "@/assets/partners/tropical-heat.png";
import magicalHolidays from "@/assets/partners/magical-holidays.png";
import jibu from "@/assets/partners/jibu.png";
import accessBank from "@/assets/partners/access-bank.png";
import standardChartered from "@/assets/partners/standard-chartered.png";
import shareworldGlobal from "@/assets/partners/shareworld-global.png";
import intexConstruction from "@/assets/partners/intex-construction.png";
import crbc from "@/assets/partners/crbc.png";

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
  { src: intexConstruction, alt: "Intex Construction" },
  { src: crbc, alt: "CRBC - China Road and Bridge Corporation" },
];

const founders = [
  { name: "Dr. Solomon Mwangi", role: "Founder", image: solomonMwangi },
  { name: "Mr. Henry Rugendo", role: "Founder", image: henryRugendo },
  { name: "Rev Martin Mbandu", role: "Founder", image: martinMbandu },
];

const boardOfTrustees = [
  { name: "Mr. George Macgoye", role: "Chairman", image: georgeMacgoye },
  { name: "Mr. Charles Njoroge", role: "Secretary/CEO", image: charlesNjoroge },
  { name: "Mr. Patrick Kihara", role: "Treasurer", image: patrickKihara },
  { name: "Mr. Kennedy Getange", role: "Member", image: kennedyGetange },
];

const executiveBoard = [
  { name: "Dr. Caroline Oyugi", role: "Chairperson", image: carolineOyugi },
  { name: "Ms. Andrea Lihumi", role: "Member", image: andreaLihumi },
  { name: "Mr. Eric Mwenda", role: "Member", image: ericMwenda },
  { name: "Ms. Lucy Ndungu", role: "Member", image: lucyNdungu },
  { name: "Mr. Munene Waruhiu", role: "Member", image: muneneWaruhiu },
  { name: "Mr. Waruingi Gachago", role: "Member", image: waruingiGachago },
  { name: "Mr. Charles Njoroge", role: "Trust Secretary/CEO", image: charlesNjoroge },
];

function TeamCard({ name, role, image, delay = 0 }: { name: string; role: string; image?: string; delay?: number }) {
  const initials = name.replace(/^(Mr\.|Ms\.|Dr\.)\s*/, "").split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <ScrollReveal delay={delay}>
      <motion.div whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border/50 transition-all cursor-pointer group">
        {image ? (
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-transparent group-hover:ring-primary/20 transition-all">
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl font-heading font-bold text-primary">{initials}</span>
          </div>
        )}
        <h4 className="font-heading font-bold text-lg">{name}</h4>
        <p className="text-muted-foreground text-sm mt-1">{role}</p>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Team() {
  return (
    <Layout>
      <Helmet><title>Our Team — Edumed Trust</title></Helmet>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Our Team</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Meet the dedicated individuals leading Edumed Trust's mission to transform lives through education.</p>
        </div>
      </section>

      {/* Founders */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Roots</span>
              <h2 className="text-3xl font-heading font-bold mt-2">Founders</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-pretty">Edumed Trust was founded in 1996 in Nairobi, Kenya, by two visionary individuals committed to transforming lives through education.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto gap-6 mt-10">
            {founders.map((member, i) => (<TeamCard key={member.name} {...member} delay={i * 0.08} />))}
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Governance</span>
              <h2 className="text-3xl font-heading font-bold mt-2">Board of Trustees</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-pretty">Our trustees provide oversight, strategic direction, and accountability for all of Edumed Trust's activities.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {boardOfTrustees.map((member, i) => (<TeamCard key={member.name} {...member} delay={i * 0.08} />))}
          </div>
        </div>
      </section>

      {/* Executive Board */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Leadership</span>
              <h2 className="text-3xl font-heading font-bold mt-2">Executive Board</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-pretty">Our executive team drives day-to-day operations, program delivery, and stakeholder engagement.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {executiveBoard.map((member, i) => (<TeamCard key={member.name + member.role} {...member} delay={i * 0.06} />))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="section-padding-sm overflow-hidden bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <h3 className="text-center text-lg font-heading font-semibold text-muted-foreground mb-8">Our Trusted Partners</h3>
          </ScrollReveal>
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-left hover:[animation-play-state:paused]" style={{ width: "200%" }}>
              {[...partnerLogos, ...partnerLogos].map((partner, i) => (
                <div key={i} className="flex-shrink-0 px-8 py-4 flex items-center justify-center">
                  <img src={partner.src} alt={partner.alt} className="h-12 md:h-16 w-auto object-contain max-w-[140px] hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="section-padding">
        <div className="container-tight max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance">Join Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-8 text-pretty">We are always looking for passionate, skilled individuals who want to serve Kenya's next generation through mentorship, volunteering, or partnership.</p>
            <Link to="/partner" className="btn-primary text-base">Become a Partner</Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
