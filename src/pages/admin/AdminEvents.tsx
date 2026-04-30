import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Calendar, PartyPopper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/shared/ImageUpload";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface EventImage {
  id: string;
  title: string;
  image_url: string | null;
  description: string | null;
  event_date: string | null;
  created_at: string;
}

export default function AdminEvents() {
  const { loading: authLoading } = useAdminAuth(["admin"]);
  const { toast } = useToast();
  const [events, setEvents] = useState<EventImage[]>([]);
  const [eventCategory, setEventCategory] = useState("Annual Dinner");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) fetchEvents();
  }, [authLoading]);

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    const { error } = await supabase.from("events").insert({
      title: eventCategory,
      image_url: imageUrl,
      description: caption || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Event photo added!" });
      setImageUrl("");
      setCaption("");
      fetchEvents();
    }
  };

  const deleteEvent = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  const dinnerPhotos = events.filter((e) => e.title === "Annual Dinner");
  const cakePhotos = events.filter((e) => e.title === "Cake Festival");

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-card border-b border-border/50 px-4 lg:px-8 py-4">
        <div className="container-tight flex items-center gap-4">
          <Link to="/admins/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-heading font-bold">Manage Events</h1>
        </div>
      </header>
      <div className="container-tight px-4 lg:px-8 py-8 max-w-4xl">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 mb-8">
          <h2 className="text-xl font-heading font-bold mb-4">Add Event Photo</h2>
          <form onSubmit={addEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Select Event</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setEventCategory("Annual Dinner")} className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${eventCategory === "Annual Dinner" ? "bg-primary text-white" : "bg-section-alt hover:bg-muted"}`}>
                  <Calendar className="w-4 h-4" /> Annual Dinner
                </button>
                <button type="button" onClick={() => setEventCategory("Cake Festival")} className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${eventCategory === "Cake Festival" ? "bg-primary text-white" : "bg-section-alt hover:bg-muted"}`}>
                  <PartyPopper className="w-4 h-4" /> Cake Festival
                </button>
              </div>
            </div>
            <ImageUpload label="Event Photo" currentUrl={imageUrl} onUpload={(url) => setImageUrl(url)} />
            <input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            <button type="submit" className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Photo</button>
          </form>
        </div>

        {/* Annual Dinner Photos */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Annual Dinner Photos ({dinnerPhotos.length})</h3>
          </div>
          {dinnerPhotos.length === 0 ? (
            <p className="text-muted-foreground text-sm">No photos yet. Upload your first Annual Dinner photo above.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dinnerPhotos.map((ev) => (
                <div key={ev.id} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 group relative">
                  {ev.image_url && <img src={ev.image_url} alt={ev.description || ""} className="w-full h-40 object-cover" />}
                  {ev.description && <p className="p-3 text-sm text-muted-foreground">{ev.description}</p>}
                  <button onClick={() => deleteEvent(ev.id)} className="absolute top-2 right-2 p-1.5 bg-card/90 rounded-lg text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cake Festival Photos */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PartyPopper className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Cake Festival Photos ({cakePhotos.length})</h3>
          </div>
          {cakePhotos.length === 0 ? (
            <p className="text-muted-foreground text-sm">No photos yet. Upload your first Cake Festival photo above.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cakePhotos.map((ev) => (
                <div key={ev.id} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 group relative">
                  {ev.image_url && <img src={ev.image_url} alt={ev.description || ""} className="w-full h-40 object-cover" />}
                  {ev.description && <p className="p-3 text-sm text-muted-foreground">{ev.description}</p>}
                  <button onClick={() => deleteEvent(ev.id)} className="absolute top-2 right-2 p-1.5 bg-card/90 rounded-lg text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
