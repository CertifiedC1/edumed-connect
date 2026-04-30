import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Download, FileText, Upload, Users, Award } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";

const steps = [
  { num: "01", icon: Download, title: "Fill Application", desc: "Download the form and fill application with student and parents details." },
  { num: "02", icon: Upload, title: "Upload Documents", desc: "Attach KCPE / CBE / KJSEA result slip and secondary school admission letter." },
  { num: "03", icon: FileText, title: "Review", desc: "Take it to relevant authorities for recommendations e.g. Chief, Principal, Head of Religion." },
  { num: "04", icon: Users, title: "Submit", desc: "Give back the filled Form." },
  { num: "05", icon: Award, title: "Interview & Award", desc: "Shortlisted students are called for a brief interview. Successful students receive scholarship letters and tuition is paid directly to school." },
];

export default function Scholarship() {
  return (
    <Layout>
      <Helmet><title>Scholarship Program — Edumed Trust</title></Helmet>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Scholarship Program</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Empowering bright students from financially disadvantaged families across Kenya.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-tight max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold text-center mb-8">Eligibility Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: "KCPE Score (Boys)", value: "Minimum 375" },
                { label: "KCPE Score (Girls)", value: "Minimum 350" },
                { label: "CBE / KJSEA", value: "Minimum 50 points" },
                { label: "School Type", value: "Public Secondary School" },
                { label: "Coverage", value: "Tuition fees only" },
              ].map((req) => (
                <div key={req.label} className="bg-section-alt rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground">{req.label}</div>
                  <div className="text-lg font-semibold mt-1">{req.value}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="section-padding bg-section-alt">
        <div className="container-tight max-w-4xl">
          <ScrollReveal><h2 className="text-3xl font-heading font-bold text-center mb-12">Application Process</h2></ScrollReveal>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="flex items-start gap-6 bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-primary font-bold text-sm">{step.num}</span>
                      <h4 className="font-heading font-bold text-lg">{step.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-pretty">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-tight max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold mb-4">Apply for Scholarship</h2>
            <p className="text-muted-foreground text-lg mb-2">
              Download the 8-4-4 SYSTEM form by{" "}
              <a href="/EDUMED_TRUST_APPLICATION_FORM_8-4-4.pdf" download="EDUMED_TRUST_APPLICATION_FORM_8-4-4.pdf" className="text-primary font-semibold hover:underline">clicking here!</a>
            </p>
            <p className="text-muted-foreground text-lg mb-2">
              Download the CBE SYSTEM form by{" "}
              <a href="/EDUMED_TRUST_APPLICATION_FORM_CBE.pdf" download="EDUMED_TRUST_APPLICATION_FORM_CBE.pdf" className="text-primary font-semibold hover:underline">clicking here!</a>
            </p>
            <p className="text-sm text-muted-foreground">Fill the form, gather the required documents, and submit as outlined in the process above.</p>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
