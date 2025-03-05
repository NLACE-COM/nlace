
import { 
  LayoutDashboard, 
  Bot, 
  MessageSquare, 
  FileText, 
  Globe, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SidebarItem from "./SidebarItem";

interface SidebarNavItemsProps {
  collapsed: boolean;
  onItemClick?: () => void;
}

const SidebarNavItems = ({ collapsed, onItemClick }: SidebarNavItemsProps) => {
  const { t } = useLanguage();

  return (
    <div className="px-3 py-2 space-y-1">
      <SidebarItem
        to="/dashboard"
        icon={<LayoutDashboard size={20} strokeWidth={1.5} />}
        label={t("dashboard")}
        collapsed={collapsed}
        onClick={onItemClick}
      />
      <SidebarItem
        to="/agents"
        icon={<Bot size={20} strokeWidth={1.5} />}
        label={t("agents")}
        collapsed={collapsed}
        onClick={onItemClick}
      />
      <SidebarItem
        to="/chat"
        icon={<MessageSquare size={20} strokeWidth={1.5} />}
        label={t("chat")}
        collapsed={collapsed}
        onClick={onItemClick}
      />
      <SidebarItem
        to="/knowledge"
        icon={<FileText size={20} strokeWidth={1.5} />}
        label={t("knowledge")}
        collapsed={collapsed}
        onClick={onItemClick}
      />
      <SidebarItem
        to="/integrations"
        icon={<Globe size={20} strokeWidth={1.5} />}
        label={t("integrations")}
        collapsed={collapsed}
        onClick={onItemClick}
      />
      <SidebarItem
        to="/users"
        icon={<Users size={20} strokeWidth={1.5} />}
        label={t("users")}
        collapsed={collapsed}
        onClick={onItemClick}
      />
    </div>
  );
};

export default SidebarNavItems;
