
import React from 'react';
import { MessageSquare, User, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatSidebarProps {
  conversations: Array<{
    id: string;
    title: string;
    preview: string;
    timestamp: string;
    model: string;
  }>;
  activeChat: string | null;
  sidebarCollapsed: boolean;
  showSidebarMobile: boolean;
  isMobile: boolean;
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
  onChatSelect,
  onSidebarCollapse,
  onCloseMobileSidebar
}) => {
  return (
    <div
      className={`${
        showSidebarMobile ? "block" : "hidden"
      } md:block fixed md:relative z-20 w-72 h-full transition-all duration-300 ease-in-out bg-background border-r shadow-md md:shadow-none ${
        sidebarCollapsed && !showSidebarMobile ? "md:w-20" : "md:w-72"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div
            className={`${
              sidebarCollapsed && !showSidebarMobile ? "md:hidden" : ""
            } flex items-center`}
          >
            <MessageSquare className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold">Chats</h2>
          </div>
          <div className="flex items-center">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCloseMobileSidebar}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarCollapse}
              className="hidden md:flex"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <Button className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Nuevo chat</span>
          </Button>
        </div>

        {/* Lista de conversaciones */}
        <div className="flex-grow overflow-y-auto">
          <div className="p-3 space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onChatSelect(conversation.id)}
                className={`p-2 rounded-lg cursor-pointer flex items-start ${
                  activeChat === conversation.id
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                } ${sidebarCollapsed && !showSidebarMobile ? "md:justify-center" : ""}`}
              >
                <MessageSquare
                  className={`flex-shrink-0 h-5 w-5 ${
                    sidebarCollapsed && !showSidebarMobile ? "md:mx-auto" : "mt-1 mr-2"
                  }`}
                />
                {(!sidebarCollapsed || showSidebarMobile) && (
                  <div className="flex-grow overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.title}</h3>
                      <span className="text-xs text-muted-foreground ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.preview}
                    </p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {conversation.model}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Usuario */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-9 w-9 p-2 bg-secondary rounded-full" />
            </div>
            {(!sidebarCollapsed || showSidebarMobile) && (
              <div className="ml-3">
                <p className="text-sm font-medium">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">alex@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
