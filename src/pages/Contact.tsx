import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MapPin, Mail, Clock, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const subjects = ["General Inquiry", "Partnership", "Scholarship", "Donation", "Programs", "Other"];

function buildEmailHTML(name: string, email: string, subject: string, message: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#80011f;padding:20px 24px;border-radius:12px 12px 0 0">
      <h1 style="color:#fff;margin:0;font-size:20px">New Contact Form Submission - Edumed Trust</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;width:140px;background:#f9f9f9">Full Name</td><td style="padding:12px;border:1px solid #e5e5e5">${name}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Email Address</td><td style="padding:12px;border:1px solid #e5e5e5"><a href="mailto:${email}" style="color:#80011f">${email}</a></td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Subject</td><td style="padding:12px;border:1px solid #e5e5e5">${subject || "General Inquiry"}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Message</td><td style="padding:12px;border:1px solid #e5e5e5">${message}</td></tr>
      </table>
      <p style="margin-top:20px;font-size:13px;color:#888">This message was sent from the Edumed Trust website contact form.</p>
    </div>
  </div>`;
}

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    toast({ title: "Sending message..." });
    
    try {
      await supabase.from("contact_messages").insert({
        name: form.name, email: form.email, subject: form.subject, message: form.message,
      });

      await supabase.functions.invoke("send-email", {
        body: {
          subject: `New Contact Form Submission - Edumed Trust`,
          content: buildEmailHTML(form.name, form.email, form.subject, form.message),
          recipient: "ndungueliud2020@gmail.com",
          from_name: "Edumed Trust Website",
          reply_to: form.email,
          reply_name: form.name,
          is_html: true,
        },
      });

      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us — Edumed Trust</title>
        <meta name="description" content="Get in touch with Edumed Trust. Visit our office at KickStart International, Ngong Road, Nairobi." />
      </Helmet>

      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Contact Us</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Whether you have a question, want to partner with us, or need information about our programs — we're here for you.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: MapPin, title: "Office Address", lines: ["KickStart International", "Ngong Road, next to Forest View Mall", "Nairobi, Kenya"] },
              { icon: Mail, title: "Email & Phone", lines: ["info@edumedtrust.org", "+254 710 551119", "+254 788 551119"] },
              { icon: Clock, title: "Office Hours", lines: ["Monday – Friday: 8:00am – 5:00pm", "Closed on Weekends & Public Holidays"] },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading font-bold mb-2">{item.title}</h4>
                  {item.lines.map((line) => (<p key={line} className="text-muted-foreground text-sm">{line}</p>))}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ScrollReveal>
                <h2 className="text-2xl font-heading font-bold mb-6">Find Our Office</h2>
                <div className="rounded-2xl overflow-hidden shadow-sm mb-4">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8177!2d36.7735!3d-1.2934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11cf51a14b3d%3A0x4bdf9ae1b3f7e5de!2sEdumed%20Trust!5e0!3m2!1sen!2ske!4v1710000000000" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Edumed Trust Location" />
                </div>
                <a href="https://maps.app.goo.gl/dstcVG7ZpKKvepyf6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold text-sm border border-primary/30 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">
                  Open in Google Maps ↗
                </a>
                <div className="flex items-start gap-2 mt-4 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>Postal Address: P.O. Box 1025, 00502 Karen, Nairobi</span>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Name</label>
                    <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email Address</label>
                    <input required type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Subject</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                    <option value="">Select a subject</option>
                    {subjects.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Your Message</label>
                  <textarea required rows={5} placeholder="Write your message here..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" />
                </div>
                <button type="submit" disabled={sending} className="w-full btn-primary text-base flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
