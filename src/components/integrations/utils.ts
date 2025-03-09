
import { Integration } from "@/types/integration";

// Función para formatear fechas
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

// Función para ordenar integraciones
export const sortIntegrations = (integrations: Integration[]) => {
  return [...integrations].sort((a, b) => {
    const statusOrder = {
      connected: 0,
      pending: 1,
      disconnected: 2,
    };
    return statusOrder[a.status] - statusOrder[b.status] 
      || b.popularityScore - a.popularityScore;
  });
};
