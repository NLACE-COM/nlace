
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Conversation } from '@/types/chat';
import ChatItem from './ChatItem';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatListProps {
  conversations: Conversation[];
  activeChat: string | null;
  sidebarCollapsed: boolean;
  isLoading: boolean;
  onChatSelect: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ 
  conversations, 
  activeChat, 
  sidebarCollapsed, 
  isLoading, 
  onChatSelect 
}) => {
  const { t } = useLanguage();

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
    <ScrollArea className="h-[calc(100%-120px)]">
      {isLoading ? (
        renderLoadingSkeletons()
      ) : (
        <div className="p-2 space-y-2">
          {conversations.length > 0 ? (
            conversations.map((chat) => (
              <ChatItem 
                key={chat.id}
                chat={chat} 
                isActive={activeChat === chat.id}
                sidebarCollapsed={sidebarCollapsed}
                onClick={() => onChatSelect(chat.id)}
              />
            ))
          ) : (
            <div className="px-2 py-4 text-center text-sm text-gray-500">
              {t("noConversationsFound")}
            </div>
          )}
        </div>
      )}
    </ScrollArea>
  );
};

export default ChatList;
