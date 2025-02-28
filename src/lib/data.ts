import { 
  Agent, 
  AgentType, 
  AgentCategory, 
  Company, 
  Conversation, 
  Integration, 
  KnowledgeBase, 
  Message, 
  Task, 
  User, 
  UsageMetrics
} from "./types";

export const users: User[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    avatar: "/placeholder.svg",
    tokensUsed: 45200,
    tokenLimit: 100000,
  },
  {
    id: "u2",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "manager",
    avatar: "/placeholder.svg",
    tokensUsed: 28500,
    tokenLimit: 75000,
  },
  {
    id: "u3",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    role: "user",
    avatar: "/placeholder.svg",
    tokensUsed: 12800,
    tokenLimit: 50000,
  },
  {
    id: "u4",
    name: "James Wilson",
    email: "james@example.com",
    role: "user",
    avatar: "/placeholder.svg",
    tokensUsed: 9500,
    tokenLimit: 50000,
  },
];

export const companies: Company[] = [
  {
    id: "c1",
    name: "Innovatech",
    logo: "/placeholder.svg",
    description: "Leading innovation in tech solutions",
    users: ["u1", "u2", "u3"],
    agents: ["a1", "a2", "a4"],
  },
  {
    id: "c2",
    name: "GreenEarth",
    logo: "/placeholder.svg",
    description: "Sustainable solutions for a better planet",
    users: ["u1", "u4"],
    agents: ["a3", "a5", "a6"],
  },
  {
    id: "c3",
    name: "FinEdge",
    logo: "/placeholder.svg",
    description: "Cutting-edge financial solutions",
    users: ["u1"],
    agents: [],
  },
];

export const agentIcons: Record<AgentType, string> = {
  "data-analysis": "BarChart",
  "content-creation": "FileText",
  "document-review": "FileSearch",
  "customer-support": "MessagesSquare",
  "research": "Search",
  "custom": "Settings",
};

export const agents: Agent[] = [
  {
    id: "a1",
    name: "DataMaster",
    description: "Analiza datos complejos de centros comerciales y genera insights",
    type: "data-analysis",
    status: "active",
    company: "c1",
    category: "retail",
    metrics: {
      tasksCompleted: 147,
      averageCompletionTime: 3.2,
      successRate: 96,
      usageHours: 234,
      tokensUsed: 28500,
      conversations: 42,
    },
    createdAt: "2023-09-15T10:30:00Z",
    icon: agentIcons["data-analysis"],
    active: true,
    knowledgeBases: ["kb1"],
    integrations: ["i1", "i2"],
  },
  {
    id: "a2",
    name: "ContentGen",
    description: "Crea contenido atractivo para los centros comerciales",
    type: "content-creation",
    status: "active",
    company: "c1",
    category: "retail",
    metrics: {
      tasksCompleted: 89,
      averageCompletionTime: 5.7,
      successRate: 92,
      usageHours: 178,
      tokensUsed: 18900,
      conversations: 35,
    },
    createdAt: "2023-10-05T14:20:00Z",
    icon: agentIcons["content-creation"],
    active: true,
    knowledgeBases: ["kb3"],
    integrations: [],
  },
  {
    id: "a3",
    name: "CheeTalker",
    description: "Agente de contenido de marca para Cheetos",
    type: "content-creation",
    status: "active",
    company: "c2",
    category: "food",
    metrics: {
      tasksCompleted: 73,
      averageCompletionTime: 4.5,
      successRate: 94,
      usageHours: 156,
      tokensUsed: 16700,
      conversations: 28,
    },
    createdAt: "2023-08-22T09:15:00Z",
    icon: agentIcons["content-creation"],
    active: true,
    knowledgeBases: [],
    integrations: ["i3"],
  },
  {
    id: "a4",
    name: "DocReviewer",
    description: "Revisa documentos para Arauco",
    type: "document-review",
    status: "inactive",
    company: "c1",
    category: "retail",
    metrics: {
      tasksCompleted: 112,
      averageCompletionTime: 2.8,
      successRate: 97,
      usageHours: 198,
      tokensUsed: 22100,
      conversations: 15,
    },
    createdAt: "2023-11-10T11:45:00Z",
    icon: agentIcons["document-review"],
    active: false,
    knowledgeBases: [],
    integrations: [],
  },
  {
    id: "a5",
    name: "PepsiContent",
    description: "Crea contenido para Pepsi enfocado en campañas digitales",
    type: "content-creation",
    status: "configuring",
    company: "c2",
    category: "food",
    metrics: {
      tasksCompleted: 42,
      averageCompletionTime: 6.1,
      successRate: 89,
      usageHours: 94,
      tokensUsed: 12300,
      conversations: 18,
    },
    createdAt: "2024-01-05T16:30:00Z",
    icon: agentIcons["content-creation"],
    active: false,
    knowledgeBases: [],
    integrations: [],
  },
  {
    id: "a6",
    name: "QuakerSupport",
    description: "Agente de atención al cliente para Quaker",
    type: "customer-support",
    status: "active",
    company: "c2",
    category: "food",
    metrics: {
      tasksCompleted: 56,
      averageCompletionTime: 4.2,
      successRate: 95,
      usageHours: 108,
      tokensUsed: 9800,
      conversations: 24,
    },
    createdAt: "2024-02-12T13:10:00Z",
    icon: agentIcons["customer-support"],
    active: true,
    knowledgeBases: ["kb2"],
    integrations: ["i4"],
  },
];

