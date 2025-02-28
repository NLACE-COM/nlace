
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  users: string[]; // User IDs
  agents: string[]; // Agent IDs
  brands: string[]; // Brand IDs
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  company: string; // Company ID
  agents: string[]; // Agent IDs
  category: BrandCategory;
  createdAt: string;
}

export type BrandCategory = 
  | 'retail' 
  | 'food' 
  | 'technology' 
  | 'finance' 
  | 'entertainment'
  | 'other';

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  status: 'active' | 'inactive' | 'configuring';
  company: string; // Company ID
  brand?: string; // Brand ID
  metrics: AgentMetrics;
  createdAt: string;
  icon: string;
  active: boolean; // Añadimos la propiedad active
}

export type AgentType = 
  | 'data-analysis' 
  | 'content-creation' 
  | 'document-review' 
  | 'customer-support' 
  | 'research' 
  | 'custom';

export interface AgentMetrics {
  tasksCompleted: number;
  averageCompletionTime: number;
  successRate: number;
  usageHours: number;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  company: string; // Company ID
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

export interface AppState {
  currentUser: User | null;
  currentCompany: Company | null;
  companies: Company[];
  agents: Agent[];
  brands: Brand[];
  knowledgeBases: KnowledgeBase[];
  tasks: Task[];
}
