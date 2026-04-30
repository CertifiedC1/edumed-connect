import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Users, Briefcase, Plus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/shared/ImageUpload";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";

const existingPrograms = [
  { icon: GraduationCap, title: "Scholarship Program", desc: "Supporting bright students from disadvantaged backgrounds with secondary school tuition." },
  { icon: Users, title: "Mentorship Program", desc: "Annual retreats connecting students with business leaders and community mentors." },
  { icon: Briefcase, title: "Livelihood Program", desc: "Empowering families through micro-enterprise support since 2021." },
];

interface NewProgram {
  title: string;
  description: string;
  image_url: string;
}

export default function AdminPrograms() {
  const { loading: authLoading } = useAdminAuth(["admin"]);
  const { toast } = useToast();
  const [programs, setPrograms] = useState<NewProgram[]>([]);
  const [form, setForm] = useState<NewProgram>({ title: "", description: "", image_url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      const saved = localStorage.getItem("custom_programs");
      if (saved) setPrograms(JSON.parse(saved));
    }
  }, [authLoading]);

  const addProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setSaving(true);
    const updated = [...programs, form];
    setPrograms(updated);
    localStorage.setItem("custom_programs", JSON.stringify(updated));
    toast({ title: "Program added!" });
    setForm({ title: "", description: "", image_url: "" });
    setSaving(false);
  };

  const removeProgram = (index: number) => {
    const updated = programs.filter((_, i) => i !== index);
    setPrograms(updated);
    localStorage.setItem("custom_programs", JSON.stringify(updated));
    toast({ title: "Program removed" });
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center gap-4">
          <Link to="/admins/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-heading font-bold">Manage Programs</h1>
        </div>
      </header>
      <div className="container-tight px-4 lg:px-8 py-8 max-w-4xl">
        {/* Add New Program */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 mb-8">
          <h2 className="text-xl font-heading font-bold mb-4">Add New Program</h2>
          <form onSubmit={addProgram} className="space-y-4">
            <input placeholder="Program title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <textarea rows={3} placeholder="Program description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" />
            <ImageUpload label="Program Image" currentUrl={form.image_url} onUpload={(url) => setForm({ ...form, image_url: url })} />
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Program
            </button>
          </form>
        </div>

        <h3 className="text-lg font-semibold mb-4">Existing Programs</h3>
        <div className="space-y-4">
          {existingPrograms.map((p) => (
            <div key={p.title} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg">{p.title}</h4>
                <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
          {programs.map((p, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 flex items-start gap-4 group relative">
              {p.image_url && <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />}
              <div className="flex-1">
                <h4 className="font-heading font-bold text-lg">{p.title}</h4>
                <p className="text-muted-foreground text-sm mt-1">{p.description}</p>
              </div>
              <button onClick={() => removeProgram(i)} className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
