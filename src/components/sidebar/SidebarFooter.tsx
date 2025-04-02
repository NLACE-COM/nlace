
import { LogOut, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SidebarItem from "./SidebarItem";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarFooterProps {
  collapsed: boolean;
  onItemClick?: () => void;
}

const SidebarFooter = ({ collapsed, onItemClick }: SidebarFooterProps) => {
  const { t } = useLanguage();

  return (
    <div className="mt-auto p-3 space-y-1">
      <Separator className="my-2" />
      <SidebarItem
        to="/settings"
        icon={<Settings size={20} strokeWidth={1.5} />}
        label={t("settings")}
        collapsed={collapsed}
        onClick={onItemClick}
      />
      <div
        className={`flex items-center h-12 px-4 rounded-md cursor-pointer transition-colors hover:bg-brand-blue/10 hover:text-brand-blue ${
          collapsed ? "justify-center" : "gap-3"
        }`}
      >
        <LogOut size={20} strokeWidth={1.5} />
        {!collapsed && <span className="text-[15px]">{t("logout")}</span>}
      </div>
    </div>
  );
};

export default SidebarFooter;
