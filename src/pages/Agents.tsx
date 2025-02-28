import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  FileText,
  Filter,
  Globe,
  LayoutGrid,
  ListChecks,
  Plus,
  Search,
  Book,
  Plug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import AgentCard from "@/components/AgentCard";
import { currentCompany, getAgentsByCompany } from "@/lib/data";
import { Agent, AgentCategory, AgentType } from "@/lib/types";

const Agents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const companyAgents = currentCompany
    ? getAgentsByCompany(currentCompany.id)
    : [];

  const filteredAgents = companyAgents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" ? true : agent.type === typeFilter;
    const matchesStatus = statusFilter === "all" ? true : agent.status === statusFilter;
    const matchesCategory = categoryFilter === "all" ? true : agent.category === categoryFilter;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const agentTypes: AgentType[] = [
    "data-analysis",
    "content-creation",
    "document-review",
    "customer-support",
    "research",
    "custom",
  ];
  
  const agentCategories: AgentCategory[] = [
    "retail",
    "food",
    "technology",
    "finance",
    "entertainment",
    "other",
  ];

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
  
  const translateCategory = (category: string): string => {
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
        return "otros";
      default:
        return category;
    }
  };

  return (
    <div className="container py-6 max-w-7xl animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Agentes</h1>
          <p className="text-muted-foreground">
            Configura y gestiona tus agentes de IA para diferentes propósitos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/agents/create")}>
            <Plus className="mr-2 h-4 w-4" /> Crear Agente
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar agentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-start w-full md:w-auto">
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  {agentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {translateAgentType(type)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="configuring">Configurando</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {agentCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {translateCategory(category)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 sm:ml-auto mt-2 sm:mt-0">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
            >
              <ListChecks className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-center border rounded-lg bg-muted/10">
          <BrainCircuit className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No se encontraron agentes</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || typeFilter !== "all" || statusFilter !== "all" || categoryFilter !== "all"
              ? "Prueba a ajustar tus filtros o términos de búsqueda"
              : "Crea tu primer agente de IA para comenzar"}
          </p>
          <Button onClick={() => navigate("/agents/create")}>
            <Plus className="mr-2 h-4 w-4" /> Crear Agente
          </Button>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-4"
          }
        >
          {filteredAgents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              onClick={() => {
                // Aquí iría la lógica para navegar a los detalles del agente
                console.log("Ver detalles del agente:", agent.id);
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Agents;
