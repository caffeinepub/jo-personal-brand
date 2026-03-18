import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="section-padding bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Decorative illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-square max-w-sm mx-auto rounded-[40%_60%_50%_50%/50%_40%_60%_50%] bg-gradient-to-br from-primary/20 via-accent/15 to-secondary flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl font-bold text-primary/20 select-none">
                  JJ
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent rounded-b-[inherit]" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:right-8 bg-card rounded-2xl px-5 py-3 shadow-card border border-border">
              <p className="font-display text-2xl font-semibold text-primary">
                5+
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Years Experience
              </p>
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
              About Job JS.
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
