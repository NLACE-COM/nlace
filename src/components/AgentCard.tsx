
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent } from "@/lib/types";
import { BarChart, FileText, MessagesSquare, Settings, Search, FileSearch } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

const AgentCard = ({ agent, onClick }: AgentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "configuring":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case "data-analysis":
        return <BarChart className="h-6 w-6" />;
      case "content-creation":
        return <FileText className="h-6 w-6" />;
      case "document-review":
        return <FileSearch className="h-6 w-6" />;
      case "customer-support":
        return <MessagesSquare className="h-6 w-6" />;
      case "research":
        return <Search className="h-6 w-6" />;
      case "custom":
      default:
        return <Settings className="h-6 w-6" />;
    }
  };

  const translateAgentType = (type: string): string => {
    switch (type) {
      case "data-analysis":
        return "análisis de datos";
      case "content-creation":
        return "creación de contenido";
      case "document-review":
        return "revisión de documentos";
      case "customer-support":
        return "atención al cliente";
      case "research":
        return "investigación";
      case "custom":
        return "personalizado";
      default:
        return type.replace("-", " ");
    }
  };

  const translateStatus = (status: string): string => {
    switch (status) {
      case "active":
        return "activo";
      case "inactive":
        return "inactivo";
      case "configuring":
        return "configurando";
      default:
        return status;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border animate-fade-in h-full flex flex-col">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              {getAgentIcon(agent.type)}
            </div>
            <div>
              <h3 className="font-medium text-lg line-clamp-1">{agent.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {translateAgentType(agent.type)}
              </p>
            </div>
          </div>
          <Badge className={`ml-2 capitalize ${getStatusColor(agent.status)}`}>
            {translateStatus(agent.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {agent.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-muted/50 p-2 rounded">
            <p className="text-xs text-muted-foreground">Tareas</p>
            <p className="font-medium">{agent.metrics.tasksCompleted}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <p className="text-xs text-muted-foreground">Tasa de Éxito</p>
            <p className="font-medium">{agent.metrics.successRate}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={onClick} variant="outline" className="w-full">
          Gestionar Agente
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
