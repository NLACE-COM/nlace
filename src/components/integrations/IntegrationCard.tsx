
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Integration } from "@/types/integration";

interface IntegrationCardProps {
  integration: Integration;
  formatDate: (date: string) => string;
}

const IntegrationCard = ({ integration, formatDate }: IntegrationCardProps) => {
  return (
    <Card className="animate-fade-in hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-3 p-4">
        <div className="p-2 border rounded-md flex items-center justify-center flex-shrink-0">
          {integration.icon}
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base md:text-lg truncate">
            {integration.name}
          </CardTitle>
          <CardDescription className="mt-1 line-clamp-2 text-xs">
            {integration.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        {integration.status === "connected" && integration.connectedDate && (
          <div className="text-xs text-muted-foreground">
            Conectado desde: {formatDate(integration.connectedDate)}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end mt-auto">
        <Button 
          variant={integration.status === "connected" ? "outline" : "default"}
          size="sm"
          className="gap-1 group transition-all duration-200 hover:scale-105"
        >
          {integration.status === "connected" ? "Configurar" : "Conectar"}
          <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationCard;
