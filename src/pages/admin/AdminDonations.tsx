import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface Donation {
  id: string;
  donor_name: string;
  email: string | null;
  amount: number;
  currency: string;
  purpose: string | null;
  method: string;
  created_at: string;
}

const purposes = ["General Fund", "Scholarship Program", "Mentorship", "Livelihood", "Endowment"];

export default function AdminDonations() {
  const { loading: authLoading } = useAdminAuth(["admin"]);
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [form, setForm] = useState({ name: "", email: "", amount: "", purpose: "", method: "Manual Entry" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) fetchDonations();
  }, [authLoading]);

  const fetchDonations = async () => {
    const { data } = await supabase.from("donations").select("*").order("created_at", { ascending: false });
    if (data) setDonations(data);
    setLoading(false);
  };

  const addDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.amount) return;
    const { error } = await supabase.from("donations").insert({
      donor_name: form.name,
      email: form.email || null,
      amount: parseFloat(form.amount),
      currency: "KES",
      purpose: form.purpose || null,
      method: form.method,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Donation recorded!" });
      setForm({ name: "", email: "", amount: "", purpose: "", method: "Manual Entry" });
      fetchDonations();
    }
  };

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center gap-4">
          <Link to="/admins/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-heading font-bold">Manage Donations</h1>
        </div>
      </header>
      <div className="container-tight px-4 lg:px-8 py-8 max-w-4xl">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 mb-8">
          <h2 className="text-xl font-heading font-bold mb-1">Record New Donation</h2>
          <p className="text-muted-foreground text-sm mb-6">Add donations manually or process payments through Paystack integration.</p>
          <form onSubmit={addDonation} className="space-y-4">
            <input placeholder="Enter donor's full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <input type="email" placeholder="donor@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <input type="number" placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <div className="flex gap-3">
              <button type="button" onClick={() => setForm({ ...form, method: "Manual Entry" })} className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${form.method === "Manual Entry" ? "bg-primary text-white" : "bg-section-alt"}`}>
                Manual Entry
              </button>
              <button type="button" onClick={() => setForm({ ...form, method: "Paystack" })} className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${form.method === "Paystack" ? "bg-primary text-white" : "bg-section-alt"}`}>
                Paystack Integration
              </button>
            </div>
            <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
              <option value="">e.g., General Fund, Scholarship Program, etc.</option>
              {purposes.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <button type="submit" className="w-full btn-primary">Record Manual Donation</button>
          </form>
        </div>

        <h3 className="text-lg font-semibold mb-2">Donation Records</h3>
        <p className="text-muted-foreground text-sm mb-4">Track all donation transactions and their status</p>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : donations.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
            <DollarSign className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">No donations yet</p>
            <p className="text-sm text-muted-foreground mt-1">Record your first donation using the form above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {donations.map((d) => (
              <div key={d.id} className="bg-card rounded-xl p-4 shadow-sm border border-border/50 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{d.donor_name}</h4>
                  <p className="text-sm text-muted-foreground">{d.purpose || "General"} · {d.method} · {new Date(d.created_at).toLocaleDateString()}</p>
                </div>
                <span className="text-lg font-heading font-bold text-primary">KES {Number(d.amount).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