export const knowledgeBases: KnowledgeBase[] = [
  {
    id: "kb1",
    name: "Documentación Técnica",
    description: "Documentación técnica de todos nuestros productos",
    agent: "a1",
    documents: [
      {
        id: "d1",
        title: "Manual de Producto v2.5",
        type: "pdf",
        size: 1245,
        uploadedAt: "2023-11-10T11:45:00Z",
        url: "#",
      },
      {
        id: "d2",
        title: "Documentación API",
        type: "doc",
        size: 834,
        uploadedAt: "2023-12-15T09:30:00Z",
        url: "#",
      },
    ],
    createdAt: "2023-10-01T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "kb2",
    name: "Investigación Ambiental",
    description: "Documentos de investigación y datos sobre impacto ambiental",
    agent: "a6",
    documents: [
      {
        id: "d3",
        title: "Estudio de Impacto Climático 2023",
        type: "pdf",
        size: 3456,
        uploadedAt: "2023-09-05T15:20:00Z",
        url: "#",
      },
    ],
    createdAt: "2023-08-15T11:30:00Z",
    updatedAt: "2023-09-10T16:45:00Z",
  },
  {
    id: "kb3",
    name: "Materiales de Marketing",
    description: "Guías de marca y contenido de marketing",
    agent: "a2",
    documents: [
      {
        id: "d4",
        title: "Guías de Marca 2024",
        type: "pdf",
        size: 1678,
        uploadedAt: "2024-01-10T13:15:00Z",
        url: "#",
      },
      {
        id: "d5",
        title: "Plan de Campaña de Marketing",
        type: "doc",
        size: 723,
        uploadedAt: "2024-02-05T10:45:00Z",
        url: "#",
      },
    ],
    createdAt: "2023-12-20T09:15:00Z",
    updatedAt: "2024-02-10T11:30:00Z",
  },
];

export const integrations: Integration[] = [
  {
    id: "i1",
    name: "API de Análisis",
    type: "api",
    status: "active",
    agent: "a1",
    createdAt: "2023-10-15T10:00:00Z",
    icon: "LineChart",
  },
  {
    id: "i2",
    name: "Base de Datos SQL",
    type: "database",
    status: "active",
    agent: "a1",
    createdAt: "2023-11-20T14:30:00Z",
    icon: "Database",
  },
  {
    id: "i3",
    name: "Almacenamiento en Nube",
    type: "storage",
    status: "active",
    agent: "a3",
    createdAt: "2023-12-05T09:15:00Z",
    icon: "Cloud",
  },
  {
    id: "i4",
    name: "Servicio de Email",
    type: "email",
    status: "active",
    agent: "a6",
    createdAt: "2024-01-10T11:45:00Z",
    icon: "Mail",
  }
];

