import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Pencil, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/shared/ImageUpload";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const categories = ["Milestone", "Programs", "Events", "Alumni", "Scholarships", "Partnerships"];

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string;
}

export default function AdminNews() {
  const { loading: authLoading } = useAdminAuth(["admin"]);
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState({ title: "", category: "", excerpt: "", image_url: "", featured: false });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", category: "", excerpt: "", image_url: "", featured: false });

  useEffect(() => {
    if (!authLoading) fetchArticles();
  }, [authLoading]);

  const fetchArticles = async () => {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (data) setArticles(data);
    setLoading(false);
  };

  const addArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category) return;
    const { error } = await supabase.from("articles").insert({
      title: form.title, category: form.category,
      excerpt: form.excerpt || null, image_url: form.image_url || null, featured: form.featured,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Article added!" });
      setForm({ title: "", category: "", excerpt: "", image_url: "", featured: false });
      fetchArticles();
    }
  };

  const deleteArticle = async (id: string) => {
    await supabase.from("articles").delete().eq("id", id);
    fetchArticles();
  };

  const startEdit = (a: Article) => {
    setEditingId(a.id);
    setEditForm({
      title: a.title,
      category: a.category,
      excerpt: a.excerpt || "",
      image_url: a.image_url || "",
      featured: a.featured,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    const { error } = await supabase.from("articles").update({
      title: editForm.title,
      category: editForm.category,
      excerpt: editForm.excerpt || null,
      image_url: editForm.image_url || null,
      featured: editForm.featured,
    }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Article updated!" });
      setEditingId(null);
      fetchArticles();
    }
  };

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center gap-4">
          <Link to="/admins/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-heading font-bold">Manage News</h1>
        </div>
      </header>
      <div className="container-tight px-4 lg:px-8 py-8 max-w-4xl">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 mb-8">
          <h2 className="text-xl font-heading font-bold mb-1">Add New Article</h2>
          <p className="text-muted-foreground text-sm mb-6">Fill in the details to add a new news article.</p>
          <form onSubmit={addArticle} className="space-y-4">
            <input placeholder="Article title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea rows={4} placeholder="Article excerpt/content" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" />
            <ImageUpload label="Article Image" currentUrl={form.image_url} onUpload={(url) => setForm({ ...form, image_url: url })} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
              Featured article
            </label>
            <button type="submit" className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Article</button>
          </form>
        </div>

        <h3 className="text-lg font-semibold mb-4">Existing Articles</h3>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : articles.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
            <p className="text-muted-foreground font-medium">No articles yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                {editingId === article.id ? (
                  <div className="space-y-3">
                    <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20" />
                    <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20">
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <textarea rows={3} value={editForm.excerpt} onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                    <ImageUpload label="Article Image" currentUrl={editForm.image_url} onUpload={(url) => setEditForm({ ...editForm, image_url: url })} />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={editForm.featured} onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })} className="rounded" />
                      Featured
                    </label>
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(article.id)} className="btn-primary flex items-center gap-2 text-sm"><Save className="w-4 h-4" /> Save</button>
                      <button onClick={cancelEdit} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      {article.image_url && <img src={article.image_url} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">{article.category}</span>
                          {article.featured && <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Featured</span>}
                        </div>
                        <h4 className="font-heading font-bold">{article.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => startEdit(article)} className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors" title="Edit">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteArticle(article.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
