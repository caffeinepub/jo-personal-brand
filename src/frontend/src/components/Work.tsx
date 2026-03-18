import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const projects = [
  {
    title: "KeralaGrow Organic",
    category: "Brand Strategy",
    description:
      "Rebranded an organic produce startup from Kottayam, crafting a visual identity and digital presence that grew their Instagram following by 3x in 6 months.",
    tags: ["Branding", "Social Media", "Content"],
    accent: "oklch(0.72 0.12 38)",
  },
  {
    title: "The Creative Brief",
    category: "Content Marketing",
    description:
      "A long-running newsletter series for marketing professionals — 12 issues, 2,400 subscribers, covering trends in creativity and digital strategy.",
    tags: ["Newsletter", "Content", "Email"],
    accent: "oklch(0.62 0.09 152)",
  },
  {
    title: "Spice Route Campaign",
    category: "Digital Campaigns",
    description:
      "End-to-end digital campaign for a Kerala tourism initiative — social ads, influencer coordination, and landing page copy that drove 40% higher engagement.",
    tags: ["Campaigns", "Tourism", "Ads"],
    accent: "oklch(0.58 0.14 35)",
  },
  {
    title: "Artisan's Circle",
    category: "Community Building",
    description:
      "Launched an online community for local artisans and craftspeople, connecting them with buyers across India through authentic storytelling and social content.",
    tags: ["Community", "Storytelling", "Social"],
    accent: "oklch(0.64 0.08 75)",
  },
];

export default function Work() {
  return (
    <section id="work" className="section-padding bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            My Work
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`work.item.${i + 1}`}
              className="bg-card border border-border rounded-card p-7 hover:shadow-card-hover transition-all group cursor-default"
            >
              <div
                className="w-full h-1 rounded-full mb-6 opacity-70"
                style={{ background: project.accent }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: project.accent }}
              >
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-semibold text-foreground mt-2 mb-3 flex items-start gap-2">
                {project.title}
                <ExternalLink
                  size={16}
                  className="text-muted-foreground mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
