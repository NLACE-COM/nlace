
import { Agent, AgentType, Brand, BrandCategory, Company, KnowledgeBase, Task, User } from "./types";

export const users: User[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    avatar: "/placeholder.svg",
  },
  {
    id: "u2",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "manager",
    avatar: "/placeholder.svg",
  },
  {
    id: "u3",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    role: "user",
    avatar: "/placeholder.svg",
  },
  {
    id: "u4",
    name: "James Wilson",
    email: "james@example.com",
    role: "user",
    avatar: "/placeholder.svg",
  },
];

export const brands: Brand[] = [
  {
    id: "b1",
    name: "Centros Comerciales",
    logo: "/placeholder.svg",
    description: "Gestión de centros comerciales y retail",
    company: "c1",
    agents: ["a1", "a2"],
    category: "retail",
    createdAt: "2023-08-15T11:30:00Z",
  },
  {
    id: "b2",
    name: "Arauco",
    logo: "/placeholder.svg",
    description: "Grupo empresarial con operaciones en Argentina, Brasil, Chile, Colombia, México, Perú y Uruguay",
    company: "c1",
    agents: ["a4"],
    category: "retail",
    createdAt: "2023-09-10T09:30:00Z",
  },
  {
    id: "b3",
    name: "Cheetos",
    logo: "/placeholder.svg",
    description: "Marca de snacks de queso",
    company: "c2",
    agents: ["a3"],
    category: "food",
    createdAt: "2023-10-20T14:15:00Z",
  },
  {
    id: "b4",
    name: "Pepsi",
    logo: "/placeholder.svg",
    description: "Marca global de bebidas",
    company: "c2",
    agents: ["a5"],
    category: "food",
    createdAt: "2023-11-05T08:45:00Z",
  },
  {
    id: "b5",
    name: "Quaker",
    logo: "/placeholder.svg",
    description: "Marca de cereales y alimentos saludables",
    company: "c2",
    agents: ["a6"],
    category: "food",
    createdAt: "2024-01-18T12:30:00Z",
  }
];

export const companies: Company[] = [
  {
    id: "c1",
    name: "Innovatech",
    logo: "/placeholder.svg",
    description: "Leading innovation in tech solutions",
    users: ["u1", "u2", "u3"],
    agents: ["a1", "a2", "a4"],
    brands: ["b1", "b2"],
  },
  {
    id: "c2",
    name: "GreenEarth",
    logo: "/placeholder.svg",
    description: "Sustainable solutions for a better planet",
    users: ["u1", "u4"],
    agents: ["a3", "a5", "a6"],
    brands: ["b3", "b4", "b5"],
  },
  {
    id: "c3",
    name: "FinEdge",
    logo: "/placeholder.svg",
    description: "Cutting-edge financial solutions",
    users: ["u1"],
    agents: [],
    brands: [],
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
    brand: "b1",
    metrics: {
      tasksCompleted: 147,
      averageCompletionTime: 3.2,
      successRate: 96,
      usageHours: 234,
    },
    createdAt: "2023-09-15T10:30:00Z",
    icon: agentIcons["data-analysis"],
  },
  {
    id: "a2",
    name: "ContentGen",
    description: "Crea contenido atractivo para los centros comerciales",
    type: "content-creation",
    status: "active",
    company: "c1",
    brand: "b1",
    metrics: {
      tasksCompleted: 89,
      averageCompletionTime: 5.7,
      successRate: 92,
      usageHours: 178,
    },
    createdAt: "2023-10-05T14:20:00Z",
    icon: agentIcons["content-creation"],
  },
  {
    id: "a3",
    name: "CheeTalker",
    description: "Agente de contenido de marca para Cheetos",
    type: "content-creation",
    status: "active",
    company: "c2",
    brand: "b3",
    metrics: {
      tasksCompleted: 73,
      averageCompletionTime: 4.5,
      successRate: 94,
      usageHours: 156,
    },
    createdAt: "2023-08-22T09:15:00Z",
    icon: agentIcons["content-creation"],
  },
  {
    id: "a4",
    name: "DocReviewer",
    description: "Revisa documentos para Arauco",
    type: "document-review",
    status: "inactive",
    company: "c1",
    brand: "b2",
    metrics: {
      tasksCompleted: 112,
      averageCompletionTime: 2.8,
      successRate: 97,
      usageHours: 198,
    },
    createdAt: "2023-11-10T11:45:00Z",
    icon: agentIcons["document-review"],
  },
  {
    id: "a5",
    name: "PepsiContent",
    description: "Crea contenido para Pepsi enfocado en campañas digitales",
    type: "content-creation",
    status: "configuring",
    company: "c2",
    brand: "b4",
    metrics: {
      tasksCompleted: 42,
      averageCompletionTime: 6.1,
      successRate: 89,
      usageHours: 94,
    },
    createdAt: "2024-01-05T16:30:00Z",
    icon: agentIcons["content-creation"],
  },
  {
    id: "a6",
    name: "QuakerSupport",
    description: "Agente de atención al cliente para Quaker",
    type: "customer-support",
    status: "active",
    company: "c2",
    brand: "b5",
    metrics: {
      tasksCompleted: 56,
      averageCompletionTime: 4.2,
      successRate: 95,
      usageHours: 108,
    },
    createdAt: "2024-02-12T13:10:00Z",
    icon: agentIcons["customer-support"],
  },
];

