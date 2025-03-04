
import React from 'react';
import { Sparkles, Settings, Menu, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LLMModel } from '@/types/chat';

interface ChatHeaderProps {
  title: string;
  selectedModel: string;
  isMobile: boolean;
  llmModels: LLMModel[];
  isLoading: boolean;
  onModelSelect: (modelId: string) => void;
  onMobileSidebarToggle: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  selectedModel,
  isMobile,
  llmModels,
  isLoading,
  onModelSelect,
  onMobileSidebarToggle
}) => {
  // Function to get selected model name
  const getSelectedModelName = () => {
    const model = llmModels.find(m => m.id === selectedModel);
    return model ? `${model.name}` : "Select model";
  };

  return (
    <header className="flex items-center justify-between p-4 border-b">
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
        {/* Model selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center" disabled={isLoading}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <>
                  <span className="hidden sm:inline">{getSelectedModelName()}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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

        {/* Settings button */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
