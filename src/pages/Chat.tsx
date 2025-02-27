
import { useState } from "react";
import {
  AtSign,
  BarChart3,
  ChevronDown,
  FileUp,
  Image,
  PaperclipIcon,
  Send,
  Settings,
  Sparkles,
  User,
  Command,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { agents, companies, users } from "@/lib/data";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id);

  const llmModels = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
    { id: "grok-1", name: "Grok", provider: "xAI" },
    { id: "deepseek", name: "DeepSeek", provider: "DeepSeek" },
  ];

  const handleSendMessage = () => {
    // Aquí iría la lógica para enviar el mensaje
    console.log("Enviando mensaje:", {
      content: message,
      model: selectedModel,
      agent: selectedAgent,
      company: selectedCompany,
    });
    setMessage("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file);
    }
  };

  // Función para obtener el nombre del modelo seleccionado
  const getSelectedModelName = () => {
    const model = llmModels.find(m => m.id === selectedModel);
    return model ? `${model.name}` : "Seleccionar modelo";
  };

  // Función para obtener el nombre del agente seleccionado
  const getSelectedAgentName = () => {
    const agent = agents.find(a => a.id === selectedAgent);
    return agent ? agent.name : "Seleccionar agente";
  };

  return (
    <div className="container py-6 max-w-7xl h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="heading-1">Chat</h1>
          <p className="text-muted-foreground">
            Interactúa con múltiples modelos de IA
          </p>
        </div>
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar empresa" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Empresas</SelectLabel>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-grow">
        {/* Panel lateral */}
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Empresa</label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Empresas</SelectLabel>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Agente</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar agente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Agentes</SelectLabel>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Modelo LLM</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modelos disponibles</SelectLabel>
                    {llmModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center">
                          <span>{model.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {model.provider}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Área principal de chat */}
        <Card className="md:col-span-3 flex flex-col">
          <Tabs defaultValue="chat" className="flex-grow">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="visualizacion">Visualización</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>

            <CardContent className="flex-grow overflow-auto">
              <TabsContent value="chat" className="mt-0 h-full">
                <div className="space-y-4 min-h-[400px]">
                  {/* Aquí irían los mensajes del chat */}
                  <div className="flex justify-center items-center h-full text-muted-foreground">
                    Comienza una nueva conversación
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visualizacion" className="mt-0">
                <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Visualización de datos</h3>
                    <p className="text-sm text-muted-foreground">
                      Los resultados con gráficos aparecerán aquí
                    </p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>

            <CardFooter className="border-t pt-4 flex flex-col items-stretch">
              <div className="relative rounded-xl border mb-3 overflow-hidden">
                <Textarea
                  placeholder="Escribe aquí lo que quieras..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] border-0 resize-none pr-12"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute bottom-2 right-2 rounded-full bg-primary/10 hover:bg-primary/20"
                  onClick={handleSendMessage}
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="h-9 w-9"
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  
                  {/* Selector de modelo */}
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="h-9 border-0 bg-secondary/40 hover:bg-secondary/60 px-3">
                      <div className="flex items-center gap-1.5">
                        <Command className="h-3.5 w-3.5" />
                        <span className="text-sm">{getSelectedModelName()}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Modelos disponibles</SelectLabel>
                        {llmModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div className="flex items-center">
                              <span>{model.name}</span>
                              <Badge variant="secondary" className="ml-2">
                                {model.provider}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Presiona <kbd className="rounded border bg-muted px-1 text-xs">⌘</kbd> <kbd className="rounded border bg-muted px-1 text-xs">↵</kbd> para enviar
                  </p>
                </div>
              </div>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
