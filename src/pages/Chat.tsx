import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { agents } from "@/lib/data";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { useConversations, useConversation, useLLMModels, useSendMessage } from "@/hooks/use-chat-queries";
import { toast } from "sonner";

const Chat = () => {
  const { t } = useLanguage();
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null); // Changed to null by default
  const isMobile = useIsMobile();

  // React Query hooks
  const { 
    data: conversations = [], 
    isLoading: isLoadingConversations,
    error: conversationsError 
  } = useConversations();
  
  const { 
    data: currentConversation,
    isLoading: isLoadingConversation,
    error: conversationError
  } = useConversation(activeChat);
  
  const {
    data: llmModels = [],
    isLoading: isLoadingModels,
    error: modelsError
  } = useLLMModels();
  
  const sendMessageMutation = useSendMessage();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setShowSidebarMobile(false);
    }
  }, [isMobile]);

  // Close mobile sidebar when selecting a chat
  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    if (isMobile) {
      setShowSidebarMobile(false);
    }
  };

  const handleSendMessage = (messageText: string) => {
    if (!activeChat) {
      toast.error("Please select a conversation first");
      return;
    }
    
    console.log("Sending message:", {
      content: messageText,
      model: selectedModel,
      agent: selectedAgent,
    });
    
    sendMessageMutation.mutate({
      conversationId: activeChat,
      content: messageText,
      model: selectedModel,
      agentId: selectedAgent,
      companyId: "default-company", // Provide a default company ID
    });
  };

  // Handle errors
  useEffect(() => {
    if (conversationsError) {
      toast.error("Failed to load conversations");
      console.error(conversationsError);
    }
    
    if (conversationError) {
      toast.error("Failed to load conversation");
      console.error(conversationError);
    }
    
    if (modelsError) {
      toast.error("Failed to load LLM models");
      console.error(modelsError);
    }
  }, [conversationsError, conversationError, modelsError]);

  // Enhance agents with types for icons
  const enhancedAgents = agents.map(agent => ({
    id: agent.id,
    name: agent.name,
    avatar: agent.avatar,
    type: agent.type
  }));

  return (
    <div className="flex h-full overflow-hidden bg-slate-50">
      {/* Sidebar Component */}
      <ChatSidebar
        conversations={conversations}
        activeChat={activeChat}
        sidebarCollapsed={sidebarCollapsed}
        showSidebarMobile={showSidebarMobile}
        isMobile={isMobile}
        isLoading={isLoadingConversations}
        onChatSelect={handleChatSelect}
        onSidebarCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCloseMobileSidebar={() => setShowSidebarMobile(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Header Component with agent selector */}
        <ChatHeader
          title={currentConversation?.title || "Nueva conversación"}
          selectedModel={selectedModel}
          selectedAgent={selectedAgent}
          isMobile={isMobile}
          llmModels={llmModels}
          agents={enhancedAgents}
          isLoading={isLoadingModels}
          onModelSelect={setSelectedModel}
          onAgentChange={setSelectedAgent}
          onMobileSidebarToggle={() => setShowSidebarMobile(true)}
        />

        {/* Messages Component */}
        <ChatMessages 
          messages={currentConversation?.messages || []} 
          isLoading={isLoadingConversation}
          selectedAgent={selectedAgent}
        />

        {/* Input Component */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={sendMessageMutation.isPending}
          selectedModel={selectedModel}
          llmModels={llmModels}
          onModelSelect={setSelectedModel}
        />
      </div>
    </div>
  );
};

export default Chat;