export const conversations: Conversation[] = [
  {
    id: "conv1",
    title: "Análisis financiero Q2",
    agent: "a1",
    user: "u1",
    messages: [
      {
        id: "m1",
        content: "¿Puedes analizar los resultados financieros del segundo trimestre y destacar las áreas de crecimiento?",
        sender: "user",
        timestamp: "2024-04-01T10:30:00Z",
        tokensUsed: 120,
      },
      {
        id: "m2",
        content: "He analizado los resultados del Q2. Veo un crecimiento del 15% en ingresos por servicios digitales, mientras que los costos operativos se han reducido un 5%. Las áreas con mayor potencial son el segmento de comercio electrónico y los servicios de consultoría. ¿Te gustaría un desglose más detallado de algún área específica?",
        sender: "agent",
        timestamp: "2024-04-01T10:31:00Z",
        tokensUsed: 350,
      }
    ],
    createdAt: "2024-04-01T10:30:00Z",
    updatedAt: "2024-04-01T10:31:00Z",
    tokensUsed: 470,
  },
  {
    id: "conv2",
    title: "Plan de marketing digital",
    agent: "a2",
    user: "u1",
    messages: [
      {
        id: "m3",
        content: "Quiero crear una campaña para redes sociales que aumente nuestro engagement en un 20% en los próximos 3 meses. ¿Puedes ayudarme?",
        sender: "user",
        timestamp: "2024-04-05T09:15:00Z",
        tokensUsed: 135,
      },
      {
        id: "m4",
        content: "Para aumentar el engagement en un 20% en 3 meses, recomendaría una estrategia con estos componentes: 1) Contenido de formato corto en TikTok y Reels con tendencias actuales, 2) Publicaciones interactivas semanales (encuestas, cuestionarios), 3) Colaboraciones con micro-influencers del sector, y 4) Una campaña de hashtag único. ¿Te gustaría que desarrolle alguno de estos puntos?",
        sender: "agent",
        timestamp: "2024-04-05T09:16:00Z",
        tokensUsed: 415,
      }
    ],
    createdAt: "2024-04-05T09:15:00Z",
    updatedAt: "2024-04-05T09:16:00Z",
    tokensUsed: 550,
  },
  {
    id: "conv3",
    title: "Optimización de procesos internos",
    agent: "a6",
    user: "u2",
    messages: [
      {
        id: "m5",
        content: "Necesitamos mejorar el flujo de trabajo entre los departamentos de desarrollo y marketing. ¿Qué herramientas y procesos recomiendas?",
        sender: "user",
        timestamp: "2024-04-15T14:20:00Z",
        tokensUsed: 140,
      },
      {
        id: "m6",
        content: "Para mejorar la colaboración entre desarrollo y marketing, recomendaría: 1) Implementar una herramienta de gestión de proyectos como Asana o Jira con paneles compartidos, 2) Reuniones semanales de sincronización entre los equipos, 3) Un sistema de documentación centralizado como Notion, y 4) Definir SLAs claros para las solicitudes entre departamentos. La clave está en la transparencia y comunicación constante.",
        sender: "agent",
        timestamp: "2024-04-15T14:22:00Z",
        tokensUsed: 480,
      }
    ],
    createdAt: "2024-04-15T14:20:00Z",
    updatedAt: "2024-04-15T14:22:00Z",
    tokensUsed: 620,
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Análisis de Ventas Trimestral",
    description: "Analizar datos de ventas del Q1 2024 e identificar tendencias",
    agent: "a1",
    status: "completed",
    createdAt: "2024-04-01T09:00:00Z",
    completedAt: "2024-04-01T12:30:00Z",
    result: "Análisis completado con 5 insights clave",
  },
  {
    id: "t2",
    title: "Publicación Semanal del Blog",
    description: "Crear un artículo sobre innovaciones tecnológicas recientes",
    agent: "a2",
    status: "in-progress",
    createdAt: "2024-04-05T10:15:00Z",
  },
  {
    id: "t3",
    title: "Informe de Impacto Ambiental",
    description: "Generar un informe sobre reducción de huella de carbono",
    agent: "a3",
    status: "pending",
    createdAt: "2024-04-06T14:30:00Z",
  },
  {
    id: "t4",
    title: "Revisión de Contrato",
    description: "Revisar el nuevo contrato de proveedor para problemas de cumplimiento",
    agent: "a4",
    status: "failed",
    createdAt: "2024-04-03T11:00:00Z",
    completedAt: "2024-04-03T11:45:00Z",
    result: "Falló debido a secciones faltantes del documento",
  },
];

