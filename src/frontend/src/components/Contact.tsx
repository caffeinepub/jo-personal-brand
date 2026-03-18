import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiLinkedin } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitLead } from "../hooks/useQueries";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { mutateAsync: submitLead, isPending } = useSubmitLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitLead({ name, email, message });
      toast.success("Message sent! I'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're a brand looking for a fresh perspective, a creator
              ready to scale, or just want to talk ideas — I'd love to hear from
              you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <a
                  href="mailto:jobsaji26@gmail.com"
                  className="hover:text-foreground transition-colors text-sm"
                >
                  jobsaji26@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span className="text-sm">Kottayam, Kerala, India</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <SiLinkedin size={16} className="text-primary" />
                </div>
                <a
                  href="https://www.linkedin.com/in/jobsaji/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors text-sm"
                >
                  linkedin.com/in/jobsaji
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <SiFacebook size={16} className="text-primary" />
                </div>
                <a
                  href="https://www.facebook.com/share/1GSLqhtQL1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors text-sm"
                >
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              data-ocid="contact.panel"
              className="bg-card border border-border rounded-card p-8 shadow-card space-y-5"
            >
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">Your Name</Label>
                <Input
                  id="contact-name"
                  data-ocid="contact.input"
                  placeholder="Job JS"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  data-ocid="contact.input"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  placeholder="Tell me about your project, idea, or just say hi..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />{" "}
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
