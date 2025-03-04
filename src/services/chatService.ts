
import { Conversation, ChatMessage, LLMModel } from "@/types/chat";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data (typically this would come from a real API)
import { richFormattedMessages } from "@/lib/chat-example-data";

export async function fetchConversations(): Promise<Conversation[]> {
  // Simulate network request
  await delay(800);
  
  return [
    {
      id: "rich-formatted",
      title: "Análisis financiero con formato",
      preview: "Resumen con tablas, listas y gráficos",
      timestamp: "10:40 AM",
      model: "GPT-4",
      messages: richFormattedMessages
    },
    {
      id: "chat1",
      title: "Análisis financiero Q2",
      preview: "¿Puedes analizar los resultados del segundo trimestre?",
      timestamp: "10:30 AM",
      model: "GPT-4",
      messages: [
        {
          id: "1",
          content: "¿Puedes analizar los resultados financieros del segundo trimestre y destacar las áreas de crecimiento?",
          sender: "user",
          timestamp: "10:30 AM"
        },
        {
          id: "2",
          content: "He analizado los resultados del Q2. Veo un crecimiento del 15% en ingresos por servicios digitales, mientras que los costos operativos se han reducido un 5%. Las áreas con mayor potencial son el segmento de comercio electrónico y los servicios de consultoría. ¿Te gustaría un desglose más detallado de algún área específica?",
          sender: "ai",
          timestamp: "10:31 AM"
        }
      ]
    },
    {
      id: "chat2",
      title: "Plan de marketing digital",
      preview: "Quiero crear una campaña para redes sociales...",
      timestamp: "Ayer",
      model: "Claude 3",
      messages: [
        {
          id: "1",
          content: "Quiero crear una campaña para redes sociales que aumente nuestro engagement en un 20% en los próximos 3 meses. ¿Puedes ayudarme?",
          sender: "user",
          timestamp: "Ayer"
        },
        {
          id: "2",
          content: "Para aumentar el engagement en un 20% en 3 meses, recomendaría una estrategia con estos componentes: 1) Contenido de formato corto en TikTok y Reels con tendencias actuales, 2) Publicaciones interactivas semanales (encuestas, cuestionarios), 3) Colaboraciones con micro-influencers del sector, y 4) Una campaña de hashtag único. ¿Te gustaría que desarrolle alguno de estos puntos?",
          sender: "ai",
          timestamp: "Ayer"
        }
      ]
    },
    // Add more conversations as needed
  ];
}

export async function fetchConversation(conversationId: string): Promise<Conversation | undefined> {
  // Simulate network request
  await delay(600);
  
  const conversations = await fetchConversations();
  return conversations.find(conv => conv.id === conversationId);
}

export async function fetchLLMModels(): Promise<LLMModel[]> {
  // Simulate network request
  await delay(400);
  
  return [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
    { id: "grok-1", name: "Grok", provider: "xAI" },
    { id: "deepseek", name: "DeepSeek", provider: "DeepSeek" },
  ];
}

export async function sendMessage(
  conversationId: string,
  content: string,
  model: string,
  agentId: string,
  companyId: string = "default-company"
): Promise<ChatMessage> {
  // Simulate network request
  await delay(800);
  
  // In a real API, this would create a new message in the database
  const newMessage: ChatMessage = {
    id: Date.now().toString(),
    content,
    sender: "user",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  // Simulate AI response
  await delay(1200);
  
  // Return the user message - in a real implementation, 
  // we would return the AI response or handle streaming separately
  return newMessage;
}
