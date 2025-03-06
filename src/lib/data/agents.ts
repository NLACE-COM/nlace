
import { Agent } from "../types";
import { currentCompany } from "./companies";

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

// Función para obtener agentes por empresa
export const getAgentsByCompany = (companyId: string): Agent[] => {
  return agents.filter((agent) => agent.companyId === companyId);
};
