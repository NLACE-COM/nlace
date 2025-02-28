
import { Agent, AgentCategory, AgentStatus, AgentType, Company, KnowledgeBase, Task, User, UsageMetrics } from "./types";

// Empresas ficticias
export const companies: Company[] = [
  {
    id: "c1",
    name: "TechCorp",
    plan: "enterprise",
    logo: "/placeholder.svg",
    description: "Empresa líder en soluciones tecnológicas",
  },
  {
    id: "c2",
    name: "RetailPro",
    plan: "business",
    logo: "/placeholder.svg",
    description: "Plataforma de gestión para retail",
  },
  {
    id: "c3",
    name: "FoodDelivery",
    plan: "startup",
    logo: "/placeholder.svg",
    description: "Servicio de entrega de comida a domicilio",
  },
];

// Usuario actual ficticio
export const currentUser: User = {
  id: "u1",
  name: "Juan Pérez",
  email: "juan@techcorp.com",
  role: "admin",
  companyId: "c1",
  tokenLimit: 100000,
};

// Empresa actual ficticia
export const currentCompany: Company = companies[0];

// Agentes ficticios
export const agents: Agent[] = [
  {
    id: "a1",
    name: "ContentGen",
    description: "Genera contenido para redes sociales y blog",
    type: "content-creation",
    category: "retail",
    status: "active",
    model: "gpt-4",
    companyId: "c1",
    knowledgeBases: ["kb1"],
    integrations: ["i1", "i2"],
    createdAt: "2024-03-15T12:00:00Z",
    updatedAt: "2024-04-10T15:30:00Z",
    conversationCount: 245,
    avatar: "/lovable-uploads/7c7da80b-8043-4bd7-99ad-1d832e95d4da.png"
  },
  {
    id: "a2",
    name: "DataMaster",
    description: "Analiza datos y genera reportes detallados",
    type: "data-analysis",
    category: "technology",
    status: "active",
    model: "gpt-4",
    companyId: "c1",
    knowledgeBases: ["kb2"],
    integrations: ["i3"],
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-04-08T11:15:00Z",
    conversationCount: 189
  },
  {
    id: "a3",
    name: "CheeTalker",
    description: "Atención al cliente para empresas de alimentación",
    type: "customer-support",
    category: "food",
    status: "inactive",
    model: "gpt-3.5-turbo",
    companyId: "c3",
    knowledgeBases: [],
    integrations: [],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-03-05T14:20:00Z",
    conversationCount: 89
  },
  {
    id: "a4",
    name: "DocReviewer",
    description: "Revisa y analiza documentos legales",
    type: "document-review",
    category: "finance",
    status: "configuring",
    model: "claude-3",
    companyId: "c1",
    knowledgeBases: ["kb3"],
    integrations: ["i4"],
    createdAt: "2024-03-25T08:30:00Z",
    updatedAt: "2024-04-12T17:00:00Z",
    conversationCount: 127
  },
  {
    id: "a5",
    name: "ShopAssist",
    description: "Asistente de compras para tiendas online",
    type: "customer-support",
    category: "retail",
    status: "active",
    model: "gpt-4",
    companyId: "c2",
    knowledgeBases: ["kb4"],
    integrations: ["i1"],
    createdAt: "2024-02-05T14:00:00Z",
    updatedAt: "2024-04-01T10:45:00Z",
    conversationCount: 314
  },
  {
    id: "a6",
    name: "TrendHunter",
    description: "Investiga tendencias y oportunidades de mercado",
    type: "research",
    category: "entertainment",
    status: "active",
    model: "gemini-pro",
    companyId: "c1",
    knowledgeBases: [],
    integrations: ["i5"],
    createdAt: "2024-03-01T11:30:00Z",
    updatedAt: "2024-04-10T09:10:00Z",
    conversationCount: 76
  },
];

// Integraciones ficticias
export const integrations = [
  { id: "i1", name: "Slack", agentIds: ["a1", "a5"] },
  { id: "i2", name: "Gmail", agentIds: ["a1"] },
  { id: "i3", name: "Google Sheets", agentIds: ["a2"] },
  { id: "i4", name: "Dropbox", agentIds: ["a4"] },
  { id: "i5", name: "Twitter", agentIds: ["a6"] },
];

