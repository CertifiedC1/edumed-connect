import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

const categories = ["All", "Milestone", "Programs", "Events", "Alumni", "Scholarships", "Partnerships"];

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const filtered = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <Layout>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>
            News & Updates
          </motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">
            Stay informed about our latest programs, milestones, and impact stories.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-4xl">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.97] ${
                    filter === cat ? "bg-primary text-white" : "bg-section-alt hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : filtered.length === 0 ? (
            <div className="bg-section-alt rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">No articles found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((article) => (
                <ScrollReveal key={article.id}>
                  <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50">
                    {article.image_url && (
                      <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">{article.category}</span>
                        {article.featured && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Featured</span>
                        )}
                      </div>
                      <h2 className="text-2xl font-heading font-bold mb-3">{article.title}</h2>
                      <p className="text-muted-foreground leading-relaxed text-pretty">{article.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span>{new Date(article.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
