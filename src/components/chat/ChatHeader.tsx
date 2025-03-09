
import React from 'react';
import { Settings, Menu, FileSignature, BarChart, ClipboardCheck, Headphones, GitPullRequest, Search, MessagesSquare, FileSearch, Book } from 'lucide-react';
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
  agents: { id: string; name: string; avatar?: string; type?: string }[];
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
  // Function to get the appropriate icon for each agent
  const getAgentIcon = (type: string = '', name: string = '') => {
    // Asignar iconos específicos por nombre de agente
    if (name.includes("Revisor de Contratos")) return <FileSignature className="h-4 w-4" />;
    if (name.includes("Generador de Reportes")) return <BarChart className="h-4 w-4" />;
    if (name.includes("Creador de Notas")) return <ClipboardCheck className="h-4 w-4" />;
    if (name.includes("Asesor Técnico")) return <Headphones className="h-4 w-4" />;
    if (name.includes("Seguimiento")) return <GitPullRequest className="h-4 w-4" />;
    if (name.includes("Asistente de Investigación")) return <Search className="h-4 w-4" />;
    
    // Si no hay una correspondencia específica, usar el tipo
    switch (type) {
      case "data-analysis":
        return <BarChart className="h-4 w-4" />;
      case "content-creation":
        return <Book className="h-4 w-4" />;
      case "document-review":
        return <FileSearch className="h-4 w-4" />;
      case "customer-support":
        return <MessagesSquare className="h-4 w-4" />;
      case "research":
        return <Search className="h-4 w-4" />;
      default:
        return <FileSignature className="h-4 w-4" />;
    }
  };

  // Find the currently selected agent
  const selectedAgentData = agents.find(agent => agent.id === selectedAgent) || agents[0];

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
          {/* Agent selector - optimized for mobile */}
          <div className={isMobile ? "max-w-[100px]" : "max-w-[200px]"}>
            <Select value={selectedAgent} onValueChange={onAgentChange}>
              <SelectTrigger className="bg-apple-50 text-apple-700 border-apple-200 hover:bg-apple-100 w-full">
                <div className="flex items-center w-full">
                  <div className="text-apple-500 mr-1.5 flex-shrink-0">
                    {getAgentIcon(selectedAgentData?.type, selectedAgentData?.name)}
                  </div>
                  <SelectValue 
                    placeholder="Seleccionar agente" 
                    className={`truncate ${isMobile ? "sr-only" : ""}`} 
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-md">
                <SelectGroup>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center">
                        <span className="mr-2 flex-shrink-0 text-apple-500">
                          {getAgentIcon(agent.type, agent.name)}
                        </span>
                        <span className="truncate">{agent.name}</span>
                      </div>
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
