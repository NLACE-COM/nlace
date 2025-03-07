
import React from 'react';
import ChatMessage from "@/components/ChatMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { MessageSquarePlus } from "lucide-react";
import { agents } from "@/lib/data/agents";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  selectedAgent?: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, selectedAgent }) => {
  const { language } = useLanguage();
  
  // Find the selected agent name
  const agentName = selectedAgent ? 
    agents.find(agent => agent.id === selectedAgent)?.name || "Revisor de Contratos" : 
    "Revisor de Contratos";

  // Render loading skeletons
  const renderLoadingSkeletons = () => (
    Array(3).fill(0).map((_, index) => (
      <div 
        key={`skeleton-${index}`} 
        className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
      >
        <div 
          className={`max-w-[80%] rounded-lg p-3 ${
            index % 2 === 0 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}
        >
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
          <div className="mt-1">
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    ))
  );

  // Render empty state with inviting image/icon when no messages and not loading
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-32 h-32 bg-apple-50 rounded-full flex items-center justify-center mb-6 shadow-md">
        <MessageSquarePlus className="h-16 w-16 text-apple-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">Comienza una nueva conversación</h3>
      <p className="text-gray-500 max-w-md">
        Escribe un mensaje abajo para iniciar una conversación con <span className="font-medium text-apple-600">{agentName}</span>.
      </p>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {isLoading ? (
        renderLoadingSkeletons()
      ) : (
        messages.length > 0 ? (
          messages.map((msg) => (
            <ChatMessage 
              key={msg.id}
              content={msg.content}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))
        ) : (
          renderEmptyState()
        )
      )}
    </div>
  );
};

export default ChatMessages;
