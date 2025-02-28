
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
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Bot,
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const llmModels = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
    { id: "grok-1", name: "Grok", provider: "xAI" },
    { id: "deepseek", name: "DeepSeek", provider: "DeepSeek" },
  ];

  // Ejemplos de conversaciones activas
  const activeConversations = [
    {
      id: "chat1",
      title: "Análisis financiero Q2",
      preview: "¿Puedes analizar los resultados del segundo trimestre?",
      timestamp: "10:30 AM",
      model: "GPT-4",
      messages: [
        {
          id: "1",
          content: "¿Puedes analizar los resultados financieros del segundo trimestre y destacar las áreas de crecimiento?",
          sender: "user",
          timestamp: "10:30 AM"
        },
        {
          id: "2",
          content: "He analizado los resultados del Q2. Veo un crecimiento del 15% en ingresos por servicios digitales, mientras que los costos operativos se han reducido un 5%. Las áreas con mayor potencial son el segmento de comercio electrónico y los servicios de consultoría. ¿Te gustaría un desglose más detallado de algún área específica?",
          sender: "ai",
          timestamp: "10:31 AM"
        }
      ]
    },
    {
      id: "chat2",
      title: "Plan de marketing digital",
      preview: "Quiero crear una campaña para redes sociales...",
      timestamp: "Ayer",
      model: "Claude 3",
      messages: [
        {
          id: "1",
          content: "Quiero crear una campaña para redes sociales que aumente nuestro engagement en un 20% en los próximos 3 meses. ¿Puedes ayudarme?",
          sender: "user",
          timestamp: "Ayer"
        },
        {
          id: "2",
          content: "Para aumentar el engagement en un 20% en 3 meses, recomendaría una estrategia con estos componentes: 1) Contenido de formato corto en TikTok y Reels con tendencias actuales, 2) Publicaciones interactivas semanales (encuestas, cuestionarios), 3) Colaboraciones con micro-influencers del sector, y 4) Una campaña de hashtag único. ¿Te gustaría que desarrolle alguno de estos puntos?",
          sender: "ai",
          timestamp: "Ayer"
        }
      ]
    },
    {
      id: "chat3",
      title: "Optimización de procesos internos",
      preview: "Necesitamos mejorar el flujo de trabajo...",
      timestamp: "Lun 15",
      model: "Gemini Pro",
      messages: [
        {
          id: "1",
          content: "Necesitamos mejorar el flujo de trabajo entre los departamentos de desarrollo y marketing. ¿Qué herramientas y procesos recomiendas?",
          sender: "user",
          timestamp: "Lun 15"
        },
        {
          id: "2",
          content: "Para mejorar la colaboración entre desarrollo y marketing, recomendaría: 1) Implementar una herramienta de gestión de proyectos como Asana o Jira con paneles compartidos, 2) Reuniones semanales de sincronización entre los equipos, 3) Un sistema de documentación centralizado como Notion, y 4) Definir SLAs claros para las solicitudes entre departamentos. La clave está en la transparencia y comunicación constante.",
          sender: "ai",
          timestamp: "Lun 15"
        }
      ]
    }
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

  // Obtener la conversación activa
  const getCurrentChat = () => {
    return activeConversations.find(chat => chat.id === activeChat) || null;
  };

  const currentChat = getCurrentChat();

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Sidebar colapsable */}
      <div 
        className={`border-r bg-card transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? "w-16" : "w-80"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className={`font-semibold ${sidebarCollapsed ? "hidden" : "block"}`}>Conversaciones</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          {activeConversations.map((chat) => (
            <div 
              key={chat.id} 
              className={`p-3 hover:bg-muted/50 cursor-pointer ${
                activeChat === chat.id ? "bg-muted" : ""
              } ${sidebarCollapsed ? "px-2" : ""}`}
              onClick={() => setActiveChat(chat.id)}
            >
              {sidebarCollapsed ? (
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                      <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {chat.model}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={`p-3 border-t ${sidebarCollapsed ? "flex justify-center" : ""}`}>
          <Button 
            className={`${sidebarCollapsed ? "w-10 h-10 rounded-full p-0" : "w-full"}`} 
            onClick={() => setActiveChat(null)}
          >
            {sidebarCollapsed ? (
              <MessageSquare className="h-5 w-5" />
            ) : (
              <>
                <MessageSquare className="h-4 w-4 mr-2" />
                Nueva conversación
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Área principal de chat */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 border-b">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">
              {currentChat ? currentChat.title : "Nueva conversación"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-[180px]">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <div className="p-4 space-y-4">
                  <h3 className="font-medium text-lg">Configuración</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Empresa</label>
                    <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
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
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {currentChat ? (
            <div className="space-y-6">
              {currentChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.sender === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Inicia una nueva conversación</h2>
              <p className="text-muted-foreground max-w-md">
                Comienza a chatear con nuestros modelos de IA para obtener respuestas, análisis y más.
              </p>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="relative rounded-xl border overflow-hidden mb-3">
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
        </div>
      </div>
    </div>
  );
};

export default Chat;
