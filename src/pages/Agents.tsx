import { useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ChevronsUpDown,
  AlertTriangle,
  Copy,
  Edit,
  Trash,
  ArrowDown,
  ArrowUp,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Agent, Brand, Company } from "@/lib/types";
import {
  currentCompany,
  getAgentsByCompany,
  getBrandsByCompany,
} from "@/lib/data";

const filterOptions = [
  { label: "Todos", value: "all" },
  { label: "Activos", value: "active" },
  { label: "Inactivos", value: "inactive" },
];

const sortOptions = [
  { label: "Nombre (A-Z)", value: "name_asc" },
  { label: "Nombre (Z-A)", value: "name_desc" },
  { label: "Fecha de creación (Más reciente)", value: "created_at_desc" },
  { label: "Fecha de creación (Más antiguo)", value: "created_at_asc" },
];

const agentSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  brandId: z.string().uuid({
    message: "Por favor, selecciona una marca válida.",
  }),
  active: z.boolean().default(true),
});

const brandSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  category: z.string().min(2, {
    message: "La categoría debe tener al menos 2 caracteres.",
  }),
});

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name_asc");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isAgentDialogOpen, setAgentDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isNewAgentDialogOpen, setNewAgentDialogOpen] = useState(false);
  const [isNewBrandDialogOpen, setNewBrandDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const companyAgents = currentCompany
    ? getAgentsByCompany(currentCompany.id)
    : [];
  const companyBrands = currentCompany
    ? getBrandsByCompany(currentCompany.id)
    : [];

  const filteredAgents = companyAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAndFilteredAgents = filteredAgents.sort((a, b) => {
    switch (sort) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "created_at_desc":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "created_at_asc":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  }).filter((agent) => {
    if (filter === "active") {
      return agent.active;
    }
    if (filter === "inactive") {
      return !agent.active;
    }
    return true;
  });

  const agentForm = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      description: "",
      brandId: "",
      active: true,
    },
  });

  const brandForm = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  const onSubmitAgent = (values: z.infer<typeof agentSchema>) => {
    console.log(values);
    toast({
      title: "Agente creado.",
      description: "Tu agente ha sido creado exitosamente.",
    });
    setNewAgentDialogOpen(false);
  };

  const onSubmitBrand = (values: z.infer<typeof brandSchema>) => {
    console.log(values);
    toast({
      title: "Marca creada.",
      description: "Tu marca ha sido creada exitosamente.",
    });
    setNewBrandDialogOpen(false);
  };

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="heading-1">Agentes</h1>
          <p className="text-muted-foreground">
            Gestiona tus agentes de inteligencia artificial
          </p>
        </div>
        <Button onClick={() => setNewAgentDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Agente
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-6">
        <div className="col-span-1 md:col-span-2">
          <Input
            type="search"
            placeholder="Buscar agentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-span-1 md:col-span-1">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por estado..." />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 md:col-span-1">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ordenar por..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Agentes Actuales</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView(view === "grid" ? "table" : "grid")}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {sortedAndFilteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No se encontraron agentes</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? "Prueba a ajustar tu término de búsqueda"
              : "Crea tu primer agente para comenzar"}
          </p>
          <Button onClick={() => setNewAgentDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Añadir Agente
          </Button>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="animate-fade-in card-hover h-full flex flex-col"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {agent.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedAgent(agent);
                        setAgentDialogOpen(true);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground line-clamp-3">
                  {agent.description}
                </CardDescription>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <Badge variant={agent.active ? "default" : "secondary"}>
                    {agent.active ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          <div
            className={
              view === "grid"
                ? "flex items-center justify-center min-h-[250px] border border-dashed rounded-lg animate-fade-in"
                : "flex items-center justify-center p-6 border border-dashed rounded-lg animate-fade-in"
            }
          >
            <Button variant="ghost" className="h-full w-full flex flex-col gap-2 p-6" onClick={() => setNewAgentDialogOpen(true)}>
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-lg font-medium">Añadir Nuevo Agente</span>
              <p className="text-sm text-muted-foreground px-4 max-w-[250px] mx-auto">
                Configura un nuevo agente de IA para tus necesidades específicas
              </p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.description}</TableCell>
                  <TableCell>
                    <Badge variant={agent.active ? "default" : "secondary"}>
                      {agent.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedAgent(agent);
                            setAgentDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará el agente{" "}
              {selectedAgent?.name} permanentemente de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Drawer open={isAgentDialogOpen} onOpenChange={setAgentDialogOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedAgent?.name}</DrawerTitle>
            <DrawerDescription>
              Información detallada sobre el agente seleccionado.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-4">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground">{selectedAgent?.description}</p>
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Información</h3>
            <ul className="list-none pl-0">
              <li className="py-2">
                <span className="font-semibold">Estado:</span>{" "}
                <Badge variant={selectedAgent?.active ? "default" : "secondary"}>
                  {selectedAgent?.active ? "Activo" : "Inactivo"}
                </Badge>
              </li>
              <li className="py-2">
                <span className="font-semibold">Fecha de creación:</span>{" "}
                {selectedAgent?.createdAt}
              </li>
            </ul>
          </div>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setAgentDialogOpen(false)}>
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={isNewAgentDialogOpen} onOpenChange={setNewAgentDialogOpen}>
        <DrawerContent>
          <Form {...agentForm}>
            <form onSubmit={agentForm.handleSubmit(onSubmitAgent)} className="space-y-8">
              <DrawerHeader>
                <DrawerTitle>Añadir Nuevo Agente</DrawerTitle>
                <DrawerDescription>
                  Crea un nuevo agente para tu empresa.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-6 pb-4">
                <FormField
                  control={agentForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del agente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={agentForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción del agente"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={agentForm.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una marca" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companyBrands.length > 0 ? (
                            companyBrands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="new" className="text-blue-500">
                              + Añadir Nueva Marca
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={agentForm.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Activo</FormLabel>
                        <FormDescription>
                          Establece si el agente está activo o inactivo.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter>
                <Button variant="outline" onClick={() => setNewAgentDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear</Button>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>

      <Drawer open={isNewBrandDialogOpen} onOpenChange={setNewBrandDialogOpen}>
        <DrawerContent>
          <Form {...brandForm}>
            <form onSubmit={brandForm.handleSubmit(onSubmitBrand)} className="space-y-8">
              <DrawerHeader>
                <DrawerTitle>Añadir Nueva Marca</DrawerTitle>
                <DrawerDescription>
                  Crea una nueva marca para tu empresa.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-6 pb-4">
                <FormField
                  control={brandForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la marca" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={brandForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción de la marca"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={brandForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="food">Alimentación</SelectItem>
                          <SelectItem value="technology">Tecnología</SelectItem>
                          <SelectItem value="finance">Finanzas</SelectItem>
                          <SelectItem value="entertainment">Entretenimiento</SelectItem>
                          <SelectItem value="other">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter>
                <Button variant="outline" onClick={() => setNewBrandDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear</Button>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>

      <Card className="flex items-center justify-center h-full border-dashed animate-fade-in">
        <Button
          variant="ghost"
          className="h-full w-full flex flex-col gap-2 py-12"
          onClick={() => setNewBrandDialogOpen(true)}
        >
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="text-lg font-medium">Añadir Nueva Marca</span>
          <p className="text-sm text-muted-foreground px-4 max-w-[250px] mx-auto">
            Crea una nueva marca para asociar con tus agentes
          </p>
        </Button>
      </Card>
    </div>
  );
};

export default Agents;
