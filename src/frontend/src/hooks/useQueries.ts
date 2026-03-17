import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useActor } from "./useActor";

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactMessage(name, email, message);
    },
    onSuccess: () => {
      toast.success("Message sent! I'll get back to you soon.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });
}

export function useGetAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
      excerpt,
      category,
    }: {
      title: string;
      content: string;
      excerpt: string;
      category: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPost(title, content, excerpt, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post published!");
    },
    onError: () => {
      toast.error("Failed to publish post. Please try again.");
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted.");
    },
    onError: () => {
      toast.error("Failed to delete post. Please try again.");
    },
  });
}
