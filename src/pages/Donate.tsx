import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Copy, Check, Phone, Building2, FileText, Heart, PartyPopper } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const donationAmounts = [
  { amount: 1000, hint: "💡 Covers one month of school supplies for a student" },
  { amount: 3000, hint: "💡 Covers exam fees for one term" },
  { amount: 6000, hint: "💡 Pays half a term's tuition" },
  { amount: 10000, hint: "💡 Fully sponsors one term of secondary school" },
];

const pledgeOptions = [
  { value: "monthly", label: "Monthly support", hasCustom: true },
  { value: "3year", label: "Sponsor 1 student (KSH 60,000/year for 3 years)" },
  { value: "1year", label: "Sponsor 1 student (KSH 60,000/year for 1 year)" },
  { value: "partial", label: "Partial support (KSH 30,000/year)" },
  { value: "oneoff", label: "One-off donation (custom amount)", hasCustom: true },
  { value: "endowment", label: "Giving towards Edumed Endowment Fund", hasCustom: true },
  { value: "volunteering", label: "Volunteering/Donation in kind" },
];

const pledgeAmountMap: Record<string, number> = {
  "3year": 60000,
  "1year": 60000,
  "partial": 30000,
};

function buildPledgeEmailHTML(name: string, email: string, phone: string, city: string, pledgeType: string, amount: number, reminder: string, volunteerNote: string) {
  const typeLabel = pledgeOptions.find(o => o.value === pledgeType)?.label || pledgeType;
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#80011f;padding:20px 24px;border-radius:12px 12px 0 0">
      <h1 style="color:#fff;margin:0;font-size:20px">New Donation Pledge - Edumed Trust</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;width:140px;background:#f9f9f9">Full Name</td><td style="padding:12px;border:1px solid #e5e5e5">${name}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Email</td><td style="padding:12px;border:1px solid #e5e5e5"><a href="mailto:${email}" style="color:#80011f">${email}</a></td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Phone</td><td style="padding:12px;border:1px solid #e5e5e5">${phone}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">City</td><td style="padding:12px;border:1px solid #e5e5e5">${city || "N/A"}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Pledge Type</td><td style="padding:12px;border:1px solid #e5e5e5">${typeLabel}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Amount</td><td style="padding:12px;border:1px solid #e5e5e5">KSH ${Number(amount).toLocaleString()}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Reminder</td><td style="padding:12px;border:1px solid #e5e5e5">${reminder}</td></tr>
        ${volunteerNote ? `<tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e5e5;background:#f9f9f9">Volunteer Note</td><td style="padding:12px;border:1px solid #e5e5e5">${volunteerNote}</td></tr>` : ""}
      </table>
      <p style="margin-top:20px;font-size:13px;color:#888">This pledge was submitted from the Edumed Trust website.</p>
    </div>
  </div>`;
}

export default function Donate() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [pledgeName, setPledgeName] = useState("");
  const [pledgeEmail, setPledgeEmail] = useState("");
  const [pledgePhone, setPledgePhone] = useState("");
  const [pledgeCity, setPledgeCity] = useState("");
  const [pledgeType, setPledgeType] = useState("");
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [pledgeDuration, setPledgeDuration] = useState("");
  const [pledgeReminder, setPledgeReminder] = useState("email");
  const [volunteerNote, setVolunteerNote] = useState("");
  const [pledgeSubmitting, setPledgeSubmitting] = useState(false);

  const copyPaybill = () => { navigator.clipboard.writeText("531200"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const handlePledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName || !pledgeEmail || !pledgePhone || !pledgeType) return;
    setPledgeSubmitting(true);
    const finalAmount = pledgeAmountMap[pledgeType] || parseFloat(pledgeAmount) || 0;
    const duration = pledgeType === "3year" ? 36 : pledgeType === "1year" ? 12 : parseInt(pledgeDuration) || 12;

    // Compute next reminder date based on pledge type.
    // Uses UTC anchoring + safe month arithmetic so 29/30/31 of month roll
    // correctly (e.g., Jan 31 + 1 month -> Feb 28/29) and timezone offsets
    // do not shift the saved date by a day.
    const addMonthsSafe = (d: Date, months: number): Date => {
      const result = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12, 0, 0));
      const targetMonth = result.getUTCMonth() + months;
      const targetYear = result.getUTCFullYear() + Math.floor(targetMonth / 12);
      const normalizedMonth = ((targetMonth % 12) + 12) % 12;
      const lastDayOfTarget = new Date(Date.UTC(targetYear, normalizedMonth + 1, 0)).getUTCDate();
      const day = Math.min(d.getUTCDate(), lastDayOfTarget);
      return new Date(Date.UTC(targetYear, normalizedMonth, day, 12, 0, 0));
    };
    const now = new Date();
    let nextReminder: Date | null = null;
    let initialStatus: "active" | "completed" = "active";
    switch (pledgeType) {
      case "monthly":
        nextReminder = addMonthsSafe(now, 1);
        break;
      case "3year":
      case "1year":
      case "partial":
        nextReminder = addMonthsSafe(now, 12);
        break;
      case "oneoff":
      case "endowment":
      case "volunteering":
        nextReminder = null;
        initialStatus = "completed";
        break;
      default:
        nextReminder = addMonthsSafe(now, 1);
    }

    await supabase.from("pledges").insert({
      name: pledgeName, email: pledgeEmail, phone: pledgePhone, city: pledgeCity || null,
      pledge_type: pledgeType, amount: finalAmount, duration,
      reminder_method: pledgeReminder, status: initialStatus,
      ...(nextReminder ? { next_reminder_date: nextReminder.toISOString() } : {}),
    });

    // Send email notification
    await supabase.functions.invoke("send-email", {
      body: {
        subject: `New Donation Pledge - Edumed Trust`,
        content: buildPledgeEmailHTML(pledgeName, pledgeEmail, pledgePhone, pledgeCity, pledgeType, finalAmount, pledgeReminder, volunteerNote),
        recipient: "ndungueliud2020@gmail.com",
        from_name: "Edumed Trust Website",
        reply_to: pledgeEmail,
        reply_name: pledgeName,
        is_html: true,
      },
    });

    setShowSuccess(true);
    setPledgeName(""); setPledgeEmail(""); setPledgePhone(""); setPledgeCity("");
    setPledgeType(""); setPledgeAmount(""); setPledgeDuration(""); setPledgeReminder("email");
    setVolunteerNote("");
    setPledgeSubmitting(false);
    setTimeout(() => setShowSuccess(false), 10000);
  };

  const needsCustomAmount = ["monthly", "oneoff", "endowment"].includes(pledgeType);

  // Compute live preview of plan breakdown
  const planPreview = (() => {
    if (!pledgeType) return null;
    const baseAmount = pledgeAmountMap[pledgeType] || parseFloat(pledgeAmount) || 0;
    const now = new Date();
    const next = new Date(now);
    let years = 0;
    let cadence = "";
    let total = baseAmount;
    switch (pledgeType) {
      case "monthly":
        next.setMonth(next.getMonth() + 1);
        cadence = "Every month";
        break;
      case "3year":
        years = 3; total = baseAmount * 3;
        next.setFullYear(next.getFullYear() + 1);
        cadence = "Yearly · 3 years";
        break;
      case "1year":
        years = 1;
        next.setFullYear(next.getFullYear() + 1);
        cadence = "Yearly · 1 year";
        break;
      case "partial":
        years = 1;
        next.setFullYear(next.getFullYear() + 1);
        cadence = "Yearly · partial support";
        break;
      case "oneoff":
      case "endowment":
      case "volunteering":
        return { total, cadence: "One-off contribution", nextLabel: "No reminder", years };
      default:
        return null;
    }
    return {
      total,
      cadence,
      nextLabel: next.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "long", day: "numeric" }),
      years,
    };
  })();

  return (
    <Layout>
      <Helmet><title>Donate — Edumed Trust</title><meta name="description" content="Make a donation to Edumed Trust and help transform lives through education." /></Helmet>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Make a Donation</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Your generous contribution transforms lives. Every amount makes a difference.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pledge Form */}
            <ScrollReveal>
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 z-10 flex items-center justify-center bg-card/95 rounded-2xl">
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4">🎉🎊🥳</div>
                        <h3 className="text-2xl font-heading font-bold text-primary mb-2">Pledge Successful!</h3>
                        <p className="text-muted-foreground mb-4">Thank you for your generous support! 🙏</p>
                        <p className="text-sm text-muted-foreground mb-6">If you'd like to make your donation now, you can use:</p>
                        <div className="space-y-2 text-sm text-left max-w-sm mx-auto">
                          <p><strong>M-Pesa Paybill:</strong> 531200 (Account: Your Name)</p>
                          <p><strong>Bank Transfer:</strong> Standard Chartered, A/C: 0102818302200</p>
                        </div>
                        <p className="text-primary font-semibold mt-4">Thank you for your support! ❤️</p>
                        <button onClick={() => setShowSuccess(false)} className="mt-4 text-sm text-muted-foreground underline">Close</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="text-center mb-6">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">Commit to Change</span>
                  <h2 className="text-2xl font-heading font-bold mt-2">I Pledge to Support Edumed Trust</h2>
                  <p className="text-muted-foreground text-sm mt-2">Pledge your support and we'll send you gentle reminders.</p>
                </div>
                <form onSubmit={handlePledge} className="space-y-4 relative">
                  <input placeholder="Full Name *" value={pledgeName} onChange={(e) => setPledgeName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  <input type="email" placeholder="Email Address *" value={pledgeEmail} onChange={(e) => setPledgeEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  <input type="tel" placeholder="Phone Number (e.g. 254712345678) *" value={pledgePhone} onChange={(e) => setPledgePhone(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  <input placeholder="City/Town" value={pledgeCity} onChange={(e) => setPledgeCity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  <select value={pledgeType} onChange={(e) => setPledgeType(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                    <option value="">Select pledge type *</option>
                    {pledgeOptions.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                  </select>
                  {needsCustomAmount && (
                    <input type="number" placeholder="Indicate amount here (KES) *" value={pledgeAmount} onChange={(e) => setPledgeAmount(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  )}
                  {needsCustomAmount && pledgeType !== "oneoff" && (
                    <input type="number" placeholder="Duration (months)" value={pledgeDuration} onChange={(e) => setPledgeDuration(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  )}
                  {planPreview && (
                    <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 text-sm space-y-1.5">
                      <p className="font-semibold text-primary uppercase text-xs tracking-wider mb-2">Plan Summary</p>
                      <div className="flex justify-between"><span className="text-muted-foreground">Cadence</span><span className="font-medium">{planPreview.cadence}</span></div>
                      {planPreview.years > 0 && (
                        <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{planPreview.years} year{planPreview.years > 1 ? "s" : ""}</span></div>
                      )}
                      <div className="flex justify-between"><span className="text-muted-foreground">Total commitment</span><span className="font-bold text-foreground">KSH {Number(planPreview.total).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Next reminder</span><span className="font-medium">{planPreview.nextLabel}</span></div>
                    </div>
                  )}
                  {pledgeType === "volunteering" && (
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Please indicate the volunteering services/donation in kind you would like to give:</label>
                      <textarea rows={3} placeholder="Describe how you'd like to volunteer or what you'd like to donate..." value={volunteerNote} onChange={(e) => setVolunteerNote(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-2">Reminder Preference</label>
                    <div className="flex gap-4">
                      {["email", "sms", "whatsapp"].map((m) => (
                        <label key={m} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="reminder" value={m} checked={pledgeReminder === m} onChange={() => setPledgeReminder(m)} className="accent-primary" />
                          <span className="text-sm capitalize">{m === "whatsapp" ? "WhatsApp" : m.charAt(0).toUpperCase() + m.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* How to contribute */}
                  <div className="bg-section-alt rounded-xl p-4 text-sm space-y-2">
                    <p className="font-semibold text-foreground">How would you like to make your contribution?</p>
                    <p>• Cheques payable to <strong>Edumed Trust</strong></p>
                    <p>• Mpesa Paybill No. <strong>531200</strong> A/c No. (Your Name)</p>
                    <p>• Bank: <strong>Standard Chartered</strong>, Karen Branch, A/c: <strong>0102818302200</strong>, Swift: <strong>SCBLKENX</strong></p>
                  </div>

                  <button type="submit" disabled={pledgeSubmitting} className="w-full btn-primary text-base">{pledgeSubmitting ? "Submitting..." : "Submit Pledge"}</button>
                </form>
              </div>
            </ScrollReveal>

            {/* Payment Methods */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4"><Phone className="w-6 h-6 text-primary" /><h3 className="text-xl font-heading font-bold">M-Pesa</h3></div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-muted-foreground">Paybill Number</span>
                    <span className="text-2xl font-bold font-heading">531200</span>
                    <button onClick={copyPaybill} className="p-2 rounded-lg hover:bg-muted transition-colors">
                      {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                    </button>
                  </div>
                  <div className="bg-section-alt rounded-xl p-4 text-sm text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">How to pay:</p>
                    <p>1. Go to M-Pesa → Lipa na M-Pesa → Pay Bill</p>
                    <p>2. Enter Paybill: 531200</p>
                    <p>3. Account: Your Name</p>
                    <p>4. Enter amount and complete payment</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4"><Building2 className="w-6 h-6 text-primary" /><h3 className="text-xl font-heading font-bold">Bank Transfer</h3></div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span className="font-medium">Standard Chartered Bank</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Branch</span><span className="font-medium">Karen Branch</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Account Name</span><span className="font-medium">Edumed Trust</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Account No.</span><span className="font-medium">0102818302200</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Swift Code</span><span className="font-medium">SCBLKENX</span></div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4"><FileText className="w-6 h-6 text-primary" /><h3 className="text-xl font-heading font-bold">Cheque</h3></div>
                  <p className="text-muted-foreground text-sm mb-3">Write cheques payable to Edumed Trust and mail to:</p>
                  <p className="text-sm font-medium">P.O. Box 1025, 00502 Karen, Nairobi</p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Impact section */}
          <ScrollReveal>
            <div className="mt-16 bg-section-alt rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-8"><Heart className="w-6 h-6 text-primary inline-block mr-2" />Your Donation Makes a Real Difference</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {donationAmounts.map((d) => (
                  <div key={d.amount} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="text-3xl font-heading font-bold text-primary mb-2">KSH {d.amount.toLocaleString()}</div>
                    <p className="text-muted-foreground text-sm">{d.hint.replace("💡 ", "")}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-6">It costs approximately <strong className="text-foreground">KSH 60,000</strong> to educate 1 student for one year in secondary school.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
