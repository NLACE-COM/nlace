
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface NewChatButtonProps {
  sidebarCollapsed: boolean;
  onNewChat?: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ 
  sidebarCollapsed,
  onNewChat 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-2">
      <Button 
        className={`w-full justify-start gap-2 bg-brand-blue hover:bg-brand-blue/80 text-white border-none shadow-md ${!sidebarCollapsed ? 'px-4' : 'justify-center'}`} 
        variant="default"
        onClick={onNewChat}
      >
        <Plus className="h-4 w-4" />
        {!sidebarCollapsed && <span>{t("newChat")}</span>}
      </Button>
    </div>
  );
};

export default NewChatButton;
