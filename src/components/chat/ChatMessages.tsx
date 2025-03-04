
import React from 'react';
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((msg) => (
        <ChatMessage 
          key={msg.id}
          content={msg.content}
          sender={msg.sender}
          timestamp={msg.timestamp}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
