/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        sage: {
          DEFAULT: "oklch(var(--sage))",
          foreground: "oklch(var(--sage-foreground))",
        },
        terracotta: {
          DEFAULT: "oklch(var(--terracotta))",
          foreground: "oklch(var(--terracotta-foreground))",
        },
      },
      boxShadow: {
        card: "0 2px 16px oklch(0.25 0.03 45 / 0.08), 0 1px 4px oklch(0.25 0.03 45 / 0.05)",
        "card-hover": "0 8px 32px oklch(0.25 0.03 45 / 0.14), 0 2px 8px oklch(0.25 0.03 45 / 0.08)",
        panel: "0 20px 60px oklch(0.25 0.03 45 / 0.20)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "14px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
