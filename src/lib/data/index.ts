
// Export all data and functions from the modules
export * from './companies';
export * from './agents';
export * from './users';
export * from './metrics';
export * from './knowledge';
export * from './tasks';
export * from './integrations';
export * from './conversations';

// Import agents specifically for the utility functions
import { agents } from './agents';

// Add utility functions that may be missing
export const getKnowledgeBasesByAgent = (agentId: string) => {
  const agent = agents.find(a => a.id === agentId);
  return agent?.knowledgeBases || [];
};

export const getIntegrationsByAgent = (agentId: string) => {
  const agent = agents.find(a => a.id === agentId);
  return agent?.integrations || [];
};
