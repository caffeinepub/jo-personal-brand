import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquareQuote, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Testimonial } from "../backend.d";
import { useGetAllTestimonials } from "../hooks/useQueries";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: { testimonial: Testimonial; index: number }) {
  const rating = Number(testimonial.rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      data-ocid={`testimonials.item.${index + 1}`}
      className="bg-card border border-border rounded-card p-7 hover:shadow-card-hover transition-all flex flex-col gap-5 relative overflow-hidden group"
    >
      {/* Decorative large quote mark */}
      <span
        className="absolute top-4 right-5 font-display text-7xl leading-none text-primary/10 select-none pointer-events-none group-hover:text-primary/15 transition-colors"
        aria-hidden="true"
      >
        &#8220;
      </span>

      <StarRating rating={rating} />

      <blockquote className="relative text-foreground/80 text-sm leading-relaxed font-body italic flex-1">
        &ldquo;{testimonial.reviewText}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div
          className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-primary font-display font-semibold text-sm">
            {testimonial.clientName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-display font-semibold text-sm text-foreground leading-tight">
            {testimonial.clientName}
          </p>
          {testimonial.clientTitle && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {testimonial.clientTitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { data: testimonials, isLoading } = useGetAllTestimonials();

  return (
    <section id="testimonials" className="section-padding bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            Client Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            What Clients Say
          </h2>
        </motion.div>

        {isLoading && (
          <div
            data-ocid="testimonials.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-card border border-border rounded-card p-7 space-y-4"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!testimonials || testimonials.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="testimonials.empty_state"
            className="text-center py-20"
          >
            <MessageSquareQuote
              size={40}
              className="mx-auto text-muted-foreground/40 mb-4"
            />
            <p className="font-display text-2xl text-muted-foreground mb-2">
              Client reviews coming soon
            </p>
            <p className="text-sm text-muted-foreground/70">
              Testimonials from past clients will appear here.
            </p>
          </motion.div>
        )}

        {!isLoading && testimonials && testimonials.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={String(t.id)} testimonial={t} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
