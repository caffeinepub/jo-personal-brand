import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { toast } from "sonner";

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
