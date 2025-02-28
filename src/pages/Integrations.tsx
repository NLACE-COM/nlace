
import { useState } from "react";
import {
  Facebook,
  FileText,
  Globe,
  Instagram,
  Linkedin,
  Baseline,
  Twitter,
  MessageSquare,
  ExternalLink,
  Search,
  ThumbsUp,
  ThumbsDown,
  Headphones,
  ShoppingBag,
  Phone,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

// Interface para las integraciones
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "pending";
  category: "social" | "marketing" | "data" | "productivity";
  connectedDate?: string;
  popularityScore: number;
}

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Lista de integraciones disponibles
  const integrationsList: Integration[] = [
    {
      id: "meta-ads",
      name: "Meta Ads",
      description: "Conecta y gestiona tus campañas publicitarias en Meta (Facebook, Instagram)",
      icon: <Facebook className="h-8 w-8 text-blue-600" />,
      status: "connected",
      category: "marketing",
      connectedDate: "2024-01-15",
      popularityScore: 92,
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Accede a documentos y archivos almacenados en Google Drive",
      icon: <FileText className="h-8 w-8 text-green-600" />,
      status: "disconnected",
      category: "productivity",
      popularityScore: 88,
    },
    {
      id: "instagram-business",
      name: "Instagram Business",
      description: "Gestiona tus cuentas profesionales de Instagram",
      icon: <Instagram className="h-8 w-8 text-pink-600" />,
      status: "connected",
      category: "social",
      connectedDate: "2024-02-20",
      popularityScore: 95,
    },
    {
      id: "facebook-pages",
      name: "Facebook Pages",
      description: "Administra tus páginas de Facebook y su contenido",
      icon: <Facebook className="h-8 w-8 text-blue-600" />,
      status: "connected",
      category: "social",
      connectedDate: "2024-02-10",
      popularityScore: 90,
    },
    {
      id: "x",
      name: "X",
      description: "Publica y analiza contenido en X (anteriormente Twitter)",
      icon: <Twitter className="h-8 w-8 text-black" />,
      status: "disconnected",
      category: "social",
      popularityScore: 82,
    },
    {
      id: "threads",
      name: "Threads",
      description: "Conecta tu cuenta de Threads para publicar y gestionar contenido",
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      status: "pending",
      category: "social",
      popularityScore: 75,
    },
    {
      id: "metricool",
      name: "Metricool",
      description: "Plataforma para analítica y programación de redes sociales",
      icon: <Baseline className="h-8 w-8 text-blue-500" />,
      status: "disconnected",
      category: "marketing",
      popularityScore: 78,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Conecta con perfiles profesionales y páginas de empresa",
      icon: <Linkedin className="h-8 w-8 text-blue-700" />,
      status: "connected",
      category: "social",
      connectedDate: "2024-03-05",
      popularityScore: 87,
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      description: "Convierte texto a voz de alta calidad con voces realistas para tus contenidos",
      icon: <Headphones className="h-8 w-8 text-purple-700" />,
      status: "disconnected",
      category: "marketing",
      popularityScore: 86,
    },
    {
      id: "shopify",
      name: "Shopify",
      description: "Integra tu tienda online para sincronizar productos y pedidos",
      icon: <ShoppingBag className="h-8 w-8 text-green-700" />,
      status: "pending",
      category: "data",
      popularityScore: 93,
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Conecta tu cuenta de WhatsApp Business para atención al cliente",
      icon: <Phone className="h-8 w-8 text-green-500" />,
      status: "disconnected",
      category: "social",
      popularityScore: 91,
    },
    {
      id: "blog",
      name: "Blog",
      description: "Publica y gestiona contenido en tu blog WordPress o similar",
      icon: <Bookmark className="h-8 w-8 text-blue-400" />,
      status: "disconnected",
      category: "marketing",
      popularityScore: 79,
    },
  ];

  // Filtramos las integraciones según la búsqueda y categoría seleccionada
  const filteredIntegrations = integrationsList.filter((integration) => {
    const matchesSearch = integration.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || integration.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Ordenamos las integraciones: primero conectadas, luego pendientes, y finalmente desconectadas
  const sortedIntegrations = [...filteredIntegrations].sort((a, b) => {
    const statusOrder = {
      connected: 0,
      pending: 1,
      disconnected: 2,
    };
    return statusOrder[a.status] - statusOrder[b.status] || b.popularityScore - a.popularityScore;
  });

  // Función para formatear fechas
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Función para renderizar el estado con colores y texto adecuados
  const renderStatus = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500">Conectado</Badge>;
      case "disconnected":
        return <Badge variant="outline">Desconectado</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pendiente</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Integraciones</h1>
          <p className="text-muted-foreground">
            Conecta aplicaciones externas para ampliar las capacidades de tus agentes
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar integraciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="productivity">Productividad</TabsTrigger>
          <TabsTrigger value="data">Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {sortedIntegrations.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
                <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No se encontraron integraciones</h3>
                <p className="text-muted-foreground mb-6">
                  No hay integraciones disponibles que coincidan con tu búsqueda
                </p>
              </div>
            ) : (
              sortedIntegrations.map((integration) => (
                <Card key={integration.id} className="animate-fade-in hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 border rounded-md flex items-center justify-center">
                      {integration.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        {renderStatus(integration.status)}
                      </div>
                      <CardDescription className="mt-1 line-clamp-2">{integration.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{integration.popularityScore}% popularidad</span>
                      </div>
                      {integration.status === "connected" && integration.connectedDate && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Conectado desde: {formatDate(integration.connectedDate)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                      {integration.status === "connected" && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Activo</span>
                          <Switch checked={true} />
                        </div>
                      )}
                    </div>
                    <Button 
                      variant={integration.status === "connected" ? "outline" : "default"}
                      className="gap-2"
                    >
                      {integration.status === "connected" ? "Configurar" : "Conectar"}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Contenido para las otras pestañas (mismo contenido pero filtrado) */}
        <TabsContent value="social" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {/* El contenido se filtrará automáticamente por categoría */}
          </div>
        </TabsContent>
        
        <TabsContent value="marketing" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {/* El contenido se filtrará automáticamente por categoría */}
          </div>
        </TabsContent>
        
        <TabsContent value="productivity" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {/* El contenido se filtrará automáticamente por categoría */}
          </div>
        </TabsContent>
        
        <TabsContent value="data" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {/* El contenido se filtrará automáticamente por categoría */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
