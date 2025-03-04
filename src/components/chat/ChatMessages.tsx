
import React from 'react';
import ChatMessage from "@/components/ChatMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
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

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {isLoading ? (
        renderLoadingSkeletons()
      ) : (
        messages.map((msg) => (
          <ChatMessage 
            key={msg.id}
            content={msg.content}
            sender={msg.sender}
            timestamp={msg.timestamp}
          />
        ))
      )}
      {!isLoading && messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center">
            No messages in this conversation yet.<br />
            Start the conversation by sending a message.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
