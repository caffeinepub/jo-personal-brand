import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Post } from "../backend.d";
import { useGetAllPosts } from "../hooks/useQueries";

function PostCard({
  post,
  index,
  onClick,
}: { post: Post; index: number; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-ocid={`blog.item.${index + 1}`}
      onClick={onClick}
      className="bg-card border border-border rounded-card p-7 hover:shadow-card-hover transition-all cursor-pointer group"
    >
      <Badge
        variant="outline"
        className="text-xs mb-4 font-medium text-primary border-primary/30"
      >
        {post.category}
      </Badge>
      <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5">
        {post.excerpt}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Read more <ArrowRight size={14} />
      </span>
    </motion.article>
  );
}

export default function Blog() {
  const { data: posts, isLoading } = useGetAllPosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <section id="blog" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            Ideas &amp; Insights
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Blog
          </h2>
        </motion.div>

        {isLoading && (
          <div
            data-ocid="blog.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-card border border-border rounded-card p-7 space-y-3"
              >
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!posts || posts.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="blog.empty_state"
            className="text-center py-20"
          >
            <BookOpen
              size={40}
              className="mx-auto text-muted-foreground/40 mb-4"
            />
            <p className="font-display text-2xl text-muted-foreground mb-2">
              No posts yet
            </p>
            <p className="text-sm text-muted-foreground/70">
              Check back soon for ideas, insights, and stories.
            </p>
          </motion.div>
        )}

        {!isLoading && posts && posts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <PostCard
                key={String(post.id)}
                post={post}
                index={i}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Post reader dialog */}
      <Dialog
        open={!!selectedPost}
        onOpenChange={(o) => !o && setSelectedPost(null)}
      >
        <DialogContent
          data-ocid="blog.dialog"
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
        >
          <DialogHeader>
            <Badge
              variant="outline"
              className="w-fit text-xs mb-2 text-primary border-primary/30"
            >
              {selectedPost?.category}
            </Badge>
            <DialogTitle className="font-display text-2xl font-semibold leading-snug">
              {selectedPost?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
            {selectedPost?.content}
          </div>
          <Button
            variant="outline"
            data-ocid="blog.close_button"
            onClick={() => setSelectedPost(null)}
            className="mt-4 w-full rounded-full"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
