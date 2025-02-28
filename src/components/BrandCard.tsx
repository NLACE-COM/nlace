
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brand } from "@/lib/types";
import { Building2, ChevronRight, PlusCircle } from "lucide-react";
import { getAgentsByBrand } from "@/lib/data";

interface BrandCardProps {
  brand: Brand;
  onClick?: () => void;
  onAddAgent?: () => void;
}

const BrandCard = ({ brand, onClick, onAddAgent }: BrandCardProps) => {
  const brandAgents = getAgentsByBrand(brand.id);
  
  const getBrandCategoryColor = (category: string) => {
    switch (category) {
      case "retail":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "food":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "technology":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "finance":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "entertainment":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getBrandCategoryName = (category: string): string => {
    switch (category) {
      case "retail":
        return "retail";
      case "food":
        return "alimentación";
      case "technology":
        return "tecnología";
      case "finance":
        return "finanzas";
      case "entertainment":
        return "entretenimiento";
      case "other":
      default:
        return "otros";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border animate-fade-in h-full flex flex-col">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg line-clamp-1">{brand.name}</h3>
              <Badge className={`mt-1 capitalize ${getBrandCategoryColor(brand.category)}`}>
                {getBrandCategoryName(brand.category)}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClick}>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {brand.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Agentes asociados</h4>
            <span className="text-sm text-muted-foreground">{brandAgents.length}</span>
          </div>
          
          {brandAgents.length > 0 ? (
            <div className="space-y-2">
              {brandAgents.slice(0, 2).map((agent) => (
                <div key={agent.id} className="flex items-center p-2 bg-muted/50 rounded-md">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                    <span className="text-xs">{agent.name.substring(0, 1)}</span>
                  </div>
                  <span className="text-sm font-medium line-clamp-1">{agent.name}</span>
                </div>
              ))}
              
              {brandAgents.length > 2 && (
                <div className="text-sm text-center text-muted-foreground">
                  +{brandAgents.length - 2} más
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Sin agentes asociados</p>
              <Button variant="outline" size="sm" onClick={onAddAgent}>
                <PlusCircle className="h-4 w-4 mr-1" /> Añadir agente
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandCard;
