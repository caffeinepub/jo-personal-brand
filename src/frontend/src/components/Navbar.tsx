import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiLinkedin } from "react-icons/si";

interface NavbarProps {
  onLogoClick: () => void;
}

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "What I Do", href: "/what-i-do" },
  { label: "Vision", href: "/vision" },
  { label: "Work", href: "/work" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => {
    onLogoClick(); // admin panel trick
    navigate({ to: "/" }); // always go home
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-28 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          data-ocid="nav.link"
          className="select-none cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Job JS logo - go to home"
        >
          <img
            src="/assets/job_saji_digital_marketing_logo-019d4e9d-70c3-73b3-834e-5cb8490a3af0.png"
            alt="Job JS logo"
            className="h-24 w-auto"
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              data-ocid="nav.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-sm font-medium text-primary" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/in/jobsaji/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.link"
            aria-label="LinkedIn profile"
            className="text-muted-foreground hover:text-[#0A66C2] transition-colors"
          >
            <SiLinkedin size={18} />
          </a>
          <a
            href="https://www.facebook.com/share/1GSLqhtQL1/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.link"
            aria-label="Facebook profile"
            className="text-muted-foreground hover:text-[#1877F2] transition-colors"
          >
            <SiFacebook size={18} />
          </a>
          <Link to="/contact">
            <Button
              size="sm"
              data-ocid="nav.primary_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5"
            >
              Work With Me
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className="text-base font-medium text-foreground hover:text-primary transition-colors"
                activeProps={{
                  className: "text-base font-medium text-primary",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/jobsaji/"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.link"
              className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-[#0A66C2] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <SiLinkedin size={18} />
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/share/1GSLqhtQL1/"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.link"
              className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-[#1877F2] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <SiFacebook size={18} />
              Facebook
            </a>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <Button
                data-ocid="nav.primary_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full"
              >
                Work With Me
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
