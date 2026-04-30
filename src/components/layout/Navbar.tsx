import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/edumed-logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "Who We Are",
    children: [
      { label: "About Us", path: "/about" },
      { label: "Our Team", path: "/team" },
    ],
  },
  { label: "Programs", path: "/programs" },
  { label: "Scholarship", path: "/scholarship" },
  {
    label: "Resources",
    children: [
      { label: "Gallery", path: "/gallery" },
      { label: "News & Updates", path: "/news" },
    ],
  },
  { label: "Alumni", path: "/alumni" },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container-tight flex items-center justify-between h-16 md:h-20 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Edumed Trust" className="h-12 md:h-14 w-auto max-w-[180px] md:max-w-[220px]" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-background rounded-xl shadow-lg border border-border/50 py-2 min-w-[180px]">
                    {link.children.map((child) => (
                      <Link key={child.path} to={child.path} className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path!) ? "text-primary bg-primary/5" : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Toggle dark mode">
            {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/donate" className="hidden sm:block btn-primary text-sm !px-6 !py-2.5">Donate</Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-background border-t border-border/50 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button onClick={() => setResourcesOpen(!resourcesOpen)} className="flex items-center justify-between w-full px-4 py-3 text-foreground/70 rounded-lg hover:bg-muted">
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {resourcesOpen && (
                      <div className="pl-6 space-y-1">
                        {link.children.map((child) => (
                          <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-foreground/60 hover:text-foreground rounded-lg">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.path} to={link.path!} onClick={() => setMobileOpen(false)} className={`block px-4 py-3 rounded-lg transition-colors ${isActive(link.path!) ? "text-primary bg-primary/5 font-medium" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}>
                    {link.label}
                  </Link>
                )
              )}
              <Link to="/donate" onClick={() => setMobileOpen(false)} className="block btn-primary text-center mt-4">Donate Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
