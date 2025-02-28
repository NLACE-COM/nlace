
export type AgentStatus = "active" | "inactive" | "configuring";
export type AgentType = "data-analysis" | "content-creation" | "document-review" | "customer-support" | "research" | "custom";
export type AgentCategory = "retail" | "food" | "technology" | "finance" | "entertainment" | "other";

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  category: AgentCategory;
  status: AgentStatus;
  model: string;
  companyId: string;
  knowledgeBases: string[];
  integrations: string[];
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  conversationCount?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "failed";
  agent: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  companyId: string;
  documents: KnowledgeDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  plan: string;
  logo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId: string;
  tokenLimit: number;
  avatar?: string;
  activityCount?: number;
}

export interface UsageMetrics {
  totalTokensUsed: number;
  activeConversations: number;
  totalUsers: number;
  tokenUsageByDay: { date: string; count: number }[];
  conversationsByDay: { date: string; count: number }[];
}
