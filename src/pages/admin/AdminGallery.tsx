import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/shared/ImageUpload";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  created_at: string;
}

export default function AdminGallery() {
  const { loading: authLoading } = useAdminAuth(["admin"]);
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) fetchImages();
  }, [authLoading]);

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    if (data) setImages(data);
    setLoading(false);
  };

  const addImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    const { error } = await supabase.from("gallery_images").insert({ url, caption: caption || null });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Image added!" });
      setUrl("");
      setCaption("");
      fetchImages();
    }
  };

  const deleteImage = async (id: string) => {
    await supabase.from("gallery_images").delete().eq("id", id);
    fetchImages();
  };

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center gap-4">
          <Link to="/admins/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-heading font-bold">Manage Gallery</h1>
        </div>
      </header>
      <div className="container-tight px-4 lg:px-8 py-8 max-w-4xl">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 mb-8">
          <h2 className="text-xl font-heading font-bold mb-4">Upload Image</h2>
          <form onSubmit={addImage} className="space-y-4">
            <ImageUpload label="Gallery Image" currentUrl={url} onUpload={(u) => setUrl(u)} />
            <input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <button type="submit" className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Image</button>
          </form>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : images.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
            <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">No gallery images yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 group relative">
                <img src={img.url} alt={img.caption || ""} className="w-full h-48 object-cover" />
                {img.caption && <p className="p-3 text-sm text-muted-foreground">{img.caption}</p>}
                <button onClick={() => deleteImage(img.id)} className="absolute top-2 right-2 p-1.5 bg-card/90 rounded-lg text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
