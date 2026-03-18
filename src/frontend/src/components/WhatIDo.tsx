import { BarChart2, Lightbulb, Megaphone, Palette, Share2 } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Megaphone,
    title: "Content Marketing",
    description:
      "Crafting stories that resonate. From blogs to video scripts, I create content that educates, entertains, and converts.",
  },
  {
    icon: Lightbulb,
    title: "Brand Strategy",
    description:
      "Defining who you are and how the world sees you. Positioning, voice, and visual identity that sets you apart.",
  },
  {
    icon: BarChart2,
    title: "Digital Campaigns",
    description:
      "Data-driven campaigns across platforms that deliver measurable results and real growth for your brand.",
  },
  {
    icon: Share2,
    title: "Social Media",
    description:
      "Building communities with intention. Strategic content calendars, engagement plans, and growth-focused execution.",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description:
      "Overseeing the visual and tonal language of campaigns — ensuring every element tells a cohesive, compelling story.",
  },
];

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight max-w-xl">
            What I Do
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border rounded-card p-7 hover:shadow-card-hover transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
