
import { ReactNode } from "react";

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  status: "connected" | "disconnected" | "pending";
  category: "social" | "marketing" | "data" | "productivity";
  connectedDate?: string;
  popularityScore: number;
}
