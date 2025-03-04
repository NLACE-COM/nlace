
import React, { useState } from 'react';
import {
  PaperclipIcon,
  Send,
  Image,
  FileUp,
  Bot,
  User,
  AtSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatInputProps {
  selectedAgent: string;
  selectedCompany: string;
  agents: { id: string; name: string; avatar?: string }[];
  companies: { id: string; name: string; logo?: string }[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onAgentChange: (agentId: string) => void;
  onCompanyChange: (companyId: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  selectedAgent,
  selectedCompany,
  agents,
  companies,
  isLoading,
  onSendMessage,
  onAgentChange,
  onCompanyChange,
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
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Agent and company selectors */}
        <div className="flex flex-wrap gap-2">
          <Select value={selectedAgent} onValueChange={onAgentChange}>
            <SelectTrigger className="w-full sm:w-auto flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{agent.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={selectedCompany} onValueChange={onCompanyChange}>
            <SelectTrigger className="w-full sm:w-auto flex items-center gap-2">
              <AtSign className="h-4 w-4" />
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Message input */}
        <div className="flex items-end gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={isLoading}
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={isLoading}
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={isLoading}
            >
              <FileUp className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="rounded-full"
              disabled={!message.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
