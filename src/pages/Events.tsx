import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Calendar, PartyPopper, ExternalLink, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface EventPhoto {
  id: string;
  title: string;
  image_url: string | null;
  description: string | null;
}

export default function Events() {
  const [dinnerPhotos, setDinnerPhotos] = useState<EventPhoto[]>([]);
  const [cakePhotos, setCakePhotos] = useState<EventPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("events").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) {
        setDinnerPhotos(data.filter((e) => e.title === "Annual Dinner"));
        setCakePhotos(data.filter((e) => e.title === "Cake Festival"));
      }
      setLoading(false);
    });
  }, []);

  const PhotoGrid = ({ photos }: { photos: EventPhoto[] }) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {photos.map((p) => (
        p.image_url && (
          <div key={p.id} className="rounded-2xl overflow-hidden shadow-sm border border-border/50 cursor-pointer group hover:shadow-xl transition-all" onClick={() => setLightbox(p.image_url!)}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.image_url} alt={p.description || "Event photo"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
            </div>
            {p.description && <p className="p-3 text-sm text-muted-foreground">{p.description}</p>}
          </div>
        )
      ))}
    </div>
  );

  return (
    <Layout>
      <Helmet><title>Events — Edumed Trust</title></Helmet>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Events</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Join us at our events and be part of the transformation.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-5xl space-y-16">
          {/* Annual Dinner */}
          <ScrollReveal>
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Edumed Trust</p>
                  <h2 className="text-2xl font-heading font-bold">The Annual Dinner</h2>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-pretty mb-4">
                Edumed Trust has been holding the Annual Dinner since 1999. The aim is to create an opportunity to meet with existing partners, friends and give an account of the past year and unveil our plans for the coming year. We also find it an opportune event to introduce colleagues, family and friends to the Edumed mission of supporting bright needy students through secondary school scholarships and invite them to consider joining our support team by making voluntary pledges and contributions towards the work of the trust.
              </p>
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {[1,2,3].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
                </div>
              ) : dinnerPhotos.length > 0 && <PhotoGrid photos={dinnerPhotos} />}
            </div>
          </ScrollReveal>

          {/* Cake Festival */}
          <ScrollReveal delay={0.1}>
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <PartyPopper className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Edumed Trust</p>
                  <h2 className="text-2xl font-heading font-bold">The Cake Festival</h2>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-pretty mb-4">
                The Cake Festival is the first event of its kind in Kenya that aims to display all the cakes and desserts that are available in the market. It is a convergence of bakers, exhibitors and sponsors who are passionate about all things baking.
              </p>
              <p className="text-muted-foreground leading-relaxed text-pretty mb-4">
                The main objective of The Cake Festival is to raise awareness and funds in support of Edumed Trust which has since 1996 supported bright needy students in Kenya through scholarships for their secondary education. The inaugural Cake Festival in 2009 attracted 20 bakers, 5 sponsors and 637 guests.
              </p>
              <a href="https://www.facebook.com/cakefestivalkenya" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                Visit Cake Festival Page <ExternalLink className="w-4 h-4" />
              </a>
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {[1,2,3].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
                </div>
              ) : cakePhotos.length > 0 && <PhotoGrid photos={cakePhotos} />}
            </div>
          </ScrollReveal>
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
