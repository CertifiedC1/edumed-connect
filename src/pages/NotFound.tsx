import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Page Not Found — Edumed Trust</title>
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-[10rem] md:text-[12rem] font-heading font-bold text-primary/10 leading-none select-none"
          >
            404
          </motion.div>

          <div className="-mt-16 relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg mb-8 text-pretty">
              The page <code className="bg-muted px-2 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist. 
              It may have been moved or you may have typed the URL incorrectly.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-outline-dark inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            Need help? <Link to="/contact" className="text-primary font-semibold hover:underline">Contact Us</Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
