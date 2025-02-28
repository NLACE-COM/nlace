
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar: string;
  tokensUsed: number;
  tokenLimit: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  users: string[]; // User IDs
  agents: string[]; // Agent IDs
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  status: 'active' | 'inactive' | 'configuring';
  company: string; // Company ID
  category: AgentCategory;
  metrics: AgentMetrics;
  createdAt: string;
  icon: string;
  active: boolean;
  knowledgeBases: string[]; // KnowledgeBase IDs
  integrations: string[]; // Integration IDs
}

export type AgentType = 
  | 'data-analysis' 
  | 'content-creation' 
  | 'document-review' 
  | 'customer-support' 
  | 'research' 
  | 'custom';

export type AgentCategory = 
  | 'retail' 
  | 'food' 
  | 'technology' 
  | 'finance' 
  | 'entertainment'
  | 'other';

export interface AgentMetrics {
  tasksCompleted: number;
  averageCompletionTime: number;
  successRate: number;
  usageHours: number;
  tokensUsed: number;
  conversations: number;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  agent: string; // Agent ID
  documents: KnowledgeDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'txt' | 'url' | 'image';
  size: number; // in KB
  uploadedAt: string;
  url: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'api' | 'database' | 'storage' | 'payment' | 'email' | 'other';
  status: 'active' | 'inactive' | 'configuring';
  agent: string; // Agent ID
  createdAt: string;
  icon: string;
}

export interface Conversation {
  id: string;
  title: string;
  agent: string; // Agent ID
  user: string; // User ID
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  tokensUsed: number;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
  tokensUsed?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  agent: string; // Agent ID
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  result?: string;
}

export interface UsageMetrics {
  totalUsers: number;
  activeUsers: number;
  totalConversations: number;
  activeConversations: number;
  totalTokensUsed: number;
  tokenUsageByDay: {
    date: string;
    count: number;
  }[];
  conversationsByDay: {
    date: string;
    count: number;
  }[];
}

export interface AppState {
  currentUser: User | null;
  currentCompany: Company | null;
  companies: Company[];
  agents: Agent[];
  knowledgeBases: KnowledgeBase[];
  integrations: Integration[];
  conversations: Conversation[];
  tasks: Task[];
  usageMetrics: UsageMetrics;
}
