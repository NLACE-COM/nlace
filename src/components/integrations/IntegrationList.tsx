
import { Globe } from "lucide-react";
import { Integration } from "@/types/integration";
import IntegrationCard from "./IntegrationCard";

interface IntegrationListProps {
  integrations: Integration[];
  formatDate: (date: string) => string;
}

const IntegrationList = ({ integrations, formatDate }: IntegrationListProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {integrations.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
          <Globe className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No se encontraron integraciones</h3>
          <p className="text-muted-foreground mb-6">
            No hay integraciones disponibles que coincidan con tu búsqueda
          </p>
        </div>
      ) : (
        integrations.map((integration) => (
          <IntegrationCard 
            key={integration.id} 
            integration={integration} 
            formatDate={formatDate} 
          />
        ))
      )}
    </div>
  );
};

export default IntegrationList;
