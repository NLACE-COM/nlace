
import React from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Search, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Conversation } from '@/types/chat';
import { useConversationSearch } from '@/hooks/use-conversation-search';

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
    <div className={`bg-[#f1f0fb] border-r border-slate-200 ${sidebarStyle}`}>
      {/* Mobile close button */}
      {isMobile && showSidebarMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onCloseMobileSidebar}
          className="absolute right-2 top-2 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100"
        >
          <X className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!sidebarCollapsed && (
          <h2 className="text-xl font-bold text-indigo-800">Chats</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarCollapse}
          className={`${sidebarCollapsed ? 'mx-auto' : ''} text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100`}
        >
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Search input - only show when sidebar is not collapsed */}
      {!sidebarCollapsed && (
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-400" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm border-slate-200 focus-visible:ring-indigo-500"
            />
            {searchQuery && (
              <button 
                className="absolute right-2.5 top-2.5"
                onClick={clearSearch}
              >
                <XCircle className="h-4 w-4 text-indigo-400 hover:text-indigo-600" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* New chat button */}
      <div className="p-2">
        <Button 
          className="w-full justify-start gap-2 bg-white hover:bg-slate-100 text-indigo-700 border border-slate-200" 
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          {!sidebarCollapsed && <span>New Chat</span>}
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
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'hover:bg-indigo-50 text-indigo-700'
                  } transition-colors`}
                >
                  {sidebarCollapsed ? (
                    <div className="flex justify-center">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs">
                        {chat.title.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs text-indigo-600 truncate">
                        {chat.preview}
                      </div>
                      <div className="text-xs text-indigo-400 mt-1">
                        {chat.timestamp} · {chat.model}
                      </div>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-2 py-4 text-center text-sm text-indigo-500">
                No conversations found
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
