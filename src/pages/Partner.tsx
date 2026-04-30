import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const partnershipTypes = ["Individual Sponsorship", "Mentorship", "Corporate Sponsorship"];

function buildPartnerEmailHTML(name: string, email: string, organization: string, phone: string, type: string, message: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#80011f;padding:20px 24px;border-radius:12px 12px 0 0">
      <h1 style="color:#fff;margin:0;font-size:20px">New Partner Inquiry - Edumed Trust</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;width:140px;background:#f9f9f9">Full Name</td><td style="padding:12px;border:1px solid #e5e5e5">${name}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Email Address</td><td style="padding:12px;border:1px solid #e5e5e5"><a href="mailto:${email}" style="color:#80011f">${email}</a></td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Organization</td><td style="padding:12px;border:1px solid #e5e5e5">${organization || "Individual"}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Phone</td><td style="padding:12px;border:1px solid #e5e5e5">${phone || "N/A"}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Partnership Type</td><td style="padding:12px;border:1px solid #e5e5e5">${type || "Not specified"}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Message</td><td style="padding:12px;border:1px solid #e5e5e5">${message || "N/A"}</td></tr>
      </table>
      <p style="margin-top:20px;font-size:13px;color:#888">This inquiry was sent from the Edumed Trust website partner form.</p>
    </div>
  </div>`;
}

export default function Partner() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", organization: "", email: "", phone: "", type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    toast({ title: "Submitting your inquiry..." });
    try {
      await supabase.from("partners").insert({
        name: form.name, organization: form.organization || null, email: form.email,
        phone: form.phone || null, partnership_type: form.type || null, message: form.message || null,
      });

      await supabase.functions.invoke("send-email", {
        body: {
          subject: `New Partner Inquiry - Edumed Trust`,
          content: buildPartnerEmailHTML(form.name, form.email, form.organization, form.phone, form.type, form.message),
          recipient: "ndungueliud2020@gmail.com",
          from_name: "Edumed Trust Website",
          reply_to: form.email,
          reply_name: form.name,
          is_html: true,
        },
      });

      toast({ title: "Thank you!", description: "Your inquiry has been submitted." });
      setForm({ name: "", organization: "", email: "", phone: "", type: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet><title>Become a Partner — Edumed Trust</title></Helmet>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Become a Partner</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Join us in transforming lives through education, mentorship, and community empowerment.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-tight max-w-2xl">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 space-y-5">
              <div><label className="block text-sm font-medium mb-1.5">Your Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Organization</label><input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Email *</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Partnership Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                  <option value="">Select type</option>
                  {partnershipTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1.5">Message</label><textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" /></div>
              <button type="submit" disabled={submitting} className="w-full btn-primary text-base">{submitting ? "Submitting..." : "Submit Inquiry"}</button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
