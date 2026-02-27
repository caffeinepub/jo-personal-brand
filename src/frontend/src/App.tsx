import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSubmitContact, useGetAllPosts, useCreatePost, useDeletePost } from "./hooks/useQueries";
import type { BlogPost } from "./backend.d";
import {
  Megaphone,
  User,
  BarChart2,
  Lightbulb,
  Smile,
  MapPin,
  Mail,
  Menu,
  X,
  ArrowRight,
  Loader2,
  BookOpen,
  ArrowLeft,
  Trash2,
  PenLine,
  Plus,
  ChevronRight,
} from "lucide-react";

/* ── Fade-in wrapper ─────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Nav ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "What I Do", href: "#services" },
  { label: "Vision", href: "#vision" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onLogoClick: () => void;
}

function Navbar({ onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-warm-cream/95 backdrop-blur-sm shadow-warm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo — easter egg trigger */}
          <button
            type="button"
            onClick={onLogoClick}
            className="font-display text-[1.4375rem] font-semibold tracking-[-0.04em] text-foreground hover:text-terracotta transition-colors"
          >
            Job JS.
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => handleNavClick("#contact")}
              className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full px-5"
            >
              Work With Me
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-0 right-0 z-40 bg-warm-cream/98 backdrop-blur-sm border-b border-border shadow-warm-lg md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-base font-medium py-3 text-left text-foreground hover:text-terracotta transition-colors border-b border-border last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="mt-4 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full"
                onClick={() => handleNavClick("#contact")}
              >
                Work With Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image — full bleed, minimal overlay so photo breathes */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
          transformOrigin: "center center",
        }}
      />
      {/* Cinematic overlay — clear at top, dense at bottom for text legibility */}
      <div className="hero-overlay absolute inset-0" />
      {/* Subtle grain for depth */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Content — bottom-left editorial layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 pb-20 md:pb-28 pt-32">
        <div className="max-w-3xl">
          {/* Pre-title badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 mb-7"
          >
            <span className="w-6 h-px bg-white/60" />
            <span className="text-white/75 text-xs font-medium tracking-[0.18em] uppercase">
              Digital Marketer · Personal Brand
            </span>
          </motion.div>

          {/* Headline — white on dark bottom overlay */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-[5.5rem] font-semibold leading-[1.04] tracking-display text-white mb-6"
          >
            Building a{" "}
            <em className="not-italic" style={{ color: "oklch(0.82 0.12 40)" }}>
              Lifestyle Brand
            </em>
            <br />
            with a Digital Mindset
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-white/70 max-w-xl mb-10 leading-relaxed"
          >
            Sharing ideas on lifestyle, creativity, and modern marketing.
            Content, projects, and collaborations — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.68 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => handleScroll("#about")}
              className="bg-white text-espresso hover:bg-white/92 rounded-full px-8 shadow-warm-lg text-sm font-semibold transition-all"
            >
              Explore
              <ArrowRight size={15} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScroll("#contact")}
              className="rounded-full px-8 border-white/35 text-white bg-transparent hover:bg-white/10 hover:border-white/60 transition-all text-sm font-medium backdrop-blur-sm"
            >
              Work With Me
            </Button>
          </motion.div>
        </div>

        {/* Floating stat row — bottom right corner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="hidden md:flex absolute right-10 bottom-28 flex-col gap-6 items-end"
        >
          {[
            { n: "5+", l: "Years" },
            { n: "50+", l: "Campaigns" },
            { n: "10+", l: "Brands" },
          ].map((s) => (
            <div key={s.l} className="text-right">
              <div className="font-display text-3xl font-semibold text-white leading-none">
                {s.n}
              </div>
              <div className="text-white/50 text-xs tracking-widest uppercase mt-0.5">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="w-0.5 h-7 bg-gradient-to-b from-white/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

/* ── About ────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <FadeIn>
              <span className="section-eyebrow mb-5 block">About Me</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl md:text-[3.25rem] font-semibold tracking-display text-foreground mb-6 leading-[1.1]">
                Hi, I'm Job JS.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground leading-[1.75] text-[1.0625rem] mb-5">
                I work in digital marketing and have experience managing
                campaigns, client communication, and marketing strategies.
              </p>
              <p className="text-muted-foreground leading-[1.75] text-[1.0625rem]">
                Alongside my career, I'm building a personal brand around
                lifestyle, creativity, and the digital world. This website is a
                place where I share my work, ideas, and creative projects.
              </p>
            </FadeIn>
          </div>

          {/* Decorative panel */}
          <FadeIn delay={0.15} className="relative">
            <div className="relative">
              {/* Background shape */}
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-terracotta/8 via-dusty-rose/12 to-transparent" />
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card via-accent/30 to-secondary/50 p-10 border border-border/60 shadow-warm-lg">
                {/* Decorative top line accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
                {/* Stat blocks */}
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { number: "5+", label: "Years Experience" },
                    { number: "50+", label: "Campaigns Managed" },
                    { number: "10+", label: "Brand Partnerships" },
                    { number: "∞", label: "Creative Ideas" },
                  ].map((stat) => (
                    <div key={stat.label} className="group">
                      <div className="font-display text-[2.75rem] font-semibold text-terracotta leading-none mb-1.5 group-hover:scale-105 transition-transform origin-left">
                        {stat.number}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Quote */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="font-display text-[0.9375rem] italic text-foreground/70 leading-relaxed">
                    "Creating meaningful digital experiences, one project at a time."
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Strategic digital campaigns that reach the right audience and drive measurable results.",
  },
  {
    icon: User,
    title: "Content & Personal Branding",
    description:
      "Crafting authentic narratives that build trust, loyalty, and a memorable personal brand.",
  },
  {
    icon: BarChart2,
    title: "Campaign Strategy",
    description:
      "End-to-end campaign planning — from ideation and execution to analysis and optimization.",
  },
  {
    icon: Lightbulb,
    title: "Creative Marketing Ideas",
    description:
      "Fresh, inventive concepts that cut through noise and make brands stand out.",
  },
  {
    icon: Smile,
    title: "Lifestyle Content",
    description:
      "Relatable, value-driven lifestyle content that connects brands with real people.",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="py-28 px-6"
      style={{
        background:
          "linear-gradient(to bottom, oklch(0.97 0.008 60), oklch(0.95 0.015 55))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <FadeIn>
            <span className="section-eyebrow mb-5 block">What I Do</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl md:text-[3.25rem] font-semibold tracking-display text-foreground leading-[1.08]">
              Areas of Expertise
            </h2>
          </FadeIn>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={i * 0.08}>
                <div className="group h-full card-premium rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden">
                  {/* Decorative gradient shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta/0 to-terracotta/0 group-hover:from-terracotta/3 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />

                  {/* Icon — no circle, just raw icon with subtle underline */}
                  <div className="flex items-end gap-3">
                    <Icon size={26} className="text-terracotta" strokeWidth={1.5} />
                    <div className="flex-1 h-px bg-gradient-to-r from-terracotta/25 to-transparent mb-1" />
                  </div>

                  <div className="flex flex-col gap-2.5 flex-1">
                    <h3 className="font-display text-[1.1875rem] font-semibold text-foreground leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-[1.7]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Vision ───────────────────────────────────────────────── */
function Vision() {
  return (
    <section id="vision" className="py-28 px-6 relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.52 0.16 40 / 0.05), transparent)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <span className="section-eyebrow justify-center mb-6 flex">My Vision</span>
        </FadeIn>

        {/* Large decorative quote mark — refined size */}
        <FadeIn delay={0.05}>
          <div
            className="font-display leading-none text-terracotta/12 select-none -mb-4"
            style={{ fontSize: "clamp(80px, 12vw, 140px)" }}
          >
            "
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3rem] font-semibold tracking-display text-foreground leading-[1.2] mb-8">
            Building a brand that connects{" "}
            <span className="text-terracotta italic">lifestyle</span>,{" "}
            <span className="italic">creativity</span>, and digital marketing.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-[1.0625rem] text-muted-foreground leading-[1.8] max-w-2xl mx-auto mb-12">
            Through content and projects, I aim to grow, collaborate, and create
            meaningful digital experiences that resonate with people and leave a
            lasting impression.
          </p>
        </FadeIn>

        {/* Values row — refined pill style */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2.5">
            {["Authenticity", "Creativity", "Growth", "Collaboration", "Impact"].map(
              (value) => (
                <span
                  key={value}
                  className="px-5 py-2 rounded-full border border-terracotta/20 bg-terracotta/5 text-terracotta font-medium text-xs tracking-wide uppercase hover:bg-terracotta/10 transition-colors cursor-default"
                >
                  {value}
                </span>
              )
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Work ─────────────────────────────────────────────────── */
const PROJECTS = [
  {
    category: "Campaign",
    title: "Marketing Campaigns",
    description:
      "End-to-end execution of brand campaigns across digital channels — social, email, and paid media.",
    tag: "Strategy · Execution",
  },
  {
    category: "Creative",
    title: "Creative Concepts",
    description:
      "Developing original creative briefs, visual identities, and messaging frameworks for brands.",
    tag: "Ideation · Design",
  },
  {
    category: "Content",
    title: "Content Projects",
    description:
      "Long-form articles, short-form social content, and multimedia storytelling for lifestyle brands.",
    tag: "Writing · Storytelling",
  },
  {
    category: "Brand",
    title: "Brand Collaborations",
    description:
      "Partnering with brands on co-created content, joint campaigns, and influencer partnerships.",
    tag: "Partnership · Growth",
  },
];

function Work() {
  return (
    <section
      id="work"
      className="py-28 px-6"
      style={{
        background:
          "linear-gradient(to bottom, oklch(0.95 0.015 55), oklch(0.97 0.008 60))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <FadeIn>
            <span className="section-eyebrow mb-5 block">Work / Projects</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl md:text-[3.25rem] font-semibold tracking-display text-foreground mb-4 leading-[1.08]">
              Selected Work
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-muted-foreground text-[1.0625rem] leading-relaxed max-w-xl">
              A look at the types of work I've been involved in across
              marketing and creative projects.
            </p>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <div className="group card-premium rounded-2xl p-8 overflow-hidden h-full flex flex-col relative">
                {/* Gradient shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-terracotta/0 group-hover:to-terracotta/4 transition-all duration-500 pointer-events-none rounded-2xl" />
                {/* Top accent line — only visible on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta/0 via-terracotta/50 to-terracotta/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col h-full gap-4">
                  {/* Category badge — text only, no pill background */}
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta/60 shrink-0" />
                    <span className="text-[0.6875rem] font-semibold text-terracotta tracking-[0.12em] uppercase">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-[1.4375rem] font-semibold text-foreground mb-2.5 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-[1.7] text-sm">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[0.6875rem] font-medium text-muted-foreground tracking-wide">
                      {project.tag}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground/40 group-hover:text-terracotta group-hover:translate-x-0.5 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Blog helpers ─────────────────────────────────────────── */
function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Blog Post Card ───────────────────────────────────────── */
function BlogCard({
  post,
  onRead,
  isAdmin,
  onDelete,
}: {
  post: BlogPost;
  onRead: (post: BlogPost) => void;
  isAdmin: boolean;
  onDelete: (id: bigint) => void;
}) {
  const { isPending } = useDeletePost();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group card-premium rounded-2xl p-8 overflow-hidden flex flex-col relative cursor-pointer"
      onClick={() => onRead(post)}
    >
      {/* Gradient shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-terracotta/0 group-hover:to-terracotta/4 transition-all duration-500 pointer-events-none rounded-2xl" />
      {/* Hover top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta/0 via-terracotta/50 to-terracotta/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Category + date row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta/60 shrink-0" />
            <span className="text-[0.6875rem] font-semibold text-terracotta tracking-[0.12em] uppercase">
              {post.category}
            </span>
          </div>
          <span className="text-[0.6875rem] text-muted-foreground">
            {formatDate(post.createdAt)}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="font-display text-[1.4375rem] font-semibold text-foreground mb-2.5 leading-tight group-hover:text-terracotta transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground leading-[1.7] text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-5 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs font-medium text-terracotta flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            Read more
            <ChevronRight size={13} />
          </span>

          {/* Admin delete button */}
          {isAdmin && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(post.id);
              }}
              disabled={isPending}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Delete post"
            >
              {isPending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Blog Detail ──────────────────────────────────────────── */
function BlogDetail({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-terracotta transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        <ArrowLeft
          size={15}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Back to Blog
      </button>

      {/* Article header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <Badge
            variant="secondary"
            className="bg-terracotta/10 text-terracotta border-0 text-[0.6875rem] tracking-[0.08em] uppercase font-semibold"
          >
            {post.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-[2.75rem] font-semibold tracking-display text-foreground leading-[1.1] mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed italic border-l-2 border-terracotta/30 pl-4">
          {post.excerpt}
        </p>
      </header>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-terracotta/20 via-border to-transparent mb-10" />

      {/* Article body */}
      <article className="prose-blog">
        {post.content.split("\n\n").filter(Boolean).map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-[1.0625rem] text-foreground/85 leading-[1.85] mb-6 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </article>

      {/* Footer nav */}
      <div className="mt-14 pt-8 border-t border-border/60">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-terracotta transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to all posts
        </button>
      </div>
    </motion.div>
  );
}

/* ── New Post Form ────────────────────────────────────────── */
const BLOG_CATEGORIES = [
  "Lifestyle",
  "Digital Marketing",
  "Creativity",
  "Campaign Strategy",
  "Personal Branding",
  "Content",
];

function NewPostForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const { mutate, isPending } = useCreatePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) return;
    mutate(
      { title, content, excerpt, category },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="card-premium rounded-2xl p-8 mb-10 relative"
    >
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />

      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <PenLine size={18} className="text-terracotta" />
          <h3 className="font-display text-xl font-semibold text-foreground">
            New Blog Post
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close form"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="post-title" className="text-foreground font-medium text-sm">
              Title
            </Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your post title"
              required
              className="bg-background border-border focus:border-terracotta transition-colors h-11"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="post-category" className="text-foreground font-medium text-sm">
              Category
            </Label>
            <select
              id="post-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="post-excerpt" className="text-foreground font-medium text-sm">
            Excerpt{" "}
            <span className="text-muted-foreground font-normal">(short summary)</span>
          </Label>
          <Input
            id="post-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief summary of your post..."
            required
            className="bg-background border-border focus:border-terracotta transition-colors h-11"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="post-content" className="text-foreground font-medium text-sm">
            Content{" "}
            <span className="text-muted-foreground font-normal">(use blank lines for paragraphs)</span>
          </Label>
          <Textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here..."
            required
            rows={10}
            className="bg-background border-border focus:border-terracotta transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full px-8 h-11"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Plus size={16} className="mr-1.5" />
                Publish Post
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="rounded-full px-6 h-11 text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

/* ── Blog Section ─────────────────────────────────────────── */
function Blog({ isAdmin }: { isAdmin: boolean }) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: posts = [], isLoading } = useGetAllPosts();
  const { mutate: deletePost } = useDeletePost();

  const handleDelete = (id: bigint) => {
    deletePost(id, {
      onSuccess: () => {
        if (selectedPost?.id === id) setSelectedPost(null);
      },
    });
  };

  return (
    <section id="blog" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <FadeIn>
              <span className="section-eyebrow mb-5 block">Blog</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl md:text-[3.25rem] font-semibold tracking-display text-foreground mb-4 leading-[1.08]">
                Thoughts & Ideas
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-muted-foreground text-[1.0625rem] leading-relaxed max-w-xl">
                Exploring lifestyle, creativity, and the world of digital
                marketing — one post at a time.
              </p>
            </FadeIn>
          </div>

          {/* Admin: add post button */}
          {isAdmin && !selectedPost && (
            <FadeIn delay={0.2}>
              <Button
                onClick={() => setShowForm((v) => !v)}
                className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full px-6 h-11 gap-2"
              >
                {showForm ? (
                  <>
                    <X size={15} />
                    Close Form
                  </>
                ) : (
                  <>
                    <Plus size={15} />
                    New Post
                  </>
                )}
              </Button>
            </FadeIn>
          )}
        </div>

        <AnimatePresence mode="wait">
          {selectedPost ? (
            /* ── Detail view ── */
            <BlogDetail
              key="detail"
              post={selectedPost}
              onBack={() => setSelectedPost(null)}
            />
          ) : (
            /* ── List view ── */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* New post form (admin) */}
              <AnimatePresence>
                {isAdmin && showForm && (
                  <NewPostForm key="form" onClose={() => setShowForm(false)} />
                )}
              </AnimatePresence>

              {/* Loading skeletons */}
              {isLoading && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(["sk-a", "sk-b", "sk-c"] as const).map((skId) => (
                    <div
                      key={skId}
                      className="card-premium rounded-2xl p-8 flex flex-col gap-4 animate-pulse"
                    >
                      <div className="flex justify-between">
                        <div className="h-3 w-20 bg-muted rounded-full" />
                        <div className="h-3 w-24 bg-muted rounded-full" />
                      </div>
                      <div className="h-6 w-3/4 bg-muted rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-muted rounded-full" />
                        <div className="h-3 w-5/6 bg-muted rounded-full" />
                        <div className="h-3 w-4/6 bg-muted rounded-full" />
                      </div>
                      <div className="pt-4 border-t border-border/60 h-3 w-16 bg-muted rounded-full" />
                    </div>
                  ))}
                </div>
              )}

              {/* Posts grid */}
              {!isLoading && posts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence>
                    {posts.map((post, i) => (
                      <motion.div
                        key={String(post.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                      >
                        <BlogCard
                          post={post}
                          onRead={setSelectedPost}
                          isAdmin={isAdmin}
                          onDelete={handleDelete}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && posts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-terracotta/8 mb-6">
                    <BookOpen
                      size={28}
                      className="text-terracotta/60"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    No posts yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    {isAdmin
                      ? 'Click "New Post" above to publish your first blog post.'
                      : "Check back soon — new content is on the way."}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────── */
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, isPending, isSuccess } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    mutate(
      { name, email, message },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setMessage("");
        },
      }
    );
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — info */}
          <div>
            <FadeIn>
              <span className="section-eyebrow mb-5 block">Contact</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl md:text-[3.25rem] font-semibold tracking-display text-foreground mb-6 leading-[1.08]">
                Let's Work Together
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                If you're interested in working together or discussing ideas,
                feel free to reach out. I'd love to hear from you.
              </p>
            </FadeIn>

            {/* Contact details */}
            <FadeIn delay={0.3}>
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <MapPin size={17} className="text-terracotta mt-1 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className="text-[0.6875rem] text-muted-foreground uppercase tracking-[0.12em] mb-0.5 font-medium">
                      Location
                    </p>
                    <p className="text-foreground font-medium text-[0.9375rem]">
                      Kottayam, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <Mail size={17} className="text-terracotta mt-1 shrink-0" strokeWidth={1.75} />
                  <div>
                    <p className="text-[0.6875rem] text-muted-foreground uppercase tracking-[0.12em] mb-0.5 font-medium">
                      Email
                    </p>
                    <a
                      href="mailto:jobsaji26@gmail.com"
                      className="text-foreground font-medium hover:text-terracotta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-[0.9375rem]"
                    >
                      jobsaji26@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — form */}
          <FadeIn delay={0.15}>
            <div className="card-premium rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-terracotta/15 flex items-center justify-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-terracotta"
                        aria-label="Success checkmark"
                        role="img"
                      >
                        <title>Success</title>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-foreground font-medium text-sm">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        autoComplete="name"
                        className="bg-background border-border focus:border-terracotta transition-colors h-11"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-foreground font-medium text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                        className="bg-background border-border focus:border-terracotta transition-colors h-11"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-foreground font-medium text-sm">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your project or idea..."
                        required
                        rows={5}
                        className="bg-background border-border focus:border-terracotta transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full h-12 text-base font-medium shadow-warm"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={16} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl font-semibold text-foreground">
            Job JS.
          </span>
          <span className="text-muted-foreground text-sm">
            Digital Marketer · Personal Brand
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground text-center">
          <span>© {year} Job JS. All rights reserved.</span>
          <span className="hidden sm:inline text-border">·</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:text-terracotta/80 transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── App ──────────────────────────────────────────────────── */

const LOGO_CLICK_THRESHOLD = 5;
const LOGO_CLICK_WINDOW_MS = 2000;

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const logoClicksRef = useRef<number[]>([]);

  const handleLogoClick = () => {
    const now = Date.now();
    // Keep only clicks within the time window
    logoClicksRef.current = logoClicksRef.current.filter(
      (t) => now - t < LOGO_CLICK_WINDOW_MS
    );
    logoClicksRef.current.push(now);

    if (logoClicksRef.current.length >= LOGO_CLICK_THRESHOLD) {
      logoClicksRef.current = [];
      setIsAdmin((prev) => {
        const next = !prev;
        if (next) {
          // Scroll to blog section after admin mode activates
          setTimeout(() => {
            document.querySelector("#blog")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
        return next;
      });
    } else {
      // Default logo scroll-to-top behaviour
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen gradient-mesh">
      <Toaster position="top-right" />

      {/* Admin mode indicator */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-terracotta text-primary-foreground text-center text-xs font-semibold tracking-wide py-1.5 flex items-center justify-center gap-2"
          >
            <PenLine size={12} />
            Admin Mode Active — click the logo again 5× to exit
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isAdmin ? "pt-7" : ""}>
        <Navbar onLogoClick={handleLogoClick} />
        <main>
          <Hero />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Services />
          <div className="section-divider" />
          <Vision />
          <div className="section-divider" />
          <Work />
          <div className="section-divider" />
          <Blog isAdmin={isAdmin} />
          <div className="section-divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
