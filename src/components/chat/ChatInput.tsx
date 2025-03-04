
import React, { useState } from 'react';
import {
  PaperclipIcon,
  Send,
  Image,
  FileUp,
  SearchCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isLoading,
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message input */}
        <div className="flex items-end gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 min-h-[80px] resize-none rounded-2xl border-slate-200 focus-visible:ring-indigo-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-indigo-600 hover:bg-indigo-700"
            disabled={!message.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100"
              disabled={isLoading}
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100"
              disabled={isLoading}
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100"
              disabled={isLoading}
            >
              <FileUp className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100"
            disabled={isLoading}
          >
            <SearchCode className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
