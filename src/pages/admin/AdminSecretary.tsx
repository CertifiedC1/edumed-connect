import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MessageCircle, Search, Download, CheckCircle, Trash2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface Pledge {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  pledge_type: string;
  amount: number;
  duration: number | null;
  reminder_method: string;
  start_date: string;
  next_reminder_date: string;
  status: string;
  created_at: string;
}

interface PartnerInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  partnership_type: string | null;
  message: string | null;
  created_at: string;
}

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

const pledgeDescMap: Record<string, string> = {
  monthly: "monthly support",
  "3year": "sponsoring a student for 3 years",
  "1year": "sponsoring a student for 1 year",
  partial: "partial student support",
  oneoff: "a one-off donation",
  endowment: "the Edumed Endowment Fund",
  volunteering: "volunteering / donation in kind",
};

function getReminderDays(nextDate: string) {
  const diff = Math.ceil((new Date(nextDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
}

function generateEmailContent(pledge: Pledge) {
  const desc = pledgeDescMap[pledge.pledge_type] || pledge.pledge_type;
  const subject = pledge.pledge_type === "monthly" ? "Friendly Reminder: Your Monthly Support to Edumed Trust"
    : pledge.pledge_type === "3year" ? "Reminder: Your Commitment to Sponsor a Student"
    : pledge.pledge_type === "1year" ? "Reminder: Your Student Sponsorship Contribution"
    : "Reminder: Your Support to Edumed Trust";
  const body = `Dear ${pledge.name},\n\nWe hope you are doing well.\n\nThis is a kind reminder of your generous pledge to support Edumed Trust. Your commitment of KSH ${Number(pledge.amount).toLocaleString()} towards ${desc} is making a meaningful difference in supporting education.\n\nWe truly appreciate your support and dedication. Kindly take a moment to fulfill your pledge at your convenience.\n\nIf you have already made the contribution, please disregard this message.\n\nThank you once again for being part of this impactful journey.\n\nWarm regards,\nEdumed Trust`;
  return { subject, body };
}

function generateSMS(pledge: Pledge) {
  const desc = pledgeDescMap[pledge.pledge_type] || pledge.pledge_type;
  return `Hi ${pledge.name}, this is a reminder of your pledge of KSH ${Number(pledge.amount).toLocaleString()} to Edumed Trust for ${desc}. Thank you for your support.`;
}

function generateWhatsApp(pledge: Pledge) {
  const desc = pledgeDescMap[pledge.pledge_type] || pledge.pledge_type;
  return `Hello ${pledge.name} 👋,\n\nThis is a gentle reminder of your pledge of KSH ${Number(pledge.amount).toLocaleString()} towards ${desc} with Edumed Trust.\n\nYour support helps change lives through education 🙏\n\nThank you for being part of this mission.\n\nEdumed Trust`;
}

export default function AdminSecretary() {
  const { loading: authLoading } = useAdminAuth(["admin", "secretary"]);
  const [tab, setTab] = useState<"pledges" | "partners" | "contacts">("pledges");
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [partners, setPartners] = useState<PartnerInquiry[]>([]);
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [pledgeTypeFilter, setPledgeTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<{
    entityType: "pledge" | "partner" | "contact";
    id: string;
    summary: string;
    snapshot: Record<string, unknown>;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading) fetchAll();
  }, [authLoading]);

  const fetchAll = async () => {
    const [p, pa, c] = await Promise.all([
      supabase.from("pledges").select("*").order("created_at", { ascending: false }),
      supabase.from("partners").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    if (p.data) setPledges(p.data);
    if (pa.data) setPartners(pa.data);
    if (c.data) setContacts(c.data);
    setLoading(false);
  };

  const markComplete = async (id: string) => {
    await supabase.from("pledges").update({ status: "completed" }).eq("id", id);
    fetchAll();
  };

  const performDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    const { entityType, id, snapshot } = confirmDelete;
    const table = entityType === "pledge" ? "pledges" : entityType === "partner" ? "partners" : "contact_messages";
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) {
      // Audit log entry
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("audit_logs").insert({
        actor_id: user?.id ?? null,
        actor_email: user?.email ?? null,
        action: "delete",
        entity_type: entityType,
        entity_id: id,
        snapshot: snapshot as never,
      });
    }
    setDeleting(false);
    setConfirmDelete(null);
    fetchAll();
  };

  const filteredPledges = pledges.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || (p.phone || "").toLowerCase().includes(q);
    const matchType = pledgeTypeFilter === "all" || p.pledge_type === pledgeTypeFilter;
    const created = new Date(p.created_at).getTime();
    const matchFrom = !dateFrom || created >= new Date(dateFrom).getTime();
    const matchTo = !dateTo || created <= new Date(dateTo).getTime() + 86_399_999;
    let matchStatus = true;
    if (filter === "due") matchStatus = !!p.next_reminder_date && getReminderDays(p.next_reminder_date) <= 0 && p.status === "active";
    else if (filter === "overdue") matchStatus = !!p.next_reminder_date && getReminderDays(p.next_reminder_date) < 0 && p.status === "active";
    else if (filter === "completed") matchStatus = p.status === "completed";
    else if (filter === "all") matchStatus = p.status === "active";
    return matchSearch && matchType && matchFrom && matchTo && matchStatus;
  });

  const exportCSV = () => {
    const headers = "Name,Email,Phone,Pledge Type,Amount,Status,Next Reminder\n";
    const rows = pledges.map((p) => `"${p.name}","${p.email}","${p.phone}","${p.pledge_type}",${p.amount},"${p.status}","${p.next_reminder_date}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "pledges.csv"; a.click();
  };

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admins/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-xl font-heading font-bold">Secretary Dashboard</h1>
          </div>
        </div>
      </header>
      <div className="container-tight px-4 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["pledges", "partners", "contacts"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t ? "bg-primary text-white" : "bg-card hover:bg-muted"}`}>
              {t === "pledges" ? `Pledges (${pledges.filter(p => p.status === "active").length})` : t === "partners" ? `Partners (${partners.length})` : `Messages (${contacts.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div>
        ) : tab === "pledges" ? (
          <div>
            <div className="bg-card rounded-2xl p-4 border border-border/50 mb-6 space-y-3">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input placeholder="Search by name, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm" />
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm">
                  <option value="all">All Active</option>
                  <option value="due">Due Today</option>
                  <option value="overdue">Overdue</option>
                  <option value="completed">Completed</option>
                </select>
                <select value={pledgeTypeFilter} onChange={(e) => setPledgeTypeFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm">
                  <option value="all">All Types</option>
                  <option value="monthly">Monthly</option>
                  <option value="3year">3-year sponsorship</option>
                  <option value="1year">1-year sponsorship</option>
                  <option value="partial">Partial</option>
                  <option value="oneoff">One-off</option>
                  <option value="endowment">Endowment</option>
                  <option value="volunteering">Volunteering</option>
                </select>
                <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-sm hover:bg-muted transition-colors">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <label className="text-xs text-muted-foreground">From</label>
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 rounded-xl border border-border bg-background text-sm" />
                <label className="text-xs text-muted-foreground">To</label>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 rounded-xl border border-border bg-background text-sm" />
                {(search || pledgeTypeFilter !== "all" || dateFrom || dateTo || filter !== "all") && (
                  <button onClick={() => { setSearch(""); setPledgeTypeFilter("all"); setDateFrom(""); setDateTo(""); setFilter("all"); }} className="text-xs text-primary hover:underline">Clear filters</button>
                )}
                <span className="text-xs text-muted-foreground ml-auto">{filteredPledges.length} result{filteredPledges.length === 1 ? "" : "s"}</span>
              </div>
            </div>
            {filteredPledges.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
                <p className="text-muted-foreground">No pledges found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPledges.map((pledge) => {
                  const hasReminder = !!pledge.next_reminder_date;
                  const days = hasReminder ? getReminderDays(pledge.next_reminder_date) : 0;
                  const color = days > 10 ? "text-green-600 bg-green-50" : days >= 5 ? "text-yellow-600 bg-yellow-50" : "text-red-600 bg-red-50";
                  const { subject, body } = generateEmailContent(pledge);
                  const smsMsg = generateSMS(pledge);
                  const waMsg = generateWhatsApp(pledge);
                  const phone = pledge.phone.startsWith("+") ? pledge.phone.replace(/\D/g, "") : pledge.phone.replace(/^0/, "254");

                  return (
                    <div key={pledge.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-heading font-bold text-lg">{pledge.name}</h4>
                          <p className="text-sm text-muted-foreground">{pledge.email} · {pledge.phone} · {pledge.city || "N/A"}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {pledgeDescMap[pledge.pledge_type] || pledge.pledge_type} · <strong className="text-foreground">KSH {Number(pledge.amount).toLocaleString()}</strong>
                          </p>
                          <p className="text-sm mt-1">
                            <span className="text-muted-foreground">Preferred reminder: </span>
                            <span className="font-bold text-red-600 uppercase">
                              {pledge.reminder_method === "whatsapp" ? "WhatsApp" : pledge.reminder_method}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pledge.status === "completed" ? "text-green-700 bg-green-50" : color}`}>
                            {pledge.status === "completed" ? "Completed" : !hasReminder ? "No reminder" : days > 0 ? `${days} days left` : days === 0 ? "Due today" : `${Math.abs(days)} days overdue`}
                          </span>
                          {pledge.status === "active" && (
                            <button onClick={() => markComplete(pledge.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Mark complete">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                          <button onClick={() => setConfirmDelete({ entityType: "pledge", id: pledge.id, summary: `${pledge.name} — ${pledgeDescMap[pledge.pledge_type] || pledge.pledge_type} (KSH ${Number(pledge.amount).toLocaleString()})`, snapshot: pledge as unknown as Record<string, unknown> })} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete pledge">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      {pledge.status === "active" && (
                        <div className="flex flex-wrap gap-2">
                          {(pledge.reminder_method === "email" || true) && (
                            <a href={`mailto:${pledge.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
                              <Mail className="w-3.5 h-3.5" /> Send Email
                            </a>
                          )}
                          {(pledge.reminder_method === "sms" || true) && (
                            <a href={`sms:${phone}?body=${encodeURIComponent(smsMsg)}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors">
                              <Phone className="w-3.5 h-3.5" /> Send SMS
                            </a>
                          )}
                          {(pledge.reminder_method === "whatsapp" || true) && (
                            <button
                              type="button"
                              onClick={() => window.open(`https://wa.me/${phone}?text=${encodeURIComponent(waMsg)}`, "_blank", "noopener,noreferrer")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : tab === "partners" ? (
          <div className="space-y-4">
            {partners.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 text-center border border-border/50"><p className="text-muted-foreground">No partner inquiries yet.</p></div>
            ) : partners.map((p) => (
              <div key={p.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-heading font-bold">{p.name}</h4>
                    <p className="text-sm text-muted-foreground">{p.email} · {p.organization || "Individual"} · {p.partnership_type || "Not specified"}</p>
                    {p.message && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.message}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={`mailto:${p.email}?subject=Re: Your Partner Inquiry with Edumed Trust&body=Dear ${p.name},\n\nThank you for your interest in partnering with Edumed Trust.\n\n`} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                      Reply
                    </a>
                    <button onClick={() => setConfirmDelete({ entityType: "partner", id: p.id, summary: `${p.name} — ${p.organization || "partner inquiry"}`, snapshot: p as unknown as Record<string, unknown> })} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete inquiry">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 text-center border border-border/50"><p className="text-muted-foreground">No contact messages yet.</p></div>
            ) : contacts.map((c) => (
              <div key={c.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-heading font-bold">{c.name}</h4>
                    <p className="text-sm text-muted-foreground">{c.email} · {c.subject || "No subject"} · {new Date(c.created_at).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground mt-2">{c.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={`mailto:${c.email}?subject=Re: ${c.subject || "Your inquiry"} - Edumed Trust&body=Dear ${c.name},\n\nThank you for reaching out to Edumed Trust.\n\n`} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                      Reply
                    </a>
                    <button onClick={() => setConfirmDelete({ entityType: "contact", id: c.id, summary: `${c.name} — ${c.subject || "contact message"}`, snapshot: c as unknown as Record<string, unknown> })} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete message">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation modal with audit summary */}
      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" /> Confirm permanent deletion
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. A record of this deletion will be saved to the audit log.
            </DialogDescription>
          </DialogHeader>
          {confirmDelete && (
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-section-alt p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Deletion summary</p>
                <p><span className="text-muted-foreground">Type:</span> <strong className="capitalize">{confirmDelete.entityType}</strong></p>
                <p><span className="text-muted-foreground">Record:</span> <strong>{confirmDelete.summary}</strong></p>
                <p><span className="text-muted-foreground">Time:</span> <strong>{new Date().toLocaleString()}</strong></p>
              </div>
            </div>
          )}
          <DialogFooter>
            <button onClick={() => setConfirmDelete(null)} disabled={deleting} className="px-4 py-2 rounded-xl bg-muted text-sm font-medium hover:bg-muted/70 transition-colors">Cancel</button>
            <button onClick={performDelete} disabled={deleting} className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60">
              {deleting ? "Deleting..." : "Yes, delete permanently"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
