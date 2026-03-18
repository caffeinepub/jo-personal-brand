import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="section-padding bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <img
                src="/assets/uploads/photo_2026-03-18_18-20-20-removebg-preview-1.png"
                alt="Job JS"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              About Me.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              Hey, I'm Job JS — a digital marketer based in Kottayam, India,
              with a deep passion for where creativity meets strategy. I believe
              the best brands aren't just seen — they're felt.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              Over the years, I've helped brands tell their stories
              authentically, build engaged communities, and create digital
              experiences that genuinely connect. My work lives at the
              intersection of lifestyle, creativity, and modern marketing.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              When I'm not crafting campaigns, you'll find me exploring ideas,
              writing, or chasing the next inspiration — because great marketing
              starts with a life worth living.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
