
import React from 'react';
import { containsMarkdown } from '@/utils/contentUtils';
import FormattedText from '@/components/chat/FormattedText';
import MarkdownContent from '@/components/chat/MarkdownContent';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender, timestamp }) => {
  // Determine which content processor to use based on the message content
  const renderMessageContent = () => {
    if (containsMarkdown(content)) {
      return <MarkdownContent content={content} />;
    }
    return <FormattedText content={content} />;
  };

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          sender === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}
      >
        <div className="chat-message-content">
          {renderMessageContent()}
        </div>
        <div 
          className={`text-xs mt-1 ${
            sender === 'user' 
              ? 'text-primary-foreground/70' 
              : 'text-muted-foreground'
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
