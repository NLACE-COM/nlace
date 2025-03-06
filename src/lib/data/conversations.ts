
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

// Función para obtener conversaciones por agente
export const getConversationsByAgent = (agentId: string) => {
  return conversations.filter((conv) => conv.agentId === agentId);
};
