import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Mail, MapPin, Heart, Copy, Check, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyPaybill = () => {
    navigator.clipboard.writeText("531200");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container-tight section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Edumed Trust</h3>
            <p className="text-background/60 text-sm leading-relaxed text-pretty">
              A Kenyan Christian Charitable Trust established in 1996, supporting bright but financially disadvantaged students through education, mentorship, and community empowerment.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/edumedtrustkenya" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/EdumedTrust" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/edumed_trust?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@EdumedTrust1" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", path: "/about" },
                { label: "Our Programs", path: "/programs" },
                { label: "Apply for Scholarship", path: "/scholarship" },
                { label: "Donate", path: "/donate" },
                { label: "Alumni Stories", path: "/alumni" },
                { label: "Our Team", path: "/team" },
                { label: "News & Updates", path: "/news" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-background/60 hover:text-background text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-background/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>KickStart International, Ngong Road, next to Forest View Mall, P.O. Box 1025, 00502 Karen, Nairobi</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@edumedtrust.org</span>
              </div>
            </div>
          </div>

          {/* Support a Student */}
          <div>
            <h4 className="text-lg font-heading mb-4">Support a Student</h4>
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              Your donation can change a child's life forever. Join us in transforming futures through education.
            </p>
            <Link to="/donate" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline mb-4">
              <Heart className="w-4 h-4" /> Donate Now
            </Link>
            <div className="bg-background/10 rounded-xl p-4 mt-2">
              <p className="text-xs text-background/50 mb-1">M-Pesa Paybill</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold font-heading">531200</span>
                <button onClick={copyPaybill} className="p-1.5 rounded-lg bg-background/10 hover:bg-background/20 transition-colors" title="Copy paybill">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-background/50 mt-1">Account: Your Name</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link to="/privacy-policy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/privacy-policy#donation-policy" className="hover:text-background transition-colors">Donation Policy</Link>
            <span>·</span>
            <Link to="/privacy-policy#child-protection" className="hover:text-background transition-colors">Child Protection Policy</Link>
            <span>·</span>
            <Link to="/terms-and-conditions" className="hover:text-background transition-colors">Terms & Conditions</Link>
          </div>
          <p>
            © {new Date().getFullYear()} Edumed Trust. All rights reserved. Made by{" "}
            <a href="https://www.developerskenya.co.ke/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              DEVELOPERS KENYA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
