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
      className="bg-card border border-border rounded-card overflow-hidden hover:shadow-card-hover transition-all flex flex-col group"
    >
      {/* Top: Photo + Business Name */}
      <div className="flex flex-col items-center pt-8 pb-5 px-6 border-b border-border bg-muted/30 relative">
        {/* Decorative quote mark */}
        <span
          className="absolute top-3 right-4 font-display text-6xl leading-none text-primary/10 select-none pointer-events-none group-hover:text-primary/15 transition-colors"
          aria-hidden="true"
        >
          &#8220;
        </span>

        {/* Photo / Logo */}
        {testimonial.photoUrl ? (
          <img
            src={testimonial.photoUrl}
            alt={testimonial.clientName}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 shadow-sm mb-3"
            onError={(e) => {
              // Fallback to initials if image fails
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const fallback = e.currentTarget
                .nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        {/* Initials fallback (shown when no photo or image fails) */}
        <div
          className={`w-16 h-16 rounded-full bg-primary/10 items-center justify-center flex-shrink-0 mb-3 ${
            testimonial.photoUrl ? "hidden" : "flex"
          }`}
          aria-hidden={!!testimonial.photoUrl}
        >
          <span className="text-primary font-display font-bold text-xl">
            {testimonial.clientName.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Business Name (headline) */}
        <h3 className="font-display font-semibold text-base text-foreground text-center leading-snug">
          {testimonial.clientName}
        </h3>
        {testimonial.clientTitle && (
          <p className="text-xs text-muted-foreground mt-0.5 text-center">
            {testimonial.clientTitle}
          </p>
        )}
      </div>

      {/* Bottom: Star rating + Review */}
      <div className="flex flex-col flex-1 gap-3 p-6">
        <StarRating rating={rating} />
        <blockquote className="text-foreground/80 text-sm leading-relaxed font-body italic flex-1">
          &ldquo;{testimonial.reviewText}&rdquo;
        </blockquote>
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
                className="bg-card border border-border rounded-card overflow-hidden"
              >
                <div className="flex flex-col items-center pt-8 pb-5 px-6 border-b border-border bg-muted/30 space-y-2">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="p-6 space-y-3">
                  <Skeleton className="h-3.5 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
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