// Conversaciones ficticias
export const conversations = [
  { id: "c1", agentId: "a1", userId: "u2", messageCount: 34, date: "2024-04-12T09:15:00Z" },
  { id: "c2", agentId: "a1", userId: "u3", messageCount: 57, date: "2024-04-10T14:30:00Z" },
  { id: "c3", agentId: "a2", userId: "u1", messageCount: 23, date: "2024-04-11T11:20:00Z" },
  { id: "c4", agentId: "a3", userId: "u5", messageCount: 42, date: "2024-04-09T16:45:00Z" },
  { id: "c5", agentId: "a4", userId: "u2", messageCount: 19, date: "2024-04-08T10:30:00Z" },
  { id: "c6", agentId: "a5", userId: "u4", messageCount: 67, date: "2024-04-12T13:15:00Z" },
  { id: "c7", agentId: "a6", userId: "u1", messageCount: 15, date: "2024-04-11T17:40:00Z" },
];

// Tareas ficticias
export const tasks: Task[] = [
  {
    id: "t1",
    title: "Análisis de Ventas Trimestral",
    description: "Generar informe detallado de ventas Q1 2024",
    status: "completed",
    agent: "a2",
    createdAt: "2024-04-01T09:00:00Z",
    updatedAt: "2024-04-02T14:30:00Z",
  },
  {
    id: "t2",
    title: "Publicación Semanal del Blog",
    description: "Redactar artículo sobre tendencias de IA",
    status: "in-progress",
    agent: "a1",
    createdAt: "2024-04-10T10:00:00Z",
    updatedAt: "2024-04-10T15:00:00Z",
  },
  {
    id: "t3",
    title: "Informe de Impacto Ambiental",
    description: "Análisis de huella de carbono de la empresa",
    status: "pending",
    agent: "a3",
    createdAt: "2024-04-08T08:00:00Z",
    updatedAt: "2024-04-08T08:00:00Z",
  },
  {
    id: "t4",
    title: "Revisión de Contrato",
    description: "Revisión de contrato con proveedor",
    status: "failed",
    agent: "a4",
    createdAt: "2024-04-05T11:00:00Z",
    updatedAt: "2024-04-06T13:45:00Z",
  },
  {
    id: "t5",
    title: "Análisis de Sentimiento",
    description: "Análisis de sentimiento de comentarios de clientes",
    status: "completed",
    agent: "a2",
    createdAt: "2024-04-03T09:30:00Z",
    updatedAt: "2024-04-04T16:20:00Z",
  },
  {
    id: "t6",
    title: "Resumen de Noticias del Sector",
    description: "Compilación de noticias relevantes del sector tecnológico",
    status: "completed",
    agent: "a6",
    createdAt: "2024-04-07T08:15:00Z",
    updatedAt: "2024-04-07T17:00:00Z",
  },
];

// Bases de conocimiento ficticias
export const knowledgeBases: KnowledgeBase[] = [
  {
    id: "kb1",
    name: "Guías de Marketing",
    description: "Documentación sobre estrategias de marketing digital",
    companyId: "c1",
    documents: [
      {
        id: "d1",
        title: "Estrategia de Redes Sociales 2024",
        type: "pdf",
        size: 2560,
        uploadedAt: "2024-03-20T10:00:00Z",
      },
      {
        id: "d2",
        title: "Análisis de Competencia",
        type: "doc",
        size: 1845,
        uploadedAt: "2024-03-25T14:30:00Z",
      },
    ],
    createdAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-03-25T14:30:00Z",
  },
  {
    id: "kb2",
    name: "Datos Financieros",
    description: "Reportes financieros y KPIs de la empresa",
    companyId: "c1",
    documents: [
      {
        id: "d3",
        title: "Reporte Financiero Q1 2024",
        type: "pdf",
        size: 3250,
        uploadedAt: "2024-04-05T11:00:00Z",
      },
      {
        id: "d4",
        title: "Proyecciones Q2-Q4 2024",
        type: "xlsx",
        size: 980,
        uploadedAt: "2024-04-07T16:15:00Z",
      },
    ],
    createdAt: "2024-04-01T08:00:00Z",
    updatedAt: "2024-04-07T16:15:00Z",
  },
  {
    id: "kb3",
    name: "Documentación Legal",
    description: "Contratos y documentos legales",
    companyId: "c1",
    documents: [
      {
        id: "d5",
        title: "Términos y Condiciones",
        type: "pdf",
        size: 560,
        uploadedAt: "2024-03-28T09:30:00Z",
      },
      {
        id: "d6",
        title: "Política de Privacidad",
        type: "pdf",
        size: 420,
        uploadedAt: "2024-03-28T10:00:00Z",
      },
      {
        id: "d7",
        title: "Contrato de Servicio",
        type: "doc",
        size: 890,
        uploadedAt: "2024-04-02T14:45:00Z",
      },
    ],
    createdAt: "2024-03-28T09:00:00Z",
    updatedAt: "2024-04-02T14:45:00Z",
  },
  {
    id: "kb4",
    name: "Catálogo de Productos",
    description: "Información detallada de productos",
    companyId: "c2",
    documents: [
      {
        id: "d8",
        title: "Catálogo Primavera 2024",
        type: "pdf",
        size: 4500,
        uploadedAt: "2024-04-01T11:30:00Z",
      },
    ],
    createdAt: "2024-04-01T11:00:00Z",
    updatedAt: "2024-04-01T11:30:00Z",
  },
];

