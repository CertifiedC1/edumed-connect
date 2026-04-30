import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, Users, BookOpen, Image, LayoutDashboard, LogOut, FileText, BarChart3, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminDashboard() {
  const { loading, role, logout } = useAdminAuth();
  const [stats, setStats] = useState({ articles: 0, alumni: 0, donations: 0, gallery: 0, pledges: 0, partners: 0, contacts: 0, events: 0 });

  useEffect(() => {
    if (!loading && role) fetchStats();
  }, [loading, role]);

  const fetchStats = async () => {
    const [a, al, d, g, p, pa, c, ev] = await Promise.all([
      supabase.from("articles").select("id", { count: "exact", head: true }),
      supabase.from("alumni_stories").select("id", { count: "exact", head: true }),
      supabase.from("donations").select("id", { count: "exact", head: true }),
      supabase.from("gallery_images").select("id", { count: "exact", head: true }),
      supabase.from("pledges").select("id", { count: "exact", head: true }),
      supabase.from("partners").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
    ]);
    setStats({
      articles: a.count || 0, alumni: al.count || 0, donations: d.count || 0,
      gallery: g.count || 0, pledges: p.count || 0, partners: pa.count || 0, contacts: c.count || 0, events: ev.count || 0,
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  const adminActions: { icon: typeof Newspaper; title: string; desc: string; link: string; label: string }[] = [
    { icon: Newspaper, title: "Manage News", desc: "Add, edit, or delete news articles.", link: "/admins/news", label: "Go to News" },
    { icon: Users, title: "Manage Alumni", desc: "Update alumni stories and profiles.", link: "/admins/alumni", label: "Go to Alumni" },
    { icon: BookOpen, title: "Manage Programs", desc: "Add or edit program details.", link: "/admins/programs", label: "Go to Programs" },
    { icon: Image, title: "Manage Gallery", desc: "Upload and manage gallery images.", link: "/admins/gallery", label: "Go to Gallery" },
    { icon: Calendar, title: "Manage Events", desc: "Add photos for Annual Dinner & Cake Festival.", link: "/admins/events", label: "Go to Events" },
  ];

  const secretaryActions: typeof adminActions = [
    { icon: FileText, title: "Secretary Dashboard", desc: "Manage partners, contacts, and pledge reminders.", link: "/admins/secretary", label: "Open Dashboard" },
  ];

  const actions = role === "secretary" ? secretaryActions : [...adminActions, ...secretaryActions];

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-heading font-bold">Administration Panel</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="container-tight px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold capitalize">{role} Dashboard</h2>
          <p className="text-muted-foreground mt-1">Manage content, track donations, and oversee operations for Edumed Trust.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1">Quick Actions</h3>
          <p className="text-muted-foreground text-sm">Access all administrative functions from your personalized dashboard.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {actions.map((action, i) => (
            <motion.div key={action.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={action.link} className="block rounded-2xl p-6 shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full bg-card border-border/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-bold text-lg mb-2">{action.title}</h4>
                <p className="text-muted-foreground text-sm mb-4 text-pretty">{action.desc}</p>
                <span className="font-semibold text-sm text-primary">{action.label} →</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {role === "admin" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Analytics Overview</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Articles", value: stats.articles },
                { label: "Alumni Stories", value: stats.alumni },
                { label: "Donations", value: stats.donations },
                { label: "Gallery Images", value: stats.gallery },
                { label: "Active Pledges", value: stats.pledges },
                { label: "Partner Inquiries", value: stats.partners },
                { label: "Contact Messages", value: stats.contacts },
                { label: "Events", value: stats.events },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-3xl font-heading font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