export const usageMetrics: UsageMetrics = {
  totalUsers: 28,
  activeUsers: 18,
  totalConversations: 162,
  activeConversations: 14,
  totalTokensUsed: 125800,
  tokenUsageByDay: [
    { date: "2024-04-01", count: 5200 },
    { date: "2024-04-02", count: 6800 },
    { date: "2024-04-03", count: 4900 },
    { date: "2024-04-04", count: 7200 },
    { date: "2024-04-05", count: 6500 },
    { date: "2024-04-06", count: 3800 },
    { date: "2024-04-07", count: 2900 },
    { date: "2024-04-08", count: 8100 },
    { date: "2024-04-09", count: 7600 },
    { date: "2024-04-10", count: 9800 },
    { date: "2024-04-11", count: 10400 },
    { date: "2024-04-12", count: 8700 },
    { date: "2024-04-13", count: 5100 },
    { date: "2024-04-14", count: 4600 },
  ],
  conversationsByDay: [
    { date: "2024-04-01", count: 12 },
    { date: "2024-04-02", count: 15 },
    { date: "2024-04-03", count: 11 },
    { date: "2024-04-04", count: 14 },
    { date: "2024-04-05", count: 13 },
    { date: "2024-04-06", count: 9 },
    { date: "2024-04-07", count: 7 },
    { date: "2024-04-08", count: 16 },
    { date: "2024-04-09", count: 15 },
    { date: "2024-04-10", count: 18 },
    { date: "2024-04-11", count: 19 },
    { date: "2024-04-12", count: 17 },
    { date: "2024-04-13", count: 12 },
    { date: "2024-04-14", count: 10 },
  ],
};

export const currentUser = users[0]; // Admin user
export const currentCompany = companies[0]; // Innovatech

export const getAgentsByCompany = (companyId: string) => {
  return agents.filter(agent => agent.company === companyId);
};

export const getAgentById = (agentId: string) => {
  return agents.find(agent => agent.id === agentId);
};

export const getKnowledgeBasesByAgent = (agentId: string) => {
  return knowledgeBases.filter(kb => kb.agent === agentId);
};

export const getIntegrationsByAgent = (agentId: string) => {
  return integrations.filter(integration => integration.agent === agentId);
};

export const getConversationsByAgent = (agentId: string) => {
  return conversations.filter(conversation => conversation.agent === agentId);
};

export const getConversationsByUser = (userId: string) => {
  return conversations.filter(conversation => conversation.user === userId);
};

export const getUsersByCompany = (companyId: string) => {
  const company = companies.find(c => c.id === companyId);
  if (!company) return [];
  return users.filter(user => company.users.includes(user.id));
};

export const getTasksByAgent = (agentId: string) => {
  return tasks.filter(task => task.agent === agentId);
};

export const getKnowledgeBasesByCompany = (companyId: string) => {
  const companyAgents = getAgentsByCompany(companyId);
  const agentIds = companyAgents.map(agent => agent.id);
  return knowledgeBases.filter(kb => agentIds.includes(kb.agent));
};
