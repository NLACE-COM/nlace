
import React, { useState } from 'react';
import {
  PaperclipIcon,
  Send,
  Image,
  FileUp,
  SearchCode,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LLMModel } from '@/types/chat';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  selectedModel: string;
  llmModels: LLMModel[];
  onModelSelect: (modelId: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isLoading,
  onSendMessage,
  selectedModel,
  llmModels,
  onModelSelect
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

  // Function to get selected model name
  const getSelectedModelName = () => {
    const model = llmModels.find(m => m.id === selectedModel);
    return model ? `${model.name}` : "Select model";
  };

  return (
    <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message input with send button */}
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
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-indigo-300/50"
            disabled={!message.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Model selector and action buttons in one row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Model selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center bg-gray-50" disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
                <span className="mr-1">{getSelectedModelName()}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {llmModels.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onClick={() => onModelSelect(model.id)}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{model.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({model.provider})
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Action buttons moved to the right of the model selector */}
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
