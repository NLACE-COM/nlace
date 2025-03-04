
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  model: string;
  messages: ChatMessage[];
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
}
