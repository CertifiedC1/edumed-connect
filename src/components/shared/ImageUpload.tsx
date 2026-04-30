import { useState, useRef, useEffect } from "react";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

export default function ImageUpload({ onUpload, currentUrl, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || "");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, []);

  const startProgressIllusion = () => {
    setProgress(0);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p > 90) p = 90;
      setProgress(p);
    }, 200);
  };

  const stopProgress = (succeeded: boolean) => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(succeeded ? 100 : 0);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("File too large. Maximum 5MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    setUploading(true);
    setSuccess(false);
    setError("");
    startProgressIllusion();

    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    
    const { error: uploadError } = await supabase.storage.from("admin-uploads").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    
    if (uploadError) {
      console.error("Upload error:", uploadError);
      setError(`Upload failed: ${uploadError.message}`);
      stopProgress(false);
      setUploading(false);
      return;
    }
    
    const { data } = supabase.storage.from("admin-uploads").getPublicUrl(path);
    stopProgress(true);
    setPreview(data.publicUrl);
    onUpload(data.publicUrl);
    setSuccess(true);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-xl border border-border" loading="lazy" />
          <button type="button" onClick={() => { setPreview(""); onUpload(""); setSuccess(false); setError(""); }} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5">
            <X className="w-3 h-3" />
          </button>
          {success && (
            <div className="flex items-center gap-1 mt-2 text-green-600 text-xs font-medium animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5" /> Uploaded successfully
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors w-full justify-center text-muted-foreground text-sm"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Choose file from device"}
          </button>
          {uploading && (
            <div className="mt-2">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% uploading...</p>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-1 mt-2 text-destructive text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
    </div>
  );
}
