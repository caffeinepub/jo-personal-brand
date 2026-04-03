import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import About from "./components/About";
import AdminPanel from "./components/AdminPanel";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import Vision from "./components/Vision";
import WhatIDo from "./components/WhatIDo";
import Work from "./components/Work";

function Layout() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const handleLogoClick = () => {
    const next = logoClickCount + 1;
    if (next >= 5) {
      setAdminOpen(true);
      setLogoClickCount(0);
    } else {
      setLogoClickCount(next);
      setTimeout(() => setLogoClickCount(0), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onLogoClick={handleLogoClick} />
      <main>
        <Outlet />
      </main>
      <Footer onLogoClick={handleLogoClick} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Hero,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <div className="pt-28">
      <About />
    </div>
  ),
});

const whatIDoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/what-i-do",
  component: () => (
    <div className="pt-28">
      <WhatIDo />
    </div>
  ),
});

const visionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vision",
  component: () => (
    <div className="pt-28">
      <Vision />
    </div>
  ),
});

const workRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/work",
  component: () => (
    <div className="pt-28">
      <Work />
    </div>
  ),
});

const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/testimonials",
  component: () => (
    <div className="pt-28">
      <Testimonials />
    </div>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <div className="pt-28">
      <Blog />
    </div>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <div className="pt-28">
      <Contact />
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  whatIDoRoute,
  visionRoute,
  workRoute,
  testimonialsRoute,
  blogRoute,
  contactRoute,
]);

const hashHistory = createHashHistory();

const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
