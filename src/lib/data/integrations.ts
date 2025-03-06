
// Integraciones ficticias
export const integrations = [
  { id: "i1", name: "Slack", agentIds: ["a1", "a5"] },
  { id: "i2", name: "Gmail", agentIds: ["a1"] },
  { id: "i3", name: "Google Sheets", agentIds: ["a2"] },
  { id: "i4", name: "Dropbox", agentIds: ["a4"] },
  { id: "i5", name: "Twitter", agentIds: ["a6"] },
];

// Función para obtener integraciones por agente
export const getIntegrationsByAgent = (agentId: string) => {
  return integrations.filter((integration) => integration.agentIds.includes(agentId));
};
