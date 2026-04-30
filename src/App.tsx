import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/shared/ScrollToTop";
import TopProgressBar from "@/components/shared/TopProgressBar";
import PageSkeleton from "@/components/shared/PageSkeleton";
import CookieConsent from "@/components/shared/CookieConsent";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Programs = lazy(() => import("./pages/Programs"));
const Scholarship = lazy(() => import("./pages/Scholarship"));
const Donate = lazy(() => import("./pages/Donate"));
const Contact = lazy(() => import("./pages/Contact"));
const Alumni = lazy(() => import("./pages/Alumni"));
const Gallery = lazy(() => import("./pages/Gallery"));
const News = lazy(() => import("./pages/News"));
const Partner = lazy(() => import("./pages/Partner"));
const Events = lazy(() => import("./pages/Events"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminNews = lazy(() => import("./pages/admin/AdminNews"));
const AdminAlumni = lazy(() => import("./pages/admin/AdminAlumni"));
const AdminPrograms = lazy(() => import("./pages/admin/AdminPrograms"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminDonations = lazy(() => import("./pages/admin/AdminDonations"));
const AdminSecretary = lazy(() => import("./pages/admin/AdminSecretary"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <TopProgressBar />
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/scholarship" element={<Scholarship />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/events" element={<Events />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/admins/login" element={<AdminLogin />} />
              <Route path="/admins/dashboard" element={<AdminDashboard />} />
              <Route path="/admins/news" element={<AdminNews />} />
              <Route path="/admins/alumni" element={<AdminAlumni />} />
              <Route path="/admins/programs" element={<AdminPrograms />} />
              <Route path="/admins/gallery" element={<AdminGallery />} />
              <Route path="/admins/donations" element={<AdminDonations />} />
              <Route path="/admins/secretary" element={<AdminSecretary />} />
              <Route path="/admins/events" element={<AdminEvents />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