// Usuarios ficticios
export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "María López",
    email: "maria@techcorp.com",
    role: "manager",
    companyId: "c1",
    tokenLimit: 75000,
    activityCount: 87
  },
  {
    id: "u3",
    name: "Carlos Rodríguez",
    email: "carlos@techcorp.com",
    role: "user",
    companyId: "c1",
    tokenLimit: 50000,
    activityCount: 134
  },
  {
    id: "u4",
    name: "Ana Martínez",
    email: "ana@retailpro.com",
    role: "admin",
    companyId: "c2",
    tokenLimit: 100000,
    activityCount: 56
  },
  {
    id: "u5",
    name: "Javier Sánchez",
    email: "javier@fooddelivery.com",
    role: "admin",
    companyId: "c3",
    tokenLimit: 80000,
    activityCount: 42
  },
  {
    id: "u6",
    name: "Laura Gómez",
    email: "laura@techcorp.com",
    role: "user",
    companyId: "c1",
    tokenLimit: 50000,
    activityCount: 97
  },
  {
    id: "u7",
    name: "Miguel Fernández",
    email: "miguel@techcorp.com",
    role: "user",
    companyId: "c1",
    tokenLimit: 50000,
    activityCount: 76
  },
];

// Métricas de uso ficticias
export const usageMetrics: UsageMetrics = {
  totalTokensUsed: 45800,
  activeConversations: 28,
  totalUsers: 42,
  tokenUsageByDay: [
    { date: "2024-04-01", count: 3200 },
    { date: "2024-04-02", count: 2800 },
    { date: "2024-04-03", count: 3500 },
    { date: "2024-04-04", count: 4100 },
    { date: "2024-04-05", count: 3800 },
    { date: "2024-04-06", count: 2200 },
    { date: "2024-04-07", count: 1900 },
    { date: "2024-04-08", count: 3600 },
    { date: "2024-04-09", count: 3400 },
    { date: "2024-04-10", count: 4200 },
    { date: "2024-04-11", count: 3900 },
    { date: "2024-04-12", count: 3500 },
    { date: "2024-04-13", count: 2700 },
    { date: "2024-04-14", count: 3000 },
  ],
  conversationsByDay: [
    { date: "2024-04-01", count: 22 },
    { date: "2024-04-02", count: 19 },
    { date: "2024-04-03", count: 25 },
    { date: "2024-04-04", count: 28 },
    { date: "2024-04-05", count: 24 },
    { date: "2024-04-06", count: 16 },
    { date: "2024-04-07", count: 14 },
    { date: "2024-04-08", count: 26 },
    { date: "2024-04-09", count: 23 },
    { date: "2024-04-10", count: 29 },
    { date: "2024-04-11", count: 27 },
    { date: "2024-04-12", count: 25 },
    { date: "2024-04-13", count: 18 },
    { date: "2024-04-14", count: 21 },
  ],
};

// Función para obtener agentes por empresa
export const getAgentsByCompany = (companyId: string): Agent[] => {
  return agents.filter((agent) => agent.companyId === companyId);
};

// Función para obtener bases de conocimiento por empresa
export const getKnowledgeBasesByCompany = (companyId: string): KnowledgeBase[] => {
  return knowledgeBases.filter((kb) => kb.companyId === companyId);
};

// Función para obtener usuarios por empresa
export const getUsersByCompany = (companyId: string): User[] => {
  return users.filter((user) => user.companyId === companyId);
};

// Función para obtener conversaciones por agente
export const getConversationsByAgent = (agentId: string) => {
  return conversations.filter((conv) => conv.agentId === agentId);
};

// Función para obtener integraciones por agente
export const getIntegrationsByAgent = (agentId: string) => {
  return integrations.filter((integration) => integration.agentIds.includes(agentId));
};

// Función para obtener bases de conocimiento por agente
export const getKnowledgeBasesByAgent = (agentId: string) => {
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) return [];
  return knowledgeBases.filter((kb) => agent.knowledgeBases.includes(kb.id));
};
