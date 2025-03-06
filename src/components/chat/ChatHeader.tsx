
import React from 'react';
import { Settings, Menu, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LLMModel } from '@/types/chat';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatHeaderProps {
  title: string;
  selectedModel: string;
  selectedAgent: string;
  isMobile: boolean;
  llmModels: LLMModel[];
  agents: { id: string; name: string; avatar?: string }[];
  isLoading: boolean;
  onModelSelect: (modelId: string) => void;
  onAgentChange: (agentId: string) => void;
  onMobileSidebarToggle: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  selectedAgent,
  isMobile,
  agents,
  isLoading,
  onAgentChange,
  onMobileSidebarToggle
}) => {
  return (
    <header className="flex flex-col border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main header row */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileSidebarToggle}
              className="mr-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {isLoading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <h1 className="text-xl font-bold truncate">{title}</h1>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {/* Agent selector - fixed for mobile */}
          <div className={isMobile ? "max-w-[100px]" : "max-w-[200px]"}>
            <Select value={selectedAgent} onValueChange={onAgentChange}>
              <SelectTrigger className="bg-apple-50 text-apple-700 border-apple-200 hover:bg-apple-100 w-full">
                <Bot className="h-4 w-4 text-apple-500 mr-2 flex-shrink-0" />
                <SelectValue placeholder="Select agent" className="truncate" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectGroup>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {/* Settings button */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