export const knowledgeBases: KnowledgeBase[] = [
  {
    id: "kb1",
    name: "Tech Product Documentation",
    description: "Technical documentation for all our products",
    company: "c1",
    documents: [
      {
        id: "d1",
        title: "Product Manual v2.5",
        type: "pdf",
        size: 1245,
        uploadedAt: "2023-11-10T11:45:00Z",
        url: "#",
      },
      {
        id: "d2",
        title: "API Documentation",
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
    name: "Environmental Research",
    description: "Research papers and data on environmental impact",
    company: "c2",
    documents: [
      {
        id: "d3",
        title: "Climate Impact Study 2023",
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
    name: "Marketing Materials",
    description: "Brand guidelines and marketing content",
    company: "c1",
    documents: [
      {
        id: "d4",
        title: "Brand Guidelines 2024",
        type: "pdf",
        size: 1678,
        uploadedAt: "2024-01-10T13:15:00Z",
        url: "#",
      },
      {
        id: "d5",
        title: "Marketing Campaign Plan",
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

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Quarterly Sales Analysis",
    description: "Analyze Q1 2024 sales data and identify trends",
    agent: "a1",
    status: "completed",
    createdAt: "2024-04-01T09:00:00Z",
    completedAt: "2024-04-01T12:30:00Z",
    result: "Analysis report completed with 5 key insights",
  },
  {
    id: "t2",
    title: "Weekly Blog Post",
    description: "Create a blog post about recent tech innovations",
    agent: "a2",
    status: "in-progress",
    createdAt: "2024-04-05T10:15:00Z",
  },
  {
    id: "t3",
    title: "Environmental Impact Report",
    description: "Generate a report on carbon footprint reduction",
    agent: "a3",
    status: "pending",
    createdAt: "2024-04-06T14:30:00Z",
  },
  {
    id: "t4",
    title: "Contract Review",
    description: "Review the new supplier contract for compliance issues",
    agent: "a4",
    status: "failed",
    createdAt: "2024-04-03T11:00:00Z",
    completedAt: "2024-04-03T11:45:00Z",
    result: "Failed due to missing document sections",
  },
];

export const currentUser = users[0]; // Admin user
export const currentCompany = companies[0]; // Innovatech

export const getAgentsByCompany = (companyId: string) => {
  return agents.filter(agent => agent.company === companyId);
};

export const getBrandsByCompany = (companyId: string) => {
  return brands.filter(brand => brand.company === companyId);
};

export const getAgentsByBrand = (brandId: string) => {
  return agents.filter(agent => agent.brand === brandId);
};

export const getKnowledgeBasesByCompany = (companyId: string) => {
  return knowledgeBases.filter(kb => kb.company === companyId);
};

export const getUsersByCompany = (companyId: string) => {
  const company = companies.find(c => c.id === companyId);
  if (!company) return [];
  return users.filter(user => company.users.includes(user.id));
};

export const getTasksByAgent = (agentId: string) => {
  return tasks.filter(task => task.agent === agentId);
};

export const getBrandById = (brandId: string) => {
  return brands.find(brand => brand.id === brandId);
};
