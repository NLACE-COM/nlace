
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
  // Function to get selected agent name
  const getSelectedAgentName = () => {
    const agent = agents.find(a => a.id === selectedAgent);
    return agent ? agent.name : "Select agent";
  };

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
          {/* Settings button */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Agent selector row */}
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        <Select value={selectedAgent} onValueChange={onAgentChange}>
          <SelectTrigger className="w-full sm:w-auto bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100">
            <Bot className="h-4 w-4 text-indigo-500 mr-2" />
            <SelectValue placeholder="Select agent" />
          </SelectTrigger>
          <SelectContent>
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
    </header>
  );
};

export default ChatHeader;
