import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreatePost,
  useCreateTestimonial,
  useDeletePost,
  useDeleteTestimonial,
  useGetAllLeads,
  useGetAllPosts,
  useGetAllTestimonials,
} from "../hooks/useQueries";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

function BlogTab() {
  const { data: posts, isLoading } = useGetAllPosts();
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    try {
      await createPost({
        title,
        content,
        category: category || "General",
        excerpt: excerpt || title,
      });
      toast.success("Post published!");
      setTitle("");
      setExcerpt("");
      setCategory("");
      setContent("");
      setShowForm(false);
    } catch {
      toast.error("Failed to publish post.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deletePost(id);
      toast.success("Post deleted.");
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Blog Posts</h3>
        <Button
          size="sm"
          data-ocid="admin.open_modal_button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5"
        >
          <Plus size={14} />
          New Post
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          data-ocid="admin.panel"
          className="bg-muted/40 rounded-xl p-5 space-y-4 border border-border"
        >
          <h4 className="font-medium text-sm">New Post</h4>
          <div className="space-y-1.5">
            <Label htmlFor="post-title">Title *</Label>
            <Input
              id="post-title"
              data-ocid="admin.input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="post-category">Category</Label>
            <Input
              id="post-category"
              data-ocid="admin.input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Marketing, Lifestyle"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="post-excerpt">Excerpt</Label>
            <Input
              id="post-excerpt"
              data-ocid="admin.input"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="post-content">Content *</Label>
            <Textarea
              id="post-content"
              data-ocid="admin.textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              rows={6}
              required
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              data-ocid="admin.submit_button"
              disabled={isCreating}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full flex-1"
            >
              {isCreating ? (
                <>
                  <Loader2 size={14} className="animate-spin mr-1" />
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              data-ocid="admin.cancel_button"
              onClick={() => setShowForm(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading && (
        <div data-ocid="admin.loading_state" className="space-y-3">
          {[1, 2].map((n) => (
            <Skeleton key={n} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && (!posts || posts.length === 0) && (
        <div
          data-ocid="admin.empty_state"
          className="text-center py-8 text-muted-foreground text-sm"
        >
          No posts yet. Create your first post above.
        </div>
      )}

      {!isLoading && posts && posts.length > 0 && (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div
              key={String(post.id)}
              data-ocid={`admin.item.${i + 1}`}
              className="flex items-start justify-between gap-3 bg-card rounded-xl p-4 border border-border"
            >
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{post.title}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {post.category}
                </Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                data-ocid={`admin.delete_button.${i + 1}`}
                disabled={isDeleting}
                onClick={() => handleDelete(post.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                aria-label="Delete post"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LeadsTab() {
  const { data: leads, isLoading } = useGetAllLeads();

  const formatDate = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    if (ms === 0) return "No date";
    return new Date(ms).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold">Leads</h3>

      {isLoading && (
        <div data-ocid="admin.loading_state" className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && (!leads || leads.length === 0) && (
        <div
          data-ocid="admin.empty_state"
          className="text-center py-8 text-muted-foreground text-sm"
        >
          No leads yet. They'll appear here when someone contacts you.
        </div>
      )}

      {!isLoading && leads && leads.length > 0 && (
        <div className="space-y-3">
          {leads.map((lead, i) => (
            <div
              key={String(lead.id)}
              data-ocid={`admin.item.${i + 1}`}
              className="bg-card rounded-xl p-4 border border-border space-y-1"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm">{lead.name}</p>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatDate(lead.timestamp)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{lead.email}</p>
              <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                {lead.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <fieldset className="flex items-center gap-1" aria-label="Select rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          data-ocid="admin.toggle"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            size={20}
            className={
              star <= (hovered || value)
                ? "fill-primary text-primary"
                : "fill-muted text-muted-foreground/30"
            }
          />
        </button>
      ))}
    </fieldset>
  );
}

function TestimonialsTab() {
  const { data: testimonials, isLoading } = useGetAllTestimonials();
  const { mutateAsync: createTestimonial, isPending: isCreating } =
    useCreateTestimonial();
  const { mutateAsync: deleteTestimonial, isPending: isDeleting } =
    useDeleteTestimonial();

  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientTitle, setClientTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !reviewText.trim()) {
      toast.error("Client name and review are required.");
      return;
    }
    try {
      await createTestimonial({
        clientName,
        clientTitle,
        photoUrl: "",
        reviewText,
        rating: BigInt(rating),
      });
      toast.success("Testimonial added!");
      setClientName("");
      setClientTitle("");
      setReviewText("");
      setRating(5);
      setShowForm(false);
    } catch {
      toast.error("Failed to add testimonial.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted.");
    } catch {
      toast.error("Failed to delete testimonial.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Testimonials</h3>
        <Button
          size="sm"
          data-ocid="admin.open_modal_button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5"
        >
          <Plus size={14} />
          New Testimonial
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          data-ocid="admin.panel"
          className="bg-muted/40 rounded-xl p-5 space-y-4 border border-border"
        >
          <h4 className="font-medium text-sm">New Testimonial</h4>
          <div className="space-y-1.5">
            <Label htmlFor="t-client-name">Business / Client Name *</Label>
            <Input
              id="t-client-name"
              data-ocid="admin.input"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Riya Sharma or Acme Corp"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="t-client-title">Role / Tagline</Label>
            <Input
              id="t-client-title"
              data-ocid="admin.input"
              value={clientTitle}
              onChange={(e) => setClientTitle(e.target.value)}
              placeholder="e.g. CEO, Acme Corp or Digital Startup"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="t-review">Review *</Label>
            <Textarea
              id="t-review"
              data-ocid="admin.textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did they say about working with you?"
              rows={4}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Rating</Label>
            <StarPicker value={rating} onChange={setRating} />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              data-ocid="admin.submit_button"
              disabled={isCreating}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full flex-1"
            >
              {isCreating ? (
                <>
                  <Loader2 size={14} className="animate-spin mr-1" />
                  Saving...
                </>
              ) : (
                "Add Testimonial"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              data-ocid="admin.cancel_button"
              onClick={() => setShowForm(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading && (
        <div data-ocid="admin.loading_state" className="space-y-3">
          {[1, 2].map((n) => (
            <Skeleton key={n} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && (!testimonials || testimonials.length === 0) && (
        <div
          data-ocid="admin.empty_state"
          className="text-center py-8 text-muted-foreground text-sm"
        >
          No testimonials yet. Add your first client review above.
        </div>
      )}

      {!isLoading && testimonials && testimonials.length > 0 && (
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <div
              key={String(t.id)}
              data-ocid={`admin.item.${i + 1}`}
              className="flex items-start justify-between gap-3 bg-card rounded-xl p-4 border border-border"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-display font-semibold text-sm">
                    {t.clientName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="font-medium text-sm truncate">{t.clientName}</p>
                  {t.clientTitle && (
                    <p className="text-xs text-muted-foreground">
                      {t.clientTitle}
                    </p>
                  )}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={11}
                        className={
                          s <= Number(t.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground/30"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                data-ocid={`admin.delete_button.${i + 1}`}
                disabled={isDeleting}
                onClick={() => handleDelete(t.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                aria-label="Delete testimonial"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel({ open, onClose }: AdminPanelProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent data-ocid="admin.dialog" className="max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Admin Panel
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="blog">
          <TabsList className="w-full mb-4 grid grid-cols-3">
            <TabsTrigger
              value="blog"
              data-ocid="admin.tab"
              className="text-xs sm:text-sm"
            >
              Blog
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              data-ocid="admin.tab"
              className="text-xs sm:text-sm"
            >
              Leads
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              data-ocid="admin.tab"
              className="text-xs sm:text-sm"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="max-h-[60vh]">
            <TabsContent value="blog" className="mt-0 px-0.5 pb-2">
              <BlogTab />
            </TabsContent>
            <TabsContent value="leads" className="mt-0 px-0.5 pb-2">
              <LeadsTab />
            </TabsContent>
            <TabsContent value="testimonials" className="mt-0 px-0.5 pb-2">
              <TestimonialsTab />
            </TabsContent>
          </ScrollArea>
        </Tabs>
        <Button
          variant="outline"
          data-ocid="admin.close_button"
          onClick={onClose}
          className="w-full rounded-full mt-2"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
