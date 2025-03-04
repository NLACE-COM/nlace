
import React from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Search, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Conversation } from '@/types/chat';
import { useConversationSearch } from '@/hooks/use-conversation-search';
import { useLanguage } from '@/contexts/LanguageContext';

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
  // Get language context for translations
  const { t } = useLanguage();

  // Use the search hook to filter conversations
  const { searchQuery, setSearchQuery, clearSearch, filteredConversations } = useConversationSearch(conversations);

  // Calculate sidebar style based on state
  const sidebarStyle = isMobile 
    ? `fixed inset-y-0 left-0 z-50 w-72 ${showSidebarMobile ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out` 
    : `relative ${sidebarCollapsed ? 'w-16' : 'w-72'} transition-width duration-200 ease-in-out`;

  // Render loading skeletons
  const renderLoadingSkeletons = () => (
    Array(5).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="p-2">
        <Skeleton className="h-6 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))
  );

  return (
    <div className={`bg-white border-r border-gray-200 ${sidebarStyle}`}>
      {/* Mobile close button */}
      {isMobile && showSidebarMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onCloseMobileSidebar}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!sidebarCollapsed && (
          <h2 className="text-xl font-bold text-gray-900">Chats</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarCollapse}
          className={`${sidebarCollapsed ? 'mx-auto' : ''} text-gray-600 hover:text-gray-900 hover:bg-gray-100`}
        >
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Search input - only show when sidebar is not collapsed */}
      {!sidebarCollapsed && (
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm border-gray-200 focus-visible:ring-gray-500"
            />
            {searchQuery && (
              <button 
                className="absolute right-2.5 top-2.5"
                onClick={clearSearch}
              >
                <XCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* New chat button - now with fruit-salad colors and Spanish text */}
      <div className="p-2">
        <Button 
          className="w-full justify-start gap-2 bg-fruit-salad-600 hover:bg-fruit-salad-700 text-white border-none" 
          variant="default"
        >
          <Plus className="h-4 w-4" />
          {!sidebarCollapsed && <span>Nuevo Chat</span>}
        </Button>
      </div>

      {/* Chat list */}
      <ScrollArea className="h-[calc(100%-120px)]">
        {isLoading ? (
          renderLoadingSkeletons()
        ) : (
          <div className="p-2 space-y-2">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onChatSelect(chat.id)}
                  className={`w-full text-left p-2 rounded-lg ${
                    activeChat === chat.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50 text-gray-700'
                  } transition-colors`}
                >
                  {sidebarCollapsed ? (
                    <div className="flex justify-center">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-xs">
                        {chat.title.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs text-gray-600 truncate">
                        {chat.preview}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {chat.timestamp} · {chat.model}
                      </div>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-2 py-4 text-center text-sm text-gray-500">
                No se encontraron conversaciones
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
