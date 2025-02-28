import { useState } from "react";
import {
  BrainCircuit,
  Building2,
  Filter,
  LayoutGrid,
  ListChecks,
  Plus,
  Search,
  Briefcase,
  MoreHorizontal, // Importamos MoreHorizontal
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AgentCard from "@/components/AgentCard";
import BrandCard from "@/components/BrandCard";
import { currentCompany, getAgentsByCompany, getBrandsByCompany } from "@/lib/data";
import { Agent, AgentType, Brand, BrandCategory } from "@/lib/types";

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("agents");
  
  // Estado para diálogos
  const [newAgentDialogOpen, setNewAgentDialogOpen] = useState(false);
  const [newBrandDialogOpen, setNewBrandDialogOpen] = useState(false);
  
  // Estado para nuevos agentes/marcas
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentDescription, setNewAgentDescription] = useState("");
  const [newAgentType, setNewAgentType] = useState<AgentType>("custom");
  const [newAgentBrand, setNewAgentBrand] = useState("none");
  
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandDescription, setNewBrandDescription] = useState("");
  const [newBrandCategory, setNewBrandCategory] = useState<BrandCategory>("other");

  const companyAgents = currentCompany
    ? getAgentsByCompany(currentCompany.id)
    : [];
    
  const companyBrands = currentCompany
    ? getBrandsByCompany(currentCompany.id)
    : [];

  const filteredAgents = companyAgents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" ? true : agent.type === typeFilter;
    const matchesStatus = statusFilter === "all" ? true : agent.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const filteredBrands = companyBrands.filter((brand) => {
    const matchesSearch = brand.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" ? true : brand.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const agentTypes: AgentType[] = [
    "data-analysis",
    "content-creation",
    "document-review",
    "customer-support",
    "research",
    "custom",
  ];
  
  const brandCategories: BrandCategory[] = [
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
  
  const translateBrandCategory = (category: string): string => {
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
  
  const handleCreateAgent = () => {
    // Aquí iría la lógica para crear un nuevo agente
    console.log("Crear agente:", {
      name: newAgentName,
      description: newAgentDescription,
      type: newAgentType,
      brand: newAgentBrand !== "none" ? newAgentBrand : undefined
    });
    
    setNewAgentDialogOpen(false);
    resetNewAgentForm();
  };
  
  const handleCreateBrand = () => {
    // Aquí iría la lógica para crear una nueva marca
    console.log("Crear marca:", {
      name: newBrandName,
      description: newBrandDescription,
      category: newBrandCategory
    });
    
    setNewBrandDialogOpen(false);
    resetNewBrandForm();
  };
  
  const resetNewAgentForm = () => {
    setNewAgentName("");
    setNewAgentDescription("");
    setNewAgentType("custom");
    setNewAgentBrand("none");
  };
  
  const resetNewBrandForm = () => {
    setNewBrandName("");
    setNewBrandDescription("");
    setNewBrandCategory("other");
  };

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Agentes y Marcas</h1>
          <p className="text-muted-foreground">
            Configura y gestiona tus agentes de IA y sus marcas asociadas
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={newAgentDialogOpen} onOpenChange={setNewAgentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Crear Agente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear nuevo agente</DialogTitle>
                <DialogDescription>
                  Crea un nuevo agente para tu empresa. Completa todos los campos requeridos.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select value={newAgentType} onValueChange={(value) => setNewAgentType(value as AgentType)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {agentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {translateAgentType(type)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="brand" className="text-right">
                    Marca
                  </Label>
                  <Select value={newAgentBrand} onValueChange={setNewAgentBrand}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una marca (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">Sin marca</SelectItem>
                        {companyBrands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    value={newAgentDescription}
                    onChange={(e) => setNewAgentDescription(e.target.value)}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateAgent}>Crear agente</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={newBrandDialogOpen} onOpenChange={setNewBrandDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Briefcase className="mr-2 h-4 w-4" /> Crear Marca
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear nueva marca</DialogTitle>
                <DialogDescription>
                  Crea una nueva marca para asociar con tus agentes.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="brandName" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="brandName"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Select value={newBrandCategory} onValueChange={(value) => setNewBrandCategory(value as BrandCategory)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {brandCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {translateBrandCategory(category)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="brandDescription" className="text-right pt-2">
                    Descripción
                  </Label>
                  <Textarea
                    id="brandDescription"
                    value={newBrandDescription}
                    onChange={(e) => setNewBrandDescription(e.target.value)}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateBrand}>Crear marca</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={activeTab === "agents" ? "Buscar agentes..." : "Buscar marcas..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
          <div className="flex items-center gap-2">
            {activeTab === "agents" ? (
              <>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px]">
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
                  <SelectTrigger className="w-[160px]">
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
              </>
            ) : (
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {brandCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {translateBrandCategory(category)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex gap-2 ml-auto">
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

      <Tabs defaultValue="agents" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2 mb-6">
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" /> Agentes
          </TabsTrigger>
          <TabsTrigger value="brands" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Marcas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="mt-0">
          {filteredAgents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
              <BrainCircuit className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No se encontraron agentes</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                  ? "Prueba a ajustar tus filtros o términos de búsqueda"
                  : "Crea tu primer agente de IA para comenzar"}
              </p>
              <Button onClick={() => setNewAgentDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Crear Agente
              </Button>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
              <div
                className={
                  view === "grid"
                    ? "flex items-center justify-center min-h-[250px] border border-dashed rounded-lg animate-fade-in"
                    : "flex items-center justify-center p-6 border border-dashed rounded-lg animate-fade-in"
                }
              >
                <Button variant="ghost" className="h-full w-full flex flex-col gap-4 p-6" onClick={() => setNewAgentDialogOpen(true)}>
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col items-center px-6 w-full">
                    <h3 className="text-lg font-medium mb-1">Añadir Nuevo Agente</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Configura un nuevo agente de IA para tus necesidades específicas
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="brands" className="mt-0">
          {filteredBrands.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No se encontraron marcas</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || categoryFilter !== "all"
                  ? "Prueba a ajustar tus filtros o términos de búsqueda"
                  : "Crea tu primera marca para comenzar"}
              </p>
              <Button onClick={() => setNewBrandDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Crear Marca
              </Button>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {filteredBrands.map((brand) => (
                <BrandCard 
                  key={brand.id} 
                  brand={brand} 
                  onClick={() => console.log("Ver detalles de marca:", brand.id)}
                  onAddAgent={() => {
                    setNewAgentDialogOpen(true);
                    setNewAgentBrand(brand.id);
                  }}
                />
              ))}
              <div
                className={
                  view === "grid"
                    ? "flex items-center justify-center min-h-[250px] border border-dashed rounded-lg animate-fade-in"
                    : "flex items-center justify-center p-6 border border-dashed rounded-lg animate-fade-in"
                }
              >
                <Button variant="ghost" className="h-full w-full flex flex-col gap-4 p-6" onClick={() => setNewBrandDialogOpen(true)}>
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col items-center px-6 w-full">
                    <h3 className="text-lg font-medium mb-1">Añadir Nueva Marca</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Crea una nueva marca para asociar con tus agentes
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agents;
