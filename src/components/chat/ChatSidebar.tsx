
import React from 'react';
import { Conversation } from '@/types/chat';
import { useConversationSearch } from '@/hooks/use-conversation-search';
import ChatSidebarHeader from './sidebar/ChatSidebarHeader';
import ChatSidebarSearch from './sidebar/ChatSidebarSearch';
import NewChatButton from './sidebar/NewChatButton';
import ChatList from './sidebar/ChatList';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeChat: string | null;
  sidebarCollapsed: boolean;
  showSidebarMobile: boolean;
  isMobile: boolean;
  isLoading: boolean;
  onChatSelect: (chatId: string) => void;
  onSidebarCollapse: () => void;
  onCloseMobileSidebar: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeChat,
  sidebarCollapsed,
  showSidebarMobile,
  isMobile,
  isLoading,
  onChatSelect,
  onSidebarCollapse,
  onCloseMobileSidebar
}) => {
  // Use the search hook to filter conversations
  const { searchQuery, setSearchQuery, clearSearch, filteredConversations } = useConversationSearch(conversations);

  // Calculate sidebar style based on state
  const sidebarStyle = isMobile 
    ? `fixed inset-y-0 left-0 z-50 w-72 ${showSidebarMobile ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out` 
    : `relative ${sidebarCollapsed ? 'w-16' : 'w-72'} transition-width duration-200 ease-in-out`;

  return (
    <div className={`bg-white border-r border-gray-200 ${sidebarStyle}`}>
      {/* Header Component */}
      <ChatSidebarHeader 
        sidebarCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        showSidebarMobile={showSidebarMobile}
        onSidebarCollapse={onSidebarCollapse}
        onCloseMobileSidebar={onCloseMobileSidebar}
      />

      {/* Search Input - only show when sidebar is not collapsed */}
      {!sidebarCollapsed && (
        <ChatSidebarSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
        />
      )}

      {/* New Chat Button */}
      <NewChatButton sidebarCollapsed={sidebarCollapsed} />

      {/* Chat List */}
      <ChatList 
        conversations={filteredConversations}
        activeChat={activeChat}
        sidebarCollapsed={sidebarCollapsed}
        isLoading={isLoading}
        onChatSelect={onChatSelect}
      />
    </div>
  );
};

export default ChatSidebar;
