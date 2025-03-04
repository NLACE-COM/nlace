
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { agents, companies } from "@/lib/data";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { useConversations, useConversation, useLLMModels, useSendMessage } from "@/hooks/use-chat-queries";
import { toast } from "sonner";

const Chat = () => {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>("rich-formatted");
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
      company: selectedCompany,
    });
    
    sendMessageMutation.mutate({
      conversationId: activeChat,
      content: messageText,
      model: selectedModel,
      agentId: selectedAgent,
      companyId: selectedCompany,
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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
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
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Component */}
        <ChatHeader
          title={currentConversation?.title || "New conversation"}
          selectedModel={selectedModel}
          isMobile={isMobile}
          llmModels={llmModels}
          isLoading={isLoadingModels}
          onModelSelect={setSelectedModel}
          onMobileSidebarToggle={() => setShowSidebarMobile(true)}
        />

        {/* Messages Component */}
        <ChatMessages 
          messages={currentConversation?.messages || []} 
          isLoading={isLoadingConversation} 
        />

        {/* Input Component */}
        <ChatInput
          selectedAgent={selectedAgent}
          selectedCompany={selectedCompany}
          agents={agents}
          companies={companies}
          onSendMessage={handleSendMessage}
          onAgentChange={setSelectedAgent}
          onCompanyChange={setSelectedCompany}
          isLoading={sendMessageMutation.isPending}
        />
      </div>
    </div>
  );
};

export default Chat;
