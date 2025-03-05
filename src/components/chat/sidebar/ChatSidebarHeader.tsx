
import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatSidebarHeaderProps {
  sidebarCollapsed: boolean;
  isMobile: boolean;
  showSidebarMobile: boolean;
  onSidebarCollapse: () => void;
  onCloseMobileSidebar: () => void;
}

const ChatSidebarHeader: React.FC<ChatSidebarHeaderProps> = ({ 
  sidebarCollapsed, 
  isMobile, 
  showSidebarMobile,
  onSidebarCollapse, 
  onCloseMobileSidebar 
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
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

      {/* Title - only show when sidebar is not collapsed */}
      {!sidebarCollapsed && (
        <h2 className="text-xl font-bold text-gray-900">{t("chats")}</h2>
      )}

      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onSidebarCollapse}
        className={`${sidebarCollapsed ? 'mx-auto' : ''} text-gray-600 hover:text-gray-900 hover:bg-gray-100`}
      >
        {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default ChatSidebarHeader;
