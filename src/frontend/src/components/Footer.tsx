import { SiFacebook, SiLinkedin } from "react-icons/si";

interface FooterProps {
  onLogoClick?: () => void;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "What I Do", href: "#what-i-do" },
  { label: "Vision", href: "#vision" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ onLogoClick }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-foreground text-background py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <button
              type="button"
              onClick={onLogoClick}
              className="font-display text-2xl font-semibold mb-3 cursor-pointer select-none hover:opacity-80 transition-opacity text-left"
              aria-label="Job JS logo"
            >
              Job JS.
            </button>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.72 0.02 55)" }}
            >
              Digital marketer from Kottayam, India. Building lifestyle brands
              with a digital mindset.
            </p>
            {/* Social */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/jobsaji/"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "oklch(0.35 0.02 48)" }}
              >
                <SiLinkedin size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/1GSLqhtQL1/"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "oklch(0.35 0.02 48)" }}
              >
                <SiFacebook size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "oklch(0.72 0.02 55)" }}
            >
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    className="text-sm transition-colors hover:opacity-100"
                    style={{ color: "oklch(0.72 0.02 55)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{
            borderColor: "oklch(0.35 0.02 48)",
            color: "oklch(0.58 0.02 55)",
          }}
        >
          <p>© {year} Job JS. All rights reserved.</p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
