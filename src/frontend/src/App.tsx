import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import About from "./components/About";
import AdminPanel from "./components/AdminPanel";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Vision from "./components/Vision";
import WhatIDo from "./components/WhatIDo";
import Work from "./components/Work";

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const handleLogoClick = () => {
    const next = logoClickCount + 1;
    if (next >= 5) {
      setAdminOpen(true);
      setLogoClickCount(0);
    } else {
      setLogoClickCount(next);
      // Reset after 2 seconds of no clicks
      setTimeout(() => setLogoClickCount(0), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onLogoClick={handleLogoClick} />
      <main>
        <Hero />
        <About />
        <WhatIDo />
        <Vision />
        <Work />
        <Blog />
        <Contact />
      </main>
      <Footer onLogoClick={handleLogoClick} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
      <Toaster richColors position="top-right" />
    </div>
  );
}
