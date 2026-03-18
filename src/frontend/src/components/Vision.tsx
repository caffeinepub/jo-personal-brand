import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Vision() {
  return (
    <section
      id="vision"
      className="section-padding relative overflow-hidden"
      style={{ background: "oklch(0.26 0.03 48)" }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
        style={{ background: "oklch(0.58 0.14 35)", filter: "blur(60px)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10"
        style={{ background: "oklch(0.62 0.09 152)", filter: "blur(50px)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sparkles
            size={32}
            className="mx-auto mb-6"
            style={{ color: "oklch(0.72 0.12 38)" }}
          />
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: "oklch(0.72 0.12 38)" }}
          >
            My Vision
          </span>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-8"
            style={{ color: "oklch(0.97 0.015 78)" }}
          >
            A world where every brand has a soul — and every story finds its
            audience.
          </h2>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.72 0.02 55)" }}
          >
            I believe marketing is most powerful when it's human. My mission is
            to help brands and creators build authentic connections — not just
            followers or numbers, but communities that genuinely care. Every
            campaign I touch is a step toward a more creative, honest, and
            inspiring digital world.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
