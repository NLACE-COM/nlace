
import { KnowledgeBase } from "../types";

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

// Función para obtener bases de conocimiento por empresa
export const getKnowledgeBasesByCompany = (companyId: string): KnowledgeBase[] => {
  return knowledgeBases.filter((kb) => kb.companyId === companyId);
};

// Función para obtener bases de conocimiento por agente
export const getKnowledgeBasesByAgent = (agentId: string) => {
  // Need to import agents to get this function working
  const { agents } = require('./agents');
  const agent = agents.find((a: any) => a.id === agentId);
  if (!agent) return [];
  return knowledgeBases.filter((kb) => agent.knowledgeBases.includes(kb.id));
};
