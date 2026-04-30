import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("gallery_images").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setImages(data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <Helmet><title>Gallery — Edumed Trust</title></Helmet>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Gallery</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Our Impact in Pictures — From scholarship ceremonies to mentorship retreats.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-tight">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
            </div>
          ) : images.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <div className="bg-section-alt rounded-2xl p-12">
                  <h2 className="text-2xl font-heading font-bold mb-4">No images in gallery yet</h2>
                  <p className="text-muted-foreground">Check back soon!</p>
                </div>
              </ScrollReveal>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => (
                <ScrollReveal key={img.id}>
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-border/50 cursor-pointer group hover:shadow-xl transition-all" onClick={() => setLightbox(img.url)}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={img.url} alt={img.caption || "Gallery image"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    </div>
                    {img.caption && <p className="p-3 text-sm text-muted-foreground">{img.caption}</p>}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-8 h-8" /></button>
          <img src={lightbox} alt="Full size" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </Layout>
  );
}
