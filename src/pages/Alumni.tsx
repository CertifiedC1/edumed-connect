import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Quote, X, ChevronDown, ChevronUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

import alumniRetreat from "@/assets/alumni/alumni-retreat.jpg";
import alumniFun from "@/assets/alumni/alumni-fun.jpg";

interface AlumniStory {
  id: string;
  name: string;
  title: string;
  school: string | null;
  story: string | null;
  quote: string | null;
  image_url: string | null;
}

export default function Alumni() {
  const [stories, setStories] = useState<AlumniStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    supabase.from("alumni_stories").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setStories(data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <Helmet><title>Alumni Stories — Edumed Trust</title></Helmet>
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4" style={{ lineHeight: "1.15" }}>Alumni Stories</motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-pretty">Discover the inspiring journeys of students whose lives have been transformed through Edumed Trust.</p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding bg-section-alt">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="text-2xl font-heading font-bold text-center mb-8">Our Alumni Community</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-lg cursor-pointer group" onClick={() => setLightbox(alumniRetreat)}>
                <img src={alumniRetreat} alt="Alumni volunteering at the students retreat" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="bg-card p-4">
                  <p className="text-sm text-muted-foreground">Some of the alumni volunteering at the students retreat</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden shadow-lg cursor-pointer group" onClick={() => setLightbox(alumniFun)}>
                <img src={alumniFun} alt="Alumni having fun during the retreat" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="bg-card p-4">
                  <p className="text-sm text-muted-foreground">Alumni having fun during the mentorship retreat</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Database Stories */}
      <section className="section-padding">
        <div className="container-tight">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map((i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}
            </div>
          ) : stories.length > 0 && (
            <>
              <ScrollReveal>
                <h2 className="text-2xl font-heading font-bold text-center mb-8">More Stories</h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => {
                  const isLong = (story.story?.length || 0) > 300;
                  const isOpen = expanded[story.id];
                  const displayStory = story.story && isLong && !isOpen
                    ? story.story.slice(0, 300) + "..."
                    : story.story;
                  return (
                  <ScrollReveal key={story.id}>
                    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group">
                      {story.image_url && (
                        <div className="h-56 overflow-hidden cursor-pointer" onClick={() => setLightbox(story.image_url!)}>
                          <img src={story.image_url} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-heading font-bold text-xl mb-2">{story.title}</h3>
                        {story.quote && (
                          <div className="flex gap-2 mb-3">
                            <Quote className="w-5 h-5 text-primary/40 shrink-0 mt-1" />
                            <p className="text-muted-foreground italic text-sm">{story.quote}</p>
                          </div>
                        )}
                        {story.story && (
                          <>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-2 flex-1 whitespace-pre-line">{displayStory}</p>
                            {isLong && (
                              <button
                                onClick={() => setExpanded((e) => ({ ...e, [story.id]: !isOpen }))}
                                className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline mb-3 self-start"
                              >
                                {isOpen ? (<>Read less <ChevronUp className="w-4 h-4" /></>) : (<>Read more <ChevronDown className="w-4 h-4" /></>)}
                              </button>
                            )}
                          </>
                        )}
                        <div className="mt-auto">
                          <h4 className="font-semibold">{story.name}</h4>
                          {story.school && <p className="text-sm text-muted-foreground">{story.school}</p>}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={lightbox} alt="Full view" className="max-w-full max-h-[90vh] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </Layout>
  );
}
