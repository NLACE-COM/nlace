
import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Bot,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CompanySelector from "./CompanySelector";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  to,
  icon,
  label,
  collapsed,
  onClick,
}: SidebarItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `flex items-center h-12 transition-colors ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            } ${collapsed ? "justify-center px-2" : "px-4"}`
          }
          onClick={onClick}
        >
          <div className="flex items-center">
            <div className={`w-8 h-8 flex items-center ${collapsed ? "justify-center" : ""}`}>
              {icon}
            </div>
            {!collapsed && <span className="text-[16px] ml-3">{label}</span>}
          </div>
        </NavLink>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
};

const Sidebar = ({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Handle clicks outside the sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen, onClose]);

  // Control mobile sidebar visibility with animation
  useEffect(() => {
    if (isOpen) {
      setShowMobileSidebar(true);
    } else {
      const timer = setTimeout(() => {
        setShowMobileSidebar(false);
      }, 300); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // If it's not mobile, and not showing mobile sidebar, don't render
  if (isMobile && !showMobileSidebar) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          style={{ opacity: isOpen ? 1 : 0 }}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full bg-sidebar border-r border-sidebar-border pt-16 transition-all duration-300 ${
          collapsed && !isMobile ? "w-20" : "w-72"
        } ${
          isMobile
            ? isOpen
              ? "translate-x-0 shadow-xl"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          {!collapsed && (
            <div className="flex justify-center py-4">
              <img 
                src="/lovable-uploads/05c5cd91-9e77-4776-8acd-174e7510a439.png" 
                alt="NLACE Logo" 
                className="h-12"
              />
            </div>
          )}

          {/* Company selector */}
          <div className="px-4 py-2">
            {!collapsed && <CompanySelector />}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="py-2 space-y-0.5">
              <SidebarItem
                to="/dashboard"
                icon={<LayoutDashboard size={22} strokeWidth={1.5} />}
                label="Panel Principal"
                collapsed={collapsed}
                onClick={isMobile ? onClose : undefined}
              />
              <SidebarItem
                to="/agents"
                icon={<Bot size={22} strokeWidth={1.5} />}
                label="Agentes"
                collapsed={collapsed}
                onClick={isMobile ? onClose : undefined}
              />
              <SidebarItem
                to="/chat"
                icon={<MessageSquare size={22} strokeWidth={1.5} />}
                label="Chat"
                collapsed={collapsed}
                onClick={isMobile ? onClose : undefined}
              />
              <SidebarItem
                to="/knowledge"
                icon={<FileText size={22} strokeWidth={1.5} />}
                label="Conocimiento"
                collapsed={collapsed}
                onClick={isMobile ? onClose : undefined}
              />
              <SidebarItem
                to="/integrations"
                icon={<Globe size={22} strokeWidth={1.5} />}
                label="Integraciones"
                collapsed={collapsed}
                onClick={isMobile ? onClose : undefined}
              />
              <SidebarItem
                to="/users"
                icon={<Users size={22} strokeWidth={1.5} />}
                label="Usuarios"
                collapsed={collapsed}
                onClick={isMobile ? onClose : undefined}
              />
            </nav>
          </ScrollArea>

          {/* Bottom actions */}
          <div className="mt-auto p-2 space-y-1">
            <Separator className="bg-sidebar-border my-2" />
            <SidebarItem
              to="/settings"
              icon={<Settings size={22} strokeWidth={1.5} />}
              label="Configuración"
              collapsed={collapsed}
              onClick={isMobile ? onClose : undefined}
            />
            <div className={`h-12 flex items-center ${collapsed ? "justify-center px-2" : "px-4"}`}>
              <div className="flex items-center cursor-pointer hover:bg-sidebar-accent/50 w-full rounded-md">
                <div className={`w-8 h-8 flex items-center ${collapsed ? "justify-center" : ""}`}>
                  <LogOut size={22} strokeWidth={1.5} />
                </div>
                {!collapsed && <span className="text-[16px] ml-3">Cerrar Sesión</span>}
              </div>
            </div>
          </div>

          {/* Collapse toggle (non-mobile only) */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="absolute top-20 -right-4 h-8 w-8 rounded-full border bg-background shadow-md"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
