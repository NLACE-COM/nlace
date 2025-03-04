
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchConversations, fetchConversation, fetchLLMModels, sendMessage } from "@/services/chatService";
import { toast } from "sonner";

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });
}

export function useConversation(conversationId: string | null) {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => conversationId ? fetchConversation(conversationId) : Promise.resolve(undefined),
    enabled: !!conversationId,
  });
}

export function useLLMModels() {
  return useQuery({
    queryKey: ["llmModels"],
    queryFn: fetchLLMModels,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      conversationId, 
      content, 
      model, 
      agentId, 
      companyId = "default-company" 
    }: { 
      conversationId: string; 
      content: string; 
      model: string; 
      agentId: string; 
      companyId?: string; 
    }) => {
      return sendMessage(conversationId, content, model, agentId, companyId);
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch the conversation query after sending a message
      queryClient.invalidateQueries({ queryKey: ["conversation", variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast.error("Error sending message. Please try again.");
    },
  });
}
