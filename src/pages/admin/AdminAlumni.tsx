import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/shared/ImageUpload";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AlumniStory {
  id: string;
  name: string;
  title: string;
  school: string | null;
  story: string | null;
  quote: string | null;
  image_url: string | null;
  created_at: string;
}

export default function AdminAlumni() {
  const { loading: authLoading } = useAdminAuth(["admin"]);
  const { toast } = useToast();
  const [stories, setStories] = useState<AlumniStory[]>([]);
  const [form, setForm] = useState({ name: "", title: "", school: "", story: "", quote: "", image_url: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) fetchStories();
  }, [authLoading]);

  const fetchStories = async () => {
    const { data } = await supabase.from("alumni_stories").select("*").order("created_at", { ascending: false });
    if (data) setStories(data);
    setLoading(false);
  };

  const addStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.title) return;
    const { error } = await supabase.from("alumni_stories").insert({
      name: form.name, title: form.title, school: form.school || null,
      story: form.story || null, quote: form.quote || null, image_url: form.image_url || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Alumni story added!" });
      setForm({ name: "", title: "", school: "", story: "", quote: "", image_url: "" });
      fetchStories();
    }
  };

  const deleteStory = async (id: string) => {
    await supabase.from("alumni_stories").delete().eq("id", id);
    fetchStories();
  };

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center gap-4">
          <Link to="/admins/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-heading font-bold">Manage Alumni Stories</h1>
        </div>
      </header>
      <div className="container-tight px-4 lg:px-8 py-8 max-w-4xl">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 mb-8">
          <h2 className="text-xl font-heading font-bold mb-4">Add Alumni Story</h2>
          <form onSubmit={addStory} className="space-y-4">
            <input placeholder="Alumni name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <input placeholder="Story title (e.g. From Rural School to Engineer)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <input placeholder="School attended" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <textarea rows={4} placeholder="Full story" value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" />
            <input placeholder="Quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <ImageUpload label="Alumni Photo" currentUrl={form.image_url} onUpload={(url) => setForm({ ...form, image_url: url })} />
            <button type="submit" className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Alumni Story</button>
          </form>
        </div>

        <h3 className="text-lg font-semibold mb-2">Existing Stories</h3>
        <p className="text-muted-foreground text-sm mb-4">Celebrate the achievements of our alumni community</p>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : stories.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
            <p className="text-muted-foreground font-medium">No alumni stories yet</p>
            <p className="text-sm text-muted-foreground mt-1">Create the first inspiring alumni story using the form above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stories.map((s) => (
              <div key={s.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  {s.image_url && <img src={s.image_url} alt={s.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                  <div>
                    <h4 className="font-heading font-bold">{s.title}</h4>
                    <p className="text-sm text-muted-foreground">{s.name} · {s.school}</p>
                  </div>
                </div>
                <button onClick={() => deleteStory(s.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors shrink-0">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
