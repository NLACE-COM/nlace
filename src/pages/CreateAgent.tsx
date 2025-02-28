
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  BrainCircuit,
  Check,
  ChevronRight,
  FileCheck,
  FileText,
  HelpCircle,
  Image,
  Lightbulb,
  MessageSquare,
  Puzzle,
  Save,
  Settings,
  Trash,
  Upload,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { AgentCategory, AgentType } from "@/lib/types";

const CreateAgent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);

  // Estados para la información básica del agente
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<AgentType>("custom");
  const [category, setCategory] = useState<AgentCategory>("other");
  const [prompt, setPrompt] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Estados para la configuración avanzada
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [model, setModel] = useState("gpt-4");
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const [enableMemory, setEnableMemory] = useState(true);

  const agentTypes: { value: AgentType; label: string; description: string }[] = [
    { 
      value: "data-analysis", 
      label: "Análisis de Datos", 
      description: "Especializado en analizar datos complejos y generar insights"
    },
    { 
      value: "content-creation", 
      label: "Creación de Contenido", 
      description: "Optimizado para crear contenido atractivo para diferentes plataformas"
    },
    { 
      value: "document-review", 
      label: "Revisión de Documentos", 
      description: "Enfocado en revisar, resumir y extraer información de documentos"
    },
    { 
      value: "customer-support", 
      label: "Atención al Cliente", 
      description: "Diseñado para interactuar con clientes y resolver consultas"
    },
    { 
      value: "research", 
      label: "Investigación", 
      description: "Especializado en buscar información y realizar investigaciones"
    },
    { 
      value: "custom", 
      label: "Personalizado", 
      description: "Configuración personalizada para casos de uso específicos"
    },
  ];
  
  const agentCategories: { value: AgentCategory; label: string }[] = [
    { value: "retail", label: "Retail" },
    { value: "food", label: "Alimentación" },
    { value: "technology", label: "Tecnología" },
    { value: "finance", label: "Finanzas" },
    { value: "entertainment", label: "Entretenimiento" },
    { value: "other", label: "Otros" },
  ];

  const modelOptions = [
    { value: "gpt-4", label: "GPT-4", provider: "OpenAI" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI" },
    { value: "claude-3", label: "Claude 3", provider: "Anthropic" },
    { value: "gemini-pro", label: "Gemini Pro", provider: "Google" },
    { value: "llama-3", label: "Llama 3", provider: "Meta" },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
  };

  const handleCreateAgent = async () => {
    if (!name) {
      toast({
        title: "Error",
        description: "El nombre del agente es obligatorio",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulación de creación del agente
    setTimeout(() => {
      toast({
        title: "Agente creado",
        description: `El agente "${name}" ha sido creado con éxito`,
      });
      setLoading(false);
      navigate("/agents");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/agents");
  };

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/agents")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Crear Nuevo Agente</h1>
          <p className="text-muted-foreground">
            Configura un nuevo agente de IA para tus necesidades específicas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="basic" className="flex gap-2 items-center">
                <FileText className="h-4 w-4" /> Información Básica
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex gap-2 items-center">
                <Settings className="h-4 w-4" /> Configuración Avanzada
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex gap-2 items-center">
                <BrainCircuit className="h-4 w-4" /> Conocimiento
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                  <CardDescription>
                    Información principal de tu agente de IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start mb-2">
                    <div className="w-full md:w-auto flex-shrink-0">
                      <Label className="mb-2 block">Avatar del Agente</Label>
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border flex items-center justify-center">
                        {avatarPreview ? (
                          <>
                            <img 
                              src={avatarPreview} 
                              alt="Avatar Preview" 
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 rounded-full"
                              onClick={removeAvatar}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full bg-muted">
                            <User className="h-10 w-10 text-muted-foreground" />
                            <Input
                              type="file"
                              id="avatar-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={handleAvatarChange}
                            />
                            <Label
                              htmlFor="avatar-upload"
                              className="mt-2 text-xs text-primary hover:underline cursor-pointer"
                            >
                              Subir imagen
                            </Label>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Imagen recomendada: 256x256px
                      </p>
                    </div>
                    
                    <div className="flex-1 space-y-4 w-full">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Nombre <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Ej: Asistente de Marketing"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Un nombre descriptivo que identifique claramente la función del agente
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Descripción <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Ej: Agente especializado en crear contenido para redes sociales"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                        />
                        <p className="text-sm text-muted-foreground">
                          Una descripción detallada del propósito y capacidades del agente
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">
                        Tipo <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={type}
                        onValueChange={(value) => setType(value as AgentType)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {agentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        {agentTypes.find(t => t.value === type)?.description || "Selecciona un tipo de agente"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Categoría <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={category}
                        onValueChange={(value) => setCategory(value as AgentCategory)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {agentCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Categoría a la que pertenece este agente
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="prompt">Prompt del Sistema</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>
                              El prompt del sistema define el comportamiento del agente. 
                              Es una instrucción detallada sobre cómo debe responder y comportarse.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Textarea
                      id="prompt"
                      placeholder="Eres un asistente especializado en..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Instrucciones detalladas sobre cómo el agente debe comportarse y responder
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setActiveTab("advanced")}>
                    Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración Avanzada</CardTitle>
                  <CardDescription>
                    Ajusta los parámetros avanzados del modelo de IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="model">Modelo de IA</Label>
                      <Select value={model} onValueChange={setModel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {modelOptions.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{model.label}</span>
                                <Badge variant="outline">{model.provider}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        El modelo de IA que utilizará el agente para generar respuestas
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="temperature">Temperatura: {temperature}</Label>
                        <Input
                          id="temperature"
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={temperature}
                          onChange={(e) => setTemperature(parseFloat(e.target.value))}
                          className="w-64"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Controla la creatividad de las respuestas. Valores más bajos generan respuestas más precisas y deterministas, valores más altos producen respuestas más creativas y variadas.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Máximo de Tokens</Label>
                      <Input
                        id="max-tokens"
                        type="number"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        min={1}
                        max={4096}
                      />
                      <p className="text-sm text-muted-foreground">
                        El número máximo de tokens que el modelo puede generar en cada respuesta
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Capacidades Adicionales</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="web-search">Búsqueda Web</Label>
                        <p className="text-sm text-muted-foreground">
                          Permite al agente buscar información actualizada en internet
                        </p>
                      </div>
                      <Switch
                        id="web-search"
                        checked={enableWebSearch}
                        onCheckedChange={setEnableWebSearch}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="memory">Memoria Contextual</Label>
                        <p className="text-sm text-muted-foreground">
                          Permite al agente recordar conversaciones previas
                        </p>
                      </div>
                      <Switch
                        id="memory"
                        checked={enableMemory}
                        onCheckedChange={setEnableMemory}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("basic")}>
                    Anterior
                  </Button>
                  <Button onClick={() => setActiveTab("knowledge")}>
                    Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bases de Conocimiento</CardTitle>
                  <CardDescription>
                    Conecta bases de conocimiento para que tu agente pueda acceder a información específica
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-6 flex flex-col items-center justify-center text-center">
                    <BrainCircuit className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay bases de conocimiento conectadas</h3>
                    <p className="text-muted-foreground mb-4">
                      Añade bases de conocimiento para que tu agente pueda utilizar información específica al responder consultas.
                    </p>
                    <Button className="mt-2">
                      Añadir Base de Conocimiento
                    </Button>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq">
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                          <span>Preguntas Frecuentes</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 px-4">
                          <p className="text-muted-foreground">
                            Las bases de conocimiento permiten a tu agente acceder a información específica y personalizada al responder preguntas.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Check className="h-3 w-3" />
                              </div>
                              <p className="text-sm">Sube documentos PDF, Word o texto para crear una base de conocimiento.</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Check className="h-3 w-3" />
                              </div>
                              <p className="text-sm">El agente podrá responder preguntas basadas en el contenido de los documentos.</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Check className="h-3 w-3" />
                              </div>
                              <p className="text-sm">Puedes añadir múltiples bases de conocimiento a un mismo agente.</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("advanced")}>
                    Anterior
                  </Button>
                  <Button onClick={handleCreateAgent} disabled={loading} className="min-w-32">
                    {loading ? "Creando..." : "Crear Agente"}
                    {!loading && <Save className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
              <CardDescription>
                Así se verá tu agente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BrainCircuit className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{name || "Nombre del Agente"}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline">
                        {agentTypes.find(t => t.value === type)?.label || "Tipo"}
                      </Badge>
                      <Badge variant="outline">
                        {agentCategories.find(c => c.value === category)?.label || "Categoría"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {description || "Descripción del agente que explica sus capacidades y propósito"}
                </p>
                <div className="mt-4 flex justify-between gap-2 border-t pt-3">
                  <div className="flex gap-1 items-center text-sm">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>0 conversaciones</span>
                  </div>
                  <div className="flex gap-1 items-center text-sm">
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                    <span>0 KB conectados</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3">
              <div className="flex items-start gap-2 w-full p-3 border rounded-md">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Consejos para crear un buen agente</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                    <li className="flex items-start gap-1">
                      <span className="text-primary font-bold">•</span>
                      <span>Usa nombres descriptivos que indiquen claramente la función</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-primary font-bold">•</span>
                      <span>Proporciona un prompt detallado con instrucciones claras</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-primary font-bold">•</span>
                      <span>Conecta bases de conocimiento relevantes para respuestas más precisas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
