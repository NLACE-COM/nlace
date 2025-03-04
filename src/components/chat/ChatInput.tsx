
import React, { useState } from 'react';
import { Send, PaperclipIcon, Image, Command, ArrowUp, FileUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { AtSign, BarChart3 } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
}

interface Company {
  id: string;
  name: string;
}

interface ChatInputProps {
  selectedAgent: string;
  selectedCompany: string;
  agents: Agent[];
  companies: Company[];
  onSendMessage: (message: string) => void;
  onAgentChange: (agentId: string) => void;
  onCompanyChange: (companyId: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  selectedAgent,
  selectedCompany,
  agents,
  companies,
  onSendMessage,
  onAgentChange,
  onCompanyChange,
}) => {
  const [message, setMessage] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file);
    }
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Function to get selected agent name
  const getSelectedAgentName = () => {
    const agent = agents.find(a => a.id === selectedAgent);
    return agent ? agent.name : "Seleccionar agente";
  };

  return (
    <footer className="p-4 border-t">
      <div className="flex flex-col space-y-2 max-w-4xl mx-auto">
        {/* Selectores de agente y compañía */}
        <div className="flex flex-wrap gap-2">
          <Select
            value={selectedAgent}
            onValueChange={onAgentChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <div className="flex items-center">
                  <AtSign className="mr-2 h-4 w-4" />
                  <span>{getSelectedAgentName()}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Agentes disponibles</SelectLabel>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedCompany}
            onValueChange={onCompanyChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>
                    {
                      companies.find((c) => c.id === selectedCompany)?.name ||
                        "Seleccionar compañía"
                    }
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Compañías</SelectLabel>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start space-x-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <PaperclipIcon className="h-5 w-5" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </Button>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Image className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSubmit}
              size="icon"
              className="flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <Command className="h-3 w-3 mr-1" />
              <span>+</span>
              <ArrowUp className="h-3 w-3 ml-1" />
              <span className="ml-1">para enviar</span>
            </Button>
          </div>
          <div>
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <FileUp className="h-3 w-3 mr-1" />
              <span>Subir archivos</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
